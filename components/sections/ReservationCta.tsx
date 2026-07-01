import { Calendar } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Container } from "@/components/ui/Container";

export function ReservationCta() {
  return (
    <section className="relative overflow-hidden bg-brand-500 py-10 md:py-12">
      <Container className="relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <p className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-white/80 mb-2">
              Rezervacija
            </p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-[-0.025em] leading-[1.08] text-white mb-2">
              Pripravljeni za menjavo?
            </h2>
            <p className="font-sans text-sm md:text-base leading-[1.6] text-white/85">
              Rezervirajte termin v minuti. Izberite datum in uro, mi poskrbimo za ostalo.
            </p>
          </div>
          <a
            href={siteConfig.externalLinks.booking}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-600 hover:bg-brand-50 font-medium rounded-xl transition-colors active:scale-[0.98] shrink-0"
          >
            <Calendar className="w-5 h-5 shrink-0" aria-hidden />
            Rezerviraj termin
          </a>
        </div>
      </Container>
    </section>
  );
}
