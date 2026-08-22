import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Dict } from "@/lib/i18n";

export function About({ dict }: { dict: Dict }) {
  const t = dict.about;
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
      </div>
    </section>
  );
}
