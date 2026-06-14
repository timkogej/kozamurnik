import Image from "next/image";
import clsx from "clsx";

type HeroImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Tailwind object-position utilities, e.g. "object-bottom lg:object-right" */
  objectClassName?: string;
};

/**
 * Hero photo that glides in from the side (fade + horizontal travel) on load.
 * Uses a pure-CSS keyframe (animate-hero-photo-in) so the above-the-fold image
 * is always rendered visible — it never depends on JS hydration to appear, and
 * falls back to a static image under prefers-reduced-motion.
 */
export function HeroImage({
  src,
  alt,
  className,
  sizes,
  objectClassName = "object-contain",
}: HeroImageProps) {
  return (
    <div className={clsx("animate-hero-photo-in", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        preload
        sizes={sizes ?? "100vw"}
        className={objectClassName}
      />
    </div>
  );
}
