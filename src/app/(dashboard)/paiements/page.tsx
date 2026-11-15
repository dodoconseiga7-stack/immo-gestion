'use client';

import { useState } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { paiements, locataires, biens } from '@/lib/demo-data';
import { formatMontant, statutPaiementLabels, statutPaiementColors, modePaiementLabels, formatDateCourte } from '@/lib/utils';

export default function PaiementsPage() {
  const [search, setSearch] = useState('');
  const [filterStatut, setFilterStatut] = useState('TOUS');

  const filtered = paiements.filter(p => {
    if (filterStatut !== 'TOUS' && p.statut !== filterStatut) return false;
    if (search) {
      const loc = locataires.find(l => l.id === p.locataire_id);
      const q = search.toLowerCase();
      if (loc && (`${loc.prenom} ${loc.nom}`).toLowerCase().includes(q)) return true;
      if (p.reference?.toLowerCase().includes(q)) return true;
      return false;
    }
    return true;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
            <CreditCard size={24} className="text-[#35C928]" />
            Paiements
          </h1>
          <p className="text-sm text-gray-500 mt-1">Gestion et suivi des paiements</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Enregistrer un paiement
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou référence..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['TOUS', 'PAYE', 'EN_RETARD', 'PARTIEL'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatut(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filterStatut === s ? 'bg-[#071B3A] text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {s === 'TOUS' ? 'Tous' : statutPaiementLabels[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-semibold text-gray-600">Locataire</th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Bien</th>
              <th className="text-left p-4 font-semibold text-gray-600">Période</th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden sm:table-cell">Mode</th>
              <th className="text-right p-4 font-semibold text-gray-600">Montant</th>
              <th className="text-center p-4 font-semibold text-gray-600">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((p) => {
              const loc = locataires.find(l => l.id === p.locataire_id);
              const bien = biens.find(b => b.id === p.bien_id);
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        p.statut === 'PAYE' ? 'bg-green-50' : p.statut === 'EN_RETARD' ? 'bg-red-50' : 'bg-yellow-50'
                      }`}>
                        {p.statut === 'PAYE' ? <CheckCircle2 size={14} className="text-green-600" /> :
                         p.statut === 'EN_RETARD' ? <XCircle size={14} className="text-red-600" /> :
                         <Clock size={14} className="text-yellow-600" />}
                      </div>
                      <span className="font-medium text-gray-800">
                        {loc ? `${loc.prenom} ${loc.nom}` : '-'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 hidden md:table-cell truncate max-w-[160px]">{bien?.nom}</td>
                  <td className="p-4 text-gray-600">{p.mois} {p.annee}</td>
                  <td className="p-4 text-gray-600 hidden sm:table-cell">
                    {p.mode_paiement ? modePaiementLabels[p.mode_paiement] : '-'}
                  </td>
                  <td className="p-4 text-right">
                    <p className="font-semibold text-gray-800">{formatMontant(p.montant)}</p>
                    {p.montant_paye < p.montant && p.montant_paye > 0 && (
                      <p className="text-[10px] text-orange-500">Payé: {formatMontant(p.montant_paye)}</p>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`badge ${statutPaiementColors[p.statut]}`}>
                      {statutPaiementLabels[p.statut]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

