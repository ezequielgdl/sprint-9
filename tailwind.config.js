/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Josefin Sans", ...defaultTheme.fontFamily.sans],
        serif: ["Cardo", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
