import Link from "next/link";
import { ChevronRight, Calendar, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroImage } from "@/components/motion/HeroImage";
import { siteConfig } from "@/lib/config";

type BreadcrumbItem = { label: string; href?: string };

type PageHeroProps = {
  headline: string;
  subhead?: string;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
  showBookingCta?: boolean;
  /** Replaces the booking CTA with a click-to-call button (e.g. mini servis, najem) */
  phoneCta?: { label: string };
  secondaryCta?: { label: string; href: string; external?: boolean };
  /** When set, renders the image-hero layout (text-left / photo-right) instead of the default wash. */
  backgroundImage?: string;
  imageAlt?: string;
  /** Desktop width of the hero photo (Tailwind lg: width util). Defaults to lg:w-[72%]. */
  imageWidthClass?: string;
};

function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            href="/"
            className="text-sm text-graphite-400 hover:text-graphite-700 transition-colors"
          >
            Domov
          </Link>
        </li>
        {breadcrumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-graphite-300 shrink-0" aria-hidden />
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="text-sm text-graphite-400 hover:text-graphite-700 transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-sm text-brand-500 font-medium" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function HeroCtas({
  showBookingCta,
  phoneCta,
  secondaryCta,
}: Pick<PageHeroProps, "showBookingCta" | "phoneCta" | "secondaryCta">) {
  if (!showBookingCta && !phoneCta && !secondaryCta) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {phoneCta ? (
        <a
          href={`tel:${siteConfig.contact.gsmTel}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-xl shadow-brand transition-colors"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden />
          {phoneCta.label}
        </a>
      ) : (
        showBookingCta && (
          <a
            href={siteConfig.externalLinks.booking}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-xl shadow-brand transition-colors"
          >
            <Calendar className="w-4 h-4 shrink-0" aria-hidden />
            Rezerviraj termin
          </a>
        )
      )}
      {secondaryCta && (
        <a
          href={secondaryCta.href}
          target={secondaryCta.external ? "_blank" : undefined}
          rel={secondaryCta.external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-graphite-900 text-graphite-900 hover:bg-paper-100 hover:text-graphite-900 text-sm font-medium rounded-xl transition-colors"
        >
          {secondaryCta.label}
        </a>
      )}
    </div>
  );
}

function HeroText({
  headline,
  subhead,
  eyebrow,
  breadcrumbs,
  showBookingCta = true,
  phoneCta,
  secondaryCta,
}: Omit<PageHeroProps, "backgroundImage" | "imageAlt">) {
  return (
    <>
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      {eyebrow && (
        <p className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-brand-500 mb-4">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.06] text-graphite-900 mb-4">
        {headline}
      </h1>
      {subhead && (
        <p className="font-sans text-lg leading-[1.65] text-graphite-500 mb-8 max-w-2xl lg:max-w-3xl">
          {subhead}
        </p>
      )}
      <HeroCtas
        showBookingCta={showBookingCta}
        phoneCta={phoneCta}
        secondaryCta={secondaryCta}
      />
    </>
  );
}

function ImageHero(props: PageHeroProps) {
  const { backgroundImage, imageAlt, imageWidthClass = "lg:w-[72%]" } = props;

  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-paper-300 lg:min-h-[520px]">
      {/* Text stays inside the padded, max-width container. */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-4 lg:py-28">
        <div className="max-w-xl lg:max-w-[34rem]">
          <HeroText {...props} />
        </div>
      </div>
      {/* Photo lives outside the padded container so its right edge sits flush
          against the page edge. On a pure-white background object-contain blends
          seamlessly — the full subject stays visible at every size, no cropping.
          Mobile: full-width banner below the text. Desktop: anchored right. */}
      <HeroImage
        src={backgroundImage!}
        alt={imageAlt ?? ""}
        sizes="(max-width: 1024px) 100vw, 72vw"
        objectClassName="object-contain object-right-bottom"
        className={`relative h-[240px] sm:h-[320px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:left-auto lg:h-full ${imageWidthClass}`}
      />
    </section>
  );
}

export function PageHero(props: PageHeroProps) {
  if (props.backgroundImage) {
    return <ImageHero {...props} />;
  }

  return (
    <section className="bg-paper-100 border-b border-paper-300 relative overflow-hidden">
      {/* Soft brand wash */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-50/60 via-transparent to-transparent pointer-events-none"
        aria-hidden
      />

      <Container className="pt-28 pb-16 md:pt-32 md:pb-24 relative">
        <div className="max-w-3xl lg:max-w-5xl">
          <HeroText {...props} />
        </div>
      </Container>
    </section>
  );
}
