import type { Variants } from "framer-motion";

/**
 * The DRYPOINT motion language, in one place.
 *
 * Exactly two easing curves are used across the whole site:
 *   - EASE_OUT  — every arrival, reveal, hover and scroll-linked move
 *   - EASE_IN   — exits only (a panel leaving, a state being dismissed)
 * plus two spring configs for anything that tracks the pointer.
 *
 * Feel: pressed, cinematic, editorial. Motion explains a state change, marks an
 * arrival, or acknowledges an action — never decoration for its own sake.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN = [0.4, 0, 1, 1] as const;

/** Back-compat alias — same curve, older name used in a few components. */
export const EASE_CINEMATIC = EASE_OUT;

/** Duration scale (seconds). Smaller elements move faster; exits are quicker still. */
export const DUR = {
  micro: 0.16, // press, tick, small state
  hover: 0.26, // colour, underline, border, image scale
  reveal: 0.6, // a block entering on scroll
  mask: 0.85, // the typographic mask-rise — the one authored move for big type
  hero: 1.4, // the full hero load sequence, start to settle
} as const;

/** Pointer-tracking springs. `magnetic` for buttons, `drift` for large visuals. */
export const SPRING_MAGNETIC = { stiffness: 170, damping: 17, mass: 0.1 } as const;
export const SPRING_DRIFT = { stiffness: 60, damping: 20, mass: 0.6 } as const;

/**
 * The quiet reveal: opacity plus a short rise. For body copy, lists, cards,
 * anything that is content rather than a moment. Kept subtle on purpose — the
 * mask-rise below is what carries the drama.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  // Resolved per element from `custom`, which is how a caller opts into a
  // delay. A variant that declares its own `transition` replaces the one
  // passed as a prop, so composing the delay in here is what actually makes
  // it reach the animation. The delay key is omitted when there is no delay
  // rather than sent as 0, so it can never overwrite a stagger.
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.reveal,
      ease: EASE_OUT,
      ...(delay > 0 ? { delay } : {}),
    },
  }),
};

/**
 * The mask-rise: the element climbs out of its own box while a clip lifts.
 * This is the site's signature reveal, reserved for large display type
 * (section headings, the hero, the case-study title). Never used on body copy
 * and never stacked — one per heading.
 *
 * `inset(0 0 -35% 0)` as the end state keeps the clip clear of italic
 * descenders (Fraunces `g` / `p` / `j`) during the last frames of the rise.
 */
export const maskRise: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: "18%" },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0 0 -35% 0)",
    y: "0%",
    transition: {
      duration: DUR.mask,
      ease: EASE_OUT,
      ...(delay > 0 ? { delay } : {}),
    },
  }),
};

export function staggerContainer(stagger = 0.07, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}
