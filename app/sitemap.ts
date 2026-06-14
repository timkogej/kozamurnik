import type { MetadataRoute } from "next";

const BASE_URL = "https://kozamurnik.si";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/o-nas",
    "/storitve",
    "/storitve/menjava-pnevmatik",
    "/storitve/vulkanizerstvo",
    "/storitve/centriranje-koles",
    "/storitve/mini-servis",
    "/storitve/shranjevanje-pnevmatik",
    "/storitve/najem-kombijev",
    "/pnevmatike",
    "/pnevmatike/letne",
    "/pnevmatike/zimske",
    "/pnevmatike/celoletne",
    "/pnevmatike/tovorne",
    "/pnevmatike/motoristicne",
    "/pnevmatike/konfigurator-platisc",
    "/avtovleka",
    "/kontakt",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
