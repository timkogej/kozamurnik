import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Check, Mail } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Avtovleka 24/7",
  description:
    "Kozamurnik avtovleka — domači in mednarodni prevozi 24/7. Asistenčni pogodbenik Triglav, Slovenica, Adriatic, CORIS. Pokličite 041 607 298.",
};

const storitve = [
  "Domači in mednarodni prevozi osebnih in lahkih tovornih vozil",
  "Prevoz oseb in vozil",
  "Možnost prevoza več vozil hkrati",
  "Odvoz izrabljenega vozila",
  "Reševanje poškodovanih vozil",
  "Zavarovanje prevozov",
  "Asistenca Triglav, Slovenica, Adriatic in CORIS",
  "Možnost nadomestnega vozila",
  "Shranjevanje vozil",
  "Izposoja vozil",
];

const steps = [
  {
    step: "01",
    title: "Pokličete",
    desc: "Pokličite nas na 041 607 298 — odgovorimo 24/7.",
  },
  {
    step: "02",
    title: "Lociramo",
    desc: "Sporočite lokacijo in vrsto vozila. Pošljemo najbližjo enoto.",
  },
  {
    step: "03",
    title: "Pridemo",
    desc: "Prihod v najkrajšem možnem času na katerokoli lokacijo.",
  },
  {
    step: "04",
    title: "Rešimo",
    desc: "Prevoz na želeno lokacijo — varno in zanesljivo.",
  },
];

export default function AvtovlekaPage() {
  return (
    <>
      <PageHero
        headline="Avtovleka 24/7 — doma in v tujini"
        subhead="Zanesljiva avtovleka vsak dan v letu. Asistenčni pogodbenik vodilnih zavarovalnic."
        breadcrumbs={[{ label: "Avtovleka" }]}
        showBookingCta={false}
        secondaryCta={{ label: "Kontaktirajte nas", href: "/kontakt" }}
      />

      {/* Big phone CTA */}
      <div className="bg-ink-900 border-b border-ink-700 py-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-fog-400 text-sm">Potrebujete avtovleko? Pokličite takoj:</p>
            <a
              href={`tel:${siteConfig.contact.gsmTel}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xl rounded-xl transition-colors animate-pulse-glow"
            >
              <Phone className="w-6 h-6 shrink-0" aria-hidden />
              {siteConfig.contact.gsm}
            </a>
          </div>
        </Container>
      </div>

      {/* Overview — DARK */}
      <section className="bg-ink-900 border-t border-ink-700 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Eyebrow className="mb-4">Naša storitev</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-fog-50 mb-6">
                Zanesljiva pomoč — kadarkoli, kjerkoli
              </h2>
              <div className="space-y-4 text-fog-400 leading-relaxed">
                <p>
                  Kozamurnik avtovleka nudi 24-urno razpoložljivost, 7 dni v tednu, 365 dni v letu.
                  Opravljamo domače in mednarodne prevoze osebnih in lahkih tovornih vozil,
                  rešujemo poškodovana vozila in zagotavljamo nadomestne rešitve v primeru nesreče
                  ali okvare.
                </p>
                <p>
                  Smo asistenčni pogodbenik zavarovalnic Triglav, Slovenica, Adriatic in CORIS.
                  Pokrijemo celotno Slovenijo in sosednje države — brez nepotrebnega čakanja in brez
                  skritih stroškov.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-lg">
              <Image
                src="/images/towing/vleka-1.jpg"
                alt="Avtovleka Kozamurnik"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* What we offer */}
      <section className="bg-fog-50 border-t border-fog-200 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <div>
              <Eyebrow className="mb-4">Ponudba</Eyebrow>
              <h2 className="font-display font-bold text-4xl tracking-tight text-ink-900">
                Kaj zajema naša avtovleka
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {storitve.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-white border border-fog-200 shadow-card rounded-xl">
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" aria-hidden />
                  <p className="text-sm text-ink-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <PartnersSection />

      {/* How it works */}
      <section className="bg-fog-50 border-t border-fog-200 py-20 md:py-28">
        <Container>
          <div className="text-center mb-12">
            <Eyebrow className="mb-3">Postopek</Eyebrow>
            <h2 className="font-display font-bold text-4xl tracking-tight text-ink-900">
              Kako poteka avtovleka
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-fog-200 shadow-card flex items-center justify-center">
                    <Phone className="w-7 h-7 text-brand-500" aria-hidden />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                    {parseInt(step)}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-ink-900 mb-2">{title}</h3>
                <p className="text-sm text-fog-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Coverage */}
      <section className="bg-ink-900 py-16 border-y border-ink-700">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow className="mb-3">Pokritost</Eyebrow>
            <h2 className="font-display font-bold text-3xl text-fog-50 mb-4">
              Kje smo dosegljivi
            </h2>
            <p className="text-fog-400 text-base leading-relaxed">
              Pokrivamo celotno <strong className="text-fog-200">Slovenijo</strong> in sosednje
              države (Avstrija, Italija, Hrvaška, Madžarska). Za druge destinacije nas kontaktirajte
              — dogovorimo se individualno.
            </p>
          </div>
        </Container>
      </section>

      {/* Reviews avtovleka */}
      <ReviewsCarousel
        filterTag="avtovleka"
        title="Mnenja strank o naši avtovleki"
        subtitle="Realni primeri iz prakse — kaj pravijo naše stranke."
      />

      {/* Big CTA */}
      <section className="bg-ink-900 py-20 border-t border-ink-700">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <a
              href={`tel:${siteConfig.contact.gsmTel}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5 shrink-0" aria-hidden />
              Pokliči: {siteConfig.contact.gsm}
            </a>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-fog-50/20 hover:border-fog-50/40 hover:bg-fog-50/5 text-fog-50 font-semibold rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5 shrink-0" aria-hidden />
              Pošlji sporočilo
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
