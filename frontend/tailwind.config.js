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
        sans: ['"Plus Jakarta Sans"', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        charcoal: {
          950: '#0c0c0e',
          900: '#141416',
          800: '#1e1e22',
          700: '#2b2b30',
          600: '#3e3e46',
          500: '#565660',
        }
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '26px',
        '4xl': '32px',
      },
      boxShadow: {
        'glass-light': '0 20px 45px -15px rgba(0, 0, 0, 0.06), 0 0 1px 1px rgba(255, 255, 255, 0.9) inset',
        'glass-dark': '0 25px 50px -15px rgba(0, 0, 0, 0.4), 0 0 1px 1px rgba(255, 255, 255, 0.18) inset',
        'floating-dock': '0 24px 48px -12px rgba(0, 0, 0, 0.18), 0 0 1px 1px rgba(255, 255, 255, 0.6) inset',
      }
    },
  },
  plugins: [],
}
