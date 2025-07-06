/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fdf2f2',
          100: '#fce8e8',
          200: '#f8d5d5',
          300: '#f1b8b8',
          400: '#e79494',
          500: '#db7070',
          600: '#c85454',
          700: '#a53e3e',
          800: '#8b0000',
          900: '#5a1a1a',
        },
        gold: {
          50: '#fffdf0',
          100: '#fffaeb',
          200: '#fff2c7',
          300: '#ffe99e',
          400: '#ffd700',
          500: '#f4c430',
          600: '#daa520',
          700: '#b8860b',
          800: '#9b7c0f',
          900: '#7d6608',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};