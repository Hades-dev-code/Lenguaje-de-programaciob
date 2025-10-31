module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "night-sky": "linear-gradient(to bottom, #000000 0%, #1a1a1a 40%, #ff0000 100%)",
      },
      colors: {
        moon: "#ffffff",
      },
    },
  },
  plugins: [],
};
