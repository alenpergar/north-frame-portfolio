"use client";

import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

// Set these once the respective sites are deployed — each card becomes
// clickable (opens in a new tab) as soon as its URL is non-null.
const LUMIERE_LIVE_URL: string | null = null;
const AURELIA_LIVE_URL: string | null = null;
const NOVA_LIVE_URL: string | null = null;
const VIVELLE_LIVE_URL: string | null = null;

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
                Concept directions,{" "}
                <span className="font-display italic text-accent">
                  crafted to convert.
                </span>
              </>
            }
            description="A look at the kind of work North Frame produces — representative concepts across web, landing, and AI creative, with real client case studies added as they ship."
          />
        </div>

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2"
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
    </section>
  );
}
