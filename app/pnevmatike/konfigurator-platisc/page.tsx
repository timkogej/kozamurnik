import type { Metadata } from "next";
import { ExternalLink, Layers } from "lucide-react";
import Image from "next/image";
import { PageHero } from "@/components/hero/PageHero";
import { ReservationCta } from "@/components/sections/ReservationCta";
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
      />

      <section className="bg-ink-950 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow className="mb-4">Spletno orodje</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-fog-50 mb-6">
                Kako konfigurator deluje
              </h2>
              <div className="space-y-4 text-fog-400 leading-relaxed mb-8">
                {tire?.longDesc.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a
                href={siteConfig.externalLinks.configurator}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-colors"
              >
                <Layers className="w-5 h-5 shrink-0" aria-hidden />
                Odpri konfigurator platišč
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
              </a>
            </div>

            {/* Browser mockup */}
            <div className="rounded-2xl overflow-hidden border border-ink-700 shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-ink-700 border-b border-ink-600">
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <span className="w-3 h-3 rounded-full bg-green-400/80" />
                <div className="flex-1 ml-2 h-5 bg-ink-600 rounded-full" />
              </div>
              {/* Screenshot — full image, no crop */}
              <Image
                src="/images/brands/konfigurator-screenshot.jpg"
                alt="Konfigurator platišč"
                width={1200}
                height={800}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Tips */}
      {tire && (
        <section className="bg-ink-900 py-20 border-y border-ink-700">
          <Container>
            <div className="mb-10">
              <Eyebrow className="mb-3">Nasveti</Eyebrow>
              <h2 className="font-display font-bold text-4xl tracking-tight text-fog-50">
                Koristni nasveti
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {tire.tips.map(({ title, text }) => (
                <div key={title} className="bg-ink-800 border border-ink-700 rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-lg text-fog-50 mb-3">{title}</h3>
                  <p className="text-sm text-fog-400 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ReservationCta />
    </>
  );
}
