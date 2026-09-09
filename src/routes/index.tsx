import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Hero } from "@/components/sections/Hero";
import { Prix } from "@/components/sections/Prix";
import { Urgence } from "@/components/sections/Urgence";
import { Processus } from "@/components/sections/Processus";
import { Contact } from "@/components/sections/Contact";
import { ZoneButtons } from "@/components/sections/ZoneButtons";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mr Pinto Serrurier : serrurier urgence 24/7, ouverture de porte dès 39 €" },
      {
        name: "description",
        content:
          "Réseau d'artisans serruriers partenaires, 24h/24 et 7j/7 : ouverture de porte, changement de serrure, sécurisation. Tarif de référence annoncé au téléphone, devis écrit avant intervention. Paris, Île-de-France, Ouest, Occitanie, Côte d'Azur, Grand Est, Nouvelle-Aquitaine.",
      },
      { property: "og:title", content: "Mr Pinto Serrurier : serrurier urgence 24/7" },
      { property: "og:description", content: "Artisans serruriers partenaires, tarif de référence annoncé, devis écrit avant intervention." },
    ],
    links: [canonical("/")],
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
      <Contact />
      <ZoneButtons />
    </PageLayout>
  );
}
