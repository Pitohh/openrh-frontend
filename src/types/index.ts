export interface User {
  id: string;
  nom: string;
  email: string;
  role: 'Admin' | 'RH' | 'Manager' | 'Candidat';
  statut: 'Actif' | 'Inactif' | 'Suspendu';
  dateCreation: string;
  derniereConnexion: string;
}

export interface OffreEmploi {
  id: string;
  titre: string;
  entreprise: string;
  type: 'CDI' | 'CDD' | 'Stage' | 'Freelance';
  statut: 'Publiée' | 'Brouillon' | 'Archivée';
  datePublication: string;
  nombreCandidatures: number;
  matching: number;
}

export interface Statistique {
  candidatures: number;
  tauxMatching: number;
  conversions: number;
  nouveauxUtilisateurs: number;
}