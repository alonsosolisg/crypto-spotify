import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customGreen: {
          100: "#66FFB2",
          200: "#33FF7A",
          300: "#00FF42",
          400: "#00D634",
          500: "#00A926",
          600: "#00831E",
          700: "#006B1A",
          800: "#005515",
          900: "#004510",
        },
        customBlack: {
          100: "#333333",
          200: "#2E2E2E",
          300: "#292929",
          400: "#242424",
          500: "#1F1F1F",
          600: "#1A1A1A",
          700: "#151515",
          800: "#101010",
          900: "#0B0B0B",
        },
        customGray: {
          100: "#F8F8F8",
          200: "#F0F0F0",
          300: "#E0E0E0",
          400: "#D1D1D1",
          500: "#B3B3B3",
          600: "#A3A3A3",
          700: "#737373",
          800: "#4D4D4D",
          900: "#333333",
        },
        customWhite: {
          100: "#333333",
          200: "#4D4D4D",
          300: "#666666",
          400: "#808080",
          500: "#999999",
          600: "#B3B3B3",
          700: "#CCCCCC",
          800: "#E6E6E6",
          900: "#F2F2F2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
