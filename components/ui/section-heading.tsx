import type { ReactNode } from "react";
import clsx from "clsx";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Every section opens the same way: the eyebrow fades in, the heading rises out
 * of its own box behind a lifting clip, and the supporting line follows a beat
 * later. The heading mask is the site's one recurring "big type" move — it is
 * what makes each section feel authored rather than faded in.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <RevealGroup
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
      stagger={0.09}
    >
      <RevealItem>
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-6 bg-accent" aria-hidden />
          {eyebrow}
        </span>
      </RevealItem>

      {/* The clip lifts from the bottom, so a hair of bottom padding (pulled
          back with a negative margin) keeps italic descenders clear. */}
      <RevealItem variant="mask" className="pb-[0.14em] -mb-[0.14em]">
        {/* Line-height is pinned per size with the slash modifier so it survives
            the breakpoint — a bare `leading-tight` is overridden at `sm`/`lg` by
            the line-height Tailwind bundles into each `text-*` step. 1.25 is
            `leading-tight`. */}
        <h2 className="mt-4 font-display text-3xl/[1.25] sm:text-4xl/[1.25] lg:text-5xl/[1.25] text-ink text-balance">
          {title}
        </h2>
      </RevealItem>

      {description ? (
        <RevealItem>
          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
            {description}
          </p>
        </RevealItem>
      ) : null}
    </RevealGroup>
  );
}
