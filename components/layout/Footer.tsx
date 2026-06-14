import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ExternalLink, Share2, AtSign } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Container } from "@/components/ui/Container";

/**
 * The footer is the one intentional dark moment of the light theme —
 * a graphite anchor at the very bottom of every page.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper-100 border-t border-paper-300">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-4">
              <span className="font-display font-semibold text-xl text-graphite-900 leading-none block">
                Kozamurnik
              </span>
              <span className="font-sans text-[9px] uppercase tracking-widest text-graphite-500 block mt-0.5">
                Center mobilnosti d.o.o.
              </span>
            </Link>
            <p className="text-sm text-graphite-600 leading-relaxed mb-5">
              Zanesljiv partner za pnevmatike in vulkanizerstvo od leta 1993.
            </p>
            <div className="space-y-2.5">
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="flex items-center gap-2.5 text-sm text-graphite-600 hover:text-graphite-900 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
                {siteConfig.contact.phone}
              </a>
              <Link
                href="/kontakt"
                className="flex items-center gap-2.5 text-sm text-graphite-600 hover:text-graphite-900 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
                Kontaktni obrazec
              </Link>
              <span className="flex items-center gap-2.5 text-sm text-graphite-600">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
                {siteConfig.address.full}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={siteConfig.socialLinks.facebook}
                aria-label="Facebook"
                className="p-2 rounded-lg bg-white border border-paper-300 hover:bg-paper-200 transition-colors"
              >
                <Share2 className="w-4 h-4 text-graphite-600" aria-hidden />
              </a>
              <a
                href={siteConfig.socialLinks.instagram}
                aria-label="Instagram"
                className="p-2 rounded-lg bg-white border border-paper-300 hover:bg-paper-200 transition-colors"
              >
                <AtSign className="w-4 h-4 text-graphite-600" aria-hidden />
              </a>
            </div>
          </div>

          {/* Col 2 — Storitve */}
          <div>
            <h3 className="font-sans font-semibold text-xs uppercase tracking-[0.14em] text-graphite-500 mb-4">
              Storitve
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Menjava pnevmatik", href: "/storitve/menjava-pnevmatik" },
                { label: "Vulkanizerstvo", href: "/storitve/vulkanizerstvo" },
                { label: "Centriranje koles", href: "/storitve/centriranje-koles" },
                { label: "Mini servis", href: "/storitve/mini-servis" },
                { label: "Shranjevanje pnevmatik", href: "/storitve/shranjevanje-pnevmatik" },
                { label: "Najem kombijev", href: "/storitve/najem-kombijev" },
                { label: "Avtovleka 24/7", href: "/avtovleka" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-graphite-600 hover:text-graphite-900 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Pnevmatike */}
          <div>
            <h3 className="font-sans font-semibold text-xs uppercase tracking-[0.14em] text-graphite-500 mb-4">
              Pnevmatike
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Letne pnevmatike", href: "/pnevmatike/letne" },
                { label: "Zimske pnevmatike", href: "/pnevmatike/zimske" },
                { label: "Celoletne pnevmatike", href: "/pnevmatike/celoletne" },
                { label: "Tovorne pnevmatike", href: "/pnevmatike/tovorne" },
                { label: "Motoristične pnevmatike", href: "/pnevmatike/motoristicne" },
                { label: "Konfigurator platišč", href: "/pnevmatike/konfigurator-platisc" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-graphite-600 hover:text-graphite-900 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.externalLinks.shop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-600 transition-colors"
                >
                  Spletna trgovina
                  <ExternalLink className="w-3 h-3" aria-hidden />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — Kontakt */}
          <div>
            <h3 className="font-sans font-semibold text-xs uppercase tracking-[0.14em] text-graphite-500 mb-4">
              Kontakt in delovni čas
            </h3>
            <address className="not-italic space-y-2.5 mb-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" aria-hidden />
                <span className="text-sm text-graphite-600">{siteConfig.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="text-sm text-graphite-600 hover:text-graphite-900 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
                <a
                  href={`tel:${siteConfig.contact.gsmTel}`}
                  className="text-sm text-graphite-600 hover:text-graphite-900 transition-colors"
                >
                  GSM: {siteConfig.contact.gsm}
                </a>
              </div>
            </address>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" aria-hidden />
                <span className="text-xs font-semibold text-graphite-500">
                  Delovni čas
                </span>
              </div>
              <p className="text-sm text-graphite-600 ml-6">{siteConfig.hours.weekdays}</p>
              <p className="text-xs text-graphite-500 ml-6">{siteConfig.hours.weekdaysNote}</p>
              <p className="text-sm text-graphite-600 ml-6">{siteConfig.hours.saturday}</p>
              <p className="text-sm text-graphite-500 ml-6">{siteConfig.hours.sunday}</p>
            </div>
            <a
              href={siteConfig.externalLinks.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-graphite-600 hover:text-graphite-900 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-500" aria-hidden />
              Odpri v Google Zemljevidi
              <ExternalLink className="w-3 h-3" aria-hidden />
            </a>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-paper-300">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-graphite-500 text-center sm:text-left">
            © {year} KOZAMURNIK Center mobilnosti d.o.o. Vse pravice pridržane.
          </p>
          <p className="text-xs text-graphite-500">
            Izdelava:{" "}
            <a
              href="https://jedroplus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-graphite-900 transition-colors"
            >
              Jedro Systems
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
