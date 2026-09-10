import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A09",
        surface: "#141412",
        "surface-2": "#1C1B18",
        border: "#2A2925",
        ink: "#F3F1EC",
        "ink-muted": "#A6A39A",
        accent: "#C89B6C",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
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
        // The hero headline rising out of its own space behind a lifting clip.
        // Starts 55% clipped, not 100%, so the largest text is painted from the
        // first frame and LCP is never held behind the reveal. `both` fill-mode
        // holds the start state through the sequence delay.
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
        // The engraved-plate reveal, off Framer Motion so it plays from first
        // paint and never depends on hydration.
        "plate-draw": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // `both` fill-mode so a delayed element holds its start state during the
        // delay rather than flashing in first. Gate usage behind `motion-safe:`
        // so reduced-motion users get the element at its resting visible state.
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "mask-rise": "mask-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "plate-draw":
          "plate-draw 1.3s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both",
        marquee: "marquee 30s linear infinite",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
