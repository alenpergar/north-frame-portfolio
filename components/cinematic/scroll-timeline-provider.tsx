"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useScroll, type MotionValue } from "framer-motion";

/**
 * One shared scroll clock for the cinematic segment (Opening + Hero today;
 * future shots read the same value rather than each opening their own
 * useScroll). This is a Framer MotionValue, not React state: it updates
 * outside the render cycle, so subscribing to it (useTransform,
 * useMotionValueEvent) never re-renders the tree.
 */
const ScrollTimelineContext = createContext<MotionValue<number> | null>(null);

export function ScrollTimelineProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref}>
      <ScrollTimelineContext.Provider value={scrollYProgress}>
        {children}
      </ScrollTimelineContext.Provider>
    </div>
  );
}

/** 0 at the top of the wrapped segment, 1 once it has fully passed. */
export function useScrollTimeline() {
  const value = useContext(ScrollTimelineContext);
  if (!value) {
    throw new Error("useScrollTimeline must be used inside <ScrollTimelineProvider>");
  }
  return value;
}
