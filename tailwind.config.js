/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#062B63',
        'navy-deep': '#041B42',
        'navy-ink': '#03132F',
        primary: '#0868C9',
        bright: '#168BE0',
        sky: '#5CC2FF',
        haze: '#EFF7FF',
        ink: '#0B1F3A',
        mist: '#5B6B82',
        line: '#E3EAF3',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(6,43,99,0.04), 0 12px 32px -12px rgba(6,43,99,0.14)',
        card: '0 1px 1px rgba(6,43,99,0.03), 0 24px 48px -24px rgba(8,104,201,0.28)',
        glow: '0 0 0 1px rgba(22,139,224,0.15), 0 20px 60px -15px rgba(8,104,201,0.45)',
        lift: '0 30px 60px -30px rgba(4,27,66,0.55)',
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
        ring: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        popIn: {
          from: { opacity: '0', transform: 'translateY(16px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        drift: 'drift 12s ease-in-out infinite',
        marquee: 'marquee 36s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
        ring: 'ring 1.8s cubic-bezier(0.16,1,0.3,1) infinite',
        fadeIn: 'fadeIn 0.25s ease-out both',
        popIn: 'popIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
