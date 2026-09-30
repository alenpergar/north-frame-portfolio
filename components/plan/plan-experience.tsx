"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import type { Dict } from "@/lib/i18n";
import {
  CONTACT,
  FRAME,
  LABELS,
  PROJECTS,
  PROCESS,
  SERVICES,
  SPACES,
  STOP,
  STOPS,
  planBounds,
  planWalls,
  type Rect,
  type Seg,
  type SpaceId,
} from "./plan-data";
import { ABOUT, CONCEPT_NOTE, CONTACT_COPY, HOME_LINE, PROCESS_TEXT } from "./plan-content";
import type { Label, PlanHandle } from "./plan-scene";

// Kept in sync with plan-scene (CAP_COLOR, GROUND_COLOR); duplicated so the
// poster does not import three.js.
const CAP = "#7c7a76";
const GROUND = "#0e0e0f";
// wall tops sit above the floor, so from the first camera they read slightly larger
const K_WALL = { landscape: 1.021, portrait: 1.016 };
const K_MODEL = 1.003;

/** What the page passes in from the live dictionary (the rest is plan-content). */
export type PlanCopy = {
  title: string;
  cta: string;
  status: { client: string; concept: string };
  /** one line per project, by id */
  projects: Record<string, string>;
  pricing: { name: string; price: string }[];
  email: string;
  privacy: { label: string; href: string };
  /** the contact form's dictionary, with the website options only */
  form: Dict;
};

const LABEL_BASE = "whitespace-nowrap font-mono uppercase";
const LABEL_KIND: Record<(typeof LABELS)[number]["kind"], string> = {
  zone: "text-[12px] tracking-[0.14em] text-ink/75",
  project: "text-[11px] tracking-[0.12em] text-ink/80",
  sub: "text-[10.5px] tracking-[0.12em] text-ink/60",
  plot: "text-[12px] tracking-[0.3em] text-ink/55",
};

type Space = "overview" | SpaceId;
const spaceAt = (stop: number): Space =>
  stop === STOP.overview ? "overview" : stop === STOP.projects ? "work" : (SPACES.find((sp) => sp.stop === stop)?.id ?? "overview");
const stopOf = (space: Space) => (space === "overview" ? STOP.overview : SPACES.find((sp) => sp.id === space)!.stop);
/** Labels that stand in a row (the projects, the process rooms), each with the one after it. */
const NEXT_IN_ROW = new Map(
  [PROJECTS.map((p) => p.id), PROCESS.map((s) => s.id)].flatMap((row) => row.slice(0, -1).map((id, i) => [id, row[i + 1]!] as const)),
);
/** In-page links that move the camera instead of leaving the plan (header, CTAs, deep links). */
const HASH_STOP: Record<string, number> = Object.fromEntries(SPACES.map((sp) => [`#${sp.id}`, sp.stop]));
/**
 * The stop a link points to when it points into this plan: `#work`, or the
 * plan's own page with a hash (`/#work` from the header and footer, which
 * have to work from every page), or the page itself (the logo).
 */
function stopForHref(href: string, pages: string[]) {
  const i = href.indexOf("#");
  const base = i < 0 ? href : href.slice(0, i);
  if (base !== "" && !pages.includes(base)) return undefined;
  return i < 0 ? STOP.overview : HASH_STOP[href.slice(i)];
}

/** A media query as live state (null until mounted, so the server render stays neutral). */
function useMedia(query: string) {
  const [on, setOn] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return on;
}

/** WebGL before three.js: where there is none, the plan stays a drawing and nothing is downloaded. */
function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") ?? c.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

function PlanPoster({ portrait }: { portrait: boolean }) {
  const [x0, z0, x1, z1] = planBounds();
  const bw = x1 - x0, bd = z1 - z0;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const { main, models, bays } = planWalls();
  const scaled = (k: number, children: React.ReactNode) => (
    <g transform={`translate(${cx} ${cz}) scale(${k}) translate(${-cx} ${-cz})`}>{children}</g>
  );
  const rects = (segs: Seg[]) =>
    segs.map(([sx, sz, w, d], i) => <rect key={i} x={sx - w / 2} y={sz - d / 2} width={w} height={d} fill={CAP} />);
  const [px0, pz0, px1, pz1]: Rect = CONTACT;
  const f = portrait ? FRAME.portrait : FRAME.landscape;
  const k = portrait ? K_WALL.portrait : K_WALL.landscape;
  // portrait turns the plan a quarter: screen x = -z, screen y = x
  const box = portrait
    ? { height: `${FRAME.portrait.height * 100}%`, aspectRatio: `${bd} / ${bw}` }
    : { width: `${FRAME.landscape.width * 100}%`, aspectRatio: `${bw} / ${bd}` };
  return (
    <div aria-hidden className="absolute" style={{ ...box, left: `${f.cx * 100}%`, top: `${f.cy * 100}%`, transform: "translate(-50%, -50%)" }}>
      <div
        className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ [portrait ? "height" : "width"]: "140%", background: "radial-gradient(closest-side, rgba(42,40,38,0.35), rgba(42,40,38,0))" }}
      />
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={portrait ? `${-z1} ${x0} ${bd} ${bw}` : `${x0} ${z0} ${bw} ${bd}`}>
        <g transform={portrait ? "matrix(0 1 -1 0 0 0)" : undefined}>
          <rect x={px0} y={pz0} width={px1 - px0} height={pz1 - pz0} fill="#151514" stroke={CAP} strokeWidth={0.05} />
          {scaled(k, rects(main))}
          {scaled(K_MODEL, rects([...models, ...bays]))}
        </g>
      </svg>
      {LABELS.filter((l) => l.kind === "zone").map((l) => {
        const kk = l.y ? k : 1;
        const px = cx + (l.at[0] - cx) * kk, pz = cz + (l.at[1] - cz) * kk;
        const left = portrait ? (z1 - pz) / bd : (px - x0) / bw;
        const top = portrait ? (px - x0) / bw : (pz - z0) / bd;
        return (
          <span key={l.id} className={`absolute ${LABEL_BASE} ${LABEL_KIND.zone}`} style={{ left: `${left * 100}%`, top: `${top * 100}%` }}>
            {l.text}
          </span>
        );
      })}
    </div>
  );
}


const SHORT = "[@media(max-height:599px)]:right-auto [@media(max-height:599px)]:max-h-[calc(100dvh-7.5rem)] [@media(max-height:599px)]:overflow-y-auto";
const SHORT_LIVE = "[@media(max-height:599px)]:pointer-events-auto";

// Only the space in view takes the pointer; the others are there to be read
// (screen readers, search) and step in when keyboard focus reaches them.
const LIVE =
  "[&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_label]:pointer-events-auto [&_select]:pointer-events-auto [&_textarea]:pointer-events-auto";

function Panel({
  id,
  active,
  onEnter,
  children,
  className = "",
}: {
  id: Space;
  active: boolean;
  onEnter: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    // not id={id}: the browser's own jump to #process must not fight the camera
    <section
      id={`space-${id}`}
      aria-labelledby={`${id}-title`}
      onFocus={() => {
        if (!active) onEnter();
      }}
      // Below 600 px of height (a phone on its side) a space scrolls inside
      // itself between the header and the bottom, only as wide as its text,
      // so the models beside it still answer to the pointer
      className={`absolute inset-x-0 bottom-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${SHORT} ${
        active ? `opacity-100 ${LIVE} ${SHORT_LIVE}` : "opacity-0"
      } ${className}`}
    >
      {children}
    </section>
  );
}

const H2 = "text-[clamp(1.9rem,3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink";
const EYEBROW = "mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted focus:outline-none";
const NOTE = "text-[13px] leading-snug text-ink-muted";

/**
 * `home`: the path this plan is served at as the homepage ("/", "/sl"). Links
 * to it, with or without a space's hash, move the camera instead of navigating.
 */
export function PlanExperience({ copy, home = "/" }: { copy: PlanCopy; home?: string }) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const handle = useRef<PlanHandle | null>(null);
  const labelRefs = useRef<Record<string, HTMLElement | null>>({});
  const heads = useRef<Partial<Record<Space, HTMLElement | null>>>({});
  const last = useRef<Label[]>([]);
  const [live, setLive] = useState(false);
  const [labelsOn, setLabelsOn] = useState(false);
  // both followed live: a phone turned on its side gets the landscape plan, a
  // change of the reduced-motion setting takes effect without a reload
  const portrait = useMedia("(max-width: 767px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const portraitRef = useRef(false);
  portraitRef.current = portrait === true;
  const [space, setSpace] = useState<Space>("overview");
  const [hovered, setHovered] = useState<string | null>(null);
  // the plan owns its scroll: 0 when the section's top reaches the top of the
  // screen, 1 when its end reaches the bottom (the stage is sticky between)
  const { scrollYProgress: progress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const frozen = useRef(false);

  const place = (ls: Label[]) => {
    const at = new Map(ls.map((l) => [l.id, l]));
    for (const l of ls) {
      const n = labelRefs.current[l.id];
      if (!n) continue;
      n.style.transform = `translate3d(${Math.round(l.x)}px, ${Math.round(l.y)}px, 0)`;
      // a name in a row (a project, a process room) may take the width up to the
      // next one and no more (it wraps there): at narrow widths the rooms sit
      // closer than the names
      const nextId = portraitRef.current ? undefined : NEXT_IN_ROW.get(l.id);
      const next = nextId ? at.get(nextId) : undefined;
      n.style.maxWidth = next ? `${Math.max(48, Math.round(next.x - l.x - 10))}px` : "";
      n.style.whiteSpace = next ? "normal" : "";
      n.style.opacity = String(l.alpha);
      n.style.pointerEvents = l.alpha > 0.5 && n.tagName === "A" ? "auto" : "none";
    }
  };
  useLayoutEffect(() => place(last.current), [labelsOn]);

  // the DOM follows the same track position as the camera
  const onProgress = (p: number) => {
    if (frozen.current) return;
    handle.current?.setProgress(p);
    const n = STOPS.length - 1;
    setSpace(spaceAt(Math.round(p * n)));
  };
  useMotionValueEvent(progress, "change", onProgress);

  const openProject = (id: string) => {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    // client work is part of this site; a concept is a site of its own
    if (p.status === "client") router.push(p.href);
    else window.open(p.href, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const el = stage.current;
    if (!el || portrait === null || reduced === null) return;
    const q = new URLSearchParams(window.location.search);
    const isPortrait = portrait;
    if (q.has("poster") || !hasWebGL()) return;
    const freeze = {
      ...(q.get("t") !== null ? { t: Number(q.get("t")) } : {}),
      ...(q.get("s") !== null ? { s: Number(q.get("s")) } : {}),
    };
    if (freeze.s !== undefined) {
      frozen.current = true;
      setSpace(spaceAt(Math.round(freeze.s)));
    }
    let alive = true;
    import("./plan-scene")
      .then(({ createPlan }) =>
        createPlan(el, {
        portrait: isPortrait,
        reduced,
        freeze,
        onFirstFrame: () => {
          if (!alive) return;
          setLive(true);
          setLabelsOn(true);
        },
        onLabels: (ls) => {
          last.current = ls;
          place(ls);
        },
        onHover: (id) => alive && setHovered(id),
        onSelect: (id) => openProject(id),
      }),
      )
      .then((h) => {
        if (!alive) return h.dispose();
        handle.current = h;
        h.setProgress(progress.get());
      })
      // no 3D (the chunk did not load, or the context could not be made): the
      // drawing and every word of the page are already there
      .catch((err: unknown) => console.warn("THE PLAN: 3D view unavailable, the plan stays a drawing.", err));
    return () => {
      alive = false;
      handle.current?.dispose();
      handle.current = null;
    };
    // openProject only closes over the router
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, router, portrait, reduced]);

  const goTo = (stop: number, behavior?: ScrollBehavior) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    const range = sec.offsetHeight - window.innerHeight;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + (stop / (STOPS.length - 1)) * range, behavior: behavior ?? (reduced ? "auto" : "smooth") });
  };
  /** Move to a space and put keyboard focus on its heading. */
  const go = (stop: number) => {
    goTo(stop);
    heads.current[spaceAt(stop)]?.focus({ preventScroll: true });
  };
  const goRef = useRef(go);
  goRef.current = go;

  // One navigation for the whole page: the header's links, its CTA and the
  // plan's own CTAs all move the camera to a space instead of leaving for the
  // old homepage. Captured before Next's <Link> acts (it skips a prevented click);
  // the header still closes its menu first.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href");
      if (!href) return;
      const stop = stopForHref(href, [home, window.location.pathname]);
      if (stop === undefined) return;
      e.preventDefault();
      setTimeout(() => goRef.current(stop), 0);
    };
    // a link into the plan (/#contact from another page), or a changed hash, lands on its space
    const onHash = () => {
      const stop = HASH_STOP[window.location.hash];
      if (stop !== undefined) goTo(stop, "auto");
    };
    window.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    setTimeout(onHash, 0);
    return () => {
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
    };
  }, [home]);

  const hover = (id: string | null) => {
    setHovered(id);
    handle.current?.setHover(id);
  };
  const head = (id: Space) => ({
    id: `${id}-title`,
    tabIndex: -1,
    ref: (n: HTMLElement | null) => {
      heads.current[id] = n;
    },
  });
  const panel = (id: Space) => ({ id, active: space === id, onEnter: () => goTo(stopOf(id)) });
  const status = (s: "client" | "concept") => (s === "client" ? copy.status.client : copy.status.concept);

  return (
    // Pulled up under the header (77px), as the homepage hero is: the header hides
    // on the way down, so the stage has to be the whole screen, not the rest of it.
    <section ref={sectionRef} aria-label="The DRYPOINT site, as a plan" className="relative -mt-[77px]" style={{ height: `${STOPS.length * 110}vh` }}>
      <div className="sticky top-0 h-[100dvh] min-h-[600px] overflow-hidden [@media(max-height:599px)]:min-h-0" style={{ background: GROUND }}>
        {!live && (
          <>
            <div className={portrait === null ? "hidden md:block" : portrait ? "hidden" : ""}>
              <PlanPoster portrait={false} />
            </div>
            <div className={portrait === null ? "md:hidden" : portrait ? "" : "hidden"}>
              <PlanPoster portrait />
            </div>
          </>
        )}
        <div ref={stage} aria-hidden className={`absolute inset-0 ${live ? "" : "invisible"}`} />

        {/* labels on the plan, projected from the scene: visual only, the DOM below carries the same names */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {labelsOn &&
            LABELS.map((l) => {
              const cls = `absolute left-0 top-0 will-change-transform ${LABEL_BASE} ${LABEL_KIND[l.kind]}`;
              if (l.href) {
                const p = PROJECTS.find((x) => x.id === l.id)!;
                return (
                  <a
                    key={l.id}
                    ref={(n) => {
                      labelRefs.current[l.id] = n;
                    }}
                    href={l.href}
                    {...(p.status === "concept" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    tabIndex={-1}
                    onMouseEnter={() => hover(l.id)}
                    onMouseLeave={() => hover(null)}
                    className={`${cls} ${hovered === l.id ? "!text-ink" : ""} transition-colors duration-200`}
                  >
                    <span
                      className={
                        portrait
                          ? "block -translate-y-1/2 bg-[rgb(14_14_15/0.78)] px-1 py-px"
                          : "block -translate-y-full pb-1"
                      }
                    >
                      {l.text}
                    </span>
                  </a>
                );
              }
              return (
                <span
                  key={l.id}
                  ref={(n) => {
                    labelRefs.current[l.id] = n;
                  }}
                  className={cls}
                  style={{ opacity: 0 }}
                >
                  <span className={`block ${l.kind === "plot" ? "-translate-x-1/2 -translate-y-1/2" : l.kind === "sub" ? "" : "-translate-y-full pb-1"}`}>
                    {l.text}
                  </span>
                </span>
              );
            })}
        </div>

        {/* legibility: the page's own ground fading up behind the text, never a glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(to_top,rgb(14_14_15/0.96)_0%,rgb(14_14_15/0.9)_30%,rgb(14_14_15/0)_100%)] md:h-[55%] md:bg-[linear-gradient(to_top,rgb(14_14_15/0.85)_0%,rgb(14_14_15/0.45)_40%,rgb(14_14_15/0)_100%)]"
        />
        {/* on a phone the taller spaces take more of the screen, the form all of it */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-[74%] bg-[linear-gradient(to_top,rgb(14_14_15/0.97)_0%,rgb(14_14_15/0.93)_48%,rgb(14_14_15/0)_100%)] transition-opacity duration-500 motion-reduce:transition-none md:hidden ${
            space === "home" || space === "work" || space === "process" || space === "about" ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(14_14_15/0.96)_0%,rgb(14_14_15/0.92)_72%,rgb(14_14_15/0.6)_100%)] transition-opacity duration-500 motion-reduce:transition-none md:hidden ${
            space === "contact" ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* the taller spaces (lists, the form) read against the ground from the left as well */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 hidden w-full bg-[linear-gradient(to_right,rgb(14_14_15/0.9)_0%,rgb(14_14_15/0.8)_34%,rgb(14_14_15/0)_54%)] transition-opacity duration-500 motion-reduce:transition-none md:block ${
            space === "overview" || space === "home" ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* on a phone the spaces sit at the top of the plan: the same ground behind them */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[150px] bg-[linear-gradient(to_bottom,rgb(14_14_15/0.9)_0%,rgb(14_14_15/0.75)_62%,rgb(14_14_15/0)_100%)] md:hidden" />

        {/* the spaces: DOM navigation, in the order of the plan */}
        <nav aria-label="Spaces" className="absolute inset-x-6 top-[86px] z-10 sm:inset-x-10 md:inset-x-auto md:bottom-14 md:right-8 md:top-auto [@media(min-width:768px)_and_(max-height:599px)]:bottom-5">
          <ol className="flex gap-3.5 md:flex-col md:gap-2.5">
            {SPACES.map((sp, i) => (
              <li key={sp.id}>
                <button
                  type="button"
                  onClick={() => go(sp.stop)}
                  aria-current={space === sp.id ? "true" : undefined}
                  className={`group flex min-h-[32px] items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors duration-200 md:min-h-0 ${
                    space === sp.id ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className={space === sp.id ? "" : "sr-only md:not-sr-only"}>{sp.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* content: one section per space, crossfading as the camera arrives */}
        <div className="container-px pointer-events-none relative mx-auto h-full max-w-content">
          <div className="absolute inset-x-6 bottom-10 sm:inset-x-10 md:bottom-14 lg:inset-x-16 [@media(max-height:599px)]:bottom-5">
            <Panel {...panel("overview")}>
              <h1 {...head("overview")} className="max-w-[11ch] text-[clamp(2.3rem,4.6vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ink focus:outline-none">
                {copy.title}
              </h1>
              <div className="mt-8">
                <Button as="a" href="#contact" variant="primary">
                  {copy.cta}
                </Button>
              </div>
            </Panel>

            <Panel {...panel("home")}>
              <h2 {...head("home")} className={EYEBROW}>
                <span aria-hidden>01 </span>Home
              </h2>
              <p className={`${H2} max-w-[18ch]`}>{HOME_LINE}</p>
            </Panel>

            <Panel {...panel("work")}>
              <h2 {...head("work")} className={EYEBROW}>
                <span aria-hidden>02 </span>Work
              </h2>
              <ul className="grid max-w-md">
                {PROJECTS.map((p) => {
                  const concept = p.status === "concept";
                  const cls = `block border-b border-border py-2 transition-colors duration-200 ${hovered === p.id ? "text-ink" : "text-ink/85 hover:text-ink"}`;
                  const events = {
                    onMouseEnter: () => hover(p.id),
                    onMouseLeave: () => hover(null),
                    onFocus: () => hover(p.id),
                    onBlur: () => hover(null),
                  };
                  const inner = (
                    <>
                      <span className="flex items-baseline justify-between gap-6">
                        <span className="inline-flex items-center gap-1.5 text-[clamp(1.05rem,1.5vw,1.3rem)] font-medium tracking-[-0.01em]">
                          {p.label}
                          {concept && <ArrowUpRight size={14} aria-hidden className="text-ink-muted" />}
                        </span>
                        <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-muted">{status(p.status)}</span>
                      </span>
                      <span className={`mt-0.5 block ${NOTE}`}>{copy.projects[p.id]}</span>
                      {concept && <span className="sr-only"> (opens in a new tab)</span>}
                    </>
                  );
                  return (
                    <li key={p.id}>
                      {concept ? (
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls} {...events}>
                          {inner}
                        </a>
                      ) : (
                        <Link href={p.href} className={cls} {...events}>
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className={`mt-3 ${NOTE}`}>{CONCEPT_NOTE}</p>
            </Panel>

            <Panel {...panel("services")}>
              <h2 {...head("services")} className={EYEBROW}>
                <span aria-hidden>03 </span>Services
              </h2>
              <ul className={`${H2} grid gap-1`}>
                {SERVICES.map((sv) => (
                  <li key={sv.id}>{sv.label}</li>
                ))}
              </ul>
              <dl className="mt-7 grid max-w-sm border-t border-border">
                {copy.pricing.map((it) => (
                  <div key={it.name} className="flex items-baseline justify-between gap-6 border-b border-border py-2.5 text-sm">
                    <dt className="text-ink-muted">{it.name}</dt>
                    <dd className="text-ink">{it.price}</dd>
                  </div>
                ))}
              </dl>
            </Panel>

            <Panel {...panel("process")}>
              <h2 {...head("process")} className={EYEBROW}>
                <span aria-hidden>04 </span>Process
              </h2>
              <ol className="grid max-w-xl gap-3 md:gap-3.5">
                {PROCESS.map((st, i) => (
                  <li key={st.id} className="grid grid-cols-[2rem_1fr] items-baseline">
                    <span aria-hidden className="font-mono text-[11px] tracking-[0.14em] text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[clamp(1.2rem,1.9vw,1.6rem)] font-medium leading-tight tracking-[-0.02em] text-ink">{st.label}</span>
                      <span className={`mt-0.5 block max-w-[48ch] ${NOTE}`}>{PROCESS_TEXT[st.label]}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Panel>

            <Panel {...panel("about")}>
              <h2 {...head("about")} className={EYEBROW}>
                <span aria-hidden>05 </span>About
              </h2>
              <div className="flex max-w-xl items-start gap-5 md:gap-6">
                <Image
                  src={ABOUT.photo}
                  alt={ABOUT.photoAlt}
                  width={1024}
                  height={1024}
                  sizes="(min-width: 768px) 112px, 88px"
                  className="h-[88px] w-[88px] shrink-0 object-cover md:h-28 md:w-28"
                />
                <div>
                  <p className="text-[clamp(1.15rem,1.7vw,1.5rem)] leading-[1.3] tracking-[-0.01em] text-ink">{ABOUT.lead}</p>
                  <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-ink-muted">{ABOUT.body}</p>
                  <p className={`mt-3 ${NOTE}`}>{ABOUT.location}</p>
                </div>
              </div>
            </Panel>

            <Panel
              {...panel("contact")}
              // phones and short screens (1024×768) get the compact message field, so the
              // heading stays clear of the header when it comes back on scroll-up
              className="max-md:[&_form_.grid]:gap-3 max-md:[&_form_button]:mt-4 max-md:[&_textarea]:h-24 [@media(max-height:820px)]:[&_textarea]:h-24"
            >
              <p className={`${EYEBROW} max-md:hidden`}>
                <span aria-hidden>06 </span>Contact
              </p>
              <h2 {...head("contact")} className={`${H2} max-w-[18ch] focus:outline-none`}>
                {CONTACT_COPY.title}
              </h2>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-muted">{CONTACT_COPY.text}</p>
              <div className="mt-5 max-w-md lg:max-w-lg">
                <ContactForm dict={copy.form} />
              </div>
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <a href={`mailto:${copy.email}`} className="text-ink transition-colors duration-200 hover:text-ink-muted">
                  {copy.email}
                </a>
                <a href={copy.privacy.href} className="text-ink-muted transition-colors duration-200 hover:text-ink">
                  {copy.privacy.label}
                </a>
              </p>
            </Panel>
          </div>
        </div>
      </div>
    </section>
  );
}
