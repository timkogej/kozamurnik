import { Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Container } from "@/components/ui/Container";

type PhoneCtaProps = {
  title?: string;
  subtitle?: string;
};

/**
 * Phone-first CTA band for services booked by phone
 * (mini servis, najem kombijev, avtovleka).
 */
export function PhoneCta({
  title = "Pokličite nas",
  subtitle = "Za termin se dogovorite po telefonu — hitro in brez čakanja.",
}: PhoneCtaProps) {
  return (
    <section className="relative overflow-hidden bg-brand-500 py-10 md:py-12">
      <Container className="relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-[-0.025em] leading-[1.08] text-white mb-2">
              {title}
            </h2>
            <p className="font-sans text-sm md:text-base leading-[1.6] text-white/85">{subtitle}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 mt-3 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden />
                {siteConfig.hours.weekdays}
              </span>
              <span>{siteConfig.hours.saturday}</span>
            </div>
          </div>
          <a
            href={`tel:${siteConfig.contact.gsmTel}`}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-white text-brand-600 hover:bg-brand-50 font-medium rounded-xl transition-colors active:scale-[0.98] shrink-0"
          >
            <Phone className="w-5 h-5 shrink-0" aria-hidden />
            Pokliči: {siteConfig.contact.gsm}
          </a>
        </div>
      </Container>
    </section>
  );
}
