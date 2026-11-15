'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Home,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Wrench,
  ArrowUpRight,
  CreditCard,
  Wallet,
  CheckCircle2,
  Clock,
  XCircle,
  Bell,
  Sparkles,
  Shield,
  PlusCircle,
  FileText,
  Sliders,
} from 'lucide-react';
import { getDashboardStats, biens, paiements, locataires, travaux, depenses } from '@/lib/demo-data';
import {
  formatMontant,
  statutPaiementLabels,
  statutPaiementColors,
  typeBienLabels,
  statutTravauxLabels,
  statutTravauxColors,
  formatDateCourte,
} from '@/lib/utils';
import { useAppSpace } from '@/context/SpaceContext';

export default function DashboardPage() {
  const stats = getDashboardStats();
  const { activeSpace, spaceLabel } = useAppSpace();
  const [greeting, setGreeting] = useState('Bonjour');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
  }, []);

  // Données filtrées
  const bureaux = biens.filter((b) => b.type === 'BUREAU' || b.type === 'ESPACE_COMMERCIAL');
  const bureauxOccupes = bureaux.filter((b) => b.statut === 'OCCUPE').length;
  const bureauxDisponibles = bureaux.filter((b) => b.statut === 'DISPONIBLE').length;

  const maisons = biens.filter(
    (b) =>
      b.type === 'MAISON' ||
      b.type === 'MINI_VILLA' ||
      b.type === 'VILLA' ||
      b.type === 'DUPLEX' ||
      b.type === 'APPARTEMENT'
  );

  const impayesList = paiements.filter((p) => p.statut === 'EN_RETARD');
  const totalImpayes = impayesList.reduce((sum, p) => sum + (p.montant - p.montant_paye), 0);

  const recentPaiements = paiements.slice(0, 5);
  const travauxActifs = travaux.filter((t) => t.statut === 'EN_COURS' || t.statut === 'PLANIFIE');

  // Notifications récentes d'activité
  const notificationsRecentes = [
    {
      id: 'notif-1',
      titre: 'Loyer en retard constaté',
      detail: 'M. Jean-Baptiste Compaoré (Mini-Villa Ouaga 2000) - Relance nécessaire',
      type: 'retard',
      date: 'Aujourd\'hui 09:30',
    },
    {
      id: 'notif-2',
      titre: 'Travaux de climatisation en cours',
      detail: 'Intervention d\'artisan Souleymane sur Bureau A1 Kossodo Plaza',
      type: 'travaux',
      date: 'Hier 16:15',
    },
    {
      id: 'notif-3',
      titre: 'Règlement Orange Money validé',
      detail: '165 000 FCFA reçu pour Bureau A1 - Quittance #OM-2024-001 disponible',
      type: 'succes',
      date: '05 Nov 11:20',
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* En-tête avec message d'accueil et badge d'espace */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge bg-[#071B3A] text-white text-[10px] font-bold tracking-wider uppercase">
              {spaceLabel}
            </span>
            <span className="text-xs text-gray-400">• Ouagadougou, Burkina Faso</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#071B3A]">
            {greeting}, Monsieur le Directeur 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {activeSpace === 'PROPRIETAIRE'
              ? 'Supervision globale de votre patrimoine, rendements locatifs et trésorerie.'
              : activeSpace === 'SECRETAIRE'
              ? 'Guichet de saisie rapide des encaissements, dépenses et fiches locataires.'
              : 'Administration générale de l\'application, identité visuelle et paramètres.'}
          </p>
        </div>

        {/* Boutons d'action adaptés à l'espace */}
        <div className="flex flex-wrap gap-2.5">
          {activeSpace === 'SECRETAIRE' ? (
            <>
              <Link href="/paiements" className="btn-primary">
                <CreditCard size={15} /> Encaisser Loyer
              </Link>
              <Link href="/depenses" className="btn-outline">
                <PlusCircle size={15} /> Saisie Dépense
              </Link>
            </>
          ) : activeSpace === 'ADMINISTRATEUR' ? (
            <>
              <Link href="/parametres" className="btn-primary">
                <Sliders size={15} /> Configurer Agence
              </Link>
              <Link href="/rapports" className="btn-outline">
                <FileText size={15} /> Audit Système
              </Link>
            </>
          ) : (
            <>
              <Link href="/paiements" className="btn-primary">
                <CreditCard size={15} /> Nouveau Paiement
              </Link>
              <Link href="/bureaux" className="btn-secondary">
                <Building2 size={15} /> Consulter Bureaux
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Cartes statistiques supérieures (Section 5 du cahier des charges) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Nombre total de biens & Maisons */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#071B3A] flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <span className="text-[11px] font-bold text-[#35C928] bg-green-50 px-2 py-0.5 rounded-full">
              {stats.taux_occupation}% occupé
            </span>
          </div>
          <p className="text-2xl font-black text-[#071B3A]">{stats.total_biens}</p>
          <p className="text-xs font-semibold text-gray-500 mt-0.5">Patrimoine total géré</p>
          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Maisons : <strong className="text-gray-800">{maisons.length}</strong></span>
            <span>Bureaux : <strong className="text-gray-800">{bureaux.length}</strong></span>
          </div>
        </div>

        {/* 2. Bureaux occupés vs disponibles */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#35C928] flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <span className="badge bg-blue-50 text-blue-700 text-[10px]">
              Espaces Pro
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-[#071B3A]">{bureauxOccupes}</p>
            <span className="text-xs text-gray-400">occupé(s)</span>
          </div>
          <p className="text-xs font-semibold text-gray-500 mt-0.5">Bureaux & Espaces Commerciaux</p>
          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
            <span className="text-green-700 font-bold">{bureauxDisponibles} disponible(s)</span>
            <Link href="/bureaux" className="text-[#071B3A] hover:underline font-semibold flex items-center gap-0.5">
              Voir <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>

        {/* 3. Revenus mensuels encaissés */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-[#35C928] flex items-center justify-center">
              <Wallet size={20} />
            </div>
            <span className="text-[11px] font-bold text-green-700 flex items-center gap-0.5">
              <TrendingUp size={13} /> Actif
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#071B3A] truncate">
            {formatMontant(stats.revenus_mois)}
          </p>
          <p className="text-xs font-semibold text-gray-500 mt-0.5">Recettes du mois en cours</p>
          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Dépenses : <strong className="text-red-500">{formatMontant(stats.depenses_mois)}</strong></span>
          </div>
        </div>

        {/* 4. Loyers impayés & alertes */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            {stats.paiements_en_retard > 0 && (
              <span className="badge bg-red-50 text-red-700 text-[10px] font-bold animate-pulse">
                Action requise
              </span>
            )}
          </div>
          <p className="text-2xl font-black text-red-600">
            {formatMontant(totalImpayes)}
          </p>
          <p className="text-xs font-semibold text-gray-500 mt-0.5">
            {stats.paiements_en_retard} dossier(s) en retard
          </p>
          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
            <Link href="/loyers" className="text-red-600 hover:underline font-bold flex items-center gap-0.5">
              Détail des relances <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </div>

      {/* Grille principale : Derniers Paiements & Colonne de droite */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche (2/3) : Derniers paiements avec quittances instantanées */}
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div>
              <h2 className="font-bold text-base text-[#071B3A]">
                Derniers Paiements & Encaissements
              </h2>
              <p className="text-xs text-gray-400">Règlements récents enregistrés en Francs CFA</p>
            </div>
            <Link
              href="/paiements"
              className="text-xs font-bold text-[#35C928] hover:underline flex items-center gap-1"
            >
              Tous les paiements <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentPaiements.map((p) => {
              const loc = locataires.find((l) => l.id === p.locataire_id);
              const bien = biens.find((b) => b.id === p.bien_id);
              return (
                <div
                  key={p.id}
                  className="p-4 flex items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        p.statut === 'PAYE'
                          ? 'bg-green-50 text-[#35C928]'
                          : p.statut === 'EN_RETARD'
                          ? 'bg-red-50 text-red-500'
                          : 'bg-yellow-50 text-yellow-600'
                      }`}
                    >
                      {p.statut === 'PAYE' ? (
                        <CheckCircle2 size={18} />
                      ) : p.statut === 'EN_RETARD' ? (
                        <XCircle size={18} />
                      ) : (
                        <Clock size={18} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                        {loc ? `${loc.prenom} ${loc.nom}` : 'Locataire'}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {bien?.nom} • {p.mois} {p.annee}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-xs sm:text-sm font-black text-[#071B3A]">
                      {formatMontant(p.montant_paye)}
                    </p>
                    <span className={`badge text-[10px] mt-0.5 ${statutPaiementColors[p.statut]}`}>
                      {statutPaiementLabels[p.statut]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Colonne droite (1/3) : Taux d'occupation + Notifications d'activité */}
        <div className="space-y-6">
          {/* Taux d'occupation graphique circulaire */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-[#071B3A]">Taux d&apos;Occupation Global</h3>
              <span className="text-xs font-bold text-[#35C928]">{stats.taux_occupation}%</span>
            </div>

            <div className="relative w-32 h-32 mx-auto my-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#F1F5F9" strokeWidth="9" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#35C928"
                  strokeWidth="9"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${stats.taux_occupation * 2.64} ${264 - stats.taux_occupation * 2.64}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-[#071B3A]">{stats.taux_occupation}%</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase">Actif</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs pt-3 border-t border-gray-100">
              <div className="p-2 bg-green-50/70 rounded-lg">
                <span className="block text-[10px] text-green-700 font-semibold">Occupés</span>
                <strong className="text-sm font-bold text-green-900">{stats.biens_occupes} biens</strong>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <span className="block text-[10px] text-gray-500 font-semibold">Disponibles</span>
                <strong className="text-sm font-bold text-gray-800">{stats.biens_disponibles} libres</strong>
              </div>
            </div>
          </div>

          {/* Notifications récentes d'activité (Exigence Section 5) */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-[#071B3A] flex items-center gap-1.5">
                <Bell size={16} className="text-[#35C928]" /> Notifications Récentes
              </h3>
              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                3 alertes
              </span>
            </div>

            <div className="space-y-3">
              {notificationsRecentes.map((n) => (
                <div key={n.id} className="p-3 bg-gray-50/80 rounded-xl text-xs space-y-1 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-800">{n.titre}</p>
                    <span className="text-[10px] text-gray-400">{n.date}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{n.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Travaux et réparations en cours (Section 5) */}
      <div className="card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wrench size={16} />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base text-[#071B3A]">
                Travaux & Réparations Immobilières en Cours
              </h2>
              <p className="text-[11px] text-gray-400">Suivi des artisans et chantiers de maintenance à Ouagadougou</p>
            </div>
          </div>
          <Link
            href="/travaux"
            className="text-xs font-bold text-[#35C928] hover:underline flex items-center gap-1"
          >
            Voir tous les travaux <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-5">
          {travauxActifs.map((t) => {
            const bien = biens.find((b) => b.id === t.bien_id);
            return (
              <div
                key={t.id}
                className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-[#35C928] transition-all flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`badge text-[10px] ${statutTravauxColors[t.statut]}`}>
                      {statutTravauxLabels[t.statut]}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Début : {t.date_debut ? formatDateCourte(t.date_debut) : 'À planifier'}
                    </span>
                  </div>
                  <h4 className="font-bold text-[#071B3A] text-xs sm:text-sm mb-1 line-clamp-1">{t.titre}</h4>
                  <p className="text-[11px] text-gray-500 font-semibold mb-2">{bien?.nom}</p>
                  <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed mb-3">
                    {t.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-500">
                    Artisan : <strong className="text-gray-800">{t.artisan_nom || 'Non assigné'}</strong>
                  </span>
                  <span className="font-bold text-[#071B3A]">
                    {formatMontant(t.cout_estime || 0)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
