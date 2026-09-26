import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // "Screening room": a dark, neutral room where the only colour on the
      // page comes from the films. The token names are kept from the previous
      // palette so existing pages restyle without markup changes; `accent` is
      // now the off-white itself (focus rings, primary buttons, active states).
      colors: {
        bg: "#0B0B0C",
        surface: "#141416",
        "surface-2": "#1B1B1E",
        border: "#27272A",
        ink: "#EDEDEB",
        "ink-muted": "#8F8F8A",
        accent: "#EDEDEB",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Alias kept so older markup (`font-display`) renders in Geist too.
        display: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1360px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Display type rising out of its own box behind a lifting clip. Starts
        // 55% clipped and at 0.4 opacity, not hidden, so the headline is painted
        // from the first frame and LCP is never held behind the reveal.
        "mask-rise": {
          "0%": {
            opacity: "0.4",
            clipPath: "inset(0 0 55% 0)",
            transform: "translateY(14px)",
          },
          "100%": {
            opacity: "1",
            clipPath: "inset(0 0 -25% 0)",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        // `both` fill-mode so a delayed element holds its start state during the
        // delay. Gate usage behind `motion-safe:`.
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "mask-rise": "mask-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
