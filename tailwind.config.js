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
        'loader-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(1turn)' },
        },
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
        'loader-linear-spin': 'loader-spin .8s linear infinite',
        'loader-ease-spin': 'loader-spin .8s ease infinite',
      },
      borderWidth: {
        '3': '3px',
      },
      colors: {
        'scrims-premium': '#BB77FC',
        'scrims-private': '#ADADE0',
        'scrims-prime': '#74A8EE',
        'scrims-pristine': '#20B3CF',
        'scrims-member': '#46D6DA',
        neutral: {
          750: '#343434',
        }
      },
    },
  },
  plugins: [],
};
