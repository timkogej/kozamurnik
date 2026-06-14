"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import heroTireImage from "@/public/images/hero/kozamurnik-tire-hero-3.png";

type ScrollRotateTireProps = {
  className?: string;
  /** Optional real tire image; falls back to the SVG placeholder if missing */
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
};

/**
 * The signature hero tire: rotates continuously (slow CSS spin) and gains
 * extra rotation from page scroll via useScroll + useTransform. Drop a
 * transparent PNG at /images/hero/kozamurnik-tire-hero-3.png and it spins the same way.
 */
export function ScrollRotateTire({
  className,
  imageSrc = heroTireImage,
  imageAlt = "Pnevmatika",
}: ScrollRotateTireProps) {
  const reduced = useReducedMotionSafe();
  const { scrollY } = useScroll();
  // Negative target so the scroll-driven rotation matches the
  // counter-clockwise continuous spin of the tire
  const scrollRotate = useTransform(scrollY, [0, 1200], [0, -120]);

  const visual = (
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      priority
      sizes="(max-width: 1024px) 70vw, 40vw"
      className="object-contain"
    />
  );

  if (reduced) {
    return <div className={cn("relative", className)}>{visual}</div>;
  }

  return (
    <motion.div
      style={{ rotate: scrollRotate }}
      className={cn("relative will-change-transform", className)}
    >
      <div className="absolute inset-0 animate-spin-tire">{visual}</div>
    </motion.div>
  );
}
