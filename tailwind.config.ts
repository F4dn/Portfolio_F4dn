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
        accent: "#854CE6",
        "accent-2": "#cc00bb",
        "bg-primary": "#0d0d14",
        "bg-secondary": "#12121c",
        "bg-card": "#16161f",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
