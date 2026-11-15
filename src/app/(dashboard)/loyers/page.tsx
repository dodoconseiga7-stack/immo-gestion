'use client';

import { Wallet, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { paiements, locataires, biens } from '@/lib/demo-data';
import { formatMontant, statutPaiementLabels, statutPaiementColors, modePaiementLabels } from '@/lib/utils';

export default function LoyersPage() {
  const totalDu = paiements.reduce((s, p) => s + p.montant, 0);
  const totalPaye = paiements.reduce((s, p) => s + p.montant_paye, 0);
  const tauxRecouvrement = Math.round((totalPaye / totalDu) * 100);

  const parStatut = {
    PAYE: paiements.filter(p => p.statut === 'PAYE').length,
    PARTIEL: paiements.filter(p => p.statut === 'PARTIEL').length,
    EN_RETARD: paiements.filter(p => p.statut === 'EN_RETARD').length,
    EN_ATTENTE: paiements.filter(p => p.statut === 'EN_ATTENTE').length,
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
          <Wallet size={24} className="text-[#35C928]" />
          Suivi des Loyers
        </h1>
        <p className="text-sm text-gray-500 mt-1">Vue d&apos;ensemble des loyers du mois</p>
      </div>

      {/* Résumé */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-green-500" />
            <span className="text-xs text-gray-500">Payés</span>
          </div>
          <p className="text-2xl font-bold text-[#071B3A]">{parStatut.PAYE}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-orange-500" />
            <span className="text-xs text-gray-500">Partiels</span>
          </div>
          <p className="text-2xl font-bold text-[#071B3A]">{parStatut.PARTIEL}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <XCircle size={18} className="text-red-500" />
            <span className="text-xs text-gray-500">En retard</span>
          </div>
          <p className="text-2xl font-bold text-[#071B3A]">{parStatut.EN_RETARD}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-blue-500" />
            <span className="text-xs text-gray-500">Taux recouvrement</span>
          </div>
          <p className="text-2xl font-bold text-[#35C928]">{tauxRecouvrement}%</p>
        </div>
      </div>

      {/* Barre progression */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Recouvrement ce mois</span>
          <span className="text-sm font-bold text-[#35C928]">{formatMontant(totalPaye)} / {formatMontant(totalDu)}</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#35C928] rounded-full transition-all duration-500" style={{ width: `${tauxRecouvrement}%` }}></div>
        </div>
      </div>

      {/* Tableau détaillé */}
      <div className="table-container">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-semibold text-gray-600">Locataire</th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden sm:table-cell">Bien</th>
              <th className="text-left p-4 font-semibold text-gray-600">Période</th>
              <th className="text-right p-4 font-semibold text-gray-600">Montant</th>
              <th className="text-right p-4 font-semibold text-gray-600 hidden sm:table-cell">Payé</th>
              <th className="text-center p-4 font-semibold text-gray-600">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paiements.map((p) => {
              const loc = locataires.find(l => l.id === p.locataire_id);
              const bien = biens.find(b => b.id === p.bien_id);
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#071B3A] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-white">
                          {loc ? `${loc.prenom[0]}${loc.nom[0]}` : '??'}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">
                        {loc ? `${loc.prenom} ${loc.nom}` : '-'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 hidden sm:table-cell truncate max-w-[180px]">{bien?.nom || '-'}</td>
                  <td className="p-4 text-gray-600">{p.mois} {p.annee}</td>
                  <td className="p-4 text-right font-medium text-gray-800">{formatMontant(p.montant)}</td>
                  <td className="p-4 text-right font-medium text-gray-800 hidden sm:table-cell">{formatMontant(p.montant_paye)}</td>
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

