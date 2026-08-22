"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

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

type ClientProject = {
  category: string;
  title: string;
  description: string;
  meta: string;
  subLabel: string;
  angle: string;
  image?: string;
  href: string;
};

// Real, delivered client work. Rendered above the concept grid and separated
// from it so a paying client never reads as a self-initiated concept.
const CLIENT_PROJECT: ClientProject = {
  category: "Client Project · Live",
  title: "Hiše Žilavec",
  description:
    "A roofing, tinsmithing, and prefab-home builder trading since 2008. The site carries two distinct service lines and four house models through to a single, clear inquiry path — for customers across Slovenia and Austria.",
  meta: "Krovske in kleparske storitve, Robert Žilavec s.p. — Gornja Radgona, Slovenia",
  subLabel: "Hiše Žilavec",
  angle: "180deg",
  image: "/images/work/zilavec-hero.jpg",
  href: ZILAVEC_CASE_STUDY,
};

type Project = {
  index: string;
  category: string;
  title: string;
  description: string;
  angle: string;
  image?: string;
  href?: string | null;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    category: "Web Design",
    title: "LUMIÈRE Dental Clinic",
    description:
      "A premium private dental clinic website focused on trust, patient experience, and modern healthcare design. Crafted to convert visitors into booked appointments.",
    angle: "135deg",
    image: "/images/work/lumiere-hero.jpg",
    href: LUMIERE_LIVE_URL,
  },
  {
    index: "02",
    category: "Web Design",
    title: "AURELIA Restaurant",
    description:
      "A premium restaurant website designed to showcase the dining experience, atmosphere, and brand identity. Crafted to attract guests, build trust, and drive table reservations through an elegant digital presence.",
    angle: "225deg",
    image: "/images/work/aurelia-hero.jpg",
    href: AURELIA_LIVE_URL,
  },
  {
    index: "03",
    category: "Web Design",
    title: "NOVA Performance",
    description:
      "Personalized coaching, science-based programming, and relentless accountability — built for those who refuse to settle for average.",
    angle: "45deg",
    image: "/images/work/nova-hero.jpg",
    href: NOVA_LIVE_URL,
  },
  {
    index: "04",
    category: "Web Design",
    title: "VIVELLE Beauty",
    description:
      "A luxury beauty salon website built on editorial calm, cinematic video, and considered detail. Crafted to make every visit feel like an experience before a client even walks through the door.",
    angle: "315deg",
    image: "/images/work/vivelle-hero.jpg",
    href: VIVELLE_LIVE_URL,
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-content">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                Live client work,{" "}
                <span className="font-display italic text-accent">
                  crafted to convert.
                </span>
              </>
            }
            description="A delivered client website, alongside self-initiated concepts created to showcase our approach to web design."
          />
        </div>

        {/* Tier 1 — real, delivered client work. */}
        <Reveal className="mt-16">
          {/* An in-app route, so next/link and no target="_blank" — a new tab
              would break the back button out of the case study. */}
          <Link
            href={CLIENT_PROJECT.href}
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
                {CLIENT_PROJECT.category}
              </span>

              <h3 className="font-display text-2xl sm:text-3xl text-ink">
                {CLIENT_PROJECT.title}
              </h3>

              <p className="max-w-lg text-sm sm:text-base text-ink-muted leading-relaxed">
                {CLIENT_PROJECT.description}
              </p>

              <p className="max-w-lg border-t border-border pt-4 text-sm text-ink-muted leading-relaxed">
                Designed and built for a working business — {CLIENT_PROJECT.meta}.
              </p>

              <span className="mt-2 inline-flex items-center gap-3 text-ink transition-colors duration-300 group-hover:text-accent">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    View case study
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
              Concept Directions
            </span>
            <h3 className="mt-4 max-w-2xl font-display text-2xl sm:text-3xl leading-tight text-ink text-balance">
              Self-initiated work, built to the same standard.
            </h3>
          </Reveal>

          <RevealGroup
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
            stagger={0.1}
          >
            {PROJECTS.map((project) => {
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
                      {project.index}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 p-6 sm:p-8">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                        {project.category}
                      </span>
                      <h3 className="mt-2 font-display text-xl sm:text-2xl text-ink">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-ink-muted leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </>
              );

              return (
                <RevealItem key={project.index}>
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
