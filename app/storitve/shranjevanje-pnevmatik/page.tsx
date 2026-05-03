import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { PageHero } from "@/components/hero/PageHero";
import { ServicePageContent } from "@/components/sections/ServicePageContent";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Shranjevanje pnevmatik",
  description: "Sezonski hotel za pnevmatike — suhe, temperaturno nadzorovane prostori. Šentjanž.",
};

export default function ShranjewanjePnevmatikPage() {
  const service = getServiceBySlug("shranjevanje-pnevmatik");
  if (!service) notFound();
  return (
    <>
      <PageHero
        headline="Shranjevanje pnevmatik"
        subhead="Varno sezonsko shranjevanje — vaše pnevmatike so pri nas v dobrih rokah."
        breadcrumbs={[{ label: "Storitve", href: "/storitve" }, { label: "Shranjevanje pnevmatik" }]}
      />
      <ServicePageContent service={service} />
    </>
  );
}
