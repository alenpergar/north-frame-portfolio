import type { CSSProperties } from "react";

/**
 * The structure of the Hiše Žilavec site (see SITEMAP in case-study-zilavec)
 * drawn as a floor plan: every section is a room, the four house models are
 * the four small rooms with their real floor areas, and accent markup runs from
 * every room to the one inquiry form. Static SVG, animated by sell.css on
 * load only.
 */

const W = 520;
const H = 630;

// Walls, with door gaps. One path per wall run so they draw in sequence.
const WALLS = [
  "M230 20 H20 V580 H500 V20 H290", // outer, entrance at the top
  "M20 120 H120 M160 120 H420 M460 120 H500", // Predstavitev | Storitve
  "M260 120 V170 M260 215 V250", // the two trades
  "M20 250 H55 M95 250 H175 M215 250 H305 M345 250 H425 M465 250 H500", // models
  "M140 250 V380 M260 250 V380 M380 250 V380",
  "M20 380 H220 M300 380 H500", // O nas
  "M20 470 H170 M230 470 H500", // Kontakt
];

// The form inside Kontakt.
const FORM = "M292 497 H460 V558 H292 Z M306 513 H446 M306 528 H446 M306 543 H384";

// Markup: a riser along the east wall. Every room feeds a branch into it and
// it ends at the form, the way every path through the site ends there.
const TRUNK_X = 480;
const BRANCHES: { y: number; dots: number[] }[] = [
  { y: 92, dots: [420] }, // Predstavitev
  { y: 200, dots: [200, 420] }, // the two trades, through their shared door
  { y: 346, dots: [80, 200, 320, 440] }, // the four models
  { y: 428, dots: [200] }, // O nas
];
const TRUNK = `M${TRUNK_X} 92 V527 H472`;

// A revision cloud around the form: small arcs walked around a rectangle.
function cloud(x0: number, y0: number, x1: number, y1: number, step = 16) {
  const pts: [number, number][] = [];
  const edge = (ax: number, ay: number, bx: number, by: number) => {
    const n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / step));
    for (let i = 0; i < n; i++) pts.push([ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n]);
  };
  edge(x0, y0, x1, y0);
  edge(x1, y0, x1, y1);
  edge(x1, y1, x0, y1);
  edge(x0, y1, x0, y0);
  const first = pts[0]!;
  pts.push(first);
  let d = `M${first[0].toFixed(1)} ${first[1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1]!;
    const [x, y] = pts[i]!;
    const r = (Math.hypot(x - px, y - py) / 2) * 1.1;
    d += ` A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

type Room = { x: number; y: number; name: string; note?: string; size?: "sm" };
const ROOMS: Room[] = [
  { x: 40, y: 64, name: "Predstavitev", note: "#predstavitev" },
  { x: 40, y: 152, name: "Krovstvo in", note: "#storitve" },
  { x: 40, y: 170, name: "kleparstvo" },
  { x: 280, y: 152, name: "Montažne hiše" },
  { x: 280, y: 170, name: "Žilavec" },
  { x: 34, y: 290, name: "TREND", note: "68,10 m²", size: "sm" },
  { x: 154, y: 290, name: "KLASIK", note: "100,10 m²", size: "sm" },
  { x: 274, y: 290, name: "TREND", note: "138,5 m²", size: "sm" },
  { x: 394, y: 290, name: "TREND", note: "206,10 m²", size: "sm" },
  { x: 40, y: 422, name: "O nas", note: "#o-nas" },
  { x: 40, y: 512, name: "Kontakt", note: "#kontakt" },
];

export function PlanDrawing({ title, annotation }: { title: string; annotation: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby="plan-title"
      className="h-auto w-full"
      fill="none"
    >
      <title id="plan-title">{title}</title>

      {/* Walls */}
      <g stroke="var(--fg)" strokeWidth={3} strokeLinecap="square">
        {WALLS.map((d, i) => (
          <path key={d} d={d} pathLength={1} className="plan-wall" style={delay(i * 0.09)} />
        ))}
      </g>

      {/* Door swings: thin quarter arcs at the openings. */}
      <g stroke="var(--fg)" strokeWidth={1} opacity={0.55} className="plan-label" style={delay(0.8)}>
        <path d="M120 120 A40 40 0 0 1 160 160" />
        <path d="M420 120 A40 40 0 0 0 460 160" />
        <path d="M260 170 A45 45 0 0 0 215 215" />
        <path d="M220 380 A40 40 0 0 0 260 420" />
        <path d="M230 470 A60 60 0 0 1 170 530" />
      </g>

      {/* Room names */}
      <g className="plan-label" style={delay(0.85)}>
        <text x={260} y={12} textAnchor="middle" fontSize={11} fill="var(--muted)">
          Home
        </text>
        {ROOMS.map((r, i) => (
          <g key={`${r.name}-${i}`}>
            <text x={r.x} y={r.y} fontSize={r.size ? 13 : 15} fontWeight={500} fill="var(--fg)">
              {r.name}
            </text>
            {r.note && (
              <text
                x={r.x}
                y={r.size ? r.y + 18 : r.y - 18}
                fontSize={11}
                fill="var(--muted)"
              >
                {r.note}
              </text>
            )}
          </g>
        ))}
        <path d={FORM} stroke="var(--fg)" strokeWidth={1.25} />
      </g>

      {/* Markup: every room leads to the same form. */}
      <g stroke="var(--accent)" strokeWidth={1.5} strokeLinecap="round">
        {BRANCHES.map((b, i) => (
          <g key={b.y}>
            {b.dots.map((x, j) => (
              <circle
                key={x}
                cx={x}
                cy={b.y}
                r={3.5}
                fill="var(--accent)"
                stroke="none"
                className="plan-mark"
                style={delay(1.3 + i * 0.12 + j * 0.05)}
              />
            ))}
            <path
              d={`M${b.dots[0]} ${b.y} H${TRUNK_X}`}
              pathLength={1}
              className="plan-route"
              style={delay(1.35 + i * 0.12)}
            />
          </g>
        ))}
        <path d={TRUNK} pathLength={1} className="plan-route" style={delay(1.75)} />
        <path
          d={cloud(280, 486, 472, 569)}
          pathLength={1}
          className="plan-route"
          style={delay(2.15)}
        />
        <path d="M472 569 L490 596" className="plan-mark" style={delay(2.6)} />
      </g>
      <text
        x={500}
        y={618}
        textAnchor="end"
        fontSize={14}
        fontWeight={500}
        fill="var(--accent)"
        className="plan-mark"
        style={delay(2.6)}
      >
        {annotation}
      </text>
    </svg>
  );
}
