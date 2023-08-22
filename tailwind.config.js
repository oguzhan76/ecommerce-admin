/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-vertical': 'linear-gradient(white, 70%, rgb(227, 247, 248))',
      },
      colors: {
        'light-gray': '#ababab94',
        'light-gray-dark': '#8b8b8b94',
        'pageBG': 'rgb(226 232 240)'
      }
    },
  },
  plugins: [],
}
