"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { reviews, type Review } from "@/data/reviews";

type ReviewsCarouselProps = {
  filterTag?: Review["tags"][number];
  title?: string;
  subtitle?: string;
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-ink-800 border border-ink-700 p-6 md:p-8 rounded-2xl h-full flex flex-col">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" aria-hidden />
        ))}
      </div>
      <blockquote className="font-sans text-sm md:text-base leading-relaxed text-fog-300 flex-1 mb-5">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <div className="border-t border-ink-700 pt-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-brand-400">
            {review.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-fog-200">{review.author}</p>
          <p className="text-xs text-fog-500">
            {new Date(review.date).toLocaleDateString("sl-SI", {
              year: "numeric",
              month: "long",
            })}{" "}
            · Google
          </p>
        </div>
      </div>
    </div>
  );
}

export function ReviewsCarousel({
  filterTag,
  title = "9.6/10 na osnovi 96+ Google ocen",
  subtitle,
}: ReviewsCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const filtered = filterTag ? reviews.filter((r) => r.tags.includes(filterTag)) : reviews;
  const VISIBLE = 3;
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalPages = Math.ceil(filtered.length / VISIBLE);

  const next = useCallback(() => {
    setPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  useEffect(() => {
    if (prefersReducedMotion || paused || totalPages <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, paused, totalPages, prefersReducedMotion]);

  const visibleReviews = filtered.slice(page * VISIBLE, page * VISIBLE + VISIBLE);

  return (
    <section
      className="bg-ink-950 py-20 md:py-28 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <div className="space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Eyebrow className="mb-3">Mnenja strank</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-fog-50">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-3 text-fog-400">{subtitle}</p>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Prejšnje ocene"
                  className="p-2 rounded-xl bg-ink-800 border border-ink-700 hover:border-brand-500/40 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-fog-400" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Naslednje ocene"
                  className="p-2 rounded-xl bg-ink-800 border border-ink-700 hover:border-brand-500/40 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-fog-400" aria-hidden />
                </button>
              </div>
            )}
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {visibleReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Stran ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === page ? "w-6 bg-brand-500" : "w-1.5 bg-ink-600"
                  }`}
                />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Kozamurnik+Center+mobilnosti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-fog-400 hover:text-fog-50 transition-colors"
            >
              Poglej vse ocene na Google →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
