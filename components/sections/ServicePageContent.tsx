import { Check, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { RollingTireDivider } from "@/components/motion/RollingTireDivider";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { PhoneCta } from "@/components/sections/PhoneCta";
import { ReviewsMarquee } from "@/components/sections/ReviewsMarquee";
import { services, type Service } from "@/data/services";
import { siteConfig } from "@/lib/config";

type ServicePageContentProps = {
  service: Service;
  /** "phone" hides the JedroPlus booking CTA — the service is arranged by phone */
  cta?: "booking" | "phone";
};

export function ServicePageContent({ service, cta = "booking" }: ServicePageContentProps) {
  const related = services.filter((s) => service.relatedSlugs.includes(s.slug));
  const phoneFirst = cta === "phone";

  return (
    <>
      {/* Overview */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Reveal>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-paper-300 shadow-card-lg bg-paper-200">
                <Image
                  src={`/images/services/${service.slug}.jpg`}
                  alt={service.title}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Text */}
            <Reveal delay={0.1}>
              <Eyebrow className="mb-4">Storitev</Eyebrow>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-6">
                {service.title}
              </h2>
              <div className="space-y-4 text-graphite-500 leading-[1.65]">
                {service.longDesc.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section className="bg-paper-100 border-y border-paper-300 py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <Reveal>
              <Eyebrow className="mb-4">Vključeno</Eyebrow>
              <h2 className="font-display font-semibold text-4xl tracking-[-0.025em] leading-[1.08] text-graphite-900">
                Kaj je vključeno v storitev
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.included.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 bg-white border border-paper-300 rounded-xl shadow-soft"
                  >
                    <Check className="w-4 h-4 text-success shrink-0 mt-0.5" aria-hidden />
                    <p className="text-sm text-graphite-700 leading-[1.6]">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="bg-paper py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="max-w-xl mx-auto bg-white border border-paper-300 rounded-2xl shadow-card p-8 text-center">
              <Eyebrow className="mb-3">Cena</Eyebrow>
              <h3 className="font-display font-medium text-2xl text-graphite-900 mb-3">
                Cena po dogovoru
              </h3>
              <p className="text-graphite-500 text-sm leading-[1.6] mb-6">
                Cena je odvisna od vrste vozila in obsega storitve. Za okvirno ceno pokličite
                {phoneFirst ? " — oceno podamo brezplačno." : " ali rezervirajte termin — oceno podamo brezplačno."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${siteConfig.contact.gsmTel}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-xl shadow-brand transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden />
                  Pokličite
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-graphite-900 text-graphite-900 hover:bg-paper-100 hover:text-graphite-900 text-sm font-medium rounded-xl transition-colors"
                >
                  Pišite nam
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="bg-paper pb-20 md:pb-24">
          <Container>
            <Reveal>
              <h2 className="font-display font-medium text-2xl text-graphite-900 mb-6">
                Sorodne storitve
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/storitve/${s.slug}`}
                    className="group flex items-center justify-between gap-3 p-4 bg-white border border-paper-300 hover:shadow-card rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <p className="font-medium text-graphite-700 group-hover:text-graphite-900 transition-colors text-sm">
                      {s.title}
                    </p>
                    <ArrowRight
                      className="w-4 h-4 text-graphite-400 group-hover:text-brand-500 transition-all group-hover:translate-x-1 shrink-0"
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <RollingTireDivider />

      {/* Reviews subset */}
      <ReviewsMarquee filterTag="servis" title="Naše stranke priporočajo" />

      {phoneFirst ? (
        <PhoneCta
          title="Pokličite za termin"
          subtitle="Za mini servis se dogovorite po telefonu — hitro in brez čakanja."
        />
      ) : (
        <ReservationCta />
      )}
    </>
  );
}
