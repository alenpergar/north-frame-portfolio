"use client";

import { Browser, RocketLaunch, Sparkle } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Dict } from "@/lib/i18n";

// Icons and the numbering stay in code; only the words come from the dictionary.
const ICONS = [Browser, RocketLaunch, Sparkle];

export function Services({ dict }: { dict: Dict }) {
  const t = dict.services;
  return (
    <section id="services" className="relative border-t border-border py-24 sm:py-32">
      <div className="container-px mx-auto max-w-content">
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

        <RevealGroup className="mt-16 divide-y divide-border border-t border-border" stagger={0.08}>
          {t.items.map((service, i) => {
            const Icon = ICONS[i] ?? Browser;
            const index = String(i + 1).padStart(2, "0");
            return (
              <RevealItem key={service.title}>
                <div className="group flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:gap-10">
                  <span className="font-display text-4xl italic text-accent/70 sm:w-20 shrink-0">
                    {index}
                  </span>

                  <div className="flex items-center gap-3 sm:w-56 shrink-0">
                    <Icon size={22} className="text-accent" />
                    <h3 className="font-display text-2xl sm:text-3xl text-ink">
                      {service.title}
                    </h3>
                  </div>

                  <p className="max-w-xl text-ink-muted leading-relaxed sm:pl-6 sm:border-l sm:border-border">
                    {service.description}
                  </p>

                  <span
                    aria-hidden
                    className="hidden sm:block ml-auto h-px w-10 shrink-0 bg-border transition-all duration-300 group-hover:w-16 group-hover:bg-accent"
                  />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
