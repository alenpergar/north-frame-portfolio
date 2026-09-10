"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler } from "react";
import clsx from "clsx";
import { useFinePointer, useMagnetic } from "@/components/ui/motion-primitives";

const MotionLink = motion.create(Link);

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
> & {
  variant?: "primary" | "ghost";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
};

// No `focus-visible:outline-none` here: the button carries the same 2px accent
// ring as every link on the site, from the global `:focus-visible` rule in
// globals.css. Suppressing it left every CTA with no visible keyboard focus.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide px-6 py-3 min-h-[44px] transition-[color,background-color,border-color,box-shadow] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

const variants = {
  // The fill stays accent; the response is a soft accent-tinted lift shadow
  // plus the magnetic pull, not a colour swap.
  primary:
    "bg-accent text-bg hover:shadow-[0_12px_34px_-12px_rgba(200,155,108,0.6)]",
  ghost:
    "text-ink border border-border bg-transparent hover:border-accent hover:text-accent hover:bg-accent/[0.06]",
};

export function Button({
  variant = "primary",
  as = "button",
  href,
  target,
  rel,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);
  const fine = useFinePointer();
  const magnetic = variant === "primary" && fine;
  const { x, y, onMove, onLeave } = useMagnetic(0.22);

  const motionExtras = magnetic
    ? { style: { x, y }, onPointerMove: onMove, onPointerLeave: onLeave }
    : {};

  if (as === "a" && href) {
    const isExternal = target === "_blank" || /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <motion.a
          href={href}
          target={target}
          rel={rel}
          whileTap={{ scale: 0.97 }}
          className={classes}
          onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
          {...motionExtras}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <MotionLink
        href={href}
        whileTap={{ scale: 0.97 }}
        className={classes}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        {...motionExtras}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={classes}
      onClick={onClick}
      {...motionExtras}
      {...props}
    >
      {children}
    </motion.button>
  );
}
