// A headline split into its plain lead, the italic accent phrase, and an
// optional tail — the shape the existing SectionHeading markup already uses.
export type Title = { lead: string; accent: string; tail?: string };

type NavLink = { to: string; label: string };
type TitledBody = { title: string; description: string };

export type Dict = {
  nav: {
    links: NavLink[];
    cta: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
  };

  /** Labels shown under every film and project. Rendered uppercase in mono. */
  status: {
    client: string;
    spec: string;
    concept: string;
    website: string;
  };

  /** The full-screen film player and the in-frame play affordance. */
  player: {
    play: string;
    close: string;
    /** Accessible name for a film frame. {name}, {status}, {seconds}. */
    frameLabel: string;
    /** Disclaimer for spec work. {brand} is replaced with the brand name. */
    specNote: string;
    conceptNote: string;
  };

  hero: {
    /** One entry per display line. */
    title: string[];
    primary: string;
    secondary: string;
  };

  commercials: {
    title: string;
    feedTitle: string;
    /** One line of context under each film, keyed by campaign id. */
    lines: { snap: string; proda: string; matcha: string };
  };

  capabilities: {
    title: string;
    items: TitledBody[];
  };

  process: {
    title: string;
    steps: TitledBody[];
  };

  digital: {
    title: string;
    description: string;
    zilavec: { title: string; description: string; action: string; alt: string };
    vivelle: { title: string; description: string; action: string; alt: string };
  };

  /** Starting prices. Factual only: three entries, no tiers, no claims. */
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    items: { name: string; price: string; description: string }[];
    ctaLead: string;
    ctaLabel: string;
  };

  /** Questions and answers. Factual only; no new claims. */
  faq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };

  /** About and contact, closed together: two sentences, then the ask. */
  closing: {
    about: string;
    title: string;
  };

  contact: {
    name: string;
    email: string;
    projectType: string;
    message: string;
    // `value` is what the API allowlist checks; only `label` is localised.
    projectTypes: { value: string; label: string }[];
    send: string;
    sending: string;
    successTitle: string;
    successBody: string;
    genericError: string;
    networkError: string;
    /** Shown when required fields are empty or the email is malformed. */
    invalid: string;
  };

  footer: {
    blurb: string;
    links: NavLink[];
    nav: string;
    follow: string;
    rights: string;
    backToTop: string;
    privacy: string;
  };

  caseStudy: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;

    eyebrow: string;
    title: string;
    intro: string;
    meta: { label: string; value: string }[];
    visit: string;
    back: string;
    heroAlt: string;

    overviewEyebrow: string;
    overviewTitle: Title;
    overview: string[];

    challengeEyebrow: string;
    challengeTitle: Title;
    // `alt` is present only on the entries that carry a screenshot.
    challenge: { title: string; body: string; alt?: string }[];

    structureEyebrow: string;
    structureTitle: Title;
    structureDescription: string;

    directionEyebrow: string;
    directionTitle: Title;
    direction: { label: string; body: string }[];

    typeEyebrow: string;
    typeTitle: Title;
    displayLabel: string;
    displayNote: string;
    bodyLabel: string;
    bodyNote: string;
    palette: { name: string; note: string }[];

    responsiveEyebrow: string;
    responsiveTitle: Title;
    responsiveDescription: string;
    responsive: { label: string; body: string }[];
    mobileAlt: string;

    devEyebrow: string;
    devTitle: Title;
    stack: { name: string; body: string }[];

    resultEyebrow: string;
    resultTitle: Title;
    resultBody: string;
    resultCta: string;
  };

  privacy: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    updated: string;
    intro: string;
    sections: { heading: string; body: string[] }[];
  };
};
