import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { EASE_OUT } from "@/lib/motion";
import {
  ABOUT,
  BAY_H,
  CONTACT,
  FLOORS,
  FOCUS,
  FRAME,
  HOME,
  LABELS,
  PROCESS_SPAN,
  PROJECTS,
  SERVICES,
  SERVICES_HALL,
  STOPS,
  WALL_H,
  WORK,
  planBounds,
  planWalls,
  type Rect,
  type Seg,
} from "./plan-data";

/**
 * THE PLAN. The DRYPOINT site as one building whose floor plan is its sitemap.
 * Walls never move. The camera keeps one bearing (an architectural view, never
 * a walk-through) and travels a path through the rooms, driven by scroll. The
 * only light comes from the rooms: the pages lying on their floors and a soft
 * skylight in each.
 */

export type Label = { id: string; x: number; y: number; alpha: number };

export const CAP_COLOR = "#7c7a76";
export const GROUND_COLOR = "#0e0e0f";
const OPENING_END = 3.6;
/** Track position past which the camera has left the overview (0 = overview, 1 = HOME). */
const DETAIL_FROM = 0.01;

function bezier([x1, y1, x2, y2]: readonly number[]) {
  const cx = 3 * x1!, bx = 3 * (x2! - x1!) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1!, by = 3 * (y2! - y1!) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const d = (3 * ax * t + 2 * bx) * t + cx;
      if (Math.abs(d) < 1e-6) break;
      t -= (sx(t) - x) / d;
    }
    return sy(Math.min(1, Math.max(0, t)));
  };
}
const easeOut = bezier(EASE_OUT);
const span = (t: number, a: number, b: number) => easeOut((t - a) / (b - a));
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoother = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);

/**
 * Scroll progress (0..1) -> track position s (0..stops-1). Each stop holds for
 * a stretch of scroll before the camera moves on, so a room can be read.
 */
export function progressToS(p: number) {
  const n = STOPS.length - 1;
  const x = clamp01(p) * n;
  const i = Math.min(n - 1, Math.floor(x));
  return i + smoother(clamp01((x - i - 0.2) / 0.6));
}

function boxes(segs: Seg[], h: number) {
  return mergeGeometries(segs.map(([cx, cz, sx, sz]) => new THREE.BoxGeometry(sx, h, sz).translate(cx, h / 2, cz)))!;
}
function flats(rects: Rect[], y: number) {
  return mergeGeometries(
    rects.map(([x0, z0, x1, z1]) =>
      new THREE.PlaneGeometry(x1 - x0, z1 - z0).rotateX(-Math.PI / 2).translate((x0 + x1) / 2, y, (z0 + z1) / 2),
    ),
  )!;
}

/**
 * Matte plaster. Sides darken toward the floor (a contact occlusion) and catch
 * a little of the open sky toward the top - how an outer wall reads in a
 * photograph. No post-processing.
 */
function plaster(color: number, height: number) {
  const m = new THREE.MeshStandardMaterial({ color, roughness: 0.97, metalness: 0 });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uH = { value: height };
    sh.uniforms.uSky = { value: 0.16 };
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWp;\nvarying vec3 vWn;")
      .replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvWp = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvWn = normalize(mat3(modelMatrix) * objectNormal);",
      );
    sh.fragmentShader = sh.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWp;\nvarying vec3 vWn;\nuniform float uH;\nuniform float uSky;")
      .replace(
        "#include <lights_fragment_end>",
        `#include <lights_fragment_end>
float capF = step(0.9, vWn.y);
float ao = mix(0.22, 1.0, smoothstep(0.0, uH * 0.8, vWp.y));
ao = mix(ao, 1.0, capF);
reflectedLight.directDiffuse *= ao;
reflectedLight.indirectDiffuse *= ao;
float sideF = (1.0 - capF) * (1.0 - abs(vWn.y));
reflectedLight.indirectDiffuse += diffuseColor.rgb * uSky * pow(smoothstep(0.0, uH, vWp.y), 1.6) * sideF;`,
      );
  };
  return m;
}

function planCanvas(
  [x0, z0, x1, z1]: Rect,
  ppm: number,
  draw: (x: CanvasRenderingContext2D, toPx: (x: number, z: number) => [number, number]) => void,
) {
  const c = document.createElement("canvas");
  c.width = Math.ceil((x1 - x0) * ppm);
  c.height = Math.ceil((z1 - z0) * ppm);
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, c.width, c.height);
  draw(ctx, (x, z) => [(x - x0) * ppm, (z - z0) * ppm]);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

export type PlanOptions = {
  portrait: boolean;
  reduced: boolean;
  /** stills: freeze the opening clock and/or the track position */
  freeze?: { t?: number; s?: number };
  onLabels: (labels: Label[]) => void;
  onFirstFrame: () => void;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
};

export async function createPlan(container: HTMLElement, opts: PlanOptions) {
  RectAreaLightUniformsLib.init();
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.portrait ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.setClearColor(GROUND_COLOR, 1);
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const plan = new THREE.Group();
  scene.add(plan);
  // portrait turns the whole plan a quarter so the building runs down the phone
  if (opts.portrait) plan.rotation.y = -Math.PI / 2;
  plan.updateMatrixWorld(true);
  const disposables: { dispose(): void }[] = [];
  const own = <T extends { dispose(): void }>(d: T) => {
    disposables.push(d);
    return d;
  };
  const [bx0, bz0, bx1, bz1] = planBounds();
  const pad = 8;
  const around: Rect = [bx0 - pad, bz0 - pad, bx1 + pad, bz1 + pad];
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material) => {
    const o = new THREE.Mesh(own(g), own(m));
    plan.add(o);
    return o;
  };

  // ---- ground: the page background, a faint pool of tone, contact shadows
  mesh(flats([[-300, -300, 300, 300]], 0), new THREE.MeshBasicMaterial({ color: GROUND_COLOR, toneMapped: false }));
  const pool = own(
    planCanvas(around, 12, (x, p) => {
      const [cx, cz] = p((bx0 + bx1) / 2, (bz0 + bz1) / 2);
      const g = x.createRadialGradient(cx, cz, 0, cx, cz, (bx1 - bx0) * 0.7 * 12);
      g.addColorStop(0, "#fff");
      g.addColorStop(1, "#000");
      x.fillStyle = g;
      x.fillRect(0, 0, x.canvas.width, x.canvas.height);
    }),
  );
  mesh(
    flats([around], 0.01),
    new THREE.MeshBasicMaterial({ color: 0x2a2826, alphaMap: pool, transparent: true, opacity: 0.35, depthWrite: false, toneMapped: false }),
  );
  // the plot: an undeveloped site, a shade lighter than the ground, its boundary drawn
  mesh(flats([CONTACT], 0.015), new THREE.MeshBasicMaterial({ color: 0x151514, toneMapped: false }));
  const lw = 0.05;
  const [px0, pz0, px1, pz1] = CONTACT;
  mesh(
    flats(
      [
        [px0, pz0, px1, pz0 + lw],
        [px0, pz1 - lw, px1, pz1],
        [px0, pz0, px0 + lw, pz1],
        [px1 - lw, pz0, px1, pz1],
      ],
      0.02,
    ),
    new THREE.MeshBasicMaterial({ color: CAP_COLOR, toneMapped: false }),
  );
  mesh(flats(FLOORS, 0.02), new THREE.MeshStandardMaterial({ color: 0x2a2826, roughness: 0.95, metalness: 0 }));
  const { main, models, bays } = planWalls();
  const contact = own(
    planCanvas(around, 32, (x, p) => {
      x.filter = "blur(8px)";
      x.fillStyle = "#fff";
      for (const [segs, grow] of [
        [main, 0.18],
        [models, 0.06],
        [bays, 0.04],
      ] as const) {
        for (const [cx, cz, sx, sz] of segs) {
          const [ax, az] = p(cx - sx / 2 - grow, cz - sz / 2 - grow);
          x.fillRect(ax, az, (sx + 2 * grow) * 32, (sz + 2 * grow) * 32);
        }
      }
    }),
  );
  mesh(
    flats([around], 0.03),
    new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: contact, transparent: true, opacity: 0.55, depthWrite: false }),
  );

  // ---- walls, and their tops as the lines of the plan
  mesh(boxes(main, WALL_H), plaster(0x8e8b86, WALL_H));
  mesh(boxes(models, 0.32), plaster(0xa9a6a1, 0.32));
  mesh(boxes(bays, BAY_H), plaster(0xa9a6a1, BAY_H));
  const capMat = own(new THREE.MeshBasicMaterial({ color: CAP_COLOR, toneMapped: false }));
  const caps = (segs: Seg[], h: number) =>
    mergeGeometries(segs.map(([cx, cz, sx, sz]) => new THREE.PlaneGeometry(sx, sz).rotateX(-Math.PI / 2).translate(cx, h + 0.002, cz)))!;
  plan.add(
    new THREE.Mesh(own(caps(main, WALL_H)), capMat),
    new THREE.Mesh(own(caps(models, 0.32)), capMat),
    new THREE.Mesh(own(caps(bays, BAY_H)), capMat),
  );

  // ---- light: a skylight per room group, the pages on the floors
  type Lit = { set: (e: number) => void; from: number; to: number };
  const lit: Lit[] = [];
  const skylight = (r: Rect, power: number, from: number, to: number) => {
    const l = new THREE.RectAreaLight(0xf3ede4, 0, r[2] - r[0], r[3] - r[1]);
    l.position.set((r[0] + r[2]) / 2, WALL_H - 0.05, (r[1] + r[3]) / 2);
    l.lookAt((r[0] + r[2]) / 2, 0, (r[1] + r[3]) / 2);
    plan.add(l);
    lit.push({ set: (e) => (l.intensity = power * e), from, to });
  };
  skylight(HOME, 1.3, 0.9, 2.6);
  skylight(WORK, 1.1, 1.5, 3.3);
  skylight([SERVICES_HALL[0], SERVICES_HALL[1], SERVICES_HALL[2], SERVICES[0]!.r[3]], 1.0, 1.8, 3.5);
  skylight(PROCESS_SPAN, 1.0, 2.0, 3.6);
  skylight(ABOUT, 1.0, 2.1, 3.6);

  let lastT = 0;
  const loader = new THREE.TextureLoader();
  const hoverables: THREE.Mesh[] = [];
  const pageMats = new Map<string, { mat: THREE.MeshBasicMaterial; max: number; e: () => number }[]>();
  // A page arrives in two sizes: `lo` (192 px wide, the same image) for the
  // overview, where a page is some fifty pixels on screen, and the full one
  // once the camera moves in. The full one is never replaced by the thumbnail.
  const load = (name: string, r: Rect, mat: THREE.MeshBasicMaterial, light?: THREE.RectAreaLight, lo = false) =>
    loader
      .loadAsync(`/plan/${lo ? "lo/" : ""}${name}.jpg`)
      .then((tex) => {
        if (lo && mat.userData.full) return void tex.dispose();
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const w = r[2] - r[0], d = r[3] - r[1];
        const img = tex.image as { width: number; height: number };
        // object-fit: cover, top-aligned (a page is read from its top); in
        // portrait the page is turned back upright
        const ta = opts.portrait ? img.height / img.width : img.width / img.height;
        tex.center.set(0.5, 0.5);
        if (opts.portrait) tex.rotation = Math.PI / 2;
        if (ta > w / d) tex.repeat.set(w / d / ta, 1);
        else tex.repeat.set(1, ta / (w / d));
        if (opts.portrait) tex.repeat.set(tex.repeat.y, tex.repeat.x);
        if (!opts.portrait && tex.repeat.y < 1) tex.offset.y = (1 - tex.repeat.y) / 2;
        if (opts.portrait && tex.repeat.x < 1) tex.offset.x = -(1 - tex.repeat.x) / 2;
        const previous = mat.map;
        mat.map = own(tex);
        mat.needsUpdate = true;
        previous?.dispose();
        if (!lo) mat.userData.full = true;
        if (light) {
          const c = document.createElement("canvas");
          c.width = c.height = 8;
          const x = c.getContext("2d")!;
          x.drawImage(tex.image as CanvasImageSource, 0, 0, 8, 8);
          const px = x.getImageData(0, 0, 8, 8).data;
          let rr = 0, gg = 0, bb = 0;
          for (let i = 0; i < px.length; i += 4) {
            rr += px[i]!;
            gg += px[i + 1]!;
            bb += px[i + 2]!;
          }
          light.color.setRGB(rr / 64 / 255, gg / 64 / 255, bb / 64 / 255).lerp(new THREE.Color(1, 1, 1), 0.3);
        }
        requestRender();
      })
      // a page that does not arrive stays as it was (dark, or its thumbnail);
      // the words are in the DOM either way
      .catch(() => {});
  const page = (r: Rect, y: number, max: number, from: number, to: number, key: string) => {
    const mat = own(new THREE.MeshBasicMaterial({ color: 0x000000, toneMapped: false }));
    const m = new THREE.Mesh(own(flats([r], y)), mat);
    m.renderOrder = 1;
    plan.add(m);
    const list = pageMats.get(key) ?? [];
    list.push({ mat, max, e: () => span(lastT, from, to) });
    pageMats.set(key, list);
    return { mat, mesh: m };
  };

  // HOME: its page, with the page's own light spilling on its walls
  const home = page(HOME, 0.04, 1, 0.9, 2.5, "home");
  const homeLight = new THREE.RectAreaLight(0xffffff, 0, HOME[2] - HOME[0], HOME[3] - HOME[1]);
  homeLight.position.set((HOME[0] + HOME[2]) / 2, 0.05, (HOME[1] + HOME[3]) / 2);
  homeLight.lookAt((HOME[0] + HOME[2]) / 2, 10, (HOME[1] + HOME[3]) / 2);
  plan.add(homeLight);
  lit.push({ set: (e) => (homeLight.intensity = 1.2 * e), from: 0.9, to: 2.5 });
  void load(opts.portrait ? "p/home-m" : "home", HOME, home.mat, homeLight);

  // WORK: each project is a building of its own; its rooms are its page's sections
  const projectLoads: (() => Promise<unknown>)[] = [];
  const detailLoads: (() => Promise<unknown>)[] = [];
  PROJECTS.forEach((p, pi) => {
    const [x0, z0, x1] = p.rooms[0]!;
    const z1 = p.rooms[p.rooms.length - 1]![3];
    let light: THREE.RectAreaLight | undefined;
    if (!opts.portrait) {
      const l = new THREE.RectAreaLight(0xffffff, 0, x1 - x0, z1 - z0);
      l.position.set((x0 + x1) / 2, 0.06, (z0 + z1) / 2);
      l.lookAt((x0 + x1) / 2, 10, (z0 + z1) / 2);
      plan.add(l);
      lit.push({ set: (e) => (l.intensity = 0.8 * e), from: 1.7 + pi * 0.15, to: 3.3 + pi * 0.15 });
      light = l;
    }
    p.pages.forEach((pg, ri) => {
      const { mat, mesh: m } = page(pg.r, 0.05, 0.72, 1.7 + pi * 0.15 + ri * 0.05, 3.3 + pi * 0.15, p.id);
      m.userData.project = p.id;
      hoverables.push(m);
      const name = opts.portrait ? pg.texM : pg.tex;
      projectLoads.push(() => load(name, pg.r, mat, ri === 0 ? light : undefined, true));
      detailLoads.push(() => load(name, pg.r, mat));
    });
  });

  scene.add(new THREE.HemisphereLight(0xffffff, 0x0e0e0f, 0.22));

  // ---- camera: one bearing, a path of stops
  const f = opts.portrait ? FRAME.portrait : FRAME.landscape;
  const focus = opts.portrait ? FOCUS.portrait : FOCUS.landscape;
  const camera = new THREE.PerspectiveCamera(f.fov, 1, 2, 500);
  const toWorld = (x: number, z: number) => new THREE.Vector3(x, 0, z).applyMatrix4(plan.matrixWorld);
  const worldRect = ([x0, z0, x1, z1]: Rect) => {
    const a = toWorld(x0, z0), c = toWorld(x1, z1);
    return { cx: (a.x + c.x) / 2, cz: (a.z + c.z) / 2, w: Math.abs(c.x - a.x), d: Math.abs(c.z - a.z) };
  };
  const overview = worldRect([bx0, bz0, bx1, bz1]);
  type Pose = { x: number; z: number; dist: number; polar: number; ox: number; oy: number };
  let poses: Pose[] = [];
  let W = 1, H = 1;
  const computePoses = () => {
    const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const tanH = tanV * camera.aspect;
    const dist0 = opts.portrait
      ? overview.d / (FRAME.portrait.height * 2 * tanV)
      : overview.w / (FRAME.landscape.width * 2 * tanH);
    poses = STOPS.map((stop, i) => {
      if (i === 0) return { x: overview.cx, z: overview.cz, dist: dist0, polar: stop.polar, ox: f.cx, oy: f.cy };
      const r = worldRect(stop.frame);
      const phi = THREE.MathUtils.degToRad(stop.polar);
      const fo = opts.portrait && stop.portrait ? { ...focus, ...stop.portrait } : focus;
      const dist = Math.max(r.w / (2 * tanH * fo.w), (r.d * Math.cos(phi) + WALL_H * Math.sin(phi)) / (2 * tanV * fo.h));
      return { x: r.cx, z: r.cz, dist, polar: stop.polar, ox: fo.cx, oy: fo.cy };
    });
  };
  const catmull = (p0: number, p1: number, p2: number, p3: number, u: number) =>
    0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u);
  const pose = (s: number, t: number): Pose => {
    // the opening: straight down onto the drawing, then one tilt into the building
    const k = span(t, 1.0, 3.0);
    const ps = poses.map((p, i) => (i === 0 ? { ...p, polar: 0.4 + (p.polar - 0.4) * k, dist: p.dist * (1 - 0.12 * k) } : p));
    const n = ps.length - 1;
    const i = Math.min(n - 1, Math.max(0, Math.floor(s)));
    const u = clamp01(s - i);
    const at = (j: number) => ps[Math.min(n, Math.max(0, j))]!;
    const a = at(i - 1), b = at(i), c = at(i + 1), d = at(i + 2);
    const lerp = (key: "dist" | "polar" | "ox" | "oy") => b[key] + (c[key] - b[key]) * u;
    return { x: catmull(a.x, b.x, c.x, d.x, u), z: catmull(a.z, b.z, c.z, d.z, u), dist: lerp("dist"), polar: lerp("polar"), ox: lerp("ox"), oy: lerp("oy") };
  };

  // ---- state
  const reduced = opts.reduced;
  let t = opts.freeze?.t ?? (reduced ? OPENING_END : 0);
  let sTarget = opts.freeze?.s ?? 0;
  let s = sTarget;
  let hovered: string | null = null;
  // Full pages: once the camera starts to leave the overview, so they are in
  // before it reaches the buildings. In reduced motion the camera never leaves.
  let detail = false;
  const loadDetail = () => {
    if (detail || reduced) return;
    detail = true;
    for (const next of detailLoads) void next();
  };
  const v = new THREE.Vector3();
  let first = true;

  function render() {
    lastT = t;
    const sNow = reduced ? 0 : s;
    const p = pose(sNow, t);
    camera.setViewOffset(W, H, -(p.ox - 0.5) * W, (0.5 - p.oy) * H, W, H);
    camera.updateProjectionMatrix();
    const phi = THREE.MathUtils.degToRad(p.polar);
    camera.position.set(p.x, p.dist * Math.cos(phi), p.z + p.dist * Math.sin(phi));
    camera.lookAt(p.x, 0, p.z);
    for (const l of lit) l.set(span(t, l.from, l.to));
    for (const [key, list] of pageMats) {
      const boost = key === hovered ? 1.16 : 1;
      // a page stays dark until its image has arrived: never a blank white room
      for (const m of list) m.mat.color.setScalar(m.mat.map ? Math.min(1, m.max * m.e() * boost) : 0.05 * m.e());
    }
    renderer.render(scene, camera);
    opts.onLabels(
      LABELS.map((l) => {
        const at = opts.portrait && l.atPortrait ? l.atPortrait : l.at;
        v.set(at[0], l.y ?? 0, at[1]).applyMatrix4(plan.matrixWorld).project(camera);
        const alpha = l.near ? Math.max(0, ...l.near.map((n) => 1 - Math.abs(sNow - n) / 0.7)) : 1;
        return { id: l.id, x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H, alpha: clamp01(alpha) };
      }),
    );
    if (first) {
      first = false;
      opts.onFirstFrame();
      // the projects' pages load after the first frame, small; the full ones
      // follow when the camera leaves the overview
      setTimeout(() => {
        for (const next of projectLoads) void next();
        if ((opts.freeze?.s ?? 0) > DETAIL_FROM) loadDetail();
      }, 250);
    }
  }

  let raf = 0;
  let prev = 0;
  const tick = (now: number) => {
    raf = 0;
    const dt = prev ? Math.min(0.05, (now - prev) / 1000) : 1 / 60;
    prev = now;
    if (opts.freeze?.t === undefined && t < OPENING_END) t = Math.min(OPENING_END, t + dt);
    if (opts.freeze?.s === undefined) s += (sTarget - s) * (1 - Math.exp(-dt * 5));
    if (Math.abs(sTarget - s) < 1e-4) s = sTarget;
    render();
    if ((opts.freeze?.t === undefined && t < OPENING_END) || s !== sTarget) raf = requestAnimationFrame(tick);
    else prev = 0;
  };
  function requestRender() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  const resize = () => {
    W = container.clientWidth || 1;
    H = container.clientHeight || 1;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    computePoses();
    requestRender();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // ---- pointer: the project buildings answer to hover and click
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const pick = (e: PointerEvent | MouseEvent) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(hoverables, false)[0];
    return (hit?.object.userData.project as string | undefined) ?? null;
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const id = pick(e);
    if (id !== hovered) {
      hovered = id;
      renderer.domElement.style.cursor = id ? "pointer" : "";
      opts.onHover(id);
      requestRender();
    }
  };
  const onClick = (e: MouseEvent) => {
    const id = pick(e);
    if (id) opts.onSelect(id);
  };
  renderer.domElement.addEventListener("pointermove", onMove);
  renderer.domElement.addEventListener("click", onClick);

  return {
    setProgress(p: number) {
      if (opts.freeze?.s !== undefined) return;
      sTarget = progressToS(p);
      if (sTarget > DETAIL_FROM) loadDetail();
      requestRender();
    },
    setHover(id: string | null) {
      if (id !== hovered) {
        hovered = id;
        requestRender();
      }
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("click", onClick);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

export type PlanHandle = Awaited<ReturnType<typeof createPlan>>;
