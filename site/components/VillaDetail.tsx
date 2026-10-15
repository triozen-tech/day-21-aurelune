"use client";
import { useCallback, useRef, useState } from "react";
import { detail } from "../content";
import rooms from "../rooms.json";
import FrameScrub from "@/components/video/FrameScrub";
import { smooth, type Seg } from "@/lib/chain";
import { clip, CLIP_ORDER } from "../clips";

// VD01 + M86: V3 aerial -> cutaway (S4), then the lit S5 is revealed over unlit S4 room by room: three soft PNG alpha masks
// (lit-minus-unlit), the roof terrace lit in code (S5 does not light it), then everything else lit in S5 so the last frame is S5.
// Units = film timeline units (V3 = 192). The frame shrinks left to make room for the spec panel, then returns to full
// frame so the hand-over to Amenities (S5 -> V4) happens in place.
const SEGS: Seg[] = [clip("v3"), { img: "/img/aurelune/s4.jpg", w: 250 }];
const W = 442, R0 = 244, L = 40;
const SC = 0.6, TX = 52, TY = 80;
// The frame shrinks (scale SC, shifted TX, TY) while V3 settles into the cutaway and then stays shrunk to the end of the section
// (Amenities opens on the same shrunk frame and grows it). Knots = [timeline unit, shrink 0..1]: measured so that the villa's
// leftmost point (stage x 43 -> 14 over V3's last frames, 13 in S4/S5) stays >= 58 px from the viewport edge; the breathing adds <= 7 px.
const SHRINK: [number, number][] = [[108, 0], [124, 0.45], [132, 0.6], [140, 0.69], [148, 0.78], [156, 0.83], [164, 0.87], [172, 0.9], [180, 0.93], [190, 0.97], [212, 1]];
const shrinkAt = (u: number) => {
  if (u <= SHRINK[0][0]) return 0;
  for (let i = 1; i < SHRINK.length; i++) if (u <= SHRINK[i][0]) { const [a, x] = SHRINK[i - 1], [b, y] = SHRINK[i]; return x + ((y - x) * (u - a)) / (b - a); }
  return 1;
};
export const VILLA_RUN = 2800;
// The section starts LEAD px early, under the Residences sheet: the stage is already pinned on V3's first frame when the sheet lifts.
export const VILLA_LEAD = 900;
const FLOOR_OF = [0, 0, 1, 2];
// Rooms in reveal order. `at` = centroid of the room's lit area (alpha-weighted centroid of its mask; the terrace polygon's centroid),
// in the fitted 1600x900 frame. `lab` = label centre on the 1440x900 stage, in the free sky above the villa; the leader runs
// down from the label, across at y = ELBOW and down to the dot, so it never crosses the pool or the loungers.
const ROOMS = [
  { name: "Living", img: "/img/aurelune/m-living.png", at: [595, 479], lab: [230, 100] },
  { name: "Kitchen", img: "/img/aurelune/m-kitchen.png", at: [971, 496], lab: [560, 100] },
  { name: "Suite", img: "/img/aurelune/m-suite.png", at: [659, 260], lab: [330, 100] },
  { name: "Roof terrace", img: "", at: [1112, 364], lab: [790, 100] },
];
const ELBOW = 148;
// Hover lighting (Round 4): rooms 0-2 are the interior masks, 3 the roof terrace. A floor chip lights its own rooms; a spec row lights
// the rooms it talks about; clicking a floor locks the light on that floor and every floor below it (Upper = Ground + Upper).
const SPEC_ROOMS: Record<string, number[]> = { Bedrooms: [2], Bathrooms: [1, 2], "Built area": [0, 1, 2], Plot: [3], Price: [] };
const floorRooms = (f: number) => [0, 1, 2, 3].filter((i) => FLOOR_OF[i] === f);
const stackRooms = (f: number) => [0, 1, 2, 3].filter((i) => FLOOR_OF[i] <= f);
const sx = (x: number) => TX + SC * (x - 80), sy = (y: number) => TY + SC * y;
const TERR = rooms.terrace.map((p) => p.join(",")).join(" ");
const EXTEND = "linear-gradient(180deg, #4c6874 0 800px, #4c6874 800px, #4a6672 900px, #44606c 1000px, #3e5864 1100px, #374f59 1200px, #314752 1300px, #2a3e47 1400px, #25383f 1500px, #233239 1600px, #212c32 1700px, #212c32 100%)";
const lenisOf = () => (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;

export default function VillaDetail() {
  const root = useRef<HTMLElement>(null);
  const [lock, setLockState] = useState(-1);
  const lockRef = useRef(-1);
  const hoverRooms = useRef<number[]>([]);
  const paint = useCallback(() => {
    const lit = new Set<number>([...hoverRooms.current, ...(lockRef.current >= 0 ? stackRooms(lockRef.current) : [])]);
    root.current?.querySelectorAll<SVGElement>(".au-hv").forEach((el) => el.classList.toggle("is-lit", lit.has(Number(el.getAttribute("data-room")))));
  }, []);
  const hv = (rooms: number[]) => ({ onMouseEnter: () => { hoverRooms.current = rooms; paint(); }, onMouseLeave: () => { hoverRooms.current = []; paint(); } });
  const setLock = (f: number) => { lockRef.current = f; setLockState(f); paint(); };
  const on = useCallback((p: number, still: boolean) => {
    const r = root.current;
    if (!r) return;
    const u = still ? R0 + 4 * L + 2 : p * W;
    const q = (s: string) => r.querySelector<HTMLElement>(s)!;
    const qa = (s: string) => Array.from(r.querySelectorAll<HTMLElement>(s));
    const sh = shrinkAt(u);
    q(".au-shrink").style.transform = `translate(${(TX * sh).toFixed(2)}px, ${(TY * sh).toFixed(2)}px) scale(${(1 - (1 - SC) * sh).toFixed(4)})`;
    const pan = smooth(206, 236, u);
    q(".au-panel").style.opacity = pan.toFixed(3);
    q(".au-floors").style.opacity = pan.toFixed(3);
    q(".au-panel").style.pointerEvents = q(".au-floors").style.pointerEvents = pan > 0.6 ? "auto" : "none";
    if (u < 200 && lockRef.current >= 0) { lockRef.current = -1; setLockState(-1); hoverRooms.current = []; paint(); }
    const idx = u >= R0 && u < R0 + 4 * L ? Math.floor((u - R0) / L) : -1;
    const lit = (i: number) => smooth(R0 + i * L, R0 + i * L + 26, u);
    r.querySelectorAll<SVGImageElement>(".au-mimg").forEach((el, i) => el.setAttribute("opacity", lit(i).toFixed(3)));
    const full = smooth(R0 + 4 * L, R0 + 4 * L + 16, u);
    r.querySelector<SVGImageElement>(".au-s5full")!.setAttribute("opacity", full.toFixed(3));
    r.querySelector<SVGGElement>(".au-terr")!.setAttribute("opacity", (lit(3) * (1 - full)).toFixed(3));
    r.querySelectorAll<SVGCircleElement>(".au-glint").forEach((el, i) => el.setAttribute("opacity", smooth(R0 + 3 * L + 8 + i * 1.5, R0 + 3 * L + 20 + i * 1.5, u).toFixed(3)));
    qa(".au-room-label, .au-lead").forEach((el, k) => {
      const i = k % 4;
      el.style.opacity = (still ? 1 : idx === i ? smooth(R0 + i * L + 4, R0 + i * L + 14, u) * (1 - smooth(R0 + (i + 1) * L - 8, R0 + (i + 1) * L - 2, u)) : 0).toFixed(3);
    });
    qa(".au-room").forEach((el, i) => {
      const done = u >= R0 + (i + 1) * L;
      el.classList.toggle("is-on", idx === i);
      el.classList.toggle("is-done", done || still);
      (el.querySelector(".au-room-bar") as HTMLElement).style.transform = `scaleX(${idx === i ? ((u - R0) % L) / L : done || still ? 1 : 0})`;
    });
    qa(".au-specs > div").forEach((el, i) => {
      const t = still ? 1 : smooth(R0 + i * 30, R0 + i * 30 + 30, u);
      (el.querySelector(".au-rule") as HTMLElement).style.transform = `scaleX(${t})`;
      el.style.opacity = (0.25 + 0.75 * t).toFixed(3);
    });
    const fl = idx >= 0 ? FLOOR_OF[idx] : u >= R0 + 4 * L || still ? 2 : -1;
    qa(".au-floor").forEach((el, i) => el.classList.toggle("is-on", i === fl));
  }, [paint]);

  const go = (floor: number) => {
    if (/record/.test(location.search)) return;
    const r = root.current!;
    const room = FLOOR_OF.indexOf(floor);
    const u = R0 + room * L + 20;
    const top = r.getBoundingClientRect().top + window.scrollY + VILLA_LEAD;
    lenisOf()?.scrollTo(top + (u / W) * VILLA_RUN, { duration: 1.4 });
  };

  return (
    <section ref={root} className="au-pinsec" style={{ height: 900 + VILLA_LEAD + VILLA_RUN, marginTop: -VILLA_LEAD }} >
      <span id="villa" style={{ position: "absolute", top: VILLA_LEAD, left: 0 }} />
      <span style={{ position: "absolute", top: VILLA_LEAD + Math.round((240 / W) * VILLA_RUN), left: 0 }} data-record-time="5" data-record-hold="2.4" aria-hidden />
      <div className="au-stage au-detail">
        <div className="au-shrink">
          <div className="au-extend" style={{ background: EXTEND }} />
          <FrameScrub clipOrder={CLIP_ORDER} segs={SEGS} stillAt={(R0 + 4 * L + 2) / W} onProgress={on} lead={VILLA_LEAD}>
            <svg className="au-ov" viewBox="80 0 1440 900" preserveAspectRatio="none" aria-hidden>
              <defs>
                <filter id="au-soft" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="7" /></filter>
                <filter id="au-glint" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="3" /></filter>
                <mask id="au-rooms" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
                  {ROOMS.slice(0, 3).map((m) => <image key={m.name} className="au-mimg" href={m.img} x="0" y="0" width="1600" height="900" opacity="0" />)}
                </mask>
                <mask id="au-terrm" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
                  <polygon points={TERR} fill="#fff" filter="url(#au-soft)" />
                </mask>
                {ROOMS.slice(0, 3).map((m, i) => <mask key={m.name} id={`au-hm-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900"><image href={m.img} x="0" y="0" width="1600" height="900" /></mask>)}
                <radialGradient id="au-warm" cx="1110" cy="370" r="360" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#ffb860" stopOpacity=".55" /><stop offset="1" stopColor="#ff9a3c" stopOpacity=".22" />
                </radialGradient>
              </defs>
              <image href="/img/aurelune/s5.jpg" x="0" y="0" width="1600" height="900" mask="url(#au-rooms)" />
              <g className="au-terr" opacity="0" mask="url(#au-terrm)" style={{ isolation: "isolate" }}>
                <rect x="0" y="0" width="1600" height="900" fill="url(#au-warm)" style={{ mixBlendMode: "screen" }} />
                <rect x="0" y="0" width="1600" height="900" fill="#ffd9a0" fillOpacity=".3" style={{ mixBlendMode: "screen" }} />
                {rooms.glints.map(([x, y], i) => <circle key={i} className="au-glint" cx={x} cy={y} r="5" fill="#ffe2b0" opacity="0" filter="url(#au-glint)" />)}
              </g>
              {ROOMS.slice(0, 3).map((m, i) => <image key={m.name} className="au-hv" data-room={i} href="/img/aurelune/s5.jpg" x="0" y="0" width="1600" height="900" mask={`url(#au-hm-${i})`} />)}
              <g className="au-hv" data-room="3" mask="url(#au-terrm)" style={{ isolation: "isolate" }}>
                <rect x="0" y="0" width="1600" height="900" fill="url(#au-warm)" style={{ mixBlendMode: "screen" }} />
                <rect x="0" y="0" width="1600" height="900" fill="#ffd9a0" fillOpacity=".3" style={{ mixBlendMode: "screen" }} />
              </g>
              <image className="au-s5full" href="/img/aurelune/s5.jpg" x="0" y="0" width="1600" height="900" opacity="0" />
            </svg>
          </FrameScrub>
        </div>
        <svg className="au-leads" viewBox="0 0 1440 900" aria-hidden>
          {ROOMS.map((m) => (
            <g key={m.name} className="au-lead" opacity="0">
              <polyline points={`${m.lab[0]},${m.lab[1] + 28} ${m.lab[0]},${ELBOW} ${sx(m.at[0])},${ELBOW} ${sx(m.at[0])},${sy(m.at[1])}`} />
              <circle cx={sx(m.at[0])} cy={sy(m.at[1])} r="5" />
            </g>
          ))}
        </svg>
        {ROOMS.map((m) => (
          <span key={m.name} className="au-room-label" style={{ left: m.lab[0], top: m.lab[1] }}>{m.name}</span>
        ))}
        <div className="au-floors">
          {detail.floors.map((f, i) => (
            <button key={f} className="au-floor" data-lock={lock === i ? "" : undefined} data-pill="Light" {...hv(floorRooms(i))} onClick={() => { setLock(lockRef.current === i ? -1 : i); go(i); }} {...(i === 1 ? { "data-hover-demo": "click", "data-hover-hold": "1.2" } : {})}>{f}</button>
          ))}
        </div>
        <aside className="au-panel">
          <p className="au-panel-villa">{detail.villa}</p>
          <h2 className="au-h2 au-h2-s">{detail.title}</h2>
          <ol className="au-rooms">
            {ROOMS.map((m, i) => (
              <li key={m.name} className="au-room" data-pill="Light" {...hv([i])}><span>{m.name}</span><em>{detail.floors[FLOOR_OF[i]]}</em><i className="au-room-bar" /></li>
            ))}
          </ol>
          <dl className="au-specs">
            {detail.specs.map(([k, v]) => (
              <div key={k} {...(SPEC_ROOMS[k]?.length ? { "data-pill": "Light", ...hv(SPEC_ROOMS[k]) } : {})}><dt>{k}</dt><dd>{v}{k === "Price" && <small> sample</small>}</dd><i className="au-rule" /></div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
