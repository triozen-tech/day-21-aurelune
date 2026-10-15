"use client";
import { useRef } from "react";
import { villas } from "../content";
import { smooth } from "@/lib/chain";
import { useScrollFn } from "./scrollfn";

// M1 curtain reveal in a mask: a stone curtain covers each arch and slides up off it, one arch after the next, driven by the scroll
// (position of the card row on screen). The status chip and the price appear once their arch is open.
// The section is also the "sheet" of the hero hand-over: it rises over the hero's last frame and later lifts off the S3 aerial.
export default function Residences() {
  const root = useRef<HTMLElement>(null);
  useScrollFn(root, (_r, still) => {
    const el = root.current!;
    const row = el.querySelector<HTMLElement>(".au-res-row")!;
    const vh = window.innerHeight;
    const t = still ? 1 : Math.min(1, Math.max(0, (vh * 0.96 - row.getBoundingClientRect().top) / (vh * 0.72)));
    el.querySelectorAll<HTMLElement>(".au-card").forEach((card, i) => {
      const c = smooth(i * 0.24, i * 0.24 + 0.42, t);
      card.querySelector<HTMLElement>(".au-curtain")!.style.transform = `translateY(${(-c * 101).toFixed(2)}%)`;
      const a = smooth(0.8, 1, c);
      card.querySelectorAll<HTMLElement>(".au-chip, .au-price").forEach((x) => {
        x.style.opacity = a.toFixed(3);
        x.style.translate = `0 ${((1 - a) * 14).toFixed(1)}px`;
      });
    });
  });
  return (
    <section ref={root} id="residences" className="au-res">
      <h2 className="au-h2">Three villas,<br />one coast.</h2>
      <div className="au-res-row" data-record-time="2.4" data-record-hold="2.4" data-record-align="center">
        {villas.map((v, i) => (
          <article key={v.name} className={`au-card au-card-${i}`} data-pill="View" {...(i === 1 ? { "data-hover-demo": "", "data-hover-hold": "1.2" } : {})}>
            <div className="au-arch"><img src={v.img} alt={v.name} /><div className="au-curtain" /></div>
            <span className={`au-chip au-chip-${v.status.split(" ")[0].toLowerCase()}`}>{v.status}</span>
            <h3 className="au-card-name">{v.name}</h3>
            <p className="au-card-spec">{v.beds} beds · {v.baths} baths · {v.area}</p>
            <p className="au-card-spec">Plot {v.plot}</p>
            <p className="au-price"><span>From</span> ₹ {v.price} <small>sample</small></p>
          </article>
        ))}
      </div>
    </section>
  );
}
