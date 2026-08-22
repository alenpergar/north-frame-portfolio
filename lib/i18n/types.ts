// A headline split into its plain lead, the italic accent phrase, and an
// optional tail — the shape the existing SectionHeading markup already uses.
export type Title = { lead: string; accent: string; tail?: string };

type NavLink = { to: string; label: string };
type SectionLink = { id: string; to: string; label: string };
type TitledBody = { title: string; description: string };

export type Dict = {
  nav: {
    links: NavLink[];
    cta: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
    sectionsLabel: string;
    sections: SectionLink[];
  };

  hero: {
    eyebrow: string;
    title: Title;
    body: string;
    primary: string;
    secondary: string;
    tags: string[];
    scroll: string;
  };

  work: {
    eyebrow: string;
    title: Title;
    description: string;
    client: {
      category: string;
      description: string;
      meta: string;
      metaPrefix: string;
      action: string;
    };
    conceptsEyebrow: string;
    conceptsTitle: string;
    conceptCategory: string;
    concepts: {
      lumiere: string;
      aurelia: string;
      nova: string;
      vivelle: string;
    };
  };

  services: {
    eyebrow: string;
    title: Title;
    description: string;
    items: TitledBody[];
  };

  approach: {
    eyebrow: string;
    title: Title;
    quote: string;
    pillars: TitledBody[];
  };

  process: {
    eyebrow: string;
    title: Title;
    description: string;
    steps: TitledBody[];
  };

  about: {
    eyebrow: string;
    title: Title;
    paragraphs: string[];
    beliefs: string[];
  };

  contact: {
    eyebrow: string;
    title: Title;
    description: string;
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
