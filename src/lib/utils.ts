// Utilitaires de formatage pour IMMO GESTION

/**
 * Formate un montant en FCFA
 */
export function formatMontant(montant: number): string {
  return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
}

/**
 * Formate une date en format français
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Formate une date courte
 */
export function formatDateCourte(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Labels pour les types de biens
 */
export const typeBienLabels: Record<string, string> = {
  BUREAU: 'Bureau',
  MAISON: 'Maison',
  MINI_VILLA: 'Mini-Villa',
  VILLA: 'Villa',
  DUPLEX: 'Duplex',
  APPARTEMENT: 'Appartement',
  IMMEUBLE: 'Immeuble',
  ESPACE_COMMERCIAL: 'Espace Commercial',
};

/**
 * Labels pour les statuts de biens
 */
export const statutBienLabels: Record<string, string> = {
  DISPONIBLE: 'Disponible',
  OCCUPE: 'Occupé',
  EN_TRAVAUX: 'En travaux',
  RESERVE: 'Réservé',
};

/**
 * Couleurs pour les statuts de biens
 */
export const statutBienColors: Record<string, string> = {
  DISPONIBLE: 'bg-green-100 text-green-800',
  OCCUPE: 'bg-blue-100 text-blue-800',
  EN_TRAVAUX: 'bg-yellow-100 text-yellow-800',
  RESERVE: 'bg-purple-100 text-purple-800',
};

/**
 * Labels pour les statuts de paiement
 */
export const statutPaiementLabels: Record<string, string> = {
  PAYE: 'Payé',
  EN_ATTENTE: 'En attente',
  EN_RETARD: 'En retard',
  PARTIEL: 'Partiel',
};

export const statutPaiementColors: Record<string, string> = {
  PAYE: 'bg-green-100 text-green-800',
  EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
  EN_RETARD: 'bg-red-100 text-red-800',
  PARTIEL: 'bg-orange-100 text-orange-800',
};

/**
 * Labels pour les modes de paiement
 */
export const modePaiementLabels: Record<string, string> = {
  ESPECES: 'Espèces',
  ORANGE_MONEY: 'Orange Money',
  MOOV_MONEY: 'Moov Money',
  VIREMENT: 'Virement bancaire',
  CHEQUE: 'Chèque',
};

/**
 * Labels pour les catégories de dépenses
 */
export const categorieDepenseLabels: Record<string, string> = {
  SONABEL: 'SONABEL (Électricité)',
  ONEA: 'ONEA (Eau)',
  GARDIENNAGE: 'Gardiennage',
  ENTRETIEN: 'Entretien',
  REPARATION: 'Réparation',
  TAXES: 'Taxes & Impôts',
  ASSURANCE: 'Assurance',
  AUTRE: 'Autre',
};

/**
 * Labels pour les statuts de travaux
 */
export const statutTravauxLabels: Record<string, string> = {
  PLANIFIE: 'Planifié',
  EN_COURS: 'En cours',
  TERMINE: 'Terminé',
  ANNULE: 'Annulé',
};

export const statutTravauxColors: Record<string, string> = {
  PLANIFIE: 'bg-blue-100 text-blue-800',
  EN_COURS: 'bg-yellow-100 text-yellow-800',
  TERMINE: 'bg-green-100 text-green-800',
  ANNULE: 'bg-red-100 text-red-800',
};

export const prioriteTravauxColors: Record<string, string> = {
  FAIBLE: 'bg-gray-100 text-gray-800',
  MOYENNE: 'bg-blue-100 text-blue-800',
  HAUTE: 'bg-orange-100 text-orange-800',
  URGENTE: 'bg-red-100 text-red-800',
};

/**
 * Génère un numéro de reçu
 */
export function genererNumeroRecu(): string {
  const now = new Date();
  const year = now.getFullYear();
  const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `REC-${year}-${rand}`;
}

/**
 * Classe CSS utilitaire
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

