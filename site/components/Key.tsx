"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { smooth } from "@/lib/chain";
import { VILLA_LEAD, VILLA_RUN } from "./VillaDetail";
import { AMEN_RUN } from "./Amenities";
import { STORY_RUN } from "./Story";
import { BOOK_RUN } from "./Booking";
import { LOC_HOLD, LOC_RUN, PINS, PIN_DROP, PIN_STEP } from "./locdata";

// F1 + F8 travelling key. One fixed layer; its pose is a pure function of the scroll position (stops + flights between them),
// so it runs at any speed and backwards. Hidden in the hero and in ?static=1. It lands in free space beside the content of each
// section and flies down into the brass "Book a viewing" button, which then reads "Key reserved".
const KW = 65, KH = 150;
type Pose = { x: number; y: number; r: number; sc: number; ry: number };
type Stop = { land: number; leave: number; pose: (s: number) => Pose };
const sin = Math.sin;
const mix = (a: Pose, b: Pose, e: number, ex = e, ey = e): Pose => ({ x: a.x + (b.x - a.x) * ex, y: a.y + (b.y - a.y) * ey, r: a.r + (b.r - a.r) * e, sc: a.sc + (b.sc - a.sc) * e, ry: a.ry + (b.ry - a.ry) * e });

export default function Key() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = box.current!;
    let raf = 0, inside = "";
    const q = (s: string, root: ParentNode = document) => root.querySelector<HTMLElement>(s);
    const rel = (e: HTMLElement, stage: HTMLElement) => { const r = e.getBoundingClientRect(), sr = stage.getBoundingClientRect(); return { l: r.left - sr.left, t: r.top - sr.top, w: r.width, h: r.height }; };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const secs = Array.from(document.querySelectorAll<HTMLElement>(".au-pinsec"));
      const price = q(".au-card-0 .au-price"), card = q(".au-card-0"), btn = q(".au-dock .au-brass-btn");
      if (secs.length < 6 || !price || !card || !btn) return;
      const s = window.scrollY, vh = window.innerHeight;
      const top = (i: number) => secs[i].getBoundingClientRect().top + s;
      const stage = (i: number) => q(".au-stage", secs[i])!;
      const pr = price.getBoundingClientRect(), docY = pr.top + s + pr.height / 2, cardR = card.getBoundingClientRect().right;
      const vs = top(1) + VILLA_LEAD, at = top(2), lt = top(3), st = top(4), bk = top(5);
      const pinsAt = lt + LOC_RUN + PIN_DROP;
      const rowEl = q(".au-specs > div:last-child", secs[1]), panEl = q(".au-panel", secs[1]), imgEl = q(".au-amen-img", secs[2]);
      if (!rowEl || !panEl || !imgEl) return;
      const villaLand = vs + 0.55 * VILLA_RUN;
      const stops: Stop[] = [
        { land: docY - 0.7 * vh, leave: docY - 0.3 * vh, pose: (sp) => ({ x: cardR - 50, y: docY - sp - 20, r: 10 + 10 * sin(sp / 260), sc: 0.8, ry: 0 }) },
        { land: villaLand, leave: vs + VILLA_RUN, pose: (sp) => { const w = rel(rowEl, stage(1)), pn = rel(panEl, stage(1)); return { x: pn.l - 58, y: w.t + w.h / 2, r: 0, sc: 0.9, ry: 80 * (1 - smooth(villaLand, villaLand + 280, sp)) }; } },
        { land: at + 0.35 * AMEN_RUN, leave: at + AMEN_RUN + 300, pose: (sp) => { const w = rel(imgEl, stage(2)); return { x: w.l - 62, y: w.t + 220, r: 12 * sin(sp / 240), sc: 0.9, ry: 0 }; } },
        { land: pinsAt, leave: lt + LOC_RUN + LOC_HOLD, pose: (sp) => {
          const g = Math.min(2.999, Math.max(0, (sp - pinsAt) / PIN_STEP)), i = Math.floor(g), f = smooth(0, 1, g - i);
          // the last leg parks the key in the free right margin (right of the Pellora card, which scrolls up through the pin's column)
          const a = PINS[i], b = PINS[i + 1], last = i === 2 ? f : 0, bx = i === 2 ? 1394 : b[0] + 6;
          return { x: a[0] + 6 + (bx - a[0] - 6) * f, y: a[1] + (b[1] - a[1]) * f + 26 + 84, r: (14 - 8 * last) * sin(sp / 90), sc: 0.8 - 0.08 * last, ry: 0 };
        } },
        { land: st + 0.3 * STORY_RUN, leave: bk, pose: () => ({ x: 1396, y: 300, r: 8, sc: 0.8, ry: 0 }) },
      ];
      const bkLand = bk + 0.72 * BOOK_RUN;
      const dockPose = (): Pose => { const b = btn.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2, r: 0, sc: 0.35, ry: 0 }; };
      let p: Pose, o = 1;
      const first = stops[0];
      if (s < first.land) { p = first.pose(first.land); p = { ...p, y: p.y - (first.land - s) * 0.4 }; o = smooth(first.land - 320, first.land, s); }
      else if (s >= bkLand) { p = dockPose(); o = 0; }
      else {
        p = dockPose();
        for (let i = 0; i < stops.length; i++) {
          const a = stops[i];
          if (s <= a.leave) { p = a.pose(s); break; }
          const lastStop = i === stops.length - 1;
          const nextLand = lastStop ? bkLand : stops[i + 1].land;
          if (s < nextLand) {
            const t = smooth(a.leave, nextLand, s);
            const A = a.pose(a.leave), B = lastStop ? dockPose() : stops[i + 1].pose(nextLand);
            p = lastStop ? mix(A, B, t, t * t * t * t, t) : mix(A, B, t);
            if (i === 0) o = 1 - smooth(a.leave, a.leave + 150, s) + smooth(nextLand - 250, nextLand, s);
            if (lastStop) o = 1 - smooth(nextLand - 90, nextLand, s);
            break;
          }
        }
      }
      el.style.opacity = Math.max(0, Math.min(1, o)).toFixed(3);
      el.style.transform = `translate3d(${(p.x - KW / 2).toFixed(1)}px, ${(p.y - KH / 2).toFixed(1)}px, 0) rotate(${p.r.toFixed(2)}deg) scale(${p.sc.toFixed(3)})`;
      (el.firstElementChild as HTMLElement).style.transform = `perspective(500px) rotateY(${p.ry.toFixed(1)}deg)`;
      const now = s >= bkLand ? "in" : "";
      if (now !== inside) { inside = now; if (now) document.documentElement.dataset.key = "in"; else delete document.documentElement.dataset.key; }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); delete document.documentElement.dataset.key; };
  }, []);
  return (
    <div ref={box} className="au-key" aria-hidden style={{ opacity: 0 }}>
      <div className="au-key-face"><img src="/img/aurelune/key.png" alt="" width={KW} height={KH} /></div>
    </div>
  );
}
