import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import type { Poster } from "@/lib/media";

type CinematicStageProps = {
  /** A produced poster/first-frame, once one exists. */
  poster?: Poster;
  /** A hand-authored fallback (Phase 0: this is the only thing rendered). */
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

/**
 * The reusable surface every cinematic shot sits on. Phase 0 implements only
 * the static fallback: a poster if one is supplied, otherwise the caller's
 * placeholder visual. Video and WebGL variants land later behind this same
 * prop shape, so a caller does not change when a real asset arrives.
 */
export function CinematicStage({ poster, children, className, ...rest }: CinematicStageProps) {
  return (
    <div className={clsx("relative overflow-hidden bg-bg", className)} {...rest}>
      {poster ? (
        <Image src={poster.src} alt="" fill sizes="100vw" className="object-cover" />
      ) : null}
      {children}
    </div>
  );
}
