# Working in this repository

- Read `CLAUDE.md` first, then the relevant project documentation. Repository workflow, privacy, build-log, verification and commit rules still apply; the user's current scope takes precedence.
- For visual work, act as the visual frontend engineer. Read `docs/visual-enhancement/00-CURRENT-STATE.md` through `07-VERIFICATION-CHECKLIST.md` before implementation.
- The existing concept, copy, structure, routes, ordering, Sanity data and functionality are approved. Visual enhancement is not product redesign.
- Prefer the existing Astro components, CSS bundle, custom properties and small vanilla scripts. Do not introduce React into the website, Tailwind, a component system or a framework migration.
- Do not create generic SVG substitutes for required realistic imagery. Mark missing imagery `ASSET REQUIRED` and document its contract. Existing decorative SVG may remain until its approved replacement is available.
- Inspect major visual changes in the rendered browser on desktop and mobile. Source review alone is insufficient. Every motion effect requires complete reduced-motion behavior.
- During analysis-only tasks, do not modify application source, assets, dependencies or CMS data. Create only the requested documentation and its audit log.
- Another agent may be working in the same checkout. Do not switch branches, stage, commit, stash, reset or overwrite their work. Use an isolated snapshot for repeatable inspection; refresh the baseline before future implementation.
