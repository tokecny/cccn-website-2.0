module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // <- ต้องครอบคลุม path ของ globals.css
  theme: {
    extend: {
      colors: {
        "cccn-primary": "#ec4899",
        "cccn-secondary": "#f472b6",
        "cccn-dark": "#0a0a0a",
        "cccn-light": "#ededed",
      },
    },
  },
  plugins: [],
};
