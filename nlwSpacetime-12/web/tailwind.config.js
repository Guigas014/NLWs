/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
        alt: 'var(--font-bai-jamjuree)'
      },
      blur: {
        full: '194px',
      },
      backgroundImage: {
        stripes: 
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 12.5%, transparent 12.5%, transparent )',
      },
      backgroundSize: {
        stripes: '100% 8px',
      },
      colors: {
        gray: {
          50: '#EAEAEA',
          100: '#BEBEBF',
          200: '#9E9EA0',
          300: '#727275',
          400: '#56565A',
          500: '#2C2C31',
          600: '#28282D',
          700: '#1F1F23',
          800: '#18181B',
          900: '#121215',
        },
        purple: {
          50: '#F3EEFC',
          100: '#D8CBF7',
          200: '#C6B2F3',
          300: '#AB8EEE',
          400: '#9B79EA',
          500: '#8257E5',
          600: '#764FD0',
          700: '#5C3EA3',
          800: '#48307E',
          900: '#372560',
        },
        green: {
          50: '#E6FBEF',
          100: '#B1F1CE',
          200: '#8CEBB6',
          300: '#57E295',
          400: '#36DC81',
          500: '#04D361',
          600: '#04C058',
          700: '#039645',
          800: '#027435',
          900: '#025929',
        },
        orange: {
          50: '#ffefeb',
          100: '#ffccc2',
          200: '#ffb4a4',
          300: '#ff927b',
          400: '#ff7d61',
          500: '#ff5c3a',
          600: '#e85435',
          700: '#b54129',
          800: '#8c3320',
          900: '#6b2718',
        },
        yellow: {
          50: '#fff9ec',
          100: '#ffebc4',
          200: '#ffe2a7',
          300: '#ffd47f',
          400: '#ffcc66',
          500: '#ffbf40',
          600: '#e8ae3a',
          700: '#b5882d',
          800: '#8c6923',
          900: '#6b501b',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
