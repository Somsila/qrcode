/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-out': 'fadeOut 3s ease-in forwards',
        'form-slide-in': 'formSlideIn 0.8s ease-in-out',
        'shake': 'shake 0.4s ease-in-out',
        'ripple': 'ripple 1s infinite',
        'bg-flow': 'bgFlow 6s infinite alternate',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        formSlideIn: {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
        ripple: {
          '0%': { opacity: 0.5, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(2)' },
        },
        bgFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],

}

