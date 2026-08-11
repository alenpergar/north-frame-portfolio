"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
];

export function Nav() {
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
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container-px mx-auto flex max-w-content items-center justify-between py-4">
        <Logo />

        <ul className="hidden md:flex items-center gap-4 lg:gap-9 text-sm text-ink-muted">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block shrink-0">
          <Button
            as="a"
            href="/#contact"
            variant="primary"
            className="whitespace-nowrap text-xs md:px-4 md:py-2.5 lg:px-6 lg:py-3"
          >
            Start a Project
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
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
              {LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
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
                  href="/#contact"
                  variant="primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Start a Project
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
