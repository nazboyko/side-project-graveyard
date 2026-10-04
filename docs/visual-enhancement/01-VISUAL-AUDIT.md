# Visual audit

Evidence: the nine rendered views in [the baseline](00-CURRENT-STATE.md). Labels below separate preservation from presentation improvements. No recommendation authorizes content, route, data or product changes.

The final R4/R5 checkout was also inspected at all nine combinations. Relics, five additional motif drawings, the static latest-published cat, homepage candle restoration and hero fog are now part of the preservation baseline. The new props improve storytelling but retain flat vector material. **KEEP** their data meaning, placement rules and local candle restoration; **IMPROVE** material integration/contact after the five-source prototype; **DO NOT TOUCH** their keys, query fields, chronology or storage semantics. Fog already exists: static atmospheric imagery is a proposed future refinement, not an additional simultaneous moving layer. No thirteen-relic regeneration is required.

## Identity and priorities

The identity is already clear: last light, pale stones on dark earth, warm brass for projects retired with honor, a dry keeper's voice, data-driven silhouettes, and an intimate candle ceremony. Fraunces and technical monospace create the intended physical-memorial → technical-record contrast. These are assets of the design.

The limiting factor is material credibility. The fence reads as repeated vector bars, plants as cut shapes, earth as a flat color and path, and stone faces as almost uniform panels. Shape variation is good; the repeated crack and moss patterns reveal the rendering system. Improve those surfaces and their contact with the ground before adding motion.

| Priority | Opportunity | Why it matters |
|---|---|---|
| 1 | Physical stone faces/edges | Most of the visitor's time is spent reading these objects |
| 2 | Grounding and terrain | Current elliptical patches make objects seem placed on a flat canvas |
| 3 | A coherent distant environment | Gate/hills establish place, but their geometric rendering limits atmosphere |
| 4 | Closer memorial and candle light | Makes the existing signature interaction memorable without new behavior |
| 5 | Editorial objects and page ending | Carries the same material language into register, autopsy and footer |

## Homepage

### Hero

**KEEP:** Centered HTML title, restrained italic amber tagline, computed count, quiet dusk and recognizable gate. At 1440/1280 the title owns a clean upper sky; at 390 it wraps naturally to two lines.

**IMPROVE:** Replace the flat distant landscape treatment with approved imagery: softened far trees, believable fence material, air between planes and a modest warm horizon. Preserve the upper text safe zone. Gate pillars/pickets must not become sharp objects behind the tagline. A dedicated mobile crop is valuable: the current crop retains the gate but loses most of the wider landscape.

**DO NOT TOUCH:** Wording, count, heading semantics, hero's position or add a call to action, search or submit flow. Do not enlarge the hero merely to display artwork. No swinging gate or title animation.

### Introduction / keeper's note

**KEEP:** Existing two paragraphs, readable sans type, muted-on-ground palette and visible heading. The quiet prose carries the humor more effectively than ornament.

**IMPROVE:** Give the surrounding ground a low-frequency material texture. Preserve a visually quiet region beneath all text. Introduce terrain only in outer gutters; do not wrap prose in a new physical card. Maintain the current desktop left column and mobile flow.

**DO NOT TOUCH:** Copy, Portable Text rendering, paragraph order, measure or relative placement to register/legend. Text stays static and immediately visible.

### Register / statistics

**KEEP:** Pinned parchment on a board, definition-list semantics, dotted leaders, tabular numbers and emphasized average. This already feels more like an artifact than a KPI grid.

**IMPROVE:** Subtle paper grain, a narrow imperfect edge and top-left pin/contact shadow, with no visible texture beneath small numerals. The panel is currently extremely smooth and its shadow looks like a generic card shadow. Keep texture lower in contrast than the leaders.

**DO NOT TOUCH:** Values, calculation, labels, two links, row sequence, current DOM or mobile order. Do not restore old statistics tiles or create a new metric.

### Filtering and navigation

**KEEP:** Carved board/list, visible counts and ordinary cause URLs; hover and keyboard preview through CSS dimming, focus protection and `aria-current`.

**IMPROVE:** Fine wood grain and a consistent edge bevel, without elaborate framing. At 390 the long rewrite cause wraps across several lines; preserve the breathing room around count and mark. Make the selected/focused state legible over the final wood material.

**DO NOT TOUCH:** Link targets, accessible labels, hit areas, current cause selection and count meaning. No dropdown, animated filtering/reordering or new JS filter state.

### Grave presentation

**KEEP:** Different silhouettes, lifespan scale, weathering classes, deterministic tilt, marker-plus-tag, brass retirement distinction, mausoleum scale, engraving and all HTML content. Whole-stone link remains keyboard reachable. These convey more story than a repeated rectangular card.

**IMPROVE:** Fine limestone pores, uneven edge bevels, small chips, damp lower edges and contact shadows extending gently toward lower-right. Replace conspicuous recurring crack/moss shapes with a small reusable raster material set and deterministic crops. Add a shallow side edge without perspective-transforming the text. Grass must interrupt the base, not the words.

At 1440 marker/tag fit beside each other; at 1280 some wrap vertically as the four-column cells narrow. Check the physical ground line after every material change. At 390 text, not an image ratio, must set the minimum stone height. Do not use one fixed bitmap rectangle for every lifespan.

**DO NOT TOUCH:** Project names, dates, epitaphs, status, cause, inscription, slug hashes, shape selection and existing link behavior. No per-project artwork mapping. No decorative foreground graves with readable/invented project names.

### Spacing and hierarchy

**KEEP:** Current section hierarchy, readable approach, uneven stone tops, bottom-aligned rows and mobile alternating offsets.

**IMPROVE:** Make existing gaps read as physical ground instead of empty dark UI space. Edge vegetation and contact patches can create rhythm within the same layout. The first grave is more than two mobile viewports down; do not increase this distance through new decorative bands. Use existing whitespace for atmosphere.

**DO NOT TOUCH:** Section order, chronological data order or use CSS ordering to curate more attractive graves. Dense grid packing exists despite the build-log description; record its visual order before touching layout. Any order correction belongs in a separately reviewed change.

### Background / environment

**KEEP:** Dusk palette, distant chapel/fence identity, path direction and dark ground.

**IMPROVE:** Four useful planes suffice: distant landscape/sky, near ground/path, HTML graves with local material/contact layers, sparse foreground terrain. Low static haze can be baked into the distant image. Current single-color ground and uniform ellipses have no scale or directional light. Taper ground detail with distance instead of blurring HTML.

**DO NOT TOUCH:** Build a new scene/story around the site. No heavy fog over names, ornamental gravestone walls, ghosts, moving characters or added content sections.

### Interactions

**KEEP:** Quiet grave response, normal link activation, CSS legend preview and visible focus.

**IMPROVE:** Replace the appearance of stones lifting off the ground with an edge/highlight response; retain a maximum 1–3 px input-feedback allowance only if grounding survives. Prefer a bounded opacity change over per-plot animated desaturation. Pointer depth is optional and limited to scenery; it should be cut if the static version already succeeds.

**DO NOT TOUCH:** No magnetic cursor, whole-stone tilt on pointer position, drag behavior, preview modal or motion required to see content.

### Footer / page ending

**KEEP:** Keeper's name, footer line, lantern and two links. The sign is the natural ending.

**IMPROVE:** Darken the existing ground seam gradually, with sparse side vegetation from the shared terrain asset. Improve contact beneath the board, and let its static lantern explain a very small warm patch. The current change to a darker full-width strip is abrupt and the board repeats ordinary rounded-panel styling.

**DO NOT TOUCH:** Add a farewell block, new navigation, newsletter, scenic epilogue or large animated background.

## Detail page

### Upper memorial area

**KEEP:** One centered stone, quieter horizon, back sign and ample empty ground. Everything.js reads as a large memorial; Kindness Chain reads as a cared-for retired project. Both show stone and candle controls within the mobile first viewport in the stable baseline.

**IMPROVE:** Use the homepage's material vocabulary at a closer scale, with a lower horizon crop, local ground detail and crisp stone edges. Reduce distant contrast relative to the stone. Avoid a second busy cemetery behind the memorial. The current stone is still a large smooth web surface with shallow symbolic plants.

**DO NOT TOUCH:** Memorial → candle → lifeline → autopsy → story order, back-link location/meaning, URL and shared Stone relationship. No full-screen cinematic intro.

### Status

**KEEP:** Brass plate for retired, board/green point for undead, no extra badge for buried. State remains explicit in text.

**IMPROVE:** Brass patina around edges and a believable mounting shadow. Keep the label's center flat. The undead green is a small existing signal, not permission for neon environmental lighting.

**DO NOT TOUCH:** Labels, status logic or replace text with color-only cues. No additional achievement badges.

### Title

**KEEP:** Single h1, Fraunces, centered name and brass treatment on plaques. Kindness Chain's two-line title is intentional and legible.

**IMPROVE:** Protect its blank stone/brass safe zone and retain dark ink. Keep cap/body texture scale consistent with the plot counterpart. A tiny engraving shadow is enough; deep embossed/glowing text would look digital.

**DO NOT TOUCH:** Bake the name into an image, use condensed type to force all titles onto one line, or change heading level.

### Dates and lifespan

**KEEP:** Real dates, duration, `<time>` markup and lifeline. The repeat between stone and lifeline belongs to the approved structure.

**IMPROVE:** Stable spacing on the final material; on 390 Kindness Chain dates wrap while Everything.js also uses two lines. Ensure intentional line breaks remain readable at zoom. The current detail custom-property wiring defaults the lifespan-driven height; evaluate applying the same computed presentation inputs in the shared Stone during the future continuity phase.

**DO NOT TOUCH:** Date calculations, labels, undead logic or remove the lifeline/repeated dates as an editorial redesign.

### Epitaph / inscription

**KEEP:** Full HTML epitaph, italic Fraunces, unaltered inscription and static visibility. This is the conceptual focal point after the name.

**IMPROVE:** Reserve a low-contrast-texture reading area; moss/cracks stay outside it. No photography should require reduced text opacity or a strong shadow to remain readable.

**DO NOT TOUCH:** Copy, punctuation, length, truncate on mobile or reveal only on hover.

### Candle

**KEEP:** Real button, exact local count, browser-only note, up to seven drawn candles, immediate status update and storage-failure behavior. The existing small flame and local warm feedback already suit the idea.

**IMPROVE:** Wax top/wick proportions, less perfect flame outline, a small asymmetric contact/reflection patch and restrained natural ignition. Current amber outline button is the most conventional UI element, but clarity matters: improve its surface, not its meaning. Seven lit candles must remain visually modest.

**DO NOT TOUCH:** Storage key or counting model, visitor/global count, sound, smoke/particles as default, celebratory feedback or delay the count until animation ends.

### Autopsy

**KEEP:** Documentary parchment, heading, definition list, row boundaries and conditional fields. The visual contrast with the stone is effective.

**IMPROVE:** Only tiny paper grain, pin shadows and a subdued board edge. Keep the ledger sharper and less atmospheric than the memorial. At 390 rows stack naturally; the long cause stamp still fits.

**DO NOT TOUCH:** Row/section order, labels or turn the ledger into cards/tabs. Fog, parallax and reveals do not belong here.

### Stack

**KEEP:** Technical labels in ink, color swatches and ordinary `/stack/` links; visually hidden 'Built with' makes Go's accessible label meaningful.

**IMPROVE:** Retain fine archival-tag edges and enough spacing for touch. Any material texture should stay behind the surrounding sheet, not individual chips. Audit target spacing rather than shrinking tags to suit imagery.

**DO NOT TOUCH:** Technology names/colors/references, destinations or replace labels with logos. React/Tailwind listed as grave content are not frontend dependencies to introduce.

### Last commit

**KEEP:** Literal commit message, system mono, quotation treatment, timestamp context and brass plate.

**IMPROVE:** Gentle metal grain outside the letters, local contact shadow and room for long messages. Kindness Chain's commit wraps across several mobile lines; reserve that height naturally.

**DO NOT TOUCH:** Invent a hash, terminal window, typewriter animation or change what the author actually wrote.

### Obituary

**KEEP:** Existing prose, drop cap, heading and 40rem measure. White-space rhythm is already strong.

**IMPROVE:** A quiet dark reading bed as the textured memorial ground transitions downward. Check the drop cap at font load/zoom; do not add photography between paragraphs.

**DO NOT TOUCH:** Portable Text structure, wording, paragraph order or add motion/imagery to make the narrative longer.

### Lessons / figures

**KEEP:** One stone lesson slab; conditional figures, including Kindness Chain's existing 21 links and $2.10. No figures for records that have none.

**IMPROVE:** Reuse stone material on the lesson slab at fine scale and a modest edge, without matching the memorial's monumental depth. Brass medallions need subtle patina rather than glowing rims.

**DO NOT TOUCH:** Lesson wording, values, labels, presence rules or add a new statistics grid.

### Previous / next and repository signs

**KEEP:** Neighbor order, names, `rel` attributes, silhouettes, normal back/repository links and mobile stacking.

**IMPROVE:** Use the same wood/edge/light language as the keeper sign; keep sign edges outside the focus outline. Neighbor silhouettes can remain simplified at their tiny size: realism here would add download cost without readability.

**DO NOT TOUCH:** Add random-grave/share controls, change URLs, fetch neighbor artwork by project name or animate signposts continuously.

### Transition from memorial to content

**KEEP:** Candle followed by lifeline, then the parchment autopsy. This already signals 'closer memorial, then technical evidence'.

**IMPROVE:** Fade detailed ground into a calm existing dark reading surface within the current spacing. No new interstitial. Keep the lifeline fully legible; scene overlays stop before the ledger.

**DO NOT TOUCH:** Move technical content into the hero or make scrolling an immersive camera sequence.

## Realism boundaries and rejected decoration

Realism helps at stone edges, soil contact, wood/paper surfaces, distant trees and local candle reflection. It hurts when it distorts text, makes controls resemble inert props, obscures the status/filters, or introduces full-perspective rows that contradict the DOM.

Preserve existing meaningful SVG until replacements are approved; do not add generic vector cemetery artwork as a substitute for missing realism. The fence/triangular trees, ellipse ground patches, repeated crack and near-identical flowers are candidates for material enhancement, not excuses for more iconography.

Static title/prose/ledger/navigation are mandatory. Reject continuous floating stones, animate-every-section entrances, particle fog, neon glows, glass cards, extra pills, bento grids, fake terminals, giant gradient text, perfect repeated texture crops and over-smoothed photoreal plastic. Expensive scene-wide blur/desaturation would erase both atmosphere and usability.
