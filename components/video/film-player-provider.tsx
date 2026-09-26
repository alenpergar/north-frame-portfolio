"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { campaigns, type CampaignId } from "@/lib/media";
import type { Dict } from "@/lib/i18n";
import { usePlayback } from "@/components/video/playback-provider";

// The player (and the full-length file) is only needed once someone presses
// play, so its code is split out of the page bundle.
const FilmPlayer = dynamic(() => import("@/components/video/film-player"), { ssr: false });

type FilmPlayerApi = { open: (id: CampaignId, trigger?: HTMLElement | null) => void };

const FilmPlayerContext = createContext<FilmPlayerApi | null>(null);

export function FilmPlayerProvider({ dict, children }: { dict: Dict; children: ReactNode }) {
  const playback = usePlayback();
  const [active, setActive] = useState<CampaignId | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const open = useCallback<FilmPlayerApi["open"]>(
    (id, from) => {
      setTrigger(from ?? null);
      playback.setSuspended(true);
      setActive(id);
    },
    [playback]
  );

  const close = useCallback(() => {
    setActive(null);
    playback.setSuspended(false);
  }, [playback]);

  const api = useMemo(() => ({ open }), [open]);

  return (
    <FilmPlayerContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {active ? (
          <FilmPlayer
            key={active}
            campaign={campaigns[active]}
            dict={dict}
            onClose={close}
            returnFocusTo={trigger}
          />
        ) : null}
      </AnimatePresence>
    </FilmPlayerContext.Provider>
  );
}

export function useFilmPlayer() {
  const api = useContext(FilmPlayerContext);
  if (!api) throw new Error("useFilmPlayer must be used inside <FilmPlayerProvider>");
  return api;
}
