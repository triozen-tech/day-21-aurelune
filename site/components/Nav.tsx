"use client";
import { useEffect } from "react";
import { nav } from "../content";
import { prefersReducedMotion } from "@/lib/gsap";

// M64: a light spark runs along the border of the brass button (CSS, off in ?static=1). The label swaps to "Key reserved"
// when the travelling key has flown into the button (html[data-key="in"], set by Key.tsx).
export default function Nav() {
  useEffect(() => { if (prefersReducedMotion()) document.documentElement.classList.add("au-static"); }, []);
  return (
    <nav className="au-dock" aria-label="Main">
      <a className="au-dock-logo" href="#top">AURELUNE</a>
      {nav.links.map(([l, h]) => <a key={l} className="au-dock-link" href={h}>{l}</a>)}
      <a className="au-brass-btn au-spark" href="#book"><span className="au-lbl-a">{nav.cta}</span><span className="au-lbl-b" aria-hidden>Key reserved</span></a>
    </nav>
  );
}
