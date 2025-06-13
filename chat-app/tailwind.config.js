/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "color-change": "colorChange 5s infinite",
      },
      keyframes: {
        colorChange: {
          "0%, 100%": {
            color: "red",
            textShadow:
              "0 0 5px rgba(255, 0, 0, 0.8), 0 0 10px rgba(255, 0, 0, 0.6), 0 0 15px rgba(255, 0, 0, 0.4)",
          },
          "25%": {
            color: "green",
            textShadow:
              "0 0 5px rgba(0, 255, 0, 0.8), 0 0 10px rgba(0, 255, 0, 0.6), 0 0 15px rgba(0, 255, 0, 0.4)",
          },
          "50%": {
            color: "blue",
            textShadow:
              "0 0 5px rgba(0, 0, 255, 0.8), 0 0 10px rgba(0, 0, 255, 0.6), 0 0 15px rgba(0, 0, 255, 0.4)",
          },
          "75%": {
            color: "orange",
            textShadow:
              "0 0 5px rgba(255, 165, 0, 0.8), 0 0 10px rgba(255, 165, 0, 0.6), 0 0 15px rgba(255, 165, 0, 0.4)",
          },
        },
      },
    },
  },
  plugins: [],
};
