"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, maskRise, staggerContainer } from "@/lib/motion";
import { useMotionReady } from "@/components/ui/use-motion-ready";

/**
 * Scroll reveals are an enhancement, never a gate on content. The server and
 * the first client render always emit the plain element with no hidden state;
 * only once `useMotionReady()` is true does it upgrade to a Framer node that
 * runs the `whileInView` entrance.
 *
 * Two variants:
 *   - "fade" (default) — opacity + short rise, for content blocks
 *   - "mask"           — the mask-rise, reserved for large display type
 *
 * `mask` clips the bottom of the element, so wrap only the type itself (give
 * the wrapper a touch of bottom padding via `className` if a descender needs
 * room) — never a whole column.
 */

type Variant = "fade" | "mask";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  variant?: Variant;
};

const VARIANTS = { fade: fadeUp, mask: maskRise } as const;

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "fade",
}: RevealProps) {
  const ready = useMotionReady();

  if (!ready) {
    const Tag = as === "section" ? "section" : "div";
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={VARIANTS[variant]}
      // `custom` feeds the delay into the variant itself. Passing it as a
      // `transition` prop instead has no effect: a variant that declares its
      // own transition replaces the prop rather than merging with it.
      custom={delay}
    >
      {children}
    </MotionTag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function RevealGroup({ children, className, stagger = 0.07 }: RevealGroupProps) {
  const ready = useMotionReady();

  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={staggerContainer(stagger)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variant = "fade",
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
}) {
  const ready = useMotionReady();

  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={VARIANTS[variant]}>
      {children}
    </motion.div>
  );
}
