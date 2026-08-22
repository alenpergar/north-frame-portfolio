// English is the source of truth: every string below is the copy that was
// already on the page, moved here verbatim. `sl.ts` is typed against this
// object, so a missing or renamed key is a compile error rather than a gap
// that only shows up in the browser.
import type { Dict } from "./types";

export const en: Dict = {
  nav: {
    links: [
      { to: "/#work", label: "Work" },
      { to: "/#services", label: "Services" },
      { to: "/#approach", label: "Approach" },
      { to: "/#process", label: "Process" },
      { to: "/#about", label: "About" },
    ],
    cta: "Start a Project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    sectionsLabel: "Sections",
    sections: [
      { id: "top", to: "/#top", label: "Home" },
      { id: "work", to: "/#work", label: "Work" },
      { id: "services", to: "/#services", label: "Services" },
      { id: "approach", to: "/#approach", label: "Approach" },
      { id: "process", to: "/#process", label: "Process" },
      { id: "about", to: "/#about", label: "About" },
      { id: "contact", to: "/#contact", label: "Contact" },
    ],
  },

  hero: {
    eyebrow: "DRYPOINT — Digital Design Studio",
    title: { lead: "We design brands that", accent: "move", tail: "." },
    body: "High-end websites, landing pages, and AI-directed creative for brands that refuse to look ordinary. Every project starts from a blank plate — never a template.",
    primary: "Start a Project",
    secondary: "View Our Work",
    tags: ["Web Design", "Landing Pages", "AI Creative"],
    scroll: "Scroll to work",
  },

  work: {
    eyebrow: "Selected Work",
    title: { lead: "Live client work,", accent: "crafted to convert." },
    description:
      "A delivered client website, alongside self-initiated concepts created to showcase our approach to web design.",
    client: {
      category: "Client Project · Live",
      description:
        "A roofing, tinsmithing, and prefab-home builder trading since 2008. The site carries two distinct service lines and four house models through to a single, clear inquiry path — for customers across Slovenia and Austria.",
      meta: "Krovske in kleparske storitve, Robert Žilavec s.p. — Gornja Radgona, Slovenia",
      metaPrefix: "Designed and built for a working business",
      action: "View case study",
    },
    conceptsEyebrow: "Concept Directions",
    conceptsTitle: "Self-initiated work, built to the same standard.",
    conceptCategory: "Web Design",
    concepts: {
      lumiere:
        "A premium private dental clinic website focused on trust, patient experience, and modern healthcare design. Crafted to convert visitors into booked appointments.",
      aurelia:
        "A premium restaurant website designed to showcase the dining experience, atmosphere, and brand identity. Crafted to attract guests, build trust, and drive table reservations through an elegant digital presence.",
      nova: "Personalized coaching, science-based programming, and relentless accountability — built for those who refuse to settle for average.",
      vivelle:
        "A luxury beauty salon website built on editorial calm, cinematic video, and considered detail. Crafted to make every visit feel like an experience before a client even walks through the door.",
    },
  },

  services: {
    eyebrow: "Services",
    title: { lead: "Three disciplines,", accent: "one studio." },
    description:
      "Everything DRYPOINT builds sits somewhere between these three — strategy-led design work made for brands that need to look, and perform, at the top of their category.",
    items: [
      {
        title: "Web Design",
        description:
          "Full-scale marketing and brand websites engineered for clarity, speed, and a premium first impression — designed to hold up under real client traffic, not just a portfolio screenshot.",
      },
      {
        title: "Landing Pages",
        description:
          "Focused, high-conversion single pages for launches, campaigns, and offers — built around one goal, one story, and a clear path to action.",
      },
      {
        title: "AI Creative",
        description:
          "AI-directed commercials, product films, and campaign visuals — cinematic output produced faster than a traditional shoot, without cutting craft.",
      },
    ],
  },

  approach: {
    eyebrow: "Approach",
    title: { lead: "How we", accent: "think", tail: ", before we design." },
    quote: "“The first frame sets the tone for everything after it.”",
    pillars: [
      {
        title: "Strategy-Led",
        description:
          "Every design decision traces back to a business goal, not a passing trend.",
      },
      {
        title: "Cinematic Craft",
        description:
          "We treat pacing, contrast, and rhythm as seriously as a director treats a scene.",
      },
      {
        title: "AI-Augmented",
        description:
          "AI accelerates production and exploration — it never replaces taste or judgment.",
      },
      {
        title: "Obsessive Detail",
        description:
          "Spacing, motion, and copy are refined until nothing feels accidental.",
      },
    ],
  },

  process: {
    eyebrow: "Process",
    title: { lead: "Five steps.", accent: "No guesswork." },
    description:
      "A structured path from first conversation to launch — transparent at every stage.",
    steps: [
      {
        title: "Discover",
        description:
          "We learn the brand, the audience, and the goal behind the project before a single pixel is placed.",
      },
      {
        title: "Define",
        description:
          "Scope, sitemap, and creative direction are agreed on paper first — no surprises mid-build.",
      },
      {
        title: "Design",
        description:
          "High-fidelity design across every breakpoint, reviewed together in structured rounds.",
      },
      {
        title: "Develop",
        description:
          "Production-grade build in Next.js — fast, accessible, and animated with intent.",
      },
      {
        title: "Deliver",
        description:
          "Launch, handoff, and a short support window to make sure the site performs as designed.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: { lead: "A studio built for", accent: "craft." },
    paragraphs: [
      "DRYPOINT exists because most “creative” work online looks the same — the same templates, the same stock gradients, the same forgettable hero section. We started this studio to do the opposite: treat every website like a film that needs its own tone, pacing, and voice.",
      "That means fewer clients, more attention per project, and a refusal to ship anything that reads as generic. Where it makes sense, we bring AI into the process — not to cut corners, but to explore more directions, faster, before committing to the one that’s right.",
    ],
    beliefs: [
      "Fewer clients, more attention per project.",
      "Every brand gets an original direction — never a template.",
      "AI is a tool in the process, never a replacement for taste.",
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: { lead: "Let’s build something", accent: "premium." },
    description:
      "Tell us about your project and we'll reply within one business day. Prefer email? Reach us directly below.",
    name: "Name",
    email: "Email",
    projectType: "Project type",
    message: "Message",
    // The option values stay in English because app/api/contact/route.ts
    // validates them against a fixed allowlist; only the labels are localised.
    projectTypes: [
      { value: "Web Design", label: "Web Design" },
      { value: "Landing Page", label: "Landing Page" },
      { value: "AI Creative", label: "AI Creative" },
      { value: "Not sure yet", label: "Not sure yet" },
    ],
    send: "Send Message",
    sending: "Sending…",
    successTitle: "Message received.",
    successBody:
      "Thanks for reaching out — we’ll follow up within one business day.",
    genericError: "Something went wrong. Please try again.",
    networkError:
      "Something went wrong. Please check your connection and try again.",
  },

  footer: {
    blurb:
      "Premium digital design studio — websites, landing pages, and AI-powered creative experiences.",
    links: [
      { to: "/#work", label: "Work" },
      { to: "/#services", label: "Services" },
      { to: "/#approach", label: "Approach" },
      { to: "/#process", label: "Process" },
      { to: "/#about", label: "About" },
      { to: "/#contact", label: "Contact" },
    ],
    nav: "Footer",
    follow: "Follow",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },

  caseStudy: {
    metaTitle: "Hiše Žilavec",
    metaDescription:
      "Case study: a website for Krovske in kleparske storitve, Robert Žilavec s.p. — a roofing, tinsmithing and prefab-home builder trading since 2008, carrying two service lines and four house models through to a single inquiry path.",
    ogTitle: "Hiše Žilavec — Case Study",
    ogDescription:
      "Two service lines, four house models, one inquiry path. How DRYPOINT structured and built the site for a roofing and prefab-home builder working across Slovenia and Austria.",

    eyebrow: "Client Project / 2026",
    title: "Hiše Žilavec",
    intro:
      "A website for a roofing, tinsmithing and prefab-home builder trading since 2008, carrying two distinct service lines and four house models through to a single, clear inquiry path.",
    meta: [
      { label: "Discipline", value: "Web Design" },
      { label: "Discipline", value: "Web Development" },
      { label: "Territory", value: "Slovenia" },
    ],
    visit: "Visit live website",
    back: "Back to selected work",
    heroAlt:
      "The Hiše Žilavec homepage: a completed house at dusk beneath the site's headline.",

    overviewEyebrow: "Overview",
    overviewTitle: { lead: "A trade business,", accent: "online." },
    overview: [
      "Krovske in kleparske storitve, Robert Žilavec s.p. works out of Gornja Radgona and has been trading since 2008. The business covers two related trades: roofing and tinsmithing, and the design and construction of prefabricated houses.",
      "Its customers are spread across north-eastern Slovenia — Gornja Radgona, Kidričevo, Maribor, Ormož, Ptuj, Slovenska Bistrica and Koroška — as well as neighbouring Austria. The site had to serve someone replacing a roof and someone planning an entire house, without asking either to wade through the other’s material.",
    ],

    challengeEyebrow: "The Challenge",
    challengeTitle: { lead: "Five problems to", accent: "solve." },
    challenge: [
      {
        title: "Two trades, one business",
        body: "Roofing and tinsmithing sit beside prefab house construction. They serve different buyers with different timelines, and the site had to hold both without reading as two companies stapled together.",
        alt: "The services section: roofing and tinsmithing on the left, prefab houses on the right, each with its own list of work.",
      },
      {
        title: "Four models, compared honestly",
        body: "The house range spans 68 to 206 m². Each model needed enough substance to be judged on its own, while staying comparable to the others at a glance.",
        alt: "The TREND 68,10 m² model: a full-bleed photograph of the built house, its description, an inquiry link, and the other three models listed alongside.",
      },
      {
        title: "Navigation a roofer can use",
        body: "The audience is not browsing for pleasure. Wayfinding had to be short, obvious, and reachable from anywhere on the page.",
      },
      {
        title: "One path to an inquiry",
        body: "Every route through the site resolves to the same place: a single form that already knows which service or model the visitor came from.",
        alt: "The contact section: phone numbers, email and address on the left, and the inquiry form on the right with its service-and-model selector.",
      },
      {
        title: "A trade, presented well",
        body: "Eighteen years of craft deserved a digital presence with the same care. The work is physical and unglamorous; the presentation had to be calm, dark, and confident rather than loud.",
      },
    ],

    structureEyebrow: "Structure",
    structureTitle: { lead: "One page,", accent: "nine stops." },
    structureDescription:
      "The whole business sits on a single page. Anchors do the work of sub-pages, so nothing costs a page load and the inquiry form is never more than one jump away.",

    directionEyebrow: "Design Direction",
    directionTitle: { lead: "Built like the", accent: "work." },
    direction: [
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
    ],

    typeEyebrow: "Typography & Colour",
    typeTitle: { lead: "Two typefaces,", accent: "five values." },
    displayLabel: "Display",
    displayNote:
      "700, uppercase. Condensed enough to hold a long Slovenian headline on one line.",
    bodyLabel: "Body",
    bodyNote:
      "400–500. An even, unfussy grotesque that keeps diacritics clean at small sizes.",
    palette: [
      { name: "Ground", note: "Page background" },
      { name: "Ink", note: "Text on dark" },
      { name: "Brass", note: "Accent and calls to action" },
      { name: "Paper", note: "Light section" },
      { name: "Contrast", note: "Text on brass" },
    ],

    responsiveEyebrow: "Responsive",
    responsiveTitle: { lead: "Designed from the", accent: "smallest screen up." },
    responsiveDescription:
      "Most visitors arrive on a phone, often from a job site. The narrow layout was the one designed first; the wider ones open it up rather than rearrange it.",
    responsive: [
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
    ],
    mobileAlt:
      "The house models on a phone: the photograph, model name, description and inquiry link stacked in a single column.",

    devEyebrow: "Development",
    devTitle: { lead: "What it is", accent: "actually built on." },
    stack: [
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
    ],

    resultEyebrow: "Live",
    resultTitle: {
      lead: "Two service lines and four house models, resolved into one page and",
      accent: "one inquiry.",
    },
    resultBody:
      "The site is live and in use by the business, with the contact form running to the client’s own inbox.",
    resultCta: "Visit live website",
  },
};
