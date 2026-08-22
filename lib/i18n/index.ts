import { en } from "./en";
import { sl } from "./sl";
import type { Dict } from "./types";

export type { Dict, Title } from "./types";

export const locales = ["en", "sl"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dict> = { en, sl };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

/**
 * Turns a locale-independent route into the real href for a locale.
 *
 * English is the default and keeps the bare paths, so `/` and
 * `/work/hise-zilavec` are untouched. Slovenian is served from the `/sl`
 * prefix, and hash-only routes have to fold into it without an extra slash —
 * `/#work` becomes `/sl#work`, not `/sl/#work`, which would not resolve.
 */
export function localePath(locale: Locale, to: string): string {
  if (locale === defaultLocale) return to;
  if (to === "/") return "/sl";
  if (to.startsWith("/#")) return `/sl${to.slice(1)}`;
  return `/sl${to}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "sl" : "en";
}

/** The `lang` attribute and OpenGraph locale for each language. */
export const htmlLang: Record<Locale, string> = { en: "en", sl: "sl" };
export const ogLocale: Record<Locale, string> = { en: "en_US", sl: "sl_SI" };
