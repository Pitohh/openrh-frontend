/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Zen japonais
        'zen-white': '#FAFAF9',
        'zen-gray': '#374151',
        'zen-dark': '#1F2937',
        
        // Luxe occidental
        'gold': '#F59E0B',
        'gold-light': '#FDE68A',
        'matte-black': '#0F0F0F',
        
        // Diversité africaine
        'ocre': '#D97706',
        'terre': '#DC2626',
        'solaire': '#EAB308',
        'indigo': '#4338CA',
        
        // Variations
        'ocre-light': '#FED7AA',
        'terre-light': '#FECACA',
        'solaire-light': '#FEF3C7',
        'indigo-light': '#E0E7FF',
      },
      fontFamily: {
        'zen': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'zen': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'gold': '0 0 20px rgba(245, 158, 11, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};