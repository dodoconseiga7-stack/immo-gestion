import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { biens, locataires, paiements, depenses, travaux } from '@/lib/demo-data';

export async function POST(req: Request) {
  try {
    const { prompt, history, userRole } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Clé API Gemini non configurée' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Contexte système injecté avec données réelles
    const systemInstruction = `
Tu es l'Assistante IA officielle de la plateforme "IMMO GESTION", experte en immobilier au Burkina Faso (notamment Ouagadougou).
Rôle de l'utilisateur actuel: ${userRole || 'PROPRIETAIRE'}.

Règles impératives :
1. Réponds toujours en français professionnel, courtois, précis et concis.
2. Tous les montants doivent être formulés en Francs CFA (FCFA).
3. Tu as accès aux données suivantes du patrimoine :
   - ${biens.length} biens gérés (Bureaux, Maisons, Mini-villas, Duplex, Espaces commerciaux).
   - Biens disponibles : ${biens.filter(b => b.statut === 'DISPONIBLE').map(b => b.nom + ' (' + b.quartier + ')').join(', ')}.
   - ${locataires.length} locataires actifs enregistrés (notamment Abdoulaye Ouédraogo, Mariam Sawadogo, etc.).
   - Paiements en retard : ${paiements.filter(p => p.statut === 'EN_RETARD').length} identifiés.
   - Dépenses totales : ${depenses.reduce((s, d) => s + d.montant, 0)} FCFA.
4. RÈGLE STRICTE DE SÉCURITÉ : Toute demande impliquant une action financière sensible (enregistrer un paiement, encaisser un loyer, engager une dépense de travaux, expulser un locataire) DOIT OBLIGATOIREMENT demander une confirmation explicite à l'utilisateur avant exécution. Ne valide jamais une transaction financière sans confirmation préalable.
5. Si l'utilisateur est "SECRETAIRE", il n'a pas accès aux données de rentabilité nette ni à la comptabilité globale.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nQuestion de l'utilisateur: ${prompt}` }]
        }
      ]
    });

    const reply = response.text || "Désolée, je n'ai pas pu formuler de réponse pour le moment.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Erreur API Gemini:', error);
    return NextResponse.json(
      { error: error?.message || 'Erreur lors du traitement de votre demande' },
      { status: 500 }
    );
  }
}

