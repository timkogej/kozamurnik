import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/hero/PageHero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Kozamurnik Center mobilnosti d.o.o. — več kot 30 let zanesljivega partnerstva. Spoznajte našo zgodbo, vrednote in ekipo.",
};

const vrednote = [
  {
    icon: "🎯",
    title: "Zanesljivost",
    desc: "Vsak termin in vsak servis opravimo točno in v obljubljenem času.",
  },
  {
    icon: "🛠",
    title: "Strokovnost",
    desc: "Ekipa z desetletji izkušenj in redno izobraževanje.",
  },
  {
    icon: "✅",
    title: "Kakovost",
    desc: "Delamo le s preverjenimi znamkami in originalno opremo.",
  },
  {
    icon: "🤝",
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

      {/* Zgodba — DARK */}
      <section className="bg-ink-900 border-t border-ink-700 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-lg">
                <Image
                  src="/images/about/story-1.jpg"
                  alt="Kozamurnik objekt in servis"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <Eyebrow className="mb-4">Naša zgodba</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-fog-50 mb-6">
                Tradicija in strokovnost od leta 1993
              </h2>
              <div className="space-y-4 text-fog-400 leading-relaxed">
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
            </div>
          </div>
        </Container>
      </section>

      {/* Vrednote — DARK */}
      <section className="bg-ink-900 border-y border-ink-700 py-20 md:py-28">
        <Container>
          <div className="text-center mb-12">
            <Eyebrow className="mb-3">Naše vrednote</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-fog-50">
              Kar nas dela drugačne
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vrednote.map(({ icon, title, desc }) => (
              <div key={title} className="bg-ink-800 border border-ink-700 rounded-2xl p-6">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display font-semibold text-xl text-fog-50 mb-2">{title}</h3>
                <p className="text-sm text-fog-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats — LIGHT */}
      <StatsSection variant="light" />

      <ReservationCta />
    </>
  );
}
