"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

const navItems = [
  { label: "Domov", href: "/" },
  { label: "O nas", href: "/o-nas" },
  { label: "Storitve", href: "/storitve", isHub: true },
  { label: "Pnevmatike", href: "/pnevmatike", isHub: true },
  { label: "Avtovleka", href: "/avtovleka" },
  { label: "Kontakt", href: "/kontakt" },
];

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-ink-900 flex flex-col overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigacijski meni"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-ink-700">
            <Link href="/" onClick={onClose} className="block">
              <span className="font-display font-bold text-xl text-fog-50 leading-none">
                Kozamurnik
              </span>
              <span className="block font-sans text-[9px] uppercase tracking-widest text-fog-400 mt-0.5">
                Center mobilnosti d.o.o.
              </span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Zapri meni"
              className="p-2 rounded-xl hover:bg-ink-700 transition-colors"
            >
              <X className="w-5 h-5 text-fog-300" aria-hidden />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) =>
              item.isHub ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-fog-300 hover:text-fog-50 hover:bg-ink-700 rounded-xl transition-colors"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 text-fog-500 shrink-0" aria-hidden />
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block px-3 py-2.5 text-base font-medium text-fog-300 hover:text-fog-50 hover:bg-ink-700 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="pt-2">
              <p className="px-3 py-2 text-xs font-semibold text-fog-500 mb-1">
                Spletna trgovina
              </p>
              <a
                href={siteConfig.externalLinks.shop}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2.5 text-base font-medium text-brand-400 hover:text-brand-400 hover:bg-ink-700 rounded-xl transition-colors"
              >
                Gume.kozamurnik.si
                <ExternalLink className="w-3.5 h-3.5" aria-hidden />
              </a>
            </div>
          </nav>

          {/* CTA */}
          <div className="p-4 border-t border-ink-700">
            <a
              href={siteConfig.externalLinks.booking}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors"
            >
              <Calendar className="w-4 h-4" aria-hidden />
              Rezerviraj termin
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
