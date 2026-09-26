"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { VideoSource } from "@/lib/media";
import { usePlayback } from "@/components/video/playback-provider";
import { useAutoplayPolicy } from "@/components/video/use-autoplay-policy";

type AmbientVideoProps = {
  id: string;
  sources: VideoSource[];
  /** Share of the element that must be on screen before it may play. */
  threshold?: number;
  /**
   * Attach sources straight after mount (the hero) rather than when the
   * element comes within a screen of the viewport (the previews).
   */
  eager?: boolean;
  className?: string;
};

const RATIOS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

/**
 * A silent, looping film that sits on top of its poster and fades in once it
 * is actually playing, so there is never a blank or half-loaded frame.
 *
 * It renders nothing at all when autoplay is not allowed (reduced motion,
 * Save-Data, slow network, SSR): the poster underneath is the whole picture.
 * Sources are not in the HTML; they are attached on the client, so a visitor
 * who never scrolls to a preview never downloads it.
 */
export function AmbientVideo({
  id,
  sources,
  threshold = 0.5,
  eager = false,
  className,
}: AmbientVideoProps) {
  const allowed = useAutoplayPolicy();
  const playback = usePlayback();
  const ref = useRef<HTMLVideoElement>(null);
  const ratio = useRef(0);
  const [attached, setAttached] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Register with the one-at-a-time manager and report visibility.
  useEffect(() => {
    const el = ref.current;
    if (!allowed || !el) return;
    const unregister = playback.register(id, el, threshold);
    const visible = new IntersectionObserver(
      ([entry]) => {
        ratio.current = entry?.intersectionRatio ?? 0;
        playback.report(id, ratio.current);
      },
      { threshold: RATIOS }
    );
    visible.observe(el);
    return () => {
      visible.disconnect();
      unregister();
    };
  }, [allowed, id, threshold, playback]);

  // Decide when to fetch: immediately for the hero, a screen early otherwise.
  useEffect(() => {
    const el = ref.current;
    if (!allowed || !el || attached) return;
    if (eager) {
      setAttached(true);
      return;
    }
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAttached(true);
          near.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    near.observe(el);
    return () => near.disconnect();
  }, [allowed, eager, attached]);

  // <source> children added after mount are ignored until load() runs.
  useEffect(() => {
    if (attached) ref.current?.load();
  }, [attached]);

  if (!allowed) return null;

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden
      tabIndex={-1}
      // Once it can play, ask the manager again: it may be the most visible.
      onCanPlay={() => playback.report(id, ratio.current)}
      onPlaying={() => setPlaying(true)}
      className={clsx(
        "pointer-events-none transition-opacity duration-700 ease-cinematic",
        playing ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {attached
        ? sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))
        : null}
    </video>
  );
}
