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
    title: ["Websites for businesses", "that want more."],
    primary: "Start a project",
    secondary: "View projects",
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
    title: "From first conversation to launch.",
    items: [
      {
        title: "Business websites",
        description:
          "Custom-built business websites designed for clarity, speed and a professional first impression. Combining thoughtful design, clear structure and reliable performance across all devices.",
      },
      {
        title: "Landing pages",
        description:
          "Focused, high-conversion single pages for small businesses, sole traders and individual offers, built around one goal and a clear path to action.",
      },
      {
        title: "Redesign & optimisation",
        description:
          "Updating an existing website with a more modern look, clearer structure and improved user experience. Special attention is given to mobile devices, loading speed and ease of use.",
      },
    ],
  },

  process: {
    title: "How a website gets made.",
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
    title: "Clear prices. No surprises.",
    description:
      "Every package includes one language, two rounds of revisions and 14 days of post-launch support. You know the price before any work begins.",
    items: [
      {
        name: "START",
        price: "€200",
        pages: "1 page",
        description:
          "For small businesses and sole traders who need a clear online presence.",
        features: [
          "One-page website",
          "Modern, responsive design",
          "Optimised for phones and tablets",
          "Contact details and links",
          "Contact form",
          "Basic Google optimisation (titles, descriptions, speed)",
          "Basic cookie notice and technical setup",
          "Two rounds of revisions before launch",
          "14 days of post-launch support (technical fixes)",
        ],
      },
      {
        name: "BUSINESS",
        price: "€350",
        pages: "up to 5 pages",
        badge: "Most popular",
        description: "For businesses that need a more complete and professional website.",
        inherits: "Everything in START, plus:",
        features: [
          "Up to 5 pages",
          "Custom design",
          "Location map (Google Maps)",
          "Social media links",
          "Advanced performance optimisation",
        ],
      },
      {
        name: "PREMIUM",
        price: "€550",
        pages: "up to 10 pages",
        description: "For businesses that want a more advanced and comprehensive website.",
        inherits: "Everything in BUSINESS, plus:",
        features: [
          "Up to 10 pages",
          "Premium custom design",
          "Advanced animations and interactions",
          "Extended search engine optimisation",
          "Additional custom sections and functionality",
        ],
      },
    ],
    languageAddon: {
      title: "Additional language",
      description:
        "The fee applies per additional language, not per page. An additional language means translating and laying out all the copy on the site in one more language version.",
      priceNote: "+ €50 per additional language",
      examples: [
        { combination: "Slovenian only", price: "included" },
        { combination: "Slovenian + English", price: "+ €50" },
        { combination: "Slovenian + German", price: "+ €50" },
        { combination: "Slovenian + English + German", price: "+ €100" },
      ],
    },
    ctaLead: "Have a project in mind?",
    ctaLabel: "Get in touch",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions you might have.",
    items: [
      {
        question: "What is a free concept?",
        answer:
          "A free concept is a visual preview of your homepage that we prepare before you order. It lets you see our design direction for your business before you commit to anything. The concept is free and carries no obligation to order.",
      },
      {
        question: "What do you need from me to get started?",
        answer:
          "You provide the copy and content for the site. Beyond that we need basic details about your business, your logo if you have one, and photographs. Copywriting can be arranged separately, as a paid service.",
      },
      {
        question: "How long does it take?",
        answer:
          "A one-page site is usually ready sooner than a multi-page one. We agree a specific timeline at the start, based on scope and how quickly reviews come back from your side.",
      },
      {
        question: "How many rounds of revisions are included?",
        answer:
          "Every package includes two rounds of revisions before launch. Changes that go beyond the agreed scope are quoted separately.",
      },
      {
        question: "Are a domain and hosting included in the price?",
        answer:
          "No. You own the domain and hosting account and pay the provider directly. Help with the initial connection and basic setup is included.",
      },
      {
        question: "What does post-launch support cover?",
        answer:
          "Every package includes 14 days of support after launch, covering only the fixing of technical errors in the delivered website. It does not cover design changes, new content or additional functionality — those are quoted separately.",
      },
      {
        question: "Do you offer monthly maintenance?",
        answer:
          "Monthly maintenance is not included in any package. If you need it, it can be arranged separately. The build itself is a one-time payment, with no mandatory monthly subscription.",
      },
      {
        question: "What does an additional language mean?",
        answer:
          "Each package includes one language version. The €50 fee applies per additional language, not per page.",
      },
      {
        question: "What about cookies and GDPR?",
        answer:
          "Sites are prepared with a basic cookie notice and technical setup that supports compliance. This is not legal advice and does not replace a legal review.",
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
    title: "Have a business worth a better website?",
  },

  contact: {
    name: "Name",
    email: "Email",
    projectType: "Project type",
    message: "Message",
    // The option values stay in English because app/api/contact/route.ts
    // validates them against a fixed allowlist; only the labels are localised.
    projectTypes: [
      { value: "start", label: "START package (€200)" },
      { value: "business", label: "BUSINESS package (€350)" },
      { value: "premium", label: "PREMIUM package (€550)" },
      { value: "redesign", label: "Redesign of an existing site" },
      { value: "unsure", label: "Not sure yet" },
    ],
    send: "Send message",
    sending: "Sending…",
    successTitle: "Message received.",
    successBody: "Thanks for reaching out. We'll get back to you as soon as possible.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Something went wrong. Please check your connection and try again.",
    invalid: "Please fill in the required fields and use a valid email address.",
  },

  footer: {
    blurb: "Independent studio building modern, clear and responsive websites for businesses.",
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
