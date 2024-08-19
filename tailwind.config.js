/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        main: {
          lightest: "#dde6f0",
          DEFAULT: "#0051CB",
        },
        black: "#282020",
        grey: {
          lightest: "#d3d3d3",
          light: "#aaa",
          DEFAULT: "#808080",
        },
        green: {
          DEFAULT: "#47BE9F",
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
