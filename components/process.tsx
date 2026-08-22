"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Dict } from "@/lib/i18n";

export function Process({ dict }: { dict: Dict }) {
  const shouldReduce = useReducedMotion();
  const t = dict.process;

  return (
    <section id="process" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image
          src="/images/fitness.png"
          alt=""
          fill
          className="object-cover opacity-[0.08] grayscale"
          sizes="100vw"
        />
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

        <div className="relative mt-16">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]" aria-hidden>
            <motion.div
              className="w-full bg-accent origin-top"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: shouldReduce ? 0.3 : 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <RevealGroup className="space-y-12" stagger={0.12}>
            {t.steps.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="relative flex gap-6 pl-11 sm:gap-8 sm:pl-14">
                  <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-accent bg-bg font-display text-sm italic text-accent sm:h-10 sm:w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="font-display text-xl sm:text-2xl text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-ink-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
