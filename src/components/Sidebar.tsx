import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BarChart3, 
  Settings, 
  Sun,
  Shield,
  Bell,
  UserCheck,
  Upload,
  TrendingUp,
  Heart
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'solaire' },
    { id: 'recruteur', icon: UserCheck, label: 'Espace Recruteur', color: 'ocre' },
    { id: 'candidat', icon: Heart, label: 'Espace Candidat', color: 'terre' },
    { id: 'upload-cv', icon: Upload, label: 'Upload CV', color: 'terre' },
    { id: 'statistics', icon: TrendingUp, label: 'Statistiques', color: 'indigo' },
    { id: 'users', icon: Users, label: 'Utilisateurs', color: 'indigo' },
    { id: 'jobs', icon: Briefcase, label: 'Offres d\'emploi', color: 'terre' },
    { id: 'settings', icon: Settings, label: 'Paramètres', color: 'zen-gray' },
  ];

  return (
    <div className="w-64 bg-zen-white border-r border-gold/20 h-screen fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gold/20">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Sun className="w-8 h-8 text-solaire" />
            <Shield className="w-4 h-4 text-ocre absolute -bottom-1 -right-1" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zen-dark">Open RH</h1>
            <p className="text-xs text-zen-gray">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 group ${
                isActive 
                  ? 'bg-gold/10 text-zen-dark border-l-4 border-gold shadow-zen' 
                  : 'text-zen-gray hover:bg-gold/5 hover:text-zen-dark'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? `text-${item.color}` : ''} group-hover:scale-110 transition-transform`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Notifications */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-r from-ocre to-solaire p-4 rounded-lg text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Bell className="w-4 h-4" />
            <span className="text-sm font-medium">Notifications</span>
          </div>
          <p className="text-xs opacity-90">42 nouvelles candidatures aujourd'hui</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;