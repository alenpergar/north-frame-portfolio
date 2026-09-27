// English is the source of truth. `sl.ts` is typed against this object, so a
// missing or renamed key is a compile error rather than a gap that only shows
// up in the browser. Visible copy uses no em dashes (house style).
import type { Dict } from "./types";

export const en: Dict = {
  nav: {
    links: [
      { to: "/#work", label: "Work" },
      { to: "/#services", label: "Capabilities" },
      { to: "/#digital", label: "Digital" },
      { to: "/#pricing", label: "Pricing" },
      { to: "/#faq", label: "FAQ" },
      { to: "/#contact", label: "Contact" },
    ],
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
  },

  status: {
    client: "Client work",
    spec: "Spec commercial",
    concept: "Concept",
    website: "Website",
  },

  player: {
    play: "Play",
    close: "Close",
    frameLabel: "Play {name}, {status}, {seconds} seconds",
    specNote: "Unsolicited spec work. Not commissioned by or affiliated with {brand}.",
    conceptNote: "Concept. Original brand and product created by DRYPOINT.",
  },

  // Approved 2026-09-26. No supporting line: headline, status and two CTAs.
  hero: {
    title: ["Commercials made with AI.", "Directed like film."],
    primary: "Start a project",
    secondary: "Watch the film",
  },

  commercials: {
    title: "Selected commercials",
    feedTitle: "Made for the feed.",
    lines: {
      snap: "A thirty-second story told in one checkout queue.",
      proda: "A cherry soda, shot like a cocktail.",
      matcha: "Process, people and a cup worth queueing for.",
    },
  },

  capabilities: {
    title: "From script to final cut.",
    items: [
      {
        title: "AI commercials",
        description: "Spots for launches, campaigns and social, from idea to final cut.",
      },
      {
        title: "AI video production",
        description: "Product films and brand visuals, produced without a traditional shoot.",
      },
      {
        title: "Creative advertising",
        description: "Concepts, scripts and campaign lines that give a product something to say.",
      },
      {
        title: "Web & digital",
        description: "Websites and landing pages, designed and built in-house.",
      },
    ],
  },

  process: {
    title: "How a spot gets made.",
    steps: [
      {
        title: "Brief",
        description: "What the product is, who it is for, and where the spot will live.",
      },
      {
        title: "Concept & script",
        description: "One idea, written and boarded before anything is generated.",
      },
      {
        title: "Production",
        description: "Shots generated, directed and refined until every frame holds up.",
      },
      {
        title: "Delivery",
        description: "The final cut, plus the formats you need: 16:9, 9:16 and 1:1.",
      },
    ],
  },

  digital: {
    title: "Web & digital",
    description: "Websites designed and built in-house.",
    zilavec: {
      title: "Hiše Žilavec",
      description: "Two service lines and four house models, one inquiry path.",
      action: "View case study",
      alt: "The Hiše Žilavec homepage: the headline “Streha nad glavo. Dom za življenje.” beside a modern house with a dark tiled roof.",
    },
    vivelle: {
      title: "VIVELLE Beauty",
      description: "An editorial website concept for a luxury salon.",
      action: "View site",
      alt: "The VIVELLE Beauty concept: a therapist giving a facial treatment in a marble and gold salon.",
    },
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Clear starting points. Every project is different.",
    description:
      "Projects are scoped individually based on the goals, complexity and production requirements.",
    items: [
      {
        name: "AI Commercials",
        price: "From €300",
        description: "AI-powered commercial production, from concept to final film.",
      },
      {
        name: "Web Design & Development",
        price: "From €700",
        description: "Custom websites designed and developed around your business.",
      },
      {
        name: "Custom Projects",
        price: "Let’s talk",
        description: "For larger, more complex or combined creative projects.",
      },
    ],
    ctaLead: "Have a project in mind?",
    ctaLabel: "Get in touch",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions you might have.",
    items: [
      {
        question: "What does an AI commercial include?",
        answer:
          "Depending on the project, production can include concept development, visual direction, AI generation, editing, sound design and final delivery. The exact scope is defined before production begins.",
      },
      {
        question: "How much does an AI commercial cost?",
        answer:
          "AI commercial projects start at €300. The final price depends on the concept, length, number of scenes, production complexity and required deliverables.",
      },
      {
        question: "How long does a project take?",
        answer:
          "Timelines depend on the scope of the project. Smaller productions can move quickly, while more complex concepts require additional development, generation and refinement.",
      },
      {
        question: "Can you create a website and a commercial together?",
        answer:
          "Yes. Web design, development and AI commercial production can be combined into one creative project when it makes sense for the brand.",
      },
      {
        question: "Do you work with clients outside Slovenia?",
        answer: "Yes. DRYPOINT is based in Slovenia and works with clients regardless of location.",
      },
      {
        question: "How do we start?",
        answer:
          "Send a message through the contact form with a short description of your project. We will discuss the idea, scope and next steps before anything is started.",
      },
    ],
  },

  closing: {
    about:
      "DRYPOINT is an independent creative studio led by Alen. Based in Slovenia, working with brands anywhere.",
    title: "Have a product worth filming?",
  },

  contact: {
    name: "Name",
    email: "Email",
    projectType: "Project type",
    message: "Message",
    // The option values stay in English because app/api/contact/route.ts
    // validates them against a fixed allowlist; only the labels are localised.
    projectTypes: [
      { value: "AI Commercial", label: "AI commercial" },
      { value: "Video Production", label: "Video production" },
      { value: "Website", label: "Website" },
      { value: "Not sure yet", label: "Not sure yet" },
    ],
    send: "Send message",
    sending: "Sending…",
    successTitle: "Message received.",
    successBody: "Thanks for reaching out. You will hear back within one business day.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Something went wrong. Please check your connection and try again.",
    invalid: "Please fill in the required fields and use a valid email address.",
  },

  footer: {
    blurb: "Independent creative studio for AI commercials, video production and digital work.",
    links: [
      { to: "/#work", label: "Work" },
      { to: "/#services", label: "Capabilities" },
      { to: "/#process", label: "Process" },
      { to: "/#digital", label: "Digital" },
      { to: "/#pricing", label: "Pricing" },
      { to: "/#contact", label: "Contact" },
    ],
    nav: "Footer",
    follow: "Follow",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    privacy: "Privacy",
  },

  caseStudy: {
    metaTitle: "Hiše Žilavec",
    metaDescription:
      "Case study: the website DRYPOINT built for a roofing, tinsmithing and prefab-home builder — two service lines and four house models, one inquiry path.",
    ogTitle: "Hiše Žilavec Case Study — DRYPOINT",
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

  // TODO: fill in the registered legal entity, business address and any
  // company/VAT number once confirmed, and replace the neutral wording in
  // "Who we are" and "Contact" below. Nothing here is invented — the data
  // categories come from app/api/contact/route.ts and the site currently sets
  // no cookies and runs no analytics.
  privacy: {
    metaTitle: "Privacy Policy",
    metaDescription:
      "How DRYPOINT handles the personal data you send through the contact form: what is collected, why, who processes it, and the rights you have under the GDPR.",
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: 22 August 2026",
    intro:
      "DRYPOINT is a digital design studio operating from Slovenia, within the European Union. This policy explains what personal data we receive when you contact us, why we hold it, and what you can ask us to do with it. It is written to be read, not to be survived.",
    sections: [
      {
        heading: "Who we are",
        body: [
          "DRYPOINT is the studio behind this website and is responsible for the personal data described here — the data controller, in the language of the GDPR.",
          "For anything relating to your data, write to hello@drypointcreative.com. We answer these directly; there is no ticketing system in between.",
        ],
      },
      {
        heading: "What we collect",
        body: [
          "Only what you type into the contact form: your name, your email address, the project type you select, and your message. Nothing else is required and nothing else is requested.",
          "This website sets no cookies, runs no analytics, and embeds no third-party trackers. There is no advertising pixel, no session recording, and no profiling of any kind.",
          "Our hosting provider processes standard server request data, such as IP addresses, as part of delivering the site securely. We do not use that data to identify or track individual visitors.",
        ],
      },
      {
        heading: "Why we hold it",
        body: [
          "To read your enquiry and reply to it, and — if we go on to work together — to carry out the steps leading to a contract.",
          "The lawful basis is our legitimate interest in responding to people who contact us, and, where a project follows, the pre-contractual and contractual steps you have asked us to take.",
        ],
      },
      {
        heading: "Who else sees it",
        body: [
          "The contact form delivers your message by email through Resend, our email delivery provider, to our own inbox. Resend processes the message solely to deliver it.",
          "This website is hosted on Vercel, which processes technical request data as part of serving the pages.",
          "We do not sell personal data, and we do not share it with anyone for marketing.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "Enquiries stay in our inbox for as long as they are useful — while we are in conversation, and for the duration of any project that follows, plus the period we are required to keep business records.",
          "If you would rather we deleted your message sooner, ask and we will.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Under the GDPR you can ask us for a copy of the data we hold about you, ask us to correct it, ask us to delete it, ask us to restrict how we use it, ask for it in a portable format, or object to our using it at all.",
          "Write to hello@drypointcreative.com and we will act on it. You do not need to give a reason.",
          "If you are not satisfied with how we have handled your request, you may lodge a complaint with the Slovenian Information Commissioner (Informacijski pooblaščenec) or with the supervisory authority in your own country.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "If this policy changes, the revised version appears on this page with a new date at the top. We do not change it retroactively.",
        ],
      },
    ],
  },
};
