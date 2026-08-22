import type { Variants } from "framer-motion";

export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  // Resolved per element from `custom`, which is how a caller opts into a
  // delay. A variant that declares its own `transition` replaces the one
  // passed as a prop, so composing the delay in here is what actually makes
  // it reach the animation.
  //
  // The delay key is omitted when there is no delay rather than sent as 0.
  // Framer builds each value transition as
  // `{ delay: <orchestration>, ...variantTransition }`, so an explicit
  // `delay: 0` would overwrite the delay staggerChildren computes and flatten
  // every RevealGroup cascade.
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_CINEMATIC,
      ...(delay > 0 ? { delay } : {}),
    },
  }),
};

// Deliberately ignores `custom`: under reduced motion nothing should be held
// back, so content still fades straight in rather than waiting its turn.
export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export function staggerContainer(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}
