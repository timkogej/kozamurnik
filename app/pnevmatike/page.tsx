import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sun, Snowflake, RefreshCw, Truck, Bike, Layers } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { ShopReminder } from "@/components/sections/ShopReminder";
import { BrandsGrid } from "@/components/sections/BrandsGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Pnevmatike",
  description:
    "Širok izbor letnih, zimskih, celoletnih, tovornih in motorističnih pnevmatik. Uradni partner za Yokohama.",
};

const categories = [
  { slug: "letne", title: "Letne pnevmatike", icon: Sun, desc: "Za sezono nad 7 °C" },
  { slug: "zimske", title: "Zimske pnevmatike", icon: Snowflake, desc: "Varnost v zimskih razmerah" },
  { slug: "celoletne", title: "Celoletne pnevmatike", icon: RefreshCw, desc: "Kompromis za zmerne podnebje" },
  { slug: "tovorne", title: "Tovorne pnevmatike", icon: Truck, desc: "Za kombije in gospodarska vozila" },
  { slug: "motoristicne", title: "Motoristične pnevmatike", icon: Bike, desc: "Za vse kategorije motorjev" },
  { slug: "konfigurator-platisc", title: "Konfigurator platišč", icon: Layers, desc: "Poiščite primerna platišča" },
];

export default function PnevmatikePage() {
  return (
    <>
      <PageHero
        headline="Pnevmatike za vsako vozilo in vsako sezono"
        subhead="Letne, zimske, celoletne, tovorne in motoristične pnevmatike vodilnih znamk."
        breadcrumbs={[{ label: "Pnevmatike" }]}
        showBookingCta={false}
        secondaryCta={{
          label: "Odpri spletno trgovino",
          href: siteConfig.externalLinks.shop,
          external: true,
        }}
      />

      {/* Intro — dark */}
      <section className="bg-ink-950 py-10 md:py-16">
        <Container>
          <p className="text-center font-sans text-lg leading-relaxed text-fog-400 max-w-3xl mx-auto">
            V naši ponudbi in spletni trgovini najdete pnevmatike za vsa vozila, vsako sezono in
            vsak proračun. Svetujemo pri izbiri, montiramo in balansiramo pri nas.
          </p>
        </Container>
      </section>

      {/* Category grid — DARK */}
      <section className="bg-ink-950 py-20 md:py-28">
        <Container>
          <div className="mb-10">
            <Eyebrow className="mb-3">Kategorije</Eyebrow>
            <h2 className="font-display font-bold text-4xl tracking-tight text-fog-50">
              Vrsta pnevmatik
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(({ slug, title, icon: Icon, desc }) => (
              <Link
                key={slug}
                href={`/pnevmatike/${slug}`}
                className="group flex items-start gap-4 p-6 bg-ink-800 hover:bg-ink-700 border border-ink-700 hover:border-brand-500/40 rounded-2xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-brand-500" aria-hidden />
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-lg text-fog-50 mb-1">{title}</p>
                  <p className="text-sm text-fog-400">{desc}</p>
                </div>
                <ArrowRight
                  className="w-5 h-5 text-fog-500 group-hover:text-brand-500 transition-all group-hover:translate-x-1 shrink-0 mt-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ShopReminder — LIGHT */}
      <ShopReminder variant="light" />

      {/* BrandsGrid — DARK */}
      <BrandsGrid variant="dark" />

      {/* Tire size guide — LIGHT */}
      <section className="bg-fog-50 border-t border-fog-200 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow className="mb-3">Vodnik</Eyebrow>
              <h2 className="font-display font-bold text-4xl tracking-tight text-ink-900 mb-4">
                Kako prebrati oznake pnevmatik?
              </h2>
              <p className="text-fog-500 leading-relaxed mb-6">
                Vsaka pnevmatika nosi niz oznak, ki vam povedo vse bistvene lastnosti. Na primer:{" "}
                <strong className="text-ink-800">205/55 R16 91V</strong> pomeni:
              </p>
              <ul className="space-y-3">
                {[
                  { oznaka: "205", opis: "Širina pnevmatike v milimetrih" },
                  { oznaka: "55", opis: "Profil — razmerje višine in širine v %" },
                  { oznaka: "R16", opis: "Radial konstrukcija, premer platišča 16 palcev" },
                  { oznaka: "91", opis: "Indeks nosivosti (91 = 615 kg na pnevmatiko)" },
                  { oznaka: "V", opis: "Indeks hitrosti (V = do 240 km/h)" },
                ].map(({ oznaka, opis }) => (
                  <li key={oznaka} className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">
                      {oznaka}
                    </span>
                    <span className="text-sm text-fog-500">{opis}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-fog-100 border border-fog-200 rounded-2xl p-8">
              <div className="aspect-square bg-white border border-fog-200 rounded-xl flex items-center justify-center shadow-sm">
                <div className="text-center">
                  <p className="font-display font-bold text-5xl text-ink-900 mb-3">
                    205/55 R16
                  </p>
                  <p className="font-display font-bold text-3xl text-brand-500">91V</p>
                  <p className="text-xs text-fog-500 mt-4">Primer oznake pnevmatike</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection filterTags={["tires"]} limit={5} variant="dark" />
      <ReservationCta />
    </>
  );
}
