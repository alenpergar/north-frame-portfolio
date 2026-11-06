import { en } from "./en";
import { sl } from "./sl";
import type { Dict } from "./types";

export type { Dict, Title } from "./types";

export const locales = ["sl", "en"] as const;
export type Locale = (typeof locales)[number];

/**
 * Slovenian is the studio's primary language (decided 2026-11-06): the bare
 * domain serves Slovenian, and English lives under `/en`. The previous
 * arrangement was the other way round; `/sl` now redirects permanently to the
 * matching root path (see next.config.ts).
 */
export const defaultLocale: Locale = "sl";

const dictionaries: Record<Locale, Dict> = { en, sl };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

/**
 * Turns a locale-independent route into the real href for a locale.
 *
 * Slovenian is the default and keeps the bare paths, so `/` and
 * `/work/hise-zilavec` are untouched. English is served from the `/en`
 * prefix, and hash-only routes have to fold into it without an extra slash —
 * `/#pricing` becomes `/en#pricing`, not `/en/#pricing`, which would not
 * resolve.
 */
export function localePath(locale: Locale, to: string): string {
  if (locale === defaultLocale) return to;
  if (to === "/") return "/en";
  if (to.startsWith("/#")) return `/en${to.slice(1)}`;
  return `/en${to}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "sl" : "en";
}

/** The `lang` attribute and OpenGraph locale for each language. */
export const htmlLang: Record<Locale, string> = { en: "en", sl: "sl" };
export const ogLocale: Record<Locale, string> = { en: "en_US", sl: "sl_SI" };
