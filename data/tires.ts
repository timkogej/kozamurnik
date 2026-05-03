export type TireCategory = {
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string[];
  whenToUse: string;
  keyConsiderations: string[];
  tips: { title: string; text: string }[];
  relatedServices: string[];
  imagePath?: string;
};

export const tireCategories: TireCategory[] = [
  {
    slug: "letne",
    title: "Letne pnevmatike",
    icon: "Sun",
    shortDesc: "Optimalne za suhe in mokre ceste pri temperaturah nad 7 °C.",
    longDesc: [
      "Letne pnevmatike so zasnovane za zagotavljanje najboljšega oprijema na suhi in mokri podlagi pri temperaturah nad 7 °C. Njihova mešanica gume in posebni profili zagotavljajo kratko zavorno pot in odlično stabilnost pri višjih hitrostih.",
      "V primerjavi z zimskimi pnevmatikami imajo letne nižji upor kotrljanja, kar pomeni manjšo porabo goriva in manjši hrup med vožnjo. Idealne so za poletno vožnjo po asfaltu in krajše prevoze v mestnem prometu.",
    ],
    whenToUse:
      "Ko povprečne dnevne temperature stabilno presežejo 7 °C — praviloma od sredine marca do sredine oktobra.",
    keyConsiderations: [
      "Preverite indeks hitrosti in nosivosti glede na vaše vozilo",
      "Primerne širine in profila pnevmatike za vaše platišče",
      "Oznake za ekonomičnost goriva in raven hrupa (EU etiketa)",
      "Datum proizvodnje (DOT oznaka) — svežja je boljša",
    ],
    tips: [
      {
        title: "Kdaj menjati",
        text: "Letne pnevmatike je priporočeno zamenjati, ko globina profila pade pod 3 mm. Zakonski minimum je 1,6 mm, a varnostno priporočilo je 3 mm.",
      },
      {
        title: "Kako izbrati",
        text: "Upoštevajte oznake v prometnem dovoljenju, vrsto vozila in pretežni vzorec vožnje. Naši svetovalci vam pomagajo pri izbiri.",
      },
      {
        title: "Vzdrževanje",
        text: "Redno preverjajte tlak (enkrat mesečno), rotacijo pnevmatik vsakih 10.000 km in vizualni pregled poškodb.",
      },
    ],
    relatedServices: ["menjava-pnevmatik", "shranjevanje-pnevmatik"],
    imagePath: "/images/brands/letne.jpg",
  },
  {
    slug: "zimske",
    title: "Zimske pnevmatike",
    icon: "Snowflake",
    shortDesc: "Nujne za varen prihod v hladnih razmerah — pod 7 °C.",
    longDesc: [
      "Zimske pnevmatike so razvite za zagotavljanje varnosti in nadzora v zimskih razmerah — na snegu, ledu in mokrih cestah pri nizkih temperaturah. Posebna gumena mešanica ostane mehka tudi pri nizkih temperaturah, kar zagotavlja dober oprijem.",
      "V primerjavi z letnimi ali celoletnimi pnevmatikami imajo zimske bistveno krajšo zavorno pot na snegu in ledu. V skladu s slovensko zakonodajo je obvezna zimska oprema (zimske pnevmatike ali verige) od 15. novembra do 15. marca.",
    ],
    whenToUse:
      "Ko povprečne dnevne temperature padejo pod 7 °C — praviloma od sredine oktobra do sredine marca.",
    keyConsiderations: [
      "Oznaka M+S in/ali snežinka — pravna veljavnost za zimske razmere",
      "3PMSF oznaka (Three Peak Mountain Snow Flake) za boljše zimske lastnosti",
      "Preverite, ali je vozilo primerno za zimske pnevmatike z jeklenimi vzmetmi",
      "Nadomestno kolo ali kit za popravilo pnevmatik",
    ],
    tips: [
      {
        title: "Kdaj menjati",
        text: "Na zimske menjamo, ko temperature padejo pod 7 °C — ne čakajte na prvi sneg. Na letne menjamo, ko se temperature stabilno dvignejo nad 7 °C.",
      },
      {
        title: "Kako izbrati",
        text: "Zimske pnevmatike izberite glede na pogostost zimske vožnje in terenske razmere. Za mestno vožnjo zadostuje M+S, za gorske predele priporočamo 3PMSF oznako.",
      },
      {
        title: "Vzdrževanje",
        text: "Zimske pnevmatike shranjujte v suhem in temnem prostoru. Za optimalno shranjevanje izkoristite naš hotel za pnevmatike.",
      },
    ],
    relatedServices: ["menjava-pnevmatik", "shranjevanje-pnevmatik"],
    imagePath: "/images/brands/zimske.jpg",
  },
  {
    slug: "celoletne",
    title: "Celoletne pnevmatike",
    icon: "RefreshCw",
    shortDesc: "Kompromis za zmerne podnebne razmere — eno leto, ene pnevmatike.",
    longDesc: [
      "Celoletne pnevmatike so zasnovane kot kompromis med letnimi in zimskimi — primerne za zmerne podnebne razmere, kjer zime niso ekstremne. Ponujajo zadovoljivo zmogljivost v večini vremenskih razmer.",
      "Čeprav celoletne pnevmatike v nobeni sezoni ne dosežejo zmogljivosti specializiranih letnih ali zimskih pnevmatik, so praktična rešitev za tiste, ki se ne želijo ukvarjati z menjavo sezonskih pnevmatik.",
    ],
    whenToUse:
      "Primerne za mesta z zmernimi zimami (brez dolgotrajnega snega) in zmerno letno vožnjo.",
    keyConsiderations: [
      "Preverite oznako 3PMSF — zahteva za zasnežene ceste",
      "Primernost za zmerne temperaturne razmere (od -10 °C do +30 °C)",
      "Višja gumena mešanica pomeni višjo ceno v primerjavi z zimskimi",
      "Niso optimalne za ekstremne poletne ali zimske razmere",
    ],
    tips: [
      {
        title: "Za koga so primerne",
        text: "Priporočene za mestne voznike z zmernimi zimami, ki letno prevozijo manj kot 20.000 km in ne vozijo v gorskih predelih.",
      },
      {
        title: "Prednosti",
        text: "Ni treba menjati pnevmatik dvakrat letno, nižji skupni strošek za tiste z manj kilometrine.",
      },
      {
        title: "Slabosti",
        text: "V ekstremnih poletnih ali zimskih razmerah zaostajajo za specializiranimi pnevmatikami. Za varne vozne razmere priporočamo sezonske.",
      },
    ],
    relatedServices: ["menjava-pnevmatik", "vulkanizerstvo"],
    imagePath: "/images/brands/celoletne.jpg",
  },
  {
    slug: "tovorne",
    title: "Tovorne pnevmatike",
    icon: "Truck",
    shortDesc: "Pnevmatike za tovorna vozila, kombije in gospodarska vozila.",
    longDesc: [
      "Tovorne pnevmatike so zasnovane za večje obremenitve in daljšo življenjsko dobo v zahtevnih pogojih. Primerne so za kombije, lahka tovorna vozila, traktorje in gradbene stroje.",
      "Glede na namen ločimo ceste pnevmatike (za asfalt), terenske (za mešan teren) in specializirane (za gradbišča). Pravilna izbira pnevmatike je ključna za varnost in ekonomičnost prevozov.",
    ],
    whenToUse: "Za vsa gospodarska in tovorna vozila, kombije in specialna vozila.",
    keyConsiderations: [
      "Indeks nosivosti mora ustrezati polni obremenitvi vozila",
      "Tip pnevmatike glede na pretežni teren (cesta, teren, mešano)",
      "Sezonska ali celoletna izvedba glede na področje delovanja",
      "Preverite mere in primernost za vaše platišče",
    ],
    tips: [
      {
        title: "Pravilna izbira",
        text: "Upoštevajte maksimalno obremenitev vozila in pretežno podlago. Pri dvoosnih vozilih sta prednji in zadnji tip pnevmatike pogosto različna.",
      },
      {
        title: "Vzdrževanje",
        text: "Redno preverjajte tlak (trikrat mesečno pri tovornih) in globino profila. Pri tovornih vozilih je dovoljeni minimum profila 1 mm.",
      },
      {
        title: "Menjava",
        text: "Povprečna življenjska doba tovornih pnevmatik je 3–5 let pri normalnem vzdrževanju in polni obremenitvi.",
      },
    ],
    relatedServices: ["menjava-pnevmatik", "vulkanizerstvo"],
    imagePath: "/images/brands/tovorne.jpg",
  },
  {
    slug: "motoristicne",
    title: "Motoristične pnevmatike",
    icon: "Bike",
    shortDesc: "Pnevmatike za motorje in motorna kolesa vseh kategorij.",
    longDesc: [
      "Motoristične pnevmatike zahtevajo posebno pozornost pri izbiri in montaži — od pravilnih mer do ustreznega tlaka in profila. Varnost motorista je v celoti odvisna od stanja pnevmatik.",
      "Glede na namen ločimo cestne, sportne, touring in terenske motoristične pnevmatike. Vsaka vrsta je optimizirana za drugačen slog vožnje in podlago.",
    ],
    whenToUse: "Za vse kategorije motorjev — od mopedov do sportnih in tourer motorjev.",
    keyConsiderations: [
      "Prednja in zadnja pnevmatika morata biti iste znamke in serije",
      "Preverite smer vrtenja pnevmatike (puščica na bočnem delu)",
      "Indeks hitrosti in nosivosti glede na kategorijo motorja",
      "Pri starih pnevmatikah preverite datum proizvodnje (DOT oznaka)",
    ],
    tips: [
      {
        title: "Kdaj menjati",
        text: "Motoristične pnevmatike menjajte, ko globina profila pade pod 2 mm (cestne) ali ko opazite neenakomerno obrabo ali razpoke.",
      },
      {
        title: "Tlak",
        text: "Tlak v motoristični pnevmatiki preverjajte pred vsako vožnjo, ko je pnevmatika hladna. Napačen tlak bistveno vpliva na oprijem in varnost.",
      },
      {
        title: "Sezona",
        text: "Preden motor parkingujete za zimo, pnevmatike napolnite na priporočen tlak in jih zaščitite pred UV žarki.",
      },
    ],
    relatedServices: ["menjava-pnevmatik", "vulkanizerstvo"],
    imagePath: "/images/brands/motorne.jpg",
  },
  {
    slug: "konfigurator-platisc",
    imagePath: "/images/brands/konfigurator-screenshot.jpg",
    title: "Konfigurator platišč",
    icon: "Layers",
    shortDesc: "Konfigurirajte si idealna platišča za vaše vozilo z našim spletnim orodjem.",
    longDesc: [
      "S pomočjo našega spletnega konfiguriatorja platišč lahko poiščete optimalna platišča za vaše vozilo. Orodje upošteva znamko, model, letnik in motor vozila ter vam prikaže vse kompatibilne platišče.",
      "Konfigurator je preprost za uporabo in vam prihrani čas pri iskanju pravilnih platišč. Izberite med aluminjastimi, jeklenimi in specializiranimi platišči vodilnih znamk.",
    ],
    whenToUse: "Ko iščete nova platišča za vaše vozilo in ne poznate točnih mer.",
    keyConsiderations: [
      "Preverite PCD (pitch circle diameter) — razporeditev vijakov",
      "Sredinska luknja mora ustrezati vozilu ali biti primerno oblikana z adapterji",
      "ET vrednost (offset) vpliva na videz in obnašanje vozila",
      "Upoštevajte širino in premer platišča glede na pnevmatike",
    ],
    tips: [
      {
        title: "Kako konfigurator deluje",
        text: "Vnesite registrsko oznako ali izberite vozilo po korakih (znamka, model, letnik, motor). Konfigurator prikaže vse kompatibilne platišče.",
      },
      {
        title: "Po konfiguraciji",
        text: "Ko najdete primerna platišča, nas kontaktirajte ali rezervirajte termin. Montažo opravimo pri nas.",
      },
      {
        title: "Svetovanje",
        text: "Niste prepričani? Pokličite nas na 041 607 298 ali pišite. Naši strokovnjaki vam pomagajo pri izbiri.",
      },
    ],
    relatedServices: ["menjava-pnevmatik", "centriranje-koles"],
  },
];

export function getTireCategoryBySlug(slug: string): TireCategory | undefined {
  return tireCategories.find((t) => t.slug === slug);
}
