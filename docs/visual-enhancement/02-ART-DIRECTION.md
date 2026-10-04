# Art direction

## Concept and emotional objective

A small handmade cemetery at last light, photographed as a restrained physical diorama, with readable HTML inscriptions and a documentary ledger beneath each memorial.

The visitor should feel a quiet recognition of their own abandoned projects, then affection rather than failure or horror. The environment is peaceful, slightly melancholic and tactile; the developer humor comes exclusively from existing copy and data. Premium means disciplined materials, light and spacing, not more effects.

Descriptive references: a museum miniature lit by a large soft window; weathered limestone in an overcast cemetery; a carefully photographed brass label and paper archive; editorial typography laid over a calm image safe zone. These are visual descriptions, not requests to imitate a named artist or copy another site.

## Realism level and camera

Use stylized realism: physically credible surfaces with simplified scene detail and modest scale. Objects should look hand-built, not glossy render-library assets. No human characters, fantasy architecture, Halloween props or overt miniature toys. Keep the existing distant chapel/fence vocabulary understated.

Environment viewpoint: a level, gently elevated view across a small yard, approximately a normal/short-telephoto lens impression (50–70 mm equivalent), without wide-angle distortion. Homepage grave faces remain nearly frontal because their text is HTML. Detail pages feel closer through crop and scale, not a different camera angle or full perspective transformation. Generated materials and object cutouts must share this viewpoint.

## Material system

| Material | Treatment | Protected region |
|---|---|---|
| Limestone | Fine pores, dull highlights, irregular bevel, occasional edge chip; no marble luxury | Central inscription surface remains flat, pale and quiet |
| Old stone | A little edge moss, hairline crack off-center, dampness near base; age follows existing class | Names, dates and epitaphs remain undamaged/readable |
| Brass | Muted warm ochre, faint patina at perimeter, soft highlight toward upper-left | Status/names/commit letters have stable dark ink |
| Earth | Dark olive-brown granular soil, sparse fine gravel and dry stems | Path and text areas never become busy noise |
| Grass/moss | Uneven clumps, muted olive, selective occlusion at foot of stone | No blades across inscription or controls |
| Paper | Warm archival stock, tiny fibers, modest edge irregularity | Small metadata remains on uniform parchment |
| Wood | Dark matte grain, a small worn bevel, narrow mounting/contact shadow | Navigation labels/focus have high contrast |
| Wax | Cream taper with a visible dark wick and uneven top; small warm flame | Button/status and scene geometry are unchanged |

No detail exists merely to fill a gap. Moss indicates weathering; flowers honor the retired; disturbed soil expresses undead; a warm patch requires a flame or lantern. Optional relic imagery may use existing `monument.relic` only; inventing narrative objects for named projects is prohibited.

## One lighting model

The primary source is a large, cool dusk sky from upper-left, approximately 35° above the object plane. Think diffuse twilight rather than a visible theatrical moon. Top/left bevels are slightly lighter; right/bottom faces recede. Contact shadows extend weakly toward lower-right and darken most at the foot of each object.

The existing narrow warm horizon is residual sunset, not an extra hard spotlight. It stays lower in brightness than inscriptions and must not sit behind light text. Distant fog picks up this subdued sky light. Stone pores should not contain highlights from an opposite direction.

Candle/lantern warmth is local amber: cream-hot wick center, soft small halo, reflected warmth limited to the lower stone and adjacent ground. One candle does not illuminate the whole page; seven do not multiply illumination sevenfold. A static light overlay with bounded opacity is sufficient. Existing undead green stays a tiny status point with no green light flooding nearby objects.

Lighting acceptance: compare horizon, stone bevel, brass, plants and cast shadows side by side. Reject any image with hard right-side sunlight, midday saturation, black studio rim light or arbitrary backlit glow.

## Atmosphere and minimal depth model

Use four spatial planes, plus an optional localized haze layer:

1. **Background:** sky, subdued hills/trees, existing fence/chapel, low static haze baked into one environment image. No readable content or prominent fake graves.
2. **Ground:** restrained soil/grass texture, existing path and low terrain detail. Ground remains a normal document-flow environment across the long page, not one stretched photograph.
3. **Midground objects:** current ordered HTML grave field, material skins, bevels, contact shadows and weathering. Interactive inscriptions remain sharp.
4. **Foreground:** a sparse transparent terrain-edge fragment at outer gutters and selected stone bases, below controls. One or two fragments per visible region, not a grass border around every panel.

Separate foreground mist, new distant rows and independent moving tree layers are unnecessary for the first pass. Baked haze delivers separation without additional downloads or animation. Only approved future fog may become an independent fifth plane; it remains behind HTML.

Use pre-rendered softness on far trees and mild edge softness on foreground fragments. Never apply depth-of-field blur to a stone name, filter, ledger or prose. Do not simulate a camera focus rack on hover.

## Gravestone strategy

Preserve all nine supported silhouettes and the existing minimum-height model. The smallest viable enhancement is one reusable limestone texture, current masks, restrained edge shading and a terrain fragment. This improves every new CMS grave without requiring a full cutout library.

Use deterministic texture offsets/orientation selected from existing slug hashes or shape/weathering attributes; cap variation so light never reverses. Do not randomly rotate a directional photographic texture. Retain height/class/cause semantics and existing static tilt. All names, dates, epitaphs, inscriptions and figure values remain HTML.

If the material prototype still reads as flat UI at memorial size, require shape-specific blank silhouette cap/edge assets as the optional second tier. A single fixed-height full-stone cutout is not an acceptable universal skin: stretching would distort pores, caps and steps. The future plan specifies separable cap/body/base treatment.

## Color and typography

Keep the existing dusk/olive/limestone/parchment/brass palette. Cool blue-gray is a natural sky color here, not a generic blue/purple gradient theme. Maintain the amber tagline and restrained candle color. Do not recolor technology data to match the scenery.

Fraunces stays the display/epitaph voice; system sans carries metadata/prose and system mono carries inscriptions/commits. No new font, giant headline treatment, image-rendered lettering or scripted inscriptions. Surface texture must yield to type. Maintain at least 4.5:1 for normal text against the actual final material, not just token colors; use 3:1 for non-text focus/control boundaries where applicable. Existing token tests are necessary but insufficient for image backgrounds.

Do not solve contrast failures by translucent text or stronger engraving shadows. Reduce material variation or add a local opaque/near-opaque pale reading bed within the existing surface. Retired brass retains an equally quiet center.

## Mobile composition

390 × 844 is an independent composition. Retain title wrapping, single-column flow, alternating graves, full epitaphs and documentary sections. Use a mobile environment asset/crop with the gate centered and side vegetation contained. Fewer planes, no pointer depth, no separate moving haze and a much smaller decorative transfer.

Do not download the desktop environment and then crop most of it away. Keep ground detail subtle at 1× and 2× density; do not chase 3× decorative fidelity. Sparse vegetation must not narrow the text-safe stone face. Large mausoleum and marker/tag are mandatory worst-case checks. At 200% zoom allow height growth instead of fixed-height crops.

## Detail continuity and ending

The detail page is the same material environment viewed closer. Reuse the environment with a lower/distant crop, shared texture at a sensible physical scale and a local terrain base. Do not require a separate per-project memorial image. The main stone should be unmistakably the selected homepage stone.

After the candle and lifeline, visual complexity tapers into the existing quiet ground behind the parchment ledger. Preserve its technical precision. Obituary and lesson remain static and sharp. The footer's existing darker ground can receive sparse edge vegetation and a small static lantern reflection; no new section is introduced.

## Anti-patterns and practical guardrails

The site would look AI-generated if it acquired unrelated mesh gradients, glowing card rims, glass surfaces, floating spheres, dust/firefly particles, generic code symbols, fake terminal panels, extra pills/badges, repetitive rounded cards, bento sections, gradient headlines or neon accents.

It would also look artificial if every stone had identical moss/cracks, all flower clusters were mirror-symmetric, all materials were unnaturally smooth, lighting came from several incompatible directions, grass wrapped every UI object, or scenery contained accidental gibberish text. Generated images with any lettering, logo, dynamic content, watermark, human figure or horror cue fail asset review.

SVG remains suitable for existing simple icons, semantic tiny silhouettes and masks. Missing realistic scenery is `ASSET REQUIRED`, not an opportunity to add another generic vector illustration. No React/Tailwind/WebGL/GSAP is necessary for this direction; the current Astro/CSS architecture can support it.

## Approved clarifications: visual anchor and first viewport

These additions refine the approved direction; they do not authorize generation or implementation.

**A01 is the visual anchor.** Visually approve the `environment-wide` candidate before generating A02–A05. All subsequent sources must use approved A01 as their visual reference and inherit its lighting direction, color temperature, realism level, material scale, atmospheric softness, camera impression and contrast level. Individual asset contracts still govern geometry, transparency and HTML safe zones; neutral material tiles should match A01's material language without baking incompatible scene shadows into a repeatable surface.

**The first viewport must contain one memorable composition.** The homepage hero must feel materially different from an ordinary styled web page in a static screenshot, before motion is enabled. Create that moment through composition, atmospheric depth, believable materials, cinematic light, foreground/background separation, scale and subtle photographic softness. Keep the existing HTML sharp and legible. More UI, decoration, text or excessive animation cannot substitute for this result.

The Phase 1 phrase about preserving composition protects the approved content hierarchy and layout; it does not freeze the decorative scene's visual composition. Art-direct the scenery within the existing hero and text safe zones. Review the first viewport at 1440 × 900, 1280 × 800 and 390 × 844; a full-page image alone cannot demonstrate this requirement.

After Phases 1 and 2 pass visual review, one restrained signature depth effect may be evaluated under the clarification in [the motion specification](04-MOTION-SPEC.md). Static artwork remains the primary visual experience.
