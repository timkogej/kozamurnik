import type { Metadata } from "next";
import Image from "next/image";
import { Target, Wrench, BadgeCheck, Handshake } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { RollingTireDivider } from "@/components/motion/RollingTireDivider";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Kozamurnik Center mobilnosti d.o.o. — več kot 30 let zanesljivega partnerstva. Spoznajte našo zgodbo, vrednote in ekipo.",
};

const vrednote = [
  {
    icon: Target,
    title: "Zanesljivost",
    desc: "Vsak termin in vsak servis opravimo točno in v obljubljenem času.",
  },
  {
    icon: Wrench,
    title: "Strokovnost",
    desc: "Ekipa z desetletji izkušenj in redno izobraževanje.",
  },
  {
    icon: BadgeCheck,
    title: "Kakovost",
    desc: "Delamo le s preverjenimi znamkami in originalno opremo.",
  },
  {
    icon: Handshake,
    title: "Osebni pristop",
    desc: "Svetujemo, razložimo, prilagodimo — kot bi bili družina.",
  },
];

export default function ONasPage() {
  return (
    <>
      <PageHero
        headline="O nas — več kot 30 let izkušenj"
        subhead="Kozamurnik Center mobilnosti — zanesljiv partner za vaše vozilo od leta 1993."
        breadcrumbs={[{ label: "O nas" }]}
        showBookingCta={false}
      />

      {/* Zgodba */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-paper-300 shadow-card-lg bg-paper-200">
                <Image
                  src="/images/about/story-1.jpg"
                  alt="Delavnica Kozamurnik v Bukovski vasi"
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Text */}
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <Eyebrow className="mb-4">Naša zgodba</Eyebrow>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-6">
                Tradicija in strokovnost od leta 1993
              </h2>
              <div className="space-y-4 text-graphite-500 leading-[1.65]">
                <p>
                  Kozamurnik Center mobilnosti d.o.o. je družinsko podjetje s sedežem v Bukovski
                  vasi pri Šentjanžu. Že več kot tri desetletja smo zanesljiv partner voznikom, ki
                  iščejo strokovno menjavo pnevmatik, kakovostne storitve vulkanizerstva in celovito
                  skrb za svoje vozilo.
                </p>
                <p>
                  Pot smo začeli leta 1993 kot majhna obrt, danes pa smo center mobilnosti, ki
                  pokriva vse od prodaje in montaže pnevmatik vodilnih svetovnih znamk do avtovleke
                  24 ur na dan — tudi v tujino. Naša misija ostaja enaka: vozniku prihraniti čas in
                  zagotoviti varnost.
                </p>
                <p>
                  V teh treh desetletjih smo postali eden najzaupanja vrednejših servisov v regiji.
                  Naše stranke se vračajo leto za letom — in to je za nas največja pohvala.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <RollingTireDivider />

      {/* Vrednote */}
      <section className="bg-paper-100 border-y border-paper-300 py-24 md:py-32">
        <Container>
          <Reveal className="text-center mb-12">
            <Eyebrow className="mb-3">Naše vrednote</Eyebrow>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900">
              Kar nas dela drugačne
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vrednote.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="bg-white border border-paper-300 rounded-2xl p-6 shadow-soft h-full">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-500" aria-hidden />
                  </div>
                  <h3 className="font-display font-medium text-xl text-graphite-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-graphite-500 leading-[1.6]">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <StatsSection />

      <ReservationCta />
    </>
  );
}
