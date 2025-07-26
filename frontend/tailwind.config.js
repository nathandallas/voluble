import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "synthwave",
      "retro",
      "cyberpunk",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "fantasy",
      "dracula",
      "cmyk",
      "autumn",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
