export type City = { name: string; slug: string };
export type Department = { code: string; name: string; cities: City[] };
export type Zone = {
  slug: string;
  label: string;
  short: string;
  codes: string;
  departments: Department[];
};

const slugify = (s: string) =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const mk = (names: string[]): City[] => names.map((n) => ({ name: n, slug: slugify(n) }));

const PARIS_ARR = mk(
  Array.from({ length: 20 }, (_, i) => `Paris ${i + 1}${i === 0 ? "er" : "e"}`)
);

export const ZONES: Zone[] = [
  {
    slug: "paris-75",
    label: "Paris",
    short: "Paris 75",
    codes: "75",
    departments: [
      { code: "75", name: "Paris", cities: PARIS_ARR },
    ],
  },
  {
    slug: "ile-de-france",
    label: "Île-de-France",
    short: "Île-de-France",
    codes: "77 · 78 · 91 · 92 · 93 · 94 · 95",
    departments: [
      { code: "77", name: "Seine-et-Marne", cities: mk(["Meaux","Chelles","Melun","Pontault-Combault","Savigny-le-Temple","Champs-sur-Marne","Torcy","Lagny-sur-Marne"]) },
      { code: "78", name: "Yvelines", cities: mk(["Versailles","Sartrouville","Mantes-la-Jolie","Saint-Germain-en-Laye","Poissy","Conflans-Sainte-Honorine","Houilles","Les Mureaux"]) },
      { code: "91", name: "Essonne", cities: mk(["Évry-Courcouronnes","Massy","Corbeil-Essonnes","Savigny-sur-Orge","Sainte-Geneviève-des-Bois","Athis-Mons","Palaiseau","Viry-Châtillon"]) },
      { code: "92", name: "Hauts-de-Seine", cities: mk(["Boulogne-Billancourt","Nanterre","Courbevoie","Colombes","Asnières-sur-Seine","Rueil-Malmaison","Issy-les-Moulineaux","Levallois-Perret"]) },
      { code: "93", name: "Seine-Saint-Denis", cities: mk(["Saint-Denis","Montreuil","Aubervilliers","Aulnay-sous-Bois","Drancy","Noisy-le-Grand","Bondy","Bobigny"]) },
      { code: "94", name: "Val-de-Marne", cities: mk(["Créteil","Vitry-sur-Seine","Champigny-sur-Marne","Saint-Maur-des-Fossés","Ivry-sur-Seine","Maisons-Alfort","Villejuif","Fontenay-sous-Bois"]) },
      { code: "95", name: "Val-d'Oise", cities: mk(["Argenteuil","Cergy","Sarcelles","Garges-lès-Gonesse","Pontoise","Franconville","Goussainville","Ermont"]) },
    ],
  },
  {
    slug: "bretagne",
    label: "Bretagne & Grand Ouest",
    short: "Bretagne",
    codes: "44 · 85 · 56 · 35 · 49",
    departments: [
      { code: "44", name: "Loire-Atlantique", cities: mk(["Nantes","Saint-Nazaire","Saint-Herblain","Rezé","Saint-Sébastien-sur-Loire","Orvault","Vertou","La Baule-Escoublac"]) },
      { code: "85", name: "Vendée", cities: mk(["La Roche-sur-Yon","Les Sables-d'Olonne","Challans","Fontenay-le-Comte","Les Herbiers","Luçon","Saint-Hilaire-de-Riez","Olonne-sur-Mer"]) },
      { code: "56", name: "Morbihan", cities: mk(["Lorient","Vannes","Lanester","Hennebont","Ploemeur","Auray","Pontivy","Guidel"]) },
      { code: "35", name: "Ille-et-Vilaine", cities: mk(["Rennes","Saint-Malo","Fougères","Cesson-Sévigné","Bruz","Vitré","Redon","Saint-Jacques-de-la-Lande"]) },
      { code: "49", name: "Maine-et-Loire", cities: mk(["Angers","Cholet","Saumur","Trélazé","Avrillé","Les Ponts-de-Cé","Beaucouzé","Saint-Barthélemy-d'Anjou"]) },
    ],
  },
  {
    slug: "occitanie",
    label: "Occitanie",
    short: "Occitanie",
    codes: "30 · 34 · 31 · 81",
    departments: [
      { code: "30", name: "Gard", cities: mk(["Nîmes","Alès","Bagnols-sur-Cèze","Beaucaire","Vauvert","Saint-Gilles","Pont-Saint-Esprit","Villeneuve-lès-Avignon"]) },
      { code: "34", name: "Hérault", cities: mk(["Montpellier","Béziers","Sète","Lunel","Agde","Frontignan","Lattes","Mauguio"]) },
      { code: "31", name: "Haute-Garonne", cities: mk(["Toulouse","Colomiers","Tournefeuille","Muret","Blagnac","Saint-Orens-de-Gameville","Cugnaux","Balma"]) },
      { code: "81", name: "Tarn", cities: mk(["Albi","Castres","Gaillac","Graulhet","Mazamet","Lavaur","Carmaux","Saint-Juéry"]) },
    ],
  },
  {
    slug: "cote-azur",
    label: "Côte d'Azur",
    short: "Côte d'Azur",
    codes: "06 · 83",
    departments: [
      { code: "06", name: "Alpes-Maritimes", cities: mk(["Nice","Antibes","Cannes","Grasse","Cagnes-sur-Mer","Le Cannet","Menton","Saint-Laurent-du-Var"]) },
      { code: "83", name: "Var", cities: mk(["Toulon","La Seyne-sur-Mer","Hyères","Fréjus","Draguignan","Six-Fours-les-Plages","La Garde","Saint-Raphaël"]) },
    ],
  },
];

export const ALL_CITIES: { city: City; dept: Department; zone: Zone }[] = ZONES.flatMap((z) =>
  z.departments.flatMap((d) => d.cities.map((c) => ({ city: c, dept: d, zone: z })))
);

export function findCity(slug: string) {
  return ALL_CITIES.find((c) => c.city.slug === slug);
}

export function findZone(slug: string) {
  return ZONES.find((z) => z.slug === slug);
}

export const PHONE_DISPLAY = "07 75 47 67 77";
export const PHONE_TEL = "+33775476777";
