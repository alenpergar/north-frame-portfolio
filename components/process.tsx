"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import type { Dict } from "@/lib/i18n";

export function Process({ dict }: { dict: Dict }) {
  const t = dict.process;
  const ready = useMotionReady();

  // The line fills in lockstep with reading position: bound to how far the
  // step list has travelled through the middle of the viewport, not a
  // fixed-duration autoplay. It holds full height by default so it is present
  // in the HTML, on a failed hydration and for reduced motion with no wait.
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 75%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  return (
    <section id="process" className="relative border-t border-border py-28 md:py-40">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading title={t.title} />

        <div ref={trackRef} className="relative mt-14 md:mt-20">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]"
            aria-hidden
          >
            {ready ? (
              <motion.div
                className="h-full w-full origin-top bg-ink/70"
                style={{ scaleY: lineScale, willChange: "transform" }}
              />
            ) : (
              <div className="h-full w-full bg-ink/70" />
            )}
          </div>

          <RevealGroup className="space-y-12" stagger={0.1}>
            {t.steps.map((step, i) => (
              <RevealItem key={step.title}>
                <ProcessStep index={String(i + 1).padStart(2, "0")} step={step} ready={ready} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  index,
  step,
  ready,
}: {
  index: string;
  step: { title: string; description: string };
  ready: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Each marker warms as it crosses the viewport middle: a faint fill rises
  // behind the number without touching its dark base.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "start 45%"],
  });
  const tint = useTransform(scrollYProgress, [0, 1], [0, 0.14]);

  return (
    <div ref={ref} className="relative flex gap-6 pl-11 sm:gap-8 sm:pl-14">
      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-ink/40 bg-bg font-mono text-[11px] text-ink sm:h-10 sm:w-10">
        {ready ? (
          <motion.span aria-hidden className="absolute inset-0 bg-ink" style={{ opacity: tint }} />
        ) : null}
        <span className="relative">{index}</span>
      </span>
      <div className="pt-0.5 sm:pt-1.5">
        <h3 className="text-xl font-medium tracking-[-0.02em] text-ink sm:text-2xl">
          {step.title}
        </h3>
        <p className="mt-2 max-w-xl text-ink-muted leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}
