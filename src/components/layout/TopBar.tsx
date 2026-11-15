'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAppSpace, AppSpace } from '@/context/SpaceContext';
import {
  Bell,
  ShieldCheck,
  Briefcase,
  UserCheck,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  FileText,
  X,
  ArrowRight,
} from 'lucide-react';

interface TopBarProps {
  onOpenMobileMenu: () => void;
}

export default function TopBar({ onOpenMobileMenu }: TopBarProps) {
  const { activeSpace, setActiveSpace, spaceLabel } = useAppSpace();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notifRef = useRef<HTMLDivElement>(null);

  const spaces: { id: AppSpace; label: string; icon: typeof ShieldCheck }[] = [
    { id: 'PROPRIETAIRE', label: 'Propriétaire', icon: ShieldCheck },
    { id: 'SECRETAIRE', label: 'Secrétaire', icon: Briefcase },
    { id: 'ADMINISTRATEUR', label: 'Admin', icon: UserCheck },
  ];

  const notifications = [
    {
      id: 'n1',
      titre: 'Loyer en retard constaté',
      desc: 'M. Jean-Baptiste Compaoré (Mini-Villa Ouaga 2000) - 250 000 FCFA',
      href: '/loyers',
      icon: AlertTriangle,
      color: 'text-red-500 bg-red-50',
      time: 'Il y a 25 min',
    },
    {
      id: 'n2',
      titre: 'Travaux de climatisation en cours',
      desc: 'Artisan Souleymane sur Bureau A1 - Remplacement split 12000 BTU',
      href: '/travaux',
      icon: Wrench,
      color: 'text-amber-500 bg-amber-50',
      time: 'Il y a 2h',
    },
    {
      id: 'n3',
      titre: 'Règlement validé & Quittance prête',
      desc: '165 000 FCFA reçu pour Bureau A1 - Quittance #OM-2024-001',
      href: '/recus',
      icon: CheckCircle2,
      color: 'text-[#35C928] bg-green-50',
      time: 'Hier 11:20',
    },
  ];

  // Fermer quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      {/* Côté gauche : Bouton menu mobile + Sélecteur des 3 espaces */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-gray-700 hover:text-[#071B3A] hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu size={22} />
        </button>

        {/* Sélecteur des 3 espaces */}
        <div className="flex items-center bg-gray-100/80 p-1 rounded-xl border border-gray-200/60">
          {spaces.map((s) => {
            const Icon = s.icon;
            const isActive = activeSpace === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSpace(s.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  transition-all duration-200
                  ${isActive
                    ? 'bg-[#071B3A] text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#071B3A] hover:bg-white/60'
                  }
                `}
                title={`Passer à l'${s.label}`}
              >
                <Icon size={14} className={isActive ? 'text-[#35C928]' : 'text-gray-400'} />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Côté droit : Indicateur de statut, Notifications, Avatar */}
      <div className="flex items-center gap-3">
        {/* Badge d'espace actif */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-50/80 border border-green-200 rounded-full text-xs font-medium text-green-800">
          <span className="w-2 h-2 rounded-full bg-[#35C928] animate-pulse" />
          <span>{spaceLabel}</span>
        </div>

        {/* Menu déroulant Notifications interactives (Section 3) */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-500 hover:text-[#071B3A] hover:bg-gray-100 rounded-xl transition-colors"
            title="Notifications récentes"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 space-y-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#071B3A]">Notifications d&apos;Activité</h3>
                  {unreadCount > 0 && (
                    <span className="badge bg-red-50 text-red-600 text-[10px]">{unreadCount} nouvelles</span>
                  )}
                </div>
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] text-[#35C928] hover:underline font-semibold"
                >
                  Tout marquer lu
                </button>
              </div>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.id}
                      href={n.href}
                      onClick={() => setShowNotifications(false)}
                      className="py-2.5 px-1 flex items-start gap-3 hover:bg-gray-50 rounded-lg transition-colors group block"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${n.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-gray-800 group-hover:text-[#35C928] transition-colors truncate">
                            {n.titre}
                          </p>
                          <span className="text-[10px] text-gray-400 flex-shrink-0">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-snug line-clamp-2 mt-0.5">{n.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <Link
                  href="/dashboard"
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-500 hover:text-gray-800 text-[11px]"
                >
                  Retour au tableau de bord
                </Link>
                <Link
                  href="/loyers"
                  onClick={() => setShowNotifications(false)}
                  className="text-[#35C928] font-bold text-[11px] flex items-center gap-1 hover:underline"
                >
                  Gérer les impayés <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profil utilisateur connecté */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#071B3A] text-white font-bold text-xs flex items-center justify-center border border-gray-300">
            CS
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-gray-800 leading-tight">M. Conseiga</p>
            <p className="text-[10px] text-gray-400 leading-tight">Ouagadougou</p>
          </div>
        </div>
      </div>
    </header>
  );
}
