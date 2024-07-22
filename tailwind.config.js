/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      orangeiw: "#E76503",
      lightorangeiw: "#FCA43C",
      lightbrowniw: "#D3C587",
      blueiw: "#174FB7",
      darkblueiw: "#213143",
      purpleiw: "#9B0062",
      darkpurpleiw: "#76004A",
      pasteliw: "#F5F1EC",
      whiteiw: "#FCFCFC",
      grayiw: "#726D67",
      darkgrayiw: "#453F39",
    },
    extend: {
      fontFamily: {
        sans: ["Sweet Sans Pro", ...defaultTheme.fontFamily.sans],
        serif: ["Adobe Caslon Pro", ...defaultTheme.fontFamily.sans],
        body: ["Helvetica Neue"],
      },
    },
  },
  plugins: [],
};
