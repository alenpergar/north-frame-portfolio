import clsx from "clsx";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Dict } from "@/lib/i18n";

/**
 * What you can commission, in four lines. Type only: no icons, no cards. The
 * last item (web) is set a step quieter because it is the second discipline.
 */
export function Capabilities({ dict }: { dict: Dict }) {
  const t = dict.capabilities;
  const last = t.items.length - 1;

  return (
    <section id="services" className="relative border-t border-border py-28 md:py-40">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading title={t.title} />

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 md:mt-20 md:grid-cols-2"
          stagger={0.06}
        >
          {t.items.map((item, i) => (
            <RevealItem key={item.title}>
              <div className="border-t border-border pt-6">
                <h3
                  className={clsx(
                    "text-xl font-medium tracking-[-0.02em] md:text-2xl",
                    i === last ? "text-ink-muted" : "text-ink"
                  )}
                >
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-ink-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
