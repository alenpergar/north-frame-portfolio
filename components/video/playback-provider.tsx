"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

/**
 * One film plays at a time.
 *
 * Every ambient video (the hero loop and the three previews) registers its
 * <video> element and reports how much of it is on screen. The provider plays
 * the single most-visible one that clears its own threshold and pauses the
 * rest. Nothing plays while the tab is hidden or while the full-screen player
 * is open ("suspended").
 */

type Entry = { el: HTMLVideoElement; ratio: number; threshold: number };

type PlaybackApi = {
  register: (id: string, el: HTMLVideoElement, threshold: number) => () => void;
  report: (id: string, ratio: number) => void;
  setSuspended: (suspended: boolean) => void;
};

const PlaybackContext = createContext<PlaybackApi | null>(null);

export function PlaybackProvider({ children }: { children: ReactNode }) {
  const entries = useRef(new Map<string, Entry>());
  const suspended = useRef(false);

  const decide = useCallback(() => {
    let best: string | null = null;
    let bestRatio = 0;
    if (!suspended.current && document.visibilityState === "visible") {
      entries.current.forEach((entry, id) => {
        if (entry.ratio >= entry.threshold && entry.ratio > bestRatio) {
          best = id;
          bestRatio = entry.ratio;
        }
      });
    }
    entries.current.forEach((entry, id) => {
      if (id === best) {
        // A video with no sources attached yet cannot play; it reports again
        // once it can (see AmbientVideo's `canplay` handler).
        if (entry.el.paused && entry.el.readyState >= 2) {
          entry.el.play().catch(() => {});
        }
      } else if (!entry.el.paused) {
        entry.el.pause();
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", decide);
    return () => document.removeEventListener("visibilitychange", decide);
  }, [decide]);

  const api = useMemo<PlaybackApi>(
    () => ({
      register(id, el, threshold) {
        entries.current.set(id, { el, ratio: 0, threshold });
        return () => {
          entries.current.delete(id);
        };
      },
      report(id, ratio) {
        const entry = entries.current.get(id);
        if (!entry) return;
        entry.ratio = ratio;
        decide();
      },
      setSuspended(value) {
        suspended.current = value;
        decide();
      },
    }),
    [decide]
  );

  return <PlaybackContext.Provider value={api}>{children}</PlaybackContext.Provider>;
}

export function usePlayback() {
  const api = useContext(PlaybackContext);
  if (!api) throw new Error("usePlayback must be used inside <PlaybackProvider>");
  return api;
}
