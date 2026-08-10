import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const BELIEFS = [
  "Fewer clients, more attention per project.",
  "Every brand gets an original direction — never a template.",
  "AI is a tool in the process, never a replacement for taste.",
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-24 sm:py-32">
      <div className="container-px mx-auto max-w-content">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About"
              title={
                <>
                  A studio built for{" "}
                  <span className="font-display italic text-accent">
                    craft.
                  </span>
                </>
              }
            />

            <Reveal delay={0.1} className="mt-8 space-y-5 max-w-xl text-ink-muted leading-relaxed">
              <p>
                North Frame exists because most &ldquo;creative&rdquo; work
                online looks the same — the same templates, the same stock
                gradients, the same forgettable hero section. We started this
                studio to do the opposite: treat every website like a film
                that needs its own tone, pacing, and voice.
              </p>
              <p>
                That means fewer clients, more attention per project, and a
                refusal to ship anything that reads as generic. Where it
                makes sense, we bring AI into the process — not to cut
                corners, but to explore more directions, faster, before
                committing to the one that&apos;s right.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 space-y-4 border-t border-border pt-8">
              {BELIEFS.map((belief) => (
                <div key={belief} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  <p className="text-ink">{belief}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="grain relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-bg">
              <Image
                src="/images/about-logo.png"
                alt="North Frame"
                fill
                className="object-contain p-12"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
