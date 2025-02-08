const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rtl: ["IRSANS", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        'html[dir="rtl"]': {
          direction: "rtl",
          textAlign: "right",
          fontFamily: "IRSANS, sans-serif",
        },
        'html[dir="ltr"]': {
          direction: "ltr",
          textAlign: "left",
        },
      });
    }),
  ],
};
