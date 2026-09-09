import { createFileRoute } from "@tanstack/react-router";
import { H, LegalLink, LegalPage } from "@/components/Legal";
import { LEGAL_ADDRESS, SITE, WRITE_TO } from "@/data/site";
import { breadcrumbSchema, canonical, ldScript } from "@/lib/seo";

const PATH = "/politique-de-confidentialite";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => ({
    meta: [
      { title: `Politique de confidentialité | ${SITE.name}` },
      { name: "description", content: `Comment ${SITE.legal.companyName} (${SITE.name}) collecte, utilise et protège vos données personnelles.` },
    ],
    links: [canonical(PATH)],
    scripts: [ldScript(breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Politique de confidentialité", path: PATH }]))],
  }),
  component: Page,
});

function Page() {
  const { legal } = SITE;
  return (
    <LegalPage
      title="Politique de confidentialité"
      path={PATH}
      intro={`Dernière mise à jour : ${SITE.updatedOn}. Règlement (UE) 2016/679 (RGPD) et loi Informatique et Libertés.`}
    >
      <section>
        <H>Responsable du traitement</H>
        <p className="mt-3">
          {legal.companyName}, {legal.legalForm}, {LEGAL_ADDRESS}, {legal.rcs}. Contact : {SITE.email || "par téléphone ou par courrier au siège"}.
        </p>
      </section>
      <section>
        <H>Données collectées et finalités</H>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <b className="text-foreground">Appel téléphonique</b> : nom, adresse, numéro de téléphone et nature du besoin, communiqués pour organiser
            l'intervention. Base légale : exécution du contrat et mesures précontractuelles.
          </li>
          <li>
            <b className="text-foreground">Vérification d'identité lors d'une ouverture de porte</b> : consultation d'une pièce d'identité et d'un
            justificatif de domicile. Finalité : s'assurer de la légitimité de la demande. Base légale : obligation légale et intérêt légitime. Ces
            documents sont consultés sur place et ne sont pas conservés, sauf mention sur le devis.
          </li>
          <li>
            <b className="text-foreground">Mesure d'audience et publicité</b> : avec votre consentement uniquement, des cookies Google (Google Tag
            Manager, Google Ads) mesurent les appels et visites issus de nos annonces. Base légale : consentement (art. 6.1.a RGPD), retirable à tout
            moment via la page <LegalLink to="/cookies">Cookies</LegalLink>.
          </li>
        </ul>
      </section>
      <section>
        <H>Destinataires et sous-traitants</H>
        <p className="mt-3">
          Le site ne comporte aucun formulaire. Les informations que vous nous communiquez par téléphone sont transmises à l'artisan serrurier
          partenaire chargé de votre intervention, dans la seule mesure nécessaire à sa réalisation. Le site est hébergé par Cloudflare, Inc.
          (États-Unis), qui traite les journaux techniques de connexion dans le cadre des clauses contractuelles types de la Commission européenne.
          Google Ireland Ltd traite les données de mesure publicitaire si vous y consentez. Aucune donnée n'est vendue ni cédée à des tiers à des
          fins commerciales.
        </p>
      </section>
      <section>
        <H>Durées de conservation</H>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Devis et factures : 10 ans (obligation comptable), conservés par l'artisan partenaire.</li>
          <li>Journaux techniques : 12 mois maximum.</li>
          <li>Cookies de mesure publicitaire : 13 mois maximum, consentement redemandé au-delà.</li>
        </ul>
      </section>
      <section>
        <H>Vos droits</H>
        <p className="mt-3">
          Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, ainsi que du droit de
          définir des directives post mortem. Exercez-les en écrivant {WRITE_TO}, en joignant un justificatif d'identité si nécessaire. Réponse sous
          un mois. Vous pouvez introduire une réclamation auprès de la CNIL (cnil.fr).
        </p>
      </section>
      <section>
        <H>Sécurité</H>
        <p className="mt-3">Le site est servi en HTTPS et ne collecte aucune donnée par formulaire.</p>
      </section>
    </LegalPage>
  );
}
