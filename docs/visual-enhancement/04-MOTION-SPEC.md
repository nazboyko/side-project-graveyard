# Motion specification

Motion is subordinate to the static material composition. This specification implements nothing. Existing candle/count/filter meaning stays fixed. Default first pass: candle feedback and restrained link feedback; all environmental motion is off until the static scene passes review.

Final R4 already adds a 90-second hero fog loop, plus up to three restored candles per yard plot. Turning environmental motion off in the future prototype is an explicit proposed refinement of that existing fog, not a current-state claim. Flame/light rules below cover both the seven-candle memorial and the three-candle yard display; preserve both caps and local storage. The static latest-published cat remains static.

The local motion checklist was read. Its reusable principles are purpose, transform/opacity, visibility pausing and reduced-motion completeness; unrelated signature/entrance terminology does not apply to this cemetery. The current request allows evaluating small pointer depth, while the older brief forbids parallax: pointer depth below is an optional proposal requiring explicit visual review, not a default instruction to add it.

## Global runtime contract

- Use CSS for bounded feedback. No GSAP, React, canvas, Three.js or animation dependency.
- All text, focus targets and meaningful UI remain in static document flow. No entrance waits, hidden-content reveals or animations required for navigation.
- Reduced motion: static finished scene; instant input states; no parallax, drift, pulsing, flicker or animated lighting. Listening for preference changes must also stop active optional loops.
- Any optional JS loop uses a single requestAnimationFrame scheduler for the visible scene, starts only on supported pointer activity, and stops at rest, offscreen, hidden tab, touch, or reduced motion. IntersectionObserver gates scene visibility; it does not reveal text.
- At most one environmental atmospheric effect is active in a viewport. Candle flame is localized interaction feedback. Do not stack fog drift, vegetation sway and pointer drift as three simultaneous decorative loops.
- Transform only small scenery layers. Do not assign `will-change` to all eighteen graves or the full long yard. Do not animate filters, large shadows, blur, layout, background position or backdrop-filter.

## M01 — Grave input feedback (retain, refine)

| Field | Specification |
|---|---|
| Purpose | Make the existing stone link respond to intent while remaining grounded |
| Trigger | Fine-pointer hover or keyboard focus-within on that plot |
| Elements | Existing stone edge/light overlay and plot focus outline |
| Property | Opacity of a pre-rendered edge highlight; optional small translate on decorative edge wrapper |
| Magnitude | Highlight opacity increase ≤0.12; movement preferred 0 px, permitted ≤1 px if it still reads as stone, never more than existing 3 px |
| Duration / easing | 160–200 ms, ease-out; reverse 160 ms |
| Desktop | Only the targeted plot; no pointer-driven tilt; focus gets equal feedback |
| Mobile | Static surface; normal tap/focus response, no sticky hover dependency |
| Reduced motion | Instant highlight/focus change, zero movement |
| Performance | Small opacity overlay, no drop-shadow animation; preserve whole-stone click and unclipped ring |

Keep existing static slug tilt, which is composition, not motion. If CSS currently raises the actual stone, a future change may replace only this visual response after comparison, preserving link behavior.

## M02 — Cause preview (retain, reduce cost)

| Field | Specification |
|---|---|
| Purpose | Show which existing graves belong to a cause before navigation |
| Trigger | Hover/focus-visible on an existing legend row |
| Elements | Nonmatching plots in the same yard, excluding focus-within plots |
| Property | Opacity; desaturation may remain static but should not be continuously animated |
| Magnitude | Existing target opacity 0.45, matching graves remain 1 |
| Duration / easing | 180–200 ms, ease |
| Desktop | Same CSS-generated `:has()` behavior, no new JS state or reordering |
| Mobile | Filters remain normal links; content never depends on hover |
| Reduced motion | Instant preview/restore, no fade |
| Performance | The existing filter transition can repaint multiple textures. Prefer opacity-only fade and trace it; do not promote every plot permanently. No contrast claim for dimmed nonfocused decoration |

## M03 — Candle ignition (retain, naturalize)

| Field | Specification |
|---|---|
| Purpose | Mark one existing count increment as a small physical event |
| Trigger | One candle-button activation; count/status update immediately, independent of animation |
| Elements | The newly displayed candle wick/flame and its local halo |
| Property | Transform and opacity only; replace the current tiny brightness-filter keyframe if necessary |
| Magnitude | Flame begins near 0.15 scale, reaches 1; no overshoot above 1.05. Halo is bounded to roughly the current 3.2rem candle patch |
| Duration / easing | Total 600 ms: 0–120 ms wick spark, 120–320 ms flame growth, 320–600 ms local light settles; ease-out, no spring |
| Desktop | Existing newest visual candle responds; repeated presses settle cleanly, without additive effects |
| Mobile | Same small ignition, no additional particles or smoke |
| Reduced motion | Immediately show finished flame/wax/local light and same count; no spark/growth/fade |
| Performance | Tiny transform/opacity layers; never animate stone texture/shadows or delay storage. Drawn limit remains seven; if count exceeds seven, current count updates and a brief bounded latest-candle response may remain |

## M04 — Settled candle flame (retain, restrain)

| Field | Specification |
|---|---|
| Purpose | A lit flame feels alive; does not imply a global visitor count |
| Trigger | Local count >0 and memorial visible, document visible, motion allowed |
| Elements | Existing lit flame spans only |
| Property | Transform; optional tiny opacity variation on flame, not page |
| Magnitude | Scale variation roughly ±3–4%, rotation ≤1.5°, no candle-body motion |
| Duration / easing | 2.6–4 s slow cycle, ease-in-out; deterministic phase offsets may avoid identical flames without random per-frame work |
| Desktop | Gentle small flame; seven candles stay modest rather than multiplying brightness |
| Mobile | Same or smaller amplitude; pause offscreen; use static flames if profiling warrants |
| Reduced motion | Static visibly lit flame; identical candle count and placement |
| Performance | One CSS effect family on tiny elements; IntersectionObserver + visibility pauses playback. No RAF per candle, no loop-driven shadows/filters |

## M05 — Candle local light (retain, refine)

| Field | Specification |
|---|---|
| Purpose | Connect the flame to nearby physical stone and ground |
| Trigger | Count transitions from unlit to lit; no full-page theme change |
| Elements | Existing lower-stone and ground pseudo-element light patches |
| Property | Opacity of static small radial/elliptical light textures/gradients |
| Magnitude | Approximate max opacity 0.2–0.35 for the patch after image/tint review; reflected warm hue confined to lower 20–30% of stone. Cap brightness for all counts |
| Duration / easing | Begin around 320 ms; settle over 240–280 ms, ease-out. Do not continually flicker the large reflection |
| Desktop | Small asymmetric nearby reflection matching wick position and fixed scene light |
| Mobile | Smaller ground patch clamped to viewport; no glow across controls/text |
| Reduced motion | Finished local light appears instantly with finished flame |
| Performance | Opacity overlay clipped to the current stone, bounded ground element. Static gradient calculation, no changing blur radius/blend mode or inherited opacity on text |

## M06 — Direction-sign feedback (retain)

| Field | Specification |
|---|---|
| Purpose | Reinforce existing repository direction link |
| Trigger | Hover/focus-visible of the existing sign |
| Elements | Arrow only, focus outline static |
| Property | Translate |
| Magnitude | Existing 2 px horizontal displacement |
| Duration / easing | 160–200 ms, ease-out |
| Desktop | Same keyboard/pointer feedback |
| Mobile | Clear static arrow; active/focus state remains visible |
| Reduced motion | Zero displacement; immediate focus/color cue |
| Performance | Tiny element, no physical sign bobbing or animated shadow |

## M07 — Pointer depth (optional, disabled in initial pass)

| Field | Specification |
|---|---|
| Purpose | Very small relative depth between environment and sparse edge scenery |
| Trigger | Fine pointer over visible hero/memorial; enable only after static-art review and performance trace |
| Elements | Background image wrapper and one small foreground decorative fragment; no HTML grave text, ledger, buttons or focus regions |
| Property | Transform translate3d using CSS custom properties written by one scheduler |
| Magnitude | Background ±2 px x / ±1 px y; foreground ≤±4 px x / ±2 px y; maximum differential 6 px; no rotation, scale or camera dolly |
| Duration / easing | Smooth toward target over approximately 160–240 ms with time-based damping; neutral return ≤240 ms. Stop RAF when difference is negligible |
| Desktop | `hover:hover` + `pointer:fine`; pointer leaving scene returns neutral; scroll does not drive motion |
| Mobile | Disabled, including device tilt/gyro; static complete art-directed composition |
| Reduced motion | Disabled; reset transforms to neutral immediately, detach event work |
| Performance | Two bounded layers maximum; image overscan 6–8 px within existing crop to prevent seams; no full-yard promotion, no React state or frame-based DOM reads |

If the effect is consciously noticeable as cursor chasing or affects reading, remove it. It is independently reversible. Do not replace static perfection with motion to hide weak artwork.

## Optional fog: evaluated, not recommended for first implementation

Static atmospheric haze baked into A01/A02 is the recommended outcome. A moving fog band would require another approved asset/layer and could flatten the stone contrast, incur alpha overdraw and conflict with the one-atmosphere budget. If later approved: background-only opacity ≤0.08, translate ≤8 px across a bounded horizon band over 90–120 s, linear, disabled mobile/reduced motion and paused offscreen/hidden. No blurred full-viewport layer, no visible repeat seam. Cut before any other performance compromise.

## Remain static / explicitly rejected

- Title, intro, register, legend text, all grave inscriptions, status labels, dates, ledger, figures, obituary, lesson and navigation: static and visible on load. No section reveals or detail-page entrance sequence.
- Vegetation: static first pass. Sway is not justified by a scene without a clear wind source and adds work to many repeated elements.
- Existing undead point: preserve small state distinction; prefer a static light in the final material scene or retain its current slow pulse only after review. Reduced motion always static. No wider green light animation.
- No scroll parallax, floating/bouncing stones, random rotation, particles, cursor-following spotlights, full-screen fog, smoke, sound, explosions or animation libraries.

## Motion verification

Watch each input response three times, once with mobile CPU throttling where available, then remove the least useful optional effect. Verify reduced motion by actual browser/OS preference in the future implementation, not merely locating the CSS rule. Repeated candle clicks, ≥8 count, blocked storage, keyboard activation, offscreen return, hidden tab, touch-only pointer and preference change while running are required cases. No screen-reader status spam from flame frames or imagery.

## Approved clarification: one signature depth effect after static review

This limited addition supersedes M07's earlier 6 px differential ceiling and the blanket rejection of scroll depth only for the evaluation below. It does not authorize implementation now. Phases 1 and 2 must first pass visual review, and the hero must already be impressive as a static screenshot.

Evaluate **one** environmental effect: pointer depth with approximately **6–10 px maximum foreground/background differential**, **or** one subtle hero-only scroll depth transition during the first portion of the page. Do not enable both by default. Do not combine the candidate with another moving environmental layer to amplify it.

For the pointer candidate, retain M07's purpose, trigger, transform-only properties, 160–240 ms damping/return, fine-pointer gating, visibility/idle stops and reduced-motion behavior. The 10 px ceiling is the relative displacement between scenery layers, not 10 px per layer. Adjust overscan to the selected excursion without revealing image edges. Begin at the lower end and increase only if the artwork benefits.

The alternative scroll candidate has this contract:

| Field | Specification |
|---|---|
| Name / purpose | Hero scroll depth; reinforce separation already visible in the static composition |
| Trigger | Natural scrolling while the hero intersects the viewport, limited to its initial exit from view |
| Elements | At most two decorative hero scenery layers; no content text, inscriptions, controls or focus regions |
| Property / magnitude | Transform translation only; initially evaluate a total relative excursion of 6–10 px, with a 10 px cap |
| Duration / easing | Scroll-progress driven over the hero's initial exit; clamped linear mapping, no autonomous loop, delayed catch-up or time-based scene sequence |
| Desktop | Optional alternative to pointer depth; no pinning, scroll interception, layout movement or effect continuing down the grave field |
| Mobile | Static by default; the independently art-directed mobile composition remains complete without this effect |
| Reduced motion | Disabled; neutral static scenery immediately, including when the preference changes |
| Performance | Bounded layers, no per-frame layout reads; if JS is needed, one scheduler works only on relevant scroll updates and stops when idle, offscreen or hidden |

Both candidates must be independently removable, leaving the approved static composition complete. Never animate content text, gravestone inscriptions or controls, including through a transformed shared ancestor. Compare enabled/disabled versions: **if the effect is more noticeable than the artwork itself, remove it**. Existing payload, compositing and accessibility budgets remain in force.
