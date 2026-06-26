import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Hero } from "@/components/sections/Hero";
import { Prix } from "@/components/sections/Prix";
import { Urgence } from "@/components/sections/Urgence";
import { Processus } from "@/components/sections/Processus";
import { Agrement } from "@/components/sections/Agrement";
import { Contact } from "@/components/sections/Contact";
import { SectionHeader } from "@/components/sections/Prix";
import { findCity } from "@/data/zones";

export const Route = createFileRoute("/serrurier/$ville")({
  loader: ({ params }) => {
    const match = findCity(params.ville);
    if (!match) throw notFound();
    return match;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.city.name ?? "";
    return {
      meta: [
        { title: `Serrurier à ${name} — Mr Pinto, artisan 24h/24` },
        { name: "description", content: `Artisan serrurier à ${name}. Ouverture de porte, changement de serrure, dépannage 24h/24. Tarifs annoncés par téléphone, intervention en 20 minutes.` },
        { property: "og:title", content: `Serrurier à ${name} — Mr Pinto` },
        { property: "og:description", content: `Dépannage serrurier à ${name}, 24h/24. Artisan indépendant, tarifs clairs.` },
      ],
    };
  },
  component: VillePage,
});

function VillePage() {
  const { city, dept, zone } = Route.useLoaderData();
  const subtitle = `J'interviens à ${city.name} 24h/24 et 7j/7. Tarif annoncé au téléphone, sans surprise.`;
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
    <PageLayout>
      <Hero city={city.name} dept={`${dept.name} ${dept.code}`} subtitle={subtitle} />
      <Prix variant={isIdf ? "paris" : "province"} />
      <Urgence city={city.name} />
      <Processus />
      <Agrement />
      <Contact />

      <section id="prestations" className="bg-secondary/50">
        <div className="px-4 py-16">
          <SectionHeader eyebrow={`${dept.name} · ${dept.code}`} title={`Mes prestations à ${city.name}`} />
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted-foreground">
            J'interviens à {city.name} et dans tout le département {dept.name}. Voici les demandes les plus fréquentes.
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
              to="/zone/$zone"
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
