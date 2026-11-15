// Types pour l'application IMMO GESTION

export type UserRole = 'PROPRIETAIRE' | 'SECRETAIRE';

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  telephone?: string;
  created_at: string;
}

export type TypeBien = 'BUREAU' | 'MAISON' | 'MINI_VILLA' | 'VILLA' | 'DUPLEX' | 'APPARTEMENT' | 'IMMEUBLE' | 'ESPACE_COMMERCIAL';

export type StatutBien = 'DISPONIBLE' | 'OCCUPE' | 'EN_TRAVAUX' | 'RESERVE';

export interface Bien {
  id: string;
  nom: string;
  type: TypeBien;
  statut: StatutBien;
  adresse: string;
  quartier: string;
  ville: string;
  description?: string;
  superficie?: number;
  nombre_pieces?: number;
  nombre_chambres?: number;
  nombre_salles_bain?: number;
  etage?: number;
  loyer_mensuel: number;
  charges?: number;
  caution?: number;
  images: string[];
  equipements: string[];
  immeuble_id?: string;
  proprietaire_id: string;
  created_at: string;
  updated_at: string;
}

export interface Immeuble {
  id: string;
  nom: string;
  adresse: string;
  quartier: string;
  ville: string;
  nombre_niveaux: number;
  nombre_biens: number;
  image?: string;
  proprietaire_id: string;
  created_at: string;
}

export interface Locataire {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string;
  piece_identite_type: 'CNIB' | 'PASSEPORT' | 'CARTE_CONSULAIRE';
  piece_identite_numero: string;
  profession?: string;
  employeur?: string;
  personne_contact_nom?: string;
  personne_contact_tel?: string;
  bien_id?: string;
  date_entree?: string;
  date_fin_bail?: string;
  actif: boolean;
  created_at: string;
}

export type StatutPaiement = 'PAYE' | 'EN_ATTENTE' | 'EN_RETARD' | 'PARTIEL';
export type ModePaiement = 'ESPECES' | 'ORANGE_MONEY' | 'MOOV_MONEY' | 'VIREMENT' | 'CHEQUE';

export interface Paiement {
  id: string;
  locataire_id: string;
  bien_id: string;
  montant: number;
  montant_paye: number;
  mois: string;
  annee: number;
  date_paiement?: string;
  date_echeance: string;
  mode_paiement?: ModePaiement;
  statut: StatutPaiement;
  reference?: string;
  notes?: string;
  created_at: string;
}

export type CategorieDepense = 'SONABEL' | 'ONEA' | 'GARDIENNAGE' | 'ENTRETIEN' | 'REPARATION' | 'TAXES' | 'ASSURANCE' | 'AUTRE';

export interface Depense {
  id: string;
  bien_id?: string;
  immeuble_id?: string;
  categorie: CategorieDepense;
  description: string;
  montant: number;
  date_depense: string;
  fournisseur?: string;
  reference_facture?: string;
  created_at: string;
}

export type StatutTravaux = 'PLANIFIE' | 'EN_COURS' | 'TERMINE' | 'ANNULE';
export type PrioriteTravaux = 'FAIBLE' | 'MOYENNE' | 'HAUTE' | 'URGENTE';

export interface Travaux {
  id: string;
  bien_id: string;
  titre: string;
  description: string;
  statut: StatutTravaux;
  priorite: PrioriteTravaux;
  cout_estime?: number;
  cout_reel?: number;
  date_debut?: string;
  date_fin?: string;
  artisan_nom?: string;
  artisan_tel?: string;
  created_at: string;
}

export interface Recu {
  id: string;
  paiement_id: string;
  numero_recu: string;
  locataire_nom: string;
  bien_adresse: string;
  montant: number;
  mois_concerne: string;
  date_emission: string;
  emis_par: string;
}

export interface JournalAudit {
  id: string;
  user_id: string;
  user_nom: string;
  action: string;
  table_concernee: string;
  enregistrement_id: string;
  anciennes_valeurs?: Record<string, unknown>;
  nouvelles_valeurs?: Record<string, unknown>;
  created_at: string;
}

// Stats du Dashboard
export interface DashboardStats {
  total_biens: number;
  biens_occupes: number;
  biens_disponibles: number;
  total_locataires: number;
  revenus_mois: number;
  depenses_mois: number;
  paiements_en_retard: number;
  taux_occupation: number;
  travaux_en_cours: number;
}

