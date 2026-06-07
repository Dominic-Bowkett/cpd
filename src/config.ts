/**
 * Sitewide constants. Single place to edit brand details, author E-E-A-T data,
 * and primary navigation. Imported by layouts/components.
 */

// Production host (used for canonicals, sitemap and absolute-URL schema).
export const SITE = {
  name: "Surveyor CPD Hub",
  // Short tagline used in header/footer and default meta.
  tagline: "Train, qualify & stay current in property surveying, energy assessment & retrofit",
  url: "https://www.surveyorcpdhub.com",
  // Default social/OG image — 1200x630. Source SVG is public/images/og-default.svg.
  // TODO: export a PNG version before launch (some networks don't render SVG OG).
  defaultOgImage: "/images/og-default.svg",
  locale: "en_GB",
  // Where the contact / signup forms address their email (mailto: approach for now).
  contactEmail: "hello@surveyorcpdhub.com",
  // Google Analytics 4 measurement ID (empty string disables the tag).
  // TODO: Dom add GA4 ID.
  ga4Id: "",
  // Ahrefs Web Analytics site key (cookieless; empty string disables it).
  // TODO: Dom add Ahrefs key.
  ahrefsKey: "",
  // IndexNow key (also hosted at /<key>.txt) for instant search-engine pings.
  // TODO: Dom generate a key, host it at public/<key>.txt, set it here + in indexnow.mjs.
  indexNowKey: "",
};

/**
 * Author E-E-A-T block. Drives AuthorBox + Person schema everywhere.
 * Credentials are listed as discrete items so we can emit hasCredential schema.
 */
export const AUTHOR = {
  name: "Dominic Bowkett",
  // Post-nominal letters shown after the name (the byline). Scheme registrations
  // and roles that aren't letters live in `registrations` below.
  credentials: ["CertDEA", "BA Hons", "GDL", "MSc", "MRPSA"],
  // Professional registrations and roles — shown in the author box and about
  // page, and emitted (with credentials) as Person hasCredential schema.
  registrations: [
    "TrustMark registered",
    "Registered Retrofit Assessor (ECMK · Elmhurst · Quidos)",
    "Trainer & Assessor of Domestic Energy Assessors and Retrofit Assessors (Energy Trust)",
  ],
  jobTitle: "Domestic Energy Assessor, Retrofit Assessor, Building Surveyor & Trainer",
  bioShort:
    "Dominic is a practising Domestic Energy Assessor, Retrofit Assessor and building surveyor who also trains and assesses new DEAs and Retrofit Assessors (with Energy Trust) — so the guidance here comes from someone doing the job and teaching it.",
  photo: "/images/author-dom.jpg",
  aboutUrl: "/about",
  // Author's professional site — linked from the author box / about page and
  // emitted as schema sameAs (E-E-A-T).
  website: "https://dominicbowkett.com",
  websiteLabel: "dominicbowkett.com",
};

/** Primary navigation — the training routes plus the CPD layer and conversion pages. */
export const NAV = [
  { label: "Become a surveyor", href: "/become-a-surveyor" },
  { label: "EPC assessor", href: "/epc-assessor-training" },
  { label: "Retrofit assessor", href: "/retrofit-assessor-training" },
  { label: "Free CPD", href: "/cpd/free-resources" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
];

/** Footer link groups. */
export const FOOTER_LINKS = {
  "Surveying careers": [
    { label: "How to become a surveyor", href: "/become-a-surveyor" },
    { label: "Building surveyor", href: "/how-to-become-a-building-surveyor" },
    { label: "Quantity surveyor", href: "/how-to-become-a-quantity-surveyor" },
    { label: "Valuation surveyor", href: "/how-to-become-a-valuation-surveyor" },
    { label: "Chartered surveyor (MRICS)", href: "/how-to-become-a-chartered-surveyor" },
    { label: "RICS APC", href: "/rics-apc" },
    { label: "Surveying apprenticeships", href: "/surveying-apprenticeships" },
  ],
  "Energy, retrofit & condition": [
    { label: "EPC / DEA assessor training", href: "/epc-assessor-training" },
    { label: "Retrofit assessor training", href: "/retrofit-assessor-training" },
    { label: "Retrofit coordinator training", href: "/retrofit-coordinator-training" },
    { label: "Damp surveyor training", href: "/damp-surveyor-training" },
    { label: "HHSRS training", href: "/hhsrs-training" },
    { label: "Party wall surveying", href: "/party-wall-surveyor" },
  ],
  "CPD resources": [
    { label: "What is CPD?", href: "/cpd" },
    { label: "Free CPD directory", href: "/cpd/free-resources" },
    { label: "RICS CPD requirements", href: "/cpd/rics-cpd-requirements" },
    { label: "How to record CPD", href: "/cpd/how-to-log-cpd" },
    { label: "Dom's CPD courses", href: "/courses" },
  ],
  Site: [
    { label: "About the author", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ],
};
