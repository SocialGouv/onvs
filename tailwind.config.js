module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      evolventa: ["Evolventa"],
      marianne: ["Marianne"],
      source: ["Source Sans Pro"],
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
}
