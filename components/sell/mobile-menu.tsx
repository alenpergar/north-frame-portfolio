"use client";

import { useEffect, useId, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";

type Item = { href: string; label: string };

/**
 * Below md the header's anchors move into a panel under the header. The
 * button's aria-expanded and the panel's visibility change together; a link,
 * Escape or a resize to desktop closes it, and focus returns to the button.
 */
export function MobileMenu({
  items,
  cta,
  labels,
}: {
  items: Item[];
  cta: Item;
  labels: { open: string; close: string };
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 flex h-11 w-11 items-center justify-center text-[var(--fg)]"
      >
        {open ? <X size={24} aria-hidden /> : <List size={24} aria-hidden />}
      </button>

      <div
        id={id}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-[var(--rule)] bg-[var(--bg)]"
      >
        <nav aria-label="Mobilna navigacija" className="container-px flex min-h-full flex-col pb-10 pt-6">
          <ul className="divide-y divide-[var(--rule)] border-b border-[var(--rule)]">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[60px] items-center text-[26px] font-medium tracking-[-0.02em] text-[var(--fg)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--accent)] px-6 text-[16px] font-medium text-[var(--bg)]"
          >
            {cta.label}
          </a>
        </nav>
      </div>
    </div>
  );
}
