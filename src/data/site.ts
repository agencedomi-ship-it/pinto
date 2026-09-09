/**
 * Identité du site et de l'éditeur. Modèle : BOOSTORA exploite la marque Mr Pinto Serrurier,
 * reçoit et qualifie les demandes, puis les confie à des artisans serruriers indépendants partenaires.
 */
export const SITE = {
  name: "Mr Pinto Serrurier",
  /** Adresse publique du site (canoniques, plan de site, JSON-LD). */
  url: "https://mr-pinto-serrurier.fr",
  /** À renseigner dès qu.une boîte contact@mr-pinto-serrurier.fr existe ; tant que vide, le contact se fait par téléphone ou courrier. */
  email: "",
  gtmId: "GTM-KHCMQD2M",
  hours: "Service téléphonique : 24h/24, 7j/7",
  priceNote: "Tarif de référence TTC. Un devis écrit vous est remis avant toute intervention et confirme le prix exact.",
  legal: {
    companyName: "BOOSTORA",
    legalForm: "Société par actions simplifiée (SAS)",
    capital: "1 000,00 €",
    siren: "106 261 472",
    siret: "106 261 472 00018",
    rcs: "RCS Paris 106 261 472",
    vat: "FR39106261472",
    naf: "82.99Z",
    createdOn: "15 juin 2026",
    manager: "Quentin Deslandes, Président",
    street: "30 boulevard de Sébastopol",
    postalCode: "75004",
    city: "Paris",
    host: "Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, États-Unis",
    /** Médiateur de la consommation ; tant que vide, une formule d'attente est affichée. */
    mediator: "",
    activity:
      "exploite la marque Mr Pinto Serrurier, réceptionne et qualifie les demandes d'intervention, puis les confie à des artisans serruriers indépendants partenaires, référencés par ses soins, qui réalisent les prestations sous leur propre responsabilité",
  },
  updatedOn: "9 septembre 2026",
} as const;

export const LEGAL_ADDRESS = `${SITE.legal.street}, ${SITE.legal.postalCode} ${SITE.legal.city}`;

/** Formule de contact pour les pages légales : email s'il existe, sinon courrier au siège. */
export const WRITE_TO = SITE.email ? `à ${SITE.email}` : `par courrier au siège de ${SITE.legal.companyName}, ${LEGAL_ADDRESS}`;

/** Un paragraphe propre à chaque zone, affiché sur la page de zone. */
export const ZONE_INTROS: Record<string, string> = {
  "paris-75":
    "À Paris, la majorité des demandes concerne des portes claquées d'appartement et des cylindres à remplacer après une perte de clés, souvent dans des immeubles anciens avec des portes palières équipées de serrures multipoints. Les artisans partenaires sont répartis dans les arrondissements pour limiter le temps de trajet en zone dense.",
  "ile-de-france":
    "En Île-de-France, les interventions alternent entre pavillons, résidences récentes et immeubles collectifs. Les demandes fréquentes : ouverture de porte de pavillon, remplacement de serrure de porte de garage, sécurisation après effraction. Les artisans partenaires couvrent les sept départements de la petite et de la grande couronne.",
  bretagne:
    "Dans l'Ouest, de Nantes à Rennes en passant par le littoral vendéen et morbihannais, les artisans partenaires interviennent sur des maisons individuelles, des résidences secondaires et des commerces de centre-ville. La sécurisation de résidences inoccupées hors saison est une demande courante.",
  occitanie:
    "En Occitanie, entre Nîmes et Montpellier, les demandes portent sur l'ouverture de portes d'appartement, le changement de serrures sur des portes anciennes en bois et le renforcement de portes de villas. Les artisans partenaires sont sollicités dans le Gard et l'Hérault.",
  "cote-azur":
    "Sur la Côte d'Azur, de Nice à Toulon, une part importante des demandes concerne des résidences secondaires et des locations saisonnières : ouverture après perte de clés, remplacement de cylindres et sécurisation de portes-fenêtres. Les artisans partenaires couvrent les Alpes-Maritimes et le Var.",
  "grand-est":
    "Dans le Bas-Rhin et le Haut-Rhin, de Strasbourg à Mulhouse, les artisans partenaires interviennent sur des portes d'entrée souvent équipées de serrures à cylindre européen et de portes blindées de type alsacien. Les demandes de sécurisation après effraction et de porte claquée sont les plus fréquentes.",
  ouest:
    "De La Rochelle à Bordeaux, Agen et Toulouse, en passant par la Dordogne, les artisans partenaires couvrent des zones urbaines et rurales. Les demandes concernent des maisons de ville, des échoppes bordelaises et des propriétés isolées, avec un besoin marqué de sécurisation des dépendances et des portes anciennes.",
};
