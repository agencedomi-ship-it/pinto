import { createFileRoute } from "@tanstack/react-router";
import { H, LegalPage } from "@/components/Legal";
import { LEGAL_ADDRESS, SITE, WRITE_TO } from "@/data/site";
import { breadcrumbSchema, canonical, ldScript } from "@/lib/seo";

const PATH = "/conditions-generales";

export const Route = createFileRoute("/conditions-generales")({
  head: () => ({
    meta: [
      { title: `Conditions générales | ${SITE.name}` },
      { name: "description", content: `Conditions générales du service ${SITE.name} : rôle de ${SITE.legal.companyName}, artisans partenaires, prix, devis, paiement, garanties, rétractation, réclamations.` },
    ],
    links: [canonical(PATH)],
    scripts: [ldScript(breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Conditions générales", path: PATH }]))],
  }),
  component: Page,
});

function Page() {
  const { legal } = SITE;
  const co = legal.companyName;
  return (
    <LegalPage
      title="Conditions générales"
      path={PATH}
      intro={`Service ${SITE.name}, exploité par ${co}, ${legal.legalForm}, ${LEGAL_ADDRESS}, ${legal.rcs}. Version du ${SITE.updatedOn}.`}
    >
      <section>
        <H>1. Objet et rôle de {co}</H>
        <p className="mt-3">
          {co} exploite la marque {SITE.name} et le présent site. Son rôle consiste à recevoir les demandes de dépannage et de travaux de serrurerie,
          à les qualifier par téléphone (nature du problème, adresse, urgence, tarif de référence) et à les confier à un artisan serrurier
          indépendant partenaire, sélectionné et référencé par {co}, qui intervient dans votre zone. Chaque zone dispose de son propre numéro
          d'appel.
        </p>
        <p className="mt-2">
          {co} n'exécute pas elle-même les prestations de serrurerie. Chaque intervention est réalisée par l'artisan partenaire, sous sa propre
          responsabilité, avec son propre matériel et ses propres assurances professionnelles. Le contrat de prestation est conclu entre vous et cet
          artisan.
        </p>
      </section>
      <section>
        <H>2. Identification de l'artisan partenaire</H>
        <p className="mt-3">
          Avant l'intervention, vous êtes informé de l'identité de l'artisan partenaire chargé de votre demande : dénomination, numéro SIRET et
          coordonnées. Ces informations figurent sur le devis et sur la facture qu'il vous remet. Les artisans partenaires s'engagent auprès de {co}{" "}
          à respecter les présentes conditions, la grille tarifaire publiée sur le site et les règles de vérification d'identité décrites à
          l'article 5.
        </p>
      </section>
      <section>
        <H>3. Prix</H>
        <p className="mt-3">
          Les prix affichés sur le site sont en euros TTC. Ils constituent la grille de référence que les artisans partenaires s'engagent à appliquer
          pour les prestations décrites. Le déplacement est facturé en supplément au tarif indiqué. Les pièces et fournitures sont facturées en
          supplément selon le matériel choisi. Une majoration peut s'appliquer la nuit, le week-end et les jours fériés selon la prestation ; elle vous
          est annoncée au téléphone avant tout déplacement. Conformément à l'arrêté du 24 janvier 2017 relatif à la publicité des prix des
          prestations de dépannage, réparation et entretien dans le secteur du bâtiment, le taux horaire, les frais de déplacement, les majorations
          et les conditions de facturation vous sont communiqués avant l'intervention.
        </p>
      </section>
      <section>
        <H>4. Devis</H>
        <p className="mt-3">
          Toute intervention fait l'objet d'un devis écrit, gratuit, établi par l'artisan partenaire et accepté par vous avant l'exécution des
          travaux. Le prix du devis ne peut excéder celui annoncé au téléphone pour la même prestation, sauf élément nouveau constaté sur place et
          accepté par écrit. Si un imprévu apparaît en cours d'intervention, l'exécution est suspendue et un avenant vous est proposé. Aucun
          supplément n'est facturé sans votre accord écrit préalable.
        </p>
      </section>
      <section>
        <H>5. Vérification d'identité</H>
        <p className="mt-3">
          Avant toute ouverture de porte ou de coffre, l'artisan demande une pièce d'identité et un justificatif de domicile ou de propriété, ou
          l'accord du propriétaire ou du gestionnaire. À défaut, l'intervention est refusée ; seul le déplacement peut être facturé s'il a été
          annoncé au téléphone.
        </p>
      </section>
      <section>
        <H>6. Droit de rétractation</H>
        <p className="mt-3">
          Pour les contrats conclus hors établissement, le consommateur dispose d'un délai de rétractation de 14 jours (art. L. 221-18 du Code de la
          consommation). Conformément à l'article L. 221-28 8°, ce droit ne s'applique pas aux travaux d'entretien ou de réparation à réaliser en
          urgence à votre domicile et expressément demandés par vous, dans la limite des pièces de rechange et travaux strictement nécessaires à
          l'urgence. Pour toute prestation non urgente (blindage, remplacement de porte, pose programmée), vous pouvez demander l'exécution avant la
          fin du délai en renonçant expressément à votre droit de rétractation sur le devis.
        </p>
      </section>
      <section>
        <H>7. Paiement</H>
        <p className="mt-3">
          Le paiement intervient en fin de prestation, auprès de l'artisan partenaire, par carte bancaire, espèces (dans les limites légales) ou
          virement. Une facture détaillée vous est remise. {co} ne perçoit aucun paiement de votre part.
        </p>
      </section>
      <section>
        <H>8. Garanties et responsabilité</H>
        <p className="mt-3">
          Les prestations bénéficient des garanties légales de conformité et des vices cachés, dues par l'artisan partenaire qui les a réalisées.
          Les serrures et cylindres posés bénéficient de la garantie du fabricant. La main d'œuvre est garantie selon les conditions indiquées sur
          le devis. {co} répond de la bonne qualification de votre demande et de sa transmission à un artisan référencé ; elle demeure votre
          interlocuteur en cas de difficulté avec l'artisan et s'engage à instruire toute réclamation.
        </p>
      </section>
      <section>
        <H>9. Réclamations, médiation, litiges</H>
        <p className="mt-3">
          Réclamations {WRITE_TO}. Conformément aux articles L. 611-1 et suivants du Code de la consommation, vous pouvez recourir gratuitement à un
          médiateur de la consommation
          {legal.mediator ? ` : ${legal.mediator}` : ", dont les coordonnées vous sont communiquées sur simple demande"}. Plateforme européenne de
          règlement des litiges : ec.europa.eu/consumers/odr. À défaut d'accord amiable, les tribunaux français sont compétents.
        </p>
      </section>
    </LegalPage>
  );
}
