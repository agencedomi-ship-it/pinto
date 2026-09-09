import { ZONE_INTROS } from "@/data/site";
import { breadcrumbSchema, canonical, ldScript } from "@/lib/seo";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Hero } from "@/components/sections/Hero";
import { Prix } from "@/components/sections/Prix";
import { Urgence } from "@/components/sections/Urgence";
import { ZoneCities } from "@/components/sections/ZoneCities";
import { Processus } from "@/components/sections/Processus";
import { Contact } from "@/components/sections/Contact";
import { findZone } from "@/data/zones";

/** Page région : /occitanie, /bretagne… (les villes sont en dessous : /occitanie/toulouse). */
export const Route = createFileRoute("/$zone")({
  loader: ({ params }) => {
    const zone = findZone(params.zone);
    if (!zone) throw notFound();
    return { zone };
  },
  head: ({ loaderData }) => {
    const z = loaderData?.zone;
    const label = z?.label ?? "";
    const path = `/${z?.slug ?? ""}`;
    return {
      meta: [
        { title: `Serrurier ${label} 24h/24 : artisans partenaires, devis écrit | Mr Pinto Serrurier` },
        { name: "description", content: `Serrurier en ${label}, départements ${z?.codes ?? ""} : artisans serruriers partenaires 24h/24, ouverture de porte, changement de serrure, sécurisation. Tarif de référence annoncé au téléphone, devis écrit avant intervention.` },
        { property: "og:title", content: `Serrurier ${label} — Mr Pinto Serrurier` },
        { property: "og:description", content: `Artisans partenaires 24h/24 en ${label}. Tarif annoncé, devis écrit.` },
      ],
      links: [canonical(path)],
      scripts: [ldScript(breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: `Serrurier ${label}`, path }]))],
    };
  },
  component: ZonePage,
});

function ZonePage() {
  const { zone } = Route.useLoaderData();
  const isParis = zone.slug === "paris-75";
  const isIdf = isParis || zone.slug === "ile-de-france";
  const title = isParis ? "Serrurier à Paris" : `Serrurier en ${zone.label}`;
  const subtitle = `Artisans serruriers partenaires en ${zone.label}, 24h/24 et 7j/7. Tarif de référence annoncé au téléphone, devis écrit avant intervention.`;
  const intro = ZONE_INTROS[zone.slug];

  return (
    <PageLayout phone={zone.phone}>
      <Hero title={title} subtitle={subtitle} city={isParis ? undefined : zone.label} />
      {intro ? (
        <section className="bg-background">
          <p className="mx-auto max-w-2xl px-5 pt-8 text-[15px] leading-relaxed text-muted-foreground">{intro}</p>
        </section>
      ) : null}
      <Prix variant={isIdf ? "paris" : "province"} />
      <Urgence city={zone.label} />
      <Processus />
      <Contact />
      <ZoneCities zone={zone} />
    </PageLayout>
  );
}
