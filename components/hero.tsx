"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/motion";

const TAGS = ["Web Design", "Landing Pages", "AI Creative"];

export function Hero() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="top"
      className="grain relative flex min-h-dvh items-center overflow-hidden bg-bg pt-28 pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]"
      />

      <div className="container-px relative z-10 mx-auto w-full max-w-content">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(shouldReduce ? 0 : 0.12, 0.1)}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            <span className="h-px w-6 bg-accent" aria-hidden />
            North Frame — Digital Design Studio
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="mt-6 max-w-4xl font-sans text-[13vw] sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight text-ink text-balance"
          >
            We design brands that{" "}
            <span className="font-display italic font-normal text-accent">
              move
            </span>
            .
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed"
          >
            North Frame crafts high-end websites, landing pages, and
            AI-powered creative experiences for brands that refuse to look
            ordinary — built with cinematic precision, from first frame to
            final pixel.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button as="a" href="#contact" variant="primary">
              Start a Project
            </Button>
            <Button as="a" href="#work" variant="ghost">
              View Our Work
            </Button>
          </motion.div>

          <motion.ul
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delay: 0.2, staggerChildren: 0.08 },
              },
            }}
            className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {TAGS.map((tag, i) => (
              <motion.li
                key={tag}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="flex items-center gap-6 text-sm text-ink-muted"
              >
                <span>{tag}</span>
                {i < TAGS.length - 1 ? (
                  <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
                ) : null}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        animate={shouldReduce ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-ink-muted transition-colors hover:text-accent"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
