/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateRows: {
        'sidebar': 'auto 1fr',
      },
      gridTemplateColumns: {
        'topbar': 'auto 1fr',
      },
      boxShadow: {
        '2xl': '0 4px 25px 5px rgba(255, 255, 255, 1) inset',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.995)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        pulse: 'pulse 0.35s ease-in-out',
        blink: 'blink 1s linear infinite',
      },
      colors: {
        neutral: {
          750: '#343434',
        }
      },
    },
  },
  plugins: [],
};
