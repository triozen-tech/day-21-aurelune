// Aurelune's 7 Veo clips as data for the kit's FrameScrub timeline mode (components/video/FrameScrub.tsx).
// join = [first frame, length] (0-based) of the 4-frame dissolve Veo baked into the clip; the scroll skips it.
import type { ClipSeg } from "@/lib/chain";

const JOINS: Record<string, [number, number]> = { v2: [61, 4], v5: [64, 4], v6: [100, 4], v7: [137, 4] };
export type ClipName = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7";
export const folder = (c: ClipName) => `/frames/aurelune-${c}`;
export const CLIP_ORDER = (["v1", "v2", "v3", "v4", "v5", "v6", "v7"] as ClipName[]).map(folder);
/** A clip segment of a timeline; w = scroll units (default: its frame count). */
export const clip = (c: ClipName, w?: number): ClipSeg => ({ clip: folder(c), w, join: JOINS[c] });
export const frameSrc = (c: ClipName, i: number) => `${folder(c)}/frame_${String(i + 1).padStart(4, "0")}.webp`;
export const still = (n: number) => `/img/aurelune/s${n}.jpg`;
