import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Hero } from "@/components/sections/Hero";
import { Prix } from "@/components/sections/Prix";
import { Urgence } from "@/components/sections/Urgence";
import { ZoneCities } from "@/components/sections/ZoneCities";
import { Processus } from "@/components/sections/Processus";
import { Agrement } from "@/components/sections/Agrement";
import { Contact } from "@/components/sections/Contact";
import { findZone } from "@/data/zones";

export const Route = createFileRoute("/zone/$zone")({
  loader: ({ params }) => {
    const zone = findZone(params.zone);
    if (!zone) throw notFound();
    return { zone };
  },
  head: ({ loaderData }) => {
    const z = loaderData?.zone;
    return {
      meta: [
        { title: `Serrurier ${z?.label ?? ""} — Mr Pinto, artisan 24h/24` },
        { name: "description", content: `Artisan serrurier en ${z?.label ?? ""}. J'interviens personnellement dans les départements ${z?.codes ?? ""}, 24h/24, sous 20 minutes.` },
        { property: "og:title", content: `Serrurier ${z?.label ?? ""} — Mr Pinto` },
        { property: "og:description", content: `Intervention 24h/24 en ${z?.label ?? ""}. Tarifs annoncés, artisan sans intermédiaire.` },
      ],
    };
  },
  component: ZonePage,
});

function ZonePage() {
  const { zone } = Route.useLoaderData();
  const isParis = zone.slug === "paris-75";
  const isIdf = isParis || zone.slug === "ile-de-france";
  const title = isParis ? "Serrurier à Paris" : "Mr Pinto Artisan Serrurier";
  const subtitle = "J'interviens 24h/24, 7j/7. Tarif annoncé au téléphone, sans surprise.";

  return (
    <PageLayout>
      <Hero title={title} subtitle={subtitle} city={isParis ? undefined : zone.label} />
      <Prix variant={isIdf ? "paris" : "province"} />
      <Urgence city={zone.label} />
      <Processus />
      <Agrement />
      <Contact />
      <ZoneCities zone={zone} />
    </PageLayout>
  );
}
