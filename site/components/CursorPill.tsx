"use client";
import { useEffect, useRef } from "react";

// Cursor label pill: a small brass pill beside the pointer with a short word ("View", "Light", "Open", "Pin", "Pick") for every
// element marked data-pill. It follows pointermove, which the engine's record cursor also sends, so it shows in ?record=1 too.
// Placement rules: the pill never covers a word (every text line under its box is tested) and hides when it would sit within
// 24 px of a button or link that is not itself a labelled target. Of the candidate spots it takes the first that passes, else it hides.
const GAP = 24;
type R = { l: number; t: number; r: number; b: number };
const hit = (a: R, b: R) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;

export default function CursorPill() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pill = box.current!;
    const range = document.createRange();
    let label = "", px = 0, py = 0, raf = 0, last = "";
    const textUnder = (z: R) => {
      const seen = new Set<Element>();
      for (let y = z.t; y <= z.b + 1; y += 12) for (let x = z.l; x <= z.r + 1; x += 16) {
        for (const e of document.elementsFromPoint(Math.min(x, z.r), Math.min(y, z.b))) if (e !== pill) seen.add(e);
      }
      for (const e of seen) {
        if (e.closest(".au-key, .au-pill, [data-record-cursor]")) continue;
        for (const n of Array.from(e.childNodes)) {
          if (n.nodeType !== 3 || !n.textContent!.trim()) continue;
          range.selectNodeContents(n);
          for (const q of Array.from(range.getClientRects())) if (hit({ l: q.left, t: q.top, r: q.right, b: q.bottom }, z)) return true;
        }
      }
      return false;
    };
    const nearButtons = (z: R) => {
      for (const e of Array.from(document.querySelectorAll<HTMLElement>("a[href], button"))) {
        if (e.closest("[data-pill]")) continue;
        const q = e.getBoundingClientRect();
        if (!q.width || !q.height) continue;
        if (hit({ l: q.left - GAP, t: q.top - GAP, r: q.right + GAP, b: q.bottom + GAP }, z)) return true;
      }
      return false;
    };
    const place = () => {
      raf = 0;
      if (!label) { pill.style.opacity = "0"; return; }
      if (last !== label) { pill.textContent = label; last = label; }
      const w = pill.offsetWidth, h = pill.offsetHeight, vw = window.innerWidth, vh = window.innerHeight;
      const spots: [number, number][] = [[24, 22], [24, -h - 16], [-w - 24, 22], [-w - 24, -h - 16], [-w / 2, -h - 34], [-w / 2, 36], [48, -h / 2], [-w - 48, -h / 2]];
      for (const [dx, dy] of spots) {
        const z = { l: px + dx, t: py + dy, r: px + dx + w, b: py + dy + h };
        if (z.l < 8 || z.t < 8 || z.r > vw - 8 || z.b > vh - 8) continue;
        if (textUnder(z) || nearButtons(z)) continue;
        pill.style.transform = `translate3d(${z.l.toFixed(0)}px, ${z.t.toFixed(0)}px, 0)`;
        pill.style.opacity = "1";
        return;
      }
      pill.style.opacity = "0";
    };
    const onMove = (e: Event) => {
      const m = e as PointerEvent;
      px = m.clientX; py = m.clientY;
      const t = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-pill]") : null;
      label = t?.dataset.pill ?? "";
      if (!raf) raf = requestAnimationFrame(place);
    };
    const onLeave = (e: Event) => {
      const rt = (e as PointerEvent).relatedTarget;
      if (rt instanceof Element && rt.closest("[data-pill]")) return;
      label = "";
      if (!raf) raf = requestAnimationFrame(place);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onMove);
    document.addEventListener("pointerout", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onMove);
      document.removeEventListener("pointerout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={box} className="au-pill" aria-hidden />;
}
