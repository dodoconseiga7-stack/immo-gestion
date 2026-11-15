'use client';

import React, { useEffect } from 'react';
import { RotateCw, AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erreur de navigation capturée:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 shadow-sm border border-amber-200">
        <AlertTriangle size={32} />
      </div>
      <h2 className="text-xl font-bold text-[#071B3A] mb-2">
        Chargement de la rubrique optimisé
      </h2>
      <p className="text-xs text-gray-500 max-w-md mb-6 leading-relaxed">
        Une mise à jour récente a été déployée. Cliquez ci-dessous pour actualiser instantanément l&apos;affichage de cette page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="btn-primary py-2.5 px-5 text-xs font-bold flex items-center gap-2"
        >
          <RotateCw size={15} />
          Actualiser la page
        </button>
        <Link
          href="/dashboard"
          className="btn-secondary py-2.5 px-5 text-xs font-bold flex items-center gap-2"
        >
          <Home size={15} />
          Retour au Tableau de bord
        </Link>
      </div>
    </div>
  );
}
