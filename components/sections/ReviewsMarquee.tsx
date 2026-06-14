"use client";

import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { reviews, type Review } from "@/data/reviews";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/cn";

type ReviewsMarqueeProps = {
  filterTag?: Review["tags"][number];
  title?: string;
  subtitle?: string;
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[300px] sm:w-[340px] shrink-0 bg-white border border-paper-300 shadow-card rounded-2xl p-6 flex flex-col">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" aria-hidden />
        ))}
      </div>
      <blockquote className="font-sans text-sm leading-[1.65] text-graphite-700 flex-1 mb-5">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <div className="border-t border-paper-200 pt-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-brand-500">
            {review.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-graphite-900">{review.author}</p>
          <p className="text-xs text-graphite-400">Google ocena</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: Review[];
  reverse?: boolean;
}) {
  // The set is rendered twice so the -50% translate loops seamlessly
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className={cn(
          "flex gap-4 w-max group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-4 pr-4"
            aria-hidden={copy === 1 || undefined}
          >
            {items.map((review) => (
              <ReviewCard key={`${copy}-${review.id}`} review={review} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewsMarquee({
  filterTag,
  title = "4,7 Google ocena",
  subtitle,
}: ReviewsMarqueeProps) {
  const reduced = useReducedMotionSafe();
  const filtered = filterTag
    ? reviews.filter((r) => r.tags.includes(filterTag))
    : reviews;

  const twoRows = !reduced && filtered.length >= 8;
  const half = Math.ceil(filtered.length / 2);
  const rowA = twoRows ? filtered.slice(0, half) : filtered;
  const rowB = twoRows ? filtered.slice(half) : [];

  return (
    <section className="bg-paper-100 py-24 md:py-32 overflow-hidden">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow className="mb-3">Mnenja strank</Eyebrow>
          <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900 mb-4">
            {title}
          </h2>
          {subtitle && <p className="text-graphite-500">{subtitle}</p>}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="font-sans font-semibold text-sm text-graphite-700">Google</span>
            <span className="font-sans font-semibold text-sm text-graphite-900">4,7</span>
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" aria-hidden />
              ))}
            </span>
          </div>
        </div>
      </Container>

      {reduced ? (
        // Static grid for users who prefer reduced motion
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 [&>div]:w-full">
            {filtered.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </Container>
      ) : (
        <div className="group space-y-4">
          <MarqueeRow items={rowA} />
          {twoRows && <MarqueeRow items={rowB} reverse />}
        </div>
      )}

      <Container>
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Kozamurnik+Center+mobilnosti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-graphite-500 hover:text-graphite-900 transition-colors"
          >
            Poglej vse ocene na Google →
          </a>
        </div>
      </Container>
    </section>
  );
}
