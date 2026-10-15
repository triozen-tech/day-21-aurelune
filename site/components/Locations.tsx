"use client";
import { useCallback, useRef } from "react";
import { locations } from "../content";
import FrameScrub from "@/components/video/FrameScrub";
import { ramp, smooth, type Seg } from "@/lib/chain";
import { frameSrc, clip, CLIP_ORDER } from "../clips";
import { LOC_HOLD, LOC_RUN, PINS, PIN_DROP, PIN_STEP } from "./locdata";

// V5 begins on V4's last frame. M238: once V5 has settled on the coast (the stage stays pinned for LOC_HOLD more px), the four
// fictional pins drop onto the coastline one by one, each with a pulse ring; card i brightens while pin i is the newest one.
// Everything is a function of the scroll position (eased by the film), so it runs at any speed, forwards and back.
const SEGS: Seg[] = [{ img: frameSrc("v4", 191), w: 16 }, clip("v5")];
export { LOC_RUN };

export default function Locations() {
  const root = useRef<HTMLElement>(null);
  const pulse = (i: number, v: boolean) => root.current?.querySelectorAll(".au-pin")[i]?.classList.toggle("is-pulse", v);
  const on = useCallback((p: number, st: boolean, hold = 0) => {
    const r = root.current;
    if (!r) return;
    const text = st ? 1 : ramp(p, 0.04, 0.14, 2, 3);
    r.querySelectorAll<HTMLElement>(".au-loc-title, .au-loc-row").forEach((el) => (el.style.opacity = text.toFixed(3)));
    let newest = -1;
    r.querySelectorAll<HTMLElement>(".au-pin").forEach((el, i) => {
      const t = st ? 1 : smooth(i * PIN_STEP, i * PIN_STEP + PIN_DROP, hold);
      el.style.opacity = Math.min(1, t * 2).toFixed(3);
      el.style.translate = `0 ${(-(1 - t) * 90).toFixed(1)}px`;
      const ring = el.querySelector<HTMLElement>(".au-ring")!;
      const q = st ? 1 : Math.min(1, Math.max(0, (hold - (i * PIN_STEP + PIN_DROP)) / 260));
      ring.style.opacity = (q > 0 && q < 1 ? 1 - q : 0).toFixed(3);
      ring.style.scale = (1 + q * 1.9).toFixed(3);
      if (t >= 1) newest = i;
    });
    r.querySelectorAll<HTMLElement>(".au-loc-card").forEach((el, i) => {
      const lit = st || newest === i;
      el.classList.toggle("is-lit", lit);
    });
    r.querySelectorAll<HTMLElement>(".au-pin").forEach((el, i) => el.classList.toggle("is-newest", !st && newest === i));
  }, []);
  return (
    <section ref={root} id="locations" className="au-pinsec" style={{ height: 900 + LOC_RUN + LOC_HOLD }} data-record-time="3">
      <div className="au-stage au-loc">
        <FrameScrub clipOrder={CLIP_ORDER} segs={SEGS} stillAt={1} onProgress={on} hold={LOC_HOLD} />
        <div className="au-hero-shade" />
        <h2 className="au-h2 au-loc-title">{locations.title}</h2>
        {PINS.map(([x, y], i) => <span key={i} className="au-pin" style={{ left: x, top: y }}><i className="au-ring" />{i + 1}</span>)}
        <div className="au-loc-row">
          {locations.areas.map(([n, t], i) => (
            <div key={n} className="au-loc-card" data-pill="Pin" onMouseEnter={() => pulse(i, true)} onMouseLeave={() => pulse(i, false)}>
              <h3><span className="au-loc-no">{i + 1}</span>{n}</h3>
              <p>{t} <small>sample</small></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
