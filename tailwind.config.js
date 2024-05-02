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
            // Add other font families as needed
        },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
}

