/** @type {import('tailwindcss').Config} */
let theme = '#0b778c'
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        Inconsolata: ['Inconsolata'],
      },
      colors:{
        'theme': theme,
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}