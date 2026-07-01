"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

// In-memory once-per-session flag (intentionally resets on reload)
let toastAlreadyShown = false;

const AUTO_DISMISS_MS = 12_000;

export function SeasonalToast() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotionSafe();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!siteConfig.seasonalToast.active || toastAlreadyShown) return;
    const showTimer = setTimeout(() => {
      toastAlreadyShown = true;
      setVisible(true);
    }, siteConfig.seasonalToast.delaySeconds * 1000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dismissTimer = setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(dismissTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 64, scale: 0.96 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 64, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="status"
          aria-live="polite"
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-sm"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-paper-300 rounded-2xl shadow-card-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-brand-500" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-medium text-sm text-graphite-900">
                  {siteConfig.seasonalToast.title}
                </p>
                <p className="font-sans text-sm text-graphite-500 mt-0.5 leading-snug">
                  {siteConfig.seasonalToast.text}
                </p>
                <a
                  href={siteConfig.externalLinks.booking}
                  onClick={() => setVisible(false)}
                  className="group inline-flex items-center gap-1.5 mt-2.5 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
                >
                  {siteConfig.seasonalToast.ctaLabel}
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Zapri obvestilo"
                className="p-1.5 -m-1 rounded-lg text-graphite-400 hover:text-graphite-700 hover:bg-paper-200 transition-colors shrink-0"
              >
                <X className="w-4 h-4" aria-hidden />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
