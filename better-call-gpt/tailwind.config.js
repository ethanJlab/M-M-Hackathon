/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'BCGPTred': '#E5BA73',
        'BCGPTyellow': '#C58940'
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}

