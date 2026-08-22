import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { localePath, type Dict, type Locale } from "@/lib/i18n";

export const ZILAVEC_LIVE_URL = "https://hise-zilavec.vercel.app/";
export const ZILAVEC_PATH = "/work/hise-zilavec";

// Screenshots are given their intrinsic pixel dimensions rather than a fixed
// container, so the browser reserves the exact space and nothing is ever
// cropped. `wide` marks the one image that runs the full content width.
type Shot = { src: string; width: number; height: number; wide?: boolean };

// Positional: index 0 is "two trades", 1 is "four models", 3 is "one path".
// The two entries without a screenshot stay text-only.
const CHALLENGE_IMAGES: (Shot | undefined)[] = [
  { src: "/images/work/zilavec-services.jpg", width: 2048, height: 1194 },
  { src: "/images/work/zilavec-models.jpg", width: 2048, height: 1088, wide: true },
  undefined,
  { src: "/images/work/zilavec-contact.jpg", width: 2048, height: 1224 },
  undefined,
];

const PALETTE_HEX = ["#17140F", "#F3EDE2", "#B89D6B", "#F5F1E7", "#201B14"];

// The real information architecture, read off the live site: one page with
// anchored sections, and four model anchors nested inside the house range.
// It stays in Slovenian in both locales because it reproduces the live site.
const SITEMAP = `Home — enostranska predstavitev
├── Predstavitev              #predstavitev
├── Storitve                  #storitve
│   ├── Krovstvo in kleparstvo
│   └── Montažne hiše Žilavec
├── Montažne hiše             #hise
│   ├── TREND 68,10 m²        #model-01
│   ├── KLASIK 100,10 m²      #model-02
│   ├── TREND 138,5 m²        #model-03
│   └── TREND 206,10 m²       #model-04
├── O nas                     #o-nas
└── Kontakt                   #kontakt
    └── Povpraševanje — obrazec z izbiro storitve ali modela`;

export function CaseStudyZilavec({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const t = dict.caseStudy;

  return (
    <>
      <Nav dict={dict} locale={locale} path={ZILAVEC_PATH} showSectionNav={false} />

      <main>
        {/* 1 — Hero */}
        {/* The header sits in flow rather than fixed, so it already supplies
            part of the top margin — this padding only tops it up. */}
        <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="container-px mx-auto max-w-content">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden />
                {t.eyebrow}
              </span>
            </Reveal>

            <Reveal>
              <h1 className="mt-6 max-w-4xl font-display text-[13vw] sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-ink text-balance">
                {t.title}
              </h1>
            </Reveal>

            <Reveal>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed">
                {t.intro}
              </p>
            </Reveal>

            <Reveal>
              <dl className="mt-12 grid grid-cols-1 gap-y-6 border-t border-border pt-8 sm:grid-cols-3 sm:gap-x-8">
                {t.meta.map((entry) => (
                  <div key={entry.value}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      {entry.label}
                    </dt>
                    <dd className="mt-2 text-ink">{entry.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Button
                  as="a"
                  href={ZILAVEC_LIVE_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  {t.visit}
                </Button>
                <Link
                  href={localePath(locale, "/#work")}
                  className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  <ArrowLeft
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                  {t.back}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2 — Hero image, inside the plate mark used elsewhere on the site */}
        <section className="pb-24 sm:pb-32">
          <div className="container-px mx-auto max-w-content">
            <Reveal>
              {/* No aspect container: the frame follows the image's own
                  2048×1434, so the whole screenshot stays visible. The plate
                  mark is kept; `block` avoids the inline descender gap that
                  would otherwise show a sliver of ground inside the border. */}
              <div className="overflow-hidden rounded-[3px] border border-border/70 bg-bg shadow-[inset_0_1px_0_rgba(243,241,236,0.055),inset_0_-1px_0_rgba(0,0,0,0.75)]">
                <Image
                  src="/images/work/zilavec-hero.jpg"
                  alt={t.heroAlt}
                  width={2048}
                  height={1434}
                  priority
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className="block h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3 — Overview */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeading
                  eyebrow={t.overviewEyebrow}
                  title={
                    <>
                      {t.overviewTitle.lead}{" "}
                      <span className="font-display italic text-accent">
                        {t.overviewTitle.accent}
                      </span>
                    </>
                  }
                />
              </div>

              <Reveal className="lg:col-span-7">
                <div className="space-y-5 max-w-xl text-ink-muted leading-relaxed">
                  {t.overview.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4 — The challenge */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <SectionHeading
              eyebrow={t.challengeEyebrow}
              title={
                <>
                  {t.challengeTitle.lead}{" "}
                  <span className="font-display italic text-accent">
                    {t.challengeTitle.accent}
                  </span>
                </>
              }
            />

            <RevealGroup
              className="mt-16 divide-y divide-border border-t border-border"
              stagger={0.08}
            >
              {t.challenge.map((entry, i) => {
                const image = CHALLENGE_IMAGES[i];

                return (
                  <RevealItem key={entry.title}>
                    <div className="flex flex-col gap-4 py-8 sm:flex-row sm:gap-10">
                      <span className="font-display text-3xl italic text-accent/60 sm:w-16 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl text-ink sm:w-64 shrink-0">
                        {entry.title}
                      </h3>
                      <p className="max-w-xl text-ink-muted leading-relaxed">
                        {entry.body}
                      </p>
                    </div>

                    {/* The evidence sits directly under the claim it supports.
                        Intrinsic width/height keeps the full frame visible — no
                        object-cover, so nothing is trimmed. */}
                    {image ? (
                      <figure
                        className={
                          image.wide
                            ? "mt-2 w-full pb-16"
                            : "mt-2 max-w-5xl pb-12"
                        }
                      >
                        <Image
                          src={image.src}
                          alt={entry.alt ?? ""}
                          width={image.width}
                          height={image.height}
                          sizes={
                            image.wide
                              ? "(min-width: 1280px) 1152px, 100vw"
                              : "(min-width: 1280px) 1024px, 100vw"
                          }
                          className="h-auto w-full rounded-[3px]"
                        />
                      </figure>
                    ) : null}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* 5 — Structure */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <SectionHeading
              eyebrow={t.structureEyebrow}
              title={
                <>
                  {t.structureTitle.lead}{" "}
                  <span className="font-display italic text-accent">
                    {t.structureTitle.accent}
                  </span>
                </>
              }
              description={t.structureDescription}
            />

            <Reveal>
              <div className="mt-14 overflow-x-auto rounded-[3px] border border-border bg-surface p-6 sm:p-10">
                <pre className="min-w-max font-sans text-xs sm:text-sm leading-[2] text-ink-muted">
                  {SITEMAP}
                </pre>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6 — Design direction */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <SectionHeading
              eyebrow={t.directionEyebrow}
              title={
                <>
                  {t.directionTitle.lead}{" "}
                  <span className="font-display italic text-accent">
                    {t.directionTitle.accent}
                  </span>
                </>
              }
            />

            <RevealGroup
              className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2"
              stagger={0.1}
            >
              {t.direction.map((entry) => (
                <RevealItem key={entry.label}>
                  <div className="border-t border-border pt-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      {entry.label}
                    </span>
                    <p className="mt-3 max-w-md text-ink-muted leading-relaxed">
                      {entry.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 7 — Typography and colour */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <SectionHeading
              eyebrow={t.typeEyebrow}
              title={
                <>
                  {t.typeTitle.lead}{" "}
                  <span className="font-display italic text-accent">
                    {t.typeTitle.accent}
                  </span>
                </>
              }
            />

            <RevealGroup className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2" stagger={0.1}>
              <RevealItem>
                <div className="border-t border-border pt-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {t.displayLabel}
                  </span>
                  <p className="mt-4 text-4xl sm:text-5xl font-semibold uppercase tracking-tight text-ink">
                    Big Shoulders
                  </p>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {t.displayNote}
                  </p>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="border-t border-border pt-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {t.bodyLabel}
                  </span>
                  <p className="mt-4 text-4xl sm:text-5xl text-ink">Archivo</p>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {t.bodyNote}
                  </p>
                </div>
              </RevealItem>
            </RevealGroup>

            <Reveal>
              <ul className="mt-16 grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-5 sm:divide-y-0">
                {t.palette.map((swatch, i) => (
                  <li key={swatch.name} className="py-6 sm:pr-6">
                    <span
                      aria-hidden
                      className="block h-16 w-full rounded-[2px] border border-border"
                      style={{ backgroundColor: PALETTE_HEX[i] }}
                    />
                    <p className="mt-4 text-ink">{swatch.name}</p>
                    <p className="mt-1 font-mono text-xs uppercase text-accent">
                      {PALETTE_HEX[i]}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">{swatch.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* 8 — Responsive */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <SectionHeading
              eyebrow={t.responsiveEyebrow}
              title={
                <>
                  {t.responsiveTitle.lead}{" "}
                  <span className="font-display italic text-accent">
                    {t.responsiveTitle.accent}
                  </span>
                </>
              }
              description={t.responsiveDescription}
            />

            <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
              <RevealGroup
                className="divide-y divide-border border-t border-border lg:col-span-7"
                stagger={0.08}
              >
                {t.responsive.map((entry) => (
                  <RevealItem key={entry.label}>
                    <div className="flex flex-col gap-4 py-8 sm:flex-row sm:gap-10">
                      <h3 className="font-display text-2xl text-ink sm:w-40 shrink-0">
                        {entry.label}
                      </h3>
                      <p className="max-w-xl text-ink-muted leading-relaxed">
                        {entry.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              {/* The narrow layout, shown at roughly the size it is actually
                  held at — a plain screenshot rather than a device mockup. */}
              <Reveal className="lg:col-span-5">
                <figure className="mx-auto w-full max-w-[320px] lg:mx-0 lg:ml-auto">
                  <Image
                    src="/images/work/zilavec-mobile.jpg"
                    alt={t.mobileAlt}
                    width={1125}
                    height={2436}
                    sizes="(min-width: 1024px) 320px, 280px"
                    className="h-auto w-full rounded-[3px]"
                  />
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 9 — Development */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <SectionHeading
              eyebrow={t.devEyebrow}
              title={
                <>
                  {t.devTitle.lead}{" "}
                  <span className="font-display italic text-accent">
                    {t.devTitle.accent}
                  </span>
                </>
              }
            />

            <RevealGroup
              className="mt-16 divide-y divide-border border-t border-border"
              stagger={0.08}
            >
              {t.stack.map((entry) => (
                <RevealItem key={entry.name}>
                  <div className="flex flex-col gap-3 py-8 sm:flex-row sm:gap-10">
                    <h3 className="font-display text-xl sm:text-2xl text-ink sm:w-56 shrink-0">
                      {entry.name}
                    </h3>
                    <p className="max-w-xl text-ink-muted leading-relaxed">
                      {entry.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 10 — Result */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <Reveal>
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  <span className="h-px w-6 bg-accent" aria-hidden />
                  {t.resultEyebrow}
                </span>
                <h2 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-ink text-balance">
                  {t.resultTitle.lead}{" "}
                  <span className="font-display italic text-accent">
                    {t.resultTitle.accent}
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-ink-muted leading-relaxed">
                  {t.resultBody}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <a
                href={ZILAVEC_LIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-14 flex flex-col gap-6 rounded-[3px] border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/60 hover:bg-surface-2 sm:flex-row sm:items-center sm:justify-between sm:p-10"
              >
                <span>
                  <span className="block font-display text-2xl sm:text-3xl text-ink">
                    {t.resultCta}
                  </span>
                  <span className="mt-2 block text-sm text-ink-muted">
                    hise-zilavec.vercel.app
                  </span>
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={20} />
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer dict={dict} locale={locale} />
    </>
  );
}
