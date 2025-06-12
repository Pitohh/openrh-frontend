import React from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  UserCheck,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { mockUsers, mockOffres, mockStatistiques } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  const [searchUsers, setSearchUsers] = React.useState('');
  const [searchJobs, setSearchJobs] = React.useState('');
  const [filterRole, setFilterRole] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState('all');

  // Données pour les graphiques
  const lineChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Candidatures',
        data: [65, 89, 120, 95, 140, 172],
        borderColor: '#D97706', // ocre
        backgroundColor: 'rgba(217, 119, 6, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Conversions',
        data: [28, 35, 42, 38, 48, 45],
        borderColor: '#EAB308', // solaire
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.4,
      }
    ],
  };

  const doughnutData = {
    labels: ['Publiées', 'Brouillons', 'Archivées'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: ['#EAB308', '#D97706', '#DC2626'],
        borderWidth: 0,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Filtrage des données
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.nom.toLowerCase().includes(searchUsers.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchUsers.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const filteredJobs = mockOffres.filter(job => {
    const matchesSearch = job.titre.toLowerCase().includes(searchJobs.toLowerCase()) ||
                         job.entreprise.toLowerCase().includes(searchJobs.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.statut === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Actif': case 'Publiée': return 'text-green-600 bg-green-50';
      case 'Inactif': case 'Archivée': return 'text-red-600 bg-red-50';
      case 'Brouillon': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'text-indigo bg-indigo-light';
      case 'RH': return 'text-ocre bg-ocre-light';
      case 'Manager': return 'text-terre bg-terre-light';
      case 'Candidat': return 'text-solaire bg-solaire-light';
      default: return 'text-zen-gray bg-zen-white';
    }
  };

  return (
    <div className="flex-1 bg-zen-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gold/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zen-dark">Dashboard Admin</h1>
            <p className="text-zen-gray mt-1">Gérez votre plateforme Open RH</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Dernière sync: maintenant</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen hover:shadow-gold transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zen-gray text-sm mb-1">Candidatures</p>
                <p className="text-3xl font-bold text-zen-dark">{mockStatistiques.candidatures}</p>
                <p className="text-green-600 text-sm mt-2">+12% ce mois</p>
              </div>
              <div className="bg-ocre-light p-3 rounded-lg group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-ocre" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen hover:shadow-gold transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zen-gray text-sm mb-1">Taux Matching</p>
                <p className="text-3xl font-bold text-zen-dark">{mockStatistiques.tauxMatching}%</p>
                <p className="text-green-600 text-sm mt-2">+5% ce mois</p>
              </div>
              <div className="bg-solaire-light p-3 rounded-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-solaire" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen hover:shadow-gold transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zen-gray text-sm mb-1">Conversions</p>
                <p className="text-3xl font-bold text-zen-dark">{mockStatistiques.conversions}</p>
                <p className="text-green-600 text-sm mt-2">+8% ce mois</p>
              </div>
              <div className="bg-terre-light p-3 rounded-lg group-hover:scale-110 transition-transform">
                <UserCheck className="w-8 h-8 text-terre" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen hover:shadow-gold transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zen-gray text-sm mb-1">Nouveaux Utilisateurs</p>
                <p className="text-3xl font-bold text-zen-dark">{mockStatistiques.nouveauxUtilisateurs}</p>
                <p className="text-green-600 text-sm mt-2">+15% ce mois</p>
              </div>
              <div className="bg-indigo-light p-3 rounded-lg group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-indigo" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gold/20 shadow-zen">
            <h3 className="text-lg font-semibold text-zen-dark mb-4">Évolution des Candidatures</h3>
            <div className="h-64">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen">
            <h3 className="text-lg font-semibold text-zen-dark mb-4">Répartition des Offres</h3>
            <div className="h-64">
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Users Table */}
          <div className="bg-white rounded-xl border border-gold/20 shadow-zen">
            <div className="p-6 border-b border-gold/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-zen-dark">Utilisateurs</h3>
                <div className="flex items-center space-x-2">
                  <select 
                    value={filterRole} 
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="border border-gold/20 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="all">Tous les rôles</option>
                    <option value="Admin">Admin</option>
                    <option value="RH">RH</option>
                    <option value="Manager">Manager</option>
                    <option value="Candidat">Candidat</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-zen-gray" />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={searchUsers}
                  onChange={(e) => setSearchUsers(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zen-white border-b border-gold/20">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-zen-gray">Utilisateur</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-zen-gray">Rôle</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-zen-gray">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-zen-gray">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gold/10 hover:bg-zen-white transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-zen-dark">{user.nom}</p>
                          <p className="text-sm text-zen-gray">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.statut)}`}>
                          {user.statut === 'Actif' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : 
                           user.statut === 'Inactif' ? <XCircle className="w-3 h-3 inline mr-1" /> :
                           <Clock className="w-3 h-3 inline mr-1" />}
                          {user.statut}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gold/10 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-zen-gray" />
                          </button>
                          <button className="p-1 hover:bg-gold/10 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-zen-gray" />
                          </button>
                          <button className="p-1 hover:bg-gold/10 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-zen-gray" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="bg-white rounded-xl border border-gold/20 shadow-zen">
            <div className="p-6 border-b border-gold/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-zen-dark">Offres d'Emploi</h3>
                <div className="flex items-center space-x-2">
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gold/20 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="Publiée">Publiée</option>
                    <option value="Brouillon">Brouillon</option>
                    <option value="Archivée">Archivée</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-zen-gray" />
                <input
                  type="text"
                  placeholder="Rechercher une offre..."
                  value={searchJobs}
                  onChange={(e) => setSearchJobs(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gold/20 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zen-white border-b border-gold/20">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-zen-gray">Offre</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-zen-gray">Candidatures</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-zen-gray">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-zen-gray">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-b border-gold/10 hover:bg-zen-white transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-zen-dark">{job.titre}</p>
                          <p className="text-sm text-zen-gray">{job.entreprise}</p>
                          <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full mt-1 inline-block">
                            {job.type}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-zen-dark">{job.nombreCandidatures}</span>
                          <div className="ml-2">
                            <div className="text-xs text-zen-gray">Matching</div>
                            <div className="text-sm font-medium text-solaire">{job.matching}%</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.statut)}`}>
                          {job.statut === 'Publiée' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : 
                           job.statut === 'Archivée' ? <XCircle className="w-3 h-3 inline mr-1" /> :
                           <Clock className="w-3 h-3 inline mr-1" />}
                          {job.statut}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gold/10 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-zen-gray" />
                          </button>
                          <button className="p-1 hover:bg-gold/10 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-zen-gray" />
                          </button>
                          <button className="p-1 hover:bg-gold/10 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-zen-gray" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;