# CLAUDE.md — Surveyor CPD Hub

Guidance for working in this repo. It mirrors the conventions of the sibling
damp/mould and EPC hubs so the template stays familiar and reusable.

## What this site is

A lean directory + audience-capture site for UK property training and CPD. Three
jobs, in order (BRIEF):

1. **Be useful now** — the curated [free CPD directory](/cpd/free-resources).
2. **Capture the audience** — value-led email signup (the primary KPI).
3. **Sell Dom's CPD later** — courses added as ready, offloaded to an external
   platform.

Keep it lean. Resist turning it into a big content hub — the other hubs do
content/ranking; this does capture + conversion.

## Positioning & tone

- **Lead with Dom as practitioner-who-trains.** That dual standing is the trust
  signal — surface it.
- Honest, practical, peer-to-peer. The audience is professionals and aspiring
  pros, not consumers.
- **British English.**
- **Don't over-promise launch dates.** Courses are "in development, added as
  ready" — no countdowns.

## Keyword spine (BRIEF §0)

Build around "how to become / train as / course" terms, NOT "CPD" (near-zero
volume). CPD is the recurring-engagement layer and a selling point. Each page has
one primary keyword in `targetKeyword` — use it naturally in title, H1, URL,
first 100 words and meta.

## Authoring rules

- **Author everything as Dominic Bowkett** (CertDEA · BA Hons · GDL · MSc · MRPSA
  TrustMark) — practitioner who also trains.
- **Cite the body** for any requirement (RICS/RIBA/ARB/PCA/TrustMark/gov.uk).
- **Flag every route, requirement, cost or figure** with
  `<!-- TODO: Dom verify -->` — do not invent specifics. Routes and rules change.
- Internal links: every training page ↔ `/cpd/free-resources` ↔ `/courses`.

## Content model

Two content collections (`src/content/config.ts`):

- **`training`** — career/qualification pages, mounted at the site root
  (`/become-a-surveyor`, etc.).
- **`cpd`** — the CPD hub (`/cpd`, from `index.md`) and `/cpd/free-resources`.

Frontmatter fields: `title`, `description`, `targetKeyword`, `lastReviewed`,
`datePublished?`, `cta` (`signup` | `course` | `directory`), `course` (emit
Course schema), `faqs?`, `howToSteps?`, `ogImage?`, `draft`.

The `cta` field chooses the end-of-article block: `signup` renders the
`SignupForm` (the conversion goal — prefer this on most pages); `course` and
`directory` render simple link blocks. Cross-link to the others inline in body
copy regardless.

`[...slug].astro` renders every collection entry through `ArticleLayout`, builds
breadcrumbs and related links, and emits the schema graph.

## Components

- **SignupForm** — the key conversion element. mailto by default; `mode="post"`
  uses `functions/api/lead.js`. Honeypot included.
- **AuthorBox / Person schema** — E-E-A-T, on every article.
- **BaseHead** — title/meta/canonical/OG/JSON-LD + consent-gated analytics.
- **ConsentBanner** — only renders when `SITE.ga4Id` is set.

## Conventions

- Edit brand/author/nav in `src/config.ts`; design tokens in
  `src/styles/tokens.css`.
- JSON-LD via the typed builders in `src/lib/schema.ts` — don't hand-roll schema.
- Static output, `trailingSlash: "never"`, `build.format: "file"` — keep clean
  no-slash URLs consistent across canonicals/sitemap/links.

## Before launch

See the TODO list in `README.md` (domain, author photo, OG PNG, analytics IDs,
IndexNow key, email/CRM provider, and verifying every flagged figure).
