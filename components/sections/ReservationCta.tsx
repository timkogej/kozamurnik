import { Calendar } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function ReservationCta() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 md:py-28">
      {/* Background image placeholder */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 to-ink-900/95" aria-hidden />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-display text-xs uppercase tracking-[0.16em] font-semibold text-brand-500 mb-4">
          Rezervacija
        </p>
        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-fog-50 mb-5">
          Pripravljeni za menjavo?
        </h2>
        <p className="font-sans text-lg leading-relaxed text-fog-400 mb-8">
          Rezervirajte termin v minuti. Izberite datum in uro, mi poskrbimo za ostalo.
        </p>
        <a
          href={siteConfig.externalLinks.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors animate-pulse-glow"
        >
          <Calendar className="w-5 h-5 shrink-0" aria-hidden />
          Rezerviraj termin
        </a>
      </div>
    </section>
  );
}
