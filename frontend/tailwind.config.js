/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        "3/5": "60%",
      },
      maxWidth: {
        "9/20": "45%",
      },
    },
  },
  plugins: [],
};
