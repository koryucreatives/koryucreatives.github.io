import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0806",
          900: "#14100b",
          800: "#1f1811",
          700: "#2e2418",
          600: "#4d3d28",
          500: "#8f7a5c",
          400: "#ab9370",
          300: "#c7af8a",
          200: "#ddcba8",
          100: "#ebddc4",
          50: "#f6ecd8",
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
        grain: "grain 8s steps(8) infinite",
        "spin-slow": "spinSlow 120s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
