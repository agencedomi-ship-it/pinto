import { createFileRoute } from "@tanstack/react-router";
import { ConsentControls } from "@/components/Consent";
import { H, LegalPage } from "@/components/Legal";
import { SITE } from "@/data/site";
import { breadcrumbSchema, canonical, ldScript } from "@/lib/seo";

const PATH = "/cookies";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `Politique de cookies | ${SITE.name}` },
      { name: "description", content: `Cookies utilisés par ${SITE.name} et gestion de votre consentement.` },
    ],
    links: [canonical(PATH)],
    scripts: [ldScript(breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Cookies", path: PATH }]))],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalPage title="Politique de cookies" path={PATH}>
      <section>
        <H>Cookies strictement nécessaires</H>
        <p className="mt-3">
          Le site n'utilise aucun cookie nécessaire à son fonctionnement. Votre choix de consentement est mémorisé localement dans votre navigateur
          (stockage local, sans transmission), pendant 6 mois.
        </p>
      </section>
      <section>
        <H>Cookies de mesure publicitaire (soumis à consentement)</H>
        <p className="mt-3">
          Avec votre accord, Google Tag Manager charge la balise Google Ads qui dépose des cookies (par exemple _gcl_au, IDE) afin de mesurer les
          appels et visites issus de nos annonces. Durée maximale : 13 mois. Responsable : Google Ireland Ltd, Gordon House, Barrow Street, Dublin 4,
          Irlande. Sans votre accord, aucune balise Google n'est chargée.
        </p>
      </section>
      <section>
        <H>Gérer votre choix</H>
        <p className="mt-3">Vous pouvez accepter, refuser ou modifier votre choix à tout moment :</p>
        <ConsentControls />
      </section>
    </LegalPage>
  );
}
