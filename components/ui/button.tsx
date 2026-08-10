"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler } from "react";
import clsx from "clsx";

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

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide px-6 py-3 min-h-[44px] transition-colors duration-200 focus-visible:outline-none";

const variants = {
  primary: "bg-accent text-bg hover:bg-ink",
  ghost:
    "text-ink border border-border hover:border-accent hover:text-accent bg-transparent",
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
      {...props}
    >
      {children}
    </motion.button>
  );
}
