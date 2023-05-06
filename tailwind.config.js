/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        7: '1.75rem',
      },
      minHeight: {
        7: '1.75rem',
      },
      minWidth: {
        7: '1.75rem',
      },
      colors: {
        primary: 'var(--bg-primary)',
      },
      screens: {
        '3xl': '2048px',
      },
    },
  },
  plugins: [],
};
