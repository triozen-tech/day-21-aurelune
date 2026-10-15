"use client";
import { useCallback, useRef, useState } from "react";
import { booking } from "../content";
import FrameScrub from "@/components/video/FrameScrub";
import { ramp, smooth, type Seg } from "@/lib/chain";
import { still, clip, CLIP_ORDER } from "../clips";

// V7 begins on S9 (dusk): cross-fades from the Story stage in place.
// M89 batched viewport stagger: the calendar days come in a week (row) at a time, then the time slots one by one; the scroll then
// "picks" the 12th and 18:00 and the chips fill brass (a click still works). All of it is a function of the film progress.
const SEGS: Seg[] = [{ img: still(9), w: 16 }, clip("v7")];
export const BOOK_RUN = 1600;
const D0 = 0.13, DSTEP = 0.04, DLEN = 0.08, T0 = 0.4, TSTEP = 0.05, PICK = 0.62;

function Month({ y, m, on }: { y: number; m: number; on: number[] }) {
  const first = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(first).fill(0), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div className="au-month">
      <h3>{new Date(y, m, 1).toLocaleString("en", { month: "long" })} {y}</h3>
      <div className="au-days">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <b key={i}>{d}</b>)}
        {cells.map((d, i) => <span key={i} data-row={Math.floor(i / 7)} className={on.includes(d) ? "au-pickday" : ""}>{d || ""}</span>)}
      </div>
    </div>
  );
}

export default function Booking() {
  const [t, setT] = useState(-1);
  const clicked = useRef(false);
  const auto = useRef(-1);
  const root = useRef<HTMLElement>(null);
  const on = useCallback((p: number, st: boolean) => {
    const r = root.current;
    if (!r) return;
    r.querySelector<HTMLElement>(".au-book-body")!.style.opacity = (st ? 1 : ramp(p, 0.03, 0.11, 2, 3)).toFixed(3);
    r.querySelectorAll<HTMLElement>(".au-days span").forEach((el) => {
      const k = st ? 1 : smooth(D0 + DSTEP * Number(el.dataset.row), D0 + DSTEP * Number(el.dataset.row) + DLEN, p);
      el.style.opacity = k.toFixed(3);
      el.style.translate = `0 ${((1 - k) * 18).toFixed(1)}px`;
      el.classList.toggle("is-on", el.classList.contains("au-pickday") && (st || p > PICK - 0.08));
    });
    r.querySelectorAll<HTMLElement>(".au-times button").forEach((el, i) => {
      const k = st ? 1 : smooth(T0 + TSTEP * i, T0 + TSTEP * i + DLEN, p);
      el.style.opacity = k.toFixed(3);
      el.style.translate = `0 ${((1 - k) * 18).toFixed(1)}px`;
    });
    const a = st || p > PICK ? 1 : -1;
    if (!clicked.current && a !== auto.current) { auto.current = a; setT(a); }
  }, []);
  return (
    <section ref={root} id="book" className="au-pinsec" style={{ height: 900 + BOOK_RUN }} >
      <span style={{ position: "absolute", top: Math.round(0.7 * BOOK_RUN), left: 0 }} data-record-time="4" data-record-hold="2.4" aria-hidden />
      <div className="au-stage au-book">
        <FrameScrub clipOrder={CLIP_ORDER} segs={SEGS} stillAt={0.7} onProgress={on} />
        <div className="au-book-body">
          <h2 className="au-h2 au-book-title">{booking.title}</h2>
          <div className="au-book-row">
            <div className="au-cal"><Month y={2026} m={10} on={[]} /><Month y={2026} m={11} on={[12]} /></div>
            <div className="au-book-side">
              <p className="au-book-sum">12 December · Villa Lunessa</p>
              <div className="au-times">
                {booking.times.map((x, i) => (
                  <button key={x} data-on={t === i ? "" : undefined} onClick={() => { clicked.current = true; setT(i); }} data-pill="Pick" {...(i === 2 ? { "data-hover-demo": "click", "data-hover-hold": "1.2" } : {})}>{x}</button>
                ))}
              </div>
              <button className="au-brass-btn au-big">{booking.cta}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
