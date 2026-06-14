import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { RollingTireDivider } from "@/components/motion/RollingTireDivider";
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
      {/* Kdaj uporabiti */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <Reveal>
              <div className="relative aspect-[4/3] bg-paper-200 border border-paper-300 rounded-2xl overflow-hidden shadow-card-lg">
                {tire.imagePath ? (
                  <Image
                    src={tire.imagePath}
                    alt={tire.title}
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8">
                      <p className="text-4xl mb-3">🛞</p>
                      <p className="text-sm text-graphite-400">Slika pnevmatike</p>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Eyebrow className="mb-4">Kdaj uporabiti</Eyebrow>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-4">
                {tire.title}
              </h2>
              <p className="text-graphite-700 text-sm mb-4 p-3 bg-paper-100 border border-paper-300 rounded-xl">
                {tire.whenToUse}
              </p>
              <div className="space-y-4 text-graphite-500 leading-[1.65]">
                {tire.longDesc.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Shopping CTA — brand band */}
      <section className="bg-brand-500 py-12">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-medium text-xl text-white mb-1">
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
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-600 font-medium rounded-xl hover:bg-brand-50 transition-colors"
            >
              Brskaj po ponudbi
              <ExternalLink className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </Container>
      </section>

      {/* Top brands */}
      <BrandsGrid background="muted" />

      <RollingTireDivider />

      {/* Na kaj paziti */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <Reveal className="mb-10">
            <Eyebrow className="mb-3">Na kaj paziti</Eyebrow>
            <h2 className="font-display font-semibold text-4xl tracking-[-0.025em] leading-[1.08] text-graphite-900">
              Na kaj paziti pri izbiri
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

      {/* Related services */}
      <section className="bg-paper-100 border-t border-paper-300 py-16 md:py-20">
        <Container>
          <h2 className="font-display font-medium text-2xl text-graphite-900 mb-6">
            Rabim tudi...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedServices.map(({ slug, title }) => (
              <Link
                key={slug}
                href={`/storitve/${slug}`}
                className="group flex items-center justify-between gap-3 p-4 bg-white border border-paper-300 hover:shadow-card rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <p className="font-medium text-graphite-700 group-hover:text-graphite-900 text-sm">
                  {title}
                </p>
                <ArrowRight
                  className="w-4 h-4 text-graphite-400 group-hover:text-brand-500 transition-all group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ReservationCta />
    </>
  );
}
