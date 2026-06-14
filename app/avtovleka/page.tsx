import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Check, Mail, MapPin, Truck, CircleCheck } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { ReviewsMarquee } from "@/components/sections/ReviewsMarquee";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { PhoneCta } from "@/components/sections/PhoneCta";
import { Reveal } from "@/components/motion/Reveal";
import { RollingTireDivider } from "@/components/motion/RollingTireDivider";
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
    icon: Phone,
  },
  {
    step: "02",
    title: "Lociramo",
    desc: "Sporočite lokacijo in vrsto vozila. Pošljemo najbližjo enoto.",
    icon: MapPin,
  },
  {
    step: "03",
    title: "Pridemo",
    desc: "Prihod v najkrajšem možnem času na katerokoli lokacijo.",
    icon: Truck,
  },
  {
    step: "04",
    title: "Rešimo",
    desc: "Prevoz na želeno lokacijo — varno in zanesljivo.",
    icon: CircleCheck,
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
        phoneCta={{ label: `Pokliči: ${siteConfig.contact.gsm}` }}
        secondaryCta={{ label: "Kontaktirajte nas", href: "/kontakt" }}
        backgroundImage="/images/towing/kozamurnik-avtovleka-hero.png"
        imageAlt="Avtovleka Kozamurnik — vleka osebnega vozila na pajku"
      />

      {/* Big phone CTA strip */}
      <div className="bg-paper border-b border-paper-300 py-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-graphite-500 text-sm">Potrebujete avtovleko? Pokličite takoj:</p>
            <a
              href={`tel:${siteConfig.contact.gsmTel}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium text-xl rounded-xl shadow-brand transition-colors"
            >
              <Phone className="w-6 h-6 shrink-0" aria-hidden />
              {siteConfig.contact.gsm}
            </a>
          </div>
        </Container>
      </div>

      {/* Overview */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <Eyebrow className="mb-4">Naša storitev</Eyebrow>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-6">
                Zanesljiva pomoč — kadarkoli, kjerkoli
              </h2>
              <div className="space-y-4 text-graphite-500 leading-[1.65]">
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
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-paper-300 shadow-card-lg bg-paper-200">
                <Image
                  src="/images/towing/vleka-1.jpg"
                  alt="Avtovleka Kozamurnik"
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we offer */}
      <section className="bg-paper-100 border-y border-paper-300 py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <Reveal>
              <Eyebrow className="mb-4">Ponudba</Eyebrow>
              <h2 className="font-display font-semibold text-4xl tracking-[-0.025em] leading-[1.08] text-graphite-900">
                Kaj zajema naša avtovleka
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {storitve.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 bg-white border border-paper-300 shadow-soft rounded-xl"
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

      <PartnersSection />

      {/* How it works */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <Reveal className="text-center mb-12">
            <Eyebrow className="mb-3">Postopek</Eyebrow>
            <h2 className="font-display font-semibold text-4xl tracking-[-0.025em] leading-[1.08] text-graphite-900">
              Kako poteka avtovleka
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc, icon: Icon }, i) => (
              <Reveal key={step} delay={i * 0.08}>
                <div className="text-center">
                  <div className="relative inline-block mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-paper-300 shadow-soft flex items-center justify-center">
                      <Icon className="w-7 h-7 text-brand-500" aria-hidden />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                      {parseInt(step)}
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-lg text-graphite-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-graphite-500 leading-[1.6]">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Coverage */}
      <section className="bg-paper-100 border-y border-paper-300 py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow className="mb-3">Pokritost</Eyebrow>
            <h2 className="font-display font-medium text-3xl text-graphite-900 mb-4">
              Kje smo dosegljivi
            </h2>
            <p className="text-graphite-500 text-base leading-[1.65]">
              Pokrivamo celotno <strong className="text-graphite-700">Slovenijo</strong> in
              sosednje države (Avstrija, Italija, Hrvaška, Madžarska). Za druge destinacije nas
              kontaktirajte — dogovorimo se individualno.
            </p>
          </div>
        </Container>
      </section>

      <RollingTireDivider />

      {/* Reviews avtovleka */}
      <ReviewsMarquee
        filterTag="avtovleka"
        title="Mnenja strank o naši avtovleki"
        subtitle="Realni primeri iz prakse — kaj pravijo naše stranke."
      />

      {/* Big CTA */}
      <PhoneCta
        title="Potrebujete avtovleko?"
        subtitle="Dosegljivi smo 24 ur na dan, vse dni v letu — doma in v tujini."
      />

      <section className="bg-paper py-12">
        <Container>
          <div className="text-center">
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-medium text-graphite-500 hover:text-graphite-900 transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden />
              Ali nam pošljite sporočilo prek obrazca →
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
