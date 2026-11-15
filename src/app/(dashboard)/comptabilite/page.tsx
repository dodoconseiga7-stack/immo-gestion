'use client';

import { useState } from 'react';
import { BookOpen, TrendingUp, TrendingDown, DollarSign, Download, Filter } from 'lucide-react';
import { paiements, depenses } from '@/lib/demo-data';
import { formatMontant, formatDateCourte, categorieDepenseLabels } from '@/lib/utils';

export default function ComptabilitePage() {
  const [selectedYear, setSelectedYear] = useState('2024');

  const totalRevenus = paiements
    .filter(p => p.statut === 'PAYE' || p.statut === 'PARTIEL')
    .reduce((sum, p) => sum + p.montant_paye, 0);

  const totalDepenses = depenses.reduce((sum, d) => sum + d.montant, 0);
  const soldeNet = totalRevenus - totalDepenses;

  // Calcul mensuel indicatif
  const moisLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
            <BookOpen size={24} className="text-[#35C928]" />
            Comptabilité & Bilan Financier
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestion des flux de trésorerie, bilans et état des recettes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="input w-32 py-2"
          >
            <option value="2024">Exercice 2024</option>
            <option value="2025">Exercice 2025</option>
          </select>
          <button className="btn-secondary" onClick={() => window.print()}>
            <Download size={16} />
            Exporter Bilan
          </button>
        </div>
      </div>

      {/* Cartes financières majeures */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="stat-card border-l-4 border-l-[#35C928]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Encaissé</span>
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#35C928]">
              <TrendingUp size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#071B3A]">{formatMontant(totalRevenus)}</p>
          <p className="text-xs text-green-600 mt-1">Loyers et charges perçus</p>
        </div>

        <div className="stat-card border-l-4 border-l-red-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Dépensé</span>
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <TrendingDown size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#071B3A]">{formatMontant(totalDepenses)}</p>
          <p className="text-xs text-red-500 mt-1">SONABEL, ONEA, gardiennage, entretien</p>
        </div>

        <div className="stat-card border-l-4 border-l-[#071B3A]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Résultat Net</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#071B3A]">
              <DollarSign size={18} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${soldeNet >= 0 ? 'text-[#35C928]' : 'text-red-500'}`}>
            {formatMontant(soldeNet)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Marge nette globale</p>
        </div>
      </div>

      {/* Ventilation des Dépenses par poste */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="font-semibold text-[#071B3A] mb-4">Postes de dépenses principales</h2>
          <div className="space-y-3">
            {Object.keys(categorieDepenseLabels).filter(k => k !== 'AUTRE').map((cat) => {
              const depCat = depenses.filter(d => d.categorie === cat);
              const totalCat = depCat.reduce((s, d) => s + d.montant, 0);
              const percentage = totalDepenses > 0 ? Math.round((totalCat / totalDepenses) * 100) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-gray-700">
                    <span>{categorieDepenseLabels[cat]}</span>
                    <span>{formatMontant(totalCat)} ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#071B3A] rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold text-[#071B3A] mb-4">Flux récents de trésorerie</h2>
          <div className="divide-y divide-gray-100 max-h-[340px] overflow-y-auto">
            {paiements.slice(0, 4).map((p) => (
              <div key={p.id} className="py-2.5 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-800">Encaissement loyer ({p.mois})</p>
                  <p className="text-xs text-gray-400">{p.date_paiement ? formatDateCourte(p.date_paiement) : 'En attente'}</p>
                </div>
                <span className="font-semibold text-[#35C928]">+{formatMontant(p.montant_paye)}</span>
              </div>
            ))}
            {depenses.slice(0, 4).map((d) => (
              <div key={d.id} className="py-2.5 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-800">{d.description}</p>
                  <p className="text-xs text-gray-400">{formatDateCourte(d.date_depense)}</p>
                </div>
                <span className="font-semibold text-red-500">-{formatMontant(d.montant)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

