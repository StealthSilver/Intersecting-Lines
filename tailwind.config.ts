// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-maven-pro)", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
        parisienne: ["var(--font-parisienne)", "cursive"],
        palanquin: ["var(--font-palanquin)", "sans-serif"],
        snippet: ["var(--font-snippet)", "monospace"],
      },
      screens: {
        'xs': '475px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
};
