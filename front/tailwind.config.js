/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,tsx}",
    "./pages/**/*.{html,js,tsx}",
    "./components/**/*.{html,js,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Hack Nerd Font", "mono"]
      },
      colors: {
        'black': "#01060E",
        'red': "#EA6C73",
        'green': "#91B362",
        'yellow': "#F9AF4F",
        'blue': "#53BDFA",
        'magenta': "#FAE994",
        'cyan': "#90E1C6",
        'white': "#C7C7C7",
      },
    },
  },
  plugins: [],
};
