import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: "#F7F7F5",
          dark: "#0C0D0E",
        },
        card: {
          light: "#FFFFFF",
          dark: "#141517",
        },
        accent: {
          black: "#0A0A0A",
          yellow: "#F6D84C",
          violet: "#7C3AED",
          cyan: "#06B6D4",
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        "baked-card": "0 8px 30px rgba(0, 0, 0, 0.08)",
        "baked-hover": "0 24px 60px -12px rgba(0, 0, 0, 0.22), 0 12px 24px -8px rgba(0, 0, 0, 0.12)",
        "pill": "0 2px 10px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        "card": "1.25rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSubtle: "pulseSubtle 2.5s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};
export default config;
