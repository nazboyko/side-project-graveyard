# Future implementation plan

**Do not implement this plan during the audit.** The user reviews this package and asset specifications before any application change. Existing content, information architecture, hierarchy, URLs, navigation, filters, order, Sanity integration, humor and user flows are fixed requirements.

Read `CLAUDE.md`, [current state](00-CURRENT-STATE.md), the remaining specification and the final result of the parallel agent's work first. This package supplements the existing brief only for the authorized visual enhancement: no new schema, pages, dependencies or product features are proposed. Older 'SVG-only' instructions are superseded by the current required-asset direction; existing fallback SVG is not permission to invent a substitute.

## Architecture decisions that affect sequencing

1. `Stone` is shared by homepage, cause/stack and detail pages. Any new skin must support both sizes and all nine shapes from day one, with no per-project switch.
2. Shape caps use masks and container-query units, while body height grows with text. Use reusable material and separable edges, not fixed-height full-stone images.
3. `Yard` applies monument custom properties; the memorial currently uses default lifespan/offset variables. The future continuity phase may explicitly apply the same computed presentation inputs in the shared wrapper, without changing `describeMonument` or data. Verify geometry before doing so.
4. `siteSettings.backdrop`, image upload fields and `@sanity/image-url` are not in the current app. Local art-direction files avoid changing the approved Sanity model. Do not implement the older proposed schema extension implicitly.
5. Source contains dense packing despite the build log saying otherwise. Preserve current ordered data and record visual placement; do not fix chronology as an unreviewed side effect of decoration.
6. The completed R4/R5 work now includes thirteen relics, all motif families, a static latest-published cat, hero fog and up to three restored local candles per yard plot. Preserve its sprite definitions, `_updatedAt` projection/cat rule and homepage persistence. Review refinement of existing fog instead of adding duplicate atmosphere. The final nine-view refresh is recorded in the baseline; refresh again before implementation.

## Shared verification and change boundaries

For each phase, inspect before/after at 1440 × 900, 1280 × 800 and 390 × 844, in the actual browser. Include home, Everything.js, Kindness Chain; add PDF Viewer SDK and Pocket Ledger for small/undead extremes. Cause and stack routes are shared-component regressions, not opportunities for new IA. Never approve solely from generated image previews or CSS reading.

Application validation when implementation is authorized: web `npx astro check`, `npm test`, `npm run build`; Studio `npx tsc --noEmit` and `npx sanity schema validate` per repository gate when a commit requires them. No dependency installation is part of this audit. Run implementation checks in an isolated checkout when another agent is active. Record actual results/retries in BUILD_LOG, honor visual review gates, never weaken hooks or tests.

Compare meaningful DOM text, hrefs, headings, document count, statuses, computed statistics and neighbor sequence before/after. Preserve `graveyard:candles:<slug>`, status region, button name/note and count/display cap. Type remains HTML and fully visible without motion. Required asset absence is a gate, not a fallback-art generation task.

## Phase 0 — Asset preparation and baseline refresh

- **Objective:** Approve the five-image minimum as a coherent set and refresh evidence against the finished parallel work.
- **Why:** Wrong light/crop/material cannot be repaired with more CSS; a moving checkout is not a repeatable baseline.
- **Prerequisites:** User approval to proceed after this documentation review; current source/branch state known; no active checkout interference.
- **Required assets:** A01–A05 source masters, all `ASSET REQUIRED` until supplied. Optional P01–P03 excluded.
- **Likely files:** Future `web/src/assets/scene/` files; approved asset prompt/provenance documentation; append BUILD_LOG and eventually README credits according to existing workflow. No schema/query changes.
- **Exact concepts:** Generate/supply real imagery with the contracts, compare candidates, reject lettering and incompatible light, derive a small responsive set with existing image tooling, validate alpha edges and tile seams. Record current rendered text/routes/order and production performance before changes.
- **Unchanged:** Every product/application behavior and existing copy/data; the present website stays the fallback baseline.
- **Risks:** Asset set too detailed/dark; incompatible mobile crop; source files exist but usable derivatives exceed budget; concurrent artwork changed the baseline.
- **Desktop verification:** Compose sources against current 1440/1280 text safe zones in design review; no source installation needed to judge the masters.
- **Mobile verification:** Check mobile master at 390 and 320, correct gate focal point and small stone materials; no squeezed title.
- **Accessibility verification:** Check final material contrast behind representative long names/dates/epitaphs; no generated text; verify clean decorative semantics planned.
- **Performance verification:** Source/derivative byte/dimension inventory, decoded-memory estimates and desktop/mobile selected-source budget.
- **Definition of done:** Five sources approved together, rejected candidates logged, baseline refreshed, integration can begin without placeholder scenery.
- **Rollback:** Independent. Approved unused assets/documentation can stay or be removed by a focused reversible change; no runtime effect.

## Phase 1 — Environmental foundation (first application implementation)

- **Objective:** Give the current sky/ground physical depth without changing composition or controls.
- **Why:** Establishes the light/material context for every later stone and prevents contradictory asset lighting.
- **Prerequisites:** Phase 0; A01/A02/A04 approved and derivative pipeline proven.
- **Required assets:** A01, A02, A04; A05 only for a minimal edge transition if useful.
- **Likely files:** `Horizon.astro`, `index.astro` only for a nonsemantic decoration wrapper if needed, `scene.css`, limited `grave.css`, asset imports/helper. Avoid global Layout changes unless shared placement requires them.
- **Exact concepts:** Add media-selected decorative picture inside the existing hero; sky/ground bottom blend, retained HTML title safe zone and current height. Reuse image in quiet memorial crop rather than another hero file. Retain current strip geometry/fence identity. Add subdued static ground tile under current path/list; no full-page single image, scene library or CMS field.
- **Unchanged:** Title/tagline/count, all text/DOM sequence/URLs, approach columns, filters, grave order, Sanity fetches and canonical metadata.
- **Risks:** Duplicate old/new fence, doubled image fetching, image becomes slow LCP, full-bleed overflow, new horizon behind light text.
- **Desktop verification:** Compare 1440/1280 hero and approach, no scene seam, quiet title bed, fence scale coherent; retain grave-field start position within current layout tolerance.
- **Mobile verification:** Confirm A02 is selected, gate centered, no additional decorative height, document width equals viewport at 390/320.
- **Accessibility verification:** Empty alt/aria-hidden, no interception of links/focus, title contrast and forced-colors fallback.
- **Performance verification:** Network selected candidates, dimensions, compressed bytes and LCP against baseline. No desktop source on mobile or redundant preload.
- **Definition of done:** A recognizable material environment in a static screenshot, all original content and routes intact, imagery fails gracefully, payload/LCP targets met.
- **Rollback:** Environment layer can roll back independently of data/candle changes; ground tile and pictures share their import references and revert together.

## Phase 2 — Physical gravestones and grounding

- **Objective:** Make all current stones look tactile while protecting their content-driven geometry.
- **Why:** The grave field is the dominant repeated visual and must not look like eighteen smooth panels.
- **Prerequisites:** Phase 1's light model; all silhouette/content extremes recorded.
- **Required assets:** A03, A05; A04 already shared. P01/P02 only if independently approved later.
- **Likely files:** `Stone.astro`, `Plants.astro`, `stone.css`, `grave.css` for shared size/skin constraints; `Yard.astro` only if wrapper/variable placement needs consolidation. Preserve `monument.ts` outputs, schemas and query projections.
- **Exact concepts:** Shared low-contrast limestone skin behind current masks; separable cap/body/bevel shading; lower-right contact shadow at fixed base; fine texture variation selected deterministically; selective terrain fragment at weathered feet. Brass stays pale/legible, marker tag stays separate, mausoleum retains pediment/steps and span. Remove redundant old noise only where replacement actually exists. Keep existing relic/motif work from the parallel agent.
- **Unchanged:** Nine silhouette meanings, shape fallback, chronology, HTML words, h3/h1/link roles, data-driven status/weathering/life rules and active hit areas.
- **Risks:** Stretched material or cap, too much weathering over words, mask clips focus, marker/tag floats after wrapping, two-column mausoleum reorders neighbors, repeated terrain looks artificial.
- **Desktop verification:** Compare first rows and all special shapes at both widths; no artificial identical texture crops; inspect marker/tag ground line at 1280 where wrapping occurs.
- **Mobile verification:** Read every long epitaph at 390/320 and zoom; no fixed image ratio truncation, no decorative blade across text, mausoleum fits and marker/tag stay grounded.
- **Accessibility verification:** Actual material text contrast ≥4.5:1, unfettered keyboard ring/click target, images do not enter accessibility names, forced colors/no images still readable.
- **Performance verification:** One texture per selected resolution, bounded alpha fragments; compare scroll trace/memory and filter preview; no eighteen unique full-stone image downloads.
- **Definition of done:** Shapes/text stay recognizable, texture and contact carry physicality, a new required-fields-only grave still needs no custom artwork.
- **Rollback:** Material/terrain skin independent of environment if imports/classes revert together. Keep any reviewed shared-variable wiring separate so it can be reverted independently.

## Phase 3 — Depth and restrained feedback

- **Objective:** Tune static separation and input feedback; evaluate pointer depth only if still useful.
- **Why:** Static light/contact must work before motion; motion should communicate intent, not hide weak materials.
- **Prerequisites:** Phases 1–2 accepted in still images and within budgets.
- **Required assets:** None new. No dedicated fog asset in first pass.
- **Likely files:** `scene.css`, `stone.css`, `Legend.astro` only if generated opacity rules require adjustment; optional small vanilla scene script component/module if pointer depth is explicitly retained.
- **Exact concepts:** Implement M01/M02 feedback with bounded opacity; avoid moving stone text. Keep fog baked/static. Optional M07 behind fine-pointer/motion/visibility guards with one idle-stopping scheduler and two scenery layers. No scroll-linked movement, vegetation loops or reveals.
- **Unchanged:** Navigation timing, filter URLs/count/selection, DOM order and static availability of all content.
- **Risks:** Texture-heavy filter repaints, parallax reads as cursor chasing, oversized GPU layers, new JS active on touch or reduced-motion users.
- **Desktop verification:** Pointer/focus across stones and causes; no gap at image edges, unchanged clicks; compare with motion disabled and remove effect if benefit is slight.
- **Mobile verification:** Parallax absent including hybrid input transitions; smooth full-page scrolling and ordinary filters.
- **Accessibility verification:** Real reduced-motion preference and changes while page is open; focus never dimmed/clipped; no hidden/revealed content.
- **Performance verification:** Trace pointer/preview, check no long tasks/idle RAF/offscreen work; budget optional scene script around 3 KB compressed maximum.
- **Definition of done:** Feedback is legible, atmosphere remains quieter than content; optional motion retained only with visible benefit and clean trace.
- **Rollback:** Pointer depth fully independent; remove script/layer transform and keep static scene. Feedback styling reversible separately. No content/data rollback.

## Phase 4 — Closer detail memorial

- **Objective:** Make the selected grave visibly the same object at a closer scale, then transition into the current technical record.
- **Why:** Shared shape/material continuity is more important than a new unique background for every detail page.
- **Prerequisites:** Phases 1–2; latest Stone and parallel motif implementation reconciled.
- **Required assets:** Reuse A01/A02/A03/A04/A05, no dedicated detail generation.
- **Likely files:** `rip/[slug].astro`, `Stone.astro`, `grave.css`, limited `Lifeline.astro` only if decoration integration demands it. No query/route/schema change.
- **Exact concepts:** Quiet crop of same background, larger material scale, local terrain/contact shadow, HTML status/back sign on readable surface; explicitly evaluate sharing computed life/tilt/offset presentation inputs. Fade ground detail within existing whitespace before lifeline/ledger; preserve documentary sharpness. Keep lesson surface consistent without deep scenery behind prose.
- **Unchanged:** All section order/optional content, figures, back/neighbor/repository URLs, displayed dates/lifespan/status, obituaries and lessons.
- **Risks:** Default-variable wiring changes memorial dimensions unexpectedly; title/date wrap, small marker no longer fits its tag, background competes with status/back link, overly textured ledger.
- **Desktop verification:** Home/detail side-by-side for Everything.js, Kindness Chain, smallest marker and undead; stone and controls remain readily visible at 900/800 heights, no full-screen intro.
- **Mobile verification:** Same at 390/320, long name/date/tag readable, body flows naturally, no oversized scene postponing technical record.
- **Accessibility verification:** Single h1 and current section headings, `<time>`, no decorative alt noise, keyboard/focus/back target visible, prose contrast.
- **Performance verification:** Shared assets/cached derivatives, no per-project bundle, LCP/CLS and memory compared with baseline.
- **Definition of done:** Same object across routes, local physical scene, unchanged technical autopsy/content path, no unique grave artwork dependencies.
- **Rollback:** Detail composition independent from homepage foundation; shared Stone CSS changes require home/cause/stack regression on revert. Keep shared wiring change isolated.

## Phase 5 — Candle visual interaction

- **Objective:** Refine the existing ceremony's wax, ignition and local illumination.
- **Why:** It is the one meaningful button and should feel like a small physical act.
- **Prerequisites:** Phase 4 geometry and protected content safe zones accepted; storage/aria behavior captured.
- **Required assets:** None new; existing CSS wax suffices. P03 only after an approved need; no flame sprite sheet, smoke or sound.
- **Likely files:** `Candle.astro`, `Candles.astro`, `grave.css`; read latest parallel implementation before editing.
- **Exact concepts:** M03–M05: modest wick/flame/halo, bounded lower-face/ground reflection, tiny slow flicker, pause when offscreen/hidden. Count updates synchronously. At most seven drawn candles; real count unlimited; blocked storage continues in-memory. Reduced motion shows final lit state instantly.
- **Unchanged:** Existing key prefix/slug, count math, button label, status messages/browser-only note, zero backend writes. Do not add homepage candle behavior if absent in the final approved baseline; that belongs to the other existing branch's scope.
- **Risks:** Duplicate handlers after sprite work, seven candles wash out epitaph, lighting delayed after count, alpha decoration blocks button, loss of hidden-without-JS behavior.
- **Desktop verification:** 0→1, 1→2, 7→8, repeated press, reload, neighboring slug isolation and same-origin revisit; flame anchor and reflection visible.
- **Mobile verification:** Same gestures/counts with thumb, scene width bounded, no hot continuously animating large surface.
- **Accessibility verification:** Enter/Space activation, focus survives, single status update per press, storage failure, no-JS hidden control and finished reduced-motion state.
- **Performance verification:** Click INP/trace, offscreen/hidden pause, no per-frame DOM/count reads, no network request on candle click.
- **Definition of done:** Existing truthful behavior unchanged; small warm ceremony with no particle/loop distraction or performance regression.
- **Rollback:** Candle visual refinements independent of storage behavior and environment; revert CSS/optional pause mechanism together. Never migrate/reset stored counts.

## Phase 6 — Mobile adaptation and cross-browser verification

- **Objective:** Complete mobile art direction, zoom and browser robustness after continuous mobile checks in earlier phases.
- **Why:** A 390px yard is a long walk with very different composition, not a scaled desktop image.
- **Prerequisites:** All earlier phases already have basic mobile checks; real ordinary phone available for final acceptance where possible.
- **Required assets:** A02 and smaller shared derivatives; no new mobile asset beyond approved minimum.
- **Likely files:** Responsive rules in `scene.css`, `stone.css`, `grave.css`; picture `sizes`/media sources and decorative wrapper bounds. No content/route edits.
- **Exact concepts:** Fewer alpha layers, tighter terrain footprint, no pointer behavior, controlled crops; text-first min-height, marker/tag and mausoleum extremes, focus outside masks. Check 320/390/768 and 34/52/72rem boundaries, Safari/Chrome/Firefox where available.
- **Unchanged:** Current single-column order/alternating margins, full text, counts, control semantics and navigation.
- **Risks:** Hidden overflow masking clipped focus/content, tablet dense-grid mismatch, masks differ by browser, mobile network downloads desktop art, 200% zoom truncates name.
- **Desktop verification:** No desktop layout regression from mobile overrides; 1280 remains mandatory due marker wrapping.
- **Mobile verification:** Full scroll/read, image failure, slow cold load, portrait/landscape, dynamic browser chrome, ordinary device heat/smoothness.
- **Accessibility verification:** Zoom, touch targets/spacing, reduced motion, forced colors and no imagery; no color-only status.
- **Performance verification:** Mobile selected transfer ≤700 KB practical target, no unused desktop download, decoded-memory and smoothness on real phone.
- **Definition of done:** Complete legible composition without desktop-only behavior or hidden overflow; ordinary mobile experience passes.
- **Rollback:** Responsive/crop corrections can revert independently when isolated; all shared selectors must be regressed afterward.

## Phase 7 — Performance optimization

- **Objective:** Enforce the budget and measured loading/compositing behavior.
- **Why:** Asset size and GPU cost are product constraints, not a final cosmetic afterthought.
- **Prerequisites:** Complete candidate composition and repeatable production benchmark.
- **Required assets:** Same masters; optimized derivatives only.
- **Likely files:** Image width/quality/import helper, picture markup, optional motion scheduler, relevant CSS. No stack migration/dependency addition.
- **Exact concepts:** Reduce selected widths/quality carefully, remove redundant noise/filter layers, native lower-page lazy loading with reserved geometry, focused preload, bounded compositor layers and idle pause. Cut pointer/fog polish first.
- **Unchanged:** Readable content, image light/material character, all meaningful functionality and no-JS fallback.
- **Risks:** Compression erases texture or creates halos, lazy-loading visible memorial, preload duplicates, trimming CSS breaks masks/forced colors.
- **Desktop verification:** Cold/warm route loads, all images material-consistent after re-encode, no blank scene.
- **Mobile verification:** Slow load, selected resource audit and full-yard scroll with seven candles.
- **Accessibility verification:** Contrast after compression, no CLS-induced focus movement, still instant reduced-motion feedback.
- **Performance verification:** [Performance strategy](05-PERFORMANCE.md): production medians, byte inventory, LCP/CLS/interaction trace and decoded memory. Record failures honestly.
- **Definition of done:** Decorative target ≤600/400 KB desktop/mobile, complete initial experience near or below 2 MB hard review threshold, no major measured regression; remaining limitations explicit.
- **Rollback:** Encoding/selection optimization independent if image imports/generated variants revert together. Optional motion removal is permanently safe.

## Phase 8 — Final visual polish and handoff

- **Objective:** Make light/material decisions consistent and verify every preserved contract.
- **Why:** The result should feel art-directed, not a collage of separately attractive assets.
- **Prerequisites:** Previous phases accepted, checks green, [verification checklist](07-VERIFICATION-CHECKLIST.md) completed.
- **Required assets:** No new required asset. P01–P03/social-card refresh only if approved, measurable and useful.
- **Likely files:** Small targeted CSS fixes; approved screenshots and provenance/README credits; BUILD_LOG append. No new content sections or feature work.
- **Exact concepts:** Compare homepage/detail at three required viewports; remove one unnecessary decorative effect; inspect shadow directions, alpha fringes, repeated material crops, foot grounding, focus and text. Update documentation to describe actual materials/font/hosting, without editing historic facts out of BUILD_LOG. Optional social-card typography is authored separately after image generation.
- **Unchanged:** All copy/data/IA/URLs/navigation/filters/ordering/candle meaning. Do not polish by rewriting epitaphs or choosing different graves.
- **Risks:** Cosmetic fix cascades through shared components; late asset request expands scope; screenshots hide clipping/offscreen mask issues.
- **Desktop verification:** Full-page and scrolled-view captures at 1440/1280, every route family, coherent scene and quiet editorial hierarchy.
- **Mobile verification:** 390 full page plus readable viewport tiles, zoom/low-end device where available, no added decorative waiting screen.
- **Accessibility verification:** Actual keyboard walk, focus, static/reduced/no-JS/forced-colors states, final textured contrast.
- **Performance verification:** Required repository checks and final production benchmark after last meaningful change; no invented numbers.
- **Definition of done:** User can review concrete before/after evidence, all checklist contracts pass or documented exceptions are explicitly accepted, source/credits/prompt history honest. Honor existing manual visual merge gates.
- **Rollback:** Final cosmetic/provenance changes independent. Never roll back dataset or concurrent-agent work as part of visual polish.

## Stop / fallback decisions

Missing A01–A05 stops the claim of a finished enhancement. Keep the existing site complete; do not manufacture SVG placeholders. If A03 fails to make memorials credible, prototype a separately contracted cap/body/base set before commissioning all shapes. If performance fails, cut optional motion/alpha polish, reduce asset complexity/decoded size and remeasure. Real 3D is not needed for any specified effect; no WebGL experiment is justified by this scope.

No phase is started automatically by delivery of this plan. The next step after review is Phase 0 asset preparation, followed by Phase 1 as the first application change.

## Approved clarifications to phase gates

The analysis package is approved with these additions only. No generation or implementation phase is authorized to start yet. Existing phase details and rollback boundaries remain; the following clarifications take precedence where an earlier phrase is narrower.

**Phase 0 sequence:** A01 candidate generation → A01 visual approval → A02–A05 generation using approved A01 as the reference → full asset-set consistency review. A01 defines lighting direction, color temperature, realism level, material scale, atmospheric softness, camera impression and contrast level for all dependent sources. Do not generate five independent assets and attempt to reconcile them afterward. Record the anchor version and approval before dependent generation.

**Phase 1 visual gate:** The homepage first viewport must contain one memorable static composition, materially beyond an ordinary styled page. Judge composition, depth, materials, cinematic light, foreground/background separation, scale and subtle photographic softness at all three required viewports. Keep the approved content hierarchy, copy, controls and text safe zones. Decorative composition may be art-directed within that structure; extra UI, text, decoration or animation does not satisfy the gate.

**Phase 2 visual gate:** Confirm that physical stones and grounding share A01's visual language and that the first-viewport composition still succeeds with motion disabled. Both Phases 1 and 2 need visual approval before evaluating the signature effect.

**Phase 3 option:** Evaluate either pointer depth with approximately 6–10 px maximum foreground/background differential, or one subtle hero-only scroll depth transition during the first portion of the page, as specified in [04-MOTION-SPEC](04-MOTION-SPEC.md). This is a narrow exception to the earlier no-scroll statement. Do not enable both by default. Content text, inscriptions and controls stay stationary. Keep the chosen effect independently removable; remove it if it attracts more attention than the artwork. Validate its static/reduced-motion state, mobile default, edge coverage, idle/offscreen behavior and existing performance budget. The static composition passes even if neither candidate is retained.
