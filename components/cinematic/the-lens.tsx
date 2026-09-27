"use client";

import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { CinematicStage } from "@/components/cinematic/cinematic-stage";
import { useScrollTimeline } from "@/components/cinematic/scroll-timeline-provider";
import { AmbientVideo } from "@/components/video/ambient-video";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import { theLensLoop, theLensPoster } from "@/lib/media";

// Same breakpoint-driven checkpoint as Opening's own exit (see opening.tsx):
// the shared progress spans Opening+Lens+Hero, and Hero's height relative to
// a viewport differs by breakpoint (min-h-dvh desktop vs. a shorter
// aspect-[4/5] on mobile), so the point at which Lens fully fills the frame
// moves too. Duplicated rather than shared: two small, independently
// readable numbers beat a cross-file abstraction for this.
function useLensPeak() {
  const [peak, setPeak] = useState(0.5);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPeak(mq.matches ? 0.5 : 0.63);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return peak;
}

/**
 * The macro lens rack-focus shot: the frame the user scrolls through between
 * the DRYPOINT impact and Hero. A silent, looping AmbientVideo over its
 * poster (the existing one-video-at-a-time PlaybackProvider hands off
 * between Opening's neighbours and Hero's own loop automatically as the
 * user scrolls - nothing new to orchestrate here).
 *
 * Visually it enters and recedes using the exact opacity/scale/y vocabulary
 * Opening's own exit already established (0.35 opacity floor, 1.035 scale
 * ceiling, 28px drift), so both shots read as one continuous camera move
 * rather than two independent effects. Playback itself is untouched by
 * scroll - only the reveal is; the video always just loops at 1x.
 */
export function TheLens() {
  const ready = useMotionReady();
  const progress = useScrollTimeline();
  const peak = useLensPeak();

  const enterStart = Math.max(0, peak - 0.4);
  const exitEnd = Math.min(1, peak + 0.4);

  const opacity = useTransform(progress, [enterStart, peak, exitEnd], [0.35, 1, 0.35]);
  const scale = useTransform(progress, [enterStart, peak, exitEnd], [1.035, 1, 1.035]);
  const y = useTransform(progress, [enterStart, peak, exitEnd], [28, 0, -28]);

  return (
    <div aria-hidden className="overflow-hidden">
      {/* The transform lives on this inner element, not the overflow-hidden
          one above: overflow-hidden never clips an element's own transformed
          box, only its children's - and Lens sits at its 1.035 scale floor
          even at rest (before/after its entrance window), so without this
          split it would widen the page's scrollWidth from first paint. */}
      <motion.div style={ready ? { opacity, scale, y } : undefined}>
        <CinematicStage
          poster={theLensPoster}
          className="flex h-[100dvh] items-center justify-center border-b border-border"
        >
          <AmbientVideo
            id="the-lens"
            sources={theLensLoop}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </CinematicStage>
      </motion.div>
    </div>
  );
}
