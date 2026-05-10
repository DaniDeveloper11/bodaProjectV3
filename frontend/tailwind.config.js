/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      colors: {
        brand: {
          sage:  '#6a8e58',
          cream: '#f5f0e8',
          blush: '#e8c9b8',
          gold:  '#d3924a',
          dark:  '#1d1f21',
          rose:  '#bba9a0',
        }
      },
      fontFamily: {
        dancing:  ['"Dancing Script"', 'cursive'],
        poppins:  ['Poppins', 'sans-serif'],
        pacifico: ['"Pacifico"', 'cursive'],
        alex:     ["'Alex Brush", 'cursive'],
        playfair: ['"Playfair Display"', 'serif'],
        lora:     ['Lora', 'serif']
      },
    },
  },
  plugins: [],
}

