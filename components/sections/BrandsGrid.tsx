"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { brands } from "@/data/brands";
import { staggerContainer, fadeInUp, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type BrandsGridProps = {
  background?: "white" | "muted";
};

export function BrandsGrid({ background = "white" }: BrandsGridProps) {
  return (
    <section
      className={cn("py-24 md:py-28", background === "muted" ? "bg-paper-100" : "bg-paper")}
    >
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
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-4">
              Zaupamo le najboljšim znamkam
            </h2>
            <p className="text-sm text-graphite-500">Uradni partner za pnevmatike Yokohama.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {brands.map((brand) => (
              <motion.div
                key={brand.slug}
                variants={fadeInUp}
                className="group flex items-center justify-center h-16 rounded-xl px-3 bg-white border border-paper-300 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-0.5"
              >
                <span className="font-display font-medium text-sm text-graphite-500 group-hover:text-graphite-900 transition-colors text-center">
                  {brand.name}
                  {brand.isOfficialPartner && (
                    <span className="block text-[8px] font-semibold uppercase tracking-wider text-brand-500 mt-0.5">
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
