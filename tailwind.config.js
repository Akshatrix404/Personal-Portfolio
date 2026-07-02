/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Bebas Neue"', "Impact", "sans-serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        "royal-violet": "#7400b8",
        "indigo-bloom": "#6930c3",
        "slate-blue": "#5e60ce",
        "cloudy-sky": "#5390d9",
        "fresh-sky": "#4ea8de",
        "sky-surge": "#48bfe3",
        "sky-blue-light": "#56cfe1",
        "pearl-aqua": "#64dfdf",
        turquoise: "#72efdd",
        aquamarine: "#80ffdb",
      },
    },
  },
  plugins: [],
};
