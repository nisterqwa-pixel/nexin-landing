import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        fg: "hsl(var(--fg))",
        ink: "hsl(var(--ink))",
        line: "hsl(var(--line))",
        "line-strong": "hsl(var(--line-strong))",
        cream: "hsl(var(--muted))",
        "muted-fg": "hsl(var(--muted-fg))",
        blue: {
          DEFAULT: "hsl(var(--blue))",
          ink: "hsl(var(--blue-ink))",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-instrument)", "Times New Roman", "serif"],
      },
      fontSize: {
        // Refined display sizes
        "display-xs": ["3.25rem", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "display-sm": ["4.25rem", { lineHeight: "0.92", letterSpacing: "-0.05em" }],
        "display-md": ["5.5rem", { lineHeight: "0.9", letterSpacing: "-0.055em" }],
        "display-lg": ["7rem", { lineHeight: "0.88", letterSpacing: "-0.06em" }],
        "display-xl": ["9rem", { lineHeight: "0.85", letterSpacing: "-0.065em" }],
      },
      letterSpacing: {
        tightest: "-0.06em",
        "extra-tight": "-0.045em",
      },
    },
  },
  plugins: [],
};

export default config;
