import type { Metadata } from "next";
import { PageHero } from "@/components/hero/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ReviewsMarquee } from "@/components/sections/ReviewsMarquee";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { RollingTireDivider } from "@/components/motion/RollingTireDivider";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";

const visibleServices = services.filter((service) => service.slug !== "avtovleka");

export const metadata: Metadata = {
  title: "Storitve",
  description:
    "Celovite storitve za vaše vozilo — menjava pnevmatik, vulkanizerstvo, centriranje koles, mini servis, shranjevanje pnevmatik, najem kombijev in avtovleka 24/7.",
};

export default function StoritvePage() {
  return (
    <>
      <PageHero
        headline="Naše storitve — vse na enem mestu"
        subhead="Od menjave pnevmatik do avtovleke — pokrivamo vse, kar vaše vozilo potrebuje."
        breadcrumbs={[{ label: "Storitve" }]}
        backgroundImage="/images/services/kozamurnik-storitve-hero-2.png"
        imageAlt="Komplet pnevmatik s križnim ključem — storitve Kozamurnik"
        imageWidthClass="lg:w-[56%]"
      />

      <section className="bg-paper py-10 md:py-16">
        <Container>
          <p className="text-center font-sans text-lg leading-[1.65] text-graphite-500 max-w-3xl mx-auto">
            Pri Kozamurnik Center mobilnosti d.o.o. nudimo celovit spekter storitev za vaše vozilo.
            Naša izkušena ekipa je na voljo za sezonsko menjavo pnevmatik, strokovno vulkanizerstvo,
            natančno centriranje koles in hitro avtovleko — vse na enem mestu.
          </p>
        </Container>
      </section>

      <ServicesGrid services={visibleServices} />
      <ProcessTimeline />
      <RollingTireDivider />
      <ReviewsMarquee title="Naše stranke priporočajo" />
      <ReservationCta />
    </>
  );
}
