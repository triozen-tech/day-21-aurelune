"use client";
import { useCallback, useRef, useState } from "react";
import { amenities } from "../content";
import FrameScrub from "@/components/video/FrameScrub";
import { ramp, smooth, type Seg } from "@/lib/chain";
import { still, clip, CLIP_ORDER } from "../clips";

// V4 starts on the lit cutaway S5 (cross-fades from it). The stage opens on the SAME shrunk frame the villa section ended on
// and grows it back to full size, so the hand-over is seamless. M18 (GL15): the accordion card sits at left; the picture panel
// at right opens by a clip-path corner growing from its top-left, one facility after the next, following the scroll.
// Panels 2-5 are crops of existing stills (placeholders; see DESIGN.md for the Flow stills they need).
const SEGS: Seg[] = [{ img: still(5), w: 16 }, clip("v4")];
export const AMEN_RUN = 1400;
const SC = 0.6, TX = 52, TY = 80;
const EXTEND = "linear-gradient(180deg, #4c6874 0 800px, #4c6874 800px, #4a6672 900px, #44606c 1000px, #3e5864 1100px, #374f59 1200px, #314752 1300px, #2a3e47 1400px, #25383f 1500px, #233239 1600px, #212c32 1700px, #212c32 100%)";
const P0 = 0.2, STEP = 0.15, GROW = 0.075;
// background crops: [still, zoom %, x %, y %]
const CROPS: [string, number, number, number][] = [["s6", 100, 50, 50], ["am-cinema", 100, 50, 50], ["am-garden", 100, 50, 50], ["am-spa", 100, 50, 50], ["am-gym", 100, 50, 50]];

export default function Amenities() {
  const [open, setOpen] = useState(0);
  const [hov, setHov] = useState<number | null>(null);   // hovered / focused panel (Round 4)
  const [pin, setPin] = useState<number | null>(null);   // clicked panel, until the scroll moves on to another facility
  const [trail, setTrail] = useState<number | null>(null); // panel that just lost the override (keeps its transition while it closes)
  const cur = useRef(0);
  const timer = useRef(0);
  const over = hov ?? pin;
  const shown = over ?? open;
  const hover = (i: number | null) => {
    window.clearTimeout(timer.current);
    if (i === null) { setTrail(over); timer.current = window.setTimeout(() => setTrail(null), 600); }
    setHov(i);
  };
  const root = useRef<HTMLElement>(null);
  const on = useCallback((p: number, st: boolean) => {
    const r = root.current;
    if (!r) return;
    const q = (s: string) => r.querySelector<HTMLElement>(s)!;
    const sh = st ? 0 : 1 - smooth(0.01, 0.15, p);
    q(".au-shrink").style.transform = `translate(${(TX * sh).toFixed(2)}px, ${(TY * sh).toFixed(2)}px) scale(${(1 - (1 - SC) * sh).toFixed(4)})`;
    const o = (st ? 1 : ramp(p, 0.13, 0.21, 2, 3)).toFixed(3);
    q(".au-amen-card").style.opacity = o;
    q(".au-amen-img").style.opacity = o;
    let k = 0;
    r.querySelectorAll<HTMLElement>(".au-amen-pic").forEach((el, i) => {
      const g = st ? (i === 0 ? 1 : 0) : i === 0 ? smooth(P0 - 0.02, P0 + GROW, p) : smooth(P0 + i * STEP, P0 + i * STEP + GROW, p);
      const c = ((1 - g) * 100).toFixed(2);
      el.style.clipPath = `inset(0 ${c}% ${c}% 0)`;
      if (g > 0.02) k = i;
    });
    if (!st && k !== cur.current) { cur.current = k; setOpen(k); setPin(null); }
  }, []);
  return (
    <section ref={root} className="au-pinsec" style={{ height: 900 + AMEN_RUN }} data-record-time="3.5">
      <div className="au-stage au-amen au-detail">
        <div className="au-shrink">
          <div className="au-extend" style={{ background: EXTEND }} />
          <FrameScrub clipOrder={CLIP_ORDER} segs={SEGS} stillAt={0.55} onProgress={on} />
        </div>
        <div className="au-amen-img" aria-hidden>
          {CROPS.map(([s, z, x, y], i) => (
            <div key={s} data-i={i} className={`au-amen-pic${over === i ? " is-hov" : ""}${trail === i ? " tr" : ""}`} style={{ backgroundImage: `url(/img/aurelune/${s}.jpg)`, backgroundSize: `${z}% auto`, backgroundPosition: `${x}% ${y}%`, zIndex: i, clipPath: i === 0 ? undefined : "inset(0 100% 100% 0)" }} />
          ))}
          <span className="au-amen-tag">{amenities.items[shown][0]}</span>
        </div>
        <div className="au-amen-card">
          <h2 className="au-h2 au-h2-m">{amenities.title}</h2>
          <ul className="au-acc">
            {amenities.items.map(([n, d], i) => (
              <li key={n} className={shown === i ? "is-open" : ""}>
                <button data-pill="Open" onMouseEnter={() => hover(i)} onMouseLeave={() => hover(null)} onFocus={() => hover(i)} onBlur={() => hover(null)} onClick={() => setPin(i)} {...(i === 2 ? { "data-hover-demo": "", "data-hover-hold": "1.2" } : {})}>
                  <span className="au-acc-no">0{i + 1}</span><span className="au-acc-name">{n}</span>
                </button>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
