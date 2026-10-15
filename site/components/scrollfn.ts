"use client";
import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/** Runs `fn(rect, still)` every frame while the element is near the viewport. Every motion that uses it is a pure function of
 *  the element's position on screen (so any scroll speed, forward and back). `?static=1`: one call with still = true. */
export function useScrollFn(ref: RefObject<HTMLElement | null>, fn: (r: DOMRect, still: boolean) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { fn(el.getBoundingClientRect(), true); return; }
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = el.getBoundingClientRect();
      if (r.bottom > -400 && r.top < window.innerHeight + 400) fn(r, false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
