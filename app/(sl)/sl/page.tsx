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
import { FilmFrame } from "@/components/video/film-frame";
import { PlaybackProvider } from "@/components/video/playback-provider";
import { FilmPlayerProvider } from "@/components/video/film-player-provider";
import { campaigns, formatDuration, type Campaign } from "@/lib/media";
import { getDict, localePath, type Dict } from "@/lib/i18n";
import "@/components/sell/sell.css";

// The Slovenian homepage: what the studio sells (AI commercials and websites),
// the proof for each, prices and the inquiry form, on one page. Title and
// description come from the (sl) layout (siteMetadata).

const locale = "sl" as const;
const EMAIL = "hello@drypointcreative.com";
const HOME = localePath(locale, "/");
const ZILAVEC = localePath(locale, "/work/hise-zilavec");
const VIVELLE = "/vivelle-beauty";

// Copy that the current dictionary no longer carries comes from the archived
// web-design dictionary (git 3a5f0f1), with the house rule of commas instead
// of spaced dashes. Nothing here is new claim or new copy.
const COPY = {
  heroBody: "Vsak projekt se začne na prazni plošči, nikoli na predlogi.",
  workTitle: "Izdelava spletnih strani, ustvarjena za rezultat.",
  zilavecBody:
    "Krovstvo, kleparstvo in izdelava montažnih hiš, dejavni od leta 2008. Stran vodi dve ločeni storitveni liniji in štiri modele hiš do ene same, jasne poti do povpraševanja, za stranke po Sloveniji in Avstriji.",
  zilavecMeta: "Krovske in kleparske storitve, Robert Žilavec s.p., Gornja Radgona",
  conceptsTitle: "Samoiniciativno delo, izdelano po istem merilu.",
  // Two web services from the archived dictionary; the film services come
  // from the current one (dict.capabilities) and are added in the page.
  webServices: [
    {
      title: "Spletno oblikovanje",
      body: "Celovite spletne strani po meri, zasnovane za jasnost, hitrost in vrhunski prvi vtis, narejene tako, da zdržijo resničen promet, ne le posnetek za portfelj.",
    },
    {
      title: "Pristajalne strani",
      body: "Osredotočene enostranske predstavitve z visoko konverzijo za lansiranja, kampanje in ponudbe, zgrajene okoli enega cilja, ene zgodbe in jasne poti do dejanja.",
    },
  ],
  processTitle: "Pet korakov. Brez ugibanja.",
  processBody: "Strukturirana pot od prvega pogovora do lansiranja, pregledna na vsaki stopnji.",
  process: [
    { title: "Spoznavanje", body: "Spoznamo znamko, občinstvo in cilj projekta, preden postavimo prvi piksel." },
    {
      title: "Opredelitev",
      body: "Obseg, struktura strani in kreativna smer so dogovorjeni najprej na papirju, brez presenečenj med izdelavo.",
    },
    { title: "Oblikovanje", body: "Natančno oblikovanje za vsako širino zaslona, pregledano skupaj v strukturiranih krogih." },
    { title: "Razvoj", body: "Produkcijska izdelava v Next.js, hitra, dostopna in animirana z namenom." },
    { title: "Predaja", body: "Lansiranje in predaja." },
  ],
  contactTitle: "Ustvarimo nekaj vrhunskega.",
  contactBody:
    "Povejte nam o svojem projektu in odgovorili bomo v enem delovnem dnevu. Raje po e-pošti? Pišite nam neposredno spodaj.",
};

const NAV = [
  { href: "#delo", label: "Delo" },
  { href: "#reklame", label: "Reklame" },
  { href: "#storitve", label: "Storitve" },
  { href: "#proces", label: "Proces" },
  { href: "#cenik", label: "Cenik" },
  { href: "#vprasanja", label: "Vprašanja" },
];

const btnAccent =
  "inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--accent)] px-6 text-[15px] font-medium text-[var(--bg)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--accent-hover)] active:translate-y-px";
const btnLine =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border border-[rgba(243,241,236,0.3)] px-6 text-[15px] font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--fg)] active:translate-y-px";
const h2 = "text-[clamp(1.875rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]";
const body = "text-[17px] leading-[1.6] text-[var(--muted)]";

/** Name, status and length under a film, then its one line. */
function FilmCaption({ campaign, dict, line }: { campaign: Campaign; dict: Dict; line?: string }) {
  return (
    <div className="mt-4">
      <p className="flex items-baseline justify-between gap-4 text-[15px]">
        <span className="font-medium text-[var(--fg)]">{campaign.name}</span>
        <span className="text-[var(--muted)]">
          {dict.status[campaign.status]}, {formatDuration(campaign.duration)}
        </span>
      </p>
      {line && <p className="mt-1.5 max-w-[46ch] text-[15px] leading-[1.6] text-[var(--muted)]">{line}</p>}
    </div>
  );
}

export default function Home() {
  const dict = getDict(locale);
  const challenge = (i: number) => dict.caseStudy.challenge[i]!;
  const web = dict.pricing.items.find((i) => i.name === "Spletno oblikovanje in razvoj")!;
  const ads = dict.pricing.items.find((i) => i.name === "AI reklame")!;
  const film = (title: string) => dict.capabilities.items.find((i) => i.title === title)!;
  const services = [
    { title: film("AI reklame").title, body: film("AI reklame").description },
    { title: film("AI video produkcija").title, body: film("AI video produkcija").description },
    ...COPY.webServices,
  ];
  const { pulse, redbull, proda, matcha } = campaigns;
  const t = dict.commercials;
  const links = [...NAV, { href: "#kontakt", label: "Kontakt" }];
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
          <Loader word="DRYPOINT" label="Nalaganje" />
          <a
            href="#vsebina"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--bg)]"
          >
            Preskoči na vsebino
          </a>

          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[var(--bg)]">
            <div className="container-px mx-auto flex h-16 max-w-content items-center justify-between gap-6">
              <Logo height={18} href={HOME} className="py-[13px]" />
              <nav aria-label="Glavna navigacija" className="hidden md:block">
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
                <a href="#kontakt" className={`${btnAccent} hidden min-h-[40px] px-5 text-sm sm:inline-flex`}>
                  {dict.nav.cta}
                </a>
                <MobileMenu
                  items={links}
                  cta={{ href: "#kontakt", label: dict.nav.cta }}
                  labels={{ open: dict.nav.openMenu, close: dict.nav.closeMenu }}
                />
              </div>
            </div>
          </header>

          <main id="vsebina">
            {/* Hero: what the studio sells, and the two ways in. The proof for
                each lives in its own section (films, web work). */}
            <section className="container-px mx-auto max-w-content pb-20 pt-16 md:pb-28 md:pt-24">
              <h1 className="text-[clamp(2.6rem,6.2vw,5.75rem)] font-medium leading-[1] tracking-[-0.04em]">
                <span className="block">{dict.hero.title[0]}</span>
                <span className="block">{dict.digital.description}</span>
              </h1>
              <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-12 lg:items-end lg:gap-10">
                <div className="lg:col-span-5">
                  <p className={`${body} max-w-[40ch]`}>
                    {dict.footer.blurb} {COPY.heroBody}
                  </p>
                  <a href="#kontakt" className={`${btnAccent} mt-8`}>
                    {dict.nav.cta}
                  </a>
                </div>
                <ul className="border-b border-[var(--rule)] lg:col-span-6 lg:col-start-7">
                  {[
                    { href: "#reklame", item: ads },
                    { href: "#delo", item: web },
                  ].map(({ href, item }) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="group flex min-h-[64px] items-baseline justify-between gap-6 border-t border-[var(--rule)] py-5"
                      >
                        <span className="text-[20px] font-medium tracking-[-0.015em] transition-colors group-hover:text-[var(--accent)] md:text-[24px]">
                          {item.name}
                        </span>
                        <span className="shrink-0 text-[20px] font-medium tracking-[-0.015em] text-[var(--accent)] md:text-[24px]">
                          {item.price}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Web work */}
            <section id="delo" className="border-t border-[var(--rule)] bg-[var(--bg-2)] py-20 md:py-28">
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
                          title="Struktura spletne strani Hiše Žilavec, narisana kot tloris: vsaka sekcija je prostor, vse poti vodijo do obrazca za povpraševanje."
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
                      <span className="sr-only"> (odpre se v novem zavihku)</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Films: Red Bull leads, then the landscape spot and the social pair. */}
            <section id="reklame" className="border-t border-[var(--rule)] py-20 md:py-28">
              <div className="container-px mx-auto max-w-content">
                <h2 className={h2}>{t.title}</h2>
                <div className="mt-12 md:mt-14">
                  <FilmFrame campaign={redbull} dict={pageDict} sizes="(min-width: 1360px) 1232px, 92vw" />
                  <FilmCaption campaign={redbull} dict={pageDict} />
                </div>

                <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-16 md:mt-24 lg:grid-cols-12">
                  <div className="lg:col-span-6">
                    <FilmFrame campaign={pulse} dict={pageDict} sizes="(min-width: 1360px) 610px, (min-width: 1024px) 46vw, 92vw" />
                    <FilmCaption campaign={pulse} dict={pageDict} />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:gap-x-6 lg:col-span-6">
                    <h3 className="col-span-2 text-[24px] font-medium tracking-[-0.02em] md:text-[28px]">{t.feedTitle}</h3>
                    <div>
                      <FilmFrame campaign={proda} dict={pageDict} sizes="(min-width: 1024px) 24vw, 46vw" />
                      <FilmCaption campaign={proda} dict={pageDict} line={t.lines.proda} />
                    </div>
                    <div>
                      <FilmFrame campaign={matcha} dict={pageDict} sizes="(min-width: 1024px) 24vw, 46vw" />
                      <FilmCaption campaign={matcha} dict={pageDict} line={t.lines.matcha} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services */}
            <section id="storitve" className="border-t border-[var(--rule)] bg-[var(--bg-2)] py-20 md:py-28">
              <div className="container-px mx-auto grid max-w-content grid-cols-1 gap-12 md:grid-cols-12">
                <h2 className={`${h2} md:col-span-4`}>Storitve</h2>
                <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:col-span-8">
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
            <section id="proces" className="border-t border-[var(--rule)] py-20 md:py-28">
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
            <section id="cenik" className="border-t border-[var(--rule)] bg-[var(--bg-2)] py-20 md:py-28">
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
                        <dt className="text-[20px] font-medium tracking-[-0.015em]">{item.name}</dt>
                        <dd className="text-[28px] font-medium tracking-[-0.025em] text-[var(--accent)] sm:row-span-2 sm:text-right">
                          {item.price}
                        </dd>
                        <dd className="text-[15px] leading-[1.6] text-[var(--muted)]">{item.description}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <a href="#kontakt" className={btnAccent}>
                      {dict.pricing.ctaLabel}
                    </a>
                    <p className="text-[15px] text-[var(--muted)]">{dict.pricing.ctaLead}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="vprasanja" className="border-t border-[var(--rule)] py-20 md:py-28">
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
            <section id="kontakt" className="border-t border-[var(--rule)] bg-[var(--bg-2)] py-20 md:py-28">
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
