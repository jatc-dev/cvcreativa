/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        faca: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          900: "#14532d",
        },
        accent: {
          DEFAULT: "#dc2626",
        },
        brand: {
          DEFAULT: "#15803d",
          dark: "#14532d",
          light: "#f0fdf4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        faca: "0 10px 15px -3px rgba(21, 128, 61, 0.2)",
        brand: "0 10px 15px -3px rgba(21, 128, 61, 0.2)",
      },
    },
  },
  plugins: [],
};