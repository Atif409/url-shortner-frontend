/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hangyaboly: ['Hangyaboly', 'sans-serif'],
        poppins: ['Poppins-Regular'],
      },
      colors: {
        'primary-a': 'var(--color-primary-a)',
        'primary-b': 'var(--color-primary-b)',
        'primary-c': 'var(--color-primary-c)',

        'secondary-a': 'var(--color-secondary-a)',
        'secondary-b': 'var(--color-secondary-b)',
        'secondary-c': 'var(--color-secondary-c)',

      },
      width: {
        '150%': "150%",

      },
      height: {
        '150%': "150%",

      },
      borderRadius: {
        '50%': "50%",
      }
      ,
      translate: {
        '75%': "33%",
      },
      screens: {
        '1025': "1025px"
      },

    },
  },
  plugins: [],
}