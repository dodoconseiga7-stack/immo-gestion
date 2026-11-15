'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Settings,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  CheckCircle2,
  Building,
  Shield,
  Bell,
  Save,
  Eye,
  Trash2,
} from 'lucide-react';
import { useAppSpace } from '@/context/SpaceContext';

export default function ParametresPage() {
  const { customLogo, setCustomLogo, resetLogo } = useAppSpace();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(customLogo);
  const [devise, setDevise] = useState('FCFA');
  const [delaiGrace, setDelaiGrace] = useState('5');
  const [notificationsSMS, setNotificationsSMS] = useState(true);

  // Gestion de l'import de logo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("L'image est trop volumineuse (maximum 5 Mo).");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLogo = () => {
    if (logoPreview) {
      setCustomLogo(logoPreview);
    } else {
      resetLogo();
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const handleResetToDefault = () => {
    resetLogo();
    setLogoPreview(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#071B3A] flex items-center gap-2">
          <Settings size={24} className="text-[#35C928]" />
          Paramètres & Gestion de la Plateforme
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Personnalisation de l&apos;identité visuelle, règles de gestion et configuration agence
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-green-50 text-green-900 text-sm font-semibold border border-green-200 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-[#35C928]" />
          Vos modifications et l&apos;identité visuelle ont été enregistrées avec succès !
        </div>
      )}

      {/* SECTION EXIGÉE : IDENTITÉ VISUELLE */}
      <div className="card p-6 space-y-5 border-2 border-green-500/30 shadow-sm">
        <div className="flex items-start justify-between border-b pb-3">
          <div>
            <h2 className="text-base font-bold text-[#071B3A] flex items-center gap-2">
              <ImageIcon size={20} className="text-[#35C928]" />
              IDENTITÉ VISUELLE & LOGO OFFICIEL
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Importez, modifiez et prévisualisez le logo officiel de IMMO GESTION sans toucher au code
            </p>
          </div>
          <span className="badge bg-[#071B3A] text-white text-[10px] uppercase font-bold">
            Administration
          </span>
        </div>

        {/* Zone de prévisualisation double (Fond Bleu Nuit & Fond Blanc) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Aperçu sur Fond Bleu Nuit #071B3A */}
          <div className="p-4 rounded-xl bg-[#071B3A] text-white flex flex-col justify-between h-36">
            <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold">
              <span>Aperçu sur fond Bleu Nuit (#071B3A)</span>
              <span className="text-[#35C928]">Menu & PWA</span>
            </div>
            <div className="relative w-full h-14 my-auto">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoPreview}
                  alt="Aperçu logo"
                  className="w-full h-full object-contain object-left"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/logo-officiel.png"
                  alt="Logo officiel"
                  className="w-12 h-12 object-cover rounded-xl"
                />
              )}
            </div>
            <span className="text-[10px] text-gray-400">Rendu exact dans la barre latérale</span>
          </div>

          {/* Aperçu sur Fond Blanc */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 flex flex-col justify-between h-36">
            <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
              <span>Aperçu sur fond Blanc</span>
              <span>Reçus & Quittances</span>
            </div>
            <div className="relative w-full h-14 my-auto bg-gray-50 rounded-lg p-1">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoPreview}
                  alt="Aperçu logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/logo-officiel.png"
                  alt="Logo officiel"
                  className="w-12 h-12 object-cover rounded-xl mx-auto"
                />
              )}
            </div>
            <span className="text-[10px] text-gray-400">Rendu sur les impressions de quittances</span>
          </div>
        </div>

        {/* Contrôles d'import */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/svg+xml,image/png,image/jpeg,image/webp"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary text-xs flex items-center gap-2"
          >
            <Upload size={14} /> Importer un nouveau logo
          </button>

          <button
            type="button"
            onClick={handleSaveLogo}
            className="btn-secondary text-xs flex items-center gap-2"
          >
            <Save size={14} /> Enregistrer le logo
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="btn-outline text-xs text-red-600 hover:text-red-700 hover:border-red-300 flex items-center gap-1.5"
            title="Restaurer le logo officiel SVG par défaut"
          >
            <RefreshCw size={13} /> Restaurer logo officiel
          </button>
        </div>

        <p className="text-[11px] text-gray-500">
          Formats acceptés : SVG vectoriel (recommandé), PNG avec transparence, JPG ou WebP. Le logo est stocké localement et s&apos;applique immédiatement à l&apos;ensemble de l&apos;application sans rechargement.
        </p>
      </div>

      {/* Profil de l'agence */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-semibold text-[#071B3A] flex items-center gap-2 border-b pb-2">
          <Building size={18} className="text-[#35C928]" /> Identité de l&apos;Organisation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Nom de l&apos;agence</label>
            <input type="text" defaultValue="IMMO GESTION BURKINA" className="input" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Siège social / Ville</label>
            <input type="text" defaultValue="Ouagadougou, Burkina Faso" className="input" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Téléphone de contact</label>
            <input type="text" defaultValue="+226 25 30 00 00" className="input" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Email officiel</label>
            <input type="email" defaultValue="direction@immogestion.bf" className="input" />
          </div>
        </div>
      </div>

      {/* Règles financières */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-semibold text-[#071B3A] flex items-center gap-2 border-b pb-2">
          <Shield size={18} className="text-[#35C928]" /> Règles Locatives & Paiements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Devise principale</label>
            <select value={devise} onChange={(e) => setDevise(e.target.value)} className="input">
              <option value="FCFA">Franc CFA (FCFA)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Jour d&apos;échéance mensuelle</label>
            <input type="number" defaultValue="5" min="1" max="28" className="input" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Délai de grâce (jours)</label>
            <input
              type="number"
              value={delaiGrace}
              onChange={(e) => setDelaiGrace(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-semibold text-[#071B3A] flex items-center gap-2 border-b pb-2">
          <Bell size={18} className="text-[#35C928]" /> Alertes & Relances Locataires
        </h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsSMS}
              onChange={(e) => setNotificationsSMS(e.target.checked)}
              className="w-4 h-4 text-[#35C928] rounded border-gray-300 focus:ring-[#35C928]"
            />
            <span className="text-sm text-gray-700">
              Activer les relances automatiques par SMS le 5 de chaque mois
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-[#35C928] rounded border-gray-300 focus:ring-[#35C928]"
            />
            <span className="text-sm text-gray-700">
              Alerter le propriétaire en cas de signalement de travaux urgent
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Save size={16} /> Enregistrer l&apos;ensemble des réglages
        </button>
      </div>
    </div>
  );
}
