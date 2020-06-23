module.exports = {
  purge: ["./src/components/**/*.js", "./src/pages/**/*.js"],
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
