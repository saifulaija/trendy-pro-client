


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#F50600",
        secondry: "#ce1126",
        tertiary: "#213641",
        textprimary: "#4d4f53",
        divider: "#1F1F1F",
        textsecoundary: "#8a7967",
        texttertiary: "#6d6e70",
        texthexa: " rgb(245 208 254)",
        textwhite: "#eff2f3",
      },
    },
  },
  plugins: [],
};
