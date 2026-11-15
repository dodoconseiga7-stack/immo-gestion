'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('proprietaire@immogestion.bf');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<'PROPRIETAIRE' | 'SECRETAIRE'>('PROPRIETAIRE');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Stockage session et redirection
      localStorage.setItem('immo_user_role', role);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#071B3A] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl space-y-6">
        {/* En-tête officiel avec logo */}
        <div className="text-center space-y-3">
          {/* Logo officiel IMMO GESTION */}
          <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-[#071B3A]/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-officiel.png"
              alt="Logo IMMO GESTION"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-black text-[#071B3A] tracking-wider">
            IMMO <span className="text-[#35C928]">GESTION</span>
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Plateforme Sécurisée d&apos;Accès
          </p>
        </div>

        {/* Sélecteur de rôle (URL Unique) */}
        <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setRole('PROPRIETAIRE');
              setEmail('proprietaire@immogestion.bf');
            }}
            className={`py-2 rounded-lg transition-all ${
              role === 'PROPRIETAIRE'
                ? 'bg-[#071B3A] text-white shadow-sm'
                : 'text-gray-600 hover:text-[#071B3A]'
            }`}
          >
            Propriétaire
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('SECRETAIRE');
              setEmail('secretaire@immogestion.bf');
            }}
            className={`py-2 rounded-lg transition-all ${
              role === 'SECRETAIRE'
                ? 'bg-[#071B3A] text-white shadow-sm'
                : 'text-gray-600 hover:text-[#071B3A]'
            }`}
          >
            Secrétaire
          </button>
        </div>

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Adresse Email Professionnelle
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#35C928]" />
              Rester connecté
            </label>
            <a href="#" className="hover:text-[#071B3A]">Aide connexion</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center py-3 text-sm flex items-center gap-2 mt-2"
          >
            {loading ? 'Connexion en cours...' : (
              <>
                Accéder à l&apos;espace <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t text-center">
          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck size={14} className="text-[#35C928]" />
            Session cryptée SSL / Données Burkina Faso
          </p>
        </div>
      </div>
    </div>
  );
}

