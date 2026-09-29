/**
 * THE PLAN - the DRYPOINT site as a building. Everything here is data: the
 * sitemap is a list of rooms and the doors between them; walls, floors, labels
 * and the camera's stops are all derived from it. Pure (no three.js), so the
 * same plan also draws the instant SVG poster of the first frame.
 *
 * Plan coordinates: metres, x to the right, z downward on the drawing.
 *   section      -> room
 *   subsection   -> smaller room
 *   connection   -> corridor / door
 *   project      -> a building of its own, one room per section of the real page
 *   future site  -> an undeveloped plot
 */
import structures from "./project-structures.json";

export type Rect = [number, number, number, number]; // x0, z0, x1, z1
/** A wall segment: centre x, centre z, size x, size z. */
export type Seg = [number, number, number, number];
/** An opening in the wall that runs along x = at (axis "x") or z = at (axis "z"). */
export type Door = { axis: "x" | "z"; at: number; center: number; w: number };

export const WALL_H = 2.2;
export const WALL_T = 0.12;
export const MODEL_H = 0.32;
export const MODEL_T = 0.045;

// ---- the building ------------------------------------------------------------
export const HOME: Rect = [0, -8.5, 8, -3.5];
export const WORK: Rect = [10, -12, 28, 0];
const PASS_HOME_WORK: Rect = [8, -6.9, 10, -5.1];
const PASS_WORK_SERVICES: Rect = [24.6, 0, 26.4, 2];
export const SERVICES_HALL: Rect = [18, 2, 28, 3.8];
// the services block keeps its footprint; its rooms share the width
const SERVICE_NAMES = ["Web design", "Web development", "Landing pages"];
const SERVICE_W = 10 / SERVICE_NAMES.length;
export const SERVICES = SERVICE_NAMES.map((label, i) => ({
  id: `service-${i}`,
  label,
  r: [18 + i * SERVICE_W, 3.8, 18 + (i + 1) * SERVICE_W, 10.3] as Rect,
}));
// the enfilade reads in its own order: left to right, and top to bottom on a
// phone (where the plan is turned and x runs down the screen)
export const PROCESS = ["Discover", "Define", "Design", "Develop", "Deliver"].map((label, i) => ({
  id: `step-${i}`,
  label,
  r: [4 + i * 2.8, 2, 4 + (i + 1) * 2.8, 5.2] as Rect,
}));
/** The whole enfilade, whatever the order of its rooms. */
export const PROCESS_SPAN: Rect = [
  Math.min(...PROCESS.map((s) => s.r[0])),
  PROCESS[0]!.r[1],
  Math.max(...PROCESS.map((s) => s.r[2])),
  PROCESS[0]!.r[3],
];
export const ABOUT: Rect = [0, 1.4, 4, 5.8];
/** Not a room: the plot where the next building goes. No walls, only its boundary. */
export const CONTACT: Rect = [-10, 0.2, -1.5, 8];

export const ROOMS: Rect[] = [
  HOME,
  PASS_HOME_WORK,
  WORK,
  PASS_WORK_SERVICES,
  SERVICES_HALL,
  ...SERVICES.map((s) => s.r),
  ...PROCESS.map((s) => s.r),
  ABOUT,
];

export const DOORS: Door[] = [
  { axis: "x", at: 8, center: -6, w: 1.8 }, // home -> passage
  { axis: "x", at: 10, center: -6, w: 1.8 }, // passage -> work
  { axis: "z", at: 0, center: 25.5, w: 1.8 }, // work -> passage
  { axis: "z", at: 2, center: 25.5, w: 1.8 }, // passage -> services hall
  ...SERVICES.map((s) => ({ axis: "z" as const, at: 3.8, center: (s.r[0] + s.r[2]) / 2, w: 1.0 })),
  { axis: "x", at: 18, center: 2.9, w: 1.2 }, // services hall -> process
  ...PROCESS.slice(1).map((s) => ({ axis: "x" as const, at: s.r[0], center: 3.6, w: 1.0 })), // enfilade
  { axis: "x", at: 4, center: 3.6, w: 1.0 }, // process -> about
  { axis: "x", at: 0, center: 3.6, w: 1.2 }, // about -> the plot
];

/** Rooms with an ordinary floor (HOME's floor is its page; the plot has none). */
export const FLOORS: Rect[] = ROOMS.filter((r) => r !== HOME);

// ---- the projects: buildings inside WORK, generated from their real pages ----
// One room per top-level section of the real page, in the page's order; a
// room's depth is its section's real height. A section made of parts (the
// Žilavec house range: an intro and four model sections) is one room divided
// into bays by low partitions.
type Part = { h: number; tex: string; texM: string };
type Section = Part & { key: string; bays?: Part[] };
export type Page = { r: Rect; tex: string; texM: string };
export type Project = {
  id: string;
  label: string;
  href: string;
  status: "client" | "concept";
  rooms: Rect[];
  pages: Page[];
};

const STRIP_W = 2.4;
const STRIP_GAP = 0.9;
const STRIP_TOP = -11.1;
const STRIP_END = WORK[3] - 0.5;
export const BAY_H = MODEL_H / 2;

const sources: { id: string; label: string; href: string; status: Project["status"]; sections: Section[] }[] = [
  {
    // the client site, measured on the live site at 1440 wide
    id: "zilavec",
    label: "Hiše Žilavec",
    href: "/work/hise-zilavec",
    status: "client",
    sections: [
      { key: "hero", h: 900, tex: "zilavec-hero", texM: "p/zilavec-0-m" },
      { key: "predstavitev", h: 565, tex: "p/zilavec-predstavitev", texM: "p/zilavec-predstavitev-m" },
      { key: "storitve", h: 932, tex: "zilavec-services", texM: "p/zilavec-storitve-m" },
      {
        key: "hise",
        h: 444,
        tex: "p/zilavec-hise",
        texM: "p/zilavec-hise-m",
        bays: [
          { h: 765, tex: "zilavec-models", texM: "p/zilavec-model-01-m" },
          { h: 765, tex: "p/zilavec-model-02", texM: "p/zilavec-model-02-m" },
          { h: 765, tex: "p/zilavec-model-03", texM: "p/zilavec-model-03-m" },
          { h: 765, tex: "p/zilavec-model-04", texM: "p/zilavec-model-04-m" },
        ],
      },
      { key: "o-nas", h: 1082, tex: "p/zilavec-o-nas", texM: "p/zilavec-o-nas-m" },
      { key: "kontakt", h: 956, tex: "zilavec-contact", texM: "p/zilavec-kontakt-m" },
    ],
  },
  ...structures.map((s) => ({
    id: s.id,
    // as each site writes its own name
    label: { vivelle: "VIVELLE", lumiere: "LUMIÈRE", aurelia: "Aurelia", nova: "NOVA" }[s.id] ?? s.id,
    href: s.path,
    status: "concept" as const,
    sections: s.sections.map((x) => ({ key: x.key, h: x.h, tex: `p/${x.tex}`, texM: `p/${x.tex}-m` })),
  })),
];

const heightOf = (s: Section) => s.h + (s.bays ?? []).reduce((a, b) => a + b.h, 0);
// one scale for every building: page pixels to plan metres, so the longest
// page still fits the hall and the buildings stay comparable
const PX = Math.min(STRIP_W / 1440, (STRIP_END - STRIP_TOP) / Math.max(...sources.map((p) => p.sections.reduce((a, s) => a + heightOf(s), 0))));

/** Low partitions between bays: a wall across the room with an opening in the middle. */
const bayWalls: Seg[] = [];
export const PROJECTS: Project[] = sources.map((p, i) => {
  const x0 = WORK[0] + 1.2 + i * (STRIP_W + STRIP_GAP);
  const x1 = x0 + STRIP_W;
  const rooms: Rect[] = [];
  const pages: Page[] = [];
  let z = STRIP_TOP;
  for (const s of p.sections) {
    rooms.push([x0, z, x1, z + heightOf(s) * PX]);
    let y = z;
    for (const [k, part] of [s, ...(s.bays ?? [])].entries()) {
      if (k > 0) {
        const a = (x0 + x1) / 2 - 0.25, b = (x0 + x1) / 2 + 0.25;
        bayWalls.push([(x0 + a) / 2, y, a - x0, MODEL_T], [(b + x1) / 2, y, x1 - b, MODEL_T]);
      }
      pages.push({ r: [x0, y, x1, y + part.h * PX], tex: part.tex, texM: part.texM });
      y += part.h * PX;
    }
    z = y;
  }
  return { id: p.id, label: p.label, href: p.href, status: p.status, rooms, pages };
});

export const PROJECT_DOORS: Door[] = PROJECTS.flatMap((p) =>
  p.rooms.slice(1).map((r) => ({ axis: "z" as const, at: r[1], center: (r[0] + r[2]) / 2, w: 0.5 })),
);

// ---- walls: every room edge, shared edges merged, doors cut out --------------
export function wallsFrom(rooms: Rect[], doors: Door[], t: number): Seg[] {
  const lines = new Map<string, { axis: "x" | "z"; at: number; spans: [number, number][] }>();
  const add = (axis: "x" | "z", at: number, a: number, b: number) => {
    const key = `${axis}:${at.toFixed(3)}`;
    const l = lines.get(key) ?? { axis, at, spans: [] };
    l.spans.push([Math.min(a, b), Math.max(a, b)]);
    lines.set(key, l);
  };
  for (const [x0, z0, x1, z1] of rooms) {
    add("z", z0, x0, x1);
    add("z", z1, x0, x1);
    add("x", x0, z0, z1);
    add("x", x1, z0, z1);
  }
  const segs: Seg[] = [];
  for (const l of lines.values()) {
    // union of the spans on this line
    const sorted = l.spans.sort((p, q) => p[0] - q[0]);
    const merged: [number, number][] = [];
    for (const s of sorted) {
      const last = merged[merged.length - 1];
      if (last && s[0] <= last[1] + 1e-6) last[1] = Math.max(last[1], s[1]);
      else merged.push([s[0], s[1]]);
    }
    // minus the doors on this line
    const cuts = doors
      .filter((d) => d.axis === l.axis && Math.abs(d.at - l.at) < 1e-3)
      .map((d) => [d.center - d.w / 2, d.center + d.w / 2] as [number, number]);
    for (const [a0, b0] of merged) {
      let pieces: [number, number][] = [[a0, b0]];
      for (const [c0, c1] of cuts) {
        pieces = pieces.flatMap(([a, b]): [number, number][] =>
          c1 <= a || c0 >= b ? [[a, b]] : ([[a, c0], [c1, b]] as [number, number][]).filter(([p, q]) => q - p > 1e-3),
        );
      }
      for (const [a, b] of pieces) {
        const len = b - a + t;
        segs.push(l.axis === "z" ? [(a + b) / 2, l.at, len, t] : [l.at, (a + b) / 2, t, len]);
      }
    }
  }
  return segs;
}

export function planWalls() {
  return {
    main: wallsFrom(ROOMS, DOORS, WALL_T),
    models: wallsFrom(
      PROJECTS.flatMap((p) => p.rooms),
      PROJECT_DOORS,
      MODEL_T,
    ),
    bays: bayWalls,
  };
}

/** Outer bounds of the whole plan, the plot included. */
export function planBounds(): Rect {
  let x0 = Infinity, z0 = Infinity, x1 = -Infinity, z1 = -Infinity;
  for (const [a, b, c, d] of [...ROOMS, CONTACT]) {
    x0 = Math.min(x0, a);
    z0 = Math.min(z0, b);
    x1 = Math.max(x1, c);
    z1 = Math.max(z1, d);
  }
  return [x0 - WALL_T / 2, z0 - WALL_T / 2, x1 + WALL_T / 2, z1 + WALL_T / 2];
}

// ---- labels (DOM, projected from these anchors) ------------------------------
export type LabelDef = {
  id: string;
  text: string;
  at: [number, number];
  /** portrait (rotated plan): an anchor that keeps the text on screen */
  atPortrait?: [number, number];
  y?: number;
  kind: "zone" | "project" | "sub" | "plot";
  /** stops at which the label is shown (zones: always) */
  near?: number[];
  href?: string;
};

export const STOP = { overview: 0, home: 1, work: 2, projects: 3, services: 4, process: 5, about: 6, contact: 7 } as const;

/** The spaces, in the order the camera visits them, with the stop that frames each. */
export const SPACES = [
  { id: "home", label: "Home", stop: STOP.home },
  { id: "work", label: "Work", stop: STOP.work },
  { id: "services", label: "Services", stop: STOP.services },
  { id: "process", label: "Process", stop: STOP.process },
  { id: "about", label: "About", stop: STOP.about },
  { id: "contact", label: "Contact", stop: STOP.contact },
] as const;
export type SpaceId = (typeof SPACES)[number]["id"];

export const LABELS: LabelDef[] = [
  { id: "home", text: "Home", at: [HOME[0], HOME[1] - 0.45], y: WALL_H, kind: "zone" },
  { id: "work", text: "Work", at: [WORK[0], WORK[1] - 0.45], y: WALL_H, kind: "zone" },
  { id: "services", text: "Services", at: [SERVICES_HALL[2] + 0.4, SERVICES_HALL[1]], atPortrait: [SERVICES_HALL[2] + 0.5, SERVICES[SERVICES.length - 1]!.r[3]], y: WALL_H, kind: "zone" },
  { id: "process", text: "Process", at: [PROCESS_SPAN[0], PROCESS_SPAN[1] - 0.45], y: WALL_H, kind: "zone" },
  { id: "about", text: "About", at: [ABOUT[0], ABOUT[3] + 0.35], y: WALL_H, kind: "zone" },
  { id: "contact", text: "Contact", at: [CONTACT[0], CONTACT[1] - 0.45], kind: "zone" },
  ...PROJECTS.map((p) => ({
    id: p.id,
    text: p.label,
    at: [p.rooms[0]![0], p.rooms[0]![1] - 0.3] as [number, number],
    // portrait: in the middle of the corridor above the model (the gap is
    // narrower on screen than a line of type, so the label sits across it)
    atPortrait: [p.rooms[0]![0] - 0.45, p.rooms[p.rooms.length - 1]![3] + 0.1] as [number, number],
    y: MODEL_H,
    kind: "project" as const,
    // only in the close view: at the wide one the names would crowd
    near: [STOP.projects],
    href: p.href,
  })),
  ...SERVICES.map((s) => ({ id: s.id, text: s.label, at: [s.r[0] + 0.25, s.r[1] + 0.7] as [number, number], kind: "sub" as const, near: [STOP.services] })),
  ...PROCESS.map((s, i) => ({
    id: s.id,
    text: `${String(i + 1).padStart(2, "0")} ${s.label}`,
    at: [s.r[0] + 0.25, s.r[1] + 0.6] as [number, number],
    kind: "sub" as const,
    near: [STOP.process],
  })),
  {
    id: "plot",
    text: "Your website",
    at: [(CONTACT[0] + CONTACT[2]) / 2, (CONTACT[1] + CONTACT[3]) / 2],
    kind: "plot",
    near: [STOP.about, STOP.contact],
  },
];

// ---- camera stops: what each view frames, and how tilted it is ----------------
/** `portrait`: on a phone, where the view sits when that space's text is tall (fractions of the stage). */
export type Stop = { id: keyof typeof STOP; frame: Rect; polar: number; portrait?: { h: number; cy: number } };
const HIGH = { h: 0.3, cy: 0.3 };
export const STOPS: Stop[] = [
  { id: "overview", frame: [0, 0, 0, 0], polar: 38 }, // framed by FRAME (shared with the poster)
  { id: "home", frame: [-1, -9.5, 11, -2.5], polar: 44, portrait: HIGH },
  { id: "work", frame: [8.5, -13, 29.5, 1], polar: 42, portrait: HIGH },
  { id: "projects", frame: [10.6, -11.9, 27.4, -0.4], polar: 50, portrait: HIGH },
  { id: "services", frame: [17, 0.5, 29, 11], polar: 44 },
  { id: "process", frame: [3.2, 1, 18.8, 6.2], polar: 44, portrait: HIGH },
  { id: "about", frame: [-3, 0.2, 8, 7], polar: 42 },
  // the plot at the right of the view: the form stands on the open ground beside it
  { id: "contact", frame: [-23, -1, -0.5, 9.5], polar: 30 },
];

/** Framing of the overview, shared by the camera and the poster (fractions of the stage). */
export const FRAME = {
  landscape: { width: 0.52, cx: 0.63, cy: 0.45, fov: 21 },
  portrait: { height: 0.56, cx: 0.5, cy: 0.42, fov: 26 },
};
/** Where the room views sit in the stage (content panels take the rest). */
export const FOCUS = {
  landscape: { w: 0.54, h: 0.58, cx: 0.64, cy: 0.49 },
  portrait: { w: 0.9, h: 0.44, cx: 0.5, cy: 0.4 },
};
