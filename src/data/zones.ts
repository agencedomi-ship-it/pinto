export type City = { name: string; slug: string };
export type Department = { code: string; name: string; cities: City[] };
export type Phone = { display: string; tel: string };
export type Zone = {
  slug: string;
  label: string;
  short: string;
  codes: string;
  /** Numéro régional affiché sur les pages de la zone et de ses villes. Absent = numéro national. */
  phone?: Phone;
  departments: Department[];
};

const PHONE_01: Phone = { display: "01 85 42 06 70", tel: "+33185420670" };
const PHONE_02: Phone = { display: "02 78 77 67 80", tel: "+33278776780" };
const PHONE_03: Phone = { display: "03 10 96 02 90", tel: "+33310960290" };
const PHONE_04: Phone = { display: "04 22 13 25 10", tel: "+33422132510" };
const PHONE_05: Phone = { display: "05 64 57 01 50", tel: "+33564570150" };

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
    phone: PHONE_01,
    departments: [
      { code: "75", name: "Paris", cities: PARIS_ARR },
    ],
  },
  {
    slug: "ile-de-france",
    label: "Île-de-France",
    short: "Île-de-France",
    codes: "77 · 78 · 91 · 92 · 93 · 94 · 95",
    phone: PHONE_01,
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
    codes: "35 · 44 · 49 · 56 · 85",
    phone: PHONE_02,
    departments: [
      { code: "35", name: "Ille-et-Vilaine", cities: mk(["Rennes","Saint-Malo","Fougères","Cesson-Sévigné","Bruz","Vitré","Redon","Saint-Jacques-de-la-Lande"]) },
      { code: "44", name: "Loire-Atlantique", cities: mk(["Nantes","Saint-Nazaire","Saint-Herblain","Rezé","Saint-Sébastien-sur-Loire","Orvault","Vertou","La Baule-Escoublac"]) },
      { code: "49", name: "Maine-et-Loire", cities: mk(["Angers","Cholet","Saumur","Trélazé","Avrillé","Les Ponts-de-Cé","Beaucouzé","Saint-Barthélemy-d'Anjou"]) },
      { code: "56", name: "Morbihan", cities: mk(["Lorient","Vannes","Lanester","Hennebont","Ploemeur","Auray","Pontivy","Guidel"]) },
      { code: "85", name: "Vendée", cities: mk(["La Roche-sur-Yon","Les Sables-d'Olonne","Challans","Fontenay-le-Comte","Les Herbiers","Luçon","Saint-Hilaire-de-Riez","Olonne-sur-Mer"]) },
    ],
  },
  {
    slug: "grand-est",
    label: "Grand Est",
    short: "Grand Est",
    codes: "67 · 68",
    phone: PHONE_03,
    departments: [
      { code: "67", name: "Bas-Rhin", cities: mk(["Strasbourg","Haguenau","Schiltigheim","Illkirch-Graffenstaden","Sélestat","Bischheim","Lingolsheim","Saverne"]) },
      { code: "68", name: "Haut-Rhin", cities: mk(["Mulhouse","Colmar","Saint-Louis","Illzach","Wittenheim","Rixheim","Kingersheim","Guebwiller"]) },
    ],
  },
  {
    slug: "occitanie",
    label: "Occitanie",
    short: "Occitanie",
    codes: "30 · 34",
    phone: PHONE_04,
    departments: [
      { code: "30", name: "Gard", cities: mk(["Nîmes","Alès","Bagnols-sur-Cèze","Beaucaire","Vauvert","Saint-Gilles","Pont-Saint-Esprit","Villeneuve-lès-Avignon"]) },
      { code: "34", name: "Hérault", cities: mk(["Montpellier","Béziers","Sète","Lunel","Agde","Frontignan","Lattes","Mauguio"]) },
    ],
  },
  {
    slug: "cote-azur",
    label: "Côte d'Azur",
    short: "Côte d'Azur",
    codes: "06 · 83",
    phone: PHONE_04,
    departments: [
      { code: "06", name: "Alpes-Maritimes", cities: mk(["Nice","Antibes","Cannes","Grasse","Cagnes-sur-Mer","Le Cannet","Menton","Saint-Laurent-du-Var"]) },
      { code: "83", name: "Var", cities: mk(["Toulon","La Seyne-sur-Mer","Hyères","Fréjus","Draguignan","Six-Fours-les-Plages","La Garde","Saint-Raphaël"]) },
    ],
  },
  {
    slug: "ouest",
    label: "Ouest",
    short: "Ouest",
    codes: "17 · 24 · 31 · 33 · 47",
    phone: PHONE_05,
    departments: [
      { code: "17", name: "Charente-Maritime", cities: mk(["La Rochelle","Saintes","Rochefort","Royan","Aytré","Tonnay-Charente","Saint-Jean-d'Angély","Périgny"]) },
      { code: "24", name: "Dordogne", cities: mk(["Périgueux","Bergerac","Boulazac Isle Manoire","Sarlat-la-Canéda","Coulounieix-Chamiers","Trélissac","Terrasson-Lavilledieu","Nontron"]) },
      { code: "31", name: "Haute-Garonne", cities: mk(["Toulouse","Colomiers","Tournefeuille","Muret","Blagnac","Saint-Orens-de-Gameville","Cugnaux","Balma"]) },
      { code: "33", name: "Gironde", cities: mk(["Bordeaux","Mérignac","Pessac","Talence","Villenave-d'Ornon","Saint-Médard-en-Jalles","Bègles","La Teste-de-Buch"]) },
      { code: "47", name: "Lot-et-Garonne", cities: mk(["Agen","Villeneuve-sur-Lot","Marmande","Le Passage","Tonneins","Boé","Nérac","Sainte-Livrade-sur-Lot"]) },
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

/** Numéro national (accueil et zones sans numéro régional). */
export const PHONE_DISPLAY = "01 85 42 06 70";
export const PHONE_TEL = "+33185420670";
export const NATIONAL_PHONE: Phone = { display: PHONE_DISPLAY, tel: PHONE_TEL };
