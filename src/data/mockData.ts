import { User, OffreEmploi, Statistique } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    nom: 'Aminata Diallo',
    email: 'aminata@openrh.com',
    role: 'Admin',
    statut: 'Actif',
    dateCreation: '2024-01-15',
    derniereConnexion: '2024-01-20 14:30'
  },
  {
    id: '2',
    nom: 'Jean-Baptiste Moreau',
    email: 'jb.moreau@corp.fr',
    role: 'RH',
    statut: 'Actif',
    dateCreation: '2024-01-10',
    derniereConnexion: '2024-01-20 09:15'
  },
  {
    id: '3',
    nom: 'Fatou Seck',
    email: 'fatou.seck@gmail.com',
    role: 'Candidat',
    statut: 'Actif',
    dateCreation: '2024-01-18',
    derniereConnexion: '2024-01-19 16:45'
  },
  {
    id: '4',
    nom: 'Mohamed Benali',
    email: 'mohamed.b@startup.io',
    role: 'Manager',
    statut: 'Inactif',
    dateCreation: '2024-01-05',
    derniereConnexion: '2024-01-15 11:20'
  },
  {
    id: '5',
    nom: 'Sophie Laurent',
    email: 'sophie.laurent@tech.com',
    role: 'RH',
    statut: 'Actif',
    dateCreation: '2024-01-12',
    derniereConnexion: '2024-01-20 08:30'
  }
];

export const mockOffres: OffreEmploi[] = [
  {
    id: '1',
    titre: 'Développeur Full Stack Senior',
    entreprise: 'TechCorp Africa',
    type: 'CDI',
    statut: 'Publiée',
    datePublication: '2024-01-15',
    nombreCandidatures: 42,
    matching: 85
  },
  {
    id: '2',
    titre: 'Chargé(e) de Recrutement',
    entreprise: 'Open RH Solutions',
    type: 'CDI',
    statut: 'Publiée',
    datePublication: '2024-01-18',
    nombreCandidatures: 28,
    matching: 78
  },
  {
    id: '3',
    titre: 'Designer UX/UI',
    entreprise: 'Creative Studio',
    type: 'Freelance',
    statut: 'Brouillon',
    datePublication: '2024-01-20',
    nombreCandidatures: 0,
    matching: 0
  },
  {
    id: '4',
    titre: 'Data Analyst',
    entreprise: 'Analytics Pro',
    type: 'CDD',
    statut: 'Publiée',
    datePublication: '2024-01-12',
    nombreCandidatures: 35,
    matching: 92
  },
  {
    id: '5',
    titre: 'Stage Marketing Digital',
    entreprise: 'Digital Agency',
    type: 'Stage',
    statut: 'Archivée',
    datePublication: '2024-01-01',
    nombreCandidatures: 67,
    matching: 65
  }
];

export const mockStatistiques: Statistique = {
  candidatures: 172,
  tauxMatching: 82,
  conversions: 45,
  nouveauxUtilisateurs: 23
};