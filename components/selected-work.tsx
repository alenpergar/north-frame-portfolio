"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
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
          {/* An in-app route, so next/link and no target="_blank" — a new tab
              would break the back button out of the case study. */}
          <Link
            href={localePath(locale, CLIENT_PROJECT.href)}
            className="group relative grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent/60 hover:bg-surface-2 lg:grid-cols-2"
          >
            <div
              className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[380px]"
              style={{
                background: `radial-gradient(120% 100% at 10% 0%, rgba(200,155,108,0.16), transparent 60%), linear-gradient(${CLIENT_PROJECT.angle}, #17160f, #0A0A09 60%)`,
              }}
            >
              {CLIENT_PROJECT.image ? (
                <Image
                  src={CLIENT_PROJECT.image}
                  alt={CLIENT_PROJECT.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-90"
                />
              ) : null}
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
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    {t.client.action}
                  </span>
                  <span className="block truncate text-xs text-ink-muted">
                    {CLIENT_PROJECT.subLabel}
                  </span>
                </span>
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Tier 2 — self-initiated concepts. */}
        <div className="mt-20 border-t border-border pt-16 sm:mt-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden />
              {t.conceptsEyebrow}
            </span>
            <h3 className="mt-4 max-w-2xl font-display text-2xl sm:text-3xl leading-tight text-ink text-balance">
              {t.conceptsTitle}
            </h3>
          </Reveal>

          <RevealGroup
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
            stagger={0.1}
          >
            {CONCEPTS.map((project, i) => {
              const index = String(i + 1).padStart(2, "0");
              const cardClasses =
                "group relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent/60 hover:bg-surface-2";

              const cardContent = (
                <>
                  <div
                    className="relative aspect-[4/5] sm:aspect-[16/11] overflow-hidden"
                    style={{
                      background: `radial-gradient(120% 100% at 10% 0%, rgba(200,155,108,0.16), transparent 60%), linear-gradient(${project.angle}, #17160f, #0A0A09 60%)`,
                    }}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-90"
                      />
                    ) : null}
                    <div className="grain absolute inset-0" />
                    <span className="absolute left-6 top-6 font-display text-6xl italic text-ink/10 transition-colors duration-300 group-hover:text-accent/20">
                      {index}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 p-6 sm:p-8">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                        {t.conceptCategory}
                      </span>
                      <h3 className="mt-2 font-display text-xl sm:text-2xl text-ink">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-ink-muted leading-relaxed">
                        {t.concepts[project.key]}
                      </p>
                    </div>

                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </>
              );

              return (
                <RevealItem key={project.key}>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cardClasses}
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <article className={cardClasses}>{cardContent}</article>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
