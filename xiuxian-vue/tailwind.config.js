/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0e14',
        paper: '#f5f0e6',
        vermilion: '#c53d43',
        jade: '#5a7e7a',
        gold: '#d4a853',
        azure: '#4a6fa5',
        mystic: '#2d3a4a',
        spirit: '#7eb8a2',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(212, 168, 83, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 168, 83, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
