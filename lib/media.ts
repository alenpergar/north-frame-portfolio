/**
 * The films on the site and every file each one ships as.
 *
 * Videos are served from MEDIA_BASE: Vercel Blob in production
 * (`NEXT_PUBLIC_MEDIA_BASE_URL`), and `/_media` locally, a git-ignored
 * symlink to ~/Movies/DRYPOINT-web/02_web whose folder layout mirrors the Blob
 * paths. Posters are small and live in the repo under /public/media/posters so
 * next/image can optimise them and the hero poster is same-origin for LCP.
 *
 * Every <source> list is ordered AV1, then HEVC (hero only), then H.264; the
 * browser takes the first it can decode.
 */

export const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "/_media").replace(/\/$/, "");

const v = (path: string) => `${MEDIA_BASE}/${path}`;

export type VideoSource = { src: string; type: string };
export type Poster = { src: string; width: number; height: number };

/** Client work, spec work for a real brand, or an invented brand. */
export type CampaignStatus = "client" | "spec" | "concept";

export type CampaignId = "pulse" | "snap" | "redbull" | "proda" | "matcha";

export type Campaign = {
  id: CampaignId;
  /** Brand name as it appears in the film. */
  name: string;
  status: CampaignStatus;
  /** Length of the full spot, in seconds. */
  duration: number;
  /** Frame shape: landscape films are 16:9, social films 9:16. */
  orientation: "landscape" | "portrait";
  poster: Poster;
  /** Silent excerpt that plays in place when the frame is on screen. */
  preview?: VideoSource[];
  /** The full spot with sound, loaded only when someone presses play. */
  full: { src: string; width: number; height: number };
};

const AV1_720 = 'video/mp4; codecs="av01.0.05M.10"';
const H264_720 = 'video/mp4; codecs="avc1.64001F"';

export const campaigns: Record<CampaignId, Campaign> = {
  pulse: {
    id: "pulse",
    name: "PULSE",
    status: "spec",
    duration: 15,
    orientation: "landscape",
    poster: { src: "/media/posters/pulse-hero_2560x1440.jpg", width: 2560, height: 1440 },
    full: { src: v("pulse/full_1920x1080.h264.mp4"), width: 1920, height: 1080 },
  },
  snap: {
    id: "snap",
    name: "SNAP",
    status: "concept",
    duration: 30,
    orientation: "landscape",
    poster: { src: "/media/posters/snap_1280x720.jpg", width: 1280, height: 720 },
    preview: [
      { src: v("snap/preview_1280x720.av1.mp4"), type: AV1_720 },
      { src: v("snap/preview_1280x720.h264.mp4"), type: H264_720 },
    ],
    full: { src: v("snap/full_1280x720.h264.mp4"), width: 1280, height: 720 },
  },
  redbull: {
    id: "redbull",
    name: "Red Bull",
    status: "spec",
    duration: 75,
    orientation: "landscape",
    poster: { src: "/media/posters/redbull_1280x720.jpg", width: 1280, height: 720 },
    preview: [
      { src: v("redbull/preview_1280x720.av1.mp4"), type: AV1_720 },
      { src: v("redbull/preview_1280x720.h264.mp4"), type: H264_720 },
    ],
    full: { src: v("redbull/full_1280x720.h264.mp4"), width: 1280, height: 720 },
  },
  proda: {
    id: "proda",
    name: "PRODA",
    status: "spec",
    duration: 15,
    orientation: "portrait",
    poster: { src: "/media/posters/proda_1080x1920.jpg", width: 1080, height: 1920 },
    preview: [
      { src: v("proda/preview_720x1280.av1.mp4"), type: AV1_720 },
      { src: v("proda/preview_720x1280.h264.mp4"), type: H264_720 },
    ],
    full: { src: v("proda/full_1080x1920.h264.mp4"), width: 1080, height: 1920 },
  },
  matcha: {
    id: "matcha",
    name: "MATCHA",
    status: "concept",
    duration: 21,
    orientation: "portrait",
    poster: { src: "/media/posters/matcha_720x1280.jpg", width: 720, height: 1280 },
    preview: [
      { src: v("matcha/preview_720x1280.av1.mp4"), type: AV1_720 },
      { src: v("matcha/preview_720x1280.h264.mp4"), type: H264_720 },
    ],
    full: { src: v("matcha/full_720x1280.h264.mp4"), width: 720, height: 1280 },
  },
};

/**
 * The Lens: a 2.8 s macro rack-focus shot, silent, looping, that sits between
 * the DRYPOINT impact and Hero in the cinematic opening. Single H.264
 * rendition for now (no AV1/HEVC pass has been produced for it yet).
 */
export const theLensLoop: VideoSource[] = [
  { src: v("the-lens/loop_1280x720.h264.mp4"), type: H264_720 },
];

export const theLensPoster: Poster = {
  src: "/media/posters/the-lens_1280x720.jpg",
  width: 1280,
  height: 720,
};

/**
 * The PULSE hero loop (9.6 s, silent): four of the spot's six shots in their
 * original order. Three renditions; the hero picks one at mount from the
 * viewport, then the browser picks the codec.
 */
export const heroLoop = {
  mobile: [
    { src: v("pulse/hero-loop-mobile_1080x1350.av1.mp4"), type: 'video/mp4; codecs="av01.0.08M.10"' },
    { src: v("pulse/hero-loop-mobile_1080x1350.hevc.mp4"), type: 'video/mp4; codecs="hvc1.1.6.L120.90"' },
    { src: v("pulse/hero-loop-mobile_1080x1350.h264.mp4"), type: 'video/mp4; codecs="avc1.640028"' },
  ],
  desktop: [
    { src: v("pulse/hero-loop_1920x1080.av1.mp4"), type: 'video/mp4; codecs="av01.0.08M.10"' },
    { src: v("pulse/hero-loop_1920x1080.hevc.mp4"), type: 'video/mp4; codecs="hvc1.1.6.L120.90"' },
    { src: v("pulse/hero-loop_1920x1080.h264.mp4"), type: 'video/mp4; codecs="avc1.640032"' },
  ],
  large: [
    { src: v("pulse/hero-loop_2560x1440.av1.mp4"), type: 'video/mp4; codecs="av01.0.12M.10"' },
    { src: v("pulse/hero-loop_2560x1440.hevc.mp4"), type: 'video/mp4; codecs="hvc1.1.6.L150.90"' },
    { src: v("pulse/hero-loop_2560x1440.h264.mp4"), type: 'video/mp4; codecs="avc1.640032"' },
  ],
  posterMobile: { src: "/media/posters/pulse-hero-mobile_1080x1350.jpg", width: 1080, height: 1350 },
} satisfies Record<"mobile" | "desktop" | "large", VideoSource[]> & { posterMobile: Poster };

/** "0:15" style duration for the status lines. */
export function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`;
}
