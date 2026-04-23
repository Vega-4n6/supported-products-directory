import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#020617",
        primary: "#0F172A",
        secondary: "#334155",
        cta: "#0369A1",
        ctaHover: "#075985",
        surface: "#F8FAFC",
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
