/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  important: false,
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        textColor: 'rgba(7, 7, 7, 1);',
        mainBlue: '#154063',
        secondaryBlue: '#4b71d6',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        textScale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.2)' },
        },
      },
      animations: {
        fadeIn: 'fadeIn 0.5s ease',
        fadeOut: 'fadeOut 0.3s ease',
        textScale: 'textScale 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'header-shadow': '0px 4px 4px rgba(0, 0, 0, 0.1)',
        'auth-shadow': '0px 0px 8px 0px rgba(34, 60, 80, 0.2)',
      },
    },

    borderRadius: {
      ...defaultTheme.borderRadius,
      default: '14px',
      button: '18px',
    },
    borderWidth: {
      ...defaultTheme.borderWidth,
      3: '3px',
    },
    fontSize: {
      ...defaultTheme.fontSize,
      10: '10px',
      xsm: '0.813rem',
      'pre-base': '0.938rem',
    },
    spacing: {
      ...defaultTheme.spacing,
      4.5: '18px',
      'menu-padding': '320px',
      'compact-menu-padding': '100px',
      menu: '300px',
      'compact-menu': '80px',
    },
  },
  variants: {
    extend: {},
    lineClamp: ['responsive', 'hover'],
  },
  plugins: [
    function ({ addUtilities, theme, addVariant }) {
      const spacing = theme('width');

      const clampUtility = Object.entries(spacing).reduce(
        (acc, [key, value]) => {
          acc[`.clamp-${key.replace(/[./]/g, '\\$&')}`] = {
            width: value,
            height: value,
            'min-width': value,
            'min-height': value,
            'max-width': value,
            'max-height': value,
          };

          return acc;
        },
        {},
      );

      addVariant('children', '& > *');
      addVariant('children-after', '& > *:after');
      addVariant('svg', '& > svg');
      addVariant('div', '& > div');

      addUtilities({
        ...clampUtility,
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.flex-between': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        '.pos-abs': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.pos-abs-x': {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        },
        '.pos-abs-y': {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        },
        '.main-gradient': {
          background: 'linear-gradient(99deg, #FC411D -24.67%, #FFF 196.18%)',
        },
        '.main-shadow': {
          'box-shadow': '0px 3px 5px 0px rgba(0, 0, 0, 0.25) inset',
        },
        '.none-bg': {
          background: 'transparent',
        },
        '.animated': {
          transition: 'all 0.3s',
        },
      });
    },
  ],
  corePlugins: {
    container: false,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
};
