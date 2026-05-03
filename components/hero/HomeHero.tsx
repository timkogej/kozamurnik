"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Calendar, ExternalLink, Check, Clock, Star, Wrench, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { EASE_ARRIVE } from "@/lib/motion";

const headline = ["Pnevmatike,", "vulkanizerstvo", "in hitra rezervacija", "termina na enem mestu."];

const features = [
  { icon: Clock, bold: "Hitra", sub: "rezervacija" },
  { icon: Check, bold: "Preverjene", sub: "znamke" },
  { icon: Wrench, bold: "Strokovna", sub: "storitev" },
  { icon: Star, bold: "Zanesljiv", sub: "servis" },
];

export function HomeHero() {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wordAnim: Variants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      ...(prefersReducedMotion
        ? {}
        : { transition: { delay: i * 0.05, duration: 0.5, ease: EASE_ARRIVE } }),
    }),
  };

  const floatClass = prefersReducedMotion ? "" : "animate-float";
  const floatClassDelayed = prefersReducedMotion ? "" : "animate-float-delayed";

  let wordIndex = 0;
  const allWords: { text: string; lineBreak?: boolean }[] = [];
  headline.forEach((line, li) => {
    line.split(" ").forEach((word, wi) => {
      allWords.push({ text: word, lineBreak: wi === 0 && li > 0 });
    });
  });

  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden">
      {/* Background image placeholder */}
      <div
        className="absolute inset-0 bg-ink-900"
        style={{
          backgroundImage: "url('/images/hero/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="presentation"
        aria-hidden
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-xs uppercase tracking-[0.16em] font-semibold text-brand-500 mb-6"
            >
              {siteConfig.tagline}
            </motion.p>

            {/* Headline — word-by-word */}
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-fog-50 mb-6">
              {allWords.map(({ text, lineBreak }, i) => (
                <span key={i}>
                  {lineBreak && <br />}
                  <motion.span
                    className="inline-block mr-[0.2em]"
                    initial={prefersReducedMotion ? {} : "hidden"}
                    animate="visible"
                    variants={wordAnim}
                    custom={wordIndex++}
                  >
                    {text}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subhead */}
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: EASE_ARRIVE }}
              className="font-sans text-lg leading-relaxed text-fog-400 mb-8 max-w-xl"
            >
              Zanesljiva menjava pnevmatik, strokovno svetovanje, kakovostne pnevmatike in hitra
              spletna rezervacija termina za vaše vozilo. Že več kot 30 let zaupanja strank.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6, ease: EASE_ARRIVE }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href={siteConfig.externalLinks.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors animate-pulse-glow"
              >
                <Calendar className="w-4 h-4 shrink-0" aria-hidden />
                Rezerviraj termin
              </a>
              <a
                href={siteConfig.externalLinks.shop}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-fog-50/20 hover:border-fog-50/40 hover:bg-fog-50/5 text-fog-50 font-semibold rounded-xl transition-colors"
              >
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
                Preveri pnevmatike
              </a>
            </motion.div>

            {/* Feature row */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {features.map(({ icon: Icon, bold, sub }) => (
                <div key={bold} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-brand-500" aria-hidden />
                  </div>
                  <div className="text-sm leading-tight">
                    <span className="font-semibold text-fog-50">{bold}</span>
                    <br />
                    <span className="text-fog-500">{sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — floating cards */}
          <div className="hidden lg:flex flex-col gap-4 relative">
            {/* Card A */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE_ARRIVE }}
              className={`bg-fog-50 text-ink-900 rounded-2xl p-6 shadow-card-lg ${floatClass}`}
            >
              <p className="font-display font-bold text-base text-ink-900 mb-3">Mini servis</p>
              <ul className="space-y-2">
                {["Menjava pnevmatik", "Avtovzdrževanje", "Strokovna storitev"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-ink-700">
                    <Check className="w-4 h-4 text-success shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card B */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: EASE_ARRIVE }}
              className={`bg-fog-50 text-ink-900 rounded-2xl p-6 shadow-card-lg ml-8 ${floatClassDelayed}`}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" aria-hidden />
                ))}
              </div>
              <p className="font-sans text-sm text-ink-700 italic leading-relaxed mb-3">
                &ldquo;Zanesljiva storitev in prijazno osebje.&rdquo;
              </p>
              <p className="text-xs font-semibold text-ink-600">— Marko L.</p>
              <p className="text-xs text-ink-500 mt-1">
                <span className="font-bold text-ink-800">9.6/10</span> · 96+ Google ocen
              </p>
            </motion.div>

            {/* Card C */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: EASE_ARRIVE }}
              className="bg-ink-800 border border-ink-700 rounded-2xl p-4 shadow-card"
            >
              <p className="text-xs font-semibold text-fog-500 mb-2">
                Preverjene znamke
              </p>
              <div className="flex flex-wrap gap-2">
                {["Michelin", "Continental", "Pirelli", "Goodyear"].map((brand) => (
                  <span
                    key={brand}
                    className="px-2.5 py-1 bg-ink-700 text-fog-400 text-xs rounded-lg"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
        aria-hidden
      >
        <span className="text-xs text-fog-500">Več</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-fog-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
