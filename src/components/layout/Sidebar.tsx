'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Home,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  BookOpen,
  Wrench,
  FileBarChart,
  FileText,
  Download,
  Sparkles,
  Settings,
  X,
  LogOut,
  Smartphone,
  Shield,
} from 'lucide-react';
import { useAppSpace } from '@/context/SpaceContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const navItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/bureaux', label: 'Bureaux', icon: Building2 },
  { href: '/maisons', label: 'Maisons', icon: Home },
  { href: '/locataires', label: 'Locataires', icon: Users },
  { href: '/loyers', label: 'Loyers', icon: Wallet },
  { href: '/paiements', label: 'Paiements', icon: CreditCard },
  { href: '/depenses', label: 'Dépenses', icon: Receipt },
  { href: '/comptabilite', label: 'Comptabilité', icon: BookOpen },
  { href: '/travaux', label: 'Travaux et réparations', icon: Wrench },
  { href: '/rapports', label: 'Rapports', icon: FileBarChart },
  { href: '/recus', label: 'Reçus', icon: FileText },
  { href: '/telechargements', label: 'Téléchargements', icon: Download },
  { href: '/assistante', label: 'Assistant IA', icon: Sparkles },
  { href: '/telecharger-app', label: "TÉLÉCHARGER L'APPLICATION", icon: Smartphone, highlight: true },
  { href: '/parametres', label: 'Paramètres', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { spaceLabel, customLogo } = useAppSpace();

  return (
    <>
      {/* Overlay mobile semi-transparent */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#071B3A]/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar verticale permanente sur desktop, tiroir sur mobile */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          bg-white border-r border-gray-200/90
          w-[270px] flex flex-col
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:z-auto
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
      >
        {/* En-tête avec Logo Officiel IMMO GESTION */}
        <div className="p-4 border-b border-gray-100 bg-[#071B3A] text-white flex items-center justify-between">
          <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
              {customLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={customLogo}
                  alt="Logo Personnalisé IMMO GESTION"
                  className="w-full h-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/logo-officiel.png"
                  alt="Logo Officiel IMMO GESTION"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <span className="text-sm font-black tracking-wider text-white">
                IMMO <span className="text-[#35C928]">GESTION</span>
              </span>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">{spaceLabel}</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden text-gray-300 hover:text-white p-1 rounded-lg"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation strictement verticale de haut en bas */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          <div className="px-3 pb-2 pt-1 flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Menu Principal
            </span>
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const isHighlight = item.highlight;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold
                  transition-all duration-150 group relative
                  ${
                    isActive
                      ? 'bg-[#071B3A] text-white shadow-sm font-bold'
                      : isHighlight
                      ? 'bg-green-50/80 text-green-900 border border-green-200 hover:bg-green-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#071B3A]'
                  }
                `}
              >
                <Icon
                  size={17}
                  className={`flex-shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#35C928]'
                      : isHighlight
                      ? 'text-[#35C928]'
                      : 'text-gray-400 group-hover:text-[#35C928]'
                  }`}
                />
                <span className="flex-1 truncate">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C928] flex-shrink-0" />
                )}
                {isHighlight && !isActive && (
                  <span className="text-[9px] bg-[#35C928] text-white font-bold px-1.5 py-0.5 rounded-full">
                    PWA
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Pied de la Sidebar : Utilisateur & Espace */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-3 px-2 py-1.5 bg-white rounded-xl border border-gray-200/60 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-[#071B3A] text-[#35C928] font-black text-xs flex items-center justify-center flex-shrink-0">
              IG
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate leading-tight">IMMO GESTION</p>
              <p className="text-[10px] font-medium text-gray-500 truncate leading-tight">{spaceLabel}</p>
            </div>
            <Link
              href="/login"
              className="text-gray-400 hover:text-red-600 p-1 rounded-md transition-colors"
              title="Changer de session"
            >
              <LogOut size={15} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
