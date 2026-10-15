# DESIGN.md — Day 21 · Aurelune Residences (luxury villas)

**Mode: Pro** (LEAN). Desktop 1440×900 only. Hand-scrolled reel: every scroll motion is a pure function of scroll position (any speed, forward and back, alive when stopped). **VIDEO-FIRST (as Day 19):** each section's main move is a Veo clip split into frames and scrubbed by the scroll (`npm run film-frames` → `FrameScrub` / chain helper). Hand-written code only for what a video can't show: labels, counters, chips, the floor selector, the travelling key, the booking form. No Blender (a villa is a place/building, never Blender: lesson 113).

Plan line: "Tour a villa in 20 seconds." Brand fictional: **Aurelune Residences** (web-checked 2026-10-14: no villa/hotel/real-estate/brand match; the first plan name was dropped because a real condo project already uses it). Concept site, all prices labelled "sample".

## Direction

**Layout picked by the user: mockup C `c-night-cinema`** (`day21/refs/layouts/`). Codes: NV03 · HR02 · LS03 (arch-trio look) · VD01 · GL15 · LS02 · SY08 · BK03 · FO15 (giant outlined wordmark, M222). Uniqueness vs Days 18–20 re-checked: none repeats (FO01 swapped out for FO15 because Day 18 used FO01).

| Choice | Pick | Why |
|---|---|---|
| Look | **Dusk terrace**: warm travertine stone bands alternating with deep dusk-teal bands; film is the hero of every section | Reference is stone + dusk pool + gold CTA; dusk teal keeps it apart from Day 16's ivory-gold. |
| Palette | Stone `#EDE6DA` · surface `#F8F4EC` · dusk teal `#0F232B` · text `#1E1B17` / on teal `#EDE6DA` · muted `#6E655A` · accent **brass `#B88A4A`** (fills with dark text; as text only ≥ 24 px on teal) | One accent; brass only on CTAs, ticks and the key. |
| Type pair | **Cormorant** (display, 500–600) + **Jost** (body, labels in tracked caps) | Checked against Days 1–20 in the sites log: Cormorant+Jost never used (Cormorant appears only with Inter in the demo row, Jost nowhere). Day 20 was Krona One + Inter Tight, so not repeated. |
| Nav | NV03 floating bottom dock, always docked, brass "Book a viewing" button | Reference has a slim bar with a gold CTA; a bottom dock leaves the top of the film clear. |
| Hero | HR02 full-bleed film, centred statement, info bar | Film is full-bleed from the first frame (no window/portal that grows). A centred statement ("Live inside the light.") with a four-cell info bar (3 villas · from sample price · beds · coves) under it. |
| Signature | **The cutaway villa**: the film dives from the aerial into an isometric cutaway (reference "Villa 07"); light travels floor to floor, rooms light up one by one with their names | Pure film. Different from Day 14's lobby-to-pool Glide and Day 19's layers-snap-back: a building lit room by room, nothing separates or reassembles. **The hero film (living room → pool glide, V1) is close to Day 14's signature "The Glide": here the signature is the cutaway, not the glide (noted in the sites log).** |
| Loader | Brass line draws along a pool edge and becomes the "A" of the logo (reference's glowing pool edge) | Code, simple. Assigned its I code in Round 1. |
| Traveling object | **A brass villa key** (F1 waypoint travel + F8 land in UI) | Day 21 is a travelling-object day. Path below. |

Uniqueness: checked against Days 18, 19, 20: look, palette, type pair, nav, hero, section shape, card style, signature all differ (8 of 8 different each; no layout code shared). Hero/signature motion codes (M250 / M86) never used as hero or signature on any earlier site. Details in the sites log.

## Names (fictional, web-checked 2026-10-15: no exact match for any)

| Kind | Name | Sample facts (one ladder, all "sample") |
|---|---|---|
| Villa 1 | **Villa Lunessa** | 4 beds · 5 baths · 520 m² · plot 1,400 m² · from ₹ 8.5 cr (sample) · Available |
| Villa 2 | **Villa Aldevar** (the cutaway villa) | 5 beds · 6 baths · 740 m² · plot 2,100 m² · from ₹ 12.4 cr (sample) · Reserved |
| Villa 3 | **Villa Cassiane** | 6 beds · 7 baths · 980 m² · plot 3,000 m² · from ₹ 18.9 cr (sample) · Coming soon |
| Area 1 | **Veldra Cove** | 6 min to the marina (sample) |
| Area 2 | **Ostelle Ridge** | 12 min to the old town (sample) |
| Area 3 | **Halvern Bay** | 18 min to the beach club (sample) |
| Area 4 | **Pellora Point** | 25 min to the airstrip (sample) |

Near misses found online and avoided: Villa Marenna/Marena, Solane/Solana, Ostera/Ostrera/Ostara, Soraya Point (Soraya venues). Area names are invented, with no real addresses.

## References (the user's one clip, mine)

`refs/inbox/Screen Recording 2026-10-14…mov` (13.7 s, another villa site): framed film of a living room with a thumbnail strip under it, a pool at dusk with a glowing edge line, an isometric cutaway villa with a spec list on the left and a gold "book a private viewing" button.

| Section | We take | We do NOT take |
|---|---|---|
| Hero | Living-room → terrace → pool film; thumbnail strip as chapter ticks | The framed card; their name/logo/copy |
| Villa detail | Isometric cutaway + ruled spec list | Their layout 1:1 |
| Loader / accents | Glowing pool-edge line | — |
| Book a viewing | Gold CTA pill idea | Their wording |

Ideas are mixed, nothing may look like that site. Never write the reference's brand name anywhere on our site.

## Section plan, clips and scroll code

Keyframes chain the clips (end of V(n) = start of V(n+1), lesson 149). Frames by video time, every frame a keyframe. `?static=1` shows the section's key still in its final state.

| # | Section | Layout | Clip → what it shows | Keyframes | Hover | What the scroll code does |
|---|---|---|---|---|---|---|
| 0 | Loader | — | none | — | — | Pool-edge line draws, becomes the "A". |
| 1 | Nav | NV03 | none | — | link underline; brass button fills | Dock stays at the bottom. |
| 2 | Hero | HR02 | **V1** drone glide: living room → through the glass → out to the pool at dusk · **V2** terrace lifts to a whole-villa aerial | S1 → S2 → S3 | info-bar cell lifts, number turns brass | One pin chains V1+V2 (FrameScrub). The info bar rises in over V1; chapter strip fills with progress. |
| 3 | Residences | LS03 | Stills (no clip): 3 villa cards, status chips (Available · Reserved · Coming soon) | R1–R3 | card lifts, photo pans, chip glows | Offset arch trio (centre card lower) stays in place, no sideways slide. Villa names fictional; "From ₹ … (sample)". |
| 4 | Villa detail | VD01 | **V3** aerial → isometric cutaway (ends on S4). Then **CODE, no clip:** S4 (unlit) and S5 (lit, same pixels) are stacked; room-by-room SVG masks reveal S5 through each room in turn (the signature) | S3 → S4, then S4 ⇄ S5 by mask | Floor chips (Ground · Upper · Roof) and spec rows light the matching room | One tall pin: V3 scrubs, then the masks light Living · Kitchen · Suite · Roof terrace one by one with their names; ruled spec list fills by progress. |
| 5 | Amenities | GL15 | **V4** cutaway dives to the pool water (starts on S5) | S5 → S6 | Accordion panel opens a facility (pool, spa, cinema, garden, gym) | Film scrubs behind a horizontal image accordion of 5 facilities; the open panel follows progress. |
| 6 | Locations | LS02 | **V5** pool water rises to a coastline aerial | S6 → S7 | Area row lights its pin | Pins (fictional area names, no real addresses) light on the film by progress; chips like "6 min to the marina (sample)" (Veldra Cove, Ostelle Ridge, Halvern Bay, Pellora Point). |
| 7 | Brand story | SY08 | **V6** coast → facade at dawn (ends S8). Then **CODE, no clip:** S8 blends into S9 (same facade, dawn → dusk) by scroll | S7 → S8, then S8 ⇄ S9 by blend | Chapter title gets a brass underline draw | Sticky chapters over the film: Land · Craft · Light, one at a time. |
| 8 | Book a viewing | BK03 | **V7** facade settles back into the living room (closes the loop) | S9 → S1 | Day/time chips fill brass; button wipes | Month calendar + time-slot card over the film; the viewing defaults to **Villa Lunessa (Available)**, never a Reserved villa; the key lands in the button (F8). |
| 9 | Footer | FO15 | none (continues V7's last frame) | — | link underline | Centred stacked footer, "Concept website by Triozen Tech". |

Not used: Reviews, FAQ (cut by the user). Transitions: none needed, clips join on shared keyframes. Area, distance and price numbers are "sample" and stay consistent between sections (one ladder: 3 villas, 4–6 beds).

## Motion map

Every row has its own code, none repeated on the site. **M27 is the shared engine only** (the frame-sequence scrub under every clip, listed in the Engine column, never counted as a row's code). Checked: no hero/signature code repeats any earlier site's (Days 13–20 used M346/M459, M185/M707, M77/M657, M49/M445, M42/M716, M945/M946, M107, M30).

| # | Section | Layout | Motion (unique) | Engine | How it plays here | Record mode |
|---|---|---|---|---|---|---|
| 0 | Loader | — | I14 outline draws as progress | — | the "A" outline (pool-edge line) draws with load progress, fills brass at 100% | fixed 2 s |
| 1 | Nav | NV03 | M64 shimmer border | — | brass "Book a viewing" button has a light spark running its border; dock stays at the bottom | scroll |
| 2 | Hero | HR02 | **M250 lamp light cone** | M27 (V1+V2) | a warm light cone opens over the dusk living room and the headline rises into it as the glide begins; info bar rises in | scrub |
| 3 | Residences | LS03 | M1 curtain reveal in mask | — | the 3 arch cards stay in place; a stone curtain slides off each arch in turn | scrub |
| 4 | Villa detail | VD01 | **M86 pinned list, cross-swapping visual** (signature) | M27 (V3) | pinned spec/floor list highlights one room at a time with a filling line; room mask lights that room on S4→S5 | scrub, 3 stops (floors) |
| 5 | Amenities | GL15 | M18 clip-path corner grow | M27 (V4) | accordion panel opens by a growing clip-path corner over the film | scrub |
| 6 | Locations | LS02 | M238 map pins drop in | M27 (V5) | fictional area pins drop onto the coastline one by one with a pulse ring | scrub |
| 7 | Brand story | SY08 | M20 scroll-lit statement | M27 (V6) | the statement lights word by word while S8 blends to S9 (dawn → dusk) | scrub |
| 8 | Book a viewing | BK03 | M89 batched viewport stagger + F8 key flies into the dock button | M27 (V7) | calendar days stagger in a week at a time, then time slots; the scroll picks the 12th and 18:00 (brass fill); the key flies into the dock's "Book a viewing" button, which then reads "Key reserved" | scrub, hover stop |
| 9 | Footer | FO15 | M222 outlined wordmark rises | — | giant outlined "AURELUNE" rises into the footer, outline draws then fills | scrub |

Unique codes used: I14, M64, M250, M1, M86, M18, M238, M20, M89, M222 (+ F1, F8 for the key). The hero's film is close to Day 14's glide; the signature is the lit cutaway.

Idle motion everywhere: film breathing (FrameScrub `breath`), slow light drift; nothing depends on the record cursor.

## Traveling object: brass villa key (F1 + F8)

One cut-out PNG (`raw/key.png`, **made by Claude Code** with `npm run cutout` from still K1 on the user's request: 2048×2048 transparent, no shadow, the bow hole transparent, edges checked for halos). Calm easing, never covers text, never pauses in record mode, hidden in `?static=1`.

| Section | Where the key rests | Move |
|---|---|---|
| Hero | hidden (not yet) | — |
| Residences | corner of the first card's price tag | slow tilt |
| Villa detail | beside the sample price, in the empty margin | turns face-on |
| Amenities | on the open accordion panel's edge | tilt |
| Locations | hangs on the lit map pin | swings |
| Brand story | small, in the right margin | still |
| Book a viewing | flies into the brass "Book a viewing" button (F8); the button reads "Key reserved" | lands |

## Hover map

| Element | Where | Hover effect | Record cursor |
|---|---|---|---|
| Info-bar cell | Hero | cell lifts, its number turns brass | data-hover-demo ("From" cell) |
| Villa card | Residences | lifts, photo pans, chip glows | data-hover-demo (2nd card) |
| Floor chip / spec row | Villa detail | lights the matching room in the cutaway | data-hover-demo="click" (Upper) |
| Accordion panel | Amenities | opens, others narrow | data-hover-demo |
| Area row | Locations | pin pulses | — |
| Time chip | Book a viewing | fills brass | data-hover-demo="click" |
| Buttons / links | everywhere | fill wipes / underline draws | — |

At least 3 record-cursor stops.

## Product detail plan

| Interaction | Section | How | From |
|---|---|---|---|
| Floor selector lights rooms | Villa detail | chips drive the cutaway still/clip time | ours (reference cutaway + spec list) |
| Ruled spec list | Villa detail | beds, baths, area, plot, sample price | reference |
| Status chips | Residences | Available / Reserved / Coming soon | ours |
| Sticky buy box | — | not used | — |

## Reel time table (34–38 s)

| Part | Seconds |
|---|---|
| Loader | 2.0 |
| Hero V1+V2 | 6.0 |
| Residences | 3.5 |
| Villa detail V3 + room masks (3 floor stops) | 7.0 |
| Amenities V4 | 3.5 |
| Locations V5 | 3.0 |
| Brand story V6 + dawn→dusk blend | 4.5 |
| Book a viewing V7 + key lands | 4.0 |
| Footer | 2.0 |
| **Total** | **35.5** |

## Assets (specs only, no prompts)

Source: **Flow (stills) + Veo (clips)**, code for everything else. Stills `.jpg`; clips `.mp4` 16:9; first/last frame of each clip is the pixel-identical keyframe (lessons 116, 117). Veo dissolves into its end frame when start and end are different shots (lesson 114): V3, V4, V5 and V6 change scene, so check each on a contact sheet. **7 Veo clips (V1–V7).** Rooms lighting (S4→S5) and dawn→dusk (S8→S9) are CODE, because Veo cannot do subtle changes between near-identical stills. **Flow edits attach ONE image only** (lesson 152). No people, hands or faces. Fictional villa, no real landmarks.

Batch 1 → Batch 2 (edits, one attachment each) → Batch 3 (all Veo clips together, lesson 149).

| Batch | ID | What it is | Save as | Attach | Code fallback |
|---|---|---|---|---|---|
| 1 | S1 | Living room master, glass wall to the terrace, dusk light | raw/s1-living.jpg | nothing | none (the master) |
| 2 | S2 | Same villa: terrace and infinity pool at dusk | raw/s2-pool.jpg | S1 | S1 crop |
| 2 | S3 | Same villa: whole-villa aerial at dusk | raw/s3-aerial.jpg | S1 | S2 scaled out |
| 2 | S4 | Isometric cutaway of the same villa, floors visible, unlit | raw/s4-cutaway.jpg | S3 | S3 + code overlay |
| 2 | S5 | Same cutaway, identical framing, rooms lit warm | raw/s5-cutaway-lit.jpg | **S4** | S4 + CSS glow |
| 2 | S6 | Pool water macro, edge light line | raw/s6-pool-macro.jpg | S2 | S2 crop |
| 2 | S7 | Coastline aerial with the villa small in frame | raw/s7-coast.jpg | S3 | S3 crop |
| 2 | S8 | Facade at dawn | raw/s8-dawn.jpg | S3 | S3 colour grade |
| 2 | S9 | Same facade at dusk, same framing as S8 | raw/s9-dusk.jpg | **S8** | S8 graded |
| 2 | R1–R3 | Three villa exteriors (different shapes, same grade) for the cards | raw/r1…r3.jpg | S3 each | S3 crops |
| 1 | K1 | Brass villa key on a plain stone surface (for the cut-out) | raw/k1-key.jpg | nothing | SVG key |
| CC | key.png | Transparent cut-out of K1, **made by Claude Code** (`npm run cutout`, 1:1 2048×2048, hole in the bow transparent, no shadow) | raw/key.png | — | SVG key |
| 3 | V1 | Drone glide, living room → out to the pool | raw/v1-glide.mp4 → `aurelune-v1` · **192 f · 8.000 s** | start S1, end S2 | S1 → S2 crossfade |
| 3 | V2 | Terrace lifts to the whole-villa aerial | raw/v2-lift-fix.mp4 → `aurelune-v2` · **187 f · 7.792 s** · join f61–64 | start S2, end S3 | crossfade |
| 3 | V3 | Aerial → isometric cutaway (ends on S4) | raw/v3-cutaway.mp4 → `aurelune-v3` · **192 f · 8.000 s** | start S3, end S4 | crossfade |
| code | — | S4 → S5: rooms light in turn (SVG room masks over two stacked stills; masks traced in Round 1) | — | S4 and S5 must be pixel-aligned (S5 is an edit of S4) | S4 + CSS glow |
| 3 | V4 | Cutaway dives to the pool water | raw/v4-dive.mp4 → `aurelune-v4` · **192 f · 8.000 s** | start S5, end S6 | crossfade |
| 3 | V5 | Pool water rises to the coastline aerial | raw/v5-coast-fix.mp4 → `aurelune-v5` · **185 f · 7.708 s** · join f64–67 | start S6, end S7 | crossfade |
| 3 | V6 | Coast → facade at dawn (ends on S8) | raw/v6-dawn.mp4 → `aurelune-v6` · **176 f · 7.333 s** · join f100–103 | start S7, end S8 | crossfade |
| code | — | S8 → S9: dawn to dusk (scroll-driven blend of two aligned stills) | — | S8 and S9 must be pixel-aligned (S9 is an edit of S8) | S8 colour grade |
| 3 | V7 | Facade settles into the living room (loop) | raw/v7-home.mp4 → `aurelune-v7` · **185 f · 7.708 s** · join f137–140 | start S9, end S1 | crossfade |

**Final clips (frames cut, star painted out, 1600×900 WebP, 24 fps, every frame independent = keyframe; folders `public/frames/aurelune-v1…v7`, 1309 frames, 91 MB).** Frame numbers below are 0-based; the file `frame_NNNN.webp` is n+1.
- **V2 and V5 were generated in reverse and then reversed** (`raw/v2-lift-rev.mp4`, `raw/v5-coast-rev.mp4` kept; first frame = S2 / S6, last = S3 / S7).
- **V2, V5, V6, V7 each have ONE 4-frame crossfade join** (the middle double-exposure of the Veo dissolve was cut out and bridged): **V2 f61–64**, **V5 f64–67**, **V6 f100–103**, **V7 f137–140**. The frames before and after each join are clean. V1, V3 and V4 have no join.
- **RULE: the scroll must never rest on a join frame.** The chain helper (`lib/chain.ts`) must skip or snap past those frames: while scrolling it plays through the 4 frames in one step (they are a transition, not a pose); at rest (or when snapping a section stop) it snaps to the clean frame before (V2 f60, V5 f63, V6 f99, V7 f136) or after (V2 f65 onward, V5 f68, V6 f104, V7 f141). No labels, hover stops or pinned holds may sit on f-join ranges.
- Keyframe check: the Veo frames are the still cropped about 0.78 % at the sides (scale x 0.992, y 1.000, centred), so S-to-frame fits at a +6 px shift on 1600 px (y 0 ± 0.6 px). Same on all 14 end frames, so crop the stills to match (`object-fit: cover` on a 16:9 box does it).
- **The site uses the FITTED stills, not the raw ones:** `public/img/aurelune/s1.jpg … s9.jpg` (1600×900), made from `raw/s1…s9` with one identical transform for all nine (side crop to scale x 0.9923, +6.2 px x shift, y unchanged), so S4/S5 and S8/S9 stay pixel-aligned with each other and with the last frames of V3 and V6. `raw/` stays untouched; never reference `raw/` stills in `site/`.

Watermarks: `npm run clean-mark` over the whole batch in one run (originals to `raw/_orig`), no per-image viewing.

## Prompts (as run)

Date for all: 2026-10-15. Stills were made with Nano Banana Pro in Google Flow; clips with Veo (Frames to video, 8 s, 16:9). Only the prompt that produced the FINAL asset is recorded here; rejected earlier runs of V1, V2, V5, V6 and V7 are not recorded word for word.

Clip notes: V2 and V5 were generated in REVERSE (start frame = the later still) and then reversed in code. V2, V5, V6 and V7 each have one 4-frame crossfade join made in code. V3, V4: first run was final.

| Asset ID | Date | Prompt | Attachments |
|---|---|---|---|
| S1 (raw/s1-living.jpg) | 2026-10-15 | Aspect ratio 16:9. Photorealistic architectural interior photograph, wide shot, camera at eye level in the centre of a luxury villa living room, perfectly symmetrical framing looking straight toward a full-width floor-to-ceiling glass wall. Warm travertine stone floor and walls, a low cream bouclé sofa and two matching armchairs arranged around a low travertine coffee table, a slim brass floor lamp glowing softly, a deep dusk-teal accent wall on the left side, double-height ceiling with a recessed warm light line. Through the open glass wall: a stone terrace and a long infinity pool glowing turquoise at dusk, a deep teal and amber sky, a few palm silhouettes. Soft warm interior light balanced with cool dusk light outside, calm and expensive mood, sharp detail, natural film-like grain. The architecture is modern: flat roofs, clean travertine and glass volumes with brass details. Empty room: no people, no hands, no faces, no text, no logos, no signage, no watermark, no clutter on the surfaces. | none |
| K1 (raw/k1-key.jpg) | 2026-10-15 | Aspect ratio 1:1. Photorealistic product photograph of a single solid brass villa key, shown whole and lying flat, viewed from directly above and very slightly angled, centred in the frame with generous empty margin on all sides. The key has a simple elegant bow shaped like a soft arch with a small round hole, a smooth straight shank and a clean modern bit with geometric notches. Warm brushed brass with gentle highlights. Plain, flat, light grey matte background, soft diffused studio light, a very soft shadow directly under the key only. Nothing else in the frame: no tag, no keyring, no text, no engraving, no logo, no hands, no watermark. | none |
| S2 (raw/s2-pool.jpg) | 2026-10-15 | Aspect ratio 16:9. Using the attached image as the exact reference for the same villa, the same materials, the same dusk light and the same sky, create a new photograph taken from the stone terrace just outside the glass wall. Camera low and centred, at about hip height, looking straight across the long turquoise infinity pool toward the sea horizon. The pool is the same shape and the same glowing turquoise as in the reference, with its far edge melting into the dusk sky. Same palm trees and same deep teal and amber sky. At the left and right edges of the frame the villa's warm travertine pillars and the glass wall with warm interior light are visible. Calm, expensive mood, sharp detail, natural film-like grain. Empty scene: no people, no hands, no faces, no text, no logos, no watermark. | S1 |
| S3 (raw/s3-aerial.jpg) | 2026-10-15 | Aspect ratio 16:9. Using the attached image as the exact reference for the same villa, the same travertine, glass and brass materials, the same dusk light and the same turquoise pool, create a drone photograph of the whole villa from about 60 metres up, at a three-quarter angle looking down. The villa is a modern two-storey building with flat roofs, a roof terrace, large travertine volumes and floor-to-ceiling glass walls glowing warm from inside. The long infinity pool lies in front of the living room, with a stone terrace and a few sun loungers beside it. Palm trees and low garden planting around the villa. In the far distance a calm sea and a deep teal and amber dusk sky. The villa sits clearly in the centre of the frame with space around it. Calm, expensive mood, sharp detail, natural film-like grain. Empty scene: no people, no hands, no faces, no text, no logos, no vehicles, no watermark. | S1 |
| S4 (raw/s4-cutaway.jpg) | 2026-10-15 | Aspect ratio 16:9. Using the attached image as the exact reference for the same villa, the same travertine, glass and brass materials, the same two-storey volumes, the same roof terrace and the same infinity pool, create an isometric architectural cutaway visualization of this villa seen from a high three-quarter angle. The roof and the front walls are cut away so the interior of both floors is visible: on the ground floor the living room with the cream bouclé sofa and armchairs, the kitchen with a travertine island, and a hall; on the upper floor a master suite with a bed and a bathroom; on top the roof terrace. The interiors are dim and unlit, with neutral soft ambient light only, no warm glow. The pool, terrace and garden are visible around the villa. The villa floats cleanly on a plain deep dusk-teal gradient background, no landscape and no sea. Premium architectural render, crisp edges, soft shadows, calm mood. No people, no hands, no faces, no text, no labels, no numbers, no logos, no watermark. | S3 |
| S5 (raw/s5-cutaway-lit.jpg) | 2026-10-15 | Aspect ratio 16:9. Edit the attached image. Keep everything exactly the same: the same camera angle, the same framing and crop, the same villa shape, the same walls, furniture, pool, garden and background, pixel for pixel in position. Change only the lighting: switch on warm amber light in every room on both floors, so each room glows softly from inside, with small warm light spill on the nearby floors and terrace. Leave the exterior, the pool, the garden and the plain deep teal background exactly as they are. Do not move, add or remove any object. No people, no hands, no faces, no text, no labels, no logos, no watermark. | S4 |
| S6 (raw/s6-pool-macro.jpg) | 2026-10-15 | Aspect ratio 16:9. Using the attached image as the exact reference for the same pool, the same turquoise glow and the same dusk light, create a close-up photograph of the pool water surface at the infinity edge. Camera very low, just above the water, looking along the surface toward the glowing edge line where the water meets the dusk sky. Calm still water with soft ripples, a thin bright line of turquoise light along the pool edge, warm amber reflections from the villa on the water, a deep teal sky above. The travertine pool edge is visible at the bottom of the frame. Sharp detail, natural film-like grain, calm mood. Nothing else in the frame: no people, no hands, no faces, no text, no logos, no objects floating, no watermark. | S2 |
| S7 (raw/s7-coast.jpg) | 2026-10-15 | Aspect ratio 16:9. Using the attached image as the exact reference for the same villa, the same dusk light and the same sea, create a high drone photograph from about 300 metres up looking toward a quiet curved coastline at dusk. The villa from the reference is small but recognisable in the centre of the frame, its warm glass windows and turquoise pool glowing. Around it: green hills with palm trees and low garden planting, a few other very distant rooftops, a calm sea with a pale surf line along a sandy cove, a deep teal and amber sky. Calm, expensive mood, sharp detail, natural film-like grain. No people, no hands, no faces, no boats, no vehicles, no text, no logos, no watermark. | S3 |
| S8 (raw/s8-dawn.jpg) | 2026-10-15 | Aspect ratio 16:9. Using the attached image as the exact reference for the same villa, the same travertine, glass and brass materials, the same two storeys and the same pool, create a photograph of the villa's front facade at dawn. Camera at eye level on the garden side, centred and straight-on, the whole facade visible with space around it, the long infinity pool in the foreground reflecting the sky. Soft pink and pale gold dawn light, a pale blue sky, the interior lights off and the glass reflecting the sky. Palm trees at the edges of the frame. Calm, expensive mood, sharp detail, natural film-like grain. No people, no hands, no faces, no text, no logos, no vehicles, no watermark. | S3 |
| S9 (raw/s9-dusk.jpg) | 2026-10-15 | Aspect ratio 16:9. Edit the attached image. Keep everything exactly the same: the same camera position, the same framing and crop, the same villa facade, the same pool, palms and garden, in exactly the same places. Change only the time of day to dusk: a deep teal and amber sky, the pool glowing turquoise, warm amber light switched on in the windows of both floors, and the dusk light reflected in the pool water. Do not move, add or remove any object. No people, no hands, no faces, no text, no logos, no watermark. | S8 |
| R1 (raw/r1-lunessa.jpg) | 2026-10-15 | Aspect ratio 3:4. Using the attached image only as a reference for the materials (warm travertine, floor-to-ceiling glass, brass details), the dusk light grade and the turquoise pool, create a photograph of a different villa: a long, low, single-storey villa with a flat roof, a deep covered terrace and a pergola, with warm light glowing in its glass walls. A turquoise pool lies in front of it, with palms and low planting around. The villa is centred, seen straight-on from the garden at eye level, with sky above it, under a deep teal and amber dusk sky. Calm, expensive mood, sharp detail, natural film-like grain. No people, no hands, no faces, no text, no logos, no vehicles, no watermark. | S3 |
| R2 (raw/r2-aldevar.jpg) | 2026-10-15 | Aspect ratio 3:4. Using the attached image as the exact reference for the same villa, the same two storeys, the same travertine and glass, the same roof terrace and the same pool, create a photograph of this same villa from a new angle: seen from the garden side at eye level, slightly from the left, the whole two-storey villa centred in the frame with sky above it. Warm light glows in the glass walls, the turquoise pool lies in the foreground, and palms stand around it, under a deep teal and amber dusk sky. Calm, expensive mood, sharp detail, natural film-like grain. No people, no hands, no faces, no text, no logos, no vehicles, no watermark. | S3 |
| R3 (raw/r3-cassiane.jpg) | 2026-10-15 | Aspect ratio 3:4. Using the attached image only as a reference for the materials (warm travertine, floor-to-ceiling glass, brass details), the dusk light grade and the turquoise pool, create a photograph of a different, larger villa: three stacked travertine volumes of different heights around a tall central glass atrium, a long terrace with a row of slim columns, and warm light glowing through the glass. A long turquoise pool runs along the front, with palms and low planting around. The villa is centred, seen from the garden at eye level, with sky above it, under a deep teal and amber dusk sky. Calm, expensive mood, sharp detail, natural film-like grain. No people, no hands, no faces, no text, no logos, no vehicles, no watermark. | S3 |
| F2 (raw/f2-cinema.jpg) | 2026-10-15 | Aspect ratio 4:3. Using the attached image as the exact reference for the same villa: the same warm travertine walls and floor, the same deep dusk-teal accent wall, the same brass details and the same cream bouclé furniture, create a photograph of the villa's private cinema room. A low-lit room with one whole wall covered by a large dark projection screen that shows only a soft abstract lilac and blue gradient, with no text and no pictures. A row of four wide cream bouclé armchairs faces it on a low travertine platform. A slim brass floor lamp glows softly, a warm recessed light line runs along the ceiling, and the side walls have textured travertine and teal acoustic panelling. Camera at eye level at the back of the room, centred and symmetrical. Calm, expensive mood, sharp detail, natural film-like grain. No people, no hands, no faces, no text, no logos, no watermark. | S1 |
| F3 (raw/f3-garden.jpg) | 2026-10-15 | Aspect ratio 4:3. Using the attached image as the exact reference for the same villa materials (warm travertine, glass, brass), the same dusk light and the same palms, create a photograph of the villa's private garden court: an open travertine courtyard enclosed by two walls of the villa with glowing glass doors, a shallow still reflecting pool with a single stone slab walkway across it, three tall palms with warm uplights at their base, low drought-tolerant planting, and a long built-in travertine bench. A deep teal and amber dusk sky above. Camera low and centred, symmetrical. Calm, expensive mood, sharp detail, natural film-like grain. No people, no hands, no faces, no text, no logos, no watermark. | S2 |
| F4 (raw/f4-spa.jpg) | 2026-10-15 | Aspect ratio 4:3. Using the attached image as the exact reference for the same villa: the same travertine, teal and brass materials and the same dusk light, create a photograph of the villa's spa house. A calm travertine treatment room with a low stone treatment table with neatly folded cream towels, a freestanding carved stone bath, and a small cold-plunge pool set into the floor right at a floor-to-ceiling glass wall that opens onto a curved bay and the sea at dusk. Warm indirect light from a ceiling cove, a deep teal and amber sky outside. The air is perfectly clear: no steam, no mist, no haze. Camera at eye level, slightly off-centre. Calm, expensive mood, sharp detail, natural film-like grain. No people, no hands, no faces, no text, no logos, no watermark. | S1 |
| F5 (raw/f5-gym.jpg) | 2026-10-15 | Aspect ratio 4:3. Using the attached image as the exact reference for the same villa: the same warm travertine floor and walls, the same deep dusk-teal accent wall and brass details, and the same dusk light, create a photograph of the villa's private gym. A long glass wall opens onto the garden with palms at dusk, and a slatted timber wall runs along one side. A neat row of minimalist, completely unbranded machines in matte black and dark brass, a rack of plain dark dumbbells, and a clean stone floor. A warm recessed light line runs along the ceiling. Camera at eye level, centred and symmetrical. Calm, expensive mood, sharp detail, natural film-like grain. No screens, no people, no hands, no faces, no text, no logos, no brand marks on any equipment, no watermark. | S1 |
| V1 (raw/v1-glide.mp4) | 2026-10-15 | Aspect ratio 16:9. One single continuous shot, 8 seconds, no cut, no dissolve, no fade. The camera starts exactly on the start frame, at eye height in the middle of the villa living room, facing the full-width glass wall. The central glass panels slide apart in the first second. The camera glides forward in a perfectly straight line at a slow, constant speed, passes through the opening and eases to a gentle stop on the stone terrace, about six metres outside the glass wall, at hip height, in exactly the position and framing of the end frame: the long turquoise pool at medium distance in the centre, the glass wall with warm light on the left, a travertine pillar on the right, the sea horizon behind. The camera never comes closer to the pool than in the end frame and never descends toward the water. It comes to a full stop at about 6.5 seconds and then holds almost perfectly still until the end. The camera does not rotate, tilt or drift sideways. Everything in the scene stays completely still: the sofa, armchairs, coffee table and everything on it, the lamp, the walls, the palms and the pool water. The light stays constant and steady, with no flicker, no light sweep and no glare. No people, no hands, no faces, no text, no logos, no fog, no mist, no steam, no particles. | start S1, end S2 |
| V2 (raw/v2-lift-rev.mp4 (reversed in code to raw/v2-lift.mp4)) | 2026-10-15 | Aspect ratio 16:9. One single continuous shot, 8 seconds, no cut, no dissolve, no fade, with continuous motion from the first frame to the last. The camera starts exactly on the start frame: a high three-quarter aerial view of the whole villa with its pool in front and the sea beyond. It descends smoothly and steadily toward the pool, gliding forward over the villa's garden. As it comes down it pivots in one continuous arc, turning away from the villa to face the sea, and levels out low over the stone terrace, looking along the long turquoise pool toward the horizon. It arrives exactly on the end frame at about 7 seconds and then holds almost perfectly still. Constant smooth speed, no shaking. Everything in the scene stays completely still: the building, the pool water, the loungers and the palms. Only the camera moves. The light stays constant and steady, with no flicker and no light sweep. No people, no hands, no faces, no drones, no aircraft, no birds, no vehicles, no text, no logos, no fog, no mist, no steam, no particles. | start S3, end S2 |
| V3 (raw/v3-cutaway.mp4) | 2026-10-15 | Aspect ratio 16:9. One single continuous shot, 8 seconds. The camera starts exactly on the start frame, an aerial of the whole villa at dusk. During the shot it glides slowly and smoothly a short distance up and sideways until it reaches the high isometric three-quarter angle of the end frame. While it moves, the surrounding garden, sea and sky soften gradually into a plain, deep dusk-teal gradient background, and the roof and the front walls of the villa slide smoothly away and disappear, revealing the interior of both floors, until the shot ends exactly on the end frame: the cutaway villa floating on the plain teal background. The movement is slow and steady, with no shaking and no sudden change. The villa's shape, materials and the pool stay exactly the same. The interiors in the cutaway stay dim and unlit. No people, no hands, no faces, no text, no labels, no logos, no fog, no mist, no steam, no particles. | start S3, end S4 |
| V4 (raw/v4-dive.mp4) | 2026-10-15 | Aspect ratio 16:9. One single continuous shot, 8 seconds. The camera starts exactly on the start frame: the isometric cutaway villa with every room glowing warm. It descends smoothly and steadily toward the villa's turquoise pool at the front, moving forward and down along one straight path. The villa slides up and out of the frame as the camera goes down, the pool grows to fill the whole frame, and the camera settles very low just above the calm water surface, looking along the glowing edge line, and ends exactly on the end frame. Constant slow speed, no shaking, no rotation. The pool water stays calm, with only soft ripples. The light stays steady, with no flicker and no light sweep. No people, no hands, no faces, no text, no logos, no fog, no mist, no steam, no particles. | start S5, end S6 |
| V5 (raw/v5-coast-rev.mp4 (reversed in code to raw/v5-coast.mp4)) | 2026-10-15 | Aspect ratio 16:9. One single continuous shot, 8 seconds, no cut, no dissolve, no fade, with continuous motion from the first frame to the last. The camera starts exactly on the start frame: a high aerial of a quiet curved coastline with the small villa glowing in the centre. It descends at a steady, brisk speed that never slows, swooping down toward the villa. The villa, its garden and its glowing turquoise pool grow larger in one unbroken movement, and the camera sinks over the pool edge until it hovers just above the calm water surface, looking along the glowing edge line. It arrives exactly on the end frame at the last second, with no hold. The sea moves gently, and everything else stays still. The dusk light stays steady with no flicker. No people, no hands, no faces, no boats, no drones, no aircraft, no birds, no vehicles, no text, no logos, no fog, no mist, no steam, no particles. | start S7, end S6 |
| V6 (raw/v6-dawn.mp4) | 2026-10-15 | Aspect ratio 16:9. One single continuous shot, 8 seconds, no cut, no dissolve, no fade, with continuous motion from the first frame to the last. The camera starts exactly on the start frame, a high aerial over the coastline with the small villa glowing in the centre. It swoops down and forward toward the villa in one smooth curved path at a steady speed that never slows, passing over the garden and palms, and levels out at eye level over the pool, facing the facade straight-on. It arrives exactly on the end frame at the last second, with no hold. The villa, the pool and the palms stay in view and unchanged in shape throughout. While the camera descends, the sky and light shift slowly and evenly from the teal and amber of dusk to the soft pink and pale gold of dawn, the windows lose their glow, and the pool turns into a soft mirror of the dawn sky. No shaking, no rotation. No people, no hands, no faces, no vehicles, no text, no logos, no fog, no mist, no steam, no particles. | start S7, end S8 |
| V7 (raw/v7-home.mp4) | 2026-10-15 | Aspect ratio 16:9. One single continuous shot, 8 seconds, no cut, no dissolve, no fade. The camera starts exactly on the start frame: the villa facade at dusk, seen straight-on across the glowing pool. It glides forward in a perfectly straight line at a slow, constant speed, low over the pool surface, toward the central glass wall. The central glass panels slide quietly apart, the camera passes through the opening into the living room, then slows, rises gently to eye height and comes to rest exactly on the end frame: the symmetrical view of the living room toward the glass wall and the pool. The living room contains only what is in the end frame: one long cream bouclé sofa along the foreground, two cream armchairs, a low travertine coffee table with a book and small brass objects, and a slim brass floor lamp. No bench, no shelf, no other furniture appears at any point. The sofa keeps exactly the same shape and position throughout, and nothing in the room changes while the camera moves. The camera does not rotate, tilt or drift sideways. The building, the pool water, the palms and everything in the room stay completely still. Only the camera moves. The light stays steady and warm, with no flicker, no light sweep and no glare. No people, no hands, no faces, no text, no logos, no fog, no mist, no steam, no particles. | start S9, end S1 |

## Round 2 notes (as built)
- **Film engine:** `site/components/film.tsx` (clip store + timeline Film) instead of the kit's FrameScrub/`chainAt`. Reason: this site needs still segments in the timeline, 8-frame handovers, Veo join skipping (play through, snap to the clean frame when still) and the loader/50 % preload rules, none of which the kit components offer. It uses the kit's frame format, load order and `prefersReducedMotion()`. Only the clip on screen and its two neighbours stay decoded.
- **Pin runs (px):** hero 2400 · villa 2800 · amenities 1400 · locations 1200 · story 1800 · booking 1600 (≈ seconds × 400, per the reel table).
- **Villa:** S5 is revealed through three soft PNG masks (`public/img/aurelune/m-living|kitchen|suite.png`, from S5 − S4) plus a roof terrace lit in code (`site/rooms.json` polygon + warm glow + glints), then everything else lit in S5; the frame shrinks left for the panel and returns to full frame at the end so Amenities begins on the same S5 picture.
- Handovers: V4→V5, V5→V6 and the stills (S5→V4, S9→V7) are lead-in stills at the start of each stage, so the crossfade happens inside the next stage on an identical picture.

## Round 5 task list (added after Round 2 fixes)
- [ ] **Kit, no custom scrub code:** move the join skipping, the stills inside the timeline and the loader-linked preload from `site/components/film.tsx` into the kit's `FrameScrub` / `lib/chain.ts` as options, switch this site to them, delete `film.tsx`, then `npm run sync-kit`.
- [ ] **Join settle ghost frame:** if a ghost frame shows during the join settle (up to 520 ms) when the user stops scrolling by hand, tighten the nudge (shorter rest time, smaller zone).
- [ ] **`.gitignore`:** un-ignore `public/frames` and the final `raw/` files (the day repo tracks its own assets). Keep `raw/_old`, `raw/_orig`, `public/frames/_test-v1`, `public/frames/_test-v2` and the reference recording out of the repo.

## Round 3 notes (as built)

- **Sheet transition:** Residences (stone, rounded top, z 6) slides up over the pinned hero's last frame (hero stage pins 900 px longer), then lifts off the pinned S3/V3-frame-1 stage (villa section starts 900 px early with `lead`). No hard cut, no gap.
- **Nav M64:** conic-gradient spark on the brass button border (CSS, off in `?static=1`). Label swaps to "Key reserved" via `html[data-key="in"]`.
- **Residences M1:** a stone curtain per arch slides up in turn, driven by the card row's position on screen; chips and prices fade in after their arch opens.
- **Amenities M18 (GL15):** opens on the same shrunk frame the villa ended on and grows it; stone accordion card at left, picture panel at right opened by a growing clip-path corner, one facility per scroll step; accordion follows scroll (click still works).
- **Locations M238:** stage pins 1000 px longer; 4 pins drop one by one (160 px each, 220 px apart) with a scroll-driven pulse ring; card i lights while pin i is newest.
- **Story M20:** Round 1 layout kept (3 cards at the bottom); each paragraph is split into words that light in turn (Land, Craft, Light) over film progress .30-.92 while S8 to S9 blends. Words only change brightness.
- **Booking M89:** days appear a week (row) at a time, then the 4 time chips; at progress .62 the scroll picks 12 December and 18:00 (brass fill). Click still works.
- **Footer M222:** SVG outlined wordmark rises, outline draws, then fills; final when the page end is reached. 35 px clearance from the dock kept.
- **Key (F1+F8):** one fixed layer, pose = pure function of scroll (stops + flights). Hidden in hero and `?static=1`. Fades in at the first card's price tag, dips out during the long hero-lift/V3 stretch, lands beside the Villa sample price (turns face-on), at the Amenities panel edge, hangs on the newest Locations pin (swings), sits in the Story right margin, then flies down into the dock's brass button.
- **Join snapping:** zone of 3 px per join; rest inside it for >150 ms hops the scroll <= 4 px to the clean side (and the picture with it). Test: every px across V2, V5, V6, V7 zones, no join frame shown at rest.
- **Codes:** no code changed; all unique as in the Motion map.

## Round 4 notes (as built)

- **Hover map as built:** Hero From cell lifts 8 px (`translate`), number turns brass. Villa card lifts, photo scales and pans, status chip glows in its own colour. Floor chips and room/spec rows light the matching room: rooms 1-3 through the existing PNG masks (`au-hm-*`), Roof = terrace polygon with a warm glow. Clicking a floor locks the light on that floor and every floor below it (Upper = Ground + Upper); click again to release; lock clears when scrolled back before the panel. Accordion: hover/focus opens that panel's picture and text over the scroll-driven one, the other names shrink (`scale`); click pins it until the scroll moves to another facility. Location card: brightens (brass border) and its pin pulses. Time chip: brass fill wipes in from the left; click selects. Brass buttons: lighter brass wipe (spark kept); dock and footer links: underline draws.
- **Cursor pill** (`site/components/CursorPill.tsx`): labels View / Light / Open / Pin / Pick from `data-pill`. Tries 8 spots around the pointer, skips any that cover a text line or sit within 24 px of a button/link that is not itself a labelled target, hides if none fit.
- **Record cursor:** engine only; marks on Hero From cell, villa card 2, floor chip Upper (click), accordion panel 3, time chip 18:30 (click). No per-site pointer.
- **Change (Locations key):** the key no longer hangs on the pin; on the last leg it parks in the right margin (x 1394) so it never covers a card.
- **Locations cards:** inactive text `#D3CBBE` on the card (about 8.6:1 worst case over a bright frame); active card full brightness, brass border.
- **Key stops (measured, 1440x900):** Residences 19 px, Villa 29 px, Amenities 19 px, Locations 55 px (parks in the right margin, 21 px clear of the Pellora card), Story 67 px; Booking flight ends in the dock button by design.
- **Accepted exception (Amenities):** the villa sits within 48 px of the left edge when the film returns to full size; it comes from the S5/V4 framing.
- **Amenities stills:** Cinema, Garden, Spa and Gym are real Flow stills now (`public/img/aurelune/am-*.jpg`, marks painted out, centre-cropped to the panel ratio). The cinema bezel had a tiny illegible badge, painted out of the public crop only.

### Amenities panels (done in Round 4: panels 2-5 now use their own stills)
_Earlier note:_ Only Infinity pool (S6) is a real still. Panels 2-5 are crops of existing stills (placeholders): **Cinema room** (crop of S1 interior), **Garden court** (crop of S2), **Spa house** (crop of S3 glazing), **Gym** (crop of S9 windows). Each needs its own 584x424 still (1168x848 at 2x).
