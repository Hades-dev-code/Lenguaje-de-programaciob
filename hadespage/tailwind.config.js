/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // todos los componentes React
    "./public/index.html"           // asegura que Tailwind escanee tu HTML base
  ],
  theme: {
    extend: {
      backgroundImage: {
        // Gradiente personalizado "night-sky"
        "night-sky": "linear-gradient(to bottom, #000000 0%, #1a1a1a 40%, #ff0000 100%)",
      },
      colors: {
        // Color personalizado "moon"
        moon: "#ffffff",
        // Ejemplo: tonos adicionales si quieres jugar con la paleta
        sky: {
          dark: "#1a1a1a",
          accent: "#ff0000",
        },
      },
    },
  },
  plugins: [
  ],
};
