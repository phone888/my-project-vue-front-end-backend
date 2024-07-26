/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  daisyui: {
    themes: ["retro"],
  },
  theme: {
    fontFamily: {
      'sans': [ "Playwrite NZ"]
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}