import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { PageHero } from "@/components/hero/PageHero";
import { ServicePageContent } from "@/components/sections/ServicePageContent";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config";

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
        subhead="Osnovi pregled in vzdrževanje vozila — hitro in brez dolgega čakanja. Za mini servis se dogovorite po telefonu."
        breadcrumbs={[{ label: "Storitve", href: "/storitve" }, { label: "Mini servis" }]}
        showBookingCta={false}
        phoneCta={{ label: `Pokliči za termin · ${siteConfig.contact.gsm}` }}
        backgroundImage="/images/services/kozamurnik-storitve-hero-2.png"
        imageAlt="Komplet pnevmatik s križnim ključem — storitve Kozamurnik"
        imageWidthClass="lg:w-[56%]"
      />
      <ServicePageContent service={service} cta="phone" />
    </>
  );
}
