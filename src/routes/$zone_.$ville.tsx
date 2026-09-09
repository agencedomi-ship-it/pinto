import { breadcrumbSchema, canonical, ldScript } from "@/lib/seo";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Hero } from "@/components/sections/Hero";
import { Prix } from "@/components/sections/Prix";
import { Urgence } from "@/components/sections/Urgence";
import { Processus } from "@/components/sections/Processus";
import { Contact } from "@/components/sections/Contact";
import { SectionHeader } from "@/components/sections/Prix";
import { findCity } from "@/data/zones";

/**
 * Page ville : /occitanie/toulouse. Le fichier « $zone_.$ville » (tiret bas) signifie que la page
 * n'est pas imbriquée dans la page région : elle a son propre gabarit complet.
 * Une ville demandée sous la mauvaise région renvoie 404 (une seule adresse par ville).
 */
export const Route = createFileRoute("/$zone_/$ville")({
  loader: ({ params }) => {
    const match = findCity(params.ville);
    if (!match || match.zone.slug !== params.zone) throw notFound();
    return match;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.city.name ?? "";
    const zone = loaderData?.zone;
    const zonePath = `/${zone?.slug ?? ""}`;
    const path = `${zonePath}/${loaderData?.city.slug ?? ""}`;
    return {
      meta: [
        { title: `Serrurier à ${name} 24h/24 : ouverture de porte, serrure | Mr Pinto Serrurier` },
        { name: "description", content: `Serrurier à ${name} : artisan partenaire 24h/24 pour ouverture de porte, changement de serrure, sécurisation après effraction. Tarif de référence annoncé au téléphone, devis écrit avant intervention.` },
        { property: "og:title", content: `Serrurier à ${name} — Mr Pinto Serrurier` },
        { property: "og:description", content: `Dépannage serrurier à ${name}, 24h/24. Artisan partenaire identifié, devis écrit.` },
      ],
      links: [canonical(path)],
      scripts: [
        ldScript(
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: `Serrurier ${zone?.label ?? ""}`, path: zonePath },
            { name: `Serrurier ${name}`, path },
          ]),
        ),
      ],
    };
  },
  component: VillePage,
});

function VillePage() {
  const { city, dept, zone } = Route.useLoaderData();
  const subtitle = `Un artisan serrurier partenaire intervient à ${city.name} 24h/24 et 7j/7. Tarif de référence annoncé au téléphone, devis écrit avant intervention.`;
  const idfCodes = ["75", "77", "78", "91", "92", "93", "94", "95"];
  const isIdf = idfCodes.includes(dept.code);
  const keywords = [
    `Serrurier ${city.name}`,
    `Ouverture de porte ${city.name}`,
    `Porte claquée ${city.name}`,
    `Dépannage serrurier ${city.name}`,
    `Changement de serrure ${city.name}`,
    `Artisan serrurier ${city.name}`,
  ];

  return (
    <PageLayout phone={zone.phone}>
      <Hero city={city.name} dept={`${dept.name} ${dept.code}`} subtitle={subtitle} />
      <Prix variant={isIdf ? "paris" : "province"} />
      <Urgence city={city.name} />
      <Processus />
      <Contact />

      <section id="prestations" className="bg-secondary/50">
        <div className="px-4 py-16">
          <SectionHeader eyebrow={`${dept.name} · ${dept.code}`} title={`Prestations à ${city.name}`} />
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted-foreground">
            Les artisans partenaires interviennent à {city.name} et dans tout le département ({dept.name}). Voici les demandes les plus fréquentes.
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {keywords.map((k) => (
              <span key={k} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground">
                {k}
              </span>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/$zone"
              params={{ zone: zone.slug }}
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              ← Voir toutes les villes en {zone.label}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
