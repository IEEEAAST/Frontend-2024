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
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
}

