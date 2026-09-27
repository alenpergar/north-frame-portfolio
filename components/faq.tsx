"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DUR, EASE_OUT } from "@/lib/motion";
import type { Dict } from "@/lib/i18n";

/**
 * Questions and answers as a plain hairline list, in the Pricing and
 * Capabilities shell. Each question is a real <button> (Enter and Space come
 * with it) that controls its answer region; one answer is open at a time.
 * The answer eases open with the site's curve and snaps for reduced motion.
 * Closed answers are `hidden` once they have finished closing, so they are
 * neither read out nor focusable.
 */
export function Faq({ dict }: { dict: Dict }) {
  const t = dict.faq;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative border-t border-border py-28 md:py-40">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <RevealGroup className="mt-14 max-w-3xl border-b border-border md:mt-20" stagger={0.06}>
          {t.items.map((item, i) => (
            <RevealItem key={item.question}>
              <FaqItem
                index={i}
                question={item.question}
                answer={item.answer}
                open={open === i}
                onToggle={() => setOpen((current) => (current === i ? null : i))}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function FaqItem({
  index,
  question,
  answer,
  open,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const shouldReduce = useReducedMotion();
  // Stays true until the closing animation has finished, then the region is
  // taken out of the page with `hidden`.
  const [settledClosed, setSettledClosed] = useState(true);
  const buttonId = `faq-question-${index}`;
  const panelId = `faq-answer-${index}`;

  return (
    <div className="border-t border-border">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            if (!open) setSettledClosed(false);
            onToggle();
          }}
          className="group flex min-h-[44px] w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium tracking-[-0.02em] text-ink transition-colors duration-[240ms] hover:text-ink-muted md:text-xl"
        >
          <span>{question}</span>
          <Plus
            size={18}
            aria-hidden
            className={`shrink-0 text-ink-muted transition-transform duration-300 ease-cinematic ${open ? "rotate-45" : ""}`}
          />
        </button>
      </h3>
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open && settledClosed}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: shouldReduce ? 0 : DUR.reveal * 0.6, ease: EASE_OUT }}
        onAnimationComplete={() => {
          if (!open) setSettledClosed(true);
        }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pb-6 text-ink-muted leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}
