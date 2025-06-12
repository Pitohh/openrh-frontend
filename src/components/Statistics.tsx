import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users, 
  FileText, 
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Sun,
  TreePine,
  Award,
  Zap
} from 'lucide-react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Données pour les graphiques
  const cvParOffreData = {
    labels: ['Développeur Full Stack', 'Designer UX/UI', 'Data Analyst', 'Chef de Projet', 'Développeur Mobile'],
    datasets: [
      {
        label: 'CV Reçus',
        data: [42, 28, 35, 18, 25],
        backgroundColor: '#EAB308', // solaire
        borderColor: '#D97706', // ocre
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'CV Traités',
        data: [35, 22, 28, 15, 20],
        backgroundColor: '#DC2626', // terre
        borderColor: '#B91C1C',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ],
  };

  const tauxMatchingData = {
    labels: ['Excellent (90-100%)', 'Bon (75-89%)', 'Moyen (60-74%)', 'Faible (<60%)'],
    datasets: [
      {
        data: [25, 35, 28, 12],
        backgroundColor: [
          '#EAB308', // solaire
          '#D97706', // ocre
          '#DC2626', // terre
          '#4338CA'  // indigo
        ],
        borderWidth: 0,
        hoverOffset: 8,
      }
    ],
  };

  const evolutionUploadsData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'CV Uploadés',
        data: [12, 19, 25, 32, 28, 35, 42],
        borderColor: '#EAB308', // solaire
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#EAB308',
        pointBorderColor: '#D97706',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'CV Traités',
        data: [8, 15, 20, 28, 24, 30, 38],
        borderColor: '#DC2626', // terre
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#DC2626',
        pointBorderColor: '#B91C1C',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter',
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#F59E0B',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(245, 158, 11, 0.1)',
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 11
          },
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 11
          },
          color: '#6B7280'
        }
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter',
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#F59E0B',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      }
    },
    cutout: '60%',
  };

  const statsCards = [
    {
      title: 'Total CV Uploadés',
      value: '148',
      change: '+23%',
      changeType: 'positive',
      icon: FileText,
      color: 'solaire',
      bgColor: 'bg-solaire/10',
      iconColor: 'text-solaire'
    },
    {
      title: 'Taux de Matching Moyen',
      value: '82%',
      change: '+5%',
      changeType: 'positive',
      icon: Target,
      color: 'ocre',
      bgColor: 'bg-ocre/10',
      iconColor: 'text-ocre'
    },
    {
      title: 'CV Traités',
      value: '120',
      change: '+18%',
      changeType: 'positive',
      icon: Award,
      color: 'terre',
      bgColor: 'bg-terre/10',
      iconColor: 'text-terre'
    },
    {
      title: 'Temps Moyen de Traitement',
      value: '2.3j',
      change: '-12%',
      changeType: 'positive',
      icon: Zap,
      color: 'indigo',
      bgColor: 'bg-indigo/10',
      iconColor: 'text-indigo'
    }
  ];

  return (
    <div className="flex-1 bg-zen-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gold/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zen-dark" style={{ fontFamily: 'Playfair Display, serif' }}>
              Statistiques CV
            </h1>
            <p className="text-zen-gray mt-1">Analysez les performances de vos recrutements</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gold/20 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gold/20 focus:border-gold"
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">3 derniers mois</option>
              <option value="1y">Cette année</option>
            </select>
            <button className="bg-gradient-to-r from-solaire to-ocre text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Actualiser</span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen hover:shadow-gold transition-all duration-200 group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-zen-gray text-sm mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-zen-dark mb-2">{stat.value}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-zen-gray">ce mois</span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* CV par Offre - Bar Chart */}
          <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-solaire/10 p-2 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-solaire" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zen-dark" style={{ fontFamily: 'Playfair Display, serif' }}>
                    CV par Offre d'Emploi
                  </h3>
                  <p className="text-sm text-zen-gray">Répartition des candidatures</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gold/10 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-zen-gray" />
              </button>
            </div>
            <div className="h-80">
              <Bar data={cvParOffreData} options={chartOptions} />
            </div>
          </div>

          {/* Taux de Matching - Doughnut Chart */}
          <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-ocre/10 p-2 rounded-lg">
                  <Target className="w-6 h-6 text-ocre" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zen-dark" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Taux de Matching
                  </h3>
                  <p className="text-sm text-zen-gray">Qualité des correspondances</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gold/10 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-zen-gray" />
              </button>
            </div>
            <div className="h-80">
              <Doughnut data={tauxMatchingData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Evolution Timeline - Line Chart */}
        <div className="bg-white p-6 rounded-xl border border-gold/20 shadow-zen">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-terre/10 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-terre" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zen-dark" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Évolution des Uploads
                </h3>
                <p className="text-sm text-zen-gray">Tendance mensuelle des CV reçus</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="border border-gold/20 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gold/20 focus:border-gold"
              >
                <option value="all">Toutes les métriques</option>
                <option value="uploads">CV Uploadés</option>
                <option value="processed">CV Traités</option>
              </select>
              <button className="p-2 hover:bg-gold/10 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-zen-gray" />
              </button>
            </div>
          </div>
          <div className="h-96">
            <Line data={evolutionUploadsData} options={chartOptions} />
          </div>
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-solaire/10 to-ocre/10 p-6 rounded-xl border border-gold/20">
            <div className="flex items-center space-x-3 mb-4">
              <Sun className="w-8 h-8 text-solaire" />
              <h4 className="text-lg font-semibold text-zen-dark" style={{ fontFamily: 'Playfair Display, serif' }}>
                Pic d'Activité
              </h4>
            </div>
            <p className="text-zen-gray text-sm mb-2">
              Les uploads de CV sont 40% plus élevés le mardi et mercredi.
            </p>
            <p className="text-solaire font-medium text-sm">
              Optimisez vos campagnes de recrutement ces jours-là.
            </p>
          </div>

          <div className="bg-gradient-to-br from-terre/10 to-ocre/10 p-6 rounded-xl border border-gold/20">
            <div className="flex items-center space-x-3 mb-4">
              <TreePine className="w-8 h-8 text-terre" />
              <h4 className="text-lg font-semibold text-zen-dark" style={{ fontFamily: 'Playfair Display, serif' }}>
                Meilleur Matching
              </h4>
            </div>
            <p className="text-zen-gray text-sm mb-2">
              Les postes techniques ont un taux de matching de 15% supérieur.
            </p>
            <p className="text-terre font-medium text-sm">
              Concentrez vos efforts sur ces profils.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo/10 to-solaire/10 p-6 rounded-xl border border-gold/20">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-8 h-8 text-indigo" />
              <h4 className="text-lg font-semibold text-zen-dark" style={{ fontFamily: 'Playfair Display, serif' }}>
                Temps de Traitement
              </h4>
            </div>
            <p className="text-zen-gray text-sm mb-2">
              Le temps moyen de traitement a diminué de 30% ce mois.
            </p>
            <p className="text-indigo font-medium text-sm">
              Excellente amélioration de l'efficacité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;