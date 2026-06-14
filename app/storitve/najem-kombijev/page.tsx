import type { Metadata } from "next";
import {
  Phone,
  Boxes,
  Users,
  Gauge,
  Sofa,
  Package,
  ShoppingBag,
  Truck,
  KeyRound,
  FileText,
  Fuel,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { PhoneCta } from "@/components/sections/PhoneCta";
import { Reveal } from "@/components/motion/Reveal";
import { RollingTireDivider } from "@/components/motion/RollingTireDivider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { vans } from "@/data/vans";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Najem kombijev",
  description:
    "Zanesljiv najem kombijev za selitve, prevoze in večje nakupe. Trije kombiji na voljo, fleksibilni termini. Šentjanž.",
};

const useCases = [
  {
    icon: Sofa,
    title: "Selitve",
    desc: "Dovolj prostora za pohištvo in škatle — selitev opravite v enem dnevu.",
  },
  {
    icon: Package,
    title: "Prevoz pohištva",
    desc: "Varno preložite večje kose pohištva ali bele tehnike.",
  },
  {
    icon: Truck,
    title: "Dostava",
    desc: "Zanesljiv kombi za enkratne ali redne dostave vašega blaga.",
  },
  {
    icon: ShoppingBag,
    title: "Večji nakupi",
    desc: "Gradbeni material, vrtna oprema ali nakup, ki ne gre v avto.",
  },
];

const pogoji = [
  {
    icon: KeyRound,
    title: "Voznik",
    desc: "Veljavno vozniško dovoljenje B kategorije. Najmanj 21 let in 2 leti vozniških izkušenj.",
  },
  {
    icon: FileText,
    title: "Dokumenti",
    desc: "Osebni dokument in vozniško dovoljenje ob prevzemu. Pogodba se sklene na mestu.",
  },
  {
    icon: Fuel,
    title: "Gorivo",
    desc: "Kombi prevzamete s polnim rezervoarjem in ga vrnete polnega.",
  },
  {
    icon: ShieldCheck,
    title: "Zavarovanje",
    desc: "Vsa vozila so kasko zavarovana. Podrobnosti o odbitni franšizi ob rezervaciji.",
  },
];

export default function NajemKombijevPage() {
  return (
    <>
      <PageHero
        eyebrow="Storitve · Najem"
        headline="Najem kombijev"
        subhead="Zanesljiv najem kombijev za selitve, prevoze in večje nakupe. Trije kombiji na voljo, fleksibilni termini."
        breadcrumbs={[{ label: "Storitve", href: "/storitve" }, { label: "Najem kombijev" }]}
        showBookingCta={false}
        phoneCta={{ label: "Pokliči za rezervacijo" }}
        secondaryCta={{ label: "Več o pogojih", href: "#pogoji" }}
        backgroundImage="/images/services/kozamurnik-storitve-hero-2.png"
        imageAlt="Komplet pnevmatik s križnim ključem — storitve Kozamurnik"
        imageWidthClass="lg:w-[56%]"
      />

      {/* Intro */}
      <section className="bg-paper py-10 md:py-16">
        <Container>
          <p className="text-center font-sans text-lg leading-[1.65] text-graphite-500 max-w-3xl mx-auto">
            Poleg skrbi za vaše pnevmatike vam ponujamo tudi najem kombijev. Naj gre za selitev,
            prevoz pohištva ali večji nakup — pri nas najdete pravo vozilo za vsako nalogo.
            Rezervacija poteka preprosto po telefonu, termini so fleksibilni.
          </p>
        </Container>
      </section>

      {/* The three vans */}
      <section className="bg-paper py-12 md:py-20">
        <Container>
          <Reveal className="mb-10">
            <Eyebrow className="mb-3">Naša vozila</Eyebrow>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900">
              Trije kombiji na voljo
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {vans.map((van, i) => (
              <Reveal key={van.id} delay={i * 0.08}>
                <div className="group flex flex-col h-full bg-white border border-paper-300 rounded-2xl shadow-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg">
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-paper-200 overflow-hidden">
                    <ImageWithFallback
                      src={van.image}
                      alt={van.name}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-display font-medium text-xl text-graphite-900 mb-4">
                      {van.name}
                    </h3>

                    <ul className="space-y-2.5 mb-5">
                      <li className="flex items-center gap-2.5 text-sm text-graphite-700">
                        <Gauge className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
                        Nosilnost: {van.capacity}
                      </li>
                      <li className="flex items-center gap-2.5 text-sm text-graphite-700">
                        <Boxes className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
                        Tovorni prostor: {van.volume}
                      </li>
                      <li className="flex items-center gap-2.5 text-sm text-graphite-700">
                        <Users className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
                        {van.seats}
                      </li>
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {van.bestFor.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-600 border border-brand-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`tel:${siteConfig.contact.gsmTel}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-xl shadow-brand transition-colors"
                    >
                      <Phone className="w-4 h-4 shrink-0" aria-hidden />
                      Povpraševanje
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <RollingTireDivider />

      {/* Use cases */}
      <section className="bg-paper-100 border-y border-paper-300 py-24 md:py-32">
        <Container>
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow className="mb-3">Uporaba</Eyebrow>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900">
              Za kaj je najem primeren
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="bg-white border border-paper-300 rounded-2xl p-6 shadow-soft h-full">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-500" aria-hidden />
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

      {/* Pogoji najema */}
      <section id="pogoji" className="bg-paper py-24 md:py-32 scroll-mt-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <Reveal>
              <Eyebrow className="mb-4">Pogoji</Eyebrow>
              <h2 className="font-display font-semibold text-4xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-4">
                Pogoji najema
              </h2>
              <p className="text-graphite-500 leading-[1.65]">
                Preprosti in pregledni pogoji — brez drobnega tiska. Za podrobnosti in cenik
                pokličite, z veseljem svetujemo.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pogoji.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 p-5 bg-paper-100 border border-paper-200 rounded-2xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-paper-300 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-500" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-display font-medium text-base text-graphite-900 mb-1">
                        {title}
                      </h3>
                      <p className="text-sm text-graphite-500 leading-[1.6]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Phone CTA band */}
      <PhoneCta
        title="Rezervirajte svoj kombi"
        subtitle="Pokličite in preverite razpoložljivost — termin uskladimo po vaših željah."
      />
    </>
  );
}
