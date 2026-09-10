"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Returns `true` only once it is safe to hand an element to Framer Motion for
 * an entrance:
 *
 * - never during SSR or the first client render, so content ships visible in
 *   the HTML and survives a failed or slow hydration;
 * - never when the user prefers reduced motion, so they always get the final
 *   state with no wait;
 * - never while the document is hidden, so a page opened in a background tab
 *   is not left parked in its `initial="hidden"` state with no `whileInView`
 *   observer running to release it. It upgrades as soon as the tab is shown.
 *
 * Components branch on this: render the plain element until it is `true`, then
 * the motion element.
 */
export function useMotionReady() {
  const shouldReduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.visibilityState === "visible") {
      setReady(true);
      return;
    }
    const onVisibility = () => {
      if (document.visibilityState === "visible") setReady(true);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return ready && !shouldReduce;
}
