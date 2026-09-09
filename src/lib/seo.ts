import { SITE } from "@/data/site";
import { NATIONAL_PHONE, ZONES } from "@/data/zones";

/** Lien canonique d'une page, à partir de son chemin sans barre oblique finale. */
export function canonical(path: string) {
  return { rel: "canonical", href: `${SITE.url}${path === "/" ? "" : path}` };
}

/** Entrée `scripts` pour la fonction head() de TanStack : un bloc JSON-LD. */
export function ldScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: SITE.name,
    url: SITE.url,
    telephone: NATIONAL_PHONE.tel,
    image: `${SITE.url}/assets/logo-320.webp`,
    parentOrganization: { "@type": "Organization", name: SITE.legal.companyName, vatID: SITE.legal.vat },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.legal.street,
      postalCode: SITE.legal.postalCode,
      addressLocality: SITE.legal.city,
      addressCountry: "FR",
    },
    areaServed: ZONES.map((z) => ({ "@type": "AdministrativeArea", name: z.label })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}
