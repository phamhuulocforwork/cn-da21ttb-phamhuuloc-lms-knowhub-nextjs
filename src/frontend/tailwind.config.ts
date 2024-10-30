import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#cbd5e1",
        input: "#cbd5e1",
        ring: "#d71441",
        background: "#ffffff",
        foreground: "#0d1117",
        primary: {
          DEFAULT: "#70d5f0",
          "50": "#edfbfe",
          "100": "#d2f4fb",
          "200": "#aae8f7",
          "300": "#70d5f0",
          "400": "#1faed8",
          "500": "#139cc7",
          "600": "#137ca7",
          "700": "#166488",
          "800": "#1b536f",
          "900": "#1b465e",
          "950": "#0c2c40",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#fba63c",
          "50": "#fff7ed",
          "100": "#ffecd5",
          "200": "#fed9aa",
          "300": "#fdc074",
          "400": "#fba63c",
          "500": "#f99416",
          "600": "#ea870c",
          "700": "#c2710c",
          "800": "#9a5e12",
          "900": "#7c4d12",
          "950": "#432807",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          "50": "#fef2f2",
          "100": "#fee2e2",
          "200": "#fecaca",
          "300": "#fca5a5",
          "400": "#f87171",
          "500": "#ef4444",
          "600": "#dc2626",
          "700": "#b91c1c",
          "800": "#991b1b",
          "900": "#7f1d1d",
          "950": "#450a0a",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#668091",
          "50": "#f9fafb",
          "100": "#eceff2",
          "200": "#d5dde2",
          "300": "#b0bfc9",
          "400": "#859bab",
          "500": "#668091",
          "600": "#516778",
          "700": "#425462",
          "800": "#394753",
          "900": "#333e47",
          "950": "#22292f",
        },
        accent: {
          DEFAULT: "#1faed8",
          "50": "#edfbfe",
          "100": "#d2f4fb",
          "200": "#aae8f7",
          "300": "#70d5f0",
          "400": "#1faed8",
          "500": "#139cc7",
          "600": "#137ca7",
          "700": "#166488",
          "800": "#1b536f",
          "900": "#1b465e",
          "950": "#0c2c40",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#d71441",
          foreground: "#ffffff",
        },
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
} satisfies Config;

export default config;
