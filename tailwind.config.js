/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "weather-dark": "#0B131E",
        "weather-card": "#202B3B",
        "weather-blue": "#0095FF",
        "weather-text": "#C4CAD3",
      },
    },
  },
  plugins: [],
};
