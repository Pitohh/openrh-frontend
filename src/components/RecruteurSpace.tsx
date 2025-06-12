import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  MessageSquare,
  Heart,
  Award,
  Target,
  Zap,
  Upload,
  FileText,
  X,
  Check,
  User,
  Mail
} from 'lucide-react';

interface Candidature {
  id: string;
  nom: string;
  email: string;
  poste: string;
  scoreMatching: number;
  statut: 'Nouveau' | 'En cours' | 'Accepté' | 'Refusé';
  datePostulation: string;
  competences: string[];
  experience: string;
  localisation: string;
}

interface OffreEmploi {
  id: string;
  titre: string;
  entreprise: string;
  description: string;
  competences: string[];
  localisation: string;
  type: string;
  salaire: string;
  statut: 'Brouillon' | 'Publiée' | 'Fermée';
  dateCreation: string;
  candidatures: number;
}

interface CVFile {
  id: string;
  file: File;
  candidatNom: string;
  candidatEmail: string;
  competences: string;
  offreAssociee: string;
  statut: 'En attente' | 'Traité' | 'Rejeté';
  dateUpload: string;
}

const RecruteurSpace: React.FC = () => {
  const [activeView, setActiveView] = useState<'offres' | 'candidatures' | 'nouvelle-offre' | 'upload-cv'>('offres');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOffre, setSelectedOffre] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadedCVs, setUploadedCVs] = useState<CVFile[]>([]);

  const [uploadFormData, setUploadFormData] = useState({
    candidatNom: '',
    candidatEmail: '',
    competences: '',
    offreAssociee: ''
  });

  // Mock data
  const mockOffres: OffreEmploi[] = [
    {
      id: '1',
      titre: 'Développeur Full Stack Senior',
      entreprise: 'TechCorp Africa',
      description: 'Nous recherchons un développeur expérimenté pour rejoindre notre équipe dynamique...',
      competences: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      localisation: 'Dakar, Sénégal',
      type: 'CDI',
      salaire: '800 000 - 1 200 000 FCFA',
      statut: 'Publiée',
      dateCreation: '2024-01-15',
      candidatures: 42
    },
    {
      id: '2',
      titre: 'Designer UX/UI',
      entreprise: 'Creative Studio',
      description: 'Créez des expériences utilisateur exceptionnelles pour nos clients africains...',
      competences: ['Figma', 'Adobe Creative Suite', 'Prototypage', 'Design System'],
      localisation: 'Abidjan, Côte d\'Ivoire',
      type: 'CDI',
      salaire: '600 000 - 900 000 FCFA',
      statut: 'Brouillon',
      dateCreation: '2024-01-18',
      candidatures: 0
    }
  ];

  const mockCandidatures: Candidature[] = [
    {
      id: '1',
      nom: 'Aminata Diallo',
      email: 'aminata.diallo@email.com',
      poste: 'Développeur Full Stack Senior',
      scoreMatching: 92,
      statut: 'Nouveau',
      datePostulation: '2024-01-20',
      competences: ['React', 'Node.js', 'TypeScript', 'Python'],
      experience: '5 ans',
      localisation: 'Dakar, Sénégal'
    },
    {
      id: '2',
      nom: 'Kwame Asante',
      email: 'kwame.asante@email.com',
      poste: 'Développeur Full Stack Senior',
      scoreMatching: 87,
      statut: 'En cours',
      datePostulation: '2024-01-19',
      competences: ['React', 'Vue.js', 'Express', 'PostgreSQL'],
      experience: '4 ans',
      localisation: 'Accra, Ghana'
    },
    {
      id: '3',
      nom: 'Fatou Seck',
      email: 'fatou.seck@email.com',
      poste: 'Designer UX/UI',
      scoreMatching: 95,
      statut: 'Accepté',
      datePostulation: '2024-01-17',
      competences: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      experience: '6 ans',
      localisation: 'Dakar, Sénégal'
    }
  ];

  const [formData, setFormData] = useState({
    titre: '',
    entreprise: '',
    description: '',
    competences: '',
    localisation: '',
    type: 'CDI',
    salaire: '',
    statut: 'Brouillon'
  });

  // Upload CV handlers
  const handleDrag = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setCurrentFile(file);
        setShowUploadForm(true);
      } else {
        alert('Veuillez sélectionner un fichier PDF uniquement.');
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setCurrentFile(file);
        setShowUploadForm(true);
      } else {
        alert('Veuillez sélectionner un fichier PDF uniquement.');
      }
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentFile && uploadFormData.candidatNom && uploadFormData.candidatEmail && uploadFormData.offreAssociee) {
      const newCV: CVFile = {
        id: Date.now().toString(),
        file: currentFile,
        candidatNom: uploadFormData.candidatNom,
        candidatEmail: uploadFormData.candidatEmail,
        competences: uploadFormData.competences,
        offreAssociee: uploadFormData.offreAssociee,
        statut: 'En attente',
        dateUpload: new Date().toISOString().split('T')[0]
      };
      
      setUploadedCVs(prev => [newCV, ...prev]);
      
      // Reset form
      setUploadFormData({
        candidatNom: '',
        candidatEmail: '',
        competences: '',
        offreAssociee: ''
      });
      setCurrentFile(null);
      setShowUploadForm(false);
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Nouveau': case 'En attente': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'En cours': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Accepté': case 'Publiée': case 'Traité': return 'text-green-600 bg-green-50 border-green-200';
      case 'Refusé': case 'Fermée': case 'Rejeté': return 'text-red-600 bg-red-50 border-red-200';
      case 'Brouillon': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getMatchingColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-yellow-600 bg-yellow-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Offre créée:', formData);
    // Reset form
    setFormData({
      titre: '',
      entreprise: '',
      description: '',
      competences: '',
      localisation: '',
      type: 'CDI',
      salaire: '',
      statut: 'Brouillon'
    });
    setActiveView('offres');
  };

  const renderUploadCVView = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zen-dark mb-2">Upload CV</h2>
          <p className="text-zen-gray">Importez les CV reçus via d'autres canaux</p>
        </div>
        <div className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg">
          <span className="text-sm font-medium">{uploadedCVs.filter(cv => cv.statut === 'En attente').length} CV en attente</span>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl border border-gold/20 shadow-zen p-8">
        <h3 className="text-xl font-bold text-zen-dark mb-6 flex items-center space-x-2">
          <Upload className="w-6 h-6 text-ocre" />
          <span>Importer un CV</span>
        </h3>

        {/* Drag and Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-ocre bg-ocre/5 scale-105' 
              : 'border-gold/30 hover:border-gold/50 hover:bg-gold/5'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className={`p-4 rounded-full transition-all duration-200 ${
                dragActive ? 'bg-ocre text-white scale-110' : 'bg-gold/10 text-gold'
              }`}>
                <FileText className="w-12 h-12" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-zen-dark mb-2">
                {dragActive ? 'Déposez votre fichier ici' : 'Glissez-déposez votre CV'}
              </h4>
              <p className="text-zen-gray mb-4">
                Ou cliquez pour sélectionner un fichier PDF
              </p>
              
              <button
                onClick={() => document.getElementById('cv-file-input')?.click()}
                className="bg-gradient-to-r from-ocre to-terre text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
              >
                Sélectionner un fichier
              </button>
              
              <input
                id="cv-file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            
            <p className="text-sm text-zen-gray">
              Formats acceptés: PDF uniquement • Taille max: 10MB
            </p>
          </div>
        </div>
      </div>

      {/* CV List */}
      {uploadedCVs.length > 0 && (
        <div className="bg-white rounded-xl border border-gold/20 shadow-zen">
          <div className="p-6 border-b border-gold/20">
            <h3 className="text-xl font-bold text-zen-dark">CV Uploadés ({uploadedCVs.length})</h3>
          </div>
          <div className="divide-y divide-gold/10">
            {uploadedCVs.map((cv) => (
              <div key={cv.id} className="p-6 hover:bg-zen-white transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-zen-dark">{cv.candidatNom}</h4>
                    <p className="text-sm text-zen-gray">{cv.candidatEmail}</p>
                    <p className="text-sm text-ocre">{mockOffres.find(o => o.id === cv.offreAssociee)?.titre}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(cv.statut)}`}>
                    {cv.statut}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Form Modal */}
      {showUploadForm && currentFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gold/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-zen-dark">Informations du Candidat</h3>
                <button
                  onClick={() => {
                    setShowUploadForm(false);
                    setCurrentFile(null);
                    setUploadFormData({
                      candidatNom: '',
                      candidatEmail: '',
                      competences: '',
                      offreAssociee: ''
                    });
                  }}
                  className="p-2 hover:bg-gold/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-zen-gray" />
                </button>
              </div>
              <p className="text-zen-gray mt-1">Fichier: {currentFile.name}</p>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zen-dark mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nom du candidat *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadFormData.candidatNom}
                    onChange={(e) => setUploadFormData({...uploadFormData, candidatNom: e.target.value})}
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                    placeholder="Prénom Nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zen-dark mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email du candidat *
                  </label>
                  <input
                    type="email"
                    required
                    value={uploadFormData.candidatEmail}
                    onChange={(e) => setUploadFormData({...uploadFormData, candidatEmail: e.target.value})}
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                    placeholder="email@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zen-dark mb-2">
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  Offre d'emploi associée *
                </label>
                <select
                  required
                  value={uploadFormData.offreAssociee}
                  onChange={(e) => setUploadFormData({...uploadFormData, offreAssociee: e.target.value})}
                  className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                >
                  <option value="">Sélectionnez une offre</option>
                  {mockOffres.map((offre) => (
                    <option key={offre.id} value={offre.id}>
                      {offre.titre} - {offre.entreprise}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zen-dark mb-2">
                  Compétences principales
                </label>
                <input
                  type="text"
                  value={uploadFormData.competences}
                  onChange={(e) => setUploadFormData({...uploadFormData, competences: e.target.value})}
                  className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                  placeholder="React, Node.js, TypeScript (séparées par des virgules)"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gold/20">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadForm(false);
                    setCurrentFile(null);
                    setUploadFormData({
                      candidatNom: '',
                      candidatEmail: '',
                      competences: '',
                      offreAssociee: ''
                    });
                  }}
                  className="px-6 py-3 border border-gold/20 text-zen-dark rounded-lg hover:bg-gold/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-ocre to-terre text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer le CV</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderOffresView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zen-dark mb-2">Mes Offres d'Emploi</h2>
          <p className="text-zen-gray">Gérez vos offres et suivez les candidatures</p>
        </div>
        <button
          onClick={() => setActiveView('nouvelle-offre')}
          className="bg-gradient-to-r from-ocre to-terre text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span>Nouvelle Offre</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold"
          >
            <option value="all">Tous les statuts</option>
            <option value="Publiée">Publiées</option>
            <option value="Brouillon">Brouillons</option>
            <option value="Fermée">Fermées</option>
          </select>
        </div>
      </div>

      {/* Offres Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockOffres.map((offre) => (
          <div key={offre.id} className="bg-white rounded-xl border border-gold/20 shadow-zen hover:shadow-gold transition-all duration-200 group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-zen-dark mb-2 group-hover:text-ocre transition-colors">
                    {offre.titre}
                  </h3>
                  <p className="text-zen-gray text-sm mb-2">{offre.entreprise}</p>
                  <div className="flex items-center space-x-4 text-sm text-zen-gray">
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
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(offre.statut)}`}>
                  {offre.statut}
                </span>
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
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-zen-gray">
                    <Users className="w-4 h-4" />
                    <span>{offre.candidatures} candidatures</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-zen-gray">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(offre.dateCreation).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gold/10 rounded-lg transition-colors group/btn">
                    <Eye className="w-4 h-4 text-zen-gray group-hover/btn:text-ocre" />
                  </button>
                  <button className="p-2 hover:bg-gold/10 rounded-lg transition-colors group/btn">
                    <Edit className="w-4 h-4 text-zen-gray group-hover/btn:text-ocre" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCandidaturesView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zen-dark mb-2">CV Associés</h2>
          <p className="text-zen-gray">Évaluez et gérez les CV reçus pour vos offres</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gold/20 text-zen-dark px-4 py-2 rounded-lg hover:bg-gold/5 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
          <button className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Candidatures List */}
      <div className="bg-white rounded-xl border border-gold/20 shadow-zen overflow-hidden">
        <div className="divide-y divide-gold/10">
          {mockCandidatures.map((candidature) => (
            <div key={candidature.id} className="p-6 hover:bg-zen-white transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-zen-dark mb-1">{candidature.nom}</h3>
                      <p className="text-zen-gray text-sm mb-2">{candidature.email}</p>
                      <p className="text-ocre font-medium text-sm">{candidature.poste}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${getMatchingColor(candidature.scoreMatching)}`}>
                        <div className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{candidature.scoreMatching}% Match</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidature.statut)}`}>
                        {candidature.statut}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-zen-gray">
                      <MapPin className="w-4 h-4" />
                      <span>{candidature.localisation}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-zen-gray">
                      <Award className="w-4 h-4" />
                      <span>{candidature.experience} d'expérience</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-zen-gray">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(candidature.datePostulation).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidature.competences.map((comp, index) => (
                      <span key={index} className="bg-indigo/10 text-indigo px-2 py-1 rounded-full text-xs font-medium">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="bg-zen-white border border-gold/20 text-zen-dark px-4 py-2 rounded-lg hover:bg-gold/5 transition-colors flex items-center space-x-2 group">
                    <Eye className="w-4 h-4 group-hover:text-ocre transition-colors" />
                    <span>Voir</span>
                  </button>
                  <button className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2 group">
                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Contacter</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNouvelleOffreView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zen-dark mb-2">Créer une Nouvelle Offre</h2>
        <p className="text-zen-gray">Remplissez les informations pour publier votre offre d'emploi</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gold/20 shadow-zen p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zen-dark mb-2">
              Titre du poste *
            </label>
            <input
              type="text"
              required
              value={formData.titre}
              onChange={(e) => setFormData({...formData, titre: e.target.value})}
              className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              placeholder="Ex: Développeur Full Stack Senior"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zen-dark mb-2">
              Entreprise *
            </label>
            <input
              type="text"
              required
              value={formData.entreprise}
              onChange={(e) => setFormData({...formData, entreprise: e.target.value})}
              className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              placeholder="Nom de votre entreprise"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zen-dark mb-2">
            Description du poste *
          </label>
          <textarea
            required
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all resize-none"
            placeholder="Décrivez le poste, les responsabilités, l'environnement de travail..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zen-dark mb-2">
              Compétences requises *
            </label>
            <input
              type="text"
              required
              value={formData.competences}
              onChange={(e) => setFormData({...formData, competences: e.target.value})}
              className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              placeholder="React, Node.js, TypeScript (séparées par des virgules)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zen-dark mb-2">
              Localisation *
            </label>
            <input
              type="text"
              required
              value={formData.localisation}
              onChange={(e) => setFormData({...formData, localisation: e.target.value})}
              className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              placeholder="Ville, Pays"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zen-dark mb-2">
              Type de contrat
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
            >
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zen-dark mb-2">
              Fourchette salariale
            </label>
            <input
              type="text"
              value={formData.salaire}
              onChange={(e) => setFormData({...formData, salaire: e.target.value})}
              className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              placeholder="Ex: 800 000 - 1 200 000 FCFA"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gold/20">
          <button
            type="button"
            onClick={() => setActiveView('offres')}
            className="px-6 py-3 border border-gold/20 text-zen-dark rounded-lg hover:bg-gold/5 transition-colors"
          >
            Annuler
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              type="submit"
              onClick={() => setFormData({...formData, statut: 'Brouillon'})}
              className="bg-zen-white border border-gold/20 text-zen-dark px-6 py-3 rounded-lg hover:bg-gold/5 transition-colors flex items-center space-x-2"
            >
              <span>Sauvegarder en brouillon</span>
            </button>
            <button
              type="submit"
              onClick={() => setFormData({...formData, statut: 'Publiée'})}
              className="bg-gradient-to-r from-ocre to-terre text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2 group"
            >
              <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Publier l'offre</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="flex-1 bg-zen-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gold/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zen-dark">Espace Recruteur</h1>
            <p className="text-zen-gray mt-1">Gérez vos offres et candidatures</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">42 nouvelles candidatures</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gold/20 px-6">
        <nav className="flex space-x-8">
          {[
            { id: 'offres', label: 'Mes Offres', icon: Briefcase },
            { id: 'candidatures', label: 'CV Associés', icon: Users },
            { id: 'upload-cv', label: 'Upload CV', icon: Upload },
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
        {activeView === 'offres' && renderOffresView()}
        {activeView === 'candidatures' && renderCandidaturesView()}
        {activeView === 'nouvelle-offre' && renderNouvelleOffreView()}
        {activeView === 'upload-cv' && renderUploadCVView()}
      </div>
    </div>
  );
};

export default RecruteurSpace;