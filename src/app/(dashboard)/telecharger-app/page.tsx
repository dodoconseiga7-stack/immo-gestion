'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Smartphone,
  Monitor,
  Apple,
  CheckCircle2,
  DownloadCloud,
  Share2,
  PlusSquare,
  Sparkles,
  ShieldCheck,
  Laptop,
  Tablet,
  Check,
} from 'lucide-react';
import { useAppSpace } from '@/context/SpaceContext';

export default function TelechargerAppPage() {
  const { customLogo } = useAppSpace();
  const [deviceType, setDeviceType] = useState<'windows' | 'android' | 'ios' | 'ipad' | 'autre'>('autre');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // Détection de l'appareil
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

      // Vérifier si déjà en mode standalone
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsInstalled(true);
      }

      // Écouter l'événement standard PWA beforeinstallprompt
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

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalledSuccess(true);
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Guide manuel
      alert(
        "Pour installer IMMO GESTION sur votre navigateur :\n1. Cliquez sur l'icône d'installation dans la barre d'adresse (ou Menu ⋮ > Installer IMMO GESTION).\n2. Validez pour créer le raccourci sur votre écran."
      );
    }
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      {/* En-tête officiel */}
      <div className="text-center py-6 px-4 bg-[#071B3A] text-white rounded-2xl shadow-md border border-gray-800">
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden shadow-lg border border-white/20">
          {customLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={customLogo} alt="Logo IMMO GESTION" className="w-full h-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/logo-officiel.png" alt="Logo Officiel IMMO GESTION" className="w-full h-full object-cover" />
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-wide">
          TÉLÉCHARGER & INSTALLER L&apos;APPLICATION
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-2 leading-relaxed">
          Installez IMMO GESTION directement sur votre ordinateur, iPhone, iPad ou Android pour un accès instantané en plein écran sans passer par le navigateur.
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
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-[#35C928]" />
          L&apos;application IMMO GESTION a été installée avec succès sur votre appareil !
        </div>
      )}

      {/* Cartes par appareil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* A. Ordinateur Windows */}
        <div className={`card p-6 flex flex-col justify-between ${deviceType === 'windows' ? 'border-[#35C928] shadow-md ring-1 ring-[#35C928]' : ''}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#071B3A] flex items-center justify-center">
                <Laptop size={24} />
              </div>
              {deviceType === 'windows' && (
                <span className="badge bg-green-50 text-green-800 text-[10px]">Votre appareil</span>
              )}
            </div>
            <h2 className="text-base font-bold text-[#071B3A] mb-1.5">Sur Ordinateur Windows & Mac</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Installez l&apos;application comme un logiciel de bureau natif accessible depuis le menu Démarrer et la barre des tâches avec icône officielle.
            </p>

            <ul className="text-xs text-gray-600 space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Fenêtre plein écran dédiée sans barre d&apos;adresse
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Raccourci direct sur le bureau Windows
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Lancement ultra rapide et données sécurisées
              </li>
            </ul>
          </div>

          <button
            onClick={handleInstallClick}
            className="w-full btn-primary justify-center py-2.5 text-xs font-bold"
          >
            <DownloadCloud size={16} /> Installer sur Ordinateur
          </button>
        </div>

        {/* B. Smartphone Android */}
        <div className={`card p-6 flex flex-col justify-between ${deviceType === 'android' ? 'border-[#35C928] shadow-md ring-1 ring-[#35C928]' : ''}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#35C928] flex items-center justify-center">
                <Smartphone size={24} />
              </div>
              {deviceType === 'android' && (
                <span className="badge bg-green-50 text-green-800 text-[10px]">Votre appareil</span>
              )}
            </div>
            <h2 className="text-base font-bold text-[#071B3A] mb-1.5">Sur Smartphone Android</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Ajout direct sur votre écran d&apos;accueil Android via Chrome ou Edge avec le logo officiel.
            </p>

            <ul className="text-xs text-gray-600 space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Fonctionne comme une application mobile native
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Aucune recherche de lien dans le navigateur
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[#35C928]" /> Notifications et consultation hors ligne
              </li>
            </ul>
          </div>

          <button
            onClick={handleInstallClick}
            className="w-full btn-primary justify-center py-2.5 text-xs font-bold"
          >
            <DownloadCloud size={16} /> Installer sur Android
          </button>
        </div>

        {/* C. iPhone (Apple Safari) */}
        <div className={`card p-6 flex flex-col justify-between ${deviceType === 'ios' ? 'border-[#35C928] shadow-md ring-1 ring-[#35C928]' : ''}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center">
                <Apple size={24} />
              </div>
              {deviceType === 'ios' && (
                <span className="badge bg-green-50 text-green-800 text-[10px]">Votre appareil</span>
              )}
            </div>
            <h2 className="text-base font-bold text-[#071B3A] mb-1.5">Sur iPhone (Apple iOS)</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Sur Safari iPhone, suivez les 3 étapes simples suivantes :
            </p>

            <div className="bg-gray-50 rounded-xl p-3 space-y-2.5 text-xs text-gray-700 border border-gray-100">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                  1
                </span>
                <span>
                  Appuyez sur le bouton <strong>Partager</strong> en bas de Safari (<Share2 size={13} className="inline text-blue-600" />).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                  2
                </span>
                <span>
                  Faites défiler vers le bas et choisissez <strong>Sur l&apos;écran d&apos;accueil</strong> (<PlusSquare size={13} className="inline text-gray-700" />).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                  3
                </span>
                <span>
                  Appuyez sur <strong>Ajouter</strong> en haut à droite.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-500 font-medium">
              Icône IMMO GESTION créée sur votre écran d&apos;accueil
            </span>
          </div>
        </div>

        {/* D. iPad (Apple iPadOS) */}
        <div className={`card p-6 flex flex-col justify-between ${deviceType === 'ipad' ? 'border-[#35C928] shadow-md ring-1 ring-[#35C928]' : ''}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Tablet size={24} />
              </div>
              {deviceType === 'ipad' && (
                <span className="badge bg-green-50 text-green-800 text-[10px]">Votre appareil</span>
              )}
            </div>
            <h2 className="text-base font-bold text-[#071B3A] mb-1.5">Sur iPad (Apple iPadOS)</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Sur votre iPad, l&apos;application s&apos;affiche en haute résolution grand écran :
            </p>

            <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-xs text-gray-700 border border-gray-100">
              <p>1. Touchez le bouton Partager en haut à droite de Safari (<Share2 size={13} className="inline" />).</p>
              <p>2. Choisissez <strong>Ajouter à l&apos;écran d&apos;accueil</strong>.</p>
              <p>3. L&apos;application s&apos;ouvre ensuite comme une application iPad native.</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-500 font-medium">
              Affichage optimisé tactile et stylet
            </span>
          </div>
        </div>
      </div>

      {/* Avantages de la PWA */}
      <div className="card p-5 bg-white border border-gray-200">
        <h3 className="text-sm font-bold text-[#071B3A] flex items-center gap-2 mb-3">
          <ShieldCheck size={18} className="text-[#35C928]" />
          Avantages de l&apos;Application Installée
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
          <div className="p-3 bg-gray-50 rounded-lg">
            <strong className="block text-gray-800 mb-1">Même lien & mêmes données</strong>
            Synchronisation continue et transparente avec vos biens et loyers.
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <strong className="block text-gray-800 mb-1">Plein écran immersif</strong>
            Aucun onglet ou barre de recherche qui encombre votre affichage.
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <strong className="block text-gray-800 mb-1">Mises à jour automatiques</strong>
            Chaque amélioration est immédiatement active sans réinstallation.
          </div>
        </div>
      </div>
    </div>
  );
}

