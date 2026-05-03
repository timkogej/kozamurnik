import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

type BreadcrumbItem = { label: string; href?: string };

type PageHeroProps = {
  headline: string;
  subhead?: string;
  breadcrumbs?: BreadcrumbItem[];
  showBookingCta?: boolean;
  secondaryCta?: { label: string; href: string; external?: boolean };
};

export function PageHero({
  headline,
  subhead,
  breadcrumbs,
  showBookingCta = true,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="bg-ink-900 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent pointer-events-none" />

      <Container className="py-16 md:py-20 relative">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link href="/" className="text-sm text-fog-500 hover:text-fog-400 transition-colors">
                  Domov
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-fog-600 shrink-0" aria-hidden />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-sm text-fog-500 hover:text-fog-400 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-brand-400 font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-fog-50 mb-4">
            {headline}
          </h1>
          {subhead && (
            <p className="font-sans text-lg leading-relaxed text-fog-400 mb-8 max-w-2xl">
              {subhead}
            </p>
          )}

          {(showBookingCta || secondaryCta) && (
            <div className="flex flex-wrap gap-3">
              {showBookingCta && (
                <a
                  href={siteConfig.externalLinks.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Rezerviraj termin
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  target={secondaryCta.external ? "_blank" : undefined}
                  rel={secondaryCta.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-fog-50/20 hover:border-fog-50/40 hover:bg-fog-50/5 text-fog-50 text-sm font-semibold rounded-xl transition-colors"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
