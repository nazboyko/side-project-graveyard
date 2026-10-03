---
name: graveyard-voice
description: The Side Project Graveyard concept, tone, canonical content types, and forbidden generic patterns. Read before writing any page copy, seed content, validation message, README or post text. Use when adding or editing graves, causes, hero copy, empty states, or any visitor-facing wording.
---

# Graveyard voice

Project name: **Side Project Graveyard**. Tagline: "Every repo deserves a proper burial."
One sentence: a quiet cemetery where abandoned side projects get an epitaph, a cause of death, and the one thing they taught their author.

## The visitor

A developer or judge scrolling dozens of challenge entries. They give the page ten seconds and three clicks.
The page's single job: make them recognise their own `~/projects` folder, smile once, and notice the site is well built.
They should leave knowing one number (the average lifespan) and one grave.

## The narrator

The keeper of the graveyard: calm, dry, a little fond of the dead. Speaks after closing time.
- Short sentences. Plain words. Humour comes from precision, never from jokes added on top.
- First person only in the author's own graves ("I", "my"); the keeper otherwise speaks in third person about projects.
- Never mocks the author or the reader. Every grave is treated with respect, including the silly ones.
- Numbers over adjectives: "lived 23 days", "412 commits", "one user, who was me".

## Canonical content

Statuses: `buried` (abandoned), `retired` (shipped, closed with honour), `undead` ("will get back to it" — no death date).
Causes of death (8): Lost interest · Scope creep · A better tool shipped · Got a real job · Dependency hell ·
Shipped v1, never looked back · Nobody came · Rewrote it in a new framework and never finished.

Epitaph: one line, ≤ 120 characters, sounds like it was carved, not blogged.
Good: "It parsed every RSS feed except the one I read." · "v0.3.0. The changelog was longer than the code."
Bad: "A cool project I built to learn React!" · anything with an exclamation mark.

Obituary: 2–3 short paragraphs. What it was, what happened, the last day. Specific details (a date, a commit message,
a dependency version) beat generalities.

Lesson ("What it taught me"): ≤ 200 characters, one idea, no moral-of-the-story framing.
Good: "Ship the ugly version to one person before building the settings page."

Validation messages: keeper's voice, still clear. "A project cannot die before it is born." "An epitaph longer than
120 characters will not fit on the stone." "Every grave needs a cause of death."

Empty states: "No graves here yet. The ground is still soft." · 404: "This project is not dead yet. Or never existed."

## Forbidden patterns

- Blog-template structure: hero with a stock illustration, three feature cards, testimonials, newsletter box.
- "Fun" developer-humour clichés: coffee jokes, "works on my machine", "it's not a bug", semicolon jokes.
- Emoji in page copy (an emoji in the `cause.icon` field is allowed, rendered as decoration with `aria-hidden`).
- Marketing tone, exclamation points, "amazing", "awesome", "blazing fast", "seamless".
- Any section that could be pasted into a generic headless-CMS demo unchanged.
- Fake interactivity: buttons that do nothing. The candle is the only button, and it counts.

## Tone check before committing copy

Read the text aloud as the keeper locking the gate at dusk. If it sounds like a landing-page generator or a
LinkedIn post, rewrite it. If it would make the author of that dead project wince, soften it.
