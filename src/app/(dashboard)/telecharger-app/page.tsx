'use client';

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Laptop,
  Apple,
  Tablet,
  CheckCircle2,
  DownloadCloud,
  Share2,
  PlusSquare,
  ShieldCheck,
  Check,
  Info,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAppSpace } from '@/context/SpaceContext';

export default function TelechargerAppPage() {
  const { customLogo } = useAppSpace();
  const [deviceType, setDeviceType] = useState<'windows' | 'android' | 'ios' | 'ipad' | 'autre'>('autre');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || '';
      if (/iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        setDeviceType('ipad');
      } else if (/iPhone|iPod/i.test(ua)) {
        setDeviceType('ios');
      } else if (/Android/i.test(ua)) {
        setDeviceType('android');
      } else if (/Windows/i.test(ua)) {
        setDeviceType('windows');
      } else {
        setDeviceType('autre');
      }

      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsInstalled(true);
      }

      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      };
    }
  }, []);

  const handleInstallClick = async (platform: 'android' | 'windows' | 'ios' | 'ipad') => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setInstalledSuccess(true);
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
        return;
      } catch (err) {
        console.error('Erreur install prompt:', err);
      }
    }

    // Si le prompt natif n'est pas encore armé, ouvrir le guide d'installation visuel adapté
    setShowGuideModal(platform);
  };

  // Téléchargement d'un raccourci bureau natif Windows / Mac (.url)
  const handleDownloadDesktopShortcut = () => {
    const shortcutContent = `[InternetShortcut]\nURL=https://immo-gestion-pixora-academy1.vercel.app/dashboard\nIconIndex=0\nIconFile=https://immo-gestion-pixora-academy1.vercel.app/favicon.ico\n`;
    const blob = new Blob([shortcutContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'IMMO-GESTION.url';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setInstalledSuccess(true);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      {/* En-tête officiel */}
      <div className="text-center py-6 px-4 bg-[#071B3A] text-white rounded-2xl shadow-md border border-gray-800">
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden shadow-lg border border-white/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-officiel.png" alt="Logo Officiel IMMO GESTION" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-wide">
          INSTALLATION & TÉLÉCHARGEMENT OFFICIEL
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-2 leading-relaxed">
          Installez IMMO GESTION sur votre téléphone (Android, iPhone) ou votre ordinateur pour un accès instantané en plein écran avec le logo officiel, sans barre de navigation.
        </p>

        {/* Détection d'appareil */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#35C928]">
          <span className="w-2 h-2 rounded-full bg-[#35C928] animate-pulse" />
          Appareil détecté : {
            deviceType === 'windows' ? 'Ordinateur Windows' :
            deviceType === 'android' ? 'Smartphone Android' :
            deviceType === 'ios' ? 'iPhone (Apple iOS)' :
            deviceType === 'ipad' ? 'iPad (Apple iPadOS)' :
            'Navigateur Web'
          }
        </div>
      </div>

      {installedSuccess && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-sm font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={18} className="text-[#35C928]" />
          L&apos;application IMMO GESTION a été configurée avec succès sur votre appareil !
        </div>
      )}

      {/* Cartes par appareil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* A. Smartphone Android */}
        <div className={`card p-6 flex flex-col justify-between ${deviceType === 'android' ? 'border-[#35C928] shadow-md ring-2 ring-[#35C928]' : ''}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#35C928] flex items-center justify-center">
                <Smartphone size={24} />
              </div>
              {deviceType === 'android' && (
                <span className="badge bg-green-50 text-green-800 text-[10px] font-bold">Votre appareil</span>
              )}
            </div>
            <h2 className="text-base font-bold text-[#071B3A] mb-1.5">Sur Smartphone Android</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Installe l&apos;application officielle avec le logo pleine grandeur sans cercle blanc sur votre écran d&apos;accueil.
            </p>

            <ul className="text-xs text-gray-600 space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Fonctionne exactement comme une application native
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Plein écran sans barre d&apos;adresse Chrome
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Ouverture ultra rapide en 1 clic
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleInstallClick('android')}
            className="w-full btn-primary justify-center py-2.5 text-xs font-bold flex items-center gap-2"
          >
            <DownloadCloud size={16} /> Installer sur Android
          </button>
        </div>

        {/* B. Ordinateur Windows / Mac */}
        <div className={`card p-6 flex flex-col justify-between ${deviceType === 'windows' ? 'border-[#35C928] shadow-md ring-2 ring-[#35C928]' : ''}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#071B3A] flex items-center justify-center">
                <Laptop size={24} />
              </div>
              {deviceType === 'windows' && (
                <span className="badge bg-green-50 text-green-800 text-[10px] font-bold">Votre appareil</span>
              )}
            </div>
            <h2 className="text-base font-bold text-[#071B3A] mb-1.5">Sur Ordinateur Windows & Mac</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Installez l&apos;application de bureau avec raccourci direct sur votre bureau ou barre des tâches.
            </p>

            <ul className="text-xs text-gray-600 space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Fenêtre autonome sans onglets
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Raccourci téléchargeable en 1 clic
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleInstallClick('windows')}
              className="w-full btn-primary justify-center py-2 text-xs font-bold flex items-center gap-2"
            >
              <DownloadCloud size={15} /> Installer via le Navigateur
            </button>
            <button
              onClick={handleDownloadDesktopShortcut}
              className="w-full btn-secondary justify-center py-2 text-xs font-semibold flex items-center gap-2"
            >
              Télécharger le Raccourci Bureau (.url)
            </button>
          </div>
        </div>

        {/* C. iPhone (Apple iOS) */}
        <div className={`card p-6 flex flex-col justify-between ${deviceType === 'ios' ? 'border-[#35C928] shadow-md ring-2 ring-[#35C928]' : ''}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center">
                <Apple size={24} />
              </div>
              {deviceType === 'ios' && (
                <span className="badge bg-green-50 text-green-800 text-[10px] font-bold">Votre appareil</span>
              )}
            </div>
            <h2 className="text-base font-bold text-[#071B3A] mb-1.5">Sur iPhone (Apple Safari)</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Ajout direct sur votre écran d&apos;accueil iOS en 3 étapes via Safari :
            </p>

            <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-xs text-gray-700 border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-[10px]">1</span>
                <span>Touchez <strong>Partager</strong> en bas de Safari</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-[10px]">2</span>
                <span>Choisissez <strong>Sur l&apos;écran d&apos;accueil</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-[10px]">3</span>
                <span>Validez avec <strong>Ajouter</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleInstallClick('ios')}
            className="w-full btn-primary justify-center py-2.5 text-xs font-bold flex items-center gap-2 mt-4"
          >
            <Info size={16} /> Voir les instructions détaillées iPhone
          </button>
        </div>

        {/* D. iPad (Apple iPadOS) */}
        <div className={`card p-6 flex flex-col justify-between ${deviceType === 'ipad' ? 'border-[#35C928] shadow-md ring-2 ring-[#35C928]' : ''}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Tablet size={24} />
              </div>
              {deviceType === 'ipad' && (
                <span className="badge bg-green-50 text-green-800 text-[10px] font-bold">Votre appareil</span>
              )}
            </div>
            <h2 className="text-base font-bold text-[#071B3A] mb-1.5">Sur iPad (Apple iPadOS)</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Affichage grand écran optimisé pour tablette et stylet :
            </p>

            <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-xs text-gray-700 border border-gray-100">
              <p>1. Touchez l&apos;icône Partager en haut à droite de Safari.</p>
              <p>2. Sélectionnez <strong>Ajouter à l&apos;écran d&apos;accueil</strong>.</p>
            </div>
          </div>

          <button
            onClick={() => handleInstallClick('ipad')}
            className="w-full btn-primary justify-center py-2.5 text-xs font-bold flex items-center gap-2 mt-4"
          >
            <Info size={16} /> Voir les instructions iPad
          </button>
        </div>
      </div>

      {/* Modal d'instructions d'installation interactif */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-[#071B3A]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in border border-gray-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#071B3A] flex items-center gap-2">
                <Smartphone size={20} className="text-[#35C928]" />
                Comment installer l&apos;application
              </h3>
              <button
                onClick={() => setShowGuideModal(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {showGuideModal === 'android' && (
              <div className="space-y-3 text-xs text-gray-700">
                <p className="font-semibold text-gray-800">
                  Sur Google Chrome ou Edge pour Android :
                </p>
                <div className="p-3 bg-gray-50 rounded-xl space-y-2 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</span>
                    <span>Appuyez sur les <strong>3 petits points verticaux (⋮)</strong> tout en haut à droite de Chrome.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</span>
                    <span>Appuyez sur la ligne <strong>« Installer l&apos;application »</strong> (ou « Ajouter à l&apos;écran d&apos;accueil »).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">3</span>
                    <span>Appuyez sur <strong>« Installer »</strong> dans la fenêtre qui apparaît.</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 italic">
                  L&apos;application IMMO GESTION s&apos;ajoutera directement sur votre écran avec le logo officiel plein bord.
                </p>
              </div>
            )}

            {showGuideModal === 'windows' && (
              <div className="space-y-3 text-xs text-gray-700">
                <p className="font-semibold text-gray-800">
                  Sur Google Chrome, Microsoft Edge ou Brave :
                </p>
                <div className="p-3 bg-gray-50 rounded-xl space-y-2 border border-gray-200">
                  <p>1. Regardez dans votre <strong>barre d&apos;adresse</strong> tout à droite (à côté de l&apos;étoile de favori).</p>
                  <p>2. Cliquez sur l&apos;icône <strong>« Installer IMMO GESTION »</strong> (<DownloadCloud size={13} className="inline text-blue-600" />).</p>
                  <p>3. Cliquez sur <strong>Installer</strong> pour créer la fenêtre autonome.</p>
                </div>
              </div>
            )}

            {(showGuideModal === 'ios' || showGuideModal === 'ipad') && (
              <div className="space-y-3 text-xs text-gray-700">
                <p className="font-semibold text-gray-800">Sur le navigateur Apple Safari :</p>
                <div className="p-3 bg-gray-50 rounded-xl space-y-2 border border-gray-200">
                  <p>1. Appuyez sur le bouton <strong>Partager</strong> (<Share2 size={13} className="inline text-blue-600" />) au bas de l&apos;écran.</p>
                  <p>2. Faites défiler et touchez <strong>Sur l&apos;écran d&apos;accueil</strong> (<PlusSquare size={13} className="inline text-gray-700" />).</p>
                  <p>3. Touchez <strong>Ajouter</strong> en haut à droite.</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowGuideModal(null)}
              className="w-full btn-primary justify-center py-2 text-xs font-bold mt-2"
            >
              J&apos;ai compris
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
