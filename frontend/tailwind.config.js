/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5CAD75',
        'primary-dark': '#336B41',
        'primary-light': '#ADD5B9',
        'btnPrimary': '#5663F7',
      },
      fontFamily: {
        'primary': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    daisyui,
  ],
}