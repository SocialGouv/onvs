module.exports = {
  plugins: [require("@tailwindcss/forms")],
  purge: ["./src/components/**/*.js", "./src/pages/**/*.js"],
  theme: {
    extend: {},
    fontFamily: {
      evolventa: ["Evolventa"],
      source: ["Source Sans Pro"],
    },
  },
  variants: {},
}
