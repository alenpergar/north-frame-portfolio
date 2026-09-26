import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";
import type { Dict } from "@/lib/i18n";

const EMAIL = "hello@drypointcreative.com";

/**
 * About and contact, closed together. Two sentences on who the studio is sit
 * directly above the ask; the form carries the rest. `#about` stays as an
 * anchor on the paragraph so older links still land here.
 */
export function Closing({ dict }: { dict: Dict }) {
  const t = dict.closing;

  return (
    <section id="contact" className="relative border-t border-border py-28 md:py-44">
      <div className="container-px mx-auto max-w-content">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <p id="about" className="max-w-sm text-ink-muted leading-relaxed">
                {t.about}
              </p>
            </Reveal>

            <Reveal variant="mask" className="mt-10 pb-[0.14em] -mb-[0.14em]">
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink text-balance">
                {t.title}
              </h2>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <a
                href={`mailto:${EMAIL}`}
                className="group relative inline-flex items-center gap-2 text-lg text-ink transition-colors duration-[240ms] hover:text-ink-muted before:absolute before:inset-x-0 before:top-1/2 before:h-11 before:-translate-y-1/2 before:content-['']"
              >
                <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-ink after:transition-transform after:duration-[280ms] after:ease-cinematic group-hover:after:origin-left group-hover:after:scale-x-100">
                  {EMAIL}
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 ease-cinematic group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <ContactForm dict={dict} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
