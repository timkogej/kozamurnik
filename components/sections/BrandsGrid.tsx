"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { brands } from "@/data/brands";
import { staggerContainer, fadeInUp, VIEWPORT_ONCE } from "@/lib/motion";

type BrandsGridProps = {
  variant?: "light" | "dark";
};

export function BrandsGrid({ variant = "light" }: BrandsGridProps) {
  const isDark = variant === "dark";
  return (
    <section className={isDark ? "bg-ink-900 py-20 md:py-28" : "bg-fog-100 py-20 md:py-28"}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="space-y-10"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <Eyebrow className="mb-3">Uradni prodajalec</Eyebrow>
            <h2
              className={`font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 ${isDark ? "text-fog-50" : "text-ink-900"}`}
            >
              Zaupamo le najboljšim znamkam
            </h2>
            <p className={`text-sm ${isDark ? "text-fog-400" : "text-fog-500"}`}>
              Uradni partner za pnevmatike Yokohama.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {brands.map((brand) => (
              <motion.div
                key={brand.slug}
                variants={fadeInUp}
                className={`group flex items-center justify-center h-16 rounded-xl transition-all duration-300 px-3 hover:border-brand-500/40 ${isDark ? "bg-ink-800 border border-ink-700" : "bg-white border border-fog-200 shadow-card"}`}
              >
                <span
                  className={`font-display font-bold text-sm transition-colors text-center ${isDark ? "text-fog-200 group-hover:text-fog-50" : "text-ink-700 group-hover:text-ink-900"}`}
                >
                  {brand.name}
                  {brand.isOfficialPartner && (
                    <span className="block text-[8px] text-brand-500 mt-0.5">
                      Partner
                    </span>
                  )}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
