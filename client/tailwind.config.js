/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        popings:['Poppins', 'sans-serif'],
        playfair:['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}

