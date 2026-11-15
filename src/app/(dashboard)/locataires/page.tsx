'use client';

import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  Briefcase,
  CreditCard,
  MoreVertical,
} from 'lucide-react';
import { locataires, biens } from '@/lib/demo-data';

export default function LocatairesPage() {
  const [search, setSearch] = useState('');

  const filtered = locataires.filter(l => {
    if (!search) return true;
    const q = search.toLowerCase();
    return l.nom.toLowerCase().includes(q) ||
           l.prenom.toLowerCase().includes(q) ||
           l.telephone.includes(q);
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
            <Users size={24} className="text-[#35C928]" />
            Locataires
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {locataires.filter(l => l.actif).length} locataire(s) actif(s)
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Nouveau locataire
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un locataire..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((loc) => {
          const bien = biens.find(b => b.id === loc.bien_id);
          return (
            <div key={loc.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#071B3A] rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {loc.prenom[0]}{loc.nom[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#071B3A]">{loc.prenom} {loc.nom}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      loc.actif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {loc.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} className="text-gray-400" />
                  <span>{loc.telephone}</span>
                </div>
                {loc.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-gray-400" />
                    <span className="truncate">{loc.email}</span>
                  </div>
                )}
                {loc.profession && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase size={14} className="text-gray-400" />
                    <span>{loc.profession}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <CreditCard size={14} className="text-gray-400" />
                  <span>{loc.piece_identite_type} : {loc.piece_identite_numero}</span>
                </div>
              </div>

              {bien && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">Bien occupé</p>
                  <p className="text-sm font-medium text-[#071B3A] truncate">{bien.nom}</p>
                  <p className="text-xs text-gray-400">{bien.quartier}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Aucun locataire trouvé</p>
        </div>
      )}
    </div>
  );
}

