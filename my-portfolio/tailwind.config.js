/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cal-sans': ['"Cal Sans"', 'sans-serif'],
        'montserrat-alt': ['"Montserrat Alternates"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
