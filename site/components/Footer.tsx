"use client";
import { useRef } from "react";
import { footer } from "../content";
import { smooth } from "@/lib/chain";
import { useScrollFn } from "./scrollfn";

// M222: the giant outlined AURELUNE rises into place from below the footer edge, its outline draws, then the letters fill.
// Driven by how much of the footer is on screen, so it is final when the page is scrolled to the end (and in ?static=1).
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useScrollFn(root, (r, still) => {
    const t = still ? 1 : Math.min(1, Math.max(0, (window.innerHeight - r.top) / r.height));
    const w = root.current!.querySelector<SVGElement>(".au-wm")!;
    const rise = smooth(0.1, 0.6, t);
    (w as unknown as HTMLElement).style.translate = `0 ${((1 - rise) * 190).toFixed(1)}px`;
    const draw = smooth(0.1, 0.72, t);
    w.querySelectorAll<SVGTextElement>("text").forEach((el) => {
      el.style.strokeDashoffset = ((1 - draw) * 1500).toFixed(1);
      el.style.fillOpacity = smooth(0.74, 0.96, t).toFixed(3);
    });
  });
  return (
    <footer ref={root} className="au-foot">
      <div className="au-foot-links">{footer.links.map((l) => <a key={l} href={l === "Book a viewing" ? "#book" : `#${l.toLowerCase()}`}>{l}</a>)}</div>
      <p className="au-foot-note">{footer.note}</p>
      <svg className="au-wm" viewBox="0 0 1248 214" aria-hidden>
        <text x="624" y="176" textAnchor="middle" fontSize="232">AURELUNE</text>
      </svg>
    </footer>
  );
}
