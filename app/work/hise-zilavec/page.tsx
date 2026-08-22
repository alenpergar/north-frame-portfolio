import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const LIVE_URL = "https://hise-zilavec.vercel.app/";

export const metadata: Metadata = {
  title: "Hiše Žilavec",
  description:
    "Case study: a website for Krovske in kleparske storitve, Robert Žilavec s.p. — a roofing, tinsmithing and prefab-home builder trading since 2008, carrying two service lines and four house models through to a single inquiry path.",
  openGraph: {
    title: "Hiše Žilavec — Case Study",
    description:
      "Two service lines, four house models, one inquiry path. How DRYPOINT structured and built the site for a roofing and prefab-home builder working across Slovenia and Austria.",
  },
};

const META = [
  { label: "Discipline", value: "Web Design" },
  { label: "Discipline", value: "Web Development" },
  { label: "Territory", value: "Slovenia" },
];

// Screenshots are given their intrinsic pixel dimensions rather than a fixed
// container, so the browser reserves the exact space and nothing is ever
// cropped. `wide` marks the one image that runs the full content width.
type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  wide?: boolean;
};

type ChallengeEntry = {
  index: string;
  title: string;
  body: string;
  image?: Shot;
};

// Every point below describes the design problem in DRYPOINT's own words —
// none of it is attributed to the client.
const CHALLENGE: ChallengeEntry[] = [
  {
    index: "01",
    title: "Two trades, one business",
    body: "Roofing and tinsmithing sit beside prefab house construction. They serve different buyers with different timelines, and the site had to hold both without reading as two companies stapled together.",
    image: {
      src: "/images/work/zilavec-services.jpg",
      alt: "The services section: roofing and tinsmithing on the left, prefab houses on the right, each with its own list of work.",
      width: 2048,
      height: 1194,
    },
  },
  {
    index: "02",
    title: "Four models, compared honestly",
    body: "The house range spans 68 to 206 m². Each model needed enough substance to be judged on its own, while staying comparable to the others at a glance.",
    image: {
      src: "/images/work/zilavec-models.jpg",
      alt: "The TREND 68,10 m² model: a full-bleed photograph of the built house, its description, an inquiry link, and the other three models listed alongside.",
      width: 2048,
      height: 1088,
      wide: true,
    },
  },
  {
    index: "03",
    title: "Navigation a roofer can use",
    body: "The audience is not browsing for pleasure. Wayfinding had to be short, obvious, and reachable from anywhere on the page.",
  },
  {
    index: "04",
    title: "One path to an inquiry",
    body: "Every route through the site resolves to the same place: a single form that already knows which service or model the visitor came from.",
    image: {
      src: "/images/work/zilavec-contact.jpg",
      alt: "The contact section: phone numbers, email and address on the left, and the inquiry form on the right with its service-and-model selector.",
      width: 2048,
      height: 1224,
    },
  },
  {
    index: "05",
    title: "A trade, presented well",
    body: "Eighteen years of craft deserved a digital presence with the same care. The work is physical and unglamorous; the presentation had to be calm, dark, and confident rather than loud.",
  },
];

// The real information architecture, read off the live site: one page with
// anchored sections, and four model anchors nested inside the house range.
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

const DIRECTION = [
  {
    label: "Typography",
    body: "Big Shoulders set uppercase at 700 for headlines — a condensed grotesque that reads like signage on a building site. Archivo carries the body copy, keeping longer Slovenian sentences even and legible.",
  },
  {
    label: "Colour",
    body: "A warm near-black ground with a single brass accent, interrupted by one paper-toned section. The palette stays out of the way of the architecture.",
  },
  {
    label: "Visual language",
    body: "Full-bleed architectural photography under a dark wash, thin rules, and generous margins. Structure carries the page rather than ornament.",
  },
  {
    label: "Photography",
    body: "Built work shot at dusk, when a finished roofline reads as a silhouette and the interior lights are on. The subject is always a completed house, never a stock interior.",
  },
];

const PALETTE = [
  { hex: "#17140F", name: "Ground", note: "Page background" },
  { hex: "#F3EDE2", name: "Ink", note: "Text on dark" },
  { hex: "#B89D6B", name: "Brass", note: "Accent and calls to action" },
  { hex: "#F5F1E7", name: "Paper", note: "Light section" },
  { hex: "#201B14", name: "Contrast", note: "Text on brass" },
];

const RESPONSIVE = [
  {
    label: "Mobile",
    body: "The primary case. Sections stack in reading order, the house models become a swipeable sequence rather than a grid, and the inquiry button stays within thumb reach throughout.",
  },
  {
    label: "Tablet",
    body: "The service pair splits into two columns while the models stay full width, so a 68 m² plan is never shrunk to the point where its layout stops being readable.",
  },
  {
    label: "Desktop",
    body: "The hero takes the full viewport and the type scale opens up. Margins widen rather than the measure, so body copy keeps its line length instead of stretching.",
  },
];

const STACK = [
  {
    name: "Next.js",
    body: "App Router with server-rendered pages, so the site arrives as HTML for search engines and slow connections alike.",
  },
  {
    name: "TypeScript",
    body: "House models, services and form options are typed data rather than duplicated markup — adding a model is a data change.",
  },
  {
    name: "Tailwind CSS",
    body: "A single token set for colour, spacing and type, which is what keeps the dark and paper sections consistent.",
  },
  {
    name: "Framer Motion",
    body: "Entrance reveals and the model sequence, held to opacity and small offsets, and suppressed under reduced-motion.",
  },
  {
    name: "Vercel",
    body: "Deployed on Vercel with the contact form wired to the client's own inbox.",
  },
];

export default function HiseZilavecCaseStudy() {
  return (
    <>
      <Nav showSectionNav={false} />

      <main>
        {/* 1 — Hero */}
        {/* The header sits in flow rather than fixed, so it already supplies
            part of the top margin — this padding only tops it up. */}
        <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="container-px mx-auto max-w-content">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden />
                Client Project / 2026
              </span>
            </Reveal>

            <Reveal>
              <h1 className="mt-6 max-w-4xl font-display text-[13vw] sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-ink text-balance">
                Hiše Žilavec
              </h1>
            </Reveal>

            <Reveal>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed">
                A website for a roofing, tinsmithing and prefab-home builder
                trading since 2008, carrying two distinct service lines and four
                house models through to a single, clear inquiry path.
              </p>
            </Reveal>

            <Reveal>
              <dl className="mt-12 grid grid-cols-1 gap-y-6 border-t border-border pt-8 sm:grid-cols-3 sm:gap-x-8">
                {META.map((entry) => (
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
                  href={LIVE_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Visit live website
                </Button>
                <Link
                  href="/#work"
                  className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  <ArrowLeft
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                  Back to selected work
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
                  alt="The Hiše Žilavec homepage: a completed house at dusk beneath the site's headline."
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
                  eyebrow="Overview"
                  title={
                    <>
                      A trade business,{" "}
                      <span className="font-display italic text-accent">
                        online.
                      </span>
                    </>
                  }
                />
              </div>

              <Reveal className="lg:col-span-7">
                <div className="space-y-5 max-w-xl text-ink-muted leading-relaxed">
                  <p>
                    Krovske in kleparske storitve, Robert Žilavec s.p. works out
                    of Gornja Radgona and has been trading since 2008. The
                    business covers two related trades: roofing and tinsmithing,
                    and the design and construction of prefabricated houses.
                  </p>
                  <p>
                    Its customers are spread across north-eastern Slovenia —
                    Gornja Radgona, Kidričevo, Maribor, Ormož, Ptuj, Slovenska
                    Bistrica and Koroška — as well as neighbouring Austria. The
                    site had to serve someone replacing a roof and someone
                    planning an entire house, without asking either to wade
                    through the other&rsquo;s material.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4 — The challenge */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <SectionHeading
              eyebrow="The Challenge"
              title={
                <>
                  Five problems to{" "}
                  <span className="font-display italic text-accent">solve.</span>
                </>
              }
            />

            <RevealGroup
              className="mt-16 divide-y divide-border border-t border-border"
              stagger={0.08}
            >
              {CHALLENGE.map((entry) => (
                <RevealItem key={entry.index}>
                  <div className="flex flex-col gap-4 py-8 sm:flex-row sm:gap-10">
                    <span className="font-display text-3xl italic text-accent/60 sm:w-16 shrink-0">
                      {entry.index}
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
                  {entry.image ? (
                    <figure
                      className={
                        entry.image.wide
                          ? "mt-2 w-full pb-16"
                          : "mt-2 max-w-5xl pb-12"
                      }
                    >
                      <Image
                        src={entry.image.src}
                        alt={entry.image.alt}
                        width={entry.image.width}
                        height={entry.image.height}
                        sizes={
                          entry.image.wide
                            ? "(min-width: 1280px) 1152px, 100vw"
                            : "(min-width: 1280px) 1024px, 100vw"
                        }
                        className="h-auto w-full rounded-[3px]"
                      />
                    </figure>
                  ) : null}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 5 — Structure */}
        <section className="relative border-t border-border py-24 sm:py-32">
          <div className="container-px mx-auto max-w-content">
            <SectionHeading
              eyebrow="Structure"
              title={
                <>
                  One page,{" "}
                  <span className="font-display italic text-accent">
                    nine stops.
                  </span>
                </>
              }
              description="The whole business sits on a single page. Anchors do the work of sub-pages, so nothing costs a page load and the inquiry form is never more than one jump away."
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
              eyebrow="Design Direction"
              title={
                <>
                  Built like the{" "}
                  <span className="font-display italic text-accent">work.</span>
                </>
              }
            />

            <RevealGroup
              className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2"
              stagger={0.1}
            >
              {DIRECTION.map((entry) => (
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
              eyebrow="Typography & Colour"
              title={
                <>
                  Two typefaces,{" "}
                  <span className="font-display italic text-accent">
                    five values.
                  </span>
                </>
              }
            />

            <RevealGroup className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2" stagger={0.1}>
              <RevealItem>
                <div className="border-t border-border pt-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    Display
                  </span>
                  <p className="mt-4 text-4xl sm:text-5xl font-semibold uppercase tracking-tight text-ink">
                    Big Shoulders
                  </p>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    700, uppercase. Condensed enough to hold a long Slovenian
                    headline on one line.
                  </p>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="border-t border-border pt-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    Body
                  </span>
                  <p className="mt-4 text-4xl sm:text-5xl text-ink">Archivo</p>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    400–500. An even, unfussy grotesque that keeps diacritics
                    clean at small sizes.
                  </p>
                </div>
              </RevealItem>
            </RevealGroup>

            <Reveal>
              <ul className="mt-16 grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-5 sm:divide-y-0">
                {PALETTE.map((swatch) => (
                  <li key={swatch.hex} className="py-6 sm:pr-6">
                    <span
                      aria-hidden
                      className="block h-16 w-full rounded-[2px] border border-border"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <p className="mt-4 text-ink">{swatch.name}</p>
                    <p className="mt-1 font-mono text-xs uppercase text-accent">
                      {swatch.hex}
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
              eyebrow="Responsive"
              title={
                <>
                  Designed from the{" "}
                  <span className="font-display italic text-accent">
                    smallest screen up.
                  </span>
                </>
              }
              description="Most visitors arrive on a phone, often from a job site. The narrow layout was the one designed first; the wider ones open it up rather than rearrange it."
            />

            <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
              <RevealGroup
                className="divide-y divide-border border-t border-border lg:col-span-7"
                stagger={0.08}
              >
                {RESPONSIVE.map((entry) => (
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
                    alt="The house models on a phone: the photograph, model name, description and inquiry link stacked in a single column."
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
              eyebrow="Development"
              title={
                <>
                  What it is{" "}
                  <span className="font-display italic text-accent">
                    actually built on.
                  </span>
                </>
              }
            />

            <RevealGroup
              className="mt-16 divide-y divide-border border-t border-border"
              stagger={0.08}
            >
              {STACK.map((entry) => (
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
                  Live
                </span>
                <h2 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-ink text-balance">
                  Two service lines and four house models, resolved into one
                  page and{" "}
                  <span className="font-display italic text-accent">
                    one inquiry.
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-ink-muted leading-relaxed">
                  The site is live and in use by the business, with the contact
                  form running to the client&rsquo;s own inbox.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-14 flex flex-col gap-6 rounded-[3px] border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/60 hover:bg-surface-2 sm:flex-row sm:items-center sm:justify-between sm:p-10"
              >
                <span>
                  <span className="block font-display text-2xl sm:text-3xl text-ink">
                    Visit live website
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

      <Footer />
    </>
  );
}
