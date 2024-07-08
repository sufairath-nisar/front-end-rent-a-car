/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import animations from '@midudev/tailwind-animations';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy

  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      lineHeight: {
        '8': '3rem', 
      },      
     
    },
  },
  plugins: [daisyui,animations],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
         
        },
      },
      {
        night: {  
          ...require("daisyui/src/theming/themes")["night"],
          // "red-700" : "#000000",

        },
      },
    ],
  },
};
