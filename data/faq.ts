export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  tags: ("general" | "tires" | "service" | "towing")[];
};

export const faqItems: FaqItem[] = [
  {
    id: "f1",
    question: "Kdaj je pravi čas za menjavo pnevmatik?",
    answer:
      "Po priporočilih menjavo na zimske pnevmatike opravimo med 15. oktobrom in 15. marcem, ko povprečne dnevne temperature padejo pod 7 °C. Na letne pnevmatike menjamo, ko se temperature stabilno dvignejo nad 7 °C. Pravilo palca: 'Ob O in ob M' — Oktober/November za zimske, Marec/April za letne.",
    tags: ["general", "tires"],
  },
  {
    id: "f2",
    question: "Ali je rezervacija termina obvezna?",
    answer:
      "Rezervacija ni obvezna, a jo močno priporočamo — posebej v sezoni (oktober/november in mars/april), ko se termini hitro zapolnijo. Spletna rezervacija je najhitrejši in najpreprostejši način. V kolikor prihajate brez termina, vas bomo poskusili sprejeti čim prej, a čakalna doba je lahko daljša.",
    tags: ["general", "service"],
  },
  {
    id: "f3",
    question: "Koliko časa traja menjava pnevmatik?",
    answer:
      "Standardna menjava štirih pnevmatik z balansiranjem traja približno 30–45 minut, odvisno od vozila in vrste storitve. Dodatno centriranje koles vzame še 20–30 minut. Za natančno oceno časa nas kontaktirajte ali rezervirajte termin.",
    tags: ["general", "tires"],
  },
  {
    id: "f4",
    question: "Kaj pomenijo oznake na pnevmatikah?",
    answer:
      "Oznake na pnevmatikah vsebujejo informacije o širini (npr. 205), profilu (55), premeru platišča (16), indeksu nosivosti (91) in indeksu hitrosti (V). Na primer: 205/55 R16 91V. DOT oznaka pove datum proizvodnje. Z veseljem vam razložimo podrobnosti — pokličite ali pišite.",
    tags: ["tires"],
  },
  {
    id: "f5",
    question: "Ali ponujate shranjevanje pnevmatik?",
    answer:
      "Da, ponujamo sezonsko shranjevanje pnevmatik v suhih in temperaturno nadzorovanih prostorih. Vsak komplet je osebno označen in varno shranjen do naslednje sezone. Kontaktirajte nas za cenik in razpoložljivost.",
    tags: ["tires", "service"],
  },
  {
    id: "f6",
    question: "Kako deluje avtovleka?",
    answer:
      "Nudimo 24/7 avtovleko po Sloveniji in v tujino. Smo asistenčni pogodbenik zavarovalnic Triglav, Slovenica, Adriatic in CORIS. V primeru okvare ali nesreče pokličite 041 607 298 — sporočite lokacijo in vrsto vozila, mi pridemo v najkrajšem možnem času.",
    tags: ["towing"],
  },
  {
    id: "f7",
    question: "Ali pokrivate mednarodne avtovleke?",
    answer:
      "Da, opravljamo avtovleke v sosednje države (Avstrija, Italija, Hrvaška, Madžarska) in drugam po dogovoru. Za mednarodne prevoze nas kontaktirajte vnaprej ali pokličite v primeru nujne potrebe na 041 607 298.",
    tags: ["towing"],
  },
  {
    id: "f8",
    question: "Ali sprejmete vozila brez predhodne rezervacije?",
    answer:
      "Prizadevamo si sprejeti vse stranke, a v sezoni to ni vedno mogoče brez predhodne rezervacije. Priporočamo spletno rezervacijo, ki je hitra in brezplačna. Za nujne primere nas pokličite na +386 (0)2 878 67 40.",
    tags: ["general", "service"],
  },
  {
    id: "f9",
    question: "Kakšne znamke pnevmatik prodajate?",
    answer:
      "V naši ponudbi najdete vse vodilne svetovne znamke: Michelin, Continental, Pirelli, Goodyear, Yokohama, Bridgestone, Hankook, Dunlop in mnoge druge. Smo uradni partner za pnevmatike Yokohama. Za celoten izbor obiščite našo spletno trgovino.",
    tags: ["tires"],
  },
  {
    id: "f10",
    question: "Kako poteka centriranje koles?",
    answer:
      "Centriranje koles opravimo z moderno 3D napravo, ki natančno izmeri geometrijo vseh štirih koles. Postopek traja 30–45 minut. Priporočamo ga po vsaki menjavi pnevmatik, po trčenju ali ko opazite, da se vozilo vleče na stran.",
    tags: ["service"],
  },
];
