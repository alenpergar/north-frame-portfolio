"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * An original drypoint engraving, generated rather than drawn or photographed.
 *
 * Drypoint is an intaglio technique: the plate is scratched directly with a
 * hard needle, and the metal displaced by the needle curls up beside the line
 * as a *burr*. The burr holds extra ink and prints as a soft, velvety edge —
 * it is the whole reason drypoint looks the way it does. Each line here is
 * drawn twice: once blurred and warm (the burr) and once crisp (the scratch).
 *
 * The field is a set of parallel scratches bowed around an implied volume,
 * the way an engraver wraps hatching over a form: the lines part across the
 * body, crowd together at the silhouette where the surface turns away, and
 * carry more weight through the shadowed lower half.
 *
 * All geometry is derived from the loop index — no randomness — so the server
 * and client render byte-identical markup and hydration stays quiet.
 */

const W = 620;
const H = 620;
const LINES = 56;
const SAMPLES = 40;

const CX = W * 0.5;
const CY = H * 0.47;
const R = W * 0.33; // radius of the implied form the hatching wraps
const INFLATE = 0.56; // how far the form pushes the hatching apart

type Point = { x: number; y: number };
type Line = { d: string; width: string; opacity: string };

const f = (n: number) => n.toFixed(2);

function buildLines(): Line[] {
  const lines: Line[] = [];

  for (let i = 0; i < LINES; i += 1) {
    const baseY = ((i + 0.5) / LINES) * H;
    const points: Point[] = [];

    for (let s = 0; s <= SAMPLES; s += 1) {
      const x = (s / SAMPLES) * W;
      const dx = x - CX;
      const dy = baseY - CY;
      const rr = dx * dx + dy * dy;

      // Inflate the disc: every point moves away from the equator in
      // proportion to the height of the form beneath it. This is continuous
      // both at the centre (the equator line simply stays put) and at the
      // silhouette (where the form has no height left), so the field wraps a
      // volume instead of collapsing into a cusp.
      const nz = rr < R * R ? Math.sqrt(1 - rr / (R * R)) : 0;

      // Two out-of-phase waves keep the field hand-scratched, not machined.
      const wobble =
        2.6 * Math.sin(x / 78 + i * 0.42) + 1.2 * Math.sin(x / 31 + i * 1.07);

      points.push({ x, y: CY + dy * (1 + INFLATE * nz) + wobble });
    }

    // Quadratic smoothing through sample midpoints — an engraved line has no
    // facets, and straight segments at this density would show them.
    let d = "";
    let prev: Point | undefined;
    points.forEach((p, k) => {
      if (k === 0) {
        d = `M${f(p.x)} ${f(p.y)}`;
      } else if (prev) {
        d += `Q${f(prev.x)} ${f(prev.y)} ${f((prev.x + p.x) / 2)} ${f(
          (prev.y + p.y) / 2
        )}`;
      }
      prev = p;
    });
    if (prev) d += `L${f(prev.x)} ${f(prev.y)}`;

    // An engraver cuts deepest where a form turns away from the light. Every
    // line crossing the volume carries weight so it reads as a solid, biting
    // hardest at the silhouette and through the shadowed lower half. Outside
    // the form that emphasis decays rather than stopping, so the silhouette
    // reads as a turning edge instead of a hard band.
    const t = Math.abs(baseY - CY) / R;
    const onForm =
      t < 1
        ? 0.45 + 0.55 * t ** 1.6
        : Math.exp(-((t - 1) ** 2) / (2 * 0.2 * 0.2));
    const shade =
      0.55 + 0.6 * Math.min(1, Math.max(0, (baseY - CY) / R + 0.5));
    const edgeFade = Math.min(1, (Math.min(baseY, H - baseY) / (H * 0.2)) ** 1.1);

    lines.push({
      d,
      width: (0.5 + 0.8 * onForm).toFixed(2),
      opacity: ((0.1 + 0.38 * onForm * shade) * edgeFade).toFixed(3),
    });
  }

  return lines;
}

const LINES_DATA = buildLines();

export function EngravedPlate({ className }: { className?: string }) {
  const shouldReduce = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    // Pointer parallax is an enhancement only: skipped for reduced motion and
    // for coarse pointers, where there is no hover to track.
    if (shouldReduce) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = hostRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const nx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const ny = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        px.set(Math.max(-1, Math.min(1, nx)) * 10);
        py.set(Math.max(-1, Math.min(1, ny)) * 10);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [shouldReduce, px, py]);

  return (
    <div ref={hostRef} className={className}>
      <motion.div
        className="h-full w-full"
        style={shouldReduce ? undefined : { x, y }}
        // The plate is engraved left to right on load, as the needle would cut
        // it. One orchestrated moment rather than several scattered ones.
        initial={shouldReduce ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter id="dp-burr" x="-12%" y="-12%" width="124%" height="124%">
              <feGaussianBlur stdDeviation="3.4" />
            </filter>
            <radialGradient id="dp-aperture" cx="52%" cy="46%" r="34%">
              <stop offset="0%" stopColor="#C89B6C" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#C89B6C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ink caught by the aperture itself, kept low so the value comes
              from line density rather than from a glow. */}
          <rect width={W} height={H} fill="url(#dp-aperture)" />

          {/* The burr: displaced metal beside every scratch, blurred and warm. */}
          <g filter="url(#dp-burr)" stroke="#C89B6C" fill="none">
            {LINES_DATA.map((line, i) => (
              <path
                key={`burr-${i}`}
                d={line.d}
                strokeWidth={Number(line.width) * 2.9}
                strokeOpacity={Number(line.opacity) * 0.42}
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* The scratch itself. */}
          <g stroke="#F3F1EC" fill="none">
            {LINES_DATA.map((line, i) => (
              <path
                key={`line-${i}`}
                d={line.d}
                strokeWidth={line.width}
                strokeOpacity={line.opacity}
                strokeLinecap="round"
              />
            ))}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
