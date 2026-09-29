/**
 * Copy for THE PLAN that the live dictionary does not have. Nothing here is
 * new writing: it is the studio's own web-design copy from the site as it was
 * on 2026-09-11 (git 3a5f0f1, lib/i18n/en.ts), kept verbatim apart from the
 * house style (no em dashes) and one removed promise (see DELIVER). Strings the
 * live dictionary does have are passed in from it by the page, not copied here.
 * English only for now; the lab page is not localised.
 */

/** HOME: hero.body, second sentence. */
export const HOME_LINE = "Every project starts from a blank plate, never a template.";

/** WORK: concept sites (work.conceptsTitle), and the concepts' descriptions (work.concepts, first sentence). */
export const CONCEPT_NOTE = "Self-initiated work, built to the same standard.";
export const CONCEPT_TEXT: Record<string, string> = {
  lumiere: "A premium private dental clinic website focused on trust, patient experience, and modern healthcare design.",
  aurelia: "A premium restaurant website designed to showcase the dining experience, atmosphere, and brand identity.",
  // the archived line is the fictional client's own slogan, so only the field
  nova: "Fitness coaching",
};

/**
 * PROCESS: process.steps. DELIVER ended "and a short support window to make
 * sure the site performs as designed"; no current copy (pricing, FAQ, case
 * study) offers a support window, so the promise is left out.
 */
export const PROCESS_TEXT: Record<string, string> = {
  Discover: "We learn the brand, the audience, and the goal behind the project before a single pixel is placed.",
  Define: "Scope, sitemap, and creative direction are agreed on paper first. No surprises mid-build.",
  Design: "High-fidelity design across every breakpoint, reviewed together in structured rounds.",
  Develop: "Production-grade build in Next.js: fast, accessible, and animated with intent.",
  Deliver: "Launch and handoff.",
};

/** ABOUT: founder. The second founder paragraph refers to a section that no longer exists, so it is left out. */
export const ABOUT = {
  lead: "I’m Alen. DRYPOINT is a one-person studio, by design.",
  body: "You talk to the person who designs the site, writes the build, and presses deploy. No account manager relaying your feedback, no waiting three days for an answer to a two-minute question.",
  location: "Based in Slovenia. Working with clients anywhere.",
  photo: "/images/alen.jpg",
  photoAlt: "Alen",
};

/** CONTACT: contact.title and contact.description. */
export const CONTACT_COPY = {
  title: "Let’s build something premium.",
  text: "Tell us about your project and we’ll reply within one business day. Prefer email? Reach us directly below.",
};

/** The two contact-form options that fit a website inquiry; both are on /api/contact's allowlist. */
export const FORM_TYPES = ["Website", "Not sure yet"];
