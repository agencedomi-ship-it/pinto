import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Hero } from "@/components/sections/Hero";
import { Prix } from "@/components/sections/Prix";
import { Urgence } from "@/components/sections/Urgence";
import { ZoneButtons } from "@/components/sections/ZoneButtons";
import { Processus } from "@/components/sections/Processus";
import { Agrement } from "@/components/sections/Agrement";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mr Pinto — Artisan Serrurier 24h/24 · Intervention en 20 min" },
      { name: "description", content: "Artisan serrurier indépendant. J'interviens personnellement 24h/24, 7j/7. Tarifs annoncés, devis téléphonique sans surprise. Paris, Île-de-France, Bretagne, Occitanie, Côte d'Azur." },
      { property: "og:title", content: "Mr Pinto — Artisan Serrurier 24h/24" },
      { property: "og:description", content: "Serrurier artisan, intervention en 20 minutes, tarifs annoncés à l'avance." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageLayout>
      <Hero />
      <Prix />
      <Urgence />
      <Processus />
      <Agrement />
      <Contact />
      <ZoneButtons />
    </PageLayout>
  );
}
