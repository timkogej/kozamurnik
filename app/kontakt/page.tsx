import type { Metadata } from "next";
import { Phone, MapPin, Clock, ExternalLink, Share2, AtSign } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Pišite nam ali pokličite. Kozamurnik Center mobilnosti — PE Bukovska vas 15, 2373 Šentjanž. Tel: +386 (0)2 878 67 40.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        headline="Kontakt — smo le klic stran"
        subhead="Pišite nam z obrazcem ali pokličite. Odgovorimo hitro."
        breadcrumbs={[{ label: "Kontakt" }]}
        showBookingCta={false}
      />

      {/* Contact info + Form */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16">
            {/* Left — contact info */}
            <div className="space-y-8">
              {/* Big click-to-call */}
              <a
                href={`tel:${siteConfig.contact.gsmTel}`}
                className="flex items-center gap-4 p-6 bg-brand-500 hover:bg-brand-600 rounded-2xl shadow-brand transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7 text-white" aria-hidden />
                </div>
                <div>
                  <p className="text-xs text-white/70 mb-1">Pokličite nas zdaj</p>
                  <p className="font-display font-semibold text-2xl text-white">
                    {siteConfig.contact.gsm}
                  </p>
                </div>
              </a>

              {/* Info cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    label: "Telefon",
                    value: siteConfig.contact.phone,
                    href: `tel:${siteConfig.contact.phoneTel}`,
                  },
                  {
                    icon: Phone,
                    label: "GSM (Boris)",
                    value: siteConfig.contact.gsm,
                    href: `tel:${siteConfig.contact.gsmTel}`,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 p-4 bg-white border border-paper-300 rounded-xl shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-500" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs text-graphite-400 mb-0.5">{label}</p>
                      <a
                        href={href}
                        className="text-sm font-medium text-graphite-700 hover:text-graphite-900 transition-colors"
                      >
                        {value}
                      </a>
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-4 p-4 bg-white border border-paper-300 rounded-xl shadow-soft">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-brand-500" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs text-graphite-400 mb-0.5">Naslov</p>
                    <p className="text-sm font-medium text-graphite-700">
                      {siteConfig.address.full}
                    </p>
                    <a
                      href={siteConfig.externalLinks.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-1.5 text-xs text-brand-500 hover:text-brand-600"
                    >
                      Odpri v Google Zemljevidi
                      <ExternalLink className="w-3 h-3" aria-hidden />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-paper-300 rounded-xl shadow-soft">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-brand-500" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs text-graphite-400 mb-1.5">Delovni čas</p>
                    <p className="text-sm text-graphite-700">{siteConfig.hours.weekdays}</p>
                    <p className="text-xs text-graphite-400">{siteConfig.hours.weekdaysNote}</p>
                    <p className="text-sm text-graphite-700 mt-1">{siteConfig.hours.saturday}</p>
                    <p className="text-sm text-graphite-400">{siteConfig.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.socialLinks.facebook}
                  aria-label="Facebook"
                  className="p-3 rounded-xl bg-white border border-paper-300 hover:shadow-card transition-all"
                >
                  <Share2 className="w-5 h-5 text-graphite-400" aria-hidden />
                </a>
                <a
                  href={siteConfig.socialLinks.instagram}
                  aria-label="Instagram"
                  className="p-3 rounded-xl bg-white border border-paper-300 hover:shadow-card transition-all"
                >
                  <AtSign className="w-5 h-5 text-graphite-400" aria-hidden />
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <div className="bg-white border border-paper-300 rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="font-display font-medium text-2xl text-graphite-900 mb-2">
                  Pošljite sporočilo
                </h2>
                <p className="text-sm text-graphite-500 mb-6">
                  Odgovorimo v delovnem dnevu. Za nujne zadeve pokličite direktno.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Maps */}
      <section className="bg-paper-100 border-t border-paper-300 py-12">
        <Container>
          <div className="rounded-2xl overflow-hidden border border-paper-300 shadow-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.8!2d15.8456!3d46.5386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQnVrb3Zza2EgdmFzIDE1LCAyMzczIMWgZW50amFuw9o!5e0!3m2!1ssl!2ssi!4v1"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kozamurnik Center mobilnosti — Google Zemljevidi"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href={siteConfig.externalLinks.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-graphite-500 hover:text-graphite-900 transition-colors"
            >
              <MapPin className="w-4 h-4 text-brand-500" aria-hidden />
              Odpri v Google Zemljevidi →
              <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            </a>
          </div>
        </Container>
      </section>

      <ReservationCta />
    </>
  );
}
