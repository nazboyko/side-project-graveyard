# Verification checklist

Reusable for future implementation. All unchecked items are future requirements, **not evidence that this audit ran them**. Current audit evidence is recorded in [00-CURRENT-STATE](00-CURRENT-STATE.md). Complete the checklist against a production build with content/clock fixed for repeatable comparison, and record revision, browser/device, viewport, cache/throttling and actual results.

## Before modifying the application

This audit inspected both the original R3 snapshot and the final R4/R5 application at all nine required route/viewport combinations. That is current visual evidence; unchecked future release items remain unexecuted. Final baseline includes relics, the `_updatedAt`-placed static cat, hero fog and three-candle yard restoration.

- [ ] Read CLAUDE.md, the current specification and the final concurrent-agent changes.
- [ ] Confirm implementation is now authorized; do not interpret this analysis package as permission.
- [ ] Capture clean source/content baseline; isolate work from another agent's checkout/index/build output.
- [ ] A01–A05 approved; sources match camera, lighting, color and text safe zones; no missing-realism SVG placeholder.
- [ ] Inventory assets and generated candidate provenance/credits; no secret, local external path or private-project information in committed files.
- [ ] Record original meaningful text, heading order, hrefs, slug list, counts, statuses and previous/next sequence.

## Required rendered matrix

Capture and inspect each cell. Full-page screenshots plus actual viewport/tiled views are required for long pages and masked objects.

| Page | 1440 × 900 | 1280 × 800 | 390 × 844 |
|---|---|---|---|
| Home | [ ] | [ ] | [ ] |
| Everything.js | [ ] | [ ] | [ ] |
| Kindness Chain | [ ] | [ ] | [ ] |

- [ ] Additional extremes: `/rip/pdf-viewer-sdk/` and `/rip/pocket-ledger/`, one cause page, one stack page and unknown-route 404.
- [ ] Additional widths: 320px, 768 × 1024 and around 34/52/72rem breakpoints; 200% zoom.
- [ ] Ordinary mobile hardware plus other available browsers tested; record unavailable coverage honestly.
- [ ] Wait for fonts/image decoding, neutral pointer/focus baseline and fixed clock; pause motion for still references, inspect motion separately.
- [ ] If full-page capture omits a masked stone, inspect the actual scrolled viewport before declaring a defect or ignoring it.

## Homepage desktop

- [ ] Same title, tagline and computed count; quiet dark HTML safe zone.
- [ ] Gate/hills/fence read as one environment; no duplicate old/new fence or seam.
- [ ] Keeper's note, register, legend and yard remain in current hierarchy/DOM sequence.
- [ ] Register values/links/row order unchanged; no new metrics/KPI panels.
- [ ] Legend counts, active state and long labels clear; no new filter control.
- [ ] Every grave name/date/epitaph/cause/status/inscription remains HTML and fully visible.
- [ ] Nine supported shapes, marker/tag, plaque/flowers and mausoleum are retained; no fixed image height truncation.
- [ ] Ground contact/shadow credible, no floating bases; static deterministic offsets remain sensible.
- [ ] Check visual packing against recorded baseline; no silent order changes from dense/spanning layout.
- [ ] Repeated texture/moss/grass variations feel controlled rather than uniform or random.
- [ ] Existing footer ends the page; no new content band, subscription or scenic epilogue.

## Homepage mobile

- [ ] Correct A02 source/crop; no hidden download of A01.
- [ ] Current title wrapping and first-grave access are not postponed by new decoration.
- [ ] Single-column sequence, alternating offsets and readable full epitaphs remain.
- [ ] Legend long labels/counts fit; register leaders do not force overflow.
- [ ] Marker/tag and mausoleum fit/stand on their ground at 390 and 320; no focus/content hidden by overflow clipping.
- [ ] Document scroll width equals viewport; foreground plants do not consume the reading area.
- [ ] No pointer/gyro parallax, costly foreground fog or desktop-only hover requirements.
- [ ] Portrait/landscape and zoom remain useful; full yard scroll is smooth on an ordinary phone.

## Detail page desktop/mobile

- [ ] Same selected stone as home: shape, material family, weathering, status and inscription.
- [ ] Single HTML h1, exact dates/lifespan and full epitaph; long name/date wrapping works.
- [ ] Back link/status never disappear behind horizon or decorations.
- [ ] Stone/candle readily visible without a cinematic wait or new oversized hero.
- [ ] Memorial → candle → lifeline → Autopsy → optional figures → obituary → lesson → optional ruins → neighbors → footer unchanged.
- [ ] Autopsy labels/rows/conditional fields preserved; real technical text remains sharp.
- [ ] Stack names, swatches, accessible 'Built with' labels and targets remain intact.
- [ ] Literal last commit and timestamp context remain unaltered; no fake terminal/hash.
- [ ] Existing Kindness Chain figures are unchanged; no invented figures for empty records.
- [ ] Prose/drop cap and lesson remain legible against final material; no imagery inserted into narrative.
- [ ] Mobile neighbor signs stack; previous/next and repository targets/rel attributes preserved.
- [ ] Atmospheric detail tapers before technical content within existing spacing, without new sections.

## Navigation, filters and data

- [ ] All original URLs/hrefs/slug routes unchanged; no broken link, redirect or missing static route.
- [ ] Home → grave → back and neighbor → neighbor journeys work by ordinary links.
- [ ] Every cause/stack route still shows its original filtered projects; counts and current state unchanged.
- [ ] Legend focus/hover dims only nonmatching plots; focus-within plot remains undimmed; blur restores view.
- [ ] Project query order/clock interpretation and neighbor adjacency unchanged; visual overlap does not imply a new order.
- [ ] No Sanity schema/query/dataset/content edits as part of the visual pass; optional absent values behave exactly as before.
- [ ] Required-fields-only new grave has a complete default appearance without name-specific code or artwork.
- [ ] Static output, build-time data fetch, publish/rebuild integration and canonical metadata remain intact.
- [ ] Unknown route still receives the existing 404 content and correct host status.
- [ ] No content, information architecture, product concept or functionality regression.

## Candle

- [ ] 0→1, 1→2 and 7→8 presses: one count increment each, maximum seven drawn candles, accurate uncapped count.
- [ ] Key remains `graveyard:candles:<slug>`; reload persists, different slugs do not share counts.
- [ ] Existing button name/browser-only note/status preserved; no server write, sound or global visitor wording.
- [ ] Enter/Space work; focus stays on control; one status announcement per press.
- [ ] Blocked/full storage retains working in-memory feedback; no console crash.
- [ ] JavaScript disabled: existing hidden controls remain hidden; all meaningful site content/navigation works.
- [ ] Ignition tiny/natural, no particles/explosion; reflection remains near wick/base and does not wash out words.
- [ ] Seven candles remain restrained; newer clicks do not restart a giant scene transition or create additive handlers.
- [ ] Flame/optional loops pause offscreen/hidden and resume safely; count never depends on animation completion.
- [ ] Homepage candle behavior matches final approved baseline; no unrequested new flow.

## Accessibility and motion

- [ ] Actual keyboard sequence: skip link → current register/legend links → ordered graves; detail back → candle → technical links → neighbors/footer.
- [ ] Skip link visible on focus; main target works; two-tone ring visible on ground, stone, wood, paper and brass.
- [ ] Image/mask/overflow never clips the focus outline or blocks a hit target.
- [ ] Decoration empty-alt/aria-hidden/unfocusable and pointer-events none; no generated text in accessible names.
- [ ] Real headings, `<time>`, definition lists and Portable Text remain; no image-rendered dynamic text.
- [ ] Normal text contrast ≥4.5:1 on actual compressed/textured surfaces, not just flat tokens. Sample worst local background behind type.
- [ ] Focus/control boundaries distinguishable; touch target size/spacing appropriate without shrinking existing hit areas.
- [ ] Forced colors: background loss leaves real stone borders, labels, links and controls visible.
- [ ] Actual reduced-motion setting: no drift, parallax, flame/halo/undead animation or light fade; finished visual state complete instantly.
- [ ] Preference change during an active optional effect stops it and resets scenery without layout/content jump.
- [ ] No content hidden pending entrance/reveal; no scroll animation needed to understand the page.
- [ ] Fine-pointer optional motion within specified limits; disabled on touch/mobile and idle/offscreen.

## Materials, lighting and image loading

- [ ] Upper-left diffuse light consistent across fence, stone, brass, wood, plants and ground; weak lower-right shadows.
- [ ] Candle/lantern warmth has a local physical explanation; no arbitrary glows/neon.
- [ ] Far scene subdued; important HTML always sharp; no depth-of-field blur across text.
- [ ] Stone texture scale/cap/body joins coherent at plot and memorial sizes; no stretched pores/cracks.
- [ ] Moss/grass stay at edges/base; honored flowers retain their distinction without repeated symmetrical bouquets.
- [ ] Alpha has no dark/white matte fringe; no repeating obvious terrain seam.
- [ ] Mobile and detail crops retain focal point and safe zones; no watermark/lettering/logo/horror imagery.
- [ ] Explicit image dimensions/reserved parent geometry; no layout shift on font/image decode.
- [ ] Correct `srcset`/`sizes`/media candidate delivered; only justified preload, no desktop/mobile duplicate.
- [ ] Lower-page imagery lazy only where useful; visible memorial/environment never blank while waiting.
- [ ] Image failure/no images leaves readable current fallback, with no placeholder artwork claiming realism.

## Performance and release evidence

- [ ] Cold selected decorative transfer ≤600 KB desktop / ≤400 KB mobile target; complete initial practical targets ≤950/700 KB.
- [ ] Initial high-impact visual experience near or below approximately 2 MB review threshold; any exception explained before acceptance.
- [ ] Fonts unchanged subset/payload; no React/Tailwind/component system/animation library/WebGL introduced.
- [ ] No huge continuously animating filters/blur/shadows, full-yard GPU layer or permanent will-change on all stones.
- [ ] One optional RAF scheduler only when justified, idle-stopping; no per-frame layout reads or count/status writes.
- [ ] Trace real scroll, pointer/filter preview and candle interaction; no new long tasks or mobile GPU overload.
- [ ] Production Lighthouse/equivalent median comparison, performance ≥90 goal, accessibility target 100; manual findings still resolved.
- [ ] LCP ≤2.5s planning target, scene CLS <0.02, interaction planning target ≤200ms; lab/field evidence distinguished.
- [ ] Appropriate repository checks pass after final meaningful change; record exact failures/retries, never invent a pass.
- [ ] Before/after full-page and viewport evidence reviewed against this checklist; material changes approved, masks/text not hidden by image-diff tolerance.
- [ ] README credits/provenance/build history describe actual final work; no historic failure removed.
- [ ] Stage/commit/PR and manual visual review gates follow CLAUDE.md and user authorization; no staging or reverting another agent's files.
- [ ] Independent rollback boundaries recorded; stored candle counts/CMS data do not need migration.

## Approved clarification gates

These are future acceptance checks, not completed implementation work.

- [ ] A01 candidates generated and one anchor visually approved before A02–A05 generation begins.
- [ ] A02–A05 use the approved A01 image as their reference; anchor version recorded.
- [ ] Full set matches A01's lighting direction, color temperature, realism level, material scale, atmospheric softness, camera impression and contrast level.
- [ ] Assets were not generated independently and reconciled afterward; a changed anchor triggers another consistency review.
- [ ] Hero first-viewport stills at 1440 × 900, 1280 × 800 and 390 × 844 each show one memorable composition before motion is enabled.
- [ ] The visual impact comes from composition, atmospheric depth, believable materials, cinematic light, foreground/background separation, scale and photographic softness; text remains sharp.
- [ ] No extra UI, text, decorative clutter or excessive animation was used to manufacture the effect.
- [ ] Phases 1 and 2 pass visual review before signature depth evaluation.
- [ ] Evaluate either 6–10 px maximum pointer foreground/background differential or a subtle hero-only initial-scroll transition; both are not enabled by default.
- [ ] Content text, gravestone inscriptions and controls remain stationary, including their ancestors.
- [ ] The chosen effect is independently removable; reduced motion and mobile defaults preserve the approved complete static composition.
- [ ] Enabled/disabled comparison confirms the artwork commands more attention than the effect; otherwise the effect is removed.
- [ ] Existing performance, accessibility, visibility/idle-stop and image-edge checks pass for any retained candidate.
