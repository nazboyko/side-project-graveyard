# Image prompts for the photographic set

These are the prompts used to generate the five source images described in
`docs/visual-enhancement/03-VISUAL-ASSETS.md`. Every prompt starts with the same style line so the set shares one
place, one light and one material language. The tool, the number of candidates and the rejections are recorded in
`docs/BUILD_LOG.md` when the images are approved.

Rules for every image: no text, no lettering, no symbols, no logos, no people, no readable graves in the foreground,
no Halloween props, no moon spotlight, no lens flare. The humour and the words come from the site, never from a picture.

## Style line (put in front of every prompt)

```
A handmade physical cemetery miniature photographed at last light. Muted pale limestone, olive grass, dark
olive-brown soil. One large soft cool light from the upper left, a faint narrow warm band at the horizon.
Restrained photographic realism, matte surfaces, fine tactile detail, slight mist in the distance.
No text, no lettering, no symbols, no logos, no people, no skulls, no pumpkins, no bats, no ghosts,
no visible moon, no glowing eyes, no lens flare.
```

## A01 — wide environment (`web/src/assets/scene/environment-wide.png`, 2400 × 1200, 2:1, opaque)

```
Wide view across a small old European cemetery seen from just inside its boundary. Level camera, gently
elevated, 50–70 mm lens look, no wide-angle distortion. The upper 45 percent of the frame is quiet, smooth,
dark blue-grey dusk sky with nothing in it: no branches, no highlights, no clouds with detail. Horizon at
about 60 percent of the frame height. Lower third: a low iron fence with a modest double gate slightly left
of centre, matte worn iron, a few subdued shrubs beside the posts; behind it soft dark hills and a tree line;
a very small distant chapel at the far right; low static haze over the far ground. Foreground: plain dark
earth and short grass only, empty, no stones, no graves, no objects. Peaceful, slightly melancholic.
```

Reject if: anything sits in the upper sky, a tombstone is readable in the foreground, the gate is huge or
cathedral-like, the horizon glows brighter than the sky, there is a second focal point.

## A02 — mobile environment (`web/src/assets/scene/environment-mobile.png`, 1200 × 1400, 6:7, opaque)

```
The same cemetery and the same light as the wide view, reframed as a portrait image. The iron gate is
centred and takes about a third of the width; shrubs and trees stay in the outer 15 percent of the frame.
The upper 45 percent is quiet, smooth, dark dusk sky with nothing in it. Low horizon, soft distant trees and
hills, light mist. Foreground: plain dark earth and sparse short grass, no stones, no objects.
```

Reject if: a branch crosses the upper sky, the chapel crowds the gate, the frame is a tall establishing shot
with a tiny gate.

## A03 — limestone material (`web/src/assets/scene/limestone-tile.png`, 1024 × 1024, seamless, opaque)

```
Seamless tileable texture. Orthographic flat macro photograph of pale weathered limestone, chalky surface
with fine pores, tiny pits and faint mineral flecks. Even diffuse lighting, no cast shadows, no vignette,
no directional gradient. No cracks, no moss, no edges, no carved marks. Uniform pale warm grey, quiet enough
to print dark text on.
```

Reject if: marble veins, concrete aggregate, polished shine, one conspicuous crack or stain, a visible tile seam.
Use the tool's tile or seamless option if it has one; otherwise generate and let the build fix the seam.

## A04 — ground material (`web/src/assets/scene/ground-tile.png`, 1024 × 1024, seamless, opaque)

```
Seamless tileable texture. Top-down flat photograph of dark olive-brown cemetery soil with sparse fine gravel,
a few dry broken grass stems and tiny moss patches. Low contrast, even diffuse light, no cast shadows,
no objects, no path, no footprints, no leaves piled up. Slow tonal variation rather than busy grain.
```

Reject if: it reads as a lawn, asphalt, cracked desert, saturated green, or has one rock that repeats.

## A05 — terrain edge (`web/src/assets/scene/terrain-edge.png`, 1200 × 400, 3:1, transparent)

```
Cutout on a fully transparent background. Three small separate clumps of muted olive grass with a few dry
brown seed heads, a couple of tiny stones and a little moss at the base, seen almost from the front and
slightly from above. Clear gaps between the clumps, asymmetric, low and sparse. Soft cool light from the
upper left, matte, imperfect natural edges, no hard outline. Nothing else in the frame.
```

Reject if: flowers, a tombstone, a horizon, a white or black matte around the edges, a lush symmetrical bush.
If the tool cannot produce transparency, generate on a flat pure green background and the build keys it out.

## Practical notes

- Generate at the closest ratio the tool offers (2:1, 6:7, 1:1, 3:1) and the largest size; the build resizes.
- Make two or three candidates per image and keep the one with the cleanest edges and the quietest safe zone.
- Keep the same session or style reference for all five so the light does not change between images.
- Name the files exactly as above and put them in `web/src/assets/scene/`.
