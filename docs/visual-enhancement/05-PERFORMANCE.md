# Visual performance strategy

This is a proposed budget and verification strategy, not a benchmark report. [The baseline](00-CURRENT-STATE.md) separates historic production Lighthouse results from this audit's dev-browser observations. Measure a production build before and after future implementation; development HMR/toolbars are not representative.

Use the final R4/R5 application for the next benchmark, not the original R3 archive. Its recorded home transfer is 101 KB, home HTML 70 KB and script 250 bytes; detail transfer is 96 KB and script 851 bytes. These remain historic claims. New per-plot restored candles can create more tiny animated flames than the original detail-only baseline; trace long-yard scrolling, visibility pausing and the existing wide hero-fog layer before adding any other loop.

## Budget

All numbers below are targets for compressed bytes actually selected/transferred on a cold load, not source-master size. KB uses approximate decimal units. A01/A02 are alternatives. Reused textures/alpha fragments count once per selected URL, not once per grave.

| Resource | Desktop target | Mobile target |
|---|---:|---:|
| Selected environment image | ≤300 KB | ≤150 KB |
| Shared limestone derivative | ≤70 KB | ≤40 KB |
| Shared ground derivative | ≤60 KB | ≤40 KB |
| Shared terrain-edge derivative | ≤70 KB | ≤45 KB |
| Existing fonts | Approximately 82 KB; verify | Same subset, approximately 82 KB |
| HTML + CSS + small scripts | ≤150 KB compressed combined | ≤150 KB compressed combined |
| First-load contingency | ≤200 KB | ≤150 KB |
| Practical total target | ≤950 KB | ≤700 KB |

Aim for ≤600 KB decorative transfer desktop and ≤400 KB mobile for the complete minimum set. Initial viewport imagery should be smaller still if lower-page terrain is deferred. Hard review threshold: approximately 2 MB initial high-impact visual payload. This is realistic for the five-image material approach. A future full cutout/relic library must fit the same budget through selective loading; it is not permission to raise the threshold silently.

Keep historic stricter goals where feasible: font pair ≤130 KB combined, homepage HTML <120 KB uncompressed, Lighthouse mobile performance ≥90 and accessibility 100 (minimum acceptance 95 pending manual review), scene-related CLS <0.02. Use Core Web Vitals planning targets of LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1; actual field results require sufficient real traffic. Do not equate one lab score to field compliance.

## Formats and asset pipeline

- Preserve lossless source masters under local `web/src/assets/scene/`; commit only approved sources and reviewed outputs needed by the chosen build workflow. Never send the PNG master by default just because it is easy.
- Use existing Astro image tooling and its available processor to create AVIF/WebP derivatives. Evaluate AVIF on photographs/opaque textures and WebP for small alpha vegetation, checking encoding quality, decode cost and supported alpha output. Do not install a new pipeline during this analysis.
- If AVIF has visible grass ringing or costs disproportionately more to decode, prefer a good WebP. Provide a compatible picture fallback for environment images. CSS material backgrounds may use precomputed URLs selected with media/image-set; fallback semantics must be checked rather than assumed.
- Re-encode/resize at build time, not on every browser render or Sanity publish request from the client. Local decorative assets require no API token, new CMS field or runtime image service.
- Cache shared material URLs normally. Do not append random query strings or create eighteen unique derivatives with the same texture content.

## Responsive delivery and dimensions

Environment A01 widths around 960/1440/1920, A02 around 390/780. Use media-selected `<picture>` sources and truthful `sizes`; validate Network at all three required viewports. Do not preload a desktop source that the mobile picture will discard. Do not use JS window width to select an image after first paint.

Declare width/height and reserve the existing sky geometry. For absolute imagery, the positioned parent must reserve layout independently. Terrain fragments get explicit dimensions/aspect-ratio and bounded decorative positions. Text-driven stone height remains authoritative; images must never shrink the text or resize the stone after decode.

Use a smaller shared texture derivative on mobile without changing the source material. Decorative detail rarely warrants full device-3× image selection; choose a measured cap. Avoid enormous decoded portrait backgrounds for a page that already exceeds 8,000 CSS px on mobile.

## Loading priorities

The visible environment is eager. Set high fetch priority only if it is the likely LCP element or needed to avoid an obvious empty scene; verify in the trace. Use at most one justified matching responsive image preload. Preserve the existing roman font preload; do not preload italic, every shape, all relics and all vegetation.

Above-the-fold memorial material/candle visuals must appear without lazy-loading delay. Small shared material tiles are acceptable early, but do not fetch optional flower/moss polish before it becomes useful. Lazy-load lower-page foreground fragments using native loading and reserved geometry, avoiding dozens of eager decorative images on the long mobile yard. A CSS background cannot be made natively lazy by assigning `loading`; choose actual image placement or a measured class/observer mechanism if deferral is necessary.

Keep a presentable fallback background and current silhouette if an approved file is unavailable or fails decoding. Required source absence blocks claiming completion of the physical-art direction; it does not justify invented SVG scenery. Normal text/navigation continue to work.

## Compositing and repaint

- Prefer static surface textures and transform/opacity on small bounded elements.
- The current 200 ms plot desaturation transition can repaint many textured objects simultaneously. Preserve preview meaning but prefer opacity-only fading, then profile before retaining animated filter.
- Current CSS SVG turbulence, masks and drop-shadows multiply per stone. Material replacement should remove redundant grain layers where it actually replaces them; do not stack every old noise/filter on every new photo.
- Do not animate full-screen blur, saturation, large box/drop-shadows, masks, clip paths, background positioning or layout. No backdrop-filter over the yard.
- Avoid blend-mode stacks; simple pregraded material + bounded tint is easier to predict, contrast-test and composite.
- No permanent `will-change` on the whole page, all plots, text or every decorative image. Apply only to a demonstrated active bounded layer, and release when idle.
- Pointer depth is optional, one scheduler, two bounded scenery wrappers maximum; no frame-based reading of every grave's layout. Stop loops offscreen, hidden or settled. Candle flames can pause through one IntersectionObserver/visibility mechanism.

## Memory and mobile GPU

Transfer size does not equal decoded memory. A 1920 × 960 RGBA image costs about 7.4 MB before extra compositor surfaces; a 780 × 910 mobile image about 2.8 MB. A 1024² texture is roughly 4.2 MB decoded even if it transfers in 60 KB. Prefer smaller selected derivatives and reuse them.

Avoid a single full-height page layer: a roughly 390 × 8,600 surface costs about 13.4 MB at 1× and much more at higher device density. CSS tiling can remain in normal paint flow; do not force the long yard into its own giant GPU texture. Bound optional moving layers to the hero/memorial and use only sparse alpha foreground coverage. Do not create full-viewport fog plus large transparent images over every stone.

Real device acceptance matters: test an ordinary phone as well as viewport emulation, scroll the full yard, light seven candles, and return from background. If frames drop, cut optional pointer/fog layers before reducing content readability or removing semantic controls.

## Accessibility and reduced motion

Decorative images have empty alt/aria-hidden, no keyboard focus and pointer-events none. Do not put opacity/filter on a shared ancestor that contains meaningful text. Keep focus outlines outside image/mask clips. Static rendered images must preserve readable contrast even when motion is disabled.

All optional motion and flame/halo/undead loops become static under reduced motion. The button/count/status still respond instantly; there is no motion-based extra announcement. The initial DOM remains readable with JavaScript blocked. In forced colors, retain actual stone borders and visible text/controls when decorative backgrounds disappear.

## Core Web Vitals risks and responses

| Risk | Mechanism | Response |
|---|---|---|
| LCP grows | Big hero image competes with roman font/title | Match source to viewport, compress, prioritize only measured LCP, keep preload focused |
| CLS rises | Image arrives without reserved dimensions or font wraps | Keep existing hero geometry, image dimensions, content-driven stone min-height and font strategy; inspect font/image load sequence |
| INP worsens | Candle starts expensive scene work; pointer scheduler churn | Immediate count/status, bounded effects, no framework hydration or per-plot RAF |
| Scroll stutters | Masks, filter fades, repeated transparent textures | Reduce filter animation, limit alpha layers, smaller decoded sources, no full-page GPU promotion |
| Readability degrades | Texture/mist crosses text | Safe zones/local pale reading bed, no HTML blur, manual final-image contrast sampling |

## Production measurement protocol

Before future changes, use an isolated checkout/worktree with production build output and existing dependencies. Run the repository checks there, serve locally and record the same data/content snapshot. Do not overwrite another agent's `dist`, branches or staging area. Record Node/browser/version, viewport, device scale, cache state, throttling and build revision.

Compare homepage, Everything.js, Kindness Chain, PDF Viewer SDK and Pocket Ledger; include a cause/stack page because shared skins affect them too. Run Lighthouse three times per representative page/profile where available and report median plus worst result; do not rerun repeatedly to select a lucky 100. Save Network transfer totals, selected image candidates/dimensions and performance trace. Never report dev-server transfer as production payload.

Visual regression: capture 1440 × 900, 1280 × 800, 390 × 844 plus 768 × 1024 and boundaries near 34/52/72rem. Freeze weathering clock and content for comparisons, use deterministic crops, wait for fonts/images, and capture both full pages and actual scrolled viewports. Pause motion for reference images; separately inspect live ignition/flicker. Approve intended material differences manually; do not broaden image-diff tolerance to hide missing inscriptions or broken masks.
