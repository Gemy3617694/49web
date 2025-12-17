/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include your source files
  ],
  theme: {
    extend: {
      colors: {
        main: "#0B1035",
        test: "#01031a",
      },
    },
  },
  plugins: [],
}

