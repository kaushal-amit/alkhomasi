/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Type scale — the only text sizes the site uses. Headings are fluid so
    // they scale smoothly between phone and desktop without breakpoint jumps.
    fontSize: {
      '2xs': ['11px', { lineHeight: '1.45' }],
      xs: ['12.5px', { lineHeight: '1.5' }],
      sm: ['14px', { lineHeight: '1.55' }],
      base: ['16px', { lineHeight: '1.65' }],
      lg: ['18px', { lineHeight: '1.6' }],
      xl: ['20px', { lineHeight: '1.4' }],
      '2xl': ['24px', { lineHeight: '1.3' }],
      h3: ['clamp(1.6rem, 1.25rem + 1.1vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      h2: ['clamp(2rem, 1.55rem + 1.5vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      display: ['clamp(2.5rem, 1.75rem + 2.6vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
    },
    extend: {
      // Three radii (small / medium / large) plus rounded-full for pills
      borderRadius: {
        xl: '12px',
        '2xl': '18px',
        '3xl': '28px',
      },
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
        whatsapp: '#128C45',
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
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
        'marquee-slow': 'marquee 60s linear infinite',
        ring: 'ring 1.8s cubic-bezier(0.16,1,0.3,1) infinite',
        fadeIn: 'fadeIn 0.25s ease-out both',
        popIn: 'popIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
