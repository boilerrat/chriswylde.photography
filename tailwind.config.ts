import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Zine-inspired bold colors
        zine: {
          magenta: "#FF10F0",
          cyan: "#00FFFF",
          yellow: "#FFFF00",
          lime: "#39FF14",
          black: "#000000",
          paper: "#FFFEF2",
          ink: "#1a1a1a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        impact: ["Impact", "Arial Black", "sans-serif"],
        mono: ["Courier New", "Courier", "monospace"],
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      animation: {
        glitch: "glitch 1s infinite",
        "scan-line": "scan-line 8s linear infinite",
        "color-shift": "color-shift 3s ease-in-out infinite",
        wobble: "wobble 0.5s ease-in-out",
        "stamp-pop": "stamp-pop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "color-shift": {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(90deg)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        "stamp-pop": {
          "0%": { transform: "scale(0) rotate(-45deg)", opacity: "0" },
          "50%": { transform: "scale(1.2) rotate(5deg)" },
          "100%": { transform: "scale(1) rotate(-3deg)", opacity: "1" },
        },
      },
      rotate: {
        "-2": "-2deg",
        "-3": "-3deg",
        "2": "2deg",
        "3": "3deg",
      },
    },
  },
  plugins: [],
};
export default config;

