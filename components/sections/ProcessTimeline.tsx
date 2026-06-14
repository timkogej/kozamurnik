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
    <section className="bg-paper-100 border-y border-paper-300 py-24 md:py-32">
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
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-4">
              Kako poteka obisk
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-paper-300"
              aria-hidden
            />

            {steps.map(({ icon: Icon, title, desc, step }) => (
              <motion.div
                key={step}
                variants={fadeInUp}
                className="flex flex-col items-center md:items-start lg:items-center text-center md:text-left lg:text-center"
              >
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-paper-300 shadow-soft flex items-center justify-center">
                    <Icon className="w-8 h-8 text-brand-500" aria-hidden />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                    {parseInt(step)}
                  </span>
                </div>
                <h3 className="font-display font-medium text-xl text-graphite-900 mb-2">{title}</h3>
                <p className="font-sans text-sm text-graphite-500 leading-[1.6] max-w-[220px] lg:max-w-none">
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
