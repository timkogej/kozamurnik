import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { BrandsGrid } from "@/components/sections/BrandsGrid";
import { type TireCategory } from "@/data/tires";
import { siteConfig } from "@/lib/config";

type TirePageContentProps = {
  tire: TireCategory;
};

const relatedServices = [
  { slug: "menjava-pnevmatik", title: "Menjava pnevmatik" },
  { slug: "shranjevanje-pnevmatik", title: "Shranjevanje pnevmatik" },
  { slug: "vulkanizerstvo", title: "Vulkanizerstvo" },
];

export function TirePageContent({ tire }: TirePageContentProps) {
  return (
    <>
      {/* Kdaj uporabiti — DARK */}
      <section className="bg-ink-900 border-t border-ink-700 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-ink-800 border border-ink-700 rounded-2xl overflow-hidden">
              {tire.imagePath ? (
                <Image
                  src={tire.imagePath}
                  alt={tire.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <p className="text-4xl mb-3">🛞</p>
                    <p className="text-sm text-fog-500">Slika pnevmatike</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Eyebrow className="mb-4">Kdaj uporabiti</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-fog-50 mb-4">
                {tire.title}
              </h2>
              <p className="text-fog-200 text-sm mb-4 p-3 bg-ink-800 border border-ink-700 rounded-xl">
                {tire.whenToUse}
              </p>
              <div className="space-y-4 text-fog-400 leading-relaxed">
                {tire.longDesc.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Shopping CTA — dark (brand bg) */}
      <section className="bg-brand-500 py-12">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-bold text-xl text-white mb-1">
                Iščete {tire.title.toLowerCase()}?
              </p>
              <p className="text-white/80 text-sm">
                V naši spletni trgovini najdete celoten izbor vodilnih znamk.
              </p>
            </div>
            <a
              href={siteConfig.externalLinks.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-600 font-semibold rounded-xl hover:bg-fog-100 transition-colors"
            >
              Brskaj po ponudbi
              <ExternalLink className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </Container>
      </section>

      {/* Top brands — DARK */}
      <BrandsGrid variant="dark" />

      {/* Na kaj paziti — LIGHT (former Tips) */}
      <section className="bg-fog-50 border-t border-fog-200 py-20 md:py-28">
        <Container>
          <div className="mb-10">
            <Eyebrow className="mb-3">Na kaj paziti</Eyebrow>
            <h2 className="font-display font-bold text-4xl tracking-tight text-ink-900">
              Na kaj paziti pri izbiri
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {tire.tips.map(({ title, text }) => (
              <div key={title} className="bg-white border border-fog-200 rounded-2xl p-6 shadow-card">
                <h3 className="font-display font-semibold text-lg text-ink-900 mb-3">{title}</h3>
                <p className="text-sm text-fog-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related services — dark */}
      <section className="bg-ink-900 py-16 md:py-20 border-t border-ink-700">
        <Container>
          <h2 className="font-display font-semibold text-2xl text-fog-50 mb-6">
            Rabim tudi...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedServices.map(({ slug, title }) => (
              <Link
                key={slug}
                href={`/storitve/${slug}`}
                className="group flex items-center justify-between gap-3 p-4 bg-ink-800 border border-ink-700 hover:border-brand-500/40 rounded-xl transition-all"
              >
                <p className="font-medium text-fog-200 group-hover:text-fog-50 text-sm">{title}</p>
                <ArrowRight className="w-4 h-4 text-fog-500 group-hover:text-brand-400 transition-all group-hover:translate-x-1" aria-hidden />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ReservationCta />
    </>
  );
}
