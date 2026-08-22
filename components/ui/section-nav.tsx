"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/motion";
import { localePath, type Dict, type Locale } from "@/lib/i18n";

/**
 * The vertical section index, set against the right edge of the page.
 *
 * It reads as the edge of a plate rather than a sidebar: one engraved rule
 * held at the margin, with a short registration tick cut inward beside
 * whichever section you are currently in.
 *
 * It only appears from 1400px up. Below that the page's right gutter is
 * narrower than the rail: clearance works out to (layoutWidth / 2) - 676, so
 * 1366px leaves none at all and 1280px is 79px short. Under that width the
 * rail would sit on top of section content, and the horizontal nav in the
 * header covers those sizes instead.
 */

const list = {
  hidden: {},
  // The rule is drawn first; the items only start once it has landed.
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE_CINEMATIC },
  },
};

export function SectionNav({ dict, locale }: { dict: Dict; locale: Locale }) {
  const shouldReduce = useReducedMotion();
  const [active, setActive] = useState("top");
  const items = dict.nav.sections;

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // A band across the middle of the viewport decides what you are "in".
    // Where two sections straddle it, the earlier one wins, which keeps the
    // tick from flickering between neighbours on a fast scroll.
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        const next = items.find((i) => inBand.has(i.id));
        if (next) setActive(next.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={dict.nav.sectionsLabel}
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 min-[1400px]:block"
    >
      <motion.ul
        className="relative flex flex-col items-end"
        // Reduced motion renders the final state outright rather than starting
        // hidden, so suppressing the animation can never leave the nav blank.
        initial={shouldReduce ? false : "hidden"}
        animate="visible"
        variants={list}
      >
        {/* The plate edge. Items hold their space from the first frame, so the
            rule has its full height immediately and nothing shifts. */}
        <motion.span
          aria-hidden
          className="absolute right-0 top-0 h-full w-px origin-top bg-border"
          initial={shouldReduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
        />

        {items.map((entry) => {
          const isActive = entry.id === active;

          return (
            <motion.li key={entry.id} variants={item}>
              <Link
                href={localePath(locale, entry.to)}
                aria-current={isActive ? "location" : undefined}
                className="group flex items-center justify-end gap-2 py-1.5 pr-0"
              >
                <span
                  className={clsx(
                    "text-[10px] font-semibold uppercase tracking-[0.16em] transition-[color,transform] duration-300",
                    "group-hover:-translate-x-0.5",
                    isActive ? "text-ink" : "text-ink-muted group-hover:text-ink"
                  )}
                >
                  {entry.label}
                </span>

                {/* Registration tick. Fixed-width box with a scaling line
                    inside, so hover moves nothing in the layout. */}
                <span aria-hidden className="block h-px w-2.5 shrink-0">
                  <span
                    className={clsx(
                      "block h-px w-full origin-right bg-accent transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
