import type { Poster, VideoSource } from "@/lib/media";

/**
 * Future cinematic shots (Phase 0 reserves the slot; no asset exists yet).
 * Once a shot is produced it follows the exact media pipeline lib/media.ts
 * already uses: poster in the repo, video from MEDIA_BASE (Blob in
 * production, /_media locally) under work/v1/<id>/...
 */
export type CinematicShotId = "the-lens" | "ripple" | "split-frame";

export type CinematicShot = {
  id: CinematicShotId;
  poster?: Poster;
  video?: VideoSource[];
};

/** Empty until a shot is produced. Keying by id here, not inline literals,
 * is what lets CinematicStage callers stay unchanged when a shot lands. */
export const cinematicShots: Record<CinematicShotId, CinematicShot> = {
  "the-lens": { id: "the-lens" },
  ripple: { id: "ripple" },
  "split-frame": { id: "split-frame" },
};
