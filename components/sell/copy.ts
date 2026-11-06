import type { Locale } from "@/lib/i18n";

/**
 * Homepage copy the shared dictionaries do not carry. The marketing lines
 * come from the archived web-design dictionaries (git 3a5f0f1), with the
 * house rule of commas instead of spaced dashes; the rest is interface text
 * (labels, landmarks, alt text). No new claims.
 *
 * Section ids are the same in both languages and match the links the rest
 * of the site already uses (Nav CTA "/#contact", footer "/#work", ...).
 */
export const SECTION = {
  web: "digital",
  films: "work",
  services: "services",
  process: "process",
  pricing: "pricing",
  faq: "faq",
  contact: "contact",
} as const;

type Copy = {
  heroBody: string;
  workTitle: string;
  zilavecBody: string;
  zilavecMeta: string;
  conceptsTitle: string;
  servicesTitle: string;
  /** Under "web design and development" in the pricing table. */
  webIncluded: { title: string; payment: string; cta: string };
  processTitle: string;
  processBody: string;
  process: { title: string; body: string }[];
  contactTitle: string;
  contactBody: string;
  nav: { id: string; label: string }[];
  contactLabel: string;
  loading: string;
  skip: string;
  mainNav: string;
  mobileNav: string;
  newTab: string;
  drawingTitle: string;
  language: { href: string; label: string; name: string };
};

export const SELL_COPY: Record<Locale, Copy> = {
  sl: {
    heroBody: "Vsak projekt se začne na prazni plošči, nikoli na predlogi.",
    workTitle: "Izdelava spletnih strani, ustvarjena za rezultat.",
    zilavecBody:
      "Krovstvo, kleparstvo in izdelava montažnih hiš, dejavni od leta 2008. Stran vodi dve ločeni storitveni liniji in štiri modele hiš do ene same, jasne poti do povpraševanja, za stranke po Sloveniji in Avstriji.",
    zilavecMeta: "Krovske in kleparske storitve, Robert Žilavec s.p., Gornja Radgona",
    conceptsTitle: "Samoiniciativno delo, izdelano po istem merilu.",
    servicesTitle: "Storitve",
    webIncluded: {
      title: "Kaj je vključeno",
      payment: "Enkratno plačilo, brez mesečne naročnine.",
      cta: "Pošljite povpraševanje",
    },
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
      "Povejte nam o svojem projektu in odgovorili bomo v najkrajšem možnem času. Raje po e-pošti? Pišite nam neposredno spodaj.",
    nav: [
      { id: SECTION.web, label: "Delo" },
      { id: SECTION.services, label: "Storitve" },
      { id: SECTION.process, label: "Proces" },
      { id: SECTION.pricing, label: "Cenik" },
      { id: SECTION.faq, label: "Vprašanja" },
    ],
    contactLabel: "Kontakt",
    loading: "Nalaganje",
    skip: "Preskoči na vsebino",
    mainNav: "Glavna navigacija",
    mobileNav: "Mobilna navigacija",
    newTab: "odpre se v novem zavihku",
    drawingTitle:
      "Struktura spletne strani Hiše Žilavec, narisana kot tloris: vsaka sekcija je prostor, vse poti vodijo do obrazca za povpraševanje.",
    language: { href: "/", label: "EN", name: "English" },
  },
  en: {
    heroBody: "Every project starts from a blank plate, never a template.",
    workTitle: "Live client work, crafted to convert.",
    zilavecBody:
      "A roofing, tinsmithing, and prefab-home builder trading since 2008. The site carries two distinct service lines and four house models through to a single, clear inquiry path, for customers across Slovenia and Austria.",
    zilavecMeta: "Krovske in kleparske storitve, Robert Žilavec s.p., Gornja Radgona, Slovenia",
    conceptsTitle: "Self-initiated work, built to the same standard.",
    servicesTitle: "Services",
    webIncluded: {
      title: "What’s included",
      payment: "One-time payment, no monthly subscription.",
      cta: "Send an inquiry",
    },
    processTitle: "Five steps. No guesswork.",
    processBody: "A structured path from first conversation to launch, transparent at every stage.",
    process: [
      {
        title: "Discover",
        body: "We learn the brand, the audience, and the goal behind the project before a single pixel is placed.",
      },
      {
        title: "Define",
        body: "Scope, sitemap, and creative direction are agreed on paper first, no surprises mid-build.",
      },
      { title: "Design", body: "High-fidelity design across every breakpoint, reviewed together in structured rounds." },
      { title: "Develop", body: "Production-grade build in Next.js, fast, accessible, and animated with intent." },
      { title: "Deliver", body: "Launch and handoff." },
    ],
    contactTitle: "Let’s build something premium.",
    contactBody:
      "Tell us about your project and we'll get back to you as soon as possible. Prefer email? Reach us directly below.",
    nav: [
      { id: SECTION.web, label: "Work" },
      { id: SECTION.services, label: "Services" },
      { id: SECTION.process, label: "Process" },
      { id: SECTION.pricing, label: "Pricing" },
      { id: SECTION.faq, label: "FAQ" },
    ],
    contactLabel: "Contact",
    loading: "Loading",
    skip: "Skip to content",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    newTab: "opens in a new tab",
    drawingTitle:
      "The structure of the Hiše Žilavec website drawn as a floor plan: every section is a room, and every route leads to the inquiry form.",
    language: { href: "/sl", label: "SL", name: "Slovenščina" },
  },
};
