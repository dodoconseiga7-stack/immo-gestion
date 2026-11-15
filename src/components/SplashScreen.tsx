'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoScale, setLogoScale] = useState(0.9);
  const [logoOpacity, setLogoOpacity] = useState(0);

  useEffect(() => {
    // Animation d'apparition fluide et élégante (comme WhatsApp / ChatGPT)
    const tEnter = setTimeout(() => {
      setLogoScale(1);
      setLogoOpacity(1);
    }, 50);

    // Début du fondu de sortie
    const tFade = setTimeout(() => {
      setFadeOut(true);
    }, 1600);

    // Retrait complet de l'écran
    const tRemove = setTimeout(() => {
      setVisible(false);
    }, 2050);

    return () => {
      clearTimeout(tEnter);
      clearTimeout(tFade);
      clearTimeout(tRemove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#071B3A',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      {/* Conteneur Logo Officiel Grand et Centré */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
        }}
      >
        <div
          style={{
            width: 'clamp(180px, 48vw, 260px)',
            height: 'clamp(180px, 48vw, 260px)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-officiel.png"
            alt="Logo Officiel IMMO GESTION"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.55))',
            }}
          />
        </div>
      </div>
    </div>
  );
}
