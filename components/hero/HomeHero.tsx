"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  ChevronDown,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { EASE_ARRIVE } from "@/lib/motion";
import { ScrollRotateTire } from "@/components/motion/ScrollRotateTire";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import heroCarImage from "@/public/images/hero/kozamurnik-hero-4.png";

// Static headline lines, rendered word-by-word
const headlineLines: string[][] = [
  ["Za", "vaše"],
  ["pnevmatike"],
  ["poskrbimo"],
];

// Words that cycle on the final headline line
const rotatingWords = ["hitro", "zanesljivo", "strokovno", "natančno"];

function RotatingWord({ reduced }: { reduced: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setTimeout(
      () => setIndex((i) => (i === rotatingWords.length - 1 ? 0 : i + 1)),
      2200
    );
    return () => clearTimeout(id);
  }, [index, reduced]);

  // Sized to the widest word so layout never shifts as words cycle
  return (
    <span className="relative block h-[1.1em] overflow-hidden text-brand-500">
      <span className="invisible" aria-hidden>
        zanesljivo
      </span>
      {rotatingWords.map((word, i) => (
        <motion.span
          key={word}
          className="absolute left-0 top-0"
          initial={false}
          animate={
            index === i
              ? { y: "0%", opacity: 1 }
              : { y: index > i ? "-120%" : "120%", opacity: 0 }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 60, damping: 14 }
          }
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function HomeHero() {
  const reduced = useReducedMotionSafe();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const floatClass = reduced ? "" : "animate-float";
  const floatClassDelayed = reduced ? "" : "animate-float-delayed";

  // Cumulative word count per line, for the staggered word delays
  const lineOffsets = headlineLines.reduce<number[]>(
    (acc, line, i) => [...acc, (acc[i] ?? 0) + line.length],
    [0]
  );

  return (
    <section className="relative flex items-start overflow-hidden bg-paper lg:min-h-screen lg:items-center">
      {/* Soft ambient wash on the right */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-paper-100 to-transparent pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-12 sm:pt-28 sm:pb-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[11fr_9fr] gap-16 items-center">
          {/* Left column */}
          <div className="relative z-20">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-brand-500 mb-4 md:mb-6"
            >
              Vulkanizerstvo · Šentjanž · od 1993
            </motion.p>

            {/* Headline — word-by-word */}
            <h1 className="font-display font-semibold text-[3.6rem] max-[360px]:text-[3.15rem] md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.04] md:leading-[1.06] text-graphite-900 mb-7">
              {headlineLines.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word, wi) => (
                    <motion.span
                      key={`${li}-${word}`}
                      className="inline-block mr-[0.22em]"
                      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1 + (lineOffsets[li] + wi) * 0.06,
                        duration: 0.55,
                        ease: EASE_ARRIVE,
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
              <motion.span
                className="block"
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + lineOffsets[headlineLines.length] * 0.06,
                  duration: 0.55,
                  ease: EASE_ARRIVE,
                }}
              >
                <RotatingWord reduced={reduced} />
              </motion.span>
            </h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: EASE_ARRIVE }}
              className="font-sans text-lg leading-[1.65] text-graphite-500 mb-9 max-w-xl"
            >
              Zanesljiva menjava pnevmatik, strokovno svetovanje in hitra spletna
              rezervacija za vaše vozilo. Več kot 30 let izkušenj.
            </motion.p>

            {/* Three CTAs */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6, ease: EASE_ARRIVE }}
              className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap gap-3 mb-9"
            >
              <a
                href={siteConfig.externalLinks.booking}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 py-3.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-xl shadow-brand transition-all active:scale-[0.98] group xl:px-6"
              >
                <Calendar className="w-4 h-4 shrink-0" aria-hidden />
                Rezerviraj termin
              </a>
              <a
                href={siteConfig.externalLinks.shop}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 py-3.5 border-2 border-graphite-900 text-graphite-900 hover:bg-paper-100 hover:text-graphite-900 text-sm font-medium rounded-xl transition-all active:scale-[0.98] xl:px-6"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden />
                Spletna trgovina
              </a>
              <a
                href={siteConfig.externalLinks.configurator}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 py-3.5 text-brand-500 hover:bg-brand-50 text-sm font-medium rounded-xl transition-all active:scale-[0.98] xl:px-6"
              >
                <SlidersHorizontal className="w-4 h-4 shrink-0" aria-hidden />
                Konfigurator platišč
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.6 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-graphite-500"
            >
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-brand-500 text-brand-500" aria-hidden />
                <span className="font-semibold text-graphite-900">4,7/5</span>
              </span>
              <span className="text-graphite-300" aria-hidden>
                ·
              </span>
              <span>96+ Google ocen</span>
              <span className="text-graphite-300" aria-hidden>
                ·
              </span>
              <span>30+ let izkušenj</span>
            </motion.div>
          </div>

          {/* Right column — car image centered behind a fixed-size rotating tire.
              On mobile it flows below the headline/CTAs (single-column grid). */}
          <div className="relative z-0 lg:-ml-12 xl:-ml-16" aria-hidden>
            <motion.div
              initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: EASE_ARRIVE }}
              className="relative mx-auto h-[300px] w-[300px] max-[360px]:h-[270px] max-[360px]:w-[270px] lg:h-[430px] lg:w-[560px] xl:h-[500px] xl:w-[660px]"
            >
              <div className="absolute inset-y-[-18%] inset-x-[-10%] z-0 pointer-events-none">
                <Image
                  src={heroCarImage}
                  alt=""
                  priority
                  sizes="(min-width: 1280px) 1660px, (min-width: 1024px) 1440px, 920px"
                  className="absolute left-1/2 top-1/2 h-auto w-[920px] max-w-none -translate-x-[45.8%] -translate-y-[66.7%] select-none lg:w-[1440px] xl:w-[1660px]"
                />
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 h-[280px] w-[280px] max-[360px]:h-[250px] max-[360px]:w-[250px] -translate-x-1/2 -translate-y-1/2 lg:h-[420px] lg:w-[420px] xl:h-[480px] xl:w-[480px]">
                {/* Dashed orbit ring — spins opposite to the tire */}
                <div
                  className={`absolute inset-[-7%] ${reduced ? "" : "animate-spin-orbit"}`}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="49"
                      fill="none"
                      stroke="#C2C7CE"
                      strokeWidth="0.35"
                      strokeDasharray="2.5 4"
                    />
                    <circle cx="50" cy="1" r="1.1" fill="#E11D2E" />
                  </svg>
                </div>

                {/* The tire — continuous + scroll-driven rotation */}
                <ScrollRotateTire
                  className="absolute inset-0"
                />
              </div>

              {/* Floating booking card */}
              <div className={`absolute left-0 bottom-14 z-20 hidden lg:block ${floatClass}`}>
                <div className="bg-white border border-paper-300 rounded-2xl shadow-card-lg p-5 w-56">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-brand-500" />
                    </div>
                    <p className="font-display font-medium text-sm text-graphite-900">
                      Hitra rezervacija
                    </p>
                  </div>
                  <p className="text-xs text-graphite-500 leading-snug">
                    Izberi termin v 30 sekundah
                  </p>
                </div>
              </div>

              {/* Floating rating chip */}
              <div className={`absolute right-4 top-10 z-20 hidden lg:block ${floatClassDelayed}`}>
                <div className="bg-white border border-paper-300 rounded-2xl shadow-card p-4">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-brand-500 text-brand-500"
                      />
                    ))}
                    <span className="ml-1 font-display font-bold text-sm text-graphite-900">
                      4,7
                    </span>
                  </div>
                  <p className="text-[11px] text-graphite-400">Google ocene</p>
                </div>
              </div>

              {/* Small decorative dots */}
              <div className={`absolute top-8 left-16 hidden lg:block w-2 h-2 rounded-full bg-brand-500/50 ${floatClass}`} />
              <div
                className={`absolute bottom-9 right-28 hidden lg:block w-1.5 h-1.5 rounded-full bg-graphite-300 ${floatClassDelayed}`}
              />
              <div
                className={`absolute top-1/3 right-0 hidden lg:block w-2.5 h-2.5 rounded-full bg-paper-300 ${floatClass}`}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-1 pointer-events-none lg:flex"
        aria-hidden
      >
        <span className="text-xs text-graphite-400">Več</span>
        <motion.div
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-graphite-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
