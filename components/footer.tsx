"use client";

import Link from "next/link";
import { ArrowUp, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { Logo } from "@/components/ui/logo";
import { localePath, type Dict, type Locale } from "@/lib/i18n";

const SOCIALS = [
  { href: "https://www.instagram.com/drypointcreative/", label: "Instagram", icon: InstagramLogo },
  { href: "https://www.linkedin.com/in/alenpergar", label: "LinkedIn", icon: LinkedinLogo },
];

export function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const t = dict.footer;
  return (
    <footer className="border-t border-border py-16">
      <div className="container-px mx-auto max-w-content">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo height={28} href={localePath(locale, "/")} />
            <p className="mt-4 text-sm text-ink-muted leading-relaxed">
              {t.blurb}
            </p>
          </div>

          <nav aria-label={t.nav}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-ink-muted sm:flex sm:flex-col">
              {t.links.map((link) => (
                <li key={link.to}>
                  <Link
                    href={localePath(locale, link.to)}
                    className="transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm text-ink-muted">{t.follow}</p>
            <div className="mt-3 flex gap-4">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-ink-muted sm:justify-start">
            <p>
              &copy; {new Date().getFullYear()} DRYPOINT. {t.rights}
            </p>
            <Link
              href={localePath(locale, "/privacy")}
              className="transition-colors hover:text-ink"
            >
              {t.privacy}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-xs text-ink-muted transition-colors hover:text-accent"
          >
            {t.backToTop}
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
