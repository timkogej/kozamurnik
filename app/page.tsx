import type { Metadata } from "next";
import { HomeHero } from "@/components/hero/HomeHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsSection } from "@/components/sections/StatsSection";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { ShopReminder } from "@/components/sections/ShopReminder";
import { BrandsGrid } from "@/components/sections/BrandsGrid";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { FaqSection } from "@/components/sections/FaqSection";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Kozamurnik — Pnevmatike, vulkanizerstvo in avtovleka | Šentjanž",
  description:
    "Kozamurnik Center mobilnosti d.o.o. — pnevmatike, vulkanizerstvo, centriranje koles, mini servis in avtovleka 24/7. Bukovska vas, Šentjanž.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ServicesGrid services={services} showAllLink />
      <StatsSection variant="light" />
      <ReservationCta />
      <ShopReminder variant="dark" />
      <BrandsGrid />
      <ReviewsCarousel />
      <FaqSection limit={6} variant="dark" />
    </>
  );
}
