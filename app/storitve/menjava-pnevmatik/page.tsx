import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { PageHero } from "@/components/hero/PageHero";
import { ServicePageContent } from "@/components/sections/ServicePageContent";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Menjava pnevmatik",
  description: "Hitra in natančna menjava sezonskih pnevmatik v Šentjanžu. Profesionalna montaža in balansiranje.",
};

export default function MenjavaPnevmatikPage() {
  const service = getServiceBySlug("menjava-pnevmatik");
  if (!service) notFound();
  return (
    <>
      <PageHero
        headline="Menjava pnevmatik"
        subhead="Hitra in natančna menjava sezonskih pnevmatik s strokovnim osebjem."
        breadcrumbs={[{ label: "Storitve", href: "/storitve" }, { label: "Menjava pnevmatik" }]}
      />
      <ServicePageContent service={service} />
    </>
  );
}
