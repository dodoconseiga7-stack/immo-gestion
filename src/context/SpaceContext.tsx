'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppSpace = 'PROPRIETAIRE' | 'SECRETAIRE' | 'ADMINISTRATEUR';

interface AppContextType {
  activeSpace: AppSpace;
  setActiveSpace: (space: AppSpace) => void;
  spaceLabel: string;
  spaceColor: string;
  customLogo: string | null;
  setCustomLogo: (logoDataUrl: string | null) => void;
  resetLogo: () => void;
}

const AppContext = createContext<AppContextType>({
  activeSpace: 'PROPRIETAIRE',
  setActiveSpace: () => {},
  spaceLabel: 'Espace Propriétaire',
  spaceColor: '#35C928',
  customLogo: null,
  setCustomLogo: () => {},
  resetLogo: () => {},
});

export function SpaceProvider({ children }: { children: React.ReactNode }) {
  const [activeSpace, setActiveSpaceState] = useState<AppSpace>('PROPRIETAIRE');
  const [customLogo, setCustomLogoState] = useState<string | null>(null);

  useEffect(() => {
    // Restaurer l'espace actif
    const savedSpace = localStorage.getItem('immo_active_space');
    if (savedSpace === 'PROPRIETAIRE' || savedSpace === 'SECRETAIRE' || savedSpace === 'ADMINISTRATEUR') {
      setActiveSpaceState(savedSpace);
    }

    // Restaurer le logo personnalisé s'il existe
    const savedLogo = localStorage.getItem('immo_custom_logo');
    if (savedLogo) {
      setCustomLogoState(savedLogo);
    }
  }, []);

  const setActiveSpace = (space: AppSpace) => {
    setActiveSpaceState(space);
    localStorage.setItem('immo_active_space', space);
  };

  const setCustomLogo = (logoDataUrl: string | null) => {
    setCustomLogoState(logoDataUrl);
    if (logoDataUrl) {
      localStorage.setItem('immo_custom_logo', logoDataUrl);
    } else {
      localStorage.removeItem('immo_custom_logo');
    }
  };

  const resetLogo = () => {
    setCustomLogoState(null);
    localStorage.removeItem('immo_custom_logo');
  };

  const spaceLabel =
    activeSpace === 'PROPRIETAIRE'
      ? 'Espace Propriétaire'
      : activeSpace === 'SECRETAIRE'
      ? 'Espace Secrétaire'
      : 'Espace Administrateur';

  const spaceColor =
    activeSpace === 'PROPRIETAIRE'
      ? '#35C928'
      : activeSpace === 'SECRETAIRE'
      ? '#0E7490'
      : '#D97706';

  return (
    <AppContext.Provider
      value={{
        activeSpace,
        setActiveSpace,
        spaceLabel,
        spaceColor,
        customLogo,
        setCustomLogo,
        resetLogo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppSpace = () => useContext(AppContext);
