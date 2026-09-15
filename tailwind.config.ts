import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0a",
          900: "#101010",
          800: "#181818",
          700: "#242424",
          600: "#3a3a3a",
          500: "#5c5c5c",
          400: "#868686",
          300: "#aeaeae",
          200: "#d4d4d4",
          100: "#e8e8e8",
          50: "#fafafa",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      letterSpacing: {
        widest2: "0.35em",
        widest3: "0.5em",
      },
      maxWidth: {
        content: "1440px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -8%)" },
          "20%": { transform: "translate(-12%, 4%)" },
          "30%": { transform: "translate(6%, -10%)" },
          "40%": { transform: "translate(-6%, 12%)" },
          "50%": { transform: "translate(-10%, 5%)" },
          "60%": { transform: "translate(9%, 0%)" },
          "70%": { transform: "translate(0%, 9%)" },
          "80%": { transform: "translate(-7%, -5%)" },
          "90%": { transform: "translate(4%, 8%)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        grain: "grain 8s steps(8) infinite",
        "spin-slow": "spinSlow 120s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
