"use client";

// I14: the pool-edge line draws across the screen and becomes the outlined "A" (the brand mark).
// Progress = real load progress of hero clip V1 (shown never faster than a 2 s minimum), 9 s hard limit.
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { loading } from "@/lib/loading";
import { clipProgress, ensureClip, getStill } from "@/lib/frames";
import { smooth } from "@/lib/chain";
import { folder } from "../clips";

export default function AuLoader() {
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) { setGone(true); loading.markFinished(); return; }
    ensureClip(folder("v1"));
    getStill("/img/aurelune/s1.jpg");
    const r = root.current!;
    const line = r.querySelector<SVGPathElement>(".au-lpath")!;
    const bar = r.querySelector<SVGPathElement>(".au-lbar")!;
    const word = r.querySelector<HTMLElement>(".au-lword")!;
    const L = line.getTotalLength(), B = bar.getTotalLength();
    line.style.strokeDasharray = `${L}`;
    bar.style.strokeDasharray = `${B}`;
    const t0 = performance.now();
    let shown = 0, raf = 0, closing = false, done = false, last = t0;
    const tick = (now: number) => {
      const el = now - t0, dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const real = clipProgress(folder("v1"));
      shown += (Math.min(real, el / 2000) - shown) * (1 - Math.exp(-9 * dt));
      line.style.strokeDashoffset = `${L * (1 - Math.min(1, shown * 1.01))}`;
      bar.style.strokeDashoffset = `${B * (1 - smooth(0.82, 0.99, shown))}`;
      word.style.opacity = `${smooth(0.55, 0.9, shown)}`;
      if (!closing && ((real >= 1 && el >= 2000 && shown > 0.995) || el > 9000)) {
        closing = true;
        r.classList.add("is-out");
        setTimeout(() => { done = true; loading.markFinished(); setGone(true); }, 900);
      }
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { done = true; cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="au-loader" data-loader>
      <svg viewBox="0 0 600 190" width="600" height="190" fill="none" stroke="#D2A965" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path className="au-lpath" d="M0 160 H214 L300 24 L386 160 H600" />
        <path className="au-lbar" d="M254 112 H346" />
      </svg>
      <p className="au-lword">AURELUNE</p>
    </div>
  );
}
