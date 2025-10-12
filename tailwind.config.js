// myproject/expencetracker/tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vintage: {
          bg: '#fdf6e3',      // page background
          card: '#f9f3e7',    // card background
          border: '#c9b79c',  // border accents
          text: '#3b332b',    // darker text
          muted: '#8b7561'    // muted accents
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Merriweather', 'serif'],
      }
    }
  }
}