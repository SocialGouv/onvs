module.exports = {
  mode: "jit",
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      evolventa: ["Evolventa"],
      marianne: ["Marianne"],
      source: ["Source Sans Pro"],
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
}
