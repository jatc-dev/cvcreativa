/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: "#f0f4ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#312e81",
        },
        purple: {
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
        },
        brand: {
          DEFAULT: "#4f46e5",
          dark: "#312e81",
          light: "#e0e7ff",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brand: "0 10px 15px -3px rgba(79, 70, 229, 0.2)",
      },
    },
  },
  plugins: [],
};