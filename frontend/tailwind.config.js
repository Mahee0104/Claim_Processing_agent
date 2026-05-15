/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryPink: "#f8bfd0",
        softPink: "#ffe5ec",
        cream: "#fffaf5",
        darkText: "#4a4453",
      },
    },
  },
  plugins: [],
}