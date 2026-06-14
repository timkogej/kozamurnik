"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { partners } from "@/data/partners";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

export function PartnersSection() {
  return (
    <section className="bg-paper-100 border-y border-paper-300 py-16 md:py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="font-display font-medium text-3xl text-graphite-900 mb-3">
              Asistenčni partnerji
            </h2>
            <p className="text-base text-graphite-500 max-w-xl mx-auto">
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
                className="bg-white rounded-2xl border border-paper-300 shadow-soft p-6 flex items-center justify-center"
              >
                <span className="font-display font-medium text-sm text-graphite-500 text-center">
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
