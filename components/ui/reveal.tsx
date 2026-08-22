"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, fadeUpReduced, staggerContainer } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? fadeUpReduced : fadeUp;
  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={variants}
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

export function RevealGroup({ children, className, stagger = 0.08 }: RevealGroupProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={staggerContainer(shouldReduce ? 0 : stagger)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? fadeUpReduced : fadeUp;

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
