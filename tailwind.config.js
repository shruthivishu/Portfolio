/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        background: '#faf5ef',
        foreground: '#5c4033',
        cream: {
          50: '#fefdfb',
          100: '#fdf8f1',
          200: '#faf0e1',
          300: '#f5e4cd',
          400: '#efd3b0',
          500: '#e5bc8e',
        },
        blush: {
          50: '#fff5f3',
          100: '#ffe8e3',
          200: '#fdd5cc',
          300: '#f9b5a8',
          400: '#f4877a',
          500: '#e8655a',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#ffc7c7',
          300: '#ffa3a3',
          400: '#e8918f',
          500: '#d4736f',
        },
        warm: {
          50: '#faf6f3',
          100: '#f2ebe4',
          200: '#e4d5c8',
          300: '#d2b9a5',
          400: '#be997f',
          500: '#b08367',
          600: '#a3725a',
          700: '#885d4b',
          800: '#6f4d41',
          900: '#5b4137',
        },
        sand: {
          50: '#fdfcfa',
          100: '#f9f5ef',
          200: '#f2e8db',
          300: '#e8d6c1',
          400: '#dbc0a2',
          500: '#cda882',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-2deg)' },
        },
        'blob': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'blob': 'blob 8s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'slide-left': 'slide-left 0.6s ease-out forwards',
        'slide-right': 'slide-right 0.6s ease-out forwards',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
