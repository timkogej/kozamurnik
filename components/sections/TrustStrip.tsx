import { Star } from "lucide-react";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-graphite-500">
      <span className="font-display font-semibold text-graphite-900">{value}</span>
      <span>{label}</span>
    </div>
  );
}

export function TrustStrip() {
  return (
    <div className="bg-paper-100 border-y border-paper-300 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-graphite-900 text-sm">4,7/5</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-brand-500 text-brand-500" aria-hidden />
              ))}
            </div>
          </div>
          <div className="h-4 w-px bg-paper-300 hidden sm:block" aria-hidden />
          <Stat value="96+" label="Google ocen" />
          <div className="h-4 w-px bg-paper-300 hidden sm:block" aria-hidden />
          <Stat value="30+" label="let izkušenj" />
          <div className="h-4 w-px bg-paper-300 hidden sm:block" aria-hidden />
          <span className="text-sm text-graphite-500">
            Uradni partnerji <span className="text-graphite-700 font-medium">vodilnih znamk</span>
          </span>
        </div>
      </div>
    </div>
  );
}
