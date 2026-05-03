"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, Disc3, Target, Settings, Warehouse, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Disc3, Target, Settings, Warehouse, Truck,
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
  variant?: "dark" | "light";
};

export function ServicesGrid({ services, showAllLink = false, variant = "dark" }: ServicesGridProps) {
  const isLight = variant === "light";
  return (
    <section
      className={cn(
        "py-20 md:py-28 lg:py-32",
        isLight ? "bg-fog-50 border-t border-fog-200" : "bg-ink-950"
      )}
    >
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
            <h2
              className={cn(
                "font-display font-bold text-4xl md:text-5xl tracking-tight mb-4",
                isLight ? "text-ink-900" : "text-fog-50"
              )}
            >
              Vse za vaše vozilo na enem mestu
            </h2>
            <p
              className={cn(
                "font-sans text-lg leading-relaxed",
                isLight ? "text-fog-500" : "text-fog-400"
              )}
            >
              Ponujamo celovite storitve za varno in brezskrbno vožnjo skozi vse leto.
            </p>
          </motion.div>

          {/* Grid — always 6 real service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(({ slug, title, icon, shortDesc }) => {
              const Icon = iconMap[icon] || Wrench;
              return (
                <motion.div key={slug} variants={fadeInUp}>
                  <Link
                    href={slug === "avtovleka" ? "/avtovleka" : `/storitve/${slug}`}
                    className={cn(
                      "group flex flex-col h-full p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1",
                      isLight
                        ? "bg-white border border-fog-200 shadow-card hover:border-brand-500/40 hover:shadow-card-lg"
                        : "bg-ink-800 hover:bg-ink-700 border border-ink-700 hover:border-brand-500/40 hover:shadow-glow-red"
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-brand-500/20">
                      <Icon className="w-6 h-6 text-brand-500" aria-hidden />
                    </div>
                    <h3
                      className={cn(
                        "font-display font-semibold text-xl mb-2",
                        isLight ? "text-ink-900" : "text-fog-50"
                      )}
                    >
                      {title}
                    </h3>
                    <p
                      className={cn(
                        "font-sans text-sm leading-relaxed flex-1 mb-4",
                        isLight ? "text-fog-500" : "text-fog-400"
                      )}
                    >
                      {shortDesc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 transition-colors group-hover:text-brand-400">
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
            <motion.div variants={fadeInUp} className="flex justify-center mt-12">
              <Link
                href="/storitve"
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5",
                  isLight
                    ? "bg-brand-500 hover:bg-brand-600 text-white shadow-card hover:shadow-card-lg"
                    : "border border-fog-50/20 hover:border-fog-50/40 hover:bg-fog-50/5 text-fog-50"
                )}
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
