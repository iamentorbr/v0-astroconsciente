module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        fundo: '#1E2A38',
        roxo: '#6A0DAD',
        dourado: '#C9A96E',
        brancoMistico: '#F6F4F9'
      },
      fontFamily: {
        titulo: ['"Playfair Display"', 'serif'],
        corpo: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
