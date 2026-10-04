# Current state

Baseline inspected on October 3, 2026 (America/Chicago). This document describes the application; recommendations are in the following files. This is an analysis-only package, not authorization to implement it.

## Evidence and scope

The baseline is commit `934f4f3ac680e918677de7a30151cb99d7ac8082` (`log memorial page branch`). The working checkout was clean at the start of this audit, then another agent began editing the artwork and candle components. Initial inspection used the working checkout's dev server; the repeatable nine-view inspection used an isolated archive of that exact commit with the existing dependencies. No application source or Sanity documents were changed by this audit. Development-generated files are not design changes.

The documented `npm run dev` workflow was run with a separate loopback port. The stable audit origin was `http://127.0.0.1:4343`. It fetched the public production dataset through the existing integration. No dependency installation or production build was performed. Local Node was 26.4.0; CI and hosting use Node 22. These are development observations, not production performance measurements.

| Rendered route | 1440 × 900 | 1280 × 800 | 390 × 844 |
|---|---|---|---|
| `/` | Full page inspected | Full page inspected | Full page inspected |
| `/rip/everything-js/` | Full page inspected | Full page inspected | Full page inspected |
| `/rip/kindness-chain/` | Full page inspected | Full page inspected | Full page and candle feedback inspected |

Screenshots were inspected inline in the audit session; no screenshot files are claimed as repository artifacts. Full-page screenshots occasionally omitted an offscreen masked stone after viewport changes; the actual scrolled viewport showed Pocket Ledger intact. This capture artifact is not recorded as a product defect. The floating Astro development toolbar is development UI, not site decoration.

Additional observed behavior: a candle click on the isolated local Kindness Chain page displayed one candle and changed the button/count; keyboard focus on the retired-cause legend row dimmed 15 of 18 plots. At 390 px the measured document width was 390 px on the homepage and Kindness Chain. Reduced motion and forced colors were read in source, not emulated during this audit. No new Lighthouse results are claimed.

## Final checkout refresh (authoritative updates)

The parallel agent finished R4/R5 during the audit. Final source review reached `218304cbd9241c9328a9432566bdf616d382b4d3` (`log post refresh branch`). All three routes were inspected again in the active checkout at **all nine required viewport/route combinations**, using the separate audit origin on port 4341. The original frozen observations above remain useful temporal evidence; this section supersedes older statements below where explicitly identified.

- `Art.astro`, `Sprite.astro` and `drawings.ts` now render thirteen relics and five additional motif drawings; the existing three in-place motifs remain. Symbols are deduplicated per page, token-colored, hidden from accessibility and use a 48 × 48 viewBox. Drawings tests validate coverage, fill limits and no text/script/external references. Retain existing objects and their data meaning until approved material replacements exist.
- `Yard` now restores up to **three** small candles per plot from the same localStorage key, setting `data-lit`. Detail still draws at most seven; numeric count is uncapped. Browser-only persistence now includes homepage and shared filtered yards. This audit did not click a candle on the final origin; the earlier click test belongs to the frozen origin.
- `catGrave` chooses the latest `_updatedAt` record, ties by name, without reordering the yard. `sanity.ts` now projects `_updatedAt`; Yard requests the full project list to keep the cat consistent on filtered pages. The cat is a small static SVG silhouette, observed on Attic. Preserve its rule; no new cat animation or generated animal asset is required.
- `.gate::after` now has a 90-second linear infinite fog band: width 200%, height 28%, bottom 22%, gradient alpha 0.09, translating by -50% of its own width. Reduced motion disables it. This is a large horizontal movement despite its slow speed; no visibility pause appears in source. The motion specification's static atmosphere is an intentional future refinement, not a missing-feature recommendation.
- Relic positions are clamped inside plots. Marker/tag/relic geometry was adjusted, including the detail marker; check the final layout rather than diagnosing intermediate captures. Everything.js's annex and Kindness Chain's chain-link are visible without covering inscriptions at the checked sizes.
- CSS source totals approximately **49.8 KB**, rather than the earlier 45.6 KB. Memorial presentation variables still use the defaults described below; dense grid packing is unchanged.
- `og.png` is now **61,259 bytes**, 1200 × 630, with a pale computed-stone/cemetery composition. README now credits Fraunces, documents relic/cat behavior and links six committed screenshots in `docs/screenshots/`; the earlier font-credit mismatch is resolved.
- R4 history reports mobile production Lighthouse 100/100/100/100 on home, Everything.js and Night Porter; CLS 0.001; transfer 101 KB home / 96 KB detail, home HTML 70 KB and JS 250 bytes home / 851 bytes detail. These are the other agent's recorded results, not reruns by this audit.

The refreshed scene remains predominantly flat/vector: meaningful props improve identity but do not supply physical limestone, soil or distant photographic atmosphere. The five-source strategy still applies. Final mobile Kindness Chain document width measured 390 px at a 390 px viewport. No source, asset, dependency or CMS changes were made by this audit.

## Framework and build

Two independent npm projects, without a root application package or workspace orchestration:

- `web/`: Astro static output, TypeScript, `@sanity/astro`, `@sanity/client`, `astro-portabletext`, Fraunces, Vitest. Lockfile versions: Astro 7.3.5, Sanity Astro 3.5.1, client 8.9.0, Portable Text 1.0.1, Fraunces 5.3.0, Vitest 5.0.3 and TypeScript 6.0.3. Sharp 0.35.5 is available transitively.
- `studio/`: Sanity 6.17.0 and Vision, TypeScript, React 19 for Studio. The public website has no React integration or component runtime. The website's package declares Node ≥22.12.0.
- `web/astro.config.mjs`: `output: 'static'`; Vite `loadEnv`; required public Sanity project/dataset variables; canonical site from `SITE_URL` with a production fallback; `useCdn: false`, API version `2026-09-01`.
- `web/wrangler.jsonc`: Cloudflare Worker static assets from `dist`, custom 404 handling. No Worker application script.
- `.github/workflows/ci.yml`: website dependency install, Astro check, Vitest, build; Studio dependency install, TypeScript, schema validation. Node 22.

Root README documents the webhook → Workers Builds → static deployment chain and historic 30–60 second publish propagation. Neither deployment nor webhook delivery was retested here.

## Relevant structure

```text
studio/
  schemaTypes/{project,cause,tech,siteSettings,index}.ts
  structure.ts, sanity.config.ts, sanity.cli.ts
  seed/graveyard.ndjson
web/
  astro.config.mjs, wrangler.jsonc, package.json, package-lock.json
  src/pages/index.astro, rip/[slug].astro, cause/[slug].astro,
            stack/[slug].astro, 404.astro
  src/layouts/Layout.astro
  src/components/Horizon, Yard, Stone, Plants, Register, Legend,
                 Candle, Candles, Lifeline, Silhouette (.astro)
  src/lib/sanity.ts, stats.ts, monument.ts, color.ts, *.test.ts
  src/styles/global.css, tokens.css, base.css, scene.css,
             stone.css, grave.css, tokens.test.ts
  public/favicon.svg, og.png
  scripts/og.mjs
docs/DESIGN_BRIEF.md, BUILD_LOG.md
```

The proposed `web/src/assets/scene/` raster set is absent from the committed baseline. Empty local directories are not usable artwork.

## Homepage structure

`index.astro` loads settings, projects and causes, computes statistics, and renders:

1. Full-bleed gate/sky: HTML title, tagline and computed grave count.
2. Approach: keeper's note (Portable Text), parchment register, cause legend. On desktop the note and register occupy the left column; the legend occupies the right. DOM order stays note → register → legend.
3. Grave-order note and `Yard`: a decorative path behind the list of plots.
4. Shared keeper footer with lantern and two source/challenge links.

At 390 px these become a long single-column sequence. The first plot began about 1,785 CSS px below the page top in this inspection; at 1440 px it began about 1,278 px down. The hero does not show the interactive grave field in the first viewport. These are baseline measurements, not requests to reorder content.

## Grave-detail structure

`rip/[slug].astro` builds its static routes from the same ordered project list; previous/next come from adjacent array entries. Its sequence is:

1. Quiet full-bleed memorial sky, back signpost, optional status plate.
2. `Stone size="memorial"`, with decorative candles in its front slot; candle controls below the stand.
3. Lifeline with dates and duration; undead use an open end.
4. Autopsy ledger: cause, stack, optional last commit, optional mood, optional lines of code.
5. Optional figure medallions (up to three).
6. Optional obituary, then lesson slab.
7. Optional repository sign, previous/next signs, shared footer.

Everything.js has the large mausoleum and technical autopsy; Kindness Chain is retired, with brass, flowers, two figures, an external repository sign and no invented mood/line count. All dynamic text remains HTML. Optional sections are omitted when absent.

## Shared components and data rules

| Component/helper | Current responsibility |
|---|---|
| `Layout` | Global CSS, self-hosted fonts, metadata/canonical/social tags, skip link, optional header strip, main, footer |
| `Horizon` | Inline SVG hills, chapel, trees and fence; gate/memorial/strip variants |
| `Yard` | Ordered list, path, plot classes and `--life`, `--tilt`, `--dx`, `--dy` |
| `Stone` | Shared HTML text and decorative silhouette; plot h3/link versus detail h1; marker tags, plaques, mausoleum |
| `Plants` | Inline SVG soil/grass patch, contact ellipse, tufts, weeds and flowers according to weathering/motif |
| `Register` | Definition list with data-derived counts, average life and linked cause/shortest project |
| `Legend` | Route links, counts and `aria-current`; generated CSS `:has()` dimming rules using validated slugs |
| `Candle` / `Candles` | Local count, accessible button/status, up to seven drawn candles |
| `Lifeline` / `Silhouette` | Documentary date line; neighbor stone outline |
| `describeMonument` | Deterministic shape/layout, log-scaled life, weathering, motif/relic/inscription, tilt/offsets |

`getProjects` sorts death date ascending, then name, and puts missing death dates last. Weathering uses a build-time clock; slug hashes provide repeatable variation. Shape values: arch, shoulder, gothic, tablet, obelisk, broken, marker, plaque, mausoleum. Unknown optional visual values fall back gracefully. In the baseline, relic values are computed/fetched but not drawn; three motif families have visible treatments (overgrown, laurel, layers).

Presentation variables are applied by `Yard`, not by `Stone` itself. The detail page calculates the monument but does not pass its `life`/tilt/offsets as custom properties: memorial CSS uses its default `--life` where no inherited value exists. Shape/weathering continuity exists; exact lifespan-driven size continuity is incomplete.

## CSS and responsive architecture

One bundle: `global.css` imports tokens → base → scene → stone → grave. Source totals about 45.6 KB before production minification/compression. No Tailwind or UI library.

- Tokens: dusk sky, dark olive ground, pale limestone, ink, brass/parchment, candle amber and undead green; Fraunces display, system sans/mono; engraved text shadow; page 68rem, yard 76rem, prose 40rem.
- Base: reset, readable type, two-tone focus, full-width main, overflow clipping and skip link.
- Scene: full-bleed gradient sky, SVG horizon, approach boards, responsive yard, path and footer.
- Stone: silhouette caps as CSS SVG masks, clip-path obelisk, minimum heights, grain, edge moss/cracks, ground/vegetation, plaques and mausoleum, hover/focus responses.
- Grave: closer memorial, candle ceremony, lifeline, ledger/tags/commit plate, medallions, prose/drop cap, lesson and navigation.

Yard columns: one below 34rem, two from 34rem, three from 52rem, four from 72rem. Mausoleum spans two columns where possible; plots bottom-align. Mobile plots alternate 10% lateral margins beside a straight path. `clamp`, viewport widths and minimum heights allow text to grow. Marker/tag flex wrapping differs with available width; the detail marker explicitly stays in one row.

Important discrepancy: actual `scene.css` has `grid-auto-flow: row dense`, while the R2 build-log narrative says dense packing is absent. The source/DOM were checked; visual packing must not be assumed to preserve every chronological position. Do not silently change order during a visual pass.

## Assets and existing motion

Existing public assets: 272-byte SVG favicon; 1200 × 630 OG PNG, about 74.4 KB, showing an older dark stone/social title treatment. OG metadata does not cause that image to load as page scenery. The scene is currently inline SVG, CSS masks/gradients and SVG turbulence grain. Two Latin Fraunces woff2 files are used; the build log reports about 82 KB combined, roman preloaded, `font-display: swap`.

Existing motion:

- Plot hover/focus: stone rises 3 px over 200 ms, shadow opacity increases.
- Cause hover/focus: other plots fade to 0.45 opacity and desaturate over 200 ms.
- Undead light: 10-second transform/opacity pulse.
- Candle: 600 ms ignition/halo; 2.6-second flame flicker; lower-face/ground light opacity transition of 280 ms after a 320 ms delay. Ignition briefly animates brightness on the tiny flame.
- Repository sign arrow: 2 px translation over 200 ms; minor button background transition.

No pointer parallax, scrolling scenery, fog drift, particle system or page reveal exists in the baseline.

## Interactions, accessibility and performance

All navigation/filters use normal links. A stretched pseudo-element makes the stone clickable while its accessible link name stays the project name. Focus is drawn around the plot rather than clipped stone text. Decorative SVG is hidden from accessibility and unfocusable. There is one main heading, meaningful section headings, real `<time>`, definition lists and HTML prose. Stack colors are small swatches; their labels stay ink on parchment.

Candle keys are `graveyard:candles:<slug>`. Reads/writes catch storage failures. Each press adds one to the local count, while only seven candles are drawn; the numeric count remains uncapped. The status uses `role="status"`. Controls stay hidden until the script initializes. There is no server write, visitor aggregate, sound or homepage candle restoration in this baseline.

Reduced-motion CSS stops flame/halo/undead animation and removes relevant transitions. Instant hover state changes, including the 3 px raised position, are still possible. Forced-colors CSS removes stone masks/clipping and adds a real border. Contrast tests check 18 flat token pairs, not photographs or every textured pixel. Touch targets for candle/legend are at least 44 px; stack links are currently 32 px minimum height.

The R2/R3 build log reports 61 tests, 42 generated pages, mobile Lighthouse 100 in all categories, CLS around 0–0.001, homepage transfer 96 KB in R2 and 16.2 KB detail HTML in R3. These are historical results. The audit did not rerun them or use dev-server timing as a production benchmark.

## Documentation and concurrent-work boundaries

The oldest sections of `DESIGN_BRIEF.md` describe a prior dashboard; the current baseline already implements much of R1–R3. Section 15 proposes nine stone cutouts, thirteen relics, overlays, a Sanity backdrop field and an image URL dependency. None of that is present in the baseline schema/query/assets. README still claims system fonts only. The original local plan mentions Pages; committed configuration and later history use Worker static assets.

During this audit the active checkout gained `Art.astro`, `Sprite.astro`, drawing helpers/tests and edits to Stone/Yard/Candles/detail/CSS from another agent. The authoritative refresh above includes their completed state. Refresh once more before implementation; do not overwrite their work based on the older frozen observations.

Read the package in order: [visual audit](01-VISUAL-AUDIT.md), [art direction](02-ART-DIRECTION.md), [asset contracts](03-VISUAL-ASSETS.md), [motion](04-MOTION-SPEC.md), [performance](05-PERFORMANCE.md), [implementation plan](06-IMPLEMENTATION-PLAN.md), [verification](07-VERIFICATION-CHECKLIST.md).
