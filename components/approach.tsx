import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/motion-primitives";
import type { Dict } from "@/lib/i18n";

export function Approach({ dict }: { dict: Dict }) {
  const t = dict.approach;
  return (
    <section id="approach" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="absolute inset-0">
        <Parallax className="absolute inset-0" amount={44} scale={1.12}>
          <Image
            src="/images/office.png"
            alt=""
            fill
            className="object-cover opacity-[0.10] grayscale"
            sizes="100vw"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg" />
      </div>

      <div className="container-px relative z-10 mx-auto max-w-content">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={
            <>
              {t.title.lead}{" "}
              <span className="font-display italic text-accent">
                {t.title.accent}
              </span>
              {t.title.tail}
            </>
          }
        />

        <Reveal
          variant="mask"
          className="mt-14 max-w-3xl border-l-2 border-accent pb-[0.14em] pl-6 sm:pl-8"
        >
          <p className="font-display text-2xl/[1.375] sm:text-3xl/[1.375] lg:text-4xl/[1.375] italic text-ink text-balance">
            {t.quote}
          </p>
        </Reveal>

        <RevealGroup
          className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2"
          stagger={0.12}
        >
          {t.pillars.map((pillar, i) => (
            <RevealItem key={pillar.title}>
              <div className="flex gap-5">
                <span className="font-display text-3xl italic text-accent/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 max-w-md text-ink-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
