'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoScale, setLogoScale] = useState(0.85);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Animation d'entrée du logo
    const t1 = setTimeout(() => {
      setLogoScale(1);
      setLogoOpacity(1);
    }, 100);
    // Barre de chargement
    const t2 = setTimeout(() => setBarWidth(100), 300);
    // Fondu de sortie
    const t3 = setTimeout(() => setFadeOut(true), 2200);
    const t4 = setTimeout(() => setVisible(false), 2700);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#071B3A',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Logo + Texte */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
        }}
      >
        {/* Logo officiel */}
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-officiel.jpg"
            alt="IMMO GESTION"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Nom */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '0.15em',
            margin: 0,
            fontFamily: 'Inter, sans-serif',
          }}>
            IMMO <span style={{ color: '#35C928' }}>GESTION</span>
          </h1>
          <p style={{
            fontSize: '11px',
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginTop: '6px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Gestion Immobilière Professionnelle
          </p>
        </div>

        {/* Barre de progression */}
        <div style={{
          width: '180px',
          height: '3px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '99px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${barWidth}%`,
            backgroundColor: '#35C928',
            borderRadius: '99px',
            transition: 'width 1.9s ease',
          }} />
        </div>
      </div>

      {/* Mention Burkina Faso */}
      <p style={{
        position: 'absolute',
        bottom: '32px',
        fontSize: '10px',
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        fontFamily: 'Inter, sans-serif',
      }}>
        Burkina Faso · Ouagadougou
      </p>
    </div>
  );
}
