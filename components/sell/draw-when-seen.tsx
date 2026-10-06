"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The drawing animates on load with CSS alone. When it starts off-screen (on
 * phones it sits below the fold) this pauses it until it scrolls into view,
 * so the draw is seen rather than finished unseen. Without JavaScript the
 * CSS animation simply runs on load.
 */
export function DrawWhenSeen({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    el.dataset.wait = "";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          delete el.dataset.wait;
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
