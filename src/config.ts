/**
 * Sitewide constants. Single place to edit brand details, author E-E-A-T data,
 * and primary navigation. Imported by layouts/components.
 */

// Production host (used for canonicals, sitemap and absolute-URL schema).
// TODO: Dom confirm final domain, then update astro.config.mjs, robots.txt,
//       _redirects and scripts/indexnow.mjs to match.
export const SITE = {
  name: "Surveyor CPD Hub",
  // Short tagline used in header/footer and default meta.
  tagline: "Train, qualify & stay current in property surveying, energy assessment & retrofit",
  url: "https://www.surveyorcpdhub.co.uk",
  // Default social/OG image — 1200x630. Source SVG is public/images/og-default.svg.
  // TODO: export a PNG version before launch (some networks don't render SVG OG).
  defaultOgImage: "/images/og-default.svg",
  locale: "en_GB",
  // Where the contact / signup forms address their email (mailto: approach for now).
  contactEmail: "hello@surveyorcpdhub.co.uk",
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
  // Post-nominals shown after the name.
  credentials: ["CertDEA", "BA Hons", "GDL", "MSc", "MRPSA Trustmark"],
  jobTitle: "Domestic Energy Assessor, Building Surveyor & Trainer",
  bioShort:
    "Dominic is a practising Domestic Energy Assessor and building surveyor who also trains new students entering the profession — so the guidance here comes from someone doing the job and teaching it.",
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
  "Train & qualify": [
    { label: "Become a surveyor", href: "/become-a-surveyor" },
    { label: "EPC / DEA assessor training", href: "/epc-assessor-training" },
    { label: "Retrofit assessor training", href: "/retrofit-assessor-training" },
    { label: "HHSRS training", href: "/hhsrs-training" },
    { label: "Party wall surveying", href: "/party-wall-surveyor" },
  ],
  "CPD resources": [
    { label: "What is CPD?", href: "/cpd" },
    { label: "Free CPD directory", href: "/cpd/free-resources" },
    { label: "Dom's CPD courses", href: "/courses" },
  ],
  Site: [
    { label: "About the author", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ],
};
