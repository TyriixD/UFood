// ./tailwind.config.js

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
    theme: {
      extend: { 
          /*screens: {
          'sm': '600px',
        },*/
      },
    },
    variants: {
    extend: {},
    },
    plugins: [],
}
