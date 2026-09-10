"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/motion-primitives";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import type { Dict } from "@/lib/i18n";

export function Process({ dict }: { dict: Dict }) {
  const t = dict.process;
  const ready = useMotionReady();

  // The accent line fills in lockstep with reading position: bound to how far
  // the step list has travelled through the middle of the viewport, not a
  // fixed-duration autoplay. It holds full height by default so it is present
  // in the HTML, on a failed hydration and for reduced motion with no wait.
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 75%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  return (
    <section id="process" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="absolute inset-0">
        <Parallax className="absolute inset-0" amount={40} scale={1.12}>
          <Image
            src="/images/fitness.png"
            alt=""
            fill
            className="object-cover opacity-[0.08] grayscale"
            sizes="100vw"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg" />
      </div>

      <div className="container-px relative z-10 mx-auto max-w-content">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={
            <>
              {t.title.lead}{" "}
              <span className="font-display italic text-accent">
                {t.title.accent}
              </span>
            </>
          }
          description={t.description}
        />

        <div ref={trackRef} className="relative mt-16">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]"
            aria-hidden
          >
            {ready ? (
              <motion.div
                className="h-full w-full origin-top bg-accent"
                style={{ scaleY: lineScale, willChange: "transform" }}
              />
            ) : (
              <div className="h-full w-full bg-accent" />
            )}
          </div>

          <RevealGroup className="space-y-12" stagger={0.12}>
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
  // Each marker warms as it crosses the viewport middle — a faint accent fill
  // rises behind the number without touching its dark base.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "start 45%"],
  });
  const tint = useTransform(scrollYProgress, [0, 1], [0, 0.16]);

  return (
    <div ref={ref} className="relative flex gap-6 pl-11 sm:gap-8 sm:pl-14">
      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-accent bg-bg font-display text-sm italic text-accent sm:h-10 sm:w-10">
        {ready ? (
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-accent"
            style={{ opacity: tint }}
          />
        ) : null}
        <span className="relative">{index}</span>
      </span>
      <div className="pt-0.5">
        <h3 className="font-display text-xl sm:text-2xl text-ink">{step.title}</h3>
        <p className="mt-2 max-w-xl text-ink-muted leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
