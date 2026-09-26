import type { ReactNode } from "react";
import clsx from "clsx";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type SectionHeadingProps = {
  /** Optional small label. The homepage uses none; the case study keeps its. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * A section opens with its heading rising out of its own box behind a lifting
 * clip, the site's one recurring move for big type, then the supporting line
 * a beat later.
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
      className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}
      stagger={0.09}
    >
      {eyebrow ? (
        <RevealItem>
          <span className="mb-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            {eyebrow}
          </span>
        </RevealItem>
      ) : null}

      {/* A hair of bottom padding, pulled back with a negative margin, keeps
          descenders clear of the clip. Line-height is pinned with an explicit
          leading so it survives every breakpoint. */}
      <RevealItem variant="mask" className="pb-[0.14em] -mb-[0.14em]">
        <h2 className="text-[clamp(2.25rem,4.6vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-ink text-balance">
          {title}
        </h2>
      </RevealItem>

      {description ? (
        <RevealItem>
          <p className="mt-5 max-w-xl text-base text-ink-muted leading-relaxed sm:text-lg">
            {description}
          </p>
        </RevealItem>
      ) : null}
    </RevealGroup>
  );
}
