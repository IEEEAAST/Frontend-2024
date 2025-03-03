/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sansramy': ['SF-Pro-Display-Regular', 'Arial', 'sans-serif'],
      'seriframy': ['SF-Pro-Display-Bold', 'Georgia', 'serif'],
      'SFproramy': ['SF-Pro', 'Georgia', 'serif'],
    },
    extend: {
      backgroundImage: {
        homeImage: "url('/src/assets/home/ieeeHome.jpg')",
        cardLarge: "url('/src/assets/card.png')",
        cardSmall: "url('/src/assets/circularp.png')",
      },

      fontFamily: {
        display: ["SF Pro Display", "sans-serif"],
        body: ["SF Pro", "sans-serif"],
        bold: ["SF-Pro-Display-Bold", "sans-serif"],
        textmedium: ["SF-Pro-Text-Medium", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none',
        },
      }, ['responsive', 'hover']);
    },
  ],
}
