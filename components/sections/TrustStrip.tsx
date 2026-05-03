"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-fog-400">
      <span className="font-display font-bold text-fog-50">{value}</span>
      <span>{label}</span>
    </div>
  );
}

export function TrustStrip() {
  return (
    <div className="bg-ink-900 border-y border-ink-700 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-fog-50 text-sm">9.6/10</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-brand-500 text-brand-500" aria-hidden />
              ))}
            </div>
          </div>
          <div className="h-4 w-px bg-ink-700 hidden sm:block" aria-hidden />
          <AnimatedStat value="96+" label="Google ocen" />
          <div className="h-4 w-px bg-ink-700 hidden sm:block" aria-hidden />
          <AnimatedStat value="30+" label="let izkušenj" />
          <div className="h-4 w-px bg-ink-700 hidden sm:block" aria-hidden />
          <span className="text-sm text-fog-400">
            Uradni partnerji <span className="text-fog-200 font-medium">vodilnih znamk</span>
          </span>
        </div>
      </div>
    </div>
  );
}
