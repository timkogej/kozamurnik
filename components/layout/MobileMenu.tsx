"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, ChevronRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { servicesItems, tiresItems } from "@/lib/nav-items";
import { cn } from "@/lib/cn";

const simpleNavItems = [
  { label: "Domov", href: "/" },
  { label: "O nas", href: "/o-nas" },
  { label: "Avtovleka", href: "/avtovleka" },
  { label: "Kontakt", href: "/kontakt" },
];

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<"storitve" | "pnevmatike" | null>(null);

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

  useEffect(() => {
    if (!isOpen) setExpanded(null);
  }, [isOpen]);

  const toggle = (key: "storitve" | "pnevmatike") => {
    setExpanded((prev) => (prev === key ? null : key));
  };

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
            <Link
              href="/"
              onClick={onClose}
              className="block px-3 py-2.5 text-base font-medium text-fog-300 hover:text-fog-50 hover:bg-ink-700 rounded-xl transition-colors"
            >
              Domov
            </Link>
            <Link
              href="/o-nas"
              onClick={onClose}
              className="block px-3 py-2.5 text-base font-medium text-fog-300 hover:text-fog-50 hover:bg-ink-700 rounded-xl transition-colors"
            >
              O nas
            </Link>

            {/* Storitve accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggle("storitve")}
                aria-expanded={expanded === "storitve"}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-fog-300 hover:text-fog-50 hover:bg-ink-700 rounded-xl transition-colors"
              >
                Storitve
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-fog-500 shrink-0 transition-transform duration-200",
                    expanded === "storitve" && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {expanded === "storitve" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 ml-3 border-l border-ink-700 pl-3 space-y-0.5">
                      <Link
                        href="/storitve"
                        onClick={onClose}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-400 hover:text-brand-300 hover:bg-ink-700 rounded-xl transition-colors"
                      >
                        Vse storitve
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />
                      </Link>
                      {servicesItems.map(({ label, href, icon: Icon, desc }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink-700 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-brand-500" aria-hidden />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-fog-300 group-hover:text-fog-50 transition-colors leading-tight">
                              {label}
                            </p>
                            <p className="text-xs text-fog-500">{desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pnevmatike accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggle("pnevmatike")}
                aria-expanded={expanded === "pnevmatike"}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-fog-300 hover:text-fog-50 hover:bg-ink-700 rounded-xl transition-colors"
              >
                Pnevmatike
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-fog-500 shrink-0 transition-transform duration-200",
                    expanded === "pnevmatike" && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {expanded === "pnevmatike" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 ml-3 border-l border-ink-700 pl-3 space-y-0.5">
                      <Link
                        href="/pnevmatike"
                        onClick={onClose}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-400 hover:text-brand-300 hover:bg-ink-700 rounded-xl transition-colors"
                      >
                        Vse pnevmatike
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />
                      </Link>
                      {tiresItems.map(({ label, href, icon: Icon, desc }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink-700 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-brand-500" aria-hidden />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-fog-300 group-hover:text-fog-50 transition-colors leading-tight">
                              {label}
                            </p>
                            <p className="text-xs text-fog-500">{desc}</p>
                          </div>
                        </Link>
                      ))}
                      <a
                        href={siteConfig.externalLinks.shop}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-brand-500 shrink-0" aria-hidden />
                        <span className="text-sm font-medium text-brand-400">
                          Spletna trgovina
                        </span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/avtovleka"
              onClick={onClose}
              className="block px-3 py-2.5 text-base font-medium text-fog-300 hover:text-fog-50 hover:bg-ink-700 rounded-xl transition-colors"
            >
              Avtovleka
            </Link>
            <Link
              href="/kontakt"
              onClick={onClose}
              className="block px-3 py-2.5 text-base font-medium text-fog-300 hover:text-fog-50 hover:bg-ink-700 rounded-xl transition-colors"
            >
              Kontakt
            </Link>

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
