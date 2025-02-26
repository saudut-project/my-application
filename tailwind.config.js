/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"], // Adjust your path as necessary
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo_400Regular', 'Cairo_700Bold'],
      },
    },
  },
  plugins: [],
}

