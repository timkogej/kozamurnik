import type { Metadata } from "next";
import { PageHero } from "@/components/hero/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Storitve",
  description:
    "Celovite storitve za vaše vozilo — menjava pnevmatik, vulkanizerstvo, centriranje koles, mini servis, shranjevanje pnevmatik in avtovleka 24/7.",
};

export default function StoritvePage() {
  return (
    <>
      <PageHero
        headline="Naše storitve — vse na enem mestu"
        subhead="Od menjave pnevmatik do avtovleke — pokrivamo vse, kar vaše vozilo potrebuje."
        breadcrumbs={[{ label: "Storitve" }]}
      />

      <section className="bg-ink-950 py-10 md:py-16">
        <Container>
          <p className="text-center font-sans text-lg leading-relaxed text-fog-400 max-w-3xl mx-auto">
            Pri Kozamurnik Center mobilnosti d.o.o. nudimo celovit spekter storitev za vaše vozilo.
            Naša izkušena ekipa je na voljo za sezonsko menjavo pnevmatik, strokovno vulkanizerstvo,
            natančno centriranje koles in hitro avtovleko — vse na enem mestu.
          </p>
        </Container>
      </section>

      <ServicesGrid services={services} />
      <ProcessTimeline />
      <ReviewsCarousel title="Naše stranke priporočajo" />
      <ReservationCta />
    </>
  );
}
