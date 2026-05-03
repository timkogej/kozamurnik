export type Service = {
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string[];
  included: string[];
  relatedSlugs: string[];
  tags: string[];
};

export const services: Service[] = [
  {
    slug: "menjava-pnevmatik",
    title: "Menjava pnevmatik",
    icon: "Wrench",
    shortDesc: "Hitra in natančna menjava sezonskih pnevmatik s strokovnim osebjem.",
    longDesc: [
      "Menjava sezonskih pnevmatik je ena najpomembnejših varnostnih storitev, ki jo opravimo hitro in strokovno. Naši izkušeni tehniki poskrbijo, da je vsaka pnevmatika pravilno montirana in balansirana.",
      "Razpolagamo z moderno opremo za montažo in balansiranje pnevmatik, ki je primerna za vsa osebna in lahka tovorna vozila. Hitra storitev pomeni, da ste nazaj na cesti v najkrajšem možnem času.",
      "Po menjavi vam svetujemo glede pravilnega tlaka v pnevmatikah in rednega vzdrževanja, da zagotovite varno in ekonomično vožnjo skozi celotno sezono.",
    ],
    included: [
      "Montaža novih ali sezonskih pnevmatik",
      "Balansiranje vseh štirih koles",
      "Preverjanje in nastavitev tlaka v pnevmatikah",
      "Pregled platišč in ventilčkov",
      "Shranjevanje starih pnevmatik (opcijsko)",
      "Strokovno svetovanje o stanju pnevmatik",
    ],
    relatedSlugs: ["vulkanizerstvo", "centriranje-koles", "shranjevanje-pnevmatik"],
    tags: ["montaza", "sezonska"],
  },
  {
    slug: "vulkanizerstvo",
    title: "Vulkanizerstvo",
    icon: "Disc3",
    shortDesc: "Popravilo pnevmatik, montaža, balansiranje in servis platišč.",
    longDesc: [
      "Vulkanizerstvo zajema vse storitve popravila in vzdrževanja pnevmatik. Od popravila prebodene pnevmatike do zamenjave ventila in servisa platišč — rešimo vsak problem hitro in zanesljivo.",
      "Naši vulkanizerji imajo bogate izkušnje z vsemi vrstami pnevmatik, od osebnih do lahkih tovornih vozil. Uporabljamo preverjene materiale in postopke, ki zagotavljajo dolgotrajno popravilo.",
      "Pri nas lahko popravljamo tubeless pnevmatike, zamenjamo ventile in opravimo celoten servis platišč. V primeru, da popravilo ni možno, vam pomagamo izbrati primerno nadomestno pnevmatiko.",
    ],
    included: [
      "Popravilo prebodene ali poškodovane pnevmatike",
      "Zamenjava ventilov",
      "Montaža tubeless pnevmatik",
      "Balansiranje po popravilu",
      "Servis in čiščenje platišč",
      "Pregled in ocena stanja pnevmatike",
    ],
    relatedSlugs: ["menjava-pnevmatik", "centriranje-koles", "shranjevanje-pnevmatik"],
    tags: ["popravilo", "servis"],
  },
  {
    slug: "centriranje-koles",
    title: "Centriranje koles",
    icon: "Target",
    shortDesc: "Natančno 3D centriranje za varno vožnjo in dolgotrajnost pnevmatik.",
    longDesc: [
      "Pravilna geometrija koles je ključna za varno vožnjo, ekonomično porabo goriva in enakomerno obrabo pnevmatik. Z našo sodobno 3D napravo za centriranje zagotovimo natančno nastavitev.",
      "Napačna geometrija koles povzroča neenakomerno obrabo pnevmatik, slabšo stabilnost vozila pri višjih hitrostih in povečano porabo goriva. Centriranje priporočamo po vsaki menjavi pnevmatik ali po trčenju.",
      "Postopek traja le 30–45 minut in vam zagotovi mirno vožnjo, boljši oprijem in daljšo življenjsko dobo pnevmatik. Preverimo in nastavimo konvergenco, kamber in kaseto.",
    ],
    included: [
      "3D meritev geometrije vseh štirih koles",
      "Nastavitev konvergence spredaj in zadaj",
      "Nastavitev kambra (kjer je možno)",
      "Nastavitev kasete (kjer je možno)",
      "Poročilo o stanju pred in po centriranju",
      "Preverjanje vzmeti in amortizatorjev",
    ],
    relatedSlugs: ["menjava-pnevmatik", "vulkanizerstvo", "mini-servis"],
    tags: ["geometrija", "nastavitev"],
  },
  {
    slug: "mini-servis",
    title: "Mini servis",
    icon: "Settings",
    shortDesc: "Osnovni pregled vozila, menjava olja, filtrov in drobnih servisnih del.",
    longDesc: [
      "Mini servis je idealen za redno vzdrževanje vozila brez dolge čakalne dobe in visokih stroškov. V enem obisku opravimo vse ključne servisne naloge za brezskrbno vožnjo.",
      "Menjava motornega olja, oljnega filtra, pregled filtrov za zrak in kabino ter preverjanje vseh ključnih tekočin — to je osnova, ki jo priporočamo vsakih 10.000–15.000 km ali enkrat letno.",
      "Naši tehniki opravijo tudi vizualni pregled zavor, vzmetenja in ključnih komponent vozila. V primeru odkritih napak vas takoj obvestimo in svetujemo glede nadaljnjih ukrepov.",
    ],
    included: [
      "Menjava motornega olja in oljnega filtra",
      "Preverjanje in polnjenje vseh tekočin",
      "Pregled filtrov (zrak, kabina)",
      "Vizualni pregled zavorne opreme",
      "Preverjanje svetlobne opreme",
      "Pregled ključnih komponent vzmetenja",
    ],
    relatedSlugs: ["centriranje-koles", "menjava-pnevmatik", "vulkanizerstvo"],
    tags: ["vzdrzevanje", "servis"],
  },
  {
    slug: "shranjevanje-pnevmatik",
    title: "Shranjevanje pnevmatik",
    icon: "Warehouse",
    shortDesc: "Varno sezonsko shranjevanje vaših pnevmatik v naših prostorih.",
    longDesc: [
      "Pravilno shranjevanje pnevmatik je ključno za njihovo dolgotrajnost in ohranitev lastnosti. V naših suhotnih in temperaturno nadzorovanih prostorih so vaše pnevmatike varno shranjene do naslednje sezone.",
      "Vsak komplet pnevmatik je osebno označen in shranjen v optimalnih razmerah — zaščiten pred UV žarki, vlago in temperaturnimi nihanji. Ob naslednjem obisku so pripravljene in čakajo na vas.",
      "Shranjevanje pnevmatik kombiniramo z menjavo, kar pomeni, da v enem obisku menjamo in shranimo staro garnituro — brez skrbi z logistiko do naslednje sezone.",
    ],
    included: [
      "Shranjevanje v suhih, temperaturno nadzorovanih prostorih",
      "Osebno označevanje in sledljivost vsakega kompleta",
      "Zaščita pred UV žarki in vlago",
      "Preverjanje stanja pnevmatik ob prevzemu",
      "Sezonska obvestila za menjavo",
      "Možnost kombinacije z menjavo pnevmatik",
    ],
    relatedSlugs: ["menjava-pnevmatik", "vulkanizerstvo", "centriranje-koles"],
    tags: ["shranjevanje", "sezonska"],
  },
  {
    slug: "avtovleka",
    title: "Avtovleka 24/7",
    icon: "Truck",
    shortDesc: "Domači in mednarodni prevozi vseh vrst vozil, 24 ur na dan.",
    longDesc: [
      "Naša avtovleka je na voljo 24 ur na dan, 7 dni v tednu, 365 dni v letu. Hitro in zanesljivo pridemo na vsako lokacijo v Sloveniji in sosednjih državah.",
      "Opravljamo domače in mednarodne prevoze osebnih in lahkih tovornih vozil, rešujemo poškodovana vozila in zagotavljamo nadomestne rešitve v primeru nesreče ali okvare.",
      "Smo asistenčni pogodbenik zavarovalnic Triglav, Slovenica, Adriatic in CORIS. V primeru nujne potrebe pokličite 041 607 298 — smo dosegljivi vsak dan.",
    ],
    included: [
      "Domači in mednarodni prevozi osebnih vozil",
      "Prevoz lahkih tovornih vozil",
      "Reševanje poškodovanih in pokvarjenih vozil",
      "Asistenca zavarovalnic (Triglav, Slovenica, Adriatic, CORIS)",
      "Možnost nadomestnega vozila",
      "Shranjevanje vozil",
    ],
    relatedSlugs: [],
    tags: ["avtovleka", "nujno"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
