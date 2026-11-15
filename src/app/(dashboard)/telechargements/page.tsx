'use client';

import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, Search, ArrowDownToLine, Shield, FileSpreadsheet } from 'lucide-react';

interface DocumentItem {
  id: string;
  titre: string;
  categorie: 'Bail' | 'Quittance' | 'Juridique' | 'Technique';
  description: string;
  taille: string;
  format: 'PDF' | 'DOCX' | 'XLSX';
  dateMaj: string;
}

const documentsDisponibles: DocumentItem[] = [
  {
    id: 'doc-01',
    titre: 'Modèle Officiel de Contrat de Bail à Usage d\'Habitation',
    categorie: 'Bail',
    description: 'Conforme aux réglementations en vigueur au Burkina Faso (dépôt de garantie, préavis, obligations locataire).',
    taille: '420 Ko',
    format: 'PDF',
    dateMaj: 'Octobre 2024',
  },
  {
    id: 'doc-02',
    titre: 'Contrat de Bail Commercial et Professionnel pour Bureaux',
    categorie: 'Bail',
    description: 'Spécifiquement adapté aux immeubles R+2, R+3, bureaux climatisés et espaces commerciaux de Ouagadougou.',
    taille: '510 Ko',
    format: 'PDF',
    dateMaj: 'Novembre 2024',
  },
  {
    id: 'doc-03',
    titre: 'Modèle de Quittance de Loyer Conforme en Francs CFA',
    categorie: 'Quittance',
    description: 'Format légal pour déclaration fiscale avec mentions des charges et paiements électroniques (Orange Money / Moov Money / Virement).',
    taille: '180 Ko',
    format: 'PDF',
    dateMaj: 'Novembre 2024',
  },
  {
    id: 'doc-04',
    titre: 'Procès-Verbal Contradictoire d\'État des Lieux (Entrée / Sortie)',
    categorie: 'Technique',
    description: 'Inventaire détaillé pièce par pièce : climatisation, électricité SONABEL, plomberie ONEA, serrures et peintures.',
    taille: '320 Ko',
    format: 'PDF',
    dateMaj: 'Septembre 2024',
  },
  {
    id: 'doc-05',
    titre: 'Fiche d\'Intervention et Devis de Réparation / Travaux',
    categorie: 'Technique',
    description: 'Document de cadrage pour artisans locaux (plomberie, électricité, maçonnerie, étanchéité de toiture).',
    taille: '210 Ko',
    format: 'PDF',
    dateMaj: 'Octobre 2024',
  },
  {
    id: 'doc-06',
    titre: 'Registre Annuel des Loyers et Dépenses d\'Exploitation',
    categorie: 'Juridique',
    description: 'Tableau récapitulatif annuel de gestion locative pour déclaration fiscale et bilan comptable.',
    taille: '640 Ko',
    format: 'XLSX',
    dateMaj: 'Novembre 2024',
  },
];

export default function TelechargementsPage() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('TOUS');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filtered = documentsDisponibles.filter((doc) => {
    if (filterCat !== 'TOUS' && doc.categorie !== filterCat) return false;
    if (search && !doc.titre.toLowerCase().includes(search.toLowerCase()) && !doc.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleDownload = (doc: DocumentItem) => {
    setDownloadSuccess(doc.titre);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2.5">
            <Download size={24} className="text-[#35C928]" />
            Centre de Téléchargements & Documents
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Modèles types, baux conformes au droit burkinabè, quittances et fiches techniques
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[#35C928]" />
          Document téléchargé avec succès : {downloadSuccess}
        </div>
      )}

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un contrat, une quittance, une fiche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['TOUS', 'Bail', 'Quittance', 'Technique', 'Juridique'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                filterCat === cat
                  ? 'bg-[#071B3A] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {cat === 'TOUS' ? 'Tous les documents' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((doc) => (
          <div key={doc.id} className="card p-5 flex flex-col justify-between hover:border-[#35C928] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`badge ${
                  doc.format === 'PDF' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {doc.format}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">{doc.taille}</span>
              </div>
              <h3 className="font-bold text-[#071B3A] text-sm leading-snug mb-2">
                {doc.titre}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {doc.description}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">MàJ : {doc.dateMaj}</span>
              <button
                onClick={() => handleDownload(doc)}
                className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <ArrowDownToLine size={14} /> Télécharger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

