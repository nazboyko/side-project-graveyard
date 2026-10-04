# Side Project Graveyard — working rules

This is an entry for the DEV × Sanity Challenge, Path Two ("Vibe-Code Something Strange").
Deadline: Monday October 5, 2026, 01:59 CDT (06:59 UTC). The goal is a complete, valid submission; it is not to win.

Local working notes live next to this file but are **not committed**: `PLAN.md` (concept, schema, phases with prompts)
and `CHALLENGE_RULES.md` (what we must not break). Read both before doing anything.

## Hard rules (every action in this session)

1. **Honest build log.** `docs/BUILD_LOG.md` is part of the submission. At the end of every phase append an entry:
   the prompt(s) verbatim, what was produced, what failed or needed a retry, what you changed on your own initiative
   and why. Never clean up a failure out of the log. If I forget to ask for the entry, write it anyway.
2. **Nothing about my other work goes into the repo.** Committed files (code, README, BUILD_LOG, seed content,
   commit messages, PR text) must never name, link, or describe my other projects, repositories, clients, or local
   paths outside this repo. The only exception is the short list of public GitHub repositories I explicitly name in a
   prompt as graves, described strictly from their public metadata. Skills borrowed from my other projects are
   described generically ("my accessibility checklist skill", "my post-style skill"), never by their origin.
3. **Scope discipline.** Build exactly what `PLAN.md` describes. Items marked as bonus there are off by default.
   When something is ambiguous, pick the simplest option that works and say so in one line in the BUILD_LOG entry.
4. **No secrets in the repo.** Sanity project ID and dataset name are public and fine. Deploy hook URLs and any
   token go only to `.env` files, which are gitignored. Check `git status` before every commit.
5. **Commits.** Commit autonomously at every logical block with green checks; do not wait to be asked. Messages are
   2–5 plain words starting with a verb ("add project schema", "render tombstone grid"), specific to the change, no
   conventional-commit prefixes, no body unless the why is not obvious. Never add trailers, Co-Authored-By lines,
   "Generated with" lines, emoji, or any tool attribution — in commits, PR titles or PR bodies. Single author: my git
   identity. The commit-guard hook enforces at least 120 s between commits and rejects bulk staging; never weaken or bypass it.
   See `.claude/skills/commit-discipline`.
6. **Voice.** UI copy, seed content, validation messages, README and the post follow `.claude/skills/graveyard-voice`.
7. **Credits.** Every non-trivial dependency or borrowed snippet goes into the README credits list as you add it.
8. **Verification before every commit and PR** per `.claude/skills/testing-gate`. Never weaken or skip a failing
   check to go green; fix the code or the wrong expectation and say which in the BUILD_LOG.
9. **Stage review before every commit.** Never bulk-stage: no `git add -A`, `git add .`, `git add --all`,
   `git add -u`, no `git commit -a`. Run `git status --porcelain`, then stage files by name, and for each file
   answer three questions before it goes in: does the project need it to build, run or be understood? is it allowed
   by "What is committed" and the hard rules above? is it part of this change and not a leftover? One "no" and the
   file stays out (or goes to `.gitignore` / `.git/info/exclude`). Then re-read `git diff --cached`: nothing generated,
   nothing debugging, no secrets, no notes. The commit-guard hook rejects bulk staging; do not work around it.

## Autonomous mode (how this build runs)

One phase of `PLAN.md` = one branch = one PR = one merge, all done by you. Branch names describe the outcome
(`project-schema`, `seed-content`, `astro-queries`, `graveyard-pages`, `deploy-webhook`, `polish-pass`, `readme-and-post`).

Loop for every phase:
1. `git checkout main && git pull`, then branch.
2. Work in small commits; verification per `testing-gate` ships with the behaviour.
3. Append the phase entry to `docs/BUILD_LOG.md` and commit it.
4. Review the whole branch with `code-review-expert` over `git diff main...HEAD`; fix P0/P1 now, list P2/P3 in the PR body.
5. Push. `gh pr create` — title 2–6 plain words, body with three short sections: what changed, how it was verified,
   follow-ups. No attribution lines.
6. `gh pr checks --watch`. If CI fails, fix on the branch and push again. If the same cause fails twice, stop and tell me.
7. `gh pr merge --rebase --delete-branch`, then back to step 1 for the next phase.

The push-guard hook blocks a push when tracked files contain Cyrillic, mention another local project, carry AI
attribution in the history, or track working notes or borrowed skills. Fix the cause; never bypass a hook, never use
`--no-verify`, never edit the hooks.

Stop and wait for me only when: a step needs my accounts or browser (the wizard stages in `PLAN.md` Phase 0),
CI fails twice on the same cause, a required check cannot be run at all, or `PLAN.md` explicitly says to ask.
Everything else: decide, note the decision in the BUILD_LOG, continue. Phase H (publishing the post) is mine.

## What is committed and what is not

Committed: `studio/`, `web/`, `docs/BUILD_LOG.md`, `README.md`, `LICENSE`, `.gitignore`, `.github/workflows/`,
this `CLAUDE.md`, `.claude/skills/graveyard-voice/` (written for this project), optionally `scripts/setup-wizard.sh`.
Never committed: `PLAN.md`, `CHALLENGE_RULES.md`, `docs/POST_DRAFT.md`, `.claude/settings.json`, `.claude/hooks/`,
every other folder under `.claude/skills/` (they come from my other projects), `.env*`. They are kept out by
`.git/info/exclude` and the global git excludes; do not `git add -f` anything except what is listed as committed above.

## Stack (fixed)

- `studio/` — Sanity Studio v4+, TypeScript, `defineType`/`defineField`, structure builder for the settings singleton.
  Dataset `production`, public. Deployed with `npx sanity deploy`.
- `web/` — Astro (latest), `output: 'static'`, `@sanity/astro` (`useCdn: false`, build-time fetch via `sanity:client`),
  `astro-portabletext` for rich text. No React, no Tailwind, no component libraries. One global CSS file with custom properties.
  Pure helpers in `web/src/lib/` are tested with Vitest.
- Hosting: a Cloudflare Worker with static assets (Workers Builds), Git-connected, root `web/`, build `npm run build`,
  deploy `npx wrangler deploy`, assets from `dist` per `web/wrangler.jsonc`.
  Sanity GROQ-powered webhook → Workers Builds deploy hook = rebuild on publish.
- CI: `.github/workflows/ci.yml` on pull requests and pushes to main — web: `npm ci`, `npx astro check`, `npm test`,
  `npm run build`; studio: `npm ci`, `npx tsc --noEmit`, `npx sanity schema validate`. Jobs skip while their folder does not exist yet.
- Node 22, npm.

## Repo layout

```
studio/                 Sanity Studio: schemaTypes/, structure.ts, seed/graveyard.ndjson
web/                    Astro site: src/lib/sanity.ts, src/lib/*.test.ts, src/pages/, src/components/, src/styles/global.css
docs/BUILD_LOG.md       prompt log (part of the submission)
docs/POST_DRAFT.md      DEV post draft (local only)
scripts/setup-wizard.sh manual-steps wizard (Phase 0)
.github/workflows/      ci.yml
.claude/skills/         graveyard-voice is committed; the rest are local
CLAUDE.md, README.md, LICENSE; PLAN.md and CHALLENGE_RULES.md are local notes
```

## Skills and when to read them

- `graveyard-voice` — before writing any UI copy, seed content, validation message, README or post text.
- `testing-gate` — before implementing any feature and before every commit.
- `commit-discipline` — before every commit; `code-review-expert` — before every PR.
- `accessible-interactions` — before building the filter links, the candle button, forms, or any focusable element.
- `wow-review` — at the ANALYZE step of Phase D and at the Phase F gate.
- `ui-review` — Phase F, findings only.
- `submission-writer` + `stop-slop` — Phase G, README and post.
- `wizard` — Phase 0 only.
- `motion-review` — only if any motion beyond the candle flame is proposed.

## Working style

- Prefer small readable components over abstractions. No premature generalisation.
- Every GROQ query lives in `web/src/lib/sanity.ts` with a TypeScript interface next to it; date and stats maths live in
  `web/src/lib/stats.ts` (pure, tested).
- If a step takes much longer than planned, say so in the BUILD_LOG and cut in this order: `/stack/` pages, candle, stats row.
- Never edit `CHALLENGE_RULES.md`. If a rule seems wrong, tell me and I will re-check the challenge page.
