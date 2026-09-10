"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ConceptCard, useCardPointer } from "@/components/ui/work-card";
import { useFinePointer } from "@/components/ui/motion-primitives";
import { localePath, type Dict, type Locale } from "@/lib/i18n";

// Set these once the respective sites are deployed — each card becomes
// clickable (opens in a new tab) as soon as its URL is non-null.
const LUMIERE_LIVE_URL: string | null = "/lumiere-dental";
const AURELIA_LIVE_URL: string | null = "/aurelia";
const NOVA_LIVE_URL: string | null = "/nova-performance";
const VIVELLE_LIVE_URL: string | null = "/vivelle-beauty";

// The card opens the case study rather than the client's site; the live site
// is linked from there. This is an in-app route, unlike the concept demos
// below, which are static exports served out of public/ via the rewrites in
// next.config.ts.
const ZILAVEC_CASE_STUDY = "/work/hise-zilavec";

// Everything that is not language-dependent lives here: brand names, imagery,
// gradient angles and hrefs. The prose comes from the dictionary, keyed by
// `key`, so a translation can never drift away from the wrong project.
const CLIENT_PROJECT = {
  title: "Hiše Žilavec",
  subLabel: "Hiše Žilavec",
  angle: "180deg",
  image: "/images/work/zilavec-hero.jpg",
  href: ZILAVEC_CASE_STUDY,
};

type ConceptKey = "lumiere" | "aurelia" | "nova" | "vivelle";

const CONCEPTS: {
  key: ConceptKey;
  title: string;
  angle: string;
  image?: string;
  href?: string | null;
}[] = [
  {
    key: "lumiere",
    title: "LUMIÈRE Dental Clinic",
    angle: "135deg",
    image: "/images/work/lumiere-hero.jpg",
    href: LUMIERE_LIVE_URL,
  },
  {
    key: "aurelia",
    title: "AURELIA Restaurant",
    angle: "225deg",
    image: "/images/work/aurelia-hero.jpg",
    href: AURELIA_LIVE_URL,
  },
  {
    key: "nova",
    title: "NOVA Performance",
    angle: "45deg",
    image: "/images/work/nova-hero.jpg",
    href: NOVA_LIVE_URL,
  },
  {
    key: "vivelle",
    title: "VIVELLE Beauty",
    angle: "315deg",
    image: "/images/work/vivelle-hero.jpg",
    href: VIVELLE_LIVE_URL,
  },
];

function ClientCard({ dict, locale }: { dict: Dict; locale: Locale }) {
  const t = dict.work;
  const fine = useFinePointer();
  const { imgX, imgY, arrowX, arrowY, onMove, onLeave } = useCardPointer();

  return (
    <Link
      href={localePath(locale, CLIENT_PROJECT.href)}
      onPointerMove={fine ? onMove : undefined}
      onPointerLeave={fine ? onLeave : undefined}
      className="group relative grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,background-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent/60 hover:bg-surface-2 lg:grid-cols-2"
    >
      <div
        className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[380px]"
        style={{
          background: `radial-gradient(120% 100% at 10% 0%, rgba(200,155,108,0.16), transparent 60%), linear-gradient(${CLIENT_PROJECT.angle}, #17160f, #0A0A09 60%)`,
        }}
      >
        <motion.div
          className="absolute -inset-[6%]"
          style={fine ? { x: imgX, y: imgY } : undefined}
        >
          <Image
            src={CLIENT_PROJECT.image}
            alt={CLIENT_PROJECT.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="scale-105 object-cover opacity-75 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:opacity-90"
          />
        </motion.div>
        <div className="grain absolute inset-0" />
      </div>

      <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          {t.client.category}
        </span>

        <h3 className="font-display text-2xl sm:text-3xl text-ink">
          {CLIENT_PROJECT.title}
        </h3>

        <p className="max-w-lg text-sm sm:text-base text-ink-muted leading-relaxed">
          {t.client.description}
        </p>

        <p className="max-w-lg border-t border-border pt-4 text-sm text-ink-muted leading-relaxed">
          {t.client.metaPrefix} — {t.client.meta}.
        </p>

        <span className="mt-2 inline-flex items-center gap-3 text-ink transition-colors duration-300 group-hover:text-accent">
          <motion.span
            aria-hidden
            style={fine ? { x: arrowX, y: arrowY } : undefined}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-accent"
          >
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.span>
          <span className="min-w-0">
            <span className="block text-sm font-medium">{t.client.action}</span>
            <span className="block truncate text-xs text-ink-muted">
              {CLIENT_PROJECT.subLabel}
            </span>
          </span>
        </span>
      </div>
    </Link>
  );
}

export function SelectedWork({ dict, locale }: { dict: Dict; locale: Locale }) {
  const t = dict.work;

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-content">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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
        </div>

        {/* Tier 1 — real, delivered client work. */}
        <Reveal className="mt-16">
          <ClientCard dict={dict} locale={locale} />
        </Reveal>

        {/* Tier 2 — self-initiated concepts. */}
        <div className="mt-20 border-t border-border pt-16 sm:mt-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden />
              {t.conceptsEyebrow}
            </span>
            <h3 className="mt-4 max-w-2xl font-display text-2xl/[1.25] sm:text-3xl/[1.25] text-ink text-balance">
              {t.conceptsTitle}
            </h3>
          </Reveal>

          <RevealGroup
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
            stagger={0.1}
          >
            {CONCEPTS.map((project, i) => (
              <RevealItem key={project.key}>
                <ConceptCard
                  index={String(i + 1).padStart(2, "0")}
                  category={t.conceptCategory}
                  title={project.title}
                  description={t.concepts[project.key]}
                  angle={project.angle}
                  image={project.image}
                  href={project.href}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
