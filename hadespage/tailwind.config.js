// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // Gradiente nocturno: negro -> gris oscuro -> rojo
        "night-sky": "linear-gradient(to bottom, #000000 0%, #1a1a1a 40%, #ff0000 100%)",
      },
      colors: {
        moon: "#ffffff",
      },
    },
  },
  plugins: [],
};
