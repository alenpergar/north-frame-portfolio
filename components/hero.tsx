"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { EngravedPlate } from "@/components/ui/engraved-plate";
import { staggerContainer } from "@/lib/motion";
import type { Dict } from "@/lib/i18n";

export function Hero({ dict }: { dict: Dict }) {
  const shouldReduce = useReducedMotion();
  const t = dict.hero;

  const rise = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section
      id="top"
      className="grain relative flex min-h-dvh items-center overflow-hidden bg-bg pt-28 pb-20"
    >
      <div className="container-px relative z-10 mx-auto w-full max-w-content">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
          <motion.div
            // Under reduced motion the block renders in its final, readable
            // state rather than starting from the hidden variant — otherwise
            // suppressing the animation would leave the headline at opacity 0.
            initial={shouldReduce ? false : "hidden"}
            animate="visible"
            variants={staggerContainer(shouldReduce ? 0 : 0.12, 0.1)}
          >
            <motion.span
              variants={rise}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
            >
              <span className="h-px w-6 bg-accent" aria-hidden />
              {t.eyebrow}
            </motion.span>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              className="mt-6 font-sans text-[12.5vw] sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.02] tracking-tight text-ink text-balance"
            >
              {t.title.lead}{" "}
              <span className="font-display italic font-normal text-accent">
                {t.title.accent}
              </span>
              {t.title.tail}
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed"
            >
              {t.body}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button as="a" href="#contact" variant="primary">
                {t.primary}
              </Button>
              <Button as="a" href="#work" variant="ghost">
                {t.secondary}
              </Button>
            </motion.div>

            <motion.ul
              variants={rise}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2"
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
            </motion.ul>
          </motion.div>

          {/* The plate mark: the embossed impression a printing plate presses
              into damp paper, which frames the image on every intaglio print.
              Light edge above, shadowed edge below — a bevel catching light. */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative order-last aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-border/70 bg-bg shadow-[inset_0_1px_0_rgba(243,241,236,0.055),inset_0_-1px_0_rgba(0,0,0,0.75)] sm:aspect-[16/9] lg:aspect-square"
          >
            <EngravedPlate className="absolute inset-0" />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#work"
        aria-label={t.scroll}
        animate={shouldReduce ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-ink-muted transition-colors hover:text-accent"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
