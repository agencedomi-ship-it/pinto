import { createFileRoute } from "@tanstack/react-router";
import { H, LegalLink, LegalPage } from "@/components/Legal";
import { LEGAL_ADDRESS, SITE, WRITE_TO } from "@/data/site";
import { NATIONAL_PHONE } from "@/data/zones";
import { breadcrumbSchema, canonical, ldScript } from "@/lib/seo";

const PATH = "/mentions-legales";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: `Mentions légales | ${SITE.name}` },
      { name: "description", content: `Mentions légales du site ${SITE.name} : éditeur, hébergeur, propriété intellectuelle, tarifs, réclamations.` },
    ],
    links: [canonical(PATH)],
    scripts: [ldScript(breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Mentions légales", path: PATH }]))],
  }),
  component: Page,
});

function Page() {
  const { legal } = SITE;
  return (
    <LegalPage
      title="Mentions légales"
      path={PATH}
      intro="Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique."
    >
      <section>
        <H>Éditeur du site</H>
        <p className="mt-3">Le site {SITE.url.replace("https://", "")} et la marque commerciale « {SITE.name} » sont édités et exploités par :</p>
        <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-[200px_1fr]">
          <dt className="font-semibold text-foreground">Dénomination</dt><dd>{legal.companyName}</dd>
          <dt className="font-semibold text-foreground">Forme juridique</dt><dd>{legal.legalForm}</dd>
          <dt className="font-semibold text-foreground">Capital social</dt><dd>{legal.capital}</dd>
          <dt className="font-semibold text-foreground">Siège social</dt><dd>{LEGAL_ADDRESS}</dd>
          <dt className="font-semibold text-foreground">Immatriculation</dt><dd>{legal.rcs} · SIREN {legal.siren} · SIRET {legal.siret}</dd>
          <dt className="font-semibold text-foreground">TVA intracommunautaire</dt><dd>{legal.vat}</dd>
          <dt className="font-semibold text-foreground">Code APE</dt><dd>{legal.naf}</dd>
          <dt className="font-semibold text-foreground">Date d'immatriculation</dt><dd>{legal.createdOn}</dd>
          <dt className="font-semibold text-foreground">Directeur de la publication</dt><dd>{legal.manager}</dd>
          <dt className="font-semibold text-foreground">Téléphone</dt><dd>{NATIONAL_PHONE.display}</dd>
          {SITE.email ? (<><dt className="font-semibold text-foreground">Email</dt><dd>{SITE.email}</dd></>) : null}
        </dl>
      </section>

      <section>
        <H>Nature de l'activité</H>
        <p className="mt-3">{legal.companyName} {legal.activity}.</p>
        <p className="mt-2">
          {legal.companyName} n'exécute pas elle-même les travaux de serrurerie. L'artisan partenaire chargé de votre intervention vous est identifié
          avant celle-ci (dénomination, SIRET) ; il établit le devis et la facture de la prestation en son nom, répond de son exécution et est
          titulaire de ses propres assurances professionnelles.
        </p>
      </section>

      <section>
        <H>Hébergement</H>
        <p className="mt-3">{legal.host}. Le site est diffusé via le réseau de distribution de contenu Cloudflare.</p>
      </section>

      <section>
        <H>Propriété intellectuelle</H>
        <p className="mt-3">
          L'ensemble des contenus du site (textes, logo, mise en page) est la propriété de {legal.companyName} ou fait l'objet d'une autorisation
          d'utilisation. Les éventuelles marques de tiers citées sur le site appartiennent à leurs titulaires respectifs et sont mentionnées à titre
          informatif, sans lien d'affiliation ni parrainage. Toute reproduction sans autorisation écrite est interdite.
        </p>
      </section>

      <section>
        <H>Tarifs et devis</H>
        <p className="mt-3">
          Les tarifs affichés sont exprimés en euros toutes taxes comprises et constituent des tarifs de référence pour les prestations décrites.
          Toute intervention fait l'objet d'un devis écrit accepté par le client avant son exécution, conformément aux articles L. 111-1 et suivants
          du Code de la consommation et à l'arrêté du 24 janvier 2017 relatif à la publicité des prix des prestations de dépannage, réparation et
          entretien dans le secteur du bâtiment. Voir les <LegalLink to="/conditions-generales">conditions générales</LegalLink>.
        </p>
      </section>

      <section>
        <H>Réclamations et médiation</H>
        <p className="mt-3">
          Pour toute réclamation, écrivez {WRITE_TO}. Conformément aux articles L. 611-1 et suivants du Code de la consommation, le consommateur
          peut recourir gratuitement à un médiateur de la consommation
          {legal.mediator ? ` : ${legal.mediator}` : ", dont les coordonnées sont communiquées sur simple demande à l'adresse ci-dessus"}. Plateforme
          européenne de règlement en ligne des litiges : ec.europa.eu/consumers/odr.
        </p>
      </section>

      <section>
        <H>Données personnelles et cookies</H>
        <p className="mt-3">
          Voir la <LegalLink to="/politique-de-confidentialite">politique de confidentialité</LegalLink> et la{" "}
          <LegalLink to="/cookies">politique de cookies</LegalLink>.
        </p>
      </section>
    </LegalPage>
  );
}
