module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Gill Sans"', 'sans-serif'],
      },
      colors: {
        pink: {
          400: '#fd5294',
          500: '#ec4c8a',
          600: '#d04378',
          700: '#b13967',
        },
      },
    },
  },
  plugins: [],
};
