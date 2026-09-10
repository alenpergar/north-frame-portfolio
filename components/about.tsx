import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/motion-primitives";
import type { Dict } from "@/lib/i18n";

export function About({ dict }: { dict: Dict }) {
  const t = dict.about;
  const f = dict.founder;
  return (
    <section id="about" className="relative border-t border-border py-24 sm:py-32">
      <div className="container-px mx-auto max-w-content">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
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
            />

            <Reveal delay={0.1} className="mt-8 space-y-5 max-w-xl text-ink-muted leading-relaxed">
              {t.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-10 space-y-4 border-t border-border pt-8">
              {t.beliefs.map((belief) => (
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
                src="/drypoint-logo-dark.png"
                alt="DRYPOINT"
                fill
                className="object-contain p-12"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </Reveal>
        </div>

        {/* Behind DRYPOINT — the quieter coda that names the person the studio
            "we" stands for. Deliberately lighter than the block above: a small
            eyebrow instead of a section heading, muted body, photo on the left.
            Same container, grid, frame, dividers and reveal pattern as the
            rest of the page — no new colours, fonts or components. */}
        <div className="mt-20 border-t border-border pt-16 sm:mt-24 sm:pt-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <Reveal delay={0.1} className="lg:col-span-5">
              {/* PLACEHOLDER IMAGE. Overwrite public/images/alen.jpg with the
                  real portrait (portrait crop, ~4:5) and it appears here with
                  no code change. No stock or generated stand-in is used. */}
              <div className="grain relative aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-2xl border border-border bg-bg sm:max-w-[300px] lg:max-w-none">
                <Parallax className="absolute -inset-[8%]" amount={22} scale={1.06}>
                  <Image
                    src="/images/alen.jpg"
                    alt={f.photoAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 300px, 220px"
                  />
                </Parallax>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  <span className="h-px w-6 bg-accent" aria-hidden />
                  {f.eyebrow}
                </span>
                <p className="mt-5 max-w-xl text-lg/[1.35] sm:text-xl/[1.35] text-ink text-balance">
                  {f.lead}
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-6 space-y-4 max-w-xl text-ink-muted leading-relaxed">
                {f.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </Reveal>

              <Reveal delay={0.15}>
                <p className="mt-8 border-t border-border pt-5 text-sm text-ink-muted">
                  {f.location}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
