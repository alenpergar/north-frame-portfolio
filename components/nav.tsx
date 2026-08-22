"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { SectionNav } from "@/components/ui/section-nav";
import { localePath, locales, type Dict, type Locale } from "@/lib/i18n";

type NavProps = {
  dict: Dict;
  locale: Locale;
  /**
   * The locale-independent route this page lives at — "/" for the homepage,
   * "/work/hise-zilavec" for the case study. The language switcher uses it to
   * build the matching href in the other language, so switching keeps you on
   * the same page instead of dropping you back at the homepage.
   */
  path: string;
  showSectionNav?: boolean;
};

// EN / SL, styled from the eyebrow type already used across the site: no new
// colours, sizes or components.
function LanguageSwitcher({
  locale,
  path,
  dict,
  className,
  onNavigate,
}: {
  locale: Locale;
  path: string;
  dict: Dict;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <div
      className={clsx("flex items-center gap-2", className)}
      aria-label={dict.nav.languageLabel}
    >
      {locales.map((code, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 ? (
            <span className="text-border" aria-hidden>
              /
            </span>
          ) : null}
          <Link
            href={localePath(code, path)}
            hrefLang={code}
            aria-current={code === locale ? "true" : undefined}
            onClick={onNavigate}
            className={clsx(
              "text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
              code === locale ? "text-ink" : "text-ink-muted hover:text-ink"
            )}
          >
            {code}
          </Link>
        </span>
      ))}
    </div>
  );
}

export function Nav({ dict, locale, path, showSectionNav = true }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={clsx(
          "relative z-50 transition-all duration-300",
          scrolled
            ? "bg-bg/80 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="container-px mx-auto flex max-w-content items-center justify-between py-4">
          <Logo href={localePath(locale, "/")} />

          {/* Hidden once the vertical rail takes over at 1400px, so only one
              navigation is ever present for pointer and assistive tech alike. */}
          <ul className="hidden md:flex min-[1400px]:hidden items-center gap-4 lg:gap-9 text-sm text-ink-muted">
            {dict.nav.links.map((link) => (
              <li key={link.to}>
                <Link
                  href={localePath(locale, link.to)}
                  className="whitespace-nowrap transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-5 shrink-0">
            <LanguageSwitcher locale={locale} path={path} dict={dict} />
            <Button
              as="a"
              href={localePath(locale, "/#contact")}
              variant="primary"
              className="whitespace-nowrap text-xs md:px-4 md:py-2.5 lg:px-6 lg:py-3"
            >
              {dict.nav.cta}
            </Button>
          </div>

          {/* The wordmark already fills the narrow header, so the switcher
              lives inside the mobile menu instead of beside the toggle —
              adding it here pushed the row past 375px. */}
          <button
            type="button"
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center text-ink"
          >
            {menuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 top-0 z-40 h-dvh bg-bg"
            >
              <motion.ul
                className="container-px flex h-full flex-col justify-center gap-6 pb-24"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
              >
                {dict.nav.links.map((link) => (
                  <motion.li
                    key={link.to}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={localePath(locale, link.to)}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-4xl italic text-ink"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="pt-4"
                >
                  <Button
                    as="a"
                    href={localePath(locale, "/#contact")}
                    variant="primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {dict.nav.cta}
                  </Button>
                </motion.li>
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="pt-2"
                >
                  <LanguageSwitcher
                    locale={locale}
                    path={path}
                    dict={dict}
                    onNavigate={() => setMenuOpen(false)}
                  />
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {showSectionNav ? <SectionNav dict={dict} locale={locale} /> : null}
    </>
  );
}
