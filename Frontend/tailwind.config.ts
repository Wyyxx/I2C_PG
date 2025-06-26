import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#ffffff", // White as main background
        foreground: "#044caa", // Updated blue text color
        blue: {
          50: "#eef6ff", // Lightest blue - for subtle backgrounds
          100: "#d8ebff", // Very light blue - for borders, backgrounds
          200: "#b1d5ff", // Light blue - for hover states, secondary elements
          300: "#8abeff", // Medium-light blue
          400: "#63a7ff", // Medium blue
          500: "#3c90ff", // Standard blue
          600: "#1a78f5", // Medium-dark blue
          700: "#044caa", // Our primary blue - for buttons, primary elements
          800: "#033d88", // Darker blue - for hover states
          900: "#022e66", // Darkest blue - for text, headers
        },
        primary: {
          DEFAULT: "#ffffff", // White
          foreground: "#044caa", // Updated blue text color
        },
        secondary: {
          DEFAULT: "#f8f9fa", // Light gray
          foreground: "#044caa", // Updated blue text color
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#f1f3f5", // Very light gray
          foreground: "#044caa", // Updated blue text color
        },
        accent: {
          DEFAULT: "#f8f9fa", // Light gray
          foreground: "#044caa", // Updated blue text color
        },
        popover: {
          DEFAULT: "#ffffff", // White
          foreground: "#044caa", // Updated blue text color
        },
        card: {
          DEFAULT: "#ffffff", // White
          foreground: "#044caa", // Updated blue text color
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
