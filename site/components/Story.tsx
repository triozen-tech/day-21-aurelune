"use client";
import { useCallback, useRef } from "react";
import { story } from "../content";
import FrameScrub from "@/components/video/FrameScrub";
import { ramp, smooth, type Seg } from "@/lib/chain";
import { frameSrc, still, clip, CLIP_ORDER } from "../clips";

// V6 begins on V5's last frame, ends on S8 (dawn); S8 -> S9 (dusk) is a long scroll-driven blend.
// M20 scroll-lit statement: the three chapter paragraphs (Land, Craft, Light) sit dim on their cards and light word by word, one
// chapter after the next, as the scroll passes (the title of each lights with its first word). Words never move: only brightness.
const SEGS: Seg[] = [
  { img: frameSrc("v5", 184), w: 16 },
  clip("v6"),
  { img: still(8), w: 20 },
  { img: still(9), w: 100, fade: 80, start: true },
];
export const STORY_RUN = 1800;
const L0 = 0.3, L1 = 0.92;   // lighting runs over this stretch of the film progress

export default function Story() {
  const root = useRef<HTMLElement>(null);
  const on = useCallback((p: number, st: boolean) => {
    const r = root.current;
    if (!r) return;
    r.querySelector<HTMLElement>(".au-chaps")!.style.opacity = (st ? 1 : ramp(p, 0.04, 0.14, 2, 3)).toFixed(3);
    const words = Array.from(r.querySelectorAll<HTMLElement>(".au-w"));
    const n = words.length, d = (L1 - L0) / n;
    const lit = (j: number) => (st ? 1 : smooth(L0 + d * j, L0 + d * j + d * 1.6, p));
    words.forEach((w, j) => (w.style.opacity = (0.3 + 0.7 * lit(j)).toFixed(3)));
    let j0 = 0;
    r.querySelectorAll<HTMLElement>(".au-chap").forEach((c) => {
      c.querySelector<HTMLElement>(".au-chap-title")!.style.opacity = (0.35 + 0.65 * lit(j0)).toFixed(3);
      j0 += c.querySelectorAll(".au-w").length;
    });
  }, []);
  return (
    <section ref={root} className="au-pinsec" style={{ height: 900 + STORY_RUN }} data-record-time="4.5">
      <div className="au-stage au-story">
        <FrameScrub clipOrder={CLIP_ORDER} segs={SEGS} stillAt={1} onProgress={on} />
        <div className="au-chaps">
          {story.chapters.map(([t, d]) => (
            <article key={t} className="au-chap">
              <h2 className="au-chap-title">{t}</h2>
              <p>{d.split(" ").map((w, i) => <span key={i} className="au-w">{w} </span>)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
