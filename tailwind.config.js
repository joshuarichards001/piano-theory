/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "black-key":
          "-1px -1px 2px rgba(255,255,255,0.2) inset, 0 -8px 2px 3px rgba(0,0,0,0.6) inset, 0 2px 4px rgba(0,0,0,0.5)",
        "white-key":
          "-1px 0 0 rgba(255,255,255,0.5) inset, 0 0 5px rgba(200, 200, 200, 0.5) inset, 0 0 3px rgba(0,0,0,0.2)",
        draggable: "0 0 5px rgba(0,0,0,0.8)",
      },
      padding: {
        "safe-bottom": "max(env(safe-area-inset-bottom), 20px)",
        "safe-top": "max(env(safe-area-inset-top), 20px)",
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
