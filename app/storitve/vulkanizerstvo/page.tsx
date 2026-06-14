import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { PageHero } from "@/components/hero/PageHero";
import { ServicePageContent } from "@/components/sections/ServicePageContent";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Vulkanizerstvo",
  description: "Popravilo pnevmatik, zamenjava ventilov, montaža tubeless in balansiranje v Šentjanžu.",
};

export default function VulkanizerstvPage() {
  const service = getServiceBySlug("vulkanizerstvo");
  if (!service) notFound();
  return (
    <>
      <PageHero
        headline="Vulkanizerstvo"
        subhead="Popravilo in servis pnevmatik — hitro, zanesljivo, preverjeno."
        breadcrumbs={[{ label: "Storitve", href: "/storitve" }, { label: "Vulkanizerstvo" }]}
        backgroundImage="/images/services/kozamurnik-storitve-hero-2.png"
        imageAlt="Komplet pnevmatik s križnim ključem — storitve Kozamurnik"
        imageWidthClass="lg:w-[56%]"
      />
      <ServicePageContent service={service} />
    </>
  );
}
