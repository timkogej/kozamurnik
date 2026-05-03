export type Brand = {
  slug: string;
  name: string;
  logoPath: string;
  isOfficialPartner?: boolean;
};

export const brands: Brand[] = [
  { slug: "michelin", name: "Michelin", logoPath: "/images/brands/michelin.svg" },
  { slug: "continental", name: "Continental", logoPath: "/images/brands/continental.svg" },
  { slug: "pirelli", name: "Pirelli", logoPath: "/images/brands/pirelli.svg" },
  { slug: "goodyear", name: "Goodyear", logoPath: "/images/brands/goodyear.svg" },
  {
    slug: "yokohama",
    name: "Yokohama",
    logoPath: "/images/brands/yokohama.svg",
    isOfficialPartner: true,
  },
  { slug: "bridgestone", name: "Bridgestone", logoPath: "/images/brands/bridgestone.svg" },
  { slug: "hankook", name: "Hankook", logoPath: "/images/brands/hankook.svg" },
  { slug: "dunlop", name: "Dunlop", logoPath: "/images/brands/dunlop.svg" },
];
