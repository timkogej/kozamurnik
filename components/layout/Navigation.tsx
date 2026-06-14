"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Calendar,
  ExternalLink,
  Menu,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/cn";
import { servicesItems, tiresItems } from "@/lib/nav-items";

const navLinkClass =
  "relative px-3 py-2 text-sm font-medium text-graphite-700 hover:text-brand-500 transition-colors after:absolute after:left-3 after:right-3 after:-bottom-px after:h-0.5 after:bg-brand-500 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";

function Dropdown({ items, isShop }: { items: typeof servicesItems; isShop?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white border border-paper-300 rounded-2xl shadow-card-lg overflow-hidden z-50"
    >
      <div className="grid grid-cols-2 gap-0.5 p-2">
        {items.map(({ label, href, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-paper-100 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="w-4 h-4 text-brand-500" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-medium text-graphite-700 group-hover:text-graphite-900 transition-colors leading-tight">
                {label}
              </p>
              <p className="text-xs text-graphite-400 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
      {isShop && (
        <div className="border-t border-paper-300 p-2">
          <a
            href={siteConfig.externalLinks.shop}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-brand-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-brand-500" aria-hidden />
            <span className="text-sm font-medium text-brand-500">
              Spletna trgovina gume.kozamurnik.si
            </span>
          </a>
        </div>
      )}
    </motion.div>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"storitve" | "pnevmatike" | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openDropdown = (name: "storitve" | "pnevmatike") => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveDropdown(name);
  };

  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const toggleDropdown = (name: "storitve" | "pnevmatike") => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300 border-b",
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-paper-300 shadow-soft"
            : "bg-transparent border-transparent shadow-none"
        )}
        style={{ height: "72px" }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex flex-col leading-none">
            <span className="font-display font-semibold text-xl text-graphite-900">
              Kozamurnik
            </span>
            <span className="font-sans text-[9px] uppercase tracking-widest text-graphite-400">
              Center mobilnosti d.o.o.
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Glavna navigacija">
            <Link href="/" className={navLinkClass}>
              Domov
            </Link>
            <Link href="/o-nas" className={navLinkClass}>
              O nas
            </Link>

            {/* Storitve — dual-action: label navigates, chevron toggles dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("storitve")}
              onMouseLeave={scheduleClose}
            >
              <div className="flex items-center rounded-lg hover:bg-paper-100 transition-colors">
                <Link
                  href="/storitve"
                  className="pl-3 pr-1.5 py-2 text-sm font-medium text-graphite-700 hover:text-brand-500 transition-colors"
                >
                  Storitve
                </Link>
                <button
                  type="button"
                  className="pr-2 py-2 text-graphite-400 hover:text-graphite-900 transition-colors"
                  aria-expanded={activeDropdown === "storitve"}
                  aria-haspopup="true"
                  aria-label="Odpri meni storitev"
                  onClick={() => toggleDropdown("storitve")}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === " ") {
                      e.preventDefault();
                      openDropdown("storitve");
                    }
                  }}
                >
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      activeDropdown === "storitve" && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
              </div>
              <AnimatePresence>
                {activeDropdown === "storitve" && (
                  <div onMouseEnter={() => openDropdown("storitve")} onMouseLeave={scheduleClose}>
                    <Dropdown items={servicesItems} />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Pnevmatike — dual-action */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("pnevmatike")}
              onMouseLeave={scheduleClose}
            >
              <div className="flex items-center rounded-lg hover:bg-paper-100 transition-colors">
                <Link
                  href="/pnevmatike"
                  className="pl-3 pr-1.5 py-2 text-sm font-medium text-graphite-700 hover:text-brand-500 transition-colors"
                >
                  Pnevmatike
                </Link>
                <button
                  type="button"
                  className="pr-2 py-2 text-graphite-400 hover:text-graphite-900 transition-colors"
                  aria-expanded={activeDropdown === "pnevmatike"}
                  aria-haspopup="true"
                  aria-label="Odpri meni pnevmatik"
                  onClick={() => toggleDropdown("pnevmatike")}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === " ") {
                      e.preventDefault();
                      openDropdown("pnevmatike");
                    }
                  }}
                >
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      activeDropdown === "pnevmatike" && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
              </div>
              <AnimatePresence>
                {activeDropdown === "pnevmatike" && (
                  <div onMouseEnter={() => openDropdown("pnevmatike")} onMouseLeave={scheduleClose}>
                    <Dropdown items={tiresItems} isShop />
                  </div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/avtovleka" className={navLinkClass}>
              Avtovleka
            </Link>
            <Link href="/kontakt" className={navLinkClass}>
              Kontakt
            </Link>
          </nav>

          {/* Right: CTA + mobile hamburger */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.externalLinks.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-xl shadow-brand transition-colors"
            >
              <Calendar className="w-4 h-4 shrink-0" aria-hidden />
              Rezerviraj termin
            </a>
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl hover:bg-paper-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Odpri meni"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-5 h-5 text-graphite-700" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
