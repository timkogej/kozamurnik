import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { services, type Service } from "@/data/services";

type ServicePageContentProps = {
  service: Service;
};

export function ServicePageContent({ service }: ServicePageContentProps) {
  const related = services.filter((s) => service.relatedSlugs.includes(s.slug));

  return (
    <>
      {/* Overview — DARK */}
      <section className="bg-ink-900 border-t border-ink-700 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-lg">
              <Image
                src={`/images/services/${service.slug}.jpg`}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <Eyebrow className="mb-4">Storitev</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-fog-50 mb-6">
                {service.title}
              </h2>
              <div className="space-y-4 text-fog-400 leading-relaxed">
                {service.longDesc.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What's included — LIGHT */}
      <section className="bg-fog-50 border-t border-fog-200 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <div>
              <Eyebrow className="mb-4">Vključeno</Eyebrow>
              <h2 className="font-display font-bold text-4xl tracking-tight text-ink-900">
                Kaj je vključeno v storitev
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.included.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-4 bg-white border border-fog-200 rounded-xl shadow-sm"
                >
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" aria-hidden />
                  <p className="text-sm text-ink-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing — DARK */}
      <section className="bg-ink-950 border-t border-ink-700 py-16">
        <Container>
          <div className="max-w-xl mx-auto bg-ink-800 border border-ink-700 rounded-2xl p-8 text-center">
            <Eyebrow className="mb-3">Cena</Eyebrow>
            <h3 className="font-display font-semibold text-2xl text-fog-50 mb-3">
              Cena po dogovoru
            </h3>
            <p className="text-fog-400 text-sm leading-relaxed mb-6">
              Cena je odvisna od vrste vozila in obsega storitve. Za okvirno ceno pokličite ali
              rezervirajte termin — oceno podamo brezplačno.
            </p>
            <a
              href="tel:041607298"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors mr-3"
            >
              Pokličite
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 border border-ink-600 hover:border-ink-500 hover:bg-ink-700/50 text-fog-200 font-semibold rounded-xl transition-colors"
            >
              Pišite nam
            </Link>
          </div>
        </Container>
      </section>

      {/* Related services — dark */}
      {related.length > 0 && (
        <section className="bg-ink-900 py-16 md:py-20 border-t border-ink-700">
          <Container>
            <h2 className="font-display font-semibold text-2xl text-fog-50 mb-6">
              Sorodne storitve
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/storitve/${s.slug}`}
                  className="group flex items-center justify-between gap-3 p-4 bg-ink-800 border border-ink-700 hover:border-brand-500/40 rounded-xl transition-all"
                >
                  <p className="font-medium text-fog-200 group-hover:text-fog-50 transition-colors text-sm">
                    {s.title}
                  </p>
                  <ArrowRight className="w-4 h-4 text-fog-500 group-hover:text-brand-400 transition-all group-hover:translate-x-1 shrink-0" aria-hidden />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Reviews subset — dark */}
      <ReviewsCarousel filterTag="servis" />

      <ReservationCta />
    </>
  );
}
