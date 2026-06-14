import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { PageHero } from "@/components/hero/PageHero";
import { ServicePageContent } from "@/components/sections/ServicePageContent";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Centriranje koles",
  description: "Natančno 3D centriranje koles za varno vožnjo in dolgotrajnost pnevmatik. Šentjanž.",
};

export default function CentriranjeKolesPage() {
  const service = getServiceBySlug("centriranje-koles");
  if (!service) notFound();
  return (
    <>
      <PageHero
        headline="Centriranje koles"
        subhead="Natančno 3D centriranje geometrije koles — za varnost in dolgo življenjsko dobo pnevmatik."
        breadcrumbs={[{ label: "Storitve", href: "/storitve" }, { label: "Centriranje koles" }]}
        backgroundImage="/images/services/kozamurnik-storitve-hero-2.png"
        imageAlt="Komplet pnevmatik s križnim ključem — storitve Kozamurnik"
        imageWidthClass="lg:w-[56%]"
      />
      <ServicePageContent service={service} />
    </>
  );
}
