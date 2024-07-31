/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import { Sidebar } from "./src/components/AdminPage/sidebar";
module.exports = {
  content: [
    // "./src/**/*.{js,jsx,ts,tsx,css}",
    "./src/**/*.{js,ts,jsx,tsx,css}",
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,css}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx,css}",
    // "./src/app/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/app/globals.css",
    // "./src/stories/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      textColor: {
        "green-primary": "#03A584",
        "blue-primary": "#212743",
        "dark-green": "#03A584",
        "gray-70": "#8B8E9C",
        error: "#F55A63",
      },
      backgroundColor: {
        "auxilliary-beige": "#E9E3D8",
        "auxilliary-beige-40": "rgba(233, 227, 216, 0.40)",
        "auxiliary-green-gray-50": "rgba(230, 238, 237, 0.50)",
        "blue-primary": "#212743",
        "blue-romance": "#3B7DBA",
        "green-primary": "#03A584",
        "green-primary-light": "#04D2A8",
        "green-healing": "#039BA5",
        "gray-immersion": "#626575",
        "gray-relaxtion": "#E9E3D8",
        "gray-Indulgence": "#8B8E9C",
        "gray-scale-40": "rgba(203, 204, 209, 0.4)",
        "gray-scale": "#CBCCD1",
        "blue-primary-light": "#404767",
        "gray-hover-your-edit": "rgba(139, 142, 156, 0.05)",
        "gray-50": "#CBCCD133",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        login: 'url("/assets/image/bg-login.png")',
        logo: 'url("/assets/svg/logo-tango.svg")',
        "google-icon": 'url("/assets/image/gg-icon.jpg")',
        draw: 'url("/assets/svg/draw.svg")',
        "draw-green": 'url("/assets/image/draw-green.png")',
        itinerary: 'url("/assets/image/bg-itinerary.jpg")',
        "thumb-up-dark": 'url("/assets/emoticons/thumb-up-black.svg")',
        "thumb-up-light": 'url("/assets/emoticons/thumb-up-white.svg")',
        "thumb-down-dark": 'url("/assets/emoticons/thumb-down-black.svg")',
        "thumb-down-light": 'url("/assets/emoticons/thumb-down-white.svg")',
        japan: 'url("/assets/image/japan.svg")',
        "diamond-green": 'url("/assets/emoticons/diamond-green.svg")',
        "gradient-generate": "linear-gradient(90deg, #1A8982 0%, #03A584 100%)",
        "gradient-generate-hover":
          "linear-gradient(90deg, #1A8982 0%, #03A584 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));",
        "gradient-generate-left":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 64.86%)",
      },
      backgroundSize: {
        stretch: "100% 100%",
        "w-80": "80% 100%",
        "h-50": "100% 50%",
        "h-70": "100% 70%",
      },
      screens: {
        desktop: "1440px",
        desktopLg: "1920px",
        nextStep: "1200px",
      },
      fontFamily: {
        'studio6': ['FontStudio6', 'sans-serif'],
        'studio7': ["Josefin Sans", 'sans-serif'],

      },
      gridTemplateColumns:{
        'sidebar': '60px 1fr'
      },
      colors: {
        "gray-bg": "#E6EEED",
        "white":"#fff",
        "blue-primary": "#212743",
        "dark-blue": "#0C122E",
        "green-primary": "#03A584",
        "gray-opacity": "#CBCCD166",
        "blue-light": "#404767",
        "green-light": "#04D2A8",
        "gray-scale": "#CBCCD1",
        "grayscale-70": "#21274380",
        "auxilliary-beige": "#E9E3D8",
        "gray-immersion": "#626575",
        error: "#F55A63",
        "auxilliary-green-blue": "#039BA5",
        "auxiliary-beige": "#F1EADE",
        "grayscale-90": "#464750",
        "gray-celebration": "#8B8E9C",
        "auxiliary-pink": "#EE6880",
        "auxiliary-orange": "#EE9068",
        "black-50": "#00000080",
      },
      fontSize: {
        "4base": "4rem",
        "2base": "2rem",
        "22px": "1.375rem",
      },
      lineHeight: {
        6.5: "26px",
      },
      letterSpacing: {
        0.08: "0.08px",
        0.014: "0.014px",
        0.016: "0.016px",
        "0.04em": "0.04em",
        "0.001em": "0.01em",
      },
      rotate: {
        15: "15deg",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "button-beat": {
          "50%": {
            transform: "scale(0.8)",
          },
          "0%, 100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        fadeBg: "fade-in 2s ease-out forwards",
        fadeFast: "fade-in .5s ease-out forwards",
        beating: "button-beat 1s ease-out forwards",
      },
      variants: {
        textColor: ({ after }) => after(["invalid"]),
      },
      boxShadow: {
        popup: "0px 4px 25px 0px #89898940",
        select: "0px 14px 60px 0px #0000001A",
      },
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant("aria-invalid", ({ modifiselectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`;
        });
      });
    }),
  ],
};
