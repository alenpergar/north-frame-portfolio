"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { EngravedPlate } from "@/components/ui/engraved-plate";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import type { Dict } from "@/lib/i18n";

export function Hero({ dict }: { dict: Dict }) {
  const shouldReduce = useReducedMotion();
  const ready = useMotionReady();
  const t = dict.hero;

  const sectionRef = useRef<HTMLElement>(null);
  // Progress from the moment the hero starts leaving to the moment it is gone.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // The plate drifts up and the copy eases back as you leave the hero — a quiet
  // "the page is moving under you" at the very top. Both stay inside the hero's
  // own overflow-hidden box.
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // The entrance is CSS-only. Every element renders at its resting, visible
  // state in the HTML, so the headline is the LCP candidate from first paint,
  // the section survives a failed or delayed hydration, and reduced-motion
  // users get the final layout with no animation. The headline carries no
  // delay so LCP is never held behind the stagger.
  const step = (delay: string) => ({ animationDelay: delay });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="grain relative flex min-h-dvh items-center overflow-hidden bg-bg pt-28 pb-20"
    >
      <div className="container-px relative z-10 mx-auto w-full max-w-content">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
          <motion.div style={ready && !shouldReduce ? { y: copyY } : undefined}>
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent motion-safe:animate-fade-up"
              style={step("0s")}
            >
              <span className="h-px w-6 bg-accent" aria-hidden />
              {t.eyebrow}
            </span>

            {/* Rises out of its own box behind a lifting clip — the site's one
                recurring "big type" move, here on load. The clip starts only
                55% down, not fully, so the largest text is painted from the
                first frame and LCP is never held behind the reveal. */}
            <h1
              className="mt-6 pb-[0.14em] -mb-[0.14em] font-sans text-[12.5vw] sm:text-5xl/[1.02] lg:text-6xl/[1.02] xl:text-7xl/[1.02] font-semibold leading-[1.02] tracking-tight text-ink text-balance motion-safe:animate-mask-rise"
              style={step("0.06s")}
            >
              {t.title.lead}{" "}
              <span className="font-display italic font-normal text-accent">
                {t.title.accent}
              </span>
              {t.title.tail}
            </h1>

            <p
              className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed motion-safe:animate-fade-up"
              style={step("0.28s")}
            >
              {t.body}
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-4 motion-safe:animate-fade-up"
              style={step("0.4s")}
            >
              <Button as="a" href="#contact" variant="primary">
                {t.primary}
              </Button>
              <Button as="a" href="#work" variant="ghost">
                {t.secondary}
              </Button>
            </div>

            <ul
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 motion-safe:animate-fade-up"
              style={step("0.5s")}
            >
              {t.tags.map((tag, i) => (
                <li
                  key={tag}
                  className="flex items-center gap-6 text-sm text-ink-muted"
                >
                  <span>{tag}</span>
                  {i < t.tags.length - 1 ? (
                    <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* The plate mark: the embossed impression a printing plate presses
              into damp paper, which frames the image on every intaglio print.
              Light edge above, shadowed edge below — a bevel catching light. */}
          <motion.div
            className="relative order-last aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-border/70 bg-bg shadow-[inset_0_1px_0_rgba(243,241,236,0.055),inset_0_-1px_0_rgba(0,0,0,0.75)] sm:aspect-[16/9] lg:aspect-square"
            style={ready && !shouldReduce ? { y: plateY } : undefined}
          >
            <EngravedPlate className="absolute inset-0" />
          </motion.div>
        </div>
      </div>

      {/* The scroll hint: present at rest, fades out the moment you engage — it
          has done its job. No loop. */}
      <motion.a
        href="#work"
        aria-label={t.scroll}
        style={ready && !shouldReduce ? { opacity: cueOpacity } : undefined}
        className="group absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-ink-muted transition-colors hover:text-accent"
      >
        <span
          style={step("0.7s")}
          className="block transition-transform duration-300 group-hover:translate-y-1 motion-safe:animate-fade-up"
        >
          <ArrowDown size={22} />
        </span>
      </motion.a>
    </section>
  );
}
