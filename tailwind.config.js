module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    extend: {},
    fontFamily: {
      evolventa: ["Evolventa"],
      source: ["Source Sans Pro"],
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")],
}
