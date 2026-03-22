/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f2937',
        paper: '#ffffff',
        gold: '#c78a3b',
        saffron: '#e9b96e',
        ember: '#d46d4d',
        mist: '#f8f6f1',
        night: '#fffdf9',
        line: '#e7e1d7',
        muted: '#6b7280',
      },
      fontFamily: {
        heading: ['DM Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        aura: '0 18px 45px rgba(15, 23, 42, 0.08)',
        glow: '0 0 0 1px rgba(199, 138, 59, 0.16), 0 18px 34px rgba(199, 138, 59, 0.08)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseHalo: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseHalo: 'pulseHalo 5s ease-in-out infinite',
        rise: 'rise 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
