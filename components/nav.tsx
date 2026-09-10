"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import clsx from "clsx";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { SectionNav } from "@/components/ui/section-nav";
import { EASE_OUT } from "@/lib/motion";
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
              // A 44x40 invisible hit area is centred on the label with a
              // pseudo-element, so the touch target is adequate without moving
              // or resizing anything that shows.
              "relative inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              "before:absolute before:left-1/2 before:top-1/2 before:h-11 before:w-10 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
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
  const shouldReduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // One Framer-managed scroll source drives both the backdrop state and the
  // hide-on-scroll-down / reveal-on-scroll-up behaviour. No manual listener.
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    if (shouldReduce || menuOpen) {
      setHidden(false);
      return;
    }
    const delta = y - lastY.current;
    if (Math.abs(delta) < 6) return;
    // Always show near the top; below that, follow scroll direction.
    setHidden(y > 140 && delta > 0);
    lastY.current = y;
  });

  // Mobile menu: lock scroll, take the rest of the page out of the tab order
  // and the a11y tree, trap Tab within the menu, close on Escape, and hand
  // focus back to the toggle on close.
  useEffect(() => {
    if (!menuOpen) return;

    // The toggle button never remounts, so capturing it once is safe and keeps
    // the cleanup honest for the exhaustive-deps lint.
    const toggle = menuButtonRef.current;
    document.body.style.overflow = "hidden";

    const backdrops = [
      document.querySelector("main"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el instanceof HTMLElement);
    backdrops.forEach((el) => el.setAttribute("inert", ""));

    const getFocusable = () => {
      const list: HTMLElement[] = [];
      if (toggle) list.push(toggle);
      const panel = menuPanelRef.current;
      if (panel) {
        list.push(
          ...Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        );
      }
      return list;
    };

    // Land focus on the first menu link rather than the close button.
    const initial = getFocusable();
    (initial[1] ?? initial[0])?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const list = getFocusable();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (active && !list.includes(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      backdrops.forEach((el) => el.removeAttribute("inert"));
      // The toggle is what opened the menu and is back in the same spot as the
      // "open menu" control, so it is the correct place to return focus.
      toggle?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        // Reveal the moment anything inside it takes keyboard focus, so a
        // hidden bar can never trap a tabbing user.
        onFocusCapture={() => setHidden(false)}
        animate={{ y: hidden ? "-102%" : "0%" }}
        transition={{ duration: shouldReduce ? 0 : 0.42, ease: EASE_OUT }}
        className={clsx(
          "sticky top-0 z-50 transition-[background-color,border-color] duration-300",
          scrolled
            ? "bg-bg/80 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="container-px mx-auto flex max-w-content items-center justify-between py-4">
          <Logo href={localePath(locale, "/")} />

          {/* Handoff at 880px, not md/768: at 768 the full row (logo + links +
              switcher + CTA) is ~25px wider than the viewport and forces a
              horizontal scroll, which the sticky header now keeps on screen.
              Hidden again once the vertical rail takes over at 1400px, so only
              one navigation is ever present for pointer and assistive tech. */}
          <ul className="hidden min-[880px]:flex min-[1400px]:hidden items-center gap-4 lg:gap-9 text-sm text-ink-muted">
            {dict.nav.links.map((link) => (
              <li key={link.to}>
                <Link
                  href={localePath(locale, link.to)}
                  className="relative whitespace-nowrap py-1 transition-colors duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-[280ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden min-[880px]:flex items-center gap-5 shrink-0">
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
            id="nav-menu-toggle"
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="nav-menu-panel"
            onClick={() => setMenuOpen((v) => !v)}
            className="min-[880px]:hidden inline-flex h-11 w-11 items-center justify-center text-ink"
          >
            {menuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Rendered as a sibling of the header, not a child: the header gains a
          backdrop-filter when scrolled, which would otherwise make this
          fixed overlay position against the header box instead of the
          viewport. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nav-menu-panel"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="nav-menu-toggle"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            // Drop pointer events the instant it starts closing, so a click
            // during the fade-out (or a fade-out frozen by a backgrounded tab)
            // goes straight to the page instead of being caught by the overlay.
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: shouldReduce ? 0 : 0.25 }}
            className="min-[880px]:hidden fixed inset-0 top-0 z-40 h-dvh bg-bg"
          >
            <motion.ul
              className="container-px flex h-full flex-col justify-center gap-6 pb-24"
              // Reduced motion: items are present the moment the menu opens,
              // no stagger and no slide to sit through.
              initial={shouldReduce ? false : "hidden"}
              animate="visible"
              variants={{
                visible: {
                  transition: shouldReduce
                    ? {}
                    : { staggerChildren: 0.06, delayChildren: 0.1 },
                },
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

      {showSectionNav ? <SectionNav dict={dict} locale={locale} /> : null}
    </>
  );
}
