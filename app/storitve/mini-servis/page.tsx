import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { PageHero } from "@/components/hero/PageHero";
import { ServicePageContent } from "@/components/sections/ServicePageContent";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Mini servis",
  description: "Osnovi servis vozila — menjava olja, filtrov in pregled ključnih komponent. Šentjanž.",
};

export default function MiniServisPage() {
  const service = getServiceBySlug("mini-servis");
  if (!service) notFound();
  return (
    <>
      <PageHero
        headline="Mini servis"
        subhead="Osnovi pregled in vzdrževanje vozila — hitro in brez dolgega čakanja."
        breadcrumbs={[{ label: "Storitve", href: "/storitve" }, { label: "Mini servis" }]}
      />
      <ServicePageContent service={service} />
    </>
  );
}
