"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { getImageProps } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import { AmbientVideo } from "@/components/video/ambient-video";
import { useFilmPlayer } from "@/components/video/film-player-provider";
import { StatusLine } from "@/components/video/status-line";
import { campaigns, formatDuration, heroLoop, type VideoSource } from "@/lib/media";
import type { Dict } from "@/lib/i18n";

const pulse = campaigns.pulse;

// Art-directed poster: the 4:5 crop on phones, 16:9 above. It is the LCP
// element, so it is a real <img> in the HTML, preloaded per breakpoint with
// high fetch priority, and it is the loop's first frame, so the video fades in
// over it without a jump. (`priority` on getImageProps does not emit a
// preload for <picture>, hence the explicit one in the component.)
const posterCommon = {
  alt: "",
  sizes: "100vw",
  quality: 80,
  loading: "eager",
  fetchPriority: "high",
} as const;
const desktopPoster = getImageProps({
  ...posterCommon,
  src: pulse.poster.src,
  width: pulse.poster.width,
  height: pulse.poster.height,
}).props;
const mobilePoster = getImageProps({
  ...posterCommon,
  src: heroLoop.posterMobile.src,
  width: heroLoop.posterMobile.width,
  height: heroLoop.posterMobile.height,
}).props;

/** Picks the loop rendition once, at mount, from the viewport. */
function useHeroSources() {
  const [sources, setSources] = useState<VideoSource[] | null>(null);
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) {
      setSources(heroLoop.mobile);
    } else if (
      window.matchMedia("(min-width: 1800px), (min-width: 1200px) and (min-resolution: 2dppx)")
        .matches
    ) {
      setSources(heroLoop.large);
    } else {
      setSources(heroLoop.desktop);
    }
  }, []);
  return sources;
}

export function Hero({ dict }: { dict: Dict }) {
  const t = dict.hero;
  const ready = useMotionReady();
  const sources = useHeroSources();
  const { open } = useFilmPlayer();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Leaving the hero, the film eases forward and dims while the type lifts
  // away: the page moving under you, bound to the scroll, nothing on a timer.
  const filmScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.45]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const { srcSet: desktopSrcSet } = desktopPoster;
  const { srcSet: mobileSrcSet, ...posterImg } = mobilePoster;

  preload(desktopPoster.src, {
    as: "image",
    imageSrcSet: desktopSrcSet,
    imageSizes: "100vw",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });
  preload(mobilePoster.src, {
    as: "image",
    imageSrcSet: mobileSrcSet,
    imageSizes: "100vw",
    media: "(max-width: 767px)",
    fetchPriority: "high",
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      // Pulled up under the sticky header so the film starts at the very top
      // of the screen. 77px is the header's height (py-4 + 44px + 1px border).
      // Opening now sits between the sticky header and Hero, so the header
      // offset that used to live here moved to Opening (it is the first
      // element after the header now). Everything else here is unchanged.
      className="relative overflow-hidden bg-bg md:flex md:min-h-dvh md:items-end"
    >
      <motion.div
        style={ready ? { scale: filmScale } : undefined}
        className="relative aspect-[4/5] w-full md:absolute md:inset-0 md:aspect-auto"
      >
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
          <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" comes from getImageProps */}
          <img {...posterImg} className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        {sources ? (
          <AmbientVideo
            id="hero"
            sources={sources}
            eager
            threshold={0.3}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        {/* Legibility veils, tuned by measurement rather than eye: the
            lightest settings that keep text readable over the brightest loop
            frames (lemon, sky). Top: header links reach 5.2:1 (AA, small
            text). Bottom (desktop only, where the type sits on the film): the
            headline stays at 3.7:1 or better (AA, large text). The upper 40%
            of the film is never touched. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(to_bottom,rgb(11_11_12/0.75)_0%,rgb(11_11_12/0.35)_50%,rgb(11_11_12/0)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 hidden h-[60%] bg-[linear-gradient(to_top,rgb(11_11_12/0.7)_0%,rgb(11_11_12/0.45)_50%,rgb(11_11_12/0)_100%)] md:block"
        />
        {ready ? (
          <motion.div aria-hidden style={{ opacity: dim }} className="absolute inset-0 bg-bg" />
        ) : null}
      </motion.div>

      <div className="container-px relative z-10 mx-auto w-full max-w-content pb-12 pt-8 md:pb-14 md:pt-40">
        <motion.div style={ready ? { y: copyY } : undefined}>
          {/* The headline takes the full width so it holds to two lines; the
              status sits on the action row instead of beside the type. */}
          <h1 className="text-[clamp(2.6rem,5.8vw,6.25rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ink">
            {t.title.map((line, i) => (
              <span
                key={line}
                className="block pb-[0.08em] -mb-[0.08em] motion-safe:animate-mask-rise"
                style={{ animationDelay: `${0.06 + i * 0.08}s` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <div
            className="mt-8 flex flex-col gap-8 motion-safe:animate-fade-up md:flex-row md:items-center md:justify-between"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button as="a" href="#contact" variant="primary">
                {t.primary}
              </Button>
              <Button
                variant="ghost"
                onClick={(event) => open("pulse", event.currentTarget)}
                className="bg-bg/20 backdrop-blur-sm"
              >
                <Play size={14} weight="fill" aria-hidden />
                {t.secondary}
              </Button>
            </div>
            <StatusLine
              name={pulse.name}
              status={dict.status[pulse.status]}
              detail={formatDuration(pulse.duration)}
              className="w-full md:w-72"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
