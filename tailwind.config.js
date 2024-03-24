/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "black-key":
          "-1px -1px 2px rgba(255,255,255,0.2) inset, 0 -8px 2px 3px rgba(0,0,0,0.6) inset, 0 2px 4px rgba(0,0,0,0.5)",
        "black-key-active":
          "-1px -1px 2px rgba(255,255,255,0.2) inset, 0 -2px 2px 3px rgba(0,0,0,0.6) inset",
        "white-key":
          "-1px 0 0 rgba(255,255,255,0.8) inset, 0 0 5px rgba(200, 200, 200, 1) inset, 0 0 3px rgba(0,0,0,0.2)",
        "white-key-active":
          "2px 0 3px rgba(0,0,0,0.1) inset, -5px 5px 20px rgba(0,0,0,0.2) inset, 0 0 3px rgba(0,0,0,0.2)",
        draggable: "0 0 5px rgba(0,0,0,0.8)",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald", "dracula"],
    darkTheme: "dracula",
  },
};
