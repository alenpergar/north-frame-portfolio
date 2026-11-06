import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { ContactForm } from "@/components/contact-form";
import { Logo } from "@/components/ui/logo";
import { PlanDrawing } from "@/components/sell/plan-drawing";
import { MobileMenu } from "@/components/sell/mobile-menu";
import { DrawWhenSeen } from "@/components/sell/draw-when-seen";
import { Loader } from "@/components/sell/loader";
import { PlaybackProvider } from "@/components/video/playback-provider";
import { FilmPlayerProvider } from "@/components/video/film-player-provider";
import { getDict, localePath, type Dict, type Locale } from "@/lib/i18n";
import { SECTION, SELL_COPY } from "@/components/sell/copy";
import "@/components/sell/sell.css";

const EMAIL = "hello@drypointcreative.com";
const VIVELLE = "/vivelle-beauty";

const btnAccent =
  "inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--accent)] px-6 text-[15px] font-medium text-[var(--bg)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--accent-hover)] active:translate-y-px";
const btnLine =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border border-[rgba(243,241,236,0.3)] px-6 text-[15px] font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--fg)] active:translate-y-px";
const h2 = "text-[clamp(1.875rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]";
const body = "text-[17px] leading-[1.6] text-[var(--muted)]";

/** The tick before each "what's included" line, in the accent colour. */
function CheckMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="mt-[3px] h-4 w-4 shrink-0 text-[var(--accent)]"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

/** Display type: never break inside a hyphenated word ("in-house"). */
function keepHyphenated(text: string) {
  return text.split(/(\S*-\S*)/).map((part, i) =>
    part.includes("-") ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  );
}

/**
 * The homepage, in both languages: what the studio sells (AI commercials and
 * websites), the proof for each, prices and the inquiry form, on one page.
 * Title and description come from each locale's layout (siteMetadata).
 */
export function SellPage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const COPY = SELL_COPY[locale];
  const HOME = localePath(locale, "/");
  const ZILAVEC = localePath(locale, "/work/hise-zilavec");
  const challenge = (i: number) => dict.caseStudy.challenge[i]!;
  // The hero lists the packages by name; prices are shown once, in pricing.
  const packages = dict.pricing.items;
  // One entry per service line, matching the three packages. Previously this
  // also spread COPY.webServices, which made sense when capabilities led with
  // commercials; now that all three are web, that spread duplicated them.
  const services = dict.capabilities.items.map((i) => ({ title: i.title, body: i.description }));
  const NAV = COPY.nav.map((n) => ({ href: `#${n.id}`, label: n.label }));
  const links = [...NAV, { href: `#${SECTION.contact}`, label: COPY.contactLabel }];
  // Page-local dictionary: the footer links point at this page and its blurb
  // is the studio's own line; the form keeps every project type.
  const pageDict: Dict = {
    ...dict,
    footer: { ...dict.footer, links: links.map((n) => ({ to: `/${n.href}`, label: n.label })) },
  };

  return (
    <PlaybackProvider>
      <FilmPlayerProvider dict={pageDict}>
        <StructuredData />
        <div className="sell">
          <Loader word="DRYPOINT" label={COPY.loading} />
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--bg)]"
          >
            {COPY.skip}
          </a>

          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[var(--bg)]">
            <div className="container-px mx-auto flex h-16 max-w-content items-center justify-between gap-6">
              <Logo height={18} href={HOME} className="py-[13px]" />
              <nav aria-label={COPY.mainNav} className="hidden md:block">
                <ul className="flex items-center gap-7 text-[15px]">
                  {NAV.map((n) => (
                    <li key={n.href}>
                      <a href={n.href} className="py-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex items-center gap-2">
                <a
                  href={COPY.language.href}
                  hrefLang={COPY.language.label.toLowerCase()}
                  lang={COPY.language.label.toLowerCase()}
                  aria-label={COPY.language.name}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {COPY.language.label}
                </a>
                <a href={`#${SECTION.contact}`} className={`${btnAccent} hidden min-h-[40px] px-5 text-sm sm:inline-flex`}>
                  {dict.nav.cta}
                </a>
                <MobileMenu
                  items={links}
                  cta={{ href: `#${SECTION.contact}`, label: dict.nav.cta }}
                  labels={{ open: dict.nav.openMenu, close: dict.nav.closeMenu, nav: COPY.mobileNav }}
                />
              </div>
            </div>
          </header>

          <main id="content">
            {/* Hero: what the studio sells, and the two ways in. The proof for
                each lives in its own section (films, web work). */}
            <section className="container-px mx-auto max-w-content pb-20 pt-16 md:pb-28 md:pt-24">
              <h1 className="text-[clamp(2.6rem,6.2vw,5.75rem)] font-medium leading-[1] tracking-[-0.04em]">
                <span className="block [text-wrap:balance]">{keepHyphenated(dict.hero.title[0] ?? "")}</span>
                <span className="block [text-wrap:balance]">{keepHyphenated(dict.hero.title[1] ?? "")}</span>
              </h1>
              <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-12 lg:items-end lg:gap-10">
                <div className="lg:col-span-5">
                  <p className={`${body} max-w-[40ch]`}>
                    {dict.footer.blurb} {COPY.heroBody}
                  </p>
                  <a href={`#${SECTION.contact}`} className={`${btnAccent} mt-8`}>
                    {dict.nav.cta}
                  </a>
                </div>
                <ul className="border-b border-[var(--rule)] lg:col-span-6 lg:col-start-7">
                  {packages.map((item) => (
                    <li key={item.name}>
                      <a
                        href={`#${SECTION.pricing}`}
                        className="group flex min-h-[64px] items-baseline justify-between gap-6 border-t border-[var(--rule)] py-5"
                      >
                        {/* Names and page counts; prices are shown once, in pricing. */}
                        <span className="text-[20px] font-medium tracking-[-0.015em] transition-colors group-hover:text-[var(--accent)] md:text-[24px]">
                          {item.name}
                        </span>
                        <span className="shrink-0 text-[15px] text-[var(--muted)]">{item.pages}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Web work */}
            <section id={SECTION.web} className="border-t border-[var(--rule)] bg-[var(--bg-2)] py-20 md:py-28">
              <div className="container-px mx-auto max-w-content">
                <h2 className={`${h2} max-w-[22ch]`}>{COPY.workTitle}</h2>

                <Link href={ZILAVEC} className="group mt-14 block overflow-hidden rounded-[6px] border border-[var(--rule)]">
                  <Image
                    src="/images/work/zilavec-hero.jpg"
                    alt={dict.digital.zilavec.alt}
                    width={2048}
                    height={1434}
                    sizes="(min-width: 1360px) 1232px, 100vw"
                    className="aspect-[16/9] h-auto w-full object-cover object-[50%_70%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
                  />
                </Link>

                <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <h3 className="text-[28px] font-medium tracking-[-0.025em]">{dict.digital.zilavec.title}</h3>
                    <p className={`${body} mt-4 max-w-[46ch]`}>{COPY.zilavecBody}</p>
                    <p className="mt-4 text-sm text-[var(--muted)]">{COPY.zilavecMeta}</p>
                    <Link href={ZILAVEC} className={`${btnLine} mt-8`}>
                      {dict.digital.zilavec.action}
                    </Link>
                    <figure className="mt-14 max-w-[420px]">
                      <DrawWhenSeen>
                        <PlanDrawing
                          title={COPY.drawingTitle}
                          annotation={challenge(3).title}
                        />
                      </DrawWhenSeen>
                      <figcaption className="mt-4 text-[15px] text-[var(--muted)]">
                        {dict.caseStudy.structureTitle.lead} {dict.caseStudy.structureTitle.accent}
                      </figcaption>
                    </figure>
                  </div>
                  <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)] md:col-span-7">
                    {[
                      { c: challenge(0), src: "/images/work/zilavec-services.jpg" },
                      { c: challenge(1), src: "/images/work/zilavec-models.jpg" },
                      { c: challenge(3), src: "/images/work/zilavec-contact.jpg" },
                    ].map(({ c, src }) => (
                      <li key={c.title} className="grid grid-cols-[96px_1fr] gap-5 py-6 sm:grid-cols-[148px_1fr] sm:gap-7">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] border border-[var(--rule)]">
                          <Image src={src} alt={c.alt ?? ""} fill sizes="148px" className="object-cover" />
                        </div>
                        <div className="border-l-2 border-[var(--accent)] pl-5">
                          <h4 className="text-[17px] font-medium">{c.title}</h4>
                          <p className="mt-2 text-[15px] leading-[1.6] text-[var(--muted)]">{c.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Concept */}
                <div className="mt-24 grid grid-cols-1 items-center gap-10 border-t border-[var(--rule)] pt-16 md:grid-cols-12">
                  <a
                    href={VIVELLE}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-[6px] md:col-span-5"
                  >
                    <Image
                      src="/images/work/vivelle-hero.jpg"
                      alt={dict.digital.vivelle.alt}
                      width={1600}
                      height={1600}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
                    />
                  </a>
                  <div className="md:col-span-6 md:col-start-7">
                    <p className="text-[15px] text-[var(--muted)]">{COPY.conceptsTitle}</p>
                    <h3 className="mt-3 text-[28px] font-medium tracking-[-0.025em]">{dict.digital.vivelle.title}</h3>
                    <p className={`${body} mt-3 max-w-[40ch]`}>{dict.digital.vivelle.description}</p>
                    <a href={VIVELLE} target="_blank" rel="noreferrer" className={`${btnLine} mt-8`}>
                      {dict.digital.vivelle.action}
                      <span className="sr-only"> ({COPY.newTab})</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Services */}
            <section id={SECTION.services} className="border-t border-[var(--rule)] bg-[var(--bg-2)] py-20 md:py-28">
              <div className="container-px mx-auto grid max-w-content grid-cols-1 gap-12 md:grid-cols-12">
                <h2 className={`${h2} md:col-span-4 lg:col-span-3`}>{COPY.servicesTitle}</h2>
                <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:col-span-8 lg:col-span-9 lg:grid-cols-3 lg:gap-x-8">
                  {services.map((s) => (
                    <div key={s.title} className="border-t-2 border-[var(--fg)] pt-6">
                      <h3 className="text-[22px] font-medium tracking-[-0.02em]">{s.title}</h3>
                      <p className={`${body} mt-3`}>{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Process: a real sequence, set out like a dimension line. */}
            <section id={SECTION.process} className="border-t border-[var(--rule)] py-20 md:py-28">
              <div className="container-px mx-auto max-w-content">
                <div className="max-w-2xl">
                  <h2 className={h2}>{COPY.processTitle}</h2>
                  <p className={`${body} mt-5`}>{COPY.processBody}</p>
                </div>
                <ol className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-6">
                  <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-[var(--rule)] md:block" />
                  {COPY.process.map((step, i) => (
                    <li key={step.title} className="relative pl-10 md:pl-0 md:pt-10">
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 h-[15px] w-[15px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]"
                      />
                      <p className="text-sm text-[var(--muted)]">{i + 1}</p>
                      <h3 className="mt-1 text-[19px] font-medium tracking-[-0.015em]">{step.title}</h3>
                      <p className="mt-2 max-w-[30ch] text-[15px] leading-[1.6] text-[var(--muted)]">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Pricing: a drawing's title block. */}
            <section id={SECTION.pricing} className="border-t border-[var(--rule)] bg-[var(--bg-2)] py-20 md:py-28">
              <div className="container-px mx-auto grid max-w-content grid-cols-1 gap-12 md:grid-cols-12">
                <div className="md:col-span-5">
                  <h2 className={h2}>{dict.pricing.title}</h2>
                  <p className={`${body} mt-5 max-w-[42ch]`}>{dict.pricing.description}</p>
                </div>
                <div className="md:col-span-7">
                  <dl className="border border-[var(--muted)]">
                    {dict.pricing.items.map((item, i) => (
                      <div
                        key={item.name}
                        className={`grid grid-cols-1 gap-2 p-6 sm:grid-cols-[1fr_auto] sm:gap-x-8 sm:p-8 ${i ? "border-t border-[var(--rule)]" : ""}`}
                      >
                        <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[20px] font-medium tracking-[-0.015em]">
                          {item.name}
                          {/* The tier most businesses choose, marked without
                              breaking the stacked list into cards. */}
                          {item.badge && (
                            <span className="rounded-full border border-[var(--accent)] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--accent)]">
                              {item.badge}
                            </span>
                          )}
                        </dt>
                        <dd className="text-[28px] font-medium tracking-[-0.025em] text-[var(--accent)] sm:row-span-2 sm:text-right">
                          {item.price}
                          {/* Page count sits with the price: the clearest
                              difference between the tiers. */}
                          <span className="mt-1 block text-[15px] font-normal tracking-normal text-[var(--muted)]">
                            {item.pages}
                          </span>
                        </dd>
                        <dd className="text-[15px] leading-[1.6] text-[var(--muted)]">{item.description}</dd>
                        <dd className="mt-4 border-t border-[var(--rule)] pt-6 sm:col-span-2">
                          <h3 className="text-[17px] font-medium tracking-[-0.01em]">
                            {item.inherits ?? COPY.webIncluded.title}
                          </h3>
                          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 xl:grid-cols-2">
                            {item.features.map((line) => (
                              <li key={line} className="flex gap-3 text-[15px] leading-[1.5] text-[var(--fg)]">
                                <CheckMark />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                          {/* Payment terms belong to the entry tier only. */}
                          {i === 0 && (
                            <p className="mt-6 text-[15px] text-[var(--muted)]">{COPY.webIncluded.payment}</p>
                          )}
                          <a href={`#${SECTION.contact}`} className={`${btnAccent} mt-6`}>
                            {COPY.webIncluded.cta}
                          </a>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Charged per additional language, not per page. */}
                  <div className="mt-8 border border-[var(--rule)] p-6 sm:p-8">
                    <h3 className="text-[17px] font-medium tracking-[-0.01em]">
                      {dict.pricing.languageAddon.title}
                    </h3>
                    <p className={`${body} mt-3 max-w-[52ch]`}>
                      {dict.pricing.languageAddon.description}
                    </p>
                    <p className="mt-4 inline-flex rounded-full border border-[var(--accent)] px-4 py-1.5 text-[15px] font-medium text-[var(--accent)]">
                      {dict.pricing.languageAddon.priceNote}
                    </p>
                    <dl className="mt-6 border-t border-[var(--rule)]">
                      {dict.pricing.languageAddon.examples.map((example) => (
                        <div
                          key={example.combination}
                          className="flex items-baseline justify-between gap-6 border-b border-[var(--rule)] py-3"
                        >
                          <dt className="text-[15px] text-[var(--fg)]">{example.combination}</dt>
                          <dd className="shrink-0 text-[15px] text-[var(--muted)]">{example.price}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <a href={`#${SECTION.contact}`} className={btnAccent}>
                      {dict.pricing.ctaLabel}
                    </a>
                    <p className="text-[15px] text-[var(--muted)]">{dict.pricing.ctaLead}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id={SECTION.faq} className="border-t border-[var(--rule)] py-20 md:py-28">
              <div className="container-px mx-auto grid max-w-content grid-cols-1 gap-12 md:grid-cols-12">
                <h2 className={`${h2} md:col-span-5`}>{dict.faq.title}</h2>
                <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)] md:col-span-7">
                  {dict.faq.items.map((q) => (
                    <details key={q.question} className="group py-2">
                      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium [&::-webkit-details-marker]:hidden">
                        {q.question}
                        <span
                          aria-hidden
                          className="text-[22px] font-normal leading-none text-[var(--accent)] transition-transform duration-200 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="max-w-[60ch] pb-5 text-[16px] leading-[1.6] text-[var(--muted)]">{q.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact */}
            <section id={SECTION.contact} className="border-t border-[var(--rule)] bg-[var(--bg-2)] py-20 md:py-28">
              <div className="container-px mx-auto grid max-w-content grid-cols-1 gap-14 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <h2 className={h2}>{COPY.contactTitle}</h2>
                  <p className={`${body} mt-5 max-w-[42ch]`}>{COPY.contactBody}</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-6 inline-block py-2 text-[17px] text-[var(--accent)] underline decoration-[rgba(200,155,108,0.4)] underline-offset-4 hover:decoration-[var(--accent)]"
                  >
                    {EMAIL}
                  </a>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <ContactForm dict={pageDict} />
                </div>
              </div>
            </section>
          </main>

          <Footer dict={pageDict} locale={locale} homeHref={HOME} />
        </div>
      </FilmPlayerProvider>
    </PlaybackProvider>
  );
}
