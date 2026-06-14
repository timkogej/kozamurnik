"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, Disc3, Target, Settings, Warehouse, Truck, Bus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Disc3, Target, Settings, Warehouse, Truck, Bus,
};

type ServiceCardData = {
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
};

type ServicesGridProps = {
  services: ServiceCardData[];
  showAllLink?: boolean;
  /** "muted" puts grey cards on a white section; default white cards */
  background?: "white" | "muted";
};

export function ServicesGrid({ services, showAllLink = false, background = "white" }: ServicesGridProps) {
  return (
    <section className={cn("py-24 md:py-32", background === "muted" ? "bg-paper-100" : "bg-paper")}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="space-y-12 md:space-y-16"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <Eyebrow className="mb-3">Naše storitve</Eyebrow>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-4">
              Vse za vaše vozilo na enem mestu
            </h2>
            <p className="font-sans text-lg leading-[1.65] text-graphite-500">
              Ponujamo celovite storitve za varno in brezskrbno vožnjo skozi vse leto.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(({ slug, title, icon, shortDesc }) => {
              const Icon = iconMap[icon] || Wrench;
              return (
                <motion.div key={slug} variants={fadeInUp}>
                  <Link
                    href={slug === "avtovleka" ? "/avtovleka" : `/storitve/${slug}`}
                    className="group flex flex-col h-full p-6 md:p-8 rounded-2xl bg-white border border-paper-300 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5 transition-colors group-hover:bg-brand-100">
                      <Icon className="w-6 h-6 text-brand-500" aria-hidden />
                    </div>
                    <h3 className="font-display font-medium text-xl text-graphite-900 mb-2">
                      {title}
                    </h3>
                    <p className="font-sans text-sm leading-[1.6] text-graphite-500 flex-1 mb-4">
                      {shortDesc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-500">
                      Več
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA button below grid */}
          {showAllLink && (
            <motion.div variants={fadeInUp} className="flex justify-center">
              <Link
                href="/storitve"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-base border-2 border-graphite-900 text-graphite-900 hover:bg-paper-100 hover:text-graphite-900 transition-all duration-200"
              >
                Oglejte si vse storitve
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
