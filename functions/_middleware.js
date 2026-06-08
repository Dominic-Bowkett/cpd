/**
 * Pages Functions middleware — canonical-host redirect.
 *
 * Runs on every request to the Pages project. Any request arriving on the bare
 * apex host (surveyorcpdhub.com) is 301-redirected to the www host, preserving
 * the path and query string, so the site has a single canonical origin that
 * matches our canonicals/sitemap. The www host and the *.pages.dev preview host
 * pass straight through untouched.
 *
 * This is more reliable than host-matching in public/_redirects (which is kept
 * as a static-layer fallback). NOTE: it can only fire if the apex domain is
 * attached as a custom domain on the Pages project — otherwise apex requests
 * never reach the project. If the apex still doesn't redirect after deploying,
 * the fix is in Cloudflare (attach the apex domain, or add a zone-level Redirect
 * Rule), not in this code.
 */
const APEX = "surveyorcpdhub.com";
const WWW = "www.surveyorcpdhub.com";

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === APEX) {
    url.hostname = WWW;
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  // Not the apex — carry on serving the static asset / other functions.
  return context.next();
}
