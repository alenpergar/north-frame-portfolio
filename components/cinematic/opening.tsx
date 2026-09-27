"use client";

import { useEffect, useState } from "react";
import { motion, useAnimate, useTransform } from "framer-motion";
import { CinematicStage } from "@/components/cinematic/cinematic-stage";
import { useScrollTimeline } from "@/components/cinematic/scroll-timeline-provider";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import { EASE_OUT } from "@/lib/motion";

// High enough above the centred rest position that the drop still reads as
// "from height", but close enough that the wordmark stays inside frame for
// most of the fall - -640 put it off-screen for roughly the first half of
// the fall's own duration, which read as "nothing, then it appears" rather
// than a visible drop.
const FALL_FROM = -420;

// A steep, custom ease-in reserved for this one fall: the site's shared
// EASE_IN (lib/motion.ts) is deliberately generic ("every exit"), and reusing
// it here made the drop read as a UI transition, not gravity. Slightly softer
// than the standard easeInCubic (0.55,0.055,0.675,0.19) at -420/650ms: that
// combination still cleared the frame within the first ~20% of the fall, so
// the start is even gentler here while the back half stays just as steep -
// the wordmark should be legible as "an object descending" from the first
// frame, not just fast at the very end.
const GRAVITY = [0.65, 0.02, 0.72, 0.2] as const;

const RELEASE_HOLD = 0.12; // s - "almost still" before the fall starts
const FALL_DURATION = 0.65;
const IMPACT_DURATION = 0.1;
const OVERSHOOT_DURATION = 0.05;
const SETTLE_DURATION = 0.22;

/**
 * Physical-impact intro: DRYPOINT is a heavy object released from height that
 * falls and hits the ground - not a logo fading or scaling into place. Real
 * text (Geist, extrabold), not the site's PNG wordmark: that asset is the
 * pre-rebrand Fraunces logotype (still used in Nav/Footer via
 * components/ui/logo.tsx) and its soft raster edges fall apart under the
 * heavy blur/scale this sequence needs. No other wordmark asset exists in the
 * project to reach for instead.
 *
 * release -> fall -> impact -> one small overshoot -> settle -> silence.
 * Built entirely on the existing Framer Motion install (useAnimate is part of
 * the framer-motion package already in package.json). Two independent
 * useAnimate scopes (wordmark, contact shadow) driven by one sequence so both
 * land on the same frame.
 *
 * The impact sequence runs once on mount, independent of scroll. Only the
 * recede below (exitOpacity/exitScale/exitY) reads the shared scroll timeline
 * (ScrollTimelineProvider, wrapping Opening+Lens+Hero).
 *
 * Reduced motion / not yet ready: the wordmark simply sits at rest (centred,
 * sharp, opacity 1, no shadow pulse) with no transform applied and no effect
 * scheduled - this is also the exact SSR/no-JS output, so there is nothing to
 * flash past.
 */
export function Opening() {
  const ready = useMotionReady();
  const [scope, animate] = useAnimate();
  const [shadowScope, animateShadow] = useAnimate();
  const progress = useScrollTimeline();
  const exitEnd = useOpeningExitEnd();

  // As the shared clock advances through Opening's own share of the
  // Opening+Lens+Hero range, the whole shot very subtly recedes - a hint of
  // camera drift, not a fade-out effect. Held at rest (no transform at all)
  // until motion is ready, matching the impact sequence's own reduced-motion
  // behaviour.
  const exitOpacity = useTransform(progress, [0, exitEnd], [1, 0.35]);
  const exitScale = useTransform(progress, [0, exitEnd], [1, 1.035]);
  const exitY = useTransform(progress, [0, exitEnd], [0, -28]);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;

    const sequence = async () => {
      const word = scope.current;
      const shadow = shadowScope.current;
      if (!word || !shadow || cancelled) return;

      // RELEASE: held high above frame, already sharp-cut (no fade-in). The
      // shadow starts at its quiet resting value, as if nothing has happened
      // yet - contact hasn't been made. scaleX/scaleY throughout, never the
      // `scale` shorthand: Framer composes them as separate transform
      // components, so mixing `scale` here with `scaleX`/`scaleY` later would
      // compound multiplicatively and the wordmark would never quite return
      // to a true 1:1 scale at rest.
      await Promise.all([
        animate(
          word,
          { y: FALL_FROM, opacity: 1, filter: "blur(0px)", scaleX: 0.96, scaleY: 0.96, rotate: 0, x: 0 },
          { duration: 0 }
        ),
        animate(shadow, { opacity: 0.16, scaleX: 0.7 }, { duration: 0 }),
      ]);
      if (cancelled) return;

      // FALL: slow to start, then hard acceleration (GRAVITY, not a shared UI
      // ease) - blur builds through the fastest part of the drop and clears
      // right as it lands. The shadow stays essentially inert; nothing is
      // "landing" yet from its point of view.
      await animate(
        word,
        { y: 0, scaleX: 0.985, scaleY: 0.985, filter: ["blur(0px)", "blur(4px)", "blur(0px)"] },
        { duration: FALL_DURATION, delay: RELEASE_HOLD, ease: GRAVITY }
      );
      if (cancelled) return;

      // IMPACT: vertical compression, horizontal expansion, a small
      // horizontal displacement, micro-rotation and a brief blur pulse, all
      // in one hit. The shadow snaps wider and darker at the same instant -
      // this is what actually sells "contact", more than the wordmark alone.
      await Promise.all([
        animate(
          word,
          { scaleX: 1.035, scaleY: 0.94, rotate: -0.6, x: -3, filter: ["blur(0px)", "blur(0.75px)", "blur(0px)"] },
          { duration: IMPACT_DURATION, ease: EASE_OUT }
        ),
        animate(shadow, { opacity: 0.4, scaleX: 1.08 }, { duration: IMPACT_DURATION, ease: EASE_OUT }),
      ]);
      if (cancelled) return;

      // One small overshoot - a correction, not a bounce - then settle.
      // Nothing moves after SETTLE_DURATION ends.
      await Promise.all([
        animate(word, { scaleX: 0.99, scaleY: 1.01, rotate: 0.15, x: -1 }, { duration: OVERSHOOT_DURATION }),
        animate(shadow, { opacity: 0.3, scaleX: 0.95 }, { duration: OVERSHOOT_DURATION }),
      ]);
      if (cancelled) return;
      await Promise.all([
        animate(word, { scaleX: 1, scaleY: 1, rotate: 0, x: 0 }, { duration: SETTLE_DURATION, ease: EASE_OUT }),
        animate(shadow, { opacity: 0.22, scaleX: 0.8 }, { duration: SETTLE_DURATION, ease: EASE_OUT }),
      ]);
    };

    sequence().catch((e) => console.error("[Opening] sequence failed", e));
    return () => {
      cancelled = true;
    };
  }, [ready, animate, animateShadow, scope, shadowScope]);

  return (
    <div aria-hidden className="-mt-[77px] overflow-hidden">
      {/* The -77px header offset lives here, not on CinematicStage below: a
          negative margin on a child shifts only where that child paints,
          not this wrapper's own box - so overflow-hidden here would still
          clip at the wrapper's unshifted top (77px) even though the content
          visually starts at 0. That silently ate the top ~77px of the fall
          (the wordmark is fully off-screen there, invisible, for no reason
          related to FALL_FROM) until this element itself carried the offset.

          The transform lives on the inner motion.div, not this
          overflow-hidden one: overflow-hidden never clips an element's own
          transformed box, only its children's - scale>1 here would otherwise
          widen the page's scrollWidth even though nothing looks out of place. */}
      <motion.div style={ready ? { opacity: exitOpacity, scale: exitScale, y: exitY } : undefined}>
        <CinematicStage className="flex h-[100dvh] flex-col items-center justify-center border-b border-border">
          <motion.p
            ref={scope}
            className="will-change-transform select-none text-center font-sans font-extrabold uppercase leading-none text-ink [font-size:clamp(2.75rem,12.5vw,6.25rem)] [letter-spacing:0.01em]"
          >
            DRYPOINT
          </motion.p>
          <motion.div
            ref={shadowScope}
            className="mt-6 h-3 w-[46%] rounded-[100%] bg-black opacity-[0.22] blur-md will-change-transform sm:mt-8"
          />
        </CinematicStage>
      </motion.div>
    </div>
  );
}

// ScrollTimelineProvider's progress spans the whole Opening+Lens+Hero
// wrapper (0 at its top, 1 once Hero has fully passed too), not just Opening.
// Opening and Lens are both a fixed 100dvh; Hero is roughly another full
// viewport on desktop but noticeably shorter on mobile (aspect-[4/5] vs.
// min-h-dvh), so the fraction of that shared range belonging to Opening
// itself differs by breakpoint. This mirrors the existing
// matchMedia("(min-width: 768px)") check already used in hero.tsx - no
// scroll listener, just a resize-driven boolean.
function useOpeningExitEnd() {
  const [exitEnd, setExitEnd] = useState(0.5);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setExitEnd(mq.matches ? 0.5 : 0.62);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return exitEnd;
}
