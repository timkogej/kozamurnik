"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems, type FaqItem } from "@/data/faq";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

type FaqSectionProps = {
  filterTags?: FaqItem["tags"][number][];
  limit?: number;
};

export function FaqSection({ filterTags, limit }: FaqSectionProps) {
  let items = filterTags
    ? faqItems.filter((f) => f.tags.some((t) => filterTags.includes(t)))
    : faqItems;
  if (limit) items = items.slice(0, limit);

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
            {/* Left */}
            <motion.div variants={fadeInUp}>
              <Eyebrow className="mb-3">Pogosta vprašanja</Eyebrow>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-4">
                Odgovori na vaša vprašanja
              </h2>
              <p className="font-sans text-base leading-[1.65] text-graphite-500">
                Ne najdete odgovora? Pokličite nas na{" "}
                <a
                  href="tel:041607298"
                  className="text-brand-500 hover:text-brand-600 font-medium"
                >
                  041 607 298
                </a>{" "}
                ali pišite na{" "}
                <a href="/kontakt" className="text-brand-500 hover:text-brand-600 font-medium">
                  kontaktnem obrazcu
                </a>
                .
              </p>
            </motion.div>

            {/* Right — accordion */}
            <motion.div variants={fadeInUp}>
              <Accordion
                items={items.map((f) => ({
                  id: f.id,
                  question: f.question,
                  answer: f.answer,
                }))}
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
