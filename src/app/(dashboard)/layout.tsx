'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import { SpaceProvider } from '@/context/SpaceContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <SpaceProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
        {/* Sidebar latérale gauche (Verticale) */}
        <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        {/* Zone de contenu principale (Défilement vertical exclusif de haut en bas) */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* TopBar supérieure avec sélecteur des 3 espaces */}
          <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

          {/* Corps de la page */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>

        {/* Barre de navigation mobile inférieure (Accueil, Bureaux, Micro Assistant) */}
        <MobileBottomBar />
      </div>
    </SpaceProvider>
  );
}
