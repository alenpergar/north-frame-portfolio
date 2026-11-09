"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Within one page load: a client-side return to this page (from the case
// study, say) does not replay it. Across loads, SESSION_KEY below decides.
let played = false;

/** Once per browser session: a reload or a new tab in the same session does
 *  not replay the intro. Versioned so a future change can start clean. */
export const SESSION_KEY = "drypoint:intro:v1";

/**
 * Runs before the overlay paints, so a visitor who has already seen the
 * intro this session never catches a frame of it. Inlined by SellPage ahead
 * of <Loader>; the matching rule is html[data-intro="done"] in sell.css.
 * Wrapped in try/catch because sessionStorage throws in some privacy modes.
 */
export const INTRO_FLAG_SCRIPT = `try{if(sessionStorage.getItem(${JSON.stringify(
  SESSION_KEY
)}))document.documentElement.dataset.intro="done"}catch(e){}`;

function alreadyPlayed() {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== null;
  } catch {
    // Privacy mode, or storage disabled: fall back to once per page load.
    return false;
  }
}

function remember() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* Nothing to do: `played` still covers this page load. */
  }
}

const MIN_MS = 2000; // the glitch sequence has resolved and settled by then
const MIN_MS_REDUCED = 500;
const MAX_MS = 6000; // never hold the page longer than this

// A fixed horizontal kick per letter as it resolves, never random: the
// server and the client have to render the same thing, and a set pattern
// reads as deliberate rather than noisy.
const SHIFT = [-13, 9, -7, 14, -11, 7, -15, 10];

// Two offset colour ghosts under the real row. Painted first so the clean
// wordmark always sits on top.
const LAYERS = ["a", "b", "main"] as const;

/**
 * The opening: the wordmark resolves out of a short, controlled glitch —
 * letters clip in a beat apart, three snapped horizontal displacements, two
 * offset colour ghosts that are gone before the end — while a counter shows
 * how far the page has actually loaded (document, fonts, window load). Then
 * the screen lifts away. The last frame is the clean wordmark.
 *
 * Purely visual (aria-hidden); the page underneath is in the DOM the whole
 * time, so nothing about the intro delays or blocks it. Without JavaScript
 * it never shows (noscript style), and a CSS failsafe clears it even if this
 * script were to fail.
 */
export function Loader({ word, label }: { word: string; label: string }) {
  const [phase, setPhase] = useState<"run" | "exit" | "done">(() => (played ? "done" : "run"));
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (phase !== "run") return;
    // Seen this session already: clear it before anything is locked or
    // timed. The inline script has kept it off screen; this unmounts it.
    if (alreadyPlayed()) {
      played = true;
      setPhase("done");
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion: no glitch, no wait. (CSS already hides the screen for
    // these visitors; this also releases the page at once.)
    if (reduce) {
      played = true;
      remember();
      setPhase("done");
      return;
    }
    const min = reduce ? MIN_MS_REDUCED : MIN_MS;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const t0 = performance.now();
    let target = 12;
    let shown = 0;
    let last = t0;
    let timer = 0;
    let finished = false;
    const timers: number[] = [];
    const bump = (v: number) => {
      target = Math.max(target, v);
    };

    if (document.readyState !== "loading") bump(40);
    document.fonts?.ready.then(() => bump(65)).catch(() => bump(65));
    const onLoad = () => bump(100);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    timers.push(window.setTimeout(() => bump(100), MAX_MS));

    const tick = () => {
      const now = performance.now();
      const elapsed = now - t0;
      const dt = now - last;
      last = now;
      // Keep moving while waiting on the next milestone, but never claim more
      // than 90 % before the page has really loaded.
      if (target < 100) target = Math.max(target, Math.min(90, (elapsed / MAX_MS) * 90));
      // The counter cannot finish before the letters have landed.
      const cap = target >= 100 ? Math.min(100, (elapsed / min) * 100) : target;
      // Eased by elapsed time, not by tick count, so a throttled timer (a
      // background tab ticks about once a second) still arrives on time.
      shown += (cap - shown) * (1 - Math.exp(-dt / 130)) + dt * 0.01;
      shown = Math.min(shown, cap);
      // Hard stop: whatever happens, the page is handed over after this.
      if (elapsed > MAX_MS + 1000) shown = 100;
      const value = Math.round(shown);
      if (num.current) num.current.textContent = `${value} %`;
      if (bar.current) bar.current.style.transform = `scaleX(${shown / 100})`;
      if (value >= 100 && !finished) {
        finished = true;
        timers.push(window.setTimeout(() => setPhase("exit"), reduce ? 100 : 350));
        return;
      }
      timer = window.setTimeout(tick, 16);
    };
    // A timer rather than requestAnimationFrame: it also runs where frames
    // are not produced (headless renderers), so the screen always clears.
    timer = window.setTimeout(tick, 16);

    return () => {
      clearTimeout(timer);
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
      root.style.overflow = prevOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const id = window.setTimeout(() => {
      played = true;
      remember();
      setPhase("done");
    }, 900);
    return () => clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <>
      <noscript>
        <style>{`.sell-loader{display:none}`}</style>
      </noscript>
      <div className="sell-loader" data-phase={phase} aria-hidden="true">
        <p className="sell-loader-word">
          {LAYERS.map((layer) => (
            <span key={layer} className="sell-loader-row" data-layer={layer}>
              {Array.from(word).map((ch, i) => (
                <span
                  key={i}
                  style={{ "--i": i, "--dx": `${SHIFT[i % SHIFT.length]}px` } as CSSProperties}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </p>
        <div className="sell-loader-meter">
          <p className="flex items-baseline justify-between text-[14px] text-[var(--muted)]">
            <span>{label}</span>
            <span ref={num} className="tabular-nums text-[var(--fg)]">
              0 %
            </span>
          </p>
          <span className="mt-3 block h-px w-full bg-[var(--rule)]">
            <span ref={bar} className="block h-px w-full origin-left scale-x-0 bg-[var(--accent)]" />
          </span>
        </div>
      </div>
    </>
  );
}
