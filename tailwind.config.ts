import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        fog: "#d5d5d5",
        steel: "#8a8a8a",
        line: "#232323"
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(255,255,255,0.08), 0 16px 40px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
