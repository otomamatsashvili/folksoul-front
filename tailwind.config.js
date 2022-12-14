/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '420px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'main-gradient':
          'radial-gradient(50% 50% at 50% 50%, #534571 0%, #342C46 100%)',
        'login-gradient': 'linear-gradient(180deg, #345161 0%, #7B5A5A 100%)',
      },
      colors: {
        'red-bg': '#EB5757',
        'login-black': '#272727',
        'placeholder-color': '#501C1C',
        'input-bg': '#C4B6B2',
        'login-button': '#345161',
        'error-red': '#CC1E1E',
        'dashboard-bg': '#FBFBFB',
        'dashboard-shadow': '#4D4D4D',
        'dashboard-dark': '#333333',
        'nav-border': '#898989',
        'link-blue': '#3A7DA3',
        'member-card-blue': '#143B52',
        'button-green': '#53C02C',
        'modal-bg': '#042639',
        'content-white': '#FBFBFB',
        'pagination-active': '#444444',
        'pagination-inactive': '#C4C4C4',
        'placeholder-gray': '#A8A3A3',
        'primary-dark-blue': '#143B52',
        'scrollbar-blue': '#87AEC5',
        'social-link-blue': '#2F80ED',
        'about-purple': '#3B5495',
        'textarea-gray': '#E5E5E5',
        'landing-yellow': '#F2C94C',
        'panel-yellow': '#FBD560',
        'main-purple': '#534571',
      },
      boxShadow: {
        inside: 'inset 4px 4px 20px #4D4D4D;',
        card: '5px 5px 13px rgba(0, 0, 0, 0.63);',
        small: '2px 4px 14px #000000;',
        'modal-avatar': '1.11504px 2.23009px 7.80531px #000000;',
      },
      dropShadow: { thin: '0px 4px 4px rgba(0, 0, 0, 0.25)' },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
