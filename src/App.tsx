import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RecruteurSpace from './components/RecruteurSpace';
import UploadCV from './components/UploadCV';
import Statistics from './components/Statistics';
import Login from './components/Login';
import CandidatSpace from './components/CandidatSpace';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Changé à true pour la démo

  // Si pas connecté, afficher l'écran de login
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'recruteur':
        return <RecruteurSpace />;
      case 'upload-cv':
        return <UploadCV />;
      case 'statistics':
        return <Statistics />;
      case 'candidat':
        return <CandidatSpace />;
      case 'users':
        return (
          <div className="flex-1 bg-zen-white min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zen-dark mb-4">Gestion des Utilisateurs</h2>
              <p className="text-zen-gray">Cette section sera développée prochainement</p>
            </div>
          </div>
        );
      case 'jobs':
        return (
          <div className="flex-1 bg-zen-white min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zen-dark mb-4">Gestion des Offres d'Emploi</h2>
              <p className="text-zen-gray">Cette section sera développée prochainement</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 bg-zen-white min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zen-dark mb-4">Paramètres</h2>
              <p className="text-zen-gray">Cette section sera développée prochainement</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-zen-white font-zen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 ml-64">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;