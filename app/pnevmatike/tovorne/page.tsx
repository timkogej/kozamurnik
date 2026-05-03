import type { Metadata } from "next";
import { getTireCategoryBySlug } from "@/data/tires";
import { PageHero } from "@/components/hero/PageHero";
import { TirePageContent } from "@/components/sections/TirePageContent";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const tire = getTireCategoryBySlug("tovorne");
  if (!tire) return {};
  return { title: tire.title, description: tire.shortDesc };
}

export default function TirePage() {
  const tire = getTireCategoryBySlug("tovorne");
  if (!tire) notFound();
  return (
    <>
      <PageHero
        headline={tire.title}
        subhead={tire.shortDesc}
        breadcrumbs={[{ label: "Pnevmatike", href: "/pnevmatike" }, { label: tire.title }]}
        showBookingCta={false}
      />
      <TirePageContent tire={tire} />
    </>
  );
}
