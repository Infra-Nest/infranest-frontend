/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
        },
      },
      boxShadow: {
        card: 'var(--shadow)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        signal: {
          '0%, 100%': { opacity: '0.6', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-4px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        signal: 'signal 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
