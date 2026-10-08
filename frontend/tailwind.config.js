/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '26px',
        '4xl': '32px',
      },
      backdropBlur: {
        'glass': '24px',
        'heavy': '32px',
      },
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.45)',
          'light-hover': 'rgba(255, 255, 255, 0.60)',
          smoked: 'rgba(40, 40, 40, 0.75)',
          'smoked-hover': 'rgba(30, 30, 30, 0.85)',
          dark: 'rgba(20, 20, 20, 0.88)',
        },
        charcoal: {
          900: '#121214',
          800: '#1C1C1F',
          700: '#27272A',
          600: '#3F3F46',
        }
      },
      boxShadow: {
        'glass-soft': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-lift': '0 16px 40px -10px rgba(0, 0, 0, 0.12)',
        'smoked-lift': '0 20px 48px -10px rgba(0, 0, 0, 0.35)',
        'pill': '0 4px 20px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}

