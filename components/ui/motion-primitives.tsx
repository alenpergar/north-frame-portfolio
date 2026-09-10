"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import { SPRING_MAGNETIC } from "@/lib/motion";

/**
 * Shared scroll- and pointer-linked motion, all built on Framer values that
 * update outside React so they never re-render the tree or touch layout.
 *
 * Every primitive degrades to a plain element until `useMotionReady()` is true,
 * so SSR, a failed hydration, a background tab and `prefers-reduced-motion` all
 * get the static page. Pointer effects additionally require a fine pointer.
 */

/**
 * `true` only when pointer-driven motion effects (magnetic pull, hover
 * parallax) should run: a fine pointer is present AND the user has not asked
 * for reduced motion. SSR-safe — starts `false`.
 */
export function useFinePointer() {
  const shouldReduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const on = () => setFine(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine && !shouldReduce;
}

/** `true` on coarse-pointer devices (touch). Used to soften parallax on phones. */
function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setCoarse(mq.matches);
    const on = () => setCoarse(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return coarse;
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Peak vertical travel in px across the element's full pass through the viewport. */
  amount?: number;
  /** Optional constant scale so the travel never exposes an edge on full-bleed media. */
  scale?: number;
};

/**
 * Translates its children vertically as the element scrolls through the
 * viewport. Travel is halved on touch devices and zero (a plain element) until
 * motion is ready and allowed. The element type never switches, so the scroll
 * target stays stable.
 *
 * The caller's `className` must carry a non-static position (the wrappers here
 * are all `absolute inset-0` over their section), which is what Framer measures
 * the scroll offset against.
 */
export function Parallax({ children, className, amount = 48, scale = 1 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = useMotionReady();
  const coarse = useCoarsePointer();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const travel = coarse ? amount * 0.5 : amount;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        ready
          ? { y, scale: scale !== 1 ? scale : undefined, willChange: "transform" }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

/**
 * Pointer-follow offset for magnetic controls. Returns spring-backed x/y motion
 * values and the handlers to wire onto the element. Inert on touch / reduced
 * motion (the handlers simply never fire because the caller gates on
 * `useFinePointer()`), but callers should still guard rendering.
 */
export function useMagnetic(strength = 0.35) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING_MAGNETIC);
  const y = useSpring(my, SPRING_MAGNETIC);

  const onMove: React.PointerEventHandler<Element> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    my.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave: React.PointerEventHandler<Element> = () => {
    mx.set(0);
    my.set(0);
  };

  return { x, y, onMove, onLeave };
}
