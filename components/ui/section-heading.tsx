import type { ReactNode } from "react";
import clsx from "clsx";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        <span className="h-px w-6 bg-accent" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-ink text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
