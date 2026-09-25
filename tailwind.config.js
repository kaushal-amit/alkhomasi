/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#062B63',
        'navy-deep': '#041B42',
        primary: '#0868C9',
        bright: '#168BE0',
        haze: '#EFF7FF',
        ink: '#0B1F3A',
        mist: '#6B7C93',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(6,43,99,0.04), 0 12px 32px -12px rgba(6,43,99,0.14)',
        card: '0 1px 1px rgba(6,43,99,0.03), 0 20px 40px -20px rgba(8,104,201,0.22)',
        glow: '0 0 0 1px rgba(22,139,224,0.15), 0 20px 60px -15px rgba(8,104,201,0.45)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(2%,3%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.92)' },
        },
      },
      animation: {
        drift: 'drift 12s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
