export type Partner = {
  slug: string;
  name: string;
  logoPath: string;
  type: "insurance";
};

export const partners: Partner[] = [
  {
    slug: "triglav",
    name: "Zavarovalnica Triglav",
    logoPath: "/images/partners/triglav.svg",
    type: "insurance",
  },
  {
    slug: "slovenica",
    name: "Zavarovalnica Slovenica",
    logoPath: "/images/partners/slovenica.svg",
    type: "insurance",
  },
  {
    slug: "adriatic",
    name: "Adriatic Slovenica",
    logoPath: "/images/partners/adriatic.svg",
    type: "insurance",
  },
  {
    slug: "coris",
    name: "CORIS",
    logoPath: "/images/partners/coris.svg",
    type: "insurance",
  },
];
