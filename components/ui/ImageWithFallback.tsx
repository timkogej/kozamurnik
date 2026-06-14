"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
};

/**
 * next/image with a designed placeholder when the file is missing —
 * a subtle graphite gradient, camera icon and the intended path so Tim
 * knows exactly which photo to drop in.
 */
export function ImageWithFallback({ src, alt, sizes, className }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-paper-200 to-graphite-300/40 flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center">
          <Camera className="w-5 h-5 text-graphite-400" aria-hidden />
        </div>
        <p className="text-[11px] font-mono text-graphite-500">{src}</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      quality={90}
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
