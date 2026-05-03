"use client";

import { motion } from "framer-motion";
import { Calendar, Car, Wrench, ThumbsUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

const steps = [
  {
    icon: Calendar,
    title: "Rezervacija",
    desc: "Izberite storitev in termin online. Hitro, brez čakanja na telefonu.",
    step: "01",
  },
  {
    icon: Car,
    title: "Obisk",
    desc: "Pripeljete vozilo ob dogovorjeni uri. Mi smo pripravljeni.",
    step: "02",
  },
  {
    icon: Wrench,
    title: "Storitev",
    desc: "Opravimo delo strokovno in hitro. Sledite napredku pri nas.",
    step: "03",
  },
  {
    icon: ThumbsUp,
    title: "Odhod",
    desc: "Plačilo, nasveti in zadovoljna vožnja naprej. Vidimo se prihodnjič!",
    step: "04",
  },
];

export function ProcessTimeline() {
  return (
    <section className="bg-fog-100 py-20 md:py-28">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="space-y-12"
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <Eyebrow className="mb-3">Preprost postopek</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-ink-900 mb-4">
              Kako poteka obisk
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-fog-200"
              aria-hidden
            />

            {steps.map(({ icon: Icon, title, desc, step }) => (
              <motion.div
                key={step}
                variants={fadeInUp}
                className="flex flex-col items-center md:items-start lg:items-center text-center md:text-left lg:text-center"
              >
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-fog-200 shadow-card flex items-center justify-center">
                    <Icon className="w-8 h-8 text-brand-500" aria-hidden />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                    {parseInt(step)}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl text-ink-900 mb-2">{title}</h3>
                <p className="font-sans text-sm text-fog-500 leading-relaxed max-w-[220px] lg:max-w-none">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
