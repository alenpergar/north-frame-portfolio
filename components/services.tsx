"use client";

import { Browser, RocketLaunch, Sparkle } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const SERVICES = [
  {
    index: "01",
    icon: Browser,
    title: "Web Design",
    description:
      "Full-scale marketing and brand websites engineered for clarity, speed, and a premium first impression — designed to hold up under real client traffic, not just a portfolio screenshot.",
  },
  {
    index: "02",
    icon: RocketLaunch,
    title: "Landing Pages",
    description:
      "Focused, high-conversion single pages for launches, campaigns, and offers — built around one goal, one story, and a clear path to action.",
  },
  {
    index: "03",
    icon: Sparkle,
    title: "AI Creative",
    description:
      "AI-directed commercials, product films, and campaign visuals — cinematic output produced faster than a traditional shoot, without cutting craft.",
  },
] as const;

export function Services() {
  return (
    <section id="services" className="relative border-t border-border py-24 sm:py-32">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Three disciplines,{" "}
              <span className="font-display italic text-accent">
                one studio.
              </span>
            </>
          }
          description="Everything North Frame builds sits somewhere between these three — strategy-led design work made for brands that need to look, and perform, at the top of their category."
        />

        <RevealGroup className="mt-16 divide-y divide-border border-t border-border" stagger={0.08}>
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem key={service.index}>
                <div className="group flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:gap-10">
                  <span className="font-display text-4xl italic text-accent/70 sm:w-20 shrink-0">
                    {service.index}
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
