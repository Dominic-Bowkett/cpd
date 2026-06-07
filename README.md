# Surveyor CPD Hub

A lean **directory + audience-capture** site for UK property-profession training
and CPD. It starts as a curated directory of (mostly free) training/CPD resources
with email capture, and grows into the home for Dom's own CPD courses.

Authored by **Dominic Bowkett** — CertDEA · BA Hons · GDL · MSc · MRPSA TrustMark
— a practising Domestic Energy Assessor and building surveyor who also trains new
students.

Built lean on purpose (BRIEF): a destination + sales engine for a warm audience,
not a big content hub. The damp/mould and EPC hubs do the heavy content-ranking
and funnel into this site.

## Stack

- **[Astro](https://astro.build/)** static site → **Cloudflare Pages**
- Content in **Markdown** (content collections), **JSON-LD** schema throughout
- **Email capture** via a mailto-based signup form now, with a serverless
  Cloudflare Pages Function (`functions/api/lead.js`) ready to switch on
- No WordPress, database or custom LMS. Course sales will offload to an
  off-the-shelf platform (Teachable / Thinkific / Gumroad) later.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static build → dist/
npm run preview  # preview the build
```

Node version is pinned in `.node-version` (22).

## Structure

```
src/
├── components/   BaseHead, Header, Footer, AuthorBox, Breadcrumbs, FAQ,
│                 SignupForm, ConsentBanner, Schema
├── content/
│   ├── training/ career/qualification pages (root URLs)
│   └── cpd/      CPD hub (/cpd) + free-resources directory
├── layouts/      BaseLayout, ArticleLayout
├── lib/          schema.ts (JSON-LD builders), routes.ts (collection routing)
├── pages/        index, about, courses, contact, privacy, [...slug]
├── styles/       tokens.css (design tokens + base CSS)
└── config.ts     brand, author E-E-A-T, nav, footer links
functions/api/    lead.js — Cloudflare Pages Function for the signup/enquiry form
public/           favicon, robots.txt, _redirects, OG image
scripts/          indexnow.mjs
```

### Pages

- `/` — Home: routes the three professions, teases the directory, captures email
- `/about` — author authority (practitioner + trainer)
- `/become-a-surveyor`, `/epc-assessor-training`, `/retrofit-assessor-training`,
  `/hhsrs-training`, `/party-wall-surveyor` — training/career pages
- `/cpd` — what CPD is, requirements by body, how to log it
- `/cpd/free-resources` — the curated, annotated free-CPD directory (the core)
- `/courses` — Dom's CPD (placeholder phase: in development + signup)
- `/contact`, `/privacy`

## Before launch — TODOs

Search the codebase for `TODO` to find every item. Key ones:

- **Domain.** Set to `surveyorcpdhub.com` across `astro.config.mjs`,
  `src/config.ts`, `public/robots.txt`, `public/_redirects`,
  `scripts/indexnow.mjs` and `functions/api/lead.js`. Attach both
  `surveyorcpdhub.com` and `www.surveyorcpdhub.com` as custom domains on the
  Cloudflare Pages project (the apex redirects to www).
- **OG image.** Export a PNG version of `public/images/og-default.svg`.
- **Analytics.** Set `ga4Id` / `ahrefsKey` in `src/config.ts` (the consent banner
  only appears when GA4 is set).
- **IndexNow.** Generate a key, host it at `public/<key>.txt`, set it in
  `src/config.ts` and `scripts/indexnow.mjs`.
- **Email/CRM.** Decide on a provider for the mailing list; either set
  `RESEND_API_KEY` (Pages secret) and switch `SignupForm` to `mode="post"`, or
  wire the form to your ESP. Until then the mailto fallback keeps capture working.
- **Verify the content.** Every qualification route, cost, CPD requirement and
  directory source is flagged with `<!-- TODO: Dom verify -->`. Confirm each
  against the relevant body before publishing — routes and rules change.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `dist`
- Functions in `/functions` deploy automatically.
- Set any secrets (e.g. `RESEND_API_KEY`) as Pages environment variables.
