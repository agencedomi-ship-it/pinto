import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { SITE } from "./data/site";
import { ALL_CITIES, ZONES, findCity, findZone } from "./data/zones";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// Domaines Google sollicités par la balise Google Ads (chargée seulement après consentement).
const GOOGLE = [
  "https://www.googletagmanager.com",
  "https://tagmanager.google.com",
  "https://www.google-analytics.com",
  "https://www.googleadservices.com",
  "https://pagead2.googlesyndication.com",
  "https://googleads.g.doubleclick.net",
  "https://ad.doubleclick.net",
  "https://stats.g.doubleclick.net",
  "https://bid.g.doubleclick.net",
  "https://www.gstatic.com",
  "https://*.google.com",
  "https://*.google.fr",
  "https://*.google.be",
  "https://*.google.ch",
  "https://*.google.de",
  "https://*.google.es",
  "https://*.google.it",
  "https://*.google.co.uk",
  "https://*.google.co.th",
].join(" ");

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `img-src 'self' data: blob: ${GOOGLE}`,
  "font-src 'self' data: https://fonts.gstatic.com",
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ${GOOGLE}`,
  `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com ${GOOGLE}`,
  `connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com ${GOOGLE}`,
  `frame-src 'self' ${GOOGLE}`,
  "upgrade-insecure-requests",
].join("; ");

function addSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", CONTENT_SECURITY_POLICY);
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

/** Plan de site : accueil, zones, villes, pages légales. */
function sitemap(): Response {
  const today = new Date().toISOString().slice(0, 10);
  const paths = [
    "/",
    ...ZONES.map((z) => `/${z.slug}`),
    ...ALL_CITIES.map((c) => `/${c.zone.slug}/${c.city.slug}`),
    "/mentions-legales",
    "/conditions-generales",
    "/politique-de-confidentialite",
    "/cookies",
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((p) => `  <url><loc>${SITE.url}${p === "/" ? "" : p}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
    `\n</urlset>\n`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
}

/** Ancienne structure d'URL → nouvelle (null si l'adresse n'est pas une ancienne adresse connue). */
function legacyRedirect(pathname: string): string | null {
  const zone = pathname.match(/^\/zone\/([a-z0-9-]+)$/);
  if (zone) return findZone(zone[1]) ? `/${zone[1]}` : null;
  const ville = pathname.match(/^\/serrurier\/([a-z0-9-]+)$/);
  if (ville) {
    const match = findCity(ville[1]);
    return match ? `/${match.zone.slug}/${match.city.slug}` : null;
  }
  return null;
}

function robots(): Response {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}

/**
 * Le site est servi en HTML pur : aucune hydratation React côté client (menu, consentement et
 * suivi tiennent dans un script inline). On retire donc les scripts et préchargements de modules
 * que le framework injecte, soit environ 440 Ko de JavaScript par page.
 */
async function stripClientJs(response: Response): Promise<Response> {
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return response;
  let html = await response.text();
  html = html
    .replace(/<link rel="modulepreload"[^>]*>/g, "")
    .replace(/<script type="module"[^>]*><\/script>/g, "")
    .replace(/<script>(?:\(self\.\$R|self\.\$_TSR|\$_TSR)[\s\S]*?<\/script>/g, "")
    .replace(/<script>\(function\(a,f\)\{let l;[\s\S]*?<\/script>/g, "");
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) return response;
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), { status: 500, headers: { "content-type": "text/html; charset=utf-8" } });
}

const worker = {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Une seule origine : https et sans www.
      const canonicalHost = new URL(SITE.url).hostname;
      if (url.hostname === `www.${canonicalHost}` || (url.protocol === "http:" && url.hostname === canonicalHost)) {
        url.protocol = "https:";
        url.hostname = canonicalHost;
        return Response.redirect(url.toString(), 301);
      }

      // Une seule adresse par page : sans barre oblique finale, en redirection permanente.
      if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
        url.pathname = url.pathname.replace(/\/+$/, "");
        return Response.redirect(url.toString(), 301);
      }
      // Anciennes adresses (/zone/occitanie, /serrurier/toulouse) : redirection permanente vers /region et /region/ville.
      const legacy = legacyRedirect(url.pathname);
      if (legacy) {
        url.pathname = legacy;
        return Response.redirect(url.toString(), 301);
      }

      if (url.pathname === "/sitemap.xml") return addSecurityHeaders(sitemap());
      if (url.pathname === "/robots.txt") return addSecurityHeaders(robots());

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return addSecurityHeaders(await stripClientJs(await normalizeCatastrophicSsrResponse(response)));
    } catch (error) {
      console.error(error);
      return addSecurityHeaders(
        new Response(renderErrorPage(), { status: 500, headers: { "content-type": "text/html; charset=utf-8" } }),
      );
    }
  },
};

export default worker;
