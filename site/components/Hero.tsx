"use client";
import { useCallback, useRef } from "react";
import { hero } from "../content";
import FrameScrub from "@/components/video/FrameScrub";
import { ramp, smooth, type Seg } from "@/lib/chain";
import { clip, CLIP_ORDER } from "../clips";

// HR02 + M250: V1 then V2 on one pin (6 s). A warm light cone opens over the dusk room, the headline rises into it,
// the info bar rises in over V1. The headline sits in the upper third, clear of the pool glow (centre-lower).
const SEGS: Seg[] = [clip("v1"), clip("v2")];
export const HERO_RUN = 2400;
// the film ends at HERO_RUN; the stage then stays pinned for HERO_HOLD more while the Residences sheet rises over its last frame
export const HERO_HOLD = 900;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const on = useCallback((p: number, still: boolean) => {
    const r = root.current;
    if (!r) return;
    const e = still ? 0.2 : p;
    const cone = r.querySelector<HTMLElement>(".au-cone")!;
    const title = r.querySelector<HTMLElement>(".au-hero-title")!;
    const info = r.querySelector<HTMLElement>(".au-info")!;
    const open = smooth(0, 0.12, e);
    cone.style.opacity = (0.95 * open * (1 - 0.55 * smooth(0.3, 0.6, e))).toFixed(3);
    cone.style.transform = `scaleY(${(0.9 + 0.1 * open).toFixed(3)})`;
    title.style.opacity = ramp(e, 0.02, 0.1, 0.6, 0.72).toFixed(3);
    title.style.transform = `translateY(${((1 - smooth(0.02, 0.13, e)) * 70).toFixed(1)}px)`;
    const i = smooth(0.05, 0.17, e);
    info.style.opacity = i.toFixed(3);
    info.style.transform = `translateY(${((1 - i) * 40).toFixed(1)}px)`;
  }, []);
  return (
    <section ref={root} id="top" className="au-pinsec" style={{ height: 900 + HERO_RUN + HERO_HOLD }} data-record-time="5">
      <span style={{ position: "absolute", top: 2000, left: 0 }} data-record-time="2.6" data-record-hold="1.3" aria-hidden />
      <div className="au-stage au-hero">
        <FrameScrub clipOrder={CLIP_ORDER} segs={SEGS} stillAt={0.05} onProgress={on} hold={HERO_HOLD}>
          <div className="au-cone" />
        </FrameScrub>
        <div className="au-hero-shade" />
        <h1 className="au-hero-title">{hero.title.map((l) => <span key={l}>{l}</span>)}</h1>
        <div className="au-info">
          {hero.info.map(([k, v], i) => (
            <div key={k} className="au-info-cell" {...(i === 1 ? { "data-hover-demo": "", "data-hover-hold": "1.2" } : {})}>
              <span className="au-info-k">{k}</span>
              <span className="au-info-v">{v}{k === "From" && <small> sample</small>}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
