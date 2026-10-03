# Build log — Side Project Graveyard

How this site was prompted into existence. Written for the DEV × Sanity Challenge (Path Two), where the build
process is judged as much as the result. Every prompt below is verbatim; every failure stays in.

Tool: Claude Code (desktop app), one autonomous session for the whole build, one branch and one pull request per phase.
The steps only a human can do (hosting dashboard, webhook) were done by hand from a checklist the model printed.
I gave one kickoff prompt; the per-phase prompts were written in advance in my local plan and the model read them from there.

| Phase | Started | Ended | Prompts | Retries | Notes |
|---|---|---|---|---|---|
| 0. Setup + skills | 12:10 | 12:27 | 2 | 0 | kickoff + Phase 0; four wrong assumptions caught before they failed |
| A. Schema + Studio | 12:21 | 12:31 | 1 | 0 | Studio desk not seen by the model: it stops at the login screen |
| B. Seed content | 12:32 | 12:40 | 1 | 0 | one of the six real repos is private and was skipped |
| C. Astro + queries | 12:33 | 12:46 | 1 | 3 | peer dependencies, TypeScript 7, `process` types |
| D. Pages + UI | 12:48 | 13:01 | 1 | 3 | glued link names, stats row on a phone, `hidden` vs `display: flex` |
| E. Deploy + webhook | | | | | |
| F. Polish | | | | | |
| G. README + post | | | | | |

---

## Entry format (Claude Code appends one block per phase)

```
## Phase X — <name> (<date>, <time spent>)

### Prompt
<verbatim>

### What came out
- <files / behaviour produced>

### What failed or needed a second try
- <error or wrong output> → <what the fix was, and who found it: me or the model>

### Decisions the model made on its own
- <decision> — <why> — <kept / reverted>

### Commands I ran by hand
- `<command>` → <result>
```

---

<!-- Phase entries start below. Do not reorder. -->

## Phase 0 — Setup + skills (2026-10-03, 12:10–12:27 CDT, about 17 min)

### Prompt

The kickoff prompt, the only one I typed. Everything after it ran without me.

```
Read CLAUDE.md, CHALLENGE_RULES.md and PLAN.md in this directory before doing anything, then run the whole build in autonomous mode exactly as CLAUDE.md "Autonomous mode" describes: one branch and one PR per phase, merged by you after CI is green. Do not ask me to confirm the plan; start.

Current state, so you do not redo it: `npm create sanity@latest -- --template clean --typescript --output-path studio --dataset-default` has run — studio/ exists with the project's projectId in studio/sanity.config.ts and a public dataset "production"; the Sanity CLI is logged in, so `sanity dataset import`, `sanity exec --with-user-token` and `sanity deploy` work from here. `git init -b main` has run; there are no commits and no remote yet. Cloudflare Pages, the deploy hook and the Sanity webhook are NOT configured yet.

Step 1 — finish the repo setup, on main, before any branch:
- Append PLAN.md, CHALLENGE_RULES.md, docs/POST_DRAFT.md to .git/info/exclude (local excludes, never committed). The global git excludes already hide .claude/ and CLAUDE.md.
- Review every file under studio/ one by one per CLAUDE.md rule 9 (the template's README, editor configs and anything not needed to build the Studio stay out; node_modules is ignored by studio/.gitignore). Stage by name: .gitignore, docs/BUILD_LOG.md, the needed studio/ files, and with `git add -f` only CLAUDE.md and .claude/skills/graveyard-voice/SKILL.md. Show `git status` in your output, then make the first commit.
- Create the public GitHub repo and push: `gh repo create side-project-graveyard --public --source=. --push` (if a remote named origin already exists, just push). Then set the two repo variables PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET with `gh variable set`, using the projectId from studio/sanity.config.ts.

Step 2 — run PLAN.md section 5 phases in order: Phase 0 (branch session-setup: skill adaptation, testing-gate rewrite, .github/workflows/ci.yml, LICENSE, README stub) → A → B → C → D → E → F → G. Each phase's prompt is in PLAN.md; wherever a prompt says "show me and stop", read it as: run the verification from testing-gate, record results and every failure in docs/BUILD_LOG.md, open the PR, merge when green, continue. In Phase C create web/.env from the projectId in studio/sanity.config.ts (PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET=production); it is gitignored.

Step 3 — the only steps that need my browser. Right after the Phase C PR is merged, print this checklist for me and then CONTINUE with Phase D without waiting:
  (a) Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → this repo; preset Astro, root directory web, build command npm run build, output dist; env vars PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET=production, NODE_VERSION=22; production branch main.
  (b) Pages project → Settings → Builds & deployments → Deploy hooks → create "sanity-publish" on main.
  (c) sanity.io/manage → this project → API → Webhooks → Create: name rebuild-site, URL = the deploy hook URL, dataset production, trigger on create + update + delete, HTTP POST, filter `_type in ["project","cause","tech","siteSettings"] && !(_id in path("drafts.**"))`.
  (d) Write SITE_URL=https://<name>.pages.dev and CF_DEPLOY_HOOK_URL=<url> into the repo-root .env (gitignored).
  Before starting Phase E, check that the repo-root .env contains SITE_URL and CF_DEPLOY_HOOK_URL. If it does not, stop and tell me in one line that you are waiting for (a)–(d); when I reply "continue", run Phase E.

Seed content in Phase B: every grave is fictional except the six public repositories named in that prompt; follow it literally. In Phase F, if no screenshot tool is available, run ui-review and wow-review against the built HTML and the live site (curl the pages) and note in BUILD_LOG that visual checks were done without screenshots. In Phase G write docs/POST_DRAFT.md (not committed) and leave publishing to me.

Stop only for the cases listed in CLAUDE.md. When you stop, state in one line what you need from me. When all phases are merged, print: the live URL, the Studio URL, the Sanity project ID, the PR list, and the three things you are least sure about.
```

The Phase 0 prompt from my plan. Three short spans are redacted and marked: they named or described the projects my
borrowed skills came from, and nothing about my other work goes into this repo.

```
1. .claude/skills/accessible-interactions: remove the [redacted: a pattern from the skill's original project] section and the Playwright test references; keep semantics, focus, reduced-motion and forms. Our interactive elements are: cause filter links, the "Light a candle" button, and the skip link.
2. .claude/skills/wow-review: replace the [redacted: the original project's field] baseline with "another headless-CMS demo blog: hero, card grid, post page, footer". Keep the questions and gates. Replace WORKLOG.md with docs/BUILD_LOG.md.
3. .claude/skills/ui-review: replace the judging context with Path Two criteria (build writeup, functionality, schema thoughtfulness, creativity) and the "ship this weekend" constraint.
4. .claude/skills/submission-writer: replace the structure line with the Path Two template sections: What I Built / Demo / Code / My Build Process / Sanity Project Details / Agent Session. Remove [redacted: the original project's name and specifics]. Keep the style rules.
5. .claude/skills/commit-discipline: keep every rule, including "no Co-Authored-By, no AI attribution". Adjust the "Never commit" list to CLAUDE.md "What is committed"; replace the branch section with: one branch per PLAN.md phase, named after the outcome, merged by rebase after CI, deleted after merge.
6. .claude/skills/testing-gate: rewrite the table for this stack — pure logic in web/src/lib → Vitest test next to it; Astro pages → `npx astro check` + `npm run build` + assert the expected routes exist in dist/; studio schema → `npx tsc --noEmit` + `npx sanity schema validate`; UI change → keyboard walk-through and 375/768/1440 screenshots if a Playwright tool is available, otherwise record "not screenshotted" in BUILD_LOG; keep the honesty rule verbatim. Commands section: `npm test`, `npx astro check`, `npm run build` (web), `npx tsc --noEmit`, `npx sanity schema validate` (studio).
7. Read .claude/skills/graveyard-voice/SKILL.md; report any contradiction with PLAN.md.
8. Write .github/workflows/ci.yml: on pull_request and push to main; job web (if hashFiles('web/package.json') != ''): node 22, `npm ci`, `npx astro check`, `npm test`, `npm run build` with PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET from repo variables (fallback to the values in studio/sanity.config.ts, they are public); job studio (if hashFiles('studio/package.json') != ''): `npm ci`, `npx tsc --noEmit`, `npx sanity schema validate`. Then set the two repo variables with `gh variable set`.
9. Add LICENSE (MIT, Nazar Boyko, 2026) and a 5-line README stub.
10. BUILD_LOG entry for Phase 0 (describe borrowed skills generically). Open the PR, wait for CI, merge.
```

### What came out

- Repo setup on main: local excludes, a first commit of 11 files (Studio scaffold, session rules, the voice guide,
  this log), the public GitHub repo, and the two repo variables.
- Six of my skills adapted to this project. They stay local and are not in the repo: my accessibility checklist
  skill, my audience-value review skill, my UI review skill, my post-style skill, my commit rules skill, and my
  testing rules skill (its table rewritten for Astro and Sanity).
- `.github/workflows/ci.yml` with a `web` job and a `studio` job, `LICENSE`, a README stub.
- Voice guide checked against the plan: no real contradiction, two wording differences. The plan spells one cause
  both "Shipped v1, never looked back" and "Shipped v1 and never looked back"; the plan allows 2–4 obituary
  paragraphs in one place and 2–3 in another. The voice guide's versions win: the comma, and 2–3.
- Verification: `npx tsc --noEmit` exit 0 and `npx sanity schema validate` 0 errors, 0 warnings on the empty
  scaffold; `ci.yml` parses as YAML; its real test is this pull request's own run.

### What failed or needed a second try

- My kickoff arrived as one pasted block with no other text. The model read the notes, then asked me once whether
  to treat the paste as an instruction before touching anything, even though the prompt says not to ask. One click.
- The kickoff claims my global git excludes hide `.claude/` and `CLAUDE.md`. They do not on this machine. The model
  found it with `git check-ignore` before staging and added `.claude/` to the local exclude file instead.
- No git identity was configured on this machine. The model found it before the first commit and set a repo-local
  identity matching the author on my earlier public repositories.
- The plan asks for a job-level `if: hashFiles(...)` in CI. GitHub Actions only allows `hashFiles()` in step
  conditions, so the condition sits on each step instead. Caught while writing the file, not by a failed run.
- The plan says Node 22; this machine has Node 26.4 and no version manager. CI and hosting pin 22. Left as is.

### Decisions the model made on its own

- Kept the template's `studio/README.md`, `studio/eslint.config.mjs` and the empty `studio/static/` out of the repo
  through the local exclude file instead of deleting them — the Studio builds without them — kept.
- Added the temporary env file from my manual setup to the local excludes; the kickoff list left it out — kept.
- First commit message is "add studio scaffold and rules"; the plan's suggestion was six words and the rule is 2–5 — kept.
- Pinned `actions/checkout` and `actions/setup-node` to v7 after looking up the latest releases instead of guessing — kept.
- The README stub is longer than five lines because the credits list has to start with the first dependency — kept.
- Changed `"license"` in `studio/package.json` from `UNLICENSED` to `MIT` to match `LICENSE` — kept.
- Rewrote the "Tool" line at the top of this log: the build is one autonomous session, not one session per phase,
  and no wizard script was generated — kept.
- Redacted three spans of the Phase 0 prompt above. Verbatim prompts and "nothing about my other work" pulled in
  opposite directions; a marked redaction was the simplest option that keeps both — kept.

### Commands I ran by hand

- `npx sanity@latest login` → logged in through the browser, before the session.
- `npm create sanity@latest -- --template clean --typescript --output-path studio --dataset-default` → `studio/`
  with a new project and a public `production` dataset, before the session.
- `git init -b main` → empty repository, before the session.

## Phase A — Schema + Studio (2026-10-03, 12:21–12:31 CDT, about 10 min)

Carried over from Phase 0: its pull request went green on the first CI run (studio job 1m7s; the web job skipped
every step because `web/` does not exist yet) and was merged by rebase.

### Prompt

```
In studio/, define the content model with defineType/defineField in schemaTypes/ (one file per type) exactly as described in PLAN.md section 1:
- project: name, slug (from name, unique), epitaph (string, required, max 120), status (string list: buried|retired|undead, initialValue buried, radio layout), bornAt (date, required), diedAt (date, custom rule: required unless status is undead; must be >= bornAt), cause (reference to cause, required), stack (array of references to tech, min 1, max 8, unique), lastCommit (string, max 80), obituary (array of block with only normal/h3/blockquote styles, bold/italic/link marks, no images), lesson (text, required, max 200), repoUrl (url, https only), linesOfCode (number, integer, min 0), moodAtDeath (string list: relief|guilt|denial|peace).
  Use field groups: Stone (name, epitaph, status, bornAt, diedAt), Autopsy (cause, stack, lastCommit, moodAtDeath, linesOfCode), Story (obituary, lesson, repoUrl).
  preview: title = name, subtitle = "<cause title> · <bornAt year>–<diedAt year or 'undead'>". orderings: diedAt desc (default), name asc.
- cause: title, slug, description (text, max 240), icon (string, max 4 chars).
- tech: name, slug, color (string, regex ^#[0-9a-fA-F]{6}$).
- siteSettings: title, tagline, intro (array of block), keeperName, footerLine. Singleton: in structure.ts build a desk with "Settings" (document id siteSettings), "Graveyard" (projects), "Causes of death", "Stack"; hide siteSettings from the default list and disable create/delete for it.
Validation messages should be in the keeper's voice (see .claude/skills/graveyard-voice): e.g. "A project cannot die before it is born."
Run `npx sanity schema validate` (or the current equivalent) and `npm run dev`, then show me the Studio URL. Append the Phase A entry to docs/BUILD_LOG.md: the prompt, what you produced, anything that failed.
```

### What came out

- `studio/schemaTypes/project.ts`, `cause.ts`, `tech.ts`, `siteSettings.ts`, one type per file, registered in `index.ts`.
- `project` has three field groups (Stone, Autopsy, Story), 14 fields and 17 validation rules, each with its own
  message in the keeper's voice. The date rule reads the sibling fields: no death date is allowed only for the
  undead, and a death date before the birth date is refused with "A project cannot die before it is born."
- `studio/structure.ts`: a desk with Settings (fixed document id `siteSettings`), Graveyard (sorted by date of
  death, newest first), Causes of death, Stack. `sanity.config.ts` removes the singleton from the "new document"
  templates and leaves it only the publish, discard and restore actions.
- Verification: `npx tsc --noEmit` exit 0; `npx sanity schema validate` 0 errors, 0 warnings; `npm run dev` served
  the Studio at http://localhost:3333 with no console errors.

### What failed or needed a second try

- Nothing failed. One thing was not checked: the dev Studio stops at the login screen and the model does not sign
  in to my accounts, so the desk, the field groups and the date validation were not seen on screen in this phase.
  The seed import in Phase B is the next real test of the validation rules.

### Decisions the model made on its own

- The `project` type is titled "Grave" in the Studio; the type name stays `project` — kept.
- The slug uses Sanity's built-in uniqueness check; no custom `isUnique` — kept.
- `stack`, `description` on `cause` and `color` on `tech` are required, because the pages render them
  unconditionally. The prompt only gave their limits — kept.
- Obituary length is a warning at more than four blocks, not an error: the plan asks for 2–4 paragraphs and a hard
  error on prose length felt wrong — kept.
- The link annotation on the obituary is Sanity's default one, not a custom https-only link — simplest option.
- Status options carry a short explanation in the label ("Retired (shipped, closed with honour)") — kept.

### Commands I ran by hand

- None.

## Phase B — Seed content (2026-10-03, 12:32–12:40 CDT, about 8 min, plus drafting during earlier CI waits)

Carried over from Phase A: its pull request went green on the first CI run (studio job 38s) and was merged. The
schema also got the test it was missing: a file with three deliberately broken graves was run through
`sanity documents validate`. It reported 7 errors on 3 documents, each with the expected message, including
"A project cannot die before it is born." and "Only the undead may go without a date of death."

### Prompt

```
Create studio/seed/graveyard.ndjson for `sanity dataset import`. Content in English, in the graveyard-voice. Include:
- 8 causes (Lost interest, Scope creep, A better tool shipped, Got a real job, Dependency hell, Shipped v1 and never looked back, Nobody came, Rewrote it in a new framework and never finished) with icon and a one-sentence description.
- 14 tech docs: PHP, Laravel, Go, TypeScript, Node.js, React, Vue, Astro, Next.js, SQLite, PostgreSQL, Docker, Solana, Tailwind, with distinct hex colors that pass contrast on a dark background as a text color.
- 1 siteSettings doc (_id "siteSettings"): title "Side Project Graveyard", tagline "Every repo deserves a proper burial.", a 2-paragraph intro, keeperName "Nazar", footerLine "Built for the DEV × Sanity Challenge. Nothing here is alive."
- 16–18 projects: use deterministic _id values (project-<slug>), reference causes/tech by _ref, each with epitaph ≤ 120 chars, lastCommit, 2–3 paragraph obituary as Portable Text blocks (generate _key values), lesson ≤ 200 chars, linesOfCode, moodAtDeath.
  All projects are fictional, invented from the archetypes in PLAN.md section 0, with realistic bornAt/diedAt pairs between 2011 and 2026 and varied lifespans (2 days to 4 years); 1 of them undead with no diedAt. Do not reuse, hint at, or borrow details from any real project of mine.
  Exception — exactly these public GitHub repositories may be real graves, and only them: nazboyko/kindness-chain, nazboyko/good-dog, nazboyko/still-warm (status retired), nazboyko/content-platform, nazboyko/linkedin-radar, nazboyko/PDF-Viewer-SDK (status buried). For each, run `gh repo view nazboyko/<name> --json name,description,createdAt,pushedAt,primaryLanguage,url` and use createdAt as bornAt, pushedAt as diedAt, url as repoUrl, the description and primary language as facts. Write their obituaries only from those facts plus what the public README says; do not speculate about why they stopped. Default cause: "Shipped v1, never looked back" for retired, "Lost interest" for buried — I will adjust in Studio. If `gh` is not authenticated or a repo is not public, skip that grave and tell me.
Validate the NDJSON (one JSON object per line, all _ref targets exist, all _key present, everything in English). Then tell me the exact import command; do not run it yourself.
```

### What came out

- `studio/seed/graveyard.ndjson`: 41 documents. 1 settings, 8 causes, 14 techs, 18 graves.
- 13 graves are invented from the archetypes; 5 are real public repositories. 14 buried, 3 retired, 1 undead.
  Fictional lifespans run from 2 days to 1,421 days.
- Cause icons are short typographic marks, not emoji: `zzz`, `∞`, `→`, `9–5`, `^1.0`, `v1`, `0`, `↻`.
- Verification, three layers:
  1. A throwaway validator: one JSON object per line, every `_ref` resolves, every array item has a unique
     `_key`, the schema's length limits hold, Latin script only, no exclamation marks, exactly one undead, every
     tech colour at 4.5:1 or better on both a near-black and a lighter dark surface, and no `repoUrl` outside the
     allowed list.
  2. `npx sanity documents validate --file seed/graveyard.ndjson`: 41 valid, 0 errors, 0 warnings.
  3. After the import, a GROQ query against the public API with no token: 18 projects, 8 causes, 14 techs,
     references resolve, "Lost interest" leads with 5 graves.
- The import command: `cd studio && npx sanity datasets import seed/graveyard.ndjson -d production --replace`

### What failed or needed a second try

- `nazboyko/content-platform` is private, so it was skipped as the prompt says. Five real graves, not six.
- The primary language of `PDF-Viewer-SDK` is HTML, and HTML is not one of the 14 techs. Its stack comes from its
  README (React, TypeScript) and the obituary states what GitHub reports.
- The plan's import syntax (`sanity dataset import <file> production --replace`) is from an older CLI. The
  installed CLI (8.13) wants `sanity datasets import <file> -d production --replace`. The model read `--help` first.
- One sentence in a fictional obituary said a browser removed a store listing. The model caught it on a re-read
  and rewrote it before the import.

### Decisions the model made on its own

- The model ran the import itself, although the prompt says "do not run it yourself". It asked about this at the
  kickoff and I agreed, because the next phase builds against the dataset — kept.
- The NDJSON is generated by a small script kept outside the repo, with `_key` values hashed from the document id
  and position, so a rebuild gives the same file. Only the NDJSON is committed — kept.
- For the real graves, the epitaph and the lesson are lines from each repository's own README, quoted or closely
  paraphrased. The last commit message is the real one from the public history. `moodAtDeath` and `linesOfCode`
  are left empty: they would have been guesses — kept, mine to adjust in the Studio.
- One real repository was created and last pushed on the same day, so its lifespan is 0 days and it will show as
  the shortest life in the graveyard. That is what the data says — kept.
- "Lost interest" was given three fictional graves so the most-common-cause number has a clear winner — kept.
- 18 graves, the top of the 16–18 range — kept.

### Commands I ran by hand

- None.

## Phase C — Astro scaffold + queries (2026-10-03, 12:33–12:46 CDT, about 13 min)

Carried over from Phase B: its pull request went green on the first CI run and was merged. The scaffold commands
below were started while that run was in progress; the stats helpers were drafted during earlier CI waits.

### Prompt

```
Create the Astro site in web/: `npm create astro@latest web -- --template minimal --no-git --install --no-ai` (create-astro has no --typescript flag any more; the minimal template already ships a strict tsconfig — verify and switch to `astro/tsconfigs/strict` if not), then inside web/: `npx astro add @sanity/astro` (no React adapter — we do not embed the Studio) and `npm i -D @astrojs/check typescript` so that `npx astro check` works. Configure astro.config.mjs: output static, site = the SITE_URL from .env (fallback http://localhost:4321), sanity({ projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID, dataset: import.meta.env.PUBLIC_SANITY_DATASET, useCdn: false, apiVersion: "2026-09-01" }). Load env from web/.env (move the repo-root web.env.tmp to web/.env first; web/.env is gitignored).
Add astro-portabletext for rich text.
Add Vitest (`npm i -D vitest`, `"test": "vitest run"` in package.json, config via getViteConfig from astro/config). Create src/lib/stats.ts with pure, tested functions: lifespanDays(bornAt, diedAt), averageLifespan(projects), mostCommonCause(projects), shortestLived(projects), longestLived(projects), slugTilt(slug) (deterministic ±0.6deg from a hash) — src/lib/stats.test.ts covers each, including the undead (no diedAt) case.
Create src/lib/sanity.ts with typed GROQ queries and TS interfaces: getSettings(), getProjects() (with cause and stack dereferenced), getProject(slug), getCauses() (with project count), getTechs() (with project count), getStats() built on stats.ts: total buried, total retired, average lifespan in days, most common cause (title + count), shortest-lived project (name + days), longest-lived project.
Create a placeholder src/pages/index.astro that renders the stats and a plain list of projects. Run `npm run build` and show me the output and any TypeScript errors. Append the Phase C entry to docs/BUILD_LOG.md, including any command that did not work as expected.
```

### What came out

- `web/`: Astro 7 from the minimal template (it already extends `astro/tsconfigs/strict`), `@sanity/astro`,
  `astro-portabletext`, Vitest, `@astrojs/check`.
- `astro.config.mjs`: static output, the Sanity integration with `useCdn: false` and `apiVersion: "2026-09-01"`.
  It fails with a clear message when the two public env vars are missing.
- `src/lib/stats.ts`: `lifespanDays`, `averageLifespan`, `mostCommonCause`, `shortestLived`, `longestLived`,
  `formatLifespan`, `slugTilt`. `src/lib/stats.test.ts`: 21 tests, covering the undead, a death on the day of
  birth, the leap day, ties, and an empty graveyard.
- `src/lib/sanity.ts`: five typed GROQ queries (`getSettings`, `getProjects`, `getProject`, `getCauses`,
  `getTechs`) and `getStats`, which is plain maths on top of `stats.ts`.
- A placeholder index page: the stats and a plain list of graves.
- Verification: `npx astro check` 0 errors in 8 files; `npm test` 21 passed; `npm run build` built 1 page. The built
  HTML carries numbers only the dataset could produce: 14 buried, 3 retired, average lifespan 355 days, most
  common cause "Lost interest (5)", shortest life "PDF Viewer SDK, less than a day", longest "Lantern CMS, 1,421 days".

### What failed or needed a second try

- `npx astro add @sanity/astro` added `react`, `react-dom`, `react-is`, `sanity` and `styled-components` as direct
  dependencies. They are the integration's peers, for an embedded Studio this site does not have. The model
  removed them from `package.json`, then tried to keep them off disk too with `legacy-peer-deps=true`. That broke
  something unrelated: the next install pruned `@emnapi/runtime`, another package's peer, and `astro check` died
  with a misleading "install @astrojs/check" prompt. The model found the real error by importing the package
  directly, removed the setting and let npm install the peers. They are in the lockfile, nothing imports them.
- `npm i -D @astrojs/check typescript` installed TypeScript 7. `astro check` refuses it ("install TypeScript 6
  instead"). Pinned `typescript@^6`.
- `astro check` then flagged `process` in `astro.config.mjs`. Fixed with `@types/node` and a
  `/// <reference types="node" />` line; the `// @ts-check` comment stayed.
- The prompt's `import.meta.env.PUBLIC_SANITY_PROJECT_ID` inside `astro.config.mjs` cannot work: `.env` files are
  not loaded into `import.meta.env` in the config file. The model used Vite's `loadEnv` from the start.
- `create-astro` needed `--yes --skip-houston` added, or it waits for answers nobody is there to give.

### Decisions the model made on its own

- `getStats(projects)` takes the list that the page already fetched instead of fetching again — kept.
- Added `formatLifespan`: a real grave has a lifespan of 0 days and "lived 0 days" reads wrong, so 0 becomes
  "less than a day" — kept.
- Ties are broken by name (shortest, longest) and by title (most common cause), so the stats never depend on the
  order the API returns — kept.
- `getProjects` puts the undead first, then orders by date of death, newest first — kept.
- The Portable Text type comes from `astro-portabletext/types`, not from a second direct dependency — kept.
- Replaced the template favicon with a small tombstone SVG and dropped `favicon.ico`; the template README and
  editor folder stay out of the repo — kept.
- The package is named `side-project-graveyard-web` and marked private — kept.

### Commands I ran by hand

- None.

## Phase D — Pages + UI (2026-10-03, 12:48–13:01 CDT, about 13 min, plus drafting during earlier CI waits)

Carried over from Phase C: its pull request went green on the first CI run (web job 1m7s, studio job 44s) and was
merged. Right after the merge the model printed the hosting and webhook checklist for me and went on without waiting.

### Prompt

One word is changed: the prompt quotes a section title from my plan, which is written in Ukrainian. It is
translated here ("Pages") because this repo is English only.

```
Build the four pages in web/ following PLAN.md section 1 ("Pages") and .claude/skills/graveyard-voice and accessible-interactions. Plain Astro components + a single global CSS file with custom properties; no UI libraries, no Tailwind.
- Layout.astro: skip link, header (site title → "/", tagline), main, footer (footerLine, link to the GitHub repo, link to the challenge). Dark theme only; one accent (candle yellow). Serif for epitaphs and names, system sans elsewhere. Meta: title, description, canonical, Open Graph with a static /og.png (generate a simple 1200×630 SVG-based PNG with the site title; no external services).
- index.astro: hero (title, tagline, intro from siteSettings), stats row (buried, retired, average lifespan in days, most common cause, shortest life) rendered as a <dl>, cause filter as a list of links to /cause/<slug> with counts, then the graveyard: a responsive grid of Tombstone.astro cards (name, years, epitaph, cause chip, status mark for retired/undead). Tombstone shape: top corners rounded, slight rotation from a hash of the slug (±0.6deg), no rotation under prefers-reduced-motion. Cards link to /rip/<slug>.
- rip/[slug].astro via getStaticPaths: large stone, years + lifespan in days ("lived 23 days"), epitaph, status; "Autopsy" <dl> (cause → link, stack chips → links, last commit in a <code>, mood, lines of code); "Obituary" rendered with astro-portabletext; "What it taught me" blockquote; "Visit the ruins" link if repoUrl. "Light a candle" button: a small inline <script> that increments a per-slug counter in localStorage (try/catch), shows "N candles lit here" in a role="status" region, and animates a CSS flame (disabled under prefers-reduced-motion). Previous/next grave links by diedAt.
- cause/[slug].astro and stack/[slug].astro: heading, description, grid of tombstones.
- 404.astro: "This project is not dead yet. Or never existed." with a link home.
Run `npm run build`, then `npx astro check`. Give me a list of the pages and the file count in dist/. Append Phase D to docs/BUILD_LOG.md: which prompts needed a second try, what you changed on your own and why.
```

### What came out

- `src/layouts/Layout.astro`: skip link, header, `main`, footer, title, description, canonical and Open Graph tags.
- `src/styles/global.css`: one stylesheet, eight colour tokens, system serif and sans stacks. No web fonts, no
  images besides the social card.
- `src/components/`: `Tombstone`, `Graveyard` (the grid and its empty state), `CauseFilter`, `Candle`.
- Pages: `/`, `/rip/<slug>/` (18), `/cause/<slug>/` (8), `/stack/<slug>/` (14), `/404`. 42 HTML pages, 45 files in
  `dist/` (the pages, one CSS file, `og.png`, `favicon.svg`). The candle script is inlined; there is no JS file.
- `public/og.png`, drawn once from an SVG by `scripts/og.mjs` with `sharp`, which Astro already installs.
- `src/lib/stats.ts` gained `formatDate` and `formatYears`; `src/lib/color.ts` guards the tech colour before it
  goes into a style attribute. 28 tests in 2 files.
- Verification: `npx astro check` 0 errors in 20 files; `npm test` 28 passed; `npm run build` 42 pages; the five
  expected route types exist in `dist/`.
- Lighthouse, mobile, against `astro preview` of the production build, home page and one grave page: performance
  100, accessibility 100, best practices 100, SEO 100 on both. The plan's target was accessibility 95.
- Seen in a real browser at 1440, 768 and 375 pixels: home, a grave, a cause page, a stack page, the 404. No
  horizontal overflow at any width. Console clean.
- Keyboard: the first Tab lands on the skip link and shows it; 13 more Tabs pass the site title, two stat links
  and nine filter links and reach the first tombstone, which shows the candle-coloured ring around the whole stone.
- Candle: two clicks gave "2 candles lit here", the stored count 2, the flame lit and animated, the button label
  changed to "Light another candle". The reduced-motion rule is in the built CSS (tilt off, flame still); it was
  read in the stylesheet, not exercised with an emulated setting.

### Audience check before building (my review skill's questions, answered by the model)

1. Who smiles, and when? A developer at "Average lifespan: 355 days", then at the first epitaph that matches a
   folder of their own. A judge when they see the numbers come from references, not from a hard-coded string.
2. Would it fit a generic CMS demo? The grid is a card grid. What is on the cards is not: years, a lifespan, an
   epitaph and a cause. The register and the filter only exist because cause and dates are modelled as data.
3. What does the visitor do? Filter by cause, open a grave, walk to the neighbouring one, light a candle.
4. Does it serve the three moments (register, stones, candle)? Yes. Nothing else on the page asks for attention.
5. What was cut to make the rest stronger? A cause index page, hover transitions, any motion besides the flame,
   web fonts, and a designed look for `/stack/` beyond heading plus grid.

### What failed or needed a second try

- Link names were glued together. The previous/next links read "Previous graveEverything.js" and the filter
  links "Lost interest5graves" to a screen reader, because the label and the name sat in adjacent spans with no
  space between them. The model found it by reading `textContent` in the browser, not in the screenshot, where
  it looked fine. Fixed with explicit spaces; checked again in the built HTML.
- The candle section is `display: flex`, which silently defeats the `hidden` attribute. The model added
  `.candle[hidden] { display: none }` before the first run, so this never showed on screen.
- The first stats row put five cells in one column on a phone and took a whole screen. Changed to two columns
  with the average lifespan on its own row.
- Long names in the stats row ("PDF Viewer SDK") wrapped at the number size. Text values now use a smaller size.
- Merging the previous pull request with these drafts in the working tree needed a `git stash` first, or the
  branch switch would have refused.

### Decisions the model made on its own

- A tombstone is an `article` with a heading link stretched over the whole stone, not one big link. The link's
  name is the project name, the rest stays readable text — kept.
- The stone shows the lifespan next to the years ("2019 · lived 113 days"). The prompt asked for years only; the
  number is the more interesting half — kept.
- The candle block is hidden until its script runs, so without JavaScript there is no button that does nothing — kept.
- Under the count it says "Candles are counted in this browser only." The count is local, and the page says so — kept.
- For the undead grave the labels change: "What keeps it down" instead of "Cause of death", "Mood at last visit"
  instead of "Mood at death", and "still twitching" instead of a date — kept.
- The cause filter is repeated on each cause page with the current cause marked, plus an "All graves" link — kept.
- Each query runs once per production build instead of once per page (a small in-memory cache in
  `src/lib/sanity.ts`, off in dev) — kept.
- The stats section has a visible heading, "The register" — kept.
- No hover transitions. The plan allows one moving thing, the flame — kept.
- The social card uses Georgia from the machine that drew it; the PNG is committed so the build needs no font — kept.

### Commands I ran by hand

- None yet. The hosting and webhook checklist is waiting for me.
