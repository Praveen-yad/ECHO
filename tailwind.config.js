/** @type {import('tailwindcss').Config} */
let theme = '#bc6c25'
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