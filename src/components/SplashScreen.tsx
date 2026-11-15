'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Supprimer le splash statique après chargement
    const timerFade = setTimeout(() => {
      const splash = document.getElementById('initial-splash');
      if (splash) {
        splash.style.opacity = '0';
        splash.style.pointerEvents = 'none';
        setTimeout(() => {
          splash.remove();
        }, 500);
      }
    }, 1600);

    return () => clearTimeout(timerFade);
  }, []);

  return null;
}
