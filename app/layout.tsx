import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SeasonalBanner } from "@/components/layout/SeasonalBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kozamurnik.si"),
  title: {
    template: "%s | Kozamurnik Center mobilnosti",
    default: "Kozamurnik — Pnevmatike, vulkanizerstvo in avtovleka | Šentjanž",
  },
  description:
    "Kozamurnik Center mobilnosti d.o.o. — pnevmatike, vulkanizerstvo, centriranje koles, mini servis in avtovleka 24/7. Bukovska vas, Šentjanž.",
  keywords: [
    "pnevmatike",
    "vulkanizerstvo",
    "avtovleka",
    "menjava pnevmatik",
    "centriranje koles",
    "Šentjanž",
    "Bukovska vas",
    "Kozamurnik",
    "zimske pnevmatike",
    "letne pnevmatike",
  ],
  openGraph: {
    title: "Kozamurnik Center mobilnosti",
    description:
      "Pnevmatike, vulkanizerstvo in avtovleka 24/7 v Šentjanžu. Zanesljiv partner za vaše vozilo.",
    url: "https://kozamurnik.si",
    siteName: "Kozamurnik Center mobilnosti",
    locale: "sl_SI",
    type: "website",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "Kozamurnik Center mobilnosti",
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://kozamurnik.si",
  name: "KOZAMURNIK Center mobilnosti d.o.o.",
  description:
    "Pnevmatike, vulkanizerstvo, centriranje koles, mini servis in avtovleka 24/7 v Šentjanžu.",
  url: "https://kozamurnik.si",
  telephone: "+386028786740",
  address: {
    "@type": "PostalAddress",
    streetAddress: "PE Bukovska vas 15",
    addressLocality: "Šentjanž",
    postalCode: "2373",
    addressCountry: "SI",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "9.6",
    reviewCount: "96",
    bestRating: "10",
  },
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "12:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sl" className={`${inter.variable} ${poppins.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-ink-950 text-fog-50 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg focus:text-sm"
        >
          Preskoči na vsebino
        </a>
        <SeasonalBanner />
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Script
          id="jedroplus-chatbot"
          src="https://chatbot.jedroplus.com/chatbot-plus.js?slug=jedroplus-d-o-o"
          data-chatbot-plus-auto-init=""
          data-webhook-url="https://chatbot.jedroplus.com/api/chat"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
