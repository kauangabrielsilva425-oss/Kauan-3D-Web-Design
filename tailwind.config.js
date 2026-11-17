/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        archivo: ['"Archivo Black"', 'sans-serif'],
      },
      colors: {
        'main-bg': '#000000',
        'sec-bg': '#05070C',
        'section-bg': '#000000',
        'card-bg': '#070709',
        'navy-border': '#1E293B',
        'electric-blue': '#38BDF8',
        'sec-blue': '#0284C7',
        'cyan-highlight': '#7DD3FC',
        'main-text': '#F8FAFC',
        'sec-text': '#94A3B8',
      },
    },
  },
  plugins: [],
}
