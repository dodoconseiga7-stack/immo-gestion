'use client';

import { useState } from 'react';
import { FileText, Printer, Download, Search, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { paiements, locataires, biens } from '@/lib/demo-data';
import { formatMontant, formatDate, genererNumeroRecu, modePaiementLabels } from '@/lib/utils';
import { Paiement } from '@/types';

export default function RecusPage() {
  const [search, setSearch] = useState('');
  const [selectedPaiement, setSelectedPaiement] = useState<Paiement | null>(null);

  const paiementsPayes = paiements.filter(p => p.statut === 'PAYE' || p.statut === 'PARTIEL');

  const filtered = paiementsPayes.filter(p => {
    if (!search) return true;
    const loc = locataires.find(l => l.id === p.locataire_id);
    const q = search.toLowerCase();
    return loc ? `${loc.prenom} ${loc.nom}`.toLowerCase().includes(q) : false;
  });

  const activeLoc = selectedPaiement ? locataires.find(l => l.id === selectedPaiement.locataire_id) : null;
  const activeBien = selectedPaiement ? biens.find(b => b.id === selectedPaiement.bien_id) : null;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
            <FileText size={24} className="text-[#35C928]" />
            Reçus de Paiement & Quittances
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Édition conforme des quittances de loyer avec traçabilité légale
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par locataire..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const loc = locataires.find(l => l.id === p.locataire_id);
          const bien = biens.find(b => b.id === p.bien_id);
          const numRecu = p.reference || `REC-2024-${p.id.slice(-4)}`;

          return (
            <div key={p.id} className="card p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-gray-500">{numRecu}</span>
                  <span className="badge bg-green-100 text-green-800 text-[10px]">Validé</span>
                </div>
                <h3 className="font-semibold text-[#071B3A] text-base">
                  {loc ? `${loc.prenom} ${loc.nom}` : 'Locataire'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{bien?.nom}</p>
                <div className="mt-3 py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Mois concerné :</span>
                    <span className="font-semibold text-gray-800">{p.mois} {p.annee}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">Montant acquitté :</span>
                    <span className="font-bold text-[#35C928]">{formatMontant(p.montant_paye)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  {p.mode_paiement ? modePaiementLabels[p.mode_paiement] : 'Espèces'}
                </span>
                <button
                  onClick={() => setSelectedPaiement(p)}
                  className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  <Printer size={13} /> Voir quittance
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Quittance Officielle conforme */}
      {selectedPaiement && activeLoc && activeBien && (
        <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4" onClick={() => setSelectedPaiement(null)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header du Reçu */}
            <div className="flex items-start justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#071B3A] rounded-xl flex items-center justify-center text-[#35C928]">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#071B3A] tracking-wider">
                    IMMO <span className="text-[#35C928]">GESTION</span>
                  </h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Quittance Officielle de Loyer
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedPaiement(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Corps du reçu */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div>
                  <span className="text-gray-500 block text-[11px]">Numéro de quittance</span>
                  <span className="font-mono font-bold text-gray-800">
                    {selectedPaiement.reference || genererNumeroRecu()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 block text-[11px]">Date d&apos;émission</span>
                  <span className="font-medium text-gray-800">
                    {selectedPaiement.date_paiement ? formatDate(selectedPaiement.date_paiement) : 'Date du jour'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-[11px] font-bold text-gray-400 uppercase">Bailleur / Gestionnaire</p>
                  <p className="font-bold text-[#071B3A] mt-1">IMMO GESTION BURKINA</p>
                  <p className="text-xs text-gray-600">Ouagadougou, Burkina Faso</p>
                  <p className="text-xs text-gray-600">Tél : +226 25 00 00 00</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-[11px] font-bold text-gray-400 uppercase">Locataire</p>
                  <p className="font-bold text-[#071B3A] mt-1">{activeLoc.prenom} {activeLoc.nom}</p>
                  <p className="text-xs text-gray-600">CNIB : {activeLoc.piece_identite_numero}</p>
                  <p className="text-xs text-gray-600">Tél : {activeLoc.telephone}</p>
                </div>
              </div>

              <div className="p-3 border rounded-lg bg-white">
                <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">Détails de l&apos;affectation</p>
                <div className="space-y-1.5 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span>Bien loué :</span>
                    <span className="font-medium text-gray-900">{activeBien.nom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adresse :</span>
                    <span className="text-gray-600">{activeBien.adresse}, {activeBien.quartier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Période locative :</span>
                    <span className="font-semibold text-gray-900">{selectedPaiement.mois} {selectedPaiement.annee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode de règlement :</span>
                    <span className="font-medium text-gray-900">
                      {selectedPaiement.mode_paiement ? modePaiementLabels[selectedPaiement.mode_paiement] : 'Espèces'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#071B3A] text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-300">Total net perçu</p>
                  <p className="text-xs text-[#35C928]">Pour acquit et quittance régulière</p>
                </div>
                <p className="text-2xl font-black text-[#35C928]">
                  {formatMontant(selectedPaiement.montant_paye)}
                </p>
              </div>

              <div className="border-t pt-3 flex justify-between items-center text-[11px] text-gray-500">
                <p>Cachet et signature électronique certifiée</p>
                <p className="font-semibold text-[#071B3A]">Direction IMMO GESTION</p>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setSelectedPaiement(null)} className="btn-outline">
                Fermer
              </button>
              <button onClick={() => window.print()} className="btn-primary flex items-center gap-2">
                <Printer size={16} /> Imprimer Quittance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

