'use client';

import { FileBarChart, Download, Calendar, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { getDashboardStats } from '@/lib/demo-data';
import { formatMontant } from '@/lib/utils';

export default function RapportsPage() {
  const stats = getDashboardStats();

  const rapportsTypes = [
    {
      titre: 'Rapport Mensuel de Gestion Locative',
      description: 'État récapitulatif des loyers perçus, impayés, charges et entrées/sorties de locataires.',
      date: 'Novembre 2024',
      type: 'Mensuel',
    },
    {
      titre: 'Bilan Trimestriel de Trésorerie',
      description: 'Analyse des flux financiers, comparaisons prévisionnel vs réel, dépenses énergétiques (SONABEL/ONEA).',
      date: 'T3 2024',
      type: 'Trimestriel',
    },
    {
      titre: 'Rapport Annuel du Patrimoine Immobilier',
      description: 'Valorisation du parc, taux d’occupation global, investissements et coûts de maintenance annuels.',
      date: 'Année 2023-2024',
      type: 'Annuel',
    },
    {
      titre: 'État d’Occupation et Vacance Locative',
      description: 'Détail par quartier de Ouagadougou (Kossodo, Ouaga 2000, Cissin, Tanghin, Zogona).',
      date: 'En temps réel',
      type: 'Opérationnel',
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
            <FileBarChart size={24} className="text-[#35C928]" />
            Rapports & Synthèses d&apos;Activité
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Génération et téléchargement des bilans et audits de gestion
          </p>
        </div>
        <button className="btn-primary" onClick={() => window.print()}>
          <Download size={16} />
          Générer nouveau rapport
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-xs text-gray-500 font-medium">Taux d&apos;encaissement</p>
          <p className="text-2xl font-bold text-[#35C928] mt-1">{stats.taux_occupation}%</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Parc sous contrat actif</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-gray-500 font-medium">Recettes du mois</p>
          <p className="text-2xl font-bold text-[#071B3A] mt-1">{formatMontant(stats.revenus_mois)}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Mois en cours</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-gray-500 font-medium">Dépenses engagées</p>
          <p className="text-2xl font-bold text-red-500 mt-1">{formatMontant(stats.depenses_mois)}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Frais d&apos;exploitation</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-gray-500 font-medium">Travaux en cours</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.travaux_en_cours}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Chantiers ouverts</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#071B3A]">Rapports téléchargeables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rapportsTypes.map((r, i) => (
            <div key={i} className="card p-5 flex flex-col justify-between hover:border-[#35C928] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="badge bg-blue-50 text-[#071B3A] text-[10px] font-semibold">{r.type}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={12} /> {r.date}
                  </span>
                </div>
                <h3 className="font-semibold text-[#071B3A] text-base mb-1.5">{r.titre}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{r.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-end">
                <button
                  className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5 hover:bg-[#35C928] hover:text-white hover:border-[#35C928] transition-all"
                  onClick={() => window.print()}
                >
                  <Download size={14} /> Télécharger (PDF)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

