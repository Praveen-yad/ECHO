/** @type {import('tailwindcss').Config} */
let theme = '#08756a'
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
}