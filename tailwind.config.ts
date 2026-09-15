import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b1220",
          900: "#111a2e",
          800: "#17233a",
          700: "#223252",
          600: "#3c4a68",
          500: "#8c8570",
          400: "#a79e85",
          300: "#c4b99c",
          200: "#ded2b3",
          100: "#ede3c8",
          50: "#f7f0de",
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
