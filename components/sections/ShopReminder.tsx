"use client";

import { motion } from "framer-motion";
import { ExternalLink, Check } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/cn";

const benefits = ["Preverjene znamke", "Konkurenčne cene", "Strokovna montaža na voljo"];

type ShopReminderProps = {
  background?: "white" | "muted";
};

export function ShopReminder({ background = "muted" }: ShopReminderProps) {
  return (
    <section
      className={cn(
        "py-24 md:py-32",
        background === "muted" ? "bg-paper-100 border-y border-paper-300" : "bg-paper"
      )}
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
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-4">
              Izberite pnevmatike po meri vašega vozila
            </h2>
            <p className="font-sans text-base leading-[1.65] text-graphite-500 mb-6">
              V naši spletni trgovini najdete širok izbor letnih, zimskih in celoletnih pnevmatik
              vodilnih znamk. Brskajte, primerjajte in naročite — dostava ali prevzem pri nas.
            </p>
            <ul className="space-y-2.5 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-graphite-700">
                  <Check className="w-4 h-4 text-success shrink-0" aria-hidden />
                  <span className="text-sm font-medium">{b}</span>
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.externalLinks.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-xl shadow-brand transition-colors"
            >
              Odpri spletno trgovino
              <ExternalLink
                className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </motion.div>

          {/* Right — tires image */}
          <motion.div variants={fadeInUp} className="hidden lg:block">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-paper-300 shadow-card-lg bg-paper-200">
              <Image
                src="/images/brands/tires-stack.jpg"
                alt="Pnevmatike v spletni trgovini"
                fill
                quality={90}
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
