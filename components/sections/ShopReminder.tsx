"use client";

import { motion } from "framer-motion";
import { ExternalLink, Check } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

const benefits = ["Preverjene znamke", "Konkurenčne cene", "Strokovna montaža na voljo"];

type ShopReminderProps = {
  variant?: "default" | "light" | "dark";
};

export function ShopReminder({ variant = "default" }: ShopReminderProps) {
  const isDark = variant === "dark";
  const isLight = variant === "light";
  return (
    <section
      className={
        isDark
          ? "bg-gradient-to-br from-ink-800 to-ink-900 border-y border-ink-700 py-20 md:py-28"
          : isLight
            ? "bg-fog-100 border-t border-fog-200 py-20 md:py-28"
            : "bg-fog-50 border-t border-fog-200 py-20 md:py-28"
      }
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left */}
          <motion.div variants={fadeInUp}>
            <Eyebrow className="mb-3">Spletna trgovina</Eyebrow>
            <h2
              className={`font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 ${isDark ? "text-fog-50" : "text-ink-900"}`}
            >
              Izberite pnevmatike po meri vašega vozila
            </h2>
            <p
              className={`font-sans text-base leading-relaxed mb-6 ${isDark ? "text-fog-400" : "text-fog-500"}`}
            >
              V naši spletni trgovini najdete širok izbor letnih, zimskih in celoletnih pnevmatik
              vodilnih znamk. Brskajte, primerjajte in naročite — dostava ali prevzem pri nas.
            </p>
            <ul className="space-y-2.5 mb-8">
              {benefits.map((b) => (
                <li
                  key={b}
                  className={`flex items-center gap-2.5 ${isDark ? "text-fog-200" : "text-ink-700"}`}
                >
                  <Check className="w-4 h-4 text-success shrink-0" aria-hidden />
                  <span className="text-sm font-medium">{b}</span>
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.externalLinks.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors"
            >
              Odpri spletno trgovino
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
            </a>
          </motion.div>

          {/* Right — tires image */}
          <motion.div variants={fadeInUp} className="hidden lg:block">
            <div
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-card-lg ${isDark ? "border-ink-600" : isLight ? "border-fog-200" : "border-fog-200"}`}
            >
              <Image
                src="/images/brands/tires-stack.jpg"
                alt="Pnevmatike"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
