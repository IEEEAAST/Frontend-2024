/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        homeImage: "url('/src/assets/home/ieeeHome.jpg')",
      },
    },
    fontFamily: {
      display: ["SF Pro Display", "sans-serif"],
      body:["SF Pro", "sans-serif"]
    },
  },
  // eslint-disable-next-line no-undef
}