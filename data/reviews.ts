export type Review = {
  id: string;
  stars: number;
  text: string;
  author: string;
  date: string;
  source: "google";
  tags: ("pnevmatike" | "avtovleka" | "servis" | "splosno")[];
};

export const reviews: Review[] = [
  {
    id: "r1",
    stars: 5,
    text: "Odlična storitev, hitro in profesionalno. Menjava pnevmatik je bila opravljena v manj kot pol ure. Priporočam vsem!",
    author: "Marko L.",
    date: "2024-09-15",
    source: "google",
    tags: ["pnevmatike"],
  },
  {
    id: "r2",
    stars: 5,
    text: "Najboljši vulkanizer na širši okolici. Vedno prijazen in korektni cena. Hodimo že leta in nikoli nismo bili razočarani.",
    author: "Ana P.",
    date: "2024-10-03",
    source: "google",
    tags: ["splosno"],
  },
  {
    id: "r3",
    stars: 5,
    text: "Avtovleka je prišla v 20 minutah sredi noči. Profesionalno, prijazno osebje. Res zanesljiva storitev!",
    author: "Tomaž K.",
    date: "2024-08-22",
    source: "google",
    tags: ["avtovleka"],
  },
  {
    id: "r4",
    stars: 5,
    text: "Super izkušnja. Centriranje koles je bilo opravljeno natančno, vozilo se sedaj vozi ravno. Cena je bila poštena.",
    author: "Maja S.",
    date: "2024-11-10",
    source: "google",
    tags: ["servis"],
  },
  {
    id: "r5",
    stars: 5,
    text: "Boris in ekipa so izjemni. Hitro, zanesljivo in brez kakršnih koli zapletov. Vedno se vrnem k njim.",
    author: "Janez R.",
    date: "2024-07-05",
    source: "google",
    tags: ["splosno"],
  },
  {
    id: "r6",
    stars: 5,
    text: "Zimske pnevmatike sem kupil pri njih — res odličen izbor in montaža opravljena takoj. Hotel za pnevmatike je super rešitev.",
    author: "Petra M.",
    date: "2024-10-28",
    source: "google",
    tags: ["pnevmatike"],
  },
  {
    id: "r7",
    stars: 5,
    text: "Ko sem na avtocesti dobil defekt, sem poklical Kozamurnik. Prišli so v rekordnem času in rešili problem. Hvala!",
    author: "Aleš Z.",
    date: "2024-06-17",
    source: "google",
    tags: ["avtovleka"],
  },
  {
    id: "r8",
    stars: 5,
    text: "Prijazno osebje, hitra storitev. Mini servis opravili v eni uri. Vse razloženo jasno brez skritih stroškov.",
    author: "Nina B.",
    date: "2024-09-30",
    source: "google",
    tags: ["servis"],
  },
  {
    id: "r9",
    stars: 5,
    text: "Priporočam vsem! Vulkanizerstvo opravljeno hitro in kakovostno. Že desetletja zaupam Kozamurniku.",
    author: "Franc H.",
    date: "2024-08-08",
    source: "google",
    tags: ["pnevmatike"],
  },
  {
    id: "r10",
    stars: 5,
    text: "Avtovleka iz Avstrije v Slovenijo — brez problemov, hitro in profesionalno. Res zanesljiv servis.",
    author: "Mojca V.",
    date: "2024-05-20",
    source: "google",
    tags: ["avtovleka"],
  },
  {
    id: "r11",
    stars: 5,
    text: "Odlična komunikacija, termin sem rezerviral online in vse je teklo brez napak. Toplo priporočam!",
    author: "Simon G.",
    date: "2024-11-02",
    source: "google",
    tags: ["splosno"],
  },
  {
    id: "r12",
    stars: 5,
    text: "Boris je resnično strokovnjak. Razložil mi je vse o pnevmatikah in mi pomagal izbrati pravo za moje vozilo.",
    author: "Katja D.",
    date: "2024-10-15",
    source: "google",
    tags: ["pnevmatike", "splosno"],
  },
];
