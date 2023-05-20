/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["Original Surfer", "cursive"],
        details: ["East Sea Dokdo", "cursive"],
        second: ["Shadows Into Light", "cursive"],
      },
    },
  },
  plugins: [],
};
