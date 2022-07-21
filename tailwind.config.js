/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
    fontFamily: {
      sans: ["Formula1-Regular"],
    },
  },
  plugins: [],
};
