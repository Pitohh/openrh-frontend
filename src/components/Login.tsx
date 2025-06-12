import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sun, 
  Shield,
  Zap
} from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une connexion
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocre via-gold to-solaire flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        {/* Masques africains stylisés */}
        <div className="absolute top-20 left-20">
          <Shield className="w-32 h-32 text-zen-dark transform rotate-12" />
        </div>
        <div className="absolute top-40 right-32">
          <Sun className="w-24 h-24 text-zen-dark transform -rotate-12" />
        </div>
        <div className="absolute bottom-32 left-40">
          <Shield className="w-28 h-28 text-zen-dark transform rotate-45" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Zap className="w-20 h-20 text-zen-dark transform -rotate-45" />
        </div>
        
        {/* Motifs géométriques */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border-4 border-zen-dark transform rotate-45 opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-12 h-12 border-4 border-zen-dark rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-zen-dark transform rotate-45 opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-zen-dark rounded-full opacity-20"></div>
      </div>

      {/* Login Card */}
      <div className="bg-zen-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 border border-gold/30">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Sun className="w-10 h-10 text-solaire" />
              <Shield className="w-5 h-5 text-ocre absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zen-dark" style={{ fontFamily: 'Playfair Display, serif' }}>
                Open RH
              </h1>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-zen-dark mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Connexion Admin
          </h2>
          <p className="text-zen-gray text-sm">
            Accédez à votre tableau de bord de recrutement
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zen-dark mb-2">
              Adresse email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zen-gray" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200 bg-zen-white text-zen-dark placeholder-zen-gray"
                placeholder="admin@openrh.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zen-dark mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zen-gray" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200 bg-zen-white text-zen-dark placeholder-zen-gray"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gold transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-zen-gray" />
                ) : (
                  <Eye className="h-5 w-5 text-zen-gray" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-terre focus:ring-gold border-gold/30 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-zen-gray">
                Se souvenir de moi
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-ocre hover:text-terre transition-colors font-medium"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-terre to-ocre text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Connexion en cours...</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>Se connecter</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-zen-gray">
            En vous connectant, vous acceptez nos{' '}
            <button className="text-ocre hover:text-terre transition-colors font-medium">
              conditions d'utilisation
            </button>{' '}
            et notre{' '}
            <button className="text-ocre hover:text-terre transition-colors font-medium">
              politique de confidentialité
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
          <h4 className="text-sm font-semibold text-zen-dark mb-2 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-solaire" />
            <span>Compte de démonstration</span>
          </h4>
          <div className="text-xs text-zen-gray space-y-1">
            <p><strong>Email:</strong> admin@openrh.com</p>
            <p><strong>Mot de passe:</strong> demo123</p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-solaire rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-10 w-3 h-3 bg-terre rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-10 left-20 w-5 h-5 bg-ocre rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-indigo rounded-full animate-pulse delay-1500"></div>
    </div>
  );
};

export default Login;