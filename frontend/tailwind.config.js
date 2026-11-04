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
          50: "#fef2f2",
          100: "#fee2e2",
          DEFAULT: "#dc2626",
          600: "#b91c1c",
          700: "#991b1b",
          900: "#7f1d1d",
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
        accent: "0 10px 15px -3px rgba(220, 38, 38, 0.2)",
        brand: "0 10px 15px -3px rgba(21, 128, 61, 0.2)",
      },
    },
  },
  plugins: [],
};