"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { partners } from "@/data/partners";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

export function PartnersSection() {
  return (
    <section className="bg-ink-900 border-y border-ink-700 py-16 md:py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="font-display font-bold text-3xl text-fog-50 mb-3">
              Asistenčni partnerji
            </h2>
            <p className="text-base text-fog-300 max-w-xl mx-auto">
              Sodelujemo z vodilnimi zavarovalnicami. Če ste zavarovani pri njih, pokličite njihovo
              asistenco — mi pridemo.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.slug}
                variants={fadeInUp}
                className="bg-ink-800 rounded-2xl border border-ink-700 p-6 flex items-center justify-center"
              >
                <span className="font-display font-bold text-sm text-fog-300 text-center">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
