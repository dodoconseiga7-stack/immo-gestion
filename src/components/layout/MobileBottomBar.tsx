'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, Mic, FileText, Download } from 'lucide-react';

const mobileNavItems = [
  { href: '/dashboard', label: 'Accueil', icon: LayoutDashboard },
  { href: '/bureaux', label: 'Bureaux', icon: Building2 },
  { href: '/assistante', label: '', icon: Mic, isCenter: true },
  { href: '/recus', label: 'Reçus', icon: FileText },
  { href: '/telechargements', label: 'Docs', icon: Download },
];

export default function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <nav className="mobile-bottom-bar" aria-label="Navigation mobile">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        if (item.isCenter) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center -mt-5"
              aria-label="Assistant IA vocal"
            >
              <div className="w-12 h-12 bg-[#35C928] hover:bg-[#2db022] rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 border-2 border-[#071B3A] transition-transform active:scale-95">
                <Icon size={22} className="text-white" />
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 py-1 px-2.5 transition-colors"
          >
            <Icon
              size={18}
              className={isActive ? 'text-[#35C928]' : 'text-gray-400'}
            />
            <span
              className={`text-[10px] font-semibold leading-tight ${
                isActive ? 'text-[#35C928]' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
