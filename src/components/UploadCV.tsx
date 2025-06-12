import React, { useState, useRef, useCallback } from 'react';
import { 
  Upload, 
  FileText, 
  X, 
  Check, 
  Sun, 
  TreePine, 
  AlertCircle,
  User,
  Mail,
  Briefcase,
  MapPin,
  Calendar,
  Eye,
  Download,
  Trash2,
  Filter,
  Search
} from 'lucide-react';

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

interface OffreOption {
  id: string;
  titre: string;
  entreprise: string;
}

const UploadCV: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<CVFile[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    candidatNom: '',
    candidatEmail: '',
    competences: '',
    offreAssociee: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data pour les offres disponibles
  const offresDisponibles: OffreOption[] = [
    { id: '1', titre: 'Développeur Full Stack Senior', entreprise: 'TechCorp Africa' },
    { id: '2', titre: 'Designer UX/UI', entreprise: 'Creative Studio' },
    { id: '3', titre: 'Data Analyst', entreprise: 'Analytics Pro' },
    { id: '4', titre: 'Chef de Projet Digital', entreprise: 'Digital Agency' },
    { id: '5', titre: 'Développeur Mobile', entreprise: 'Mobile Solutions' }
  ];

  // Mock data pour les CV uploadés
  const mockUploadedFiles: CVFile[] = [
    {
      id: '1',
      file: new File([''], 'aminata_diallo_cv.pdf', { type: 'application/pdf' }),
      candidatNom: 'Aminata Diallo',
      candidatEmail: 'aminata.diallo@email.com',
      competences: 'React, Node.js, TypeScript, MongoDB',
      offreAssociee: '1',
      statut: 'En attente',
      dateUpload: '2024-01-20'
    },
    {
      id: '2',
      file: new File([''], 'kwame_asante_cv.pdf', { type: 'application/pdf' }),
      candidatNom: 'Kwame Asante',
      candidatEmail: 'kwame.asante@email.com',
      competences: 'Figma, Adobe Creative Suite, Prototypage',
      offreAssociee: '2',
      statut: 'Traité',
      dateUpload: '2024-01-19'
    },
    {
      id: '3',
      file: new File([''], 'fatou_seck_cv.pdf', { type: 'application/pdf' }),
      candidatNom: 'Fatou Seck',
      candidatEmail: 'fatou.seck@email.com',
      competences: 'Python, SQL, Tableau, Machine Learning',
      offreAssociee: '3',
      statut: 'En attente',
      dateUpload: '2024-01-18'
    }
  ];

  React.useEffect(() => {
    setUploadedFiles(mockUploadedFiles);
  }, []);

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
        setCurrentFile(file);
        setShowForm(true);
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
        setShowForm(true);
      } else {
        alert('Veuillez sélectionner un fichier PDF uniquement.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentFile && formData.candidatNom && formData.candidatEmail && formData.offreAssociee) {
      const newCV: CVFile = {
        id: Date.now().toString(),
        file: currentFile,
        candidatNom: formData.candidatNom,
        candidatEmail: formData.candidatEmail,
        competences: formData.competences,
        offreAssociee: formData.offreAssociee,
        statut: 'En attente',
        dateUpload: new Date().toISOString().split('T')[0]
      };
      
      setUploadedFiles(prev => [newCV, ...prev]);
      
      // Reset form
      setFormData({
        candidatNom: '',
        candidatEmail: '',
        competences: '',
        offreAssociee: ''
      });
      setCurrentFile(null);
      setShowForm(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'En attente': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Traité': return 'text-green-600 bg-green-50 border-green-200';
      case 'Rejeté': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'En attente': return <Sun className="w-4 h-4" />;
      case 'Traité': return <TreePine className="w-4 h-4" />;
      case 'Rejeté': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.candidatNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.candidatEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || file.statut === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getOffreTitre = (offreId: string) => {
    const offre = offresDisponibles.find(o => o.id === offreId);
    return offre ? `${offre.titre} - ${offre.entreprise}` : 'Offre inconnue';
  };

  return (
    <div className="flex-1 bg-zen-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gold/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zen-dark">Upload CV</h1>
            <p className="text-zen-gray mt-1">Importez les CV reçus via d'autres canaux</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">{uploadedFiles.filter(f => f.statut === 'En attente').length} CV en attente</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Upload Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gold/20 shadow-zen p-8">
            <h2 className="text-xl font-bold text-zen-dark mb-6 flex items-center space-x-2">
              <Upload className="w-6 h-6 text-ocre" />
              <span>Importer un CV</span>
            </h2>

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
                  <h3 className="text-lg font-semibold text-zen-dark mb-2">
                    {dragActive ? 'Déposez votre fichier ici' : 'Glissez-déposez votre CV'}
                  </h3>
                  <p className="text-zen-gray mb-4">
                    Ou cliquez pour sélectionner un fichier PDF
                  </p>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-ocre to-terre text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    Sélectionner un fichier
                  </button>
                  
                  <input
                    ref={fileInputRef}
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

          {/* Form Modal */}
          {showForm && currentFile && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gold/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-zen-dark">Informations du Candidat</h3>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setCurrentFile(null);
                        setFormData({
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

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-zen-dark mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nom du candidat *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.candidatNom}
                        onChange={(e) => setFormData({...formData, candidatNom: e.target.value})}
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
                        value={formData.candidatEmail}
                        onChange={(e) => setFormData({...formData, candidatEmail: e.target.value})}
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
                      value={formData.offreAssociee}
                      onChange={(e) => setFormData({...formData, offreAssociee: e.target.value})}
                      className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                    >
                      <option value="">Sélectionnez une offre</option>
                      {offresDisponibles.map((offre) => (
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
                      value={formData.competences}
                      onChange={(e) => setFormData({...formData, competences: e.target.value})}
                      className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                      placeholder="React, Node.js, TypeScript (séparées par des virgules)"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gold/20">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setCurrentFile(null);
                        setFormData({
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

        {/* CV List Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl border border-gold/20 shadow-zen">
            <div className="p-6 border-b border-gold/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-zen-dark">CV Uploadés</h2>
                <div className="flex items-center space-x-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gold/20 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gold/20 focus:border-gold"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="En attente">En attente</option>
                    <option value="Traité">Traité</option>
                    <option value="Rejeté">Rejeté</option>
                  </select>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-zen-gray" />
                <input
                  type="text"
                  placeholder="Rechercher un candidat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold"
                />
              </div>
            </div>

            <div className="divide-y divide-gold/10">
              {filteredFiles.map((cvFile) => (
                <div key={cvFile.id} className="p-6 hover:bg-zen-white transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-zen-dark mb-1">{cvFile.candidatNom}</h3>
                          <p className="text-zen-gray text-sm mb-2">{cvFile.candidatEmail}</p>
                          <p className="text-ocre font-medium text-sm">{getOffreTitre(cvFile.offreAssociee)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(cvFile.statut)}`}>
                          {getStatusIcon(cvFile.statut)}
                          <span>{cvFile.statut}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-zen-gray">
                          <FileText className="w-4 h-4" />
                          <span>{cvFile.file.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-zen-gray">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(cvFile.dateUpload).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>

                      {cvFile.competences && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cvFile.competences.split(',').map((comp, index) => (
                            <span key={index} className="bg-indigo/10 text-indigo px-2 py-1 rounded-full text-xs font-medium">
                              {comp.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <button className="bg-zen-white border border-gold/20 text-zen-dark px-4 py-2 rounded-lg hover:bg-gold/5 transition-colors flex items-center space-x-2 group">
                        <Eye className="w-4 h-4 group-hover:text-ocre transition-colors" />
                        <span>Voir</span>
                      </button>
                      <button className="bg-zen-white border border-gold/20 text-zen-dark px-4 py-2 rounded-lg hover:bg-gold/5 transition-colors flex items-center space-x-2 group">
                        <Download className="w-4 h-4 group-hover:text-ocre transition-colors" />
                        <span>Télécharger</span>
                      </button>
                      <button className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center space-x-2 group">
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFiles.length === 0 && (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-zen-gray mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-zen-dark mb-2">Aucun CV trouvé</h3>
                <p className="text-zen-gray">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Aucun CV ne correspond à vos critères de recherche.'
                    : 'Commencez par uploader votre premier CV.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCV;