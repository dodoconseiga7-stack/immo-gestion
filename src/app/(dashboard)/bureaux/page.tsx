'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Building2,
  Plus,
  Search,
  Filter,
  MapPin,
  Maximize,
  Eye,
  X,
} from 'lucide-react';
import { biens, locataires } from '@/lib/demo-data';
import { formatMontant, typeBienLabels, statutBienLabels, statutBienColors } from '@/lib/utils';

export default function BureauxPage() {
  const [filter, setFilter] = useState<string>('TOUS');
  const [search, setSearch] = useState('');
  const [selectedBien, setSelectedBien] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const bureaux = biens.filter(b => b.type === 'BUREAU' || b.type === 'ESPACE_COMMERCIAL');
  const filtered = bureaux.filter(b => {
    if (filter !== 'TOUS' && b.statut !== filter) return false;
    if (search && !b.nom.toLowerCase().includes(search.toLowerCase()) &&
        !b.quartier.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const detail = selectedBien ? bureaux.find(b => b.id === selectedBien) : null;
  const detailLocataire = detail ? locataires.find(l => l.bien_id === detail.id) : null;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
            <Building2 size={24} className="text-[#35C928]" />
            Bureaux & Espaces Commerciaux
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {bureaux.length} bureau(x) et espace(s) — {bureaux.filter(b => b.statut === 'DISPONIBLE').length} disponible(s)
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Ajouter un bureau
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un bureau..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['TOUS', 'DISPONIBLE', 'OCCUPE', 'EN_TRAVAUX'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-[#071B3A] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#071B3A]'
              }`}
            >
              {f === 'TOUS' ? 'Tous' : statutBienLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de bureaux */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((bureau) => {
          const loc = locataires.find(l => l.bien_id === bureau.id);
          return (
            <div key={bureau.id} className="card group cursor-pointer" onClick={() => setSelectedBien(bureau.id)}>
              <div className="relative h-44 bg-gray-100">
                <Image
                  src={bureau.images[0]}
                  alt={bureau.nom}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className={`badge ${statutBienColors[bureau.statut]}`}>
                    {statutBienLabels[bureau.statut]}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="badge bg-white/90 text-gray-700 backdrop-blur-sm">
                    {typeBienLabels[bureau.type]}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#071B3A] truncate">{bureau.nom}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={12} />
                  {bureau.quartier}, {bureau.ville}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Maximize size={12} />
                    {bureau.superficie} m²
                  </span>
                  <span>{bureau.nombre_pieces} pièce(s)</span>
                  {bureau.etage !== undefined && <span>Étage {bureau.etage}</span>}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <p className="text-lg font-bold text-[#35C928]">{formatMontant(bureau.loyer_mensuel)}<span className="text-xs text-gray-400 font-normal">/mois</span></p>
                  {loc && (
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                      {loc.prenom} {loc.nom}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Aucun bureau ne correspond à votre recherche</p>
        </div>
      )}

      {/* Modal détail */}
      {detail && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setSelectedBien(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-56">
              <Image
                src={detail.images[0]}
                alt={detail.nom}
                fill
                className="object-cover rounded-t-2xl cursor-pointer"
                onClick={() => setLightboxImg(detail.images[0])}
                sizes="640px"
              />
              <button
                onClick={() => setSelectedBien(null)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#071B3A]">{detail.nom}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={14} /> {detail.adresse}, {detail.quartier}
                  </p>
                </div>
                <span className={`badge ${statutBienColors[detail.statut]}`}>
                  {statutBienLabels[detail.statut]}
                </span>
              </div>

              <p className="text-sm text-gray-600">{detail.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-[#071B3A]">{detail.superficie}</p>
                  <p className="text-[10px] text-gray-500">m²</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-[#071B3A]">{detail.nombre_pieces}</p>
                  <p className="text-[10px] text-gray-500">pièce(s)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-[#35C928]">{formatMontant(detail.loyer_mensuel)}</p>
                  <p className="text-[10px] text-gray-500">loyer/mois</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-[#071B3A]">{formatMontant(detail.caution || 0)}</p>
                  <p className="text-[10px] text-gray-500">caution</p>
                </div>
              </div>

              {detail.equipements.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-[#071B3A] mb-2">Équipements</h3>
                  <div className="flex flex-wrap gap-2">
                    {detail.equipements.map((eq) => (
                      <span key={eq} className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {detailLocataire && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-[#071B3A] mb-2">Locataire actuel</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Nom : </span><span className="font-medium">{detailLocataire.prenom} {detailLocataire.nom}</span></div>
                    <div><span className="text-gray-500">Tél : </span><span className="font-medium">{detailLocataire.telephone}</span></div>
                    <div><span className="text-gray-500">Profession : </span><span className="font-medium">{detailLocataire.profession}</span></div>
                    <div><span className="text-gray-500">Entrée : </span><span className="font-medium">{detailLocataire.date_entree}</span></div>
                  </div>
                </div>
              )}

              {detail.images.length > 1 && (
                <div>
                  <h3 className="text-sm font-semibold text-[#071B3A] mb-2">Photos</h3>
                  <div className="flex gap-2 overflow-x-auto">
                    {detail.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setLightboxImg(img)}
                      >
                        <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="96px" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button onClick={() => setLightboxImg(null)} className="absolute top-4 right-4 text-white hover:text-gray-300">
            <X size={28} />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full">
            <Image src={lightboxImg} alt="Photo" fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </div>
  );
}

