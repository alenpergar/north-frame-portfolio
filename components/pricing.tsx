import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Dict } from "@/lib/i18n";

/**
 * Starting prices, set as type rather than cards: three columns divided by
 * hairlines, the figure carrying the weight. Same shell, heading and reveal
 * pattern as Capabilities. The ask at the end points to the contact section
 * directly below.
 */
export function Pricing({ dict }: { dict: Dict }) {
  const t = dict.pricing;

  return (
    <section id="pricing" className="relative border-t border-border py-28 md:py-40">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-20 md:grid-cols-3"
          stagger={0.06}
        >
          {t.items.map((item) => (
            <RevealItem key={item.name}>
              <div className="border-t border-border pt-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                  {item.name}
                </h3>
                <p className="mt-4 text-3xl font-medium tracking-[-0.03em] text-ink md:text-4xl">
                  {item.price}
                </p>
                <p className="mt-3 max-w-xs text-ink-muted leading-relaxed">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-16 md:mt-20">
          <p className="text-ink-muted">
            {t.ctaLead}{" "}
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-1.5 text-ink transition-colors duration-[240ms] hover:text-ink-muted before:absolute before:inset-x-0 before:top-1/2 before:h-11 before:-translate-y-1/2 before:content-['']"
            >
              {t.ctaLabel}
              <ArrowRight
                size={14}
                aria-hidden
                className="transition-transform duration-300 ease-cinematic group-hover:translate-x-0.5"
              />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
