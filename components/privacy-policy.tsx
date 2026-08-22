import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/ui/reveal";
import type { Dict, Locale } from "@/lib/i18n";

export const PRIVACY_PATH = "/privacy";

export function PrivacyPolicy({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const t = dict.privacy;

  return (
    <>
      <Nav dict={dict} locale={locale} path={PRIVACY_PATH} showSectionNav={false} />

      <main>
        <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="container-px mx-auto max-w-content">
            <div className="max-w-3xl">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  <span className="h-px w-6 bg-accent" aria-hidden />
                  {t.eyebrow}
                </span>
              </Reveal>

              <Reveal>
                <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink text-balance">
                  {t.title}
                </h1>
              </Reveal>

              <Reveal>
                <p className="mt-4 text-sm text-ink-muted">{t.updated}</p>
              </Reveal>

              <Reveal>
                <p className="mt-8 text-base sm:text-lg text-ink-muted leading-relaxed">
                  {t.intro}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative border-t border-border py-16 sm:py-24">
          <div className="container-px mx-auto max-w-content">
            <div className="max-w-3xl divide-y divide-border border-t border-border">
              {t.sections.map((entry) => (
                <Reveal key={entry.heading}>
                  <div className="py-10">
                    <h2 className="font-display text-xl sm:text-2xl text-ink">
                      {entry.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-ink-muted leading-relaxed">
                      {entry.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} locale={locale} />
    </>
  );
}
