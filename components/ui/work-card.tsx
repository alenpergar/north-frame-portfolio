"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SPRING_DRIFT, SPRING_MAGNETIC } from "@/lib/motion";
import { useFinePointer } from "@/components/ui/motion-primitives";

/**
 * Shared pointer behaviour for a work card: the image drifts opposite the
 * cursor inside its frame, the arrow is drawn toward the cursor, and both ease
 * home on leave. All values are Framer springs updated off the React tree.
 * Callers only wire this up when `useFinePointer()` is true.
 */
export function useCardPointer() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const imgX = useSpring(useTransform(px, (v) => v * -14), SPRING_DRIFT);
  const imgY = useSpring(useTransform(py, (v) => v * -14), SPRING_DRIFT);
  const arrowX = useSpring(useTransform(px, (v) => v * 10), SPRING_MAGNETIC);
  const arrowY = useSpring(useTransform(py, (v) => v * 10), SPRING_MAGNETIC);

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - (rect.left + rect.width / 2)) / rect.width);
    py.set((event.clientY - (rect.top + rect.height / 2)) / rect.height);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return { imgX, imgY, arrowX, arrowY, onMove, onLeave };
}

type ConceptCardProps = {
  index: string;
  category: string;
  title: string;
  description: string;
  angle: string;
  image?: string;
  href?: string | null;
};

export function ConceptCard({
  index,
  category,
  title,
  description,
  angle,
  image,
  href,
}: ConceptCardProps) {
  const fine = useFinePointer();
  const { imgX, imgY, arrowX, arrowY, onMove, onLeave } = useCardPointer();

  const cardClasses =
    "group relative block overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,background-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent/60 hover:bg-surface-2";

  const content = (
    <>
      <div
        className="relative aspect-[4/5] sm:aspect-[16/11] overflow-hidden"
        style={{
          background: `radial-gradient(120% 100% at 10% 0%, rgba(200,155,108,0.16), transparent 60%), linear-gradient(${angle}, #17160f, #0A0A09 60%)`,
        }}
      >
        {image ? (
          <motion.div
            className="absolute -inset-[6%]"
            style={fine ? { x: imgX, y: imgY } : undefined}
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="scale-105 object-cover opacity-75 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:opacity-90"
            />
          </motion.div>
        ) : null}
        <div className="grain absolute inset-0" />
        <span className="absolute left-6 top-6 font-display text-6xl italic text-ink/10 transition-colors duration-500 group-hover:text-accent/25">
          {index}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 p-6 sm:p-8">
        <div className="transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {category}
          </span>
          <h3 className="mt-2 font-display text-xl sm:text-2xl text-ink">
            {title}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-ink-muted leading-relaxed">
            {description}
          </p>
        </div>

        <motion.span
          aria-hidden
          style={fine ? { x: arrowX, y: arrowY } : undefined}
          className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
        >
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.span>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cardClasses}
        onPointerMove={fine ? onMove : undefined}
        onPointerLeave={fine ? onLeave : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <article
      className={cardClasses}
      onPointerMove={fine ? onMove : undefined}
      onPointerLeave={fine ? onLeave : undefined}
    >
      {content}
    </article>
  );
}
