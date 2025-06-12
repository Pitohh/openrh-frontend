import React, { useState, useRef, useCallback } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Upload, 
  FileText, 
  X, 
  Check, 
  Search,
  Filter,
  Heart,
  Eye,
  Calendar,
  Building,
  Star,
  Award,
  Target,
  Zap,
  Sun,
  Shield,
  Users,
  Clock
} from 'lucide-react';

interface CandidatProfile {
  nom: string;
  email: string;
  telephone: string;
  localisation: string;
  competences: string;
  experience: string;
  formation: string;
  cv?: File;
}

interface OffreEmploi {
  id: string;
  titre: string;
  entreprise: string;
  localisation: string;
  type: string;
  salaire: string;
  description: string;
  competences: string[];
  datePublication: string;
  matching: number;
  candidatures: number;
  statut: 'Ouverte' | 'Fermée' | 'Urgente';
}

interface Candidature {
  id: string;
  offreId: string;
  dateCandidature: string;
  statut: 'En attente' | 'Accepté' | 'Refusé' | 'En cours';
  message: string;
}

const CandidatSpace: React.FC = () => {
  const [activeView, setActiveView] = useState<'profil' | 'offres' | 'candidatures'>('profil');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [dragActive, setDragActive] = useState(false);
  const [showCVUpload, setShowCVUpload] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<CandidatProfile>({
    nom: 'Aminata Diallo',
    email: 'aminata.diallo@email.com',
    telephone: '+221 77 123 45 67',
    localisation: 'Dakar, Sénégal',
    competences: 'React, Node.js, TypeScript, Python, MongoDB',
    experience: '5 ans',
    formation: 'Master en Informatique - Université Cheikh Anta Diop',
    cv: undefined
  });

  // Mock data pour les offres
  const mockOffres: OffreEmploi[] = [
    {
      id: '1',
      titre: 'Développeur Full Stack Senior',
      entreprise: 'TechCorp Africa',
      localisation: 'Dakar, Sénégal',
      type: 'CDI',
      salaire: '800 000 - 1 200 000 FCFA',
      description: 'Nous recherchons un développeur expérimenté pour rejoindre notre équipe dynamique et travailler sur des projets innovants pour le marché africain.',
      competences: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      datePublication: '2024-01-15',
      matching: 92,
      candidatures: 42,
      statut: 'Ouverte'
    },
    {
      id: '2',
      titre: 'Designer UX/UI',
      entreprise: 'Creative Studio',
      localisation: 'Abidjan, Côte d\'Ivoire',
      type: 'CDI',
      salaire: '600 000 - 900 000 FCFA',
      description: 'Créez des expériences utilisateur exceptionnelles pour nos clients africains et internationaux.',
      competences: ['Figma', 'Adobe Creative Suite', 'Prototypage', 'Design System'],
      datePublication: '2024-01-18',
      matching: 78,
      candidatures: 28,
      statut: 'Urgente'
    },
    {
      id: '3',
      titre: 'Data Analyst',
      entreprise: 'Analytics Pro',
      localisation: 'Lagos, Nigeria',
      type: 'CDD',
      salaire: '700 000 - 1 000 000 FCFA',
      description: 'Analysez les données pour aider nos clients à prendre des décisions stratégiques.',
      competences: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
      datePublication: '2024-01-12',
      matching: 65,
      candidatures: 35,
      statut: 'Ouverte'
    },
    {
      id: '4',
      titre: 'Chef de Projet Digital',
      entreprise: 'Digital Agency',
      localisation: 'Casablanca, Maroc',
      type: 'CDI',
      salaire: '900 000 - 1 300 000 FCFA',
      description: 'Dirigez des projets digitaux innovants pour des clients prestigieux.',
      competences: ['Gestion de projet', 'Agile', 'Scrum', 'Leadership'],
      datePublication: '2024-01-20',
      matching: 85,
      candidatures: 18,
      statut: 'Ouverte'
    },
    {
      id: '5',
      titre: 'Développeur Mobile',
      entreprise: 'Mobile Solutions',
      localisation: 'Tunis, Tunisie',
      type: 'Freelance',
      salaire: '500 000 - 800 000 FCFA',
      description: 'Développez des applications mobiles pour iOS et Android.',
      competences: ['React Native', 'Flutter', 'iOS', 'Android'],
      datePublication: '2024-01-10',
      matching: 70,
      candidatures: 25,
      statut: 'Fermée'
    }
  ];

  // Mock data pour les candidatures
  const [candidatures, setCandidatures] = useState<Candidature[]>([
    {
      id: '1',
      offreId: '1',
      dateCandidature: '2024-01-20',
      statut: 'En cours',
      message: 'Très intéressé par ce poste qui correspond parfaitement à mon profil.'
    },
    {
      id: '2',
      offreId: '4',
      dateCandidature: '2024-01-21',
      statut: 'En attente',
      message: 'Mon expérience en gestion de projet me permettra de contribuer efficacement.'
    }
  ]);

  // Drag and Drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setProfile(prev => ({ ...prev, cv: file }));
        setShowCVUpload(false);
      } else {
        alert('Veuillez sélectionner un fichier PDF uniquement.');
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setProfile(prev => ({ ...prev, cv: file }));
        setShowCVUpload(false);
      } else {
        alert('Veuillez sélectionner un fichier PDF uniquement.');
      }
    }
  };

  const handleCandidature = (offreId: string) => {
    const nouvelleCandidature: Candidature = {
      id: Date.now().toString(),
      offreId,
      dateCandidature: new Date().toISOString().split('T')[0],
      statut: 'En attente',
      message: 'Candidature envoyée via la plateforme Open RH.'
    };
    setCandidatures(prev => [nouvelleCandidature, ...prev]);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'En attente': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'En cours': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Accepté': return 'text-green-600 bg-green-50 border-green-200';
      case 'Refusé': return 'text-red-600 bg-red-50 border-red-200';
      case 'Ouverte': return 'text-green-600 bg-green-50 border-green-200';
      case 'Fermée': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'Urgente': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getMatchingColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-yellow-600 bg-yellow-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'En attente': return <Sun className="w-4 h-4" />;
      case 'En cours': return <Clock className="w-4 h-4" />;
      case 'Accepté': return <Shield className="w-4 h-4" />;
      case 'Refusé': return <X className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  // Filtrage des offres
  const filteredOffres = mockOffres.filter(offre => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offre.entreprise.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || offre.type === filterType;
    const matchesLocation = filterLocation === 'all' || offre.localisation.includes(filterLocation);
    return matchesSearch && matchesType && matchesLocation;
  });

  const renderProfilView = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zen-dark mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Mon Profil
          </h2>
          <p className="text-zen-gray">Gérez vos informations personnelles et votre CV</p>
        </div>
        <div className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg">
          <span className="text-sm font-medium">Profil complété à 85%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations personnelles */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gold/20 shadow-zen p-6">
          <h3 className="text-xl font-bold text-zen-dark mb-6 flex items-center space-x-2">
            <User className="w-6 h-6 text-ocre" />
            <span>Informations Personnelles</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zen-dark mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={profile.nom}
                onChange={(e) => setProfile({...profile, nom: e.target.value})}
                className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zen-dark mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zen-dark mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={profile.telephone}
                onChange={(e) => setProfile({...profile, telephone: e.target.value})}
                className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zen-dark mb-2">
                Localisation
              </label>
              <input
                type="text"
                value={profile.localisation}
                onChange={(e) => setProfile({...profile, localisation: e.target.value})}
                className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zen-dark mb-2">
                Compétences
              </label>
              <input
                type="text"
                value={profile.competences}
                onChange={(e) => setProfile({...profile, competences: e.target.value})}
                className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                placeholder="Séparées par des virgules"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zen-dark mb-2">
                Expérience
              </label>
              <input
                type="text"
                value={profile.experience}
                onChange={(e) => setProfile({...profile, experience: e.target.value})}
                className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zen-dark mb-2">
                Formation
              </label>
              <input
                type="text"
                value={profile.formation}
                onChange={(e) => setProfile({...profile, formation: e.target.value})}
                className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-gradient-to-r from-ocre to-terre text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
              <Check className="w-4 h-4" />
              <span>Sauvegarder</span>
            </button>
          </div>
        </div>

        {/* CV Upload */}
        <div className="bg-white rounded-xl border border-gold/20 shadow-zen p-6">
          <h3 className="text-xl font-bold text-zen-dark mb-6 flex items-center space-x-2">
            <FileText className="w-6 h-6 text-solaire" />
            <span>Mon CV</span>
          </h3>

          {profile.cv ? (
            <div className="space-y-4">
              <div className="bg-solaire/10 p-4 rounded-lg border border-solaire/20">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-solaire" />
                  <div>
                    <p className="font-medium text-zen-dark">{profile.cv.name}</p>
                    <p className="text-sm text-zen-gray">
                      {(profile.cv.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowCVUpload(true)}
                className="w-full bg-zen-white border border-gold/20 text-zen-dark py-3 rounded-lg hover:bg-gold/5 transition-colors"
              >
                Remplacer le CV
              </button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer ${
                dragActive 
                  ? 'border-ocre bg-ocre/5 scale-105' 
                  : 'border-gold/30 hover:border-gold/50 hover:bg-gold/5'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className={`p-3 rounded-full transition-all duration-200 ${
                    dragActive ? 'bg-ocre text-white scale-110' : 'bg-gold/10 text-gold'
                  }`}>
                    <Upload className="w-8 h-8" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-zen-dark mb-2">
                    {dragActive ? 'Déposez votre CV ici' : 'Uploadez votre CV'}
                  </h4>
                  <p className="text-sm text-zen-gray mb-3">
                    Glissez-déposez ou cliquez pour sélectionner
                  </p>
                  <p className="text-xs text-zen-gray">
                    PDF uniquement • Max 10MB
                  </p>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {/* Statistiques du profil */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between p-3 bg-zen-white rounded-lg border border-gold/10">
              <span className="text-sm text-zen-gray">Vues du profil</span>
              <span className="font-bold text-zen-dark">127</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zen-white rounded-lg border border-gold/10">
              <span className="text-sm text-zen-gray">Candidatures envoyées</span>
              <span className="font-bold text-zen-dark">{candidatures.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zen-white rounded-lg border border-gold/10">
              <span className="text-sm text-zen-gray">Taux de réponse</span>
              <span className="font-bold text-solaire">65%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOffresView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zen-dark mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Offres d'Emploi
          </h2>
          <p className="text-zen-gray">Découvrez les opportunités qui vous correspondent</p>
        </div>
        <div className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg">
          <span className="text-sm font-medium">{filteredOffres.length} offres disponibles</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-zen-gray" />
            <input
              type="text"
              placeholder="Rechercher une offre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold"
          >
            <option value="all">Tous les types</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Freelance">Freelance</option>
          </select>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold"
          >
            <option value="all">Toutes les villes</option>
            <option value="Dakar">Dakar</option>
            <option value="Abidjan">Abidjan</option>
            <option value="Lagos">Lagos</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Tunis">Tunis</option>
          </select>
        </div>
      </div>

      {/* Offres Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOffres.map((offre) => {
          const dejaCandidature = candidatures.some(c => c.offreId === offre.id);
          
          return (
            <div key={offre.id} className="bg-white rounded-xl border border-gold/20 shadow-zen hover:shadow-gold transition-all duration-200 group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-zen-dark mb-2 group-hover:text-ocre transition-colors">
                      {offre.titre}
                    </h3>
                    <p className="text-zen-gray text-sm mb-2 flex items-center space-x-2">
                      <Building className="w-4 h-4" />
                      <span>{offre.entreprise}</span>
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-zen-gray mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{offre.localisation}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{offre.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(offre.statut)}`}>
                      {offre.statut}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${getMatchingColor(offre.matching)}`}>
                      <div className="flex items-center space-x-1">
                        <Target className="w-3 h-3" />
                        <span>{offre.matching}% Match</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-zen-gray text-sm mb-4 line-clamp-2">
                  {offre.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {offre.competences.slice(0, 3).map((comp, index) => (
                    <span key={index} className="bg-solaire/10 text-solaire px-2 py-1 rounded-full text-xs font-medium">
                      {comp}
                    </span>
                  ))}
                  {offre.competences.length > 3 && (
                    <span className="text-zen-gray text-xs px-2 py-1">
                      +{offre.competences.length - 3} autres
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                  <div className="flex items-center space-x-4 text-sm text-zen-gray">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{offre.candidatures} candidatures</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(offre.datePublication).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gold/10 rounded-lg transition-colors group/btn">
                      <Eye className="w-4 h-4 text-zen-gray group-hover/btn:text-ocre" />
                    </button>
                    {dejaCandidature ? (
                      <span className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1">
                        <Check className="w-4 h-4" />
                        <span>Candidature envoyée</span>
                      </span>
                    ) : offre.statut === 'Fermée' ? (
                      <span className="bg-gray-50 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium">
                        Fermée
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCandidature(offre.id)}
                        className="bg-gradient-to-r from-ocre to-terre text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2 group/btn"
                      >
                        <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span>Postuler</span>
                      </button>
                    )}
                  </div>
                </div>

                {offre.salaire && (
                  <div className="mt-3 pt-3 border-t border-gold/10">
                    <p className="text-sm font-medium text-zen-dark">
                      💰 {offre.salaire}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredOffres.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-zen-gray mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-zen-dark mb-2">Aucune offre trouvée</h3>
          <p className="text-zen-gray">
            Essayez de modifier vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );

  const renderCandidaturesView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zen-dark mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Mes Candidatures
          </h2>
          <p className="text-zen-gray">Suivez l'état de vos candidatures</p>
        </div>
        <div className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg">
          <span className="text-sm font-medium">{candidatures.length} candidatures actives</span>
        </div>
      </div>

      {/* Candidatures List */}
      <div className="bg-white rounded-xl border border-gold/20 shadow-zen">
        {candidatures.length > 0 ? (
          <div className="divide-y divide-gold/10">
            {candidatures.map((candidature) => {
              const offre = mockOffres.find(o => o.id === candidature.offreId);
              if (!offre) return null;

              return (
                <div key={candidature.id} className="p-6 hover:bg-zen-white transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-zen-dark mb-1">{offre.titre}</h3>
                          <p className="text-zen-gray text-sm mb-2 flex items-center space-x-2">
                            <Building className="w-4 h-4" />
                            <span>{offre.entreprise}</span>
                          </p>
                          <p className="text-ocre font-medium text-sm flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{offre.localisation}</span>
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(candidature.statut)}`}>
                          {getStatusIcon(candidature.statut)}
                          <span>{candidature.statut}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-zen-gray">
                          <Calendar className="w-4 h-4" />
                          <span>Candidature: {new Date(candidature.dateCandidature).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-zen-gray">
                          <Briefcase className="w-4 h-4" />
                          <span>{offre.type}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-zen-gray">
                          <Target className="w-4 h-4" />
                          <span>{offre.matching}% de correspondance</span>
                        </div>
                      </div>

                      {candidature.message && (
                        <div className="bg-zen-white p-3 rounded-lg border border-gold/10 mb-4">
                          <p className="text-sm text-zen-gray italic">"{candidature.message}"</p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {offre.competences.slice(0, 4).map((comp, index) => (
                          <span key={index} className="bg-indigo/10 text-indigo px-2 py-1 rounded-full text-xs font-medium">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button className="bg-zen-white border border-gold/20 text-zen-dark px-4 py-2 rounded-lg hover:bg-gold/5 transition-colors flex items-center space-x-2 group">
                        <Eye className="w-4 h-4 group-hover:text-ocre transition-colors" />
                        <span>Voir l'offre</span>
                      </button>
                      {candidature.statut === 'En cours' && (
                        <button className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2 group">
                          <Star className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>Suivre</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Heart className="w-16 h-16 text-zen-gray mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-zen-dark mb-2">Aucune candidature</h3>
            <p className="text-zen-gray mb-4">
              Vous n'avez pas encore postulé à des offres.
            </p>
            <button
              onClick={() => setActiveView('offres')}
              className="bg-gradient-to-r from-ocre to-terre text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Découvrir les offres
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-zen-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gold/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zen-dark" style={{ fontFamily: 'Playfair Display, serif' }}>
              Espace Candidat
            </h1>
            <p className="text-zen-gray mt-1">Bienvenue {profile.nom}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Profil vérifié ✓</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gold/20 px-6">
        <nav className="flex space-x-8">
          {[
            { id: 'profil', label: 'Mon Profil', icon: User },
            { id: 'offres', label: 'Offres d\'Emploi', icon: Briefcase },
            { id: 'candidatures', label: 'Mes Candidatures', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeView === tab.id
                    ? 'border-ocre text-ocre'
                    : 'border-transparent text-zen-gray hover:text-zen-dark'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeView === 'profil' && renderProfilView()}
        {activeView === 'offres' && renderOffresView()}
        {activeView === 'candidatures' && renderCandidaturesView()}
      </div>
    </div>
  );
};

export default CandidatSpace;