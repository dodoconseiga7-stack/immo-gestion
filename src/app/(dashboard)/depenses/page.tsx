'use client';

import { useState } from 'react';
import { Receipt, Plus, Search } from 'lucide-react';
import { depenses, biens, immeubles } from '@/lib/demo-data';
import { formatMontant, categorieDepenseLabels, formatDateCourte } from '@/lib/utils';

export default function DepensesPage() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('TOUS');

  const totalDepenses = depenses.reduce((s, d) => s + d.montant, 0);
  const categories = ['TOUS', 'SONABEL', 'ONEA', 'GARDIENNAGE', 'ENTRETIEN', 'ASSURANCE', 'AUTRE'];

  const filtered = depenses.filter(d => {
    if (filterCat !== 'TOUS' && d.categorie !== filterCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return d.description.toLowerCase().includes(q) ||
             (d.fournisseur && d.fournisseur.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
            <Receipt size={24} className="text-[#35C928]" />
            Dépenses
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Total : {formatMontant(totalDepenses)} — {depenses.length} dépense(s) enregistrée(s)
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Ajouter une dépense
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une dépense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filterCat === c ? 'bg-[#071B3A] text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {c === 'TOUS' ? 'Toutes' : categorieDepenseLabels[c] || c}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-semibold text-gray-600">Description</th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden sm:table-cell">Catégorie</th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Bien / Immeuble</th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden sm:table-cell">Fournisseur</th>
              <th className="text-left p-4 font-semibold text-gray-600">Date</th>
              <th className="text-right p-4 font-semibold text-gray-600">Montant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((d) => {
              const bien = d.bien_id ? biens.find(b => b.id === d.bien_id) : null;
              const imm = d.immeuble_id ? immeubles.find(i => i.id === d.immeuble_id) : null;
              return (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{d.description}</td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="badge bg-gray-100 text-gray-700">{categorieDepenseLabels[d.categorie]}</span>
                  </td>
                  <td className="p-4 text-gray-600 hidden md:table-cell">{bien?.nom || imm?.nom || '-'}</td>
                  <td className="p-4 text-gray-600 hidden sm:table-cell">{d.fournisseur || '-'}</td>
                  <td className="p-4 text-gray-600">{formatDateCourte(d.date_depense)}</td>
                  <td className="p-4 text-right font-semibold text-red-600">{formatMontant(d.montant)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

