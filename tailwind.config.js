const typography = require('@tailwindcss/typography')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{vue,ts,js}'],
  theme: {
    extend: {
      screens: {
        'media-hover': {
          raw: '(hover: hover)',
        },
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      primary: ['Montserrat', ...defaultTheme.fontFamily.sans],
      headings: ['Ubuntu', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [typography()],
}
