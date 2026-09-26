"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useIsPresent, useReducedMotion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { EASE_IN, EASE_OUT } from "@/lib/motion";
import { formatDuration, type Campaign } from "@/lib/media";
import type { Dict } from "@/lib/i18n";
import { StatusLine } from "@/components/video/status-line";

/**
 * The full spot, with sound, in a modal over the page.
 *
 * Opened only by a click, so the browser treats the unmuted play() as a user
 * gesture; if it still refuses, the native controls are right there. Escape,
 * the close button, or a click on the backdrop closes it. Focus is trapped
 * between the close button and the video while open, and the page behind is
 * inert and does not scroll.
 *
 * The page is released the moment closing starts, not when the exit animation
 * ends: `inert` and the scroll lock come off, the film pauses, and focus goes
 * back to the element that opened it. The fading overlay has
 * pointer-events: none, so nothing waits on the animation.
 */
export default function FilmPlayer({
  campaign,
  dict,
  onClose,
  returnFocusTo,
}: {
  campaign: Campaign;
  dict: Dict;
  onClose: () => void;
  /** The frame or button that opened the player. */
  returnFocusTo: HTMLElement | null;
}) {
  const shouldReduce = useReducedMotion();
  const isPresent = useIsPresent();
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isPresent) return;
    const close = closeRef.current;
    const video = videoRef.current;
    document.body.style.overflow = "hidden";
    const behind = ["header", "main", "footer"]
      .map((sel) => document.querySelector(sel))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
    behind.forEach((el) => el.setAttribute("inert", ""));

    close?.focus();
    video?.play().catch(() => {});

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !close || !video) return;
      const active = document.activeElement;
      if (event.shiftKey && active === close) {
        event.preventDefault();
        video.focus();
      } else if (!event.shiftKey && active === video) {
        event.preventDefault();
        close.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    // Runs when closing starts (isPresent turns false) and, as a fallback, on
    // unmount. Idempotent, so running twice is harmless.
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      behind.forEach((el) => el.removeAttribute("inert"));
      video?.pause();
      returnFocusTo?.focus();
    };
  }, [isPresent, onClose, returnFocusTo]);

  const status = dict.status[campaign.status];
  const note =
    campaign.status === "spec"
      ? dict.player.specNote.replace("{brand}", campaign.name)
      : campaign.status === "concept"
        ? dict.player.conceptNote
        : null;
  const portrait = campaign.orientation === "portrait";

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${campaign.name}, ${status}`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/95 px-4 py-16 sm:px-10"
      initial={shouldReduce ? false : { opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: shouldReduce ? 0 : 0.5, ease: EASE_OUT } }}
      exit={{
        opacity: 0,
        pointerEvents: "none",
        transition: { duration: shouldReduce ? 0 : 0.35, ease: EASE_IN },
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={dict.player.close}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-[240ms] hover:bg-ink/10 sm:right-8 sm:top-8"
      >
        <X size={22} />
      </button>

      <motion.figure
        className={portrait ? "w-full max-w-[min(420px,calc((100dvh-10rem)*0.5625))]" : "w-full max-w-6xl"}
        initial={shouldReduce ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: shouldReduce ? 0 : 0.5, ease: EASE_OUT } }}
      >
        <video
          ref={videoRef}
          src={campaign.full.src}
          poster={campaign.poster.src}
          controls
          playsInline
          preload="auto"
          width={campaign.full.width}
          height={campaign.full.height}
          className="block h-auto max-h-[calc(100dvh-10rem)] w-full bg-black"
        />
        <figcaption className="mt-4 space-y-2">
          <StatusLine
            name={campaign.name}
            status={status}
            detail={formatDuration(campaign.duration)}
          />
          {note ? <p className="text-sm text-ink-muted">{note}</p> : null}
        </figcaption>
      </motion.figure>
    </motion.div>,
    document.body
  );
}
