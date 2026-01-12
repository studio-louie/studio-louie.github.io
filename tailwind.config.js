/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fantasy: ['"Cinzel Decorative"', 'cursive'],
        body: ['Lato', 'sans-serif'],
      },
      colors: {
        'hylian-gold': '#C8A947',
        'hylian-blue': '#1F3A8B',
        'forest-green': '#1A472A',
        'dark-slate': '#1a1a1a',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spark': 'spark 0.5s ease-out forwards',
      },
      keyframes: {
        spark: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
