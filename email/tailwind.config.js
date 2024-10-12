/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#E54065",
        background: "#F4F5F9",
        border: "#CFD2DC",
        text: "#636363",
        "filter-button": "#E1E4EA",
        "read-background": "#F2F2F2",
      },
    },
  },
  plugins: [],
};
