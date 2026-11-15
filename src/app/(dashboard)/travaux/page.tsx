'use client';

import { useState } from 'react';
import { Wrench, Plus, Search, Calendar, Phone, CheckCircle, Clock } from 'lucide-react';
import { travaux, biens } from '@/lib/demo-data';
import { formatMontant, statutTravauxLabels, statutTravauxColors, prioriteTravauxColors, formatDateCourte } from '@/lib/utils';

export default function TravauxPage() {
  const [filterStatut, setFilterStatut] = useState('TOUS');
  const [search, setSearch] = useState('');

  const filtered = travaux.filter(t => {
    if (filterStatut !== 'TOUS' && t.statut !== filterStatut) return false;
    if (search) {
      const q = search.toLowerCase();
      return t.titre.toLowerCase().includes(q) ||
             t.description.toLowerCase().includes(q) ||
             (t.artisan_nom && t.artisan_nom.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
            <Wrench size={24} className="text-[#35C928]" />
            Maintenance & Travaux
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Suivi des chantiers, réparations, artisans et coûts associés
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Signaler une intervention
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par titre ou artisan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['TOUS', 'PLANIFIE', 'EN_COURS', 'TERMINE'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatut(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filterStatut === s ? 'bg-[#071B3A] text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {s === 'TOUS' ? 'Tous' : statutTravauxLabels[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => {
          const bien = biens.find(b => b.id === t.bien_id);
          return (
            <div key={t.id} className="card p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`badge text-[10px] ${prioriteTravauxColors[t.priorite]}`}>
                    Priorité {t.priorite.toLowerCase()}
                  </span>
                  <span className={`badge text-[10px] ${statutTravauxColors[t.statut]}`}>
                    {statutTravauxLabels[t.statut]}
                  </span>
                </div>
                <h3 className="font-semibold text-[#071B3A] text-base mb-1">{t.titre}</h3>
                <p className="text-xs text-gray-500 mb-3 font-medium">{bien?.nom || 'Bien non spécifié'}</p>
                <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">{t.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Calendar size={13} /> Début :
                  </span>
                  <span className="font-medium text-gray-700">{t.date_debut ? formatDateCourte(t.date_debut) : 'À planifier'}</span>
                </div>

                {t.artisan_nom && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Artisan :</span>
                    <span className="font-medium text-gray-800">{t.artisan_nom}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Coût estimé / réel :</span>
                  <span className="font-bold text-[#071B3A]">
                    {formatMontant(t.cout_reel || t.cout_estime || 0)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

