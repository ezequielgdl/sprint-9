/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Tight", ...defaultTheme.fontFamily.sans],
        serif: ["Cardo", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
