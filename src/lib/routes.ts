/**
 * Routing helpers for content collections. Kept in their own module (not inline
 * in [...slug].astro) because Astro hoists getStaticPaths above same-file
 * declarations — anything it calls must be imported, not declared alongside it.
 */

export type Collection = "training" | "cpd";

/** Where each collection mounts in the URL tree (training pages sit at root). */
export const BASE: Record<Collection, string> = {
  training: "",
  cpd: "/cpd",
};

/** Human label for each section's top-level breadcrumb. */
export const PILLAR_LABEL: Record<Collection, string> = {
  training: "Training & careers",
  cpd: "CPD",
};

/**
 * The landing/hub page for each collection — used for the breadcrumb trail.
 * Training pages have no single hub (they sit at root, linked from Home), so we
 * point that at Home; the CPD pages nest under the /cpd hub.
 */
export const PILLAR_HOME: Record<Collection, string> = {
  training: "/",
  cpd: "/cpd",
};

/** Build the public URL for an entry from its collection + slug. */
export function urlFor(collection: Collection, slug: string): string {
  // An "index" slug represents the collection's landing page.
  const clean = slug.replace(/(^|\/)index$/, "");
  const path = `${BASE[collection]}/${clean}`.replace(/\/+/g, "/").replace(/\/$/, "");
  return path === "" ? "/" : path;
}
