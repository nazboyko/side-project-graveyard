# Design brief — from a themed grid to a graveyard

The site works and scores well, but it does not look like a place. This brief is the plan for the redesign phase.
It was written after two outside design reviews (46 sections on the home page and 39 on the grave page, written by
another AI assistant from the live site and two mock-up images) were checked against the real code, the real dataset
and the challenge rules. Section 13 lists what was taken from them, what was changed, and what was left out.

## 1. What is wrong today

Seen in screenshots of the current build at 1440 px and 390 px:

- The page reads as a dark dashboard. The register is five KPI tiles, the causes are pill chips, the graves are
  eighteen identical rounded cards in an even grid.
- A two-day project and a four-year project have the same stone. Nothing about a grave shows how it died.
- There is no ground, no sky, no depth. A screenshot without its text would not say "graveyard".
- The candle, the one interaction, sits in a boxed panel with a yellow button like a form control.
- The copy is the strongest part and the design does nothing to carry it.

## 2. The rule that makes this a Sanity project

**The stone is computed from the record.** No per-project visual rule lives in the code. A grave looks the way it
does because of its dates, its status, its cause, and three small fields an editor fills in the Studio. A new grave
created in the Studio gets a complete monument on the next publish without a code change.

| What you see | Where it comes from |
|---|---|
| Height of the stone | `bornAt` → `diedAt`, on a log scale. A project that lived 0 days is the smallest stone in the yard. |
| Weathering: bare soil, grass, moss, cracks | Years since `diedAt`, measured at build time. |
| How the cause marks the plot | `cause.motif` (new field on the cause document). |
| Brass plaque and flowers, or broken ground | `status`: retired, or undead. |
| Silhouette | `monument.shape` if the editor set one, otherwise chosen from status, lifespan and a hash of the slug. |
| The object left at the grave | `monument.relic` (new, optional). |
| The small carving found only up close | `monument.inscription` (new, optional). |
| The mark at the top of the stone | `cause.icon`, which already exists (`9–5`, `^1.0`, `∞`, `v1`, `zzz`). |
| Tilt and small offsets | Hash of the slug. Deterministic, never random. |

The outside review proposed a `graveVisuals` map in a TypeScript file, keyed by project. That would put content in
code and break for every grave added later. It is replaced by the table above.

## 3. Art direction

**Last light.** A small graveyard a few minutes after sunset, built as a cut-paper diorama: flat layered silhouettes,
a little grain, one warm band on the horizon, pale stones catching what is left of the light. Candles are the only
bright thing. Not black, not neon, not Halloween. Funny by precision, never by cartoon.

Flat silhouettes are a deliberate limit. Every illustration is hand-written SVG, and hand-written SVG looks good as
simple layered shapes and bad as realistic drawing. No gradients inside objects except the sky and the stone face.

### Tokens (contrast already checked, see section 10)

```css
:root {
  --sky-top: #1d2636;   --sky-mid: #435061;   --sky-low: #c98f5a;
  --far: #2c3644;       --near: #161c19;
  --ground: #191f1a;    --ground-2: #222a21;  --soil: #4a3f33;
  --grass: #56653f;     --moss: #6f7d52;
  --stone-hi: #bdb9aa;  --stone: #aaa697;     --stone-aged: #9d9c8c;  --stone-ancient: #949585;
  --ink: #22231e;       --ink-soft: #2a2b25;            /* text carved in stone, brass, parchment */
  --text: #ece7da;      --muted: #b6b8a8;               /* text on ground and upper sky */
  --candle: #f0b24f;    --candle-hot: #ffe1a0;
  --brass: #b9975a;     --parchment: #d9d0b9;  --board: #2b261f;
  --undead: #9cc084;
}
```

Light text never sits on `--sky-low` or on stone. Dark ink never sits on ground or sky.

### Type

- Display: **Fraunces** (variable, weight axis only, roman and italic, latin subset), self-hosted through
  `@fontsource-variable/fraunces`. Used for the title, grave names, epitaphs and section headings.
- UI and metadata: the system sans stack already in use.
- Inscriptions and commit messages: the system mono stack already in use.
- Engraving: `text-shadow: 0 1px 0 rgb(255 255 255 / .22), 0 -1px 0 rgb(0 0 0 / .25)`. Never lower opacity to fake age.

## 4. Schema additions (branch 1)

### `cause.motif` — required string, radio list

| Value | Editor label | Drawn as |
|---|---|---|
| `overgrown` | Overgrown: weeds, a leaning stone, a fallen leaf | Tall weeds at the base, extra tilt, one leaf |
| `annexes` | Annexes: a second stone and an extra plaque bolted on | Smaller stone attached to one side, plaque screwed to the face edge |
| `signpost` | Signpost: an arrow in the ground, pointing somewhere newer | Small arrow sign beside the plot, pointing away |
| `briefcase` | Briefcase: left at the foot of the stone | Briefcase leaning on the base |
| `vines` | Vines: something wrapped around it and would not let go | Vine up one side with three small nodes |
| `laurel` | Laurel: a carved sprig and fresh flowers | Laurel carved above the name, flowers at the base, trimmed grass |
| `emptyPlot` | Empty plot: space on every side, one wilted flower | No grass tufts, wider empty ground, one bent flower |
| `layers` | Layers: older stones still showing underneath | Two older slabs behind the stone, offset left and right |

Validation message, in the keeper's voice: "Every cause leaves a mark on the stone. Pick one."

Values for the eight causes in the dataset:

| Cause | motif |
|---|---|
| Lost interest | `overgrown` |
| Scope creep | `annexes` |
| A better tool shipped | `signpost` |
| Got a real job | `briefcase` |
| Dependency hell | `vines` |
| Shipped v1, never looked back | `laurel` |
| Nobody came | `emptyPlot` |
| Rewrote it in a new framework and never finished | `layers` |

### `project.monument` — optional object, new field group "Monument"

| Field | Type | Rule | Editor description |
|---|---|---|---|
| `shape` | string, list | optional | "Leave empty and the keeper chooses from the dates." |
| `relic` | string, list | optional | "One object left at the grave." |
| `inscription` | string | optional, max 28 | "A small carving found only up close. Set in monospace. Example: v1 → v2 → v3" |
| `figures` | array of `{value, label}`, max 3 | optional; `value` max 12, `label` max 24 | "Two or three numbers worth carving. Example: 21 / links, $2.10 / pledged" |

`shape` values: `arch`, `shoulder`, `gothic`, `tablet`, `obelisk`, `broken`, `marker`, `plaque`, `mausoleum`.

`relic` values: `shovel`, `envelope`, `umbrella`, `key`, `coins`, `crates`, `puzzlePiece`, `guitarPick`, `notes`,
`serverLights`, `collarTag`, `cup`, `chainLink`.

Validation message for `inscription`: "The mason charges by the letter. 28 at most." For `figures`: "Three figures at most. A grave is not a dashboard."

`figures` for the dataset: Kindness Chain `21 / links`, `$2.10 / pledged` (both from its public README); Inkwell
`3 / posts`, `1,412 / dependencies`; Nine Tokens `9 / tokens tracked`, `7 / outlived`; Sunday Letter `1 / subscriber`,
`100% / open rate`; Attic `2 / notes`. Every other grave leaves it empty, and an empty field renders nothing.

### Values for the eighteen graves

Fictional graves get a relic and an inscription that restate the epitaph or the last commit. The five real graves
get a relic taken from the public description of the repository and **no inscription**: nothing is invented about them.

| Grave | relic | inscription | shape |
|---|---|---|---|
| Lantern CMS | `key` | `200 OK` | `obelisk` |
| Fretwork | `guitarPick` | `off by one` | |
| Night Porter | `serverLights` | `TODO: alerts` | |
| One More List | | `☐ finish ☐ finish ☐ finish` | |
| Everything.js | | `v0.0.9` | `mausoleum` |
| Inkwell | `crates` | `npm audit fix --force` | |
| Sunday Letter | `envelope` | `unsubscribe` | |
| Marginalia | | `v1 → v2 → v3` | |
| Umbrella | `umbrella` | `--json` | |
| Attic | `notes` | `organise notes` | |
| Quiet Tabs | `puzzlePiece` | `manifest v3` | `broken` |
| Nine Tokens | `coins` | `2 of 9` | |
| Pocket Ledger | | `wip` | |
| PDF Viewer SDK (real) | `shovel` | | |
| LinkedIn Radar (real) | | | |
| Still Warm (real) | `cup` | | |
| GOOD DOG (real) | `collarTag` | | |
| Kindness Chain (real) | `chainLink` | | |

### Delivery

- `studio/schemaTypes/cause.ts`, `studio/schemaTypes/project.ts`: the fields above.
- `studio/scripts/set-monuments.ts`: one transaction, idempotent, sets the values above. Run with
  `npx sanity exec scripts/set-monuments.ts --with-user-token`.
- `studio/seed/graveyard.ndjson`: same values, so a fresh import reproduces the dataset.
- `npx sanity deploy` so the hosted Studio shows the new fields.
- `web/src/lib/sanity.ts`: add `motif` to the cause projection and `monument{shape, relic, inscription, figures}` to
  the project projection; extend the interfaces.
- `web/src/lib/monument.ts` + `monument.test.ts`: one pure function, `describeMonument(project, now)`, returning
  `{layout, shape, life, weathering, motif, relic, inscription, tilt, dx, dy}`. `now` is injected so tests are stable.

Rules inside `describeMonument`:

- `life` = `log10(days + 1) / log10(1501)`, clamped to 0..1. Undead uses 0.55.
- `layout`: explicit `shape` wins. Otherwise retired → `plaque`; buried and lived under 7 days → `marker`;
  everything else → `stone` with a shape picked by slug hash from `arch`, `shoulder`, `gothic`, `tablet`.
- `weathering` from years since `diedAt`: under 1 → `fresh`; 1 to 4 → `settled`; 4 to 8 → `aged`; over 8 → `ancient`.
  Undead → `disturbed`.
- Unknown or missing values fall back to defaults. The site must build and look right with every new field empty.

With today's dataset this gives: 4 ancient, 6 aged, 2 settled, 5 fresh, 1 disturbed; 2 markers (PDF Viewer SDK,
One More List), 3 plaques, 1 mausoleum, 1 obelisk, 1 broken, 10 ordinary stones.

## 5. The scene (branch 2)

### Hero: the gate

A full-bleed band, `clamp(22rem, 52vh, 34rem)` tall. Sky gradient from `--sky-top` through `--sky-mid` to a narrow
`--sky-low` band at the horizon. One inline SVG (`viewBox="0 0 1600 500"`, `preserveAspectRatio="xMidYMax slice"`)
with three silhouette layers: far hills with a small chapel (`--far`), a tree line (`--near` at 70%), and an iron
fence with a double gate in the centre (`--near`). The title, the tagline and one count line sit in the upper sky:

```
Side Project Graveyard
Every repo deserves a proper burial.
18 graves. Enter quietly.
```

The count is computed. The existing intro copy moves below the gate. On other pages the header is a 7rem strip of
the same fence, so every page is inside the same place.

### Below the gate

Two columns from 52rem up, stacked below:

- **Keeper's note**: the intro from site settings, set as prose on the ground.
- **The register**: a parchment sheet pinned to a wooden board. Same `<dl>`, restyled with dotted leaders:

```
THE REGISTER
Graves ........................ 18
Buried ........................ 14
Retired with honour ............ 3
Undead ......................... 1
Average life ............ 355 days
Most common cause .. Lost interest
Shortest life ..... PDF Viewer SDK
```

- **The legend** (was the chip filter): a carved board titled "Cause of death". Each row is still a link to
  `/cause/<slug>/`: mark, title, dotted leader, count. `aria-current` marks the open page.
  Hovering or focusing a row dims the other graves, with no JavaScript:

```css
.yard:has([data-cause-link="scope-creep"]:is(:hover, :focus-visible)) .plot:not([data-cause="scope-creep"]) {
  opacity: .45; filter: saturate(.6);
}
```

  One rule per cause, generated at build time from the cause list. A plot that holds focus is never dimmed.

### The yard

- Content width grows to 76rem for this section. Grid of plots with `align-items: end`, so the bases in a row stand
  on one ground line and the tops are uneven. 4 columns from 72rem, 3 from 52rem, 2 from 34rem, 1 below.
- Each plot carries `--life`, `--tilt`, `--dx`, `--dy` as inline custom properties. Stone height is
  `calc(11rem + var(--life) * 11rem)`; the text sets the floor, the lifespan adds the rest.
- A decorative path (`aria-hidden` SVG, stretched behind the grid) runs from the gate through the yard in a loose
  S-curve. Under 34rem it becomes a narrow straight path and plots alternate 10% left and right of it.
- The mausoleum spans two columns from 34rem up. `emptyPlot` graves get twice the inline padding.
- Order stays as it is: oldest nearest the gate, the undead at the back.

### A plot, from the ground up

```
ground patch   soil mound (fresh, disturbed) or grass ellipse (others), plus a contact shadow
vegetation     grass tufts by weathering; weeds for `overgrown`; none for `emptyPlot`
motif          the cause's drawing (section 4)
stone          silhouette, grain, moss by weathering, engraved text
relic          one object at the base, 2.5–3rem
candles        this visitor's candles, if any (section 7)
```

Text on a stone, top to bottom: status label if not buried, cause mark (`cause.icon`, decorative), name (`h3`, the
link), years and "lived N days", epitaph, cause title in small engraved capitals, inscription in small monospace near
the base. All of it stays real HTML text. The whole stone is still the link target.

### Layouts

| Layout | For | Looks like |
|---|---|---|
| `stone` | most graves | Shapes `arch`, `shoulder`, `gothic`, `tablet`, `obelisk`, `broken`. Silhouette by `clip-path: polygon()` in percentages or a stretched SVG mask; shadow by `filter: drop-shadow()` on a wrapper. |
| `marker` | buried, lived under 7 days | A low stone, `calc(5rem + var(--life) * 8rem)` tall, with the name and "lived N days" only. The epitaph, the cause and the inscription are on a wooden stake tag beside it. |
| `plaque` | retired | A clean pale slab. The name is on a brass plate (`--brass`, ink text). Laurel above, flowers at the base, cut grass. It must read as honoured, not failed. |
| `mausoleum` | set by the editor | Pediment, two fluted columns, three steps, built from the same element with pseudo-elements. Text inside the opening. |

### Weathering

| Class | Stone | Ground | Extras |
|---|---|---|---|
| `fresh` | `--stone-hi`, sharp edges | bare soil mound | none |
| `settled` | `--stone` | short grass | none |
| `aged` | `--stone-aged`, stain at the base | grass, one moss patch on an edge | none |
| `ancient` | `--stone-ancient`, one hairline crack | long grass, moss on two edges | 1–2 px edge chips |
| `disturbed` | `--stone` | cracked soil, lifted on one side | a slow `--undead` status light |

Moss, stains and cracks stay on the edges and the base. Nothing goes under the text.

### Footer: the keeper's sign

A small wooden sign with a lantern: "Kept by Nazar", the footer line from site settings, and the two links.

## 6. Relics and motifs (branch 4; the `overgrown`, `laurel` and `layers` motifs already in branch 2)

- One `Relic.astro` and one `Motif.astro`, each a keyed map to inline SVG. Symbols are defined once per page and
  placed with `<use>`. `aria-hidden="true"`, `focusable="false"`.
- One drawing style for all of them: 48×48 viewBox, flat fills from the tokens, one 1.5 px `--ink` outline, at most
  three colours each. If a relic cannot be recognised at 3rem, redraw it simpler rather than adding detail.
- `coins` is nine coins, two standing and seven fallen. `serverLights` is four small lights, two of them lit
  `--undead`. `crates` is a pile taller than you would expect. Every other relic is a single object.
- An unknown key renders nothing. A Vitest test checks that every key in the list has a drawing.

## 7. The candle (branch 3)

It stays a real `<button>` with the same storage and the same honest note ("Candles are counted in this browser
only."). What changes is that it becomes a small ceremony at the foot of the stone, not a panel.

On the grave page:

```
0–120 ms     spark at the wick
120–320 ms   flame grows
320–600 ms   halo spreads; the lower face of the stone and the ground warm up
600 ms on    settled flame, slow flicker
```

- Each press adds a candle, up to seven drawn; the count line still says the real number.
- No toast, no confetti, no modal, no "thanks".
- With `prefers-reduced-motion: reduce` the state changes at once and nothing flickers.

On the home page (branch 4): a script of a few lines reads the same storage and, for graves where this visitor has
lit candles, shows up to three small lit candles at the base and the warm tint. Without JavaScript nothing is shown
and nothing is missing.

## 8. The grave page (branch 3)

On the home page the visitor walks through the yard. On a grave page they have stopped at one grave. The page
answers "what happened to this one?", and the first thing on it is the same stone they clicked, closer.

### One stone, two sizes

`Stone.astro` takes `size="plot"` (the yard) or `size="memorial"` (this page). Same markup, same
`describeMonument` output, same shape, weathering, motif, relic and inscription; the memorial size is larger
(up to 30rem tall, 70–85vw wide on a phone), carries the full epitaph, and has room for the relic at the base and
the candles in front. Nothing about the appearance is decided on this page. Acceptance: put the plot and the
memorial side by side and they are plainly the same object.

### Top of the page

- A sky band about 40vh tall: the same gradient as the home page, the far hills layer, and the fence without the
  gate, drawn from the same symbols. No path, no second yard. Quieter than the home page.
- Top left, on the sky: a small wooden signpost, "← Back to the graveyard". A plain link.
- Above the stone: the status marker. Retired: a brass plaque with ink text, "Retired with honour". Undead: a small
  `--undead` light with "Undead". Buried: no marker; the stone says enough.
- The stone, centred, standing on its ground patch with its vegetation and relic. Carved into it, top to bottom:
  cause mark (decorative), `h1` name, dates (`<time>` elements, as now), "lived N days" or "still twitching",
  epitaph, inscription near the base.
- The candle at the foot of the stone (section 7).
- Under the ground: the lifeline. One engraved rule with a dot at each end, the born date left, the died date right,
  the lifespan carved above the middle. Undead: the right end is open, no dot, the label reads "still twitching".
  Low contrast, no dashboard look. `Lifeline.astro`, pure, reused nowhere else for now.

### The ledger

"Autopsy" becomes a coroner's sheet: a parchment page pinned to a wooden board, dark ink, stamped capitals for the
labels, the same `<dl>` as now. Rows and their labels, in order:

| Row | Label | Treatment |
|---|---|---|
| cause | "Cause of death" (undead: "What keeps it down") | the cause mark and title, a link to `/cause/<slug>/`, as an inked stamp, not a pill |
| stack | "Stack recovered" | archival tags: a small square swatch in `tech.color`, the name in ink, each a link to `/stack/<slug>/` |
| last commit | "Last words" | a small brass plate, monospace, the commit message in quotes; below it in small capitals: "final commit · <diedAt>" (for the undead: "last seen · <bornAt year>–") |
| mood | "Mood at death" (undead: "Mood at last visit") | plain text |
| lines of code | "Lines of code" | plain text, tabular numerals |

Colour on the stack tags lives only in the swatch; the text stays ink on parchment, so contrast does not depend on
the colour an editor picked.

### Figures

When `monument.figures` has entries, two or three small brass medallions sit between the ledger and the obituary:
the value large in Fraunces, the label small in capitals. Nothing else. No grid, no icons. Absent on most graves.

### Obituary

Section title "Obituary", then the Portable Text as it is, on the ground, no box: measure 40rem, line-height
1.7, the first letter of the first paragraph a two-line drop cap in Fraunces. Nothing else changes.

### What it taught me

A low stone slab, wider than tall, with the lesson carved in Fraunces italic, ink on stone, a small rule above it.
It is the only other stone on the page.

### Visit the ruins

Only when `repoUrl` exists: a wooden direction sign pointing right, "Visit the ruins", with the hostname under it
in small capitals. The `<a>` is the whole sign. On hover or focus the arrow moves 2 px; nothing else moves.

### Neighbours

"Previous grave" and "Next grave" become two small signposts at the edges of the page, each with the neighbour's
name and, beside it, that neighbour's stone at 2.5rem height from the same `describeMonument` call (shape only, no
text). Same `rel="prev"` and `rel="next"` as now. On a phone they stack, previous above next.

### Order, top to bottom

sky and signpost · status marker · stone · candle · lifeline · ledger · figures (if any) · obituary · lesson ·
ruins (if any) · neighbours · keeper's sign.

### What is not on this page

Site-wide navigation, search, a "submit a grave" form, share buttons, per-project artwork files, metrics for
graves that have none, a second yard behind the stone.

## 9. Motion

| When | What | Limit |
|---|---|---|
| Always | flame flicker on lit candles; the undead status light, one pulse every 10 s | transform and opacity only |
| Hover or focus on a plot | `translateY(-3px)`, deeper contact shadow, 200 ms | only that plot |
| Press | the candle sequence | once per press |
| Optional | one fog band drifting across the hero, 90 s loop | cut first if time is short |
| Hover or focus on a sign | arrow moves 2 px, 200 ms | only that sign |

No scroll-driven animation, no parallax, no particles. Everything stops under `prefers-reduced-motion: reduce`.

## 10. Accessibility and performance: fixed, testable

Accessibility:

- Every text and background pair is at least 4.5:1. Checked pairs: ink on the four stone tones 8.1 / 6.5 / 5.7 / 5.2;
  ink-soft on the same 7.3 / 5.9 / 5.2 / 4.7; text on ground 13.6; muted on ground 8.3; text on upper sky 12.3;
  candle on ground 8.9; ink on brass 5.8; ink on parchment 10.3. A Vitest test reads the token file and asserts these.
- Focus ring is two-tone, 2 px `--ink` inside and 2 px `--candle` outside, because the candle colour alone is 1.3:1 on stone.
- Nothing is readable only on hover. Inscriptions are real text, at least 11 px.
- All scenery is `aria-hidden`. Heading order and DOM order do not change.
- `@media (forced-colors: active)`: stones get a real border, since clipped backgrounds disappear.
- Candle button and legend rows are at least 44 px tall.

Performance:

- Lighthouse mobile: performance at least 90, accessibility 100, CLS under 0.02, on the home page and one grave page.
- Fonts: two woff2 files, at most 130 KB together, `font-display: swap`, roman preloaded.
- Raster images only from the photographic set in section 15, within its budget. No canvas, WebGL, video or Lottie.
- JavaScript: the candle script only, under 2 KB. No framework runtime.
- Home page HTML under 120 KB uncompressed.

## 11. How to verify visual work

Design cannot be checked blind. After every meaningful change:

```
cd web && npm run build && npx astro preview &
npx playwright screenshot --channel chrome --full-page --viewport-size "1440,900" http://localhost:4321/ ../shots/home-1440.png
npx playwright screenshot --channel chrome --full-page --viewport-size "768,1024" http://localhost:4321/ ../shots/home-768.png
npx playwright screenshot --channel chrome --full-page --viewport-size "390,844"  http://localhost:4321/ ../shots/home-390.png
npx playwright screenshot --channel chrome --full-page --viewport-size "1440,900" http://localhost:4321/rip/everything-js/ ../shots/grave-1440.png
npx playwright screenshot --channel chrome --full-page --viewport-size "1440,900" http://localhost:4321/rip/kindness-chain/ ../shots/grave-retired-1440.png
npx playwright screenshot --channel chrome --full-page --viewport-size "390,844"  http://localhost:4321/rip/pdf-viewer-sdk/ ../shots/grave-390.png
```

Open the images and judge them against section 12. At least three look-and-fix rounds per branch. `shots/` is a
local folder and is not committed; the six final images go to `docs/screenshots/` for the README and the post.
If no browser can take a screenshot, stop and say so: this phase does not ship unseen.

## 12. Acceptance

1. With the text blurred, a screenshot of the home page still reads as a graveyard at dusk.
2. No two neighbouring graves have the same silhouette and height.
3. PDF Viewer SDK is plainly the smallest stone. Everything.js is plainly the largest thing in the yard.
4. The three retired graves look honoured: brass, laurel, flowers.
5. Pocket Ledger looks unsettled without any horror imagery.
6. At least eight graves can be told apart by relic or motif alone.
7. Lighting a candle on a grave page feels like a small event, and that grave is lit on the home page afterwards.
8. Hovering a row of the legend dims the other graves; keyboard focus does the same.
9. At 390 px there is no horizontal scroll, every stone is readable, and the path is still there.
10. Every number in section 10 holds.
11. Creating a new grave in the Studio with only the required fields produces a complete, good-looking plot and a
    complete grave page.
12. The stone on a grave page is recognisably the same object as its plot on the home page.
13. On a grave page the stone and the candle are the first thing in view; the ledger reads as a sheet, not a card
    grid; the last commit reads as last words.
14. Kindness Chain reads as honoured; PDF Viewer SDK's page is mostly empty ground around a very small stone;
    Everything.js fills its page. None of this comes from code that names those graves.

## 13. What was taken from the outside review

| Its proposal | Decision | Why |
|---|---|---|
| The site should be a place, not a grid of cards; depth layers; a path | **Kept** | This is the core problem. |
| Each grave tells its story: silhouette, object, small joke | **Kept, moved into the schema** | As fields and derived values (section 2), not a map in code. |
| Cause of death changes the grave | **Kept, moved into the schema** | `cause.motif`. The review covered seven causes; the dataset has eight. |
| Register as a physical object, causes as a legend with dimming | **Kept** | Dimming done with `:has()`, no JavaScript. |
| Candle as a ceremony; several candles drawn | **Kept, limited** | Counts are per browser. No "candles from visitors", no "+20". |
| Engraved type, two families at most | **Kept** | One web font plus system stacks. |
| Light overcast palette | **Changed to dusk** | The review's muted ink on its stone tones measures 1.9–2.8:1, and candles do not read on a light page. |
| Photoreal mock-up image | **Mood only** | It cannot be built in CSS and SVG, it contains graves, a search box and a "Submit a grave" link that do not exist, and one large raster would break the performance budget the same review sets. |
| Per-grave notes for seventeen projects | **Rewritten** | Several did not match the data (PDF Viewer SDK lived 0 days, not two weeks; one grave and one cause were missing). Real repositories get facts only. |
| React components, hydration, JSX config | **Dropped** | The site is static Astro with no framework runtime. |
| About forty separate SVG asset files | **Reduced** | Thirteen relics, eight motifs, a few plants, as inline symbols. |
| Gate that swings on scroll; leaves, dust and fireflies; crow; "developer archaeology"; datacenter silhouette | **Dropped** | Cost and noise for little story. One optional fog band remains. |
| Cemetery cat | **Optional, last** | If time allows: one small silhouette on a grave chosen from the latest `_updatedAt`, so it moves when the keeper publishes. |
| Text that becomes readable on hover | **Dropped** | Fails for keyboard and touch. |
| Mobile "walking path" | **Kept, simplified** | One column, alternating offsets, straight path. |
| Six test widths | **Reduced to three** | 390, 768, 1440, plus one grave page. |

The second review covered the grave page. What it adds, and what it does not:

| Its proposal | Decision | Why |
|---|---|---|
| Home = walking, grave page = stopping at one grave; the same stone in two sizes | **Kept** | Section 8. One component, one description, two sizes. |
| Memorial hero with a quieter version of the scene | **Kept** | Sky, hills and fence from the same symbols; no path, no second yard. |
| Candle as a scene object; last commit as "Last words"; autopsy as a coroner's sheet; stack as archival tags; lesson as a carved slab; "Visit the ruins" as a sign; neighbours as walking directions | **Kept** | Cheap, all in CSS, and each one makes a field read as part of the place. |
| Life timeline | **Kept, small** | One engraved rule. Works for the undead as an open end. |
| Story metrics (21 links, $2.10) | **Kept as a schema field** | `monument.figures`, optional, max 3, filled for five graves. Not a per-project special case. |
| Per-project asset files (`kindness-chain-laurel.svg`, chain borders, medallions) | **Dropped** | Everything comes from fields. The chain is the `chainLink` relic; the laurel comes with the `laurel` motif every retired grave shares. |
| `detailTheme: "warm-memorial"` in a config object | **Dropped** | Derived from `status`. |
| "3 visitors lit a candle" | **Dropped** | Counts are per browser; the wording stays honest. |
| Commit hash and date metadata | **Partly** | No hash exists in the data. The ledger shows "final commit · <diedAt>", which is the real last push for the five public repositories. |
| The mock-up's navigation bar, search box, "Submit a Grave", photoreal scene | **Mood only** | None of it exists, none of it is in scope. |
| Six test widths | **Reduced to three** | Same as the home page, plus two grave pages. |

## 14. Branches, gates, cut order

| Branch | Contents | Gate |
|---|---|---|
| `monument-schema` | Section 4, including `figures`. No visual change needed. | Merge when CI is green. |
| `cemetery-scene` | Tokens, font, hero, register, legend, yard layout, `Stone.astro` with layouts, shapes and weathering, the `overgrown`, `laurel` and `layers` motifs, footer, the fence strip on other pages. | Open the PR, list the screenshot files, **stop and wait for review**. |
| `memorial-page` | Sections 7 and 8: the grave page on the memorial-size stone, candle ceremony, lifeline, ledger, figures, lesson slab, signs, neighbours. | Open the PR, list the screenshot files, **stop and wait for review**. |
| `real-stones` | Section 15: the photographic set wired in — backdrop from Sanity, stone cutouts by shape, relic and overlay images, SVG fallbacks kept. Runs only once the files are in `web/src/assets/scene/`. | Open the PR, list the screenshot files, **stop and wait for review**. |
| `relics-and-polish` | Section 6 for whatever the photographic set does not cover; candles on the home page; new `og.png` from the hero; optional fog and cat. | Merge when CI is green; print the screenshot paths. |
| `post-refresh` | README screenshots, the redesign story in the build log, updated post draft. | Merge when CI is green. |

Hard stop for design work: **Sunday 4 October, 15:00 CDT**. Whatever is not merged by then is cut, in this order:
cat, fog, candles on the home page, new `og.png`, figures medallions, neighbour silhouettes, lifeline, relic images
beyond the first six, overlay images, motif drawings beyond `overgrown`, `laurel` and `layers`, mausoleum (falls back
to `obelisk`). The schema branch, the scene branch, the memorial branch, and the backdrop and stone cutouts of
`real-stones` are not cut.

## 15. The photographic set

The challenge allows generated imagery; it only asks that the build process be honest and that borrowed work be
credited. Hand-written SVG was a safety limit, not a rule. The keeper generates a set of images with an image model
and the site uses them **through the same record-driven rules**: the shape, status and cause still decide what is
shown; the images only replace how a shape, a relic or the ground is drawn. Every image has an SVG fallback, so a
missing file never breaks a page, and a new grave made in the Studio still gets a complete stone.

### Contract

| Image | File | Contains | Must not contain |
|---|---|---|---|
| Backdrop | uploaded to Sanity as `siteSettings.backdrop` (image with hotspot), not a file in the repo | an old cemetery at dusk seen from inside the gate: fence, distant chapel, mist, far rows of graves; the lower half plain dark grass so the yard can sit on it | text, readable graves in the foreground, people |
| Stone cutouts, one per `shape` | `web/src/assets/scene/stones/<shape>.png` for `arch`, `shoulder`, `gothic`, `tablet`, `obelisk`, `broken`, `marker`, `plaque`, `mausoleum` | a weathered pale limestone stone of that silhouette, blank face, light from the upper left, transparent background | any text, symbols, candles, flowers |
| Relics, one per value | `web/src/assets/scene/relics/<relic>.png` for the thirteen relic values | the single object, resting on the ground, same light, transparent background | text, logos |
| Overlays | `web/src/assets/scene/overlays/moss.png`, `soil.png`, `grass-1.png`, `grass-2.png`, `flowers.png`, `laurel.png`, `weeds.png` | one element each, transparent background | — |

Sizes: stones 1200 px tall, relics 400 px wide, overlays 600 px wide, backdrop at least 2400×1200. PNG with alpha
in the repo; Astro's `getImage` turns them into AVIF and WebP at build time, two widths each. Budget on the home
page: backdrop ≤ 350 KB, all stones together ≤ 500 KB, everything else ≤ 350 KB; Lighthouse performance stays ≥ 90.
Text on a stone is checked for 4.5:1 against the darkest 10 % of the face it sits on; if a cutout fails, a
translucent ink wash under the text block is added, never a lower-contrast colour.

### How they are used

- Backdrop: `getSettings` projects `backdrop{asset->{url, metadata{dimensions, lqip}}, hotspot, crop}`;
  `@sanity/image-url` builds a `<picture>` with `auto=format`, widths 1200/1600/2000/2400, LQIP as the placeholder,
  `fetchpriority="high"` on the home page. Without a backdrop the SVG hills layer stays. This is the one image that
  lives in the CMS, so the keeper can change the weather from the Studio.
- Stones: `Stone.astro` picks `stones/<shape>.png` from the same `describeMonument` output; the HTML text and the
  engraving shadow stay exactly as they are; weathering adds the moss and soil overlays by class. If the file for a
  shape is missing, the SVG silhouette renders.
- Relics and overlays: same rule, keyed by value, SVG fallback.
- Nothing per project. The five real graves and the thirteen invented ones use the same files.

### Disclosure

README credits: "Stone, relic and backdrop images were generated with <tool> from prompts written for this project;
prompts are in docs/image-prompts.md." The build log records the tool, the number of generations, and what was
rejected and why. `docs/image-prompts.md` is committed.

### Generation notes for the keeper

One style line in front of every prompt, so the set matches:
"photorealistic, old European cemetery, pale weathered limestone, late dusk, soft light from the upper left, muted
colours, slight mist, no text, no lettering, no symbols".

Then per image: "isolated cutout on a transparent background, front view, centred, full object visible" for stones,
relics and overlays; the shape words for stones are round-topped headstone / headstone with ogee shoulders /
pointed gothic-arch headstone / flat tablet with chamfered corners / tall narrow obelisk / headstone with one broken
jagged top corner / low half-height marker stone / clean pale slab with an empty brass plate / small mausoleum front
with two columns, a pediment, three steps and a blank stone panel between the columns. Generate two or three
candidates per image and keep the one with the cleanest edges; reject anything with lettering.
