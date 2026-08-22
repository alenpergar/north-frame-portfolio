import type { Metadata } from "next";
import { getDict, localePath, ogLocale, type Locale } from "@/lib/i18n";

const SITE = "https://www.drypointcreative.com";

// Site-level copy lives here rather than in the page dictionary: it describes
// the document, not anything rendered on screen.
const site: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  en: {
    title: "DRYPOINT — Premium Digital Design Studio",
    description:
      "DRYPOINT is a premium digital design studio crafting high-end websites, landing pages, and AI-powered creative experiences for brands that refuse to look ordinary.",
    ogDescription:
      "High-end websites, landing pages, and AI-powered creative experiences.",
  },
  sl: {
    title: "DRYPOINT — Vrhunski studio za digitalno oblikovanje",
    description:
      "DRYPOINT je vrhunski studio za digitalno oblikovanje, ki ustvarja spletne strani, pristajalne strani in AI-podprte kreativne izkušnje za znamke, ki nočejo izgledati povprečno.",
    ogDescription:
      "Vrhunske spletne strani, pristajalne strani in AI-podprte kreativne izkušnje.",
  },
};

/**
 * Both locales describe the same two pages, so every page advertises the other
 * language through `alternates.languages`. `x-default` points at English,
 * which is the site's default.
 */
function alternates(path: string) {
  return {
    canonical: localePath("en", path) === path ? path : path,
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
      url: localePath(locale, path),
    },
  };
}
