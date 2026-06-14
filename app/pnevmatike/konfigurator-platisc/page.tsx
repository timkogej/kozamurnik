import type { Metadata } from "next";
import { ExternalLink, Layers } from "lucide-react";
import Image from "next/image";
import { PageHero } from "@/components/hero/PageHero";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getTireCategoryBySlug } from "@/data/tires";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Konfigurator platišč",
  description:
    "S pomočjo spletnega konfiguriatorja poiščite primerna platišča za vaše vozilo. Enostavno in hitro.",
};

export default function KonfiguratorPage() {
  const tire = getTireCategoryBySlug("konfigurator-platisc");

  return (
    <>
      <PageHero
        headline="Konfigurator platišč"
        subhead="Poiščite idealna platišča za vaše vozilo z naším spletnim orodjem."
        breadcrumbs={[
          { label: "Pnevmatike", href: "/pnevmatike" },
          { label: "Konfigurator platišč" },
        ]}
        showBookingCta={false}
        backgroundImage="/images/tires/kozamurnik-pnevmatike-hero.png"
        imageAlt="Platišče z avtomobilsko pnevmatiko — Kozamurnik"
        imageWidthClass="lg:w-[56%]"
      />

      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <Eyebrow className="mb-4">Spletno orodje</Eyebrow>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-6">
                Kako konfigurator deluje
              </h2>
              <div className="space-y-4 text-graphite-500 leading-[1.65] mb-8">
                {tire?.longDesc.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a
                href={siteConfig.externalLinks.configurator}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl shadow-brand transition-colors"
              >
                <Layers className="w-5 h-5 shrink-0" aria-hidden />
                Odpri konfigurator platišč
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
              </a>
            </Reveal>

            {/* Browser mockup */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-paper-300 shadow-card-lg">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-paper-100 border-b border-paper-300">
                  <span className="w-3 h-3 rounded-full bg-brand-400/70" />
                  <span className="w-3 h-3 rounded-full bg-warning/60" />
                  <span className="w-3 h-3 rounded-full bg-success/60" />
                  <div className="flex-1 ml-2 h-5 bg-paper-200 rounded-full" />
                </div>
                {/* Screenshot — full image, no crop */}
                <Image
                  src="/images/brands/konfigurator-screenshot.jpg"
                  alt="Konfigurator platišč"
                  width={1200}
                  height={800}
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto block"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Tips */}
      {tire && (
        <section className="bg-paper-100 border-y border-paper-300 py-24 md:py-28">
          <Container>
            <Reveal className="mb-10">
              <Eyebrow className="mb-3">Nasveti</Eyebrow>
              <h2 className="font-display font-semibold text-4xl tracking-[-0.025em] leading-[1.08] text-graphite-900">
                Koristni nasveti
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {tire.tips.map(({ title, text }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <div className="bg-white border border-paper-300 rounded-2xl p-6 shadow-soft h-full">
                    <h3 className="font-display font-medium text-lg text-graphite-900 mb-3">
                      {title}
                    </h3>
                    <p className="text-sm text-graphite-500 leading-[1.6]">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ReservationCta />
    </>
  );
}
