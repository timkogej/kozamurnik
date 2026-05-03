"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function SeasonalBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (!siteConfig.seasonalBanner.active || dismissed) return null;

  return (
    <div className="relative bg-brand-500 text-white text-xs sm:text-sm py-2 px-4 text-center h-9 flex items-center justify-center">
      <p className="font-sans font-medium line-clamp-1 pr-8">
        {siteConfig.seasonalBanner.text}
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Zapri obvestilo"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
      >
        <X className="w-3.5 h-3.5" aria-hidden />
      </button>
    </div>
  );
}
