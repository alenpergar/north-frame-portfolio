"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Play } from "@phosphor-icons/react";
import { DUR, EASE_OUT, SPRING_MAGNETIC } from "@/lib/motion";
import type { Campaign } from "@/lib/media";
import type { Dict } from "@/lib/i18n";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import { useFinePointer } from "@/components/ui/motion-primitives";
import { AmbientVideo } from "@/components/video/ambient-video";
import { useFilmPlayer } from "@/components/video/film-player-provider";

/**
 * A film on the page: poster, silent preview on top once it plays, and the
 * whole frame is one button that opens the full spot with sound.
 *
 * Motion: the frame opens from a 6% inset as it enters the viewport while the
 * picture settles from 1.04 to 1 (once). On a fine pointer a small "Play"
 * label follows the cursor; on touch and for reduced motion a static play
 * mark sits in the corner instead. Without motion everything is simply there.
 */
export function FilmFrame({
  campaign,
  dict,
  sizes,
  className,
}: {
  campaign: Campaign;
  dict: Dict;
  sizes: string;
  className?: string;
}) {
  const { open } = useFilmPlayer();
  const ready = useMotionReady();
  const fine = useFinePointer();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, SPRING_MAGNETIC);
  const y = useSpring(py, SPRING_MAGNETIC);

  const status = dict.status[campaign.status];
  const label = dict.player.frameLabel
    .replace("{name}", campaign.name)
    .replace("{status}", status)
    .replace("{seconds}", String(campaign.duration));

  const reveal = ready
    ? {
        initial: { clipPath: "inset(6% 6% 6% 6%)" },
        whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
        viewport: { once: true, margin: "-15% 0px" },
        transition: { duration: DUR.mask, ease: EASE_OUT },
      }
    : {};
  const settle = ready
    ? {
        initial: { scale: 1.04 },
        whileInView: { scale: 1 },
        viewport: { once: true, margin: "-15% 0px" },
        transition: { duration: DUR.mask * 1.4, ease: EASE_OUT },
      }
    : {};

  return (
    <motion.div
      {...reveal}
      className={clsx(
        "relative overflow-hidden bg-surface",
        campaign.orientation === "landscape" ? "aspect-video" : "aspect-[9/16]",
        className
      )}
    >
      <button
        type="button"
        aria-label={label}
        onClick={(event) => open(campaign.id, event.currentTarget)}
        onPointerMove={
          fine
            ? (event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                px.set(event.clientX - rect.left);
                py.set(event.clientY - rect.top);
              }
            : undefined
        }
        className="group absolute inset-0 block h-full w-full focus-visible:outline-offset-[-3px]"
      >
        <motion.span {...settle} className="absolute inset-0 block">
          <Image
            src={campaign.poster.src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[900ms] ease-cinematic group-hover:scale-[1.02]"
          />
          {campaign.preview ? (
            <AmbientVideo
              id={campaign.id}
              sources={campaign.preview}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
            />
          ) : null}
        </motion.span>

        {fine ? (
          <motion.span
            aria-hidden
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 ml-4 mt-4 rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bg opacity-0 transition-opacity duration-[260ms] group-hover:opacity-100"
          >
            {dict.player.play}
          </motion.span>
        ) : (
          <span
            aria-hidden
            className="absolute bottom-3 left-3 inline-flex h-11 items-center gap-2 rounded-full bg-bg/70 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink backdrop-blur-sm"
          >
            <Play size={12} weight="fill" />
            {dict.player.play}
          </span>
        )}
      </button>
    </motion.div>
  );
}
