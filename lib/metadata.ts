import type { Metadata } from "next";
import { getDict, localePath, ogLocale, type Locale } from "@/lib/i18n";

/** Production origin. The single source for every absolute URL (metadata, JSON-LD). */
export const SITE = "https://www.drypointcreative.com";

// Site-level copy lives here rather than in the page dictionary: it describes
// the document, not anything rendered on screen. Positioning (2026-09): AI
// commercials and video production first, premium web design and development
// second. Titles are the ones the owner specified.
const site: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  en: {
    title: "AI Commercials & Premium Websites — DRYPOINT",
    description:
      "DRYPOINT is an independent creative studio for AI commercials, video production and premium web design and development, based in Slovenia.",
    ogDescription:
      "AI commercials, video production and premium websites from an independent creative studio.",
  },
  sl: {
    title: "AI oglasi in vrhunske spletne strani — DRYPOINT",
    description:
      "DRYPOINT je neodvisen kreativni studio za AI oglase, video produkcijo ter oblikovanje in izdelavo vrhunskih spletnih strani, s sedežem v Sloveniji.",
    ogDescription:
      "AI oglasi, video produkcija in vrhunske spletne strani neodvisnega kreativnega studia.",
  },
};

/** The other locale's Open Graph code, for og:locale:alternate. */
const otherOgLocale = (locale: Locale) => ogLocale[locale === "en" ? "sl" : "en"];

/**
 * Both locales describe the same pages, so every page advertises the other
 * language through `alternates.languages`. `x-default` points at English,
 * which is the site's default. Each caller sets its own locale's canonical;
 * `localePath` stays the single source of truth for every URL.
 */
function alternates(path: string) {
  return {
    languages: {
      en: localePath("en", path),
      sl: localePath("sl", path),
      "x-default": localePath("en", path),
    },
  };
}

export function siteMetadata(locale: Locale): Metadata {
  const s = site[locale];

  return {
    metadataBase: new URL(SITE),
    title: { default: s.title, template: "%s — DRYPOINT" },
    description: s.description,
    alternates: {
      ...alternates("/"),
      canonical: localePath(locale, "/"),
    },
    openGraph: {
      title: s.title,
      description: s.ogDescription,
      siteName: "DRYPOINT",
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: otherOgLocale(locale),
      url: localePath(locale, "/"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: s.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.ogDescription,
      images: ["/og-image.png"],
    },
  };
}

export function caseStudyMetadata(locale: Locale): Metadata {
  const t = getDict(locale).caseStudy;
  const path = "/work/hise-zilavec";

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      ...alternates(path),
      canonical: localePath(locale, path),
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      type: "article",
      locale: ogLocale[locale],
      alternateLocale: otherOgLocale(locale),
      url: localePath(locale, path),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t.ogTitle,
        },
      ],
    },
    // Set explicitly rather than inherited: without this block the page would
    // fall back to the root layout's Twitter card (the homepage title and copy).
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.ogDescription,
      images: ["/og-image.png"],
    },
  };
}

export function privacyMetadata(locale: Locale): Metadata {
  const t = getDict(locale).privacy;
  const path = "/privacy";
  // The document <title> gets "— DRYPOINT" from the layout's title template;
  // the social title carries the same suffix so a shared link reads the same.
  const socialTitle = `${t.metaTitle} — DRYPOINT`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      ...alternates(path),
      canonical: localePath(locale, path),
    },
    openGraph: {
      title: socialTitle,
      description: t.metaDescription,
      type: "article",
      locale: ogLocale[locale],
      alternateLocale: otherOgLocale(locale),
      url: localePath(locale, path),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    // As above: set explicitly so this page does not inherit the homepage's
    // Twitter card from the root layout.
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: t.metaDescription,
      images: ["/og-image.png"],
    },
  };
}
