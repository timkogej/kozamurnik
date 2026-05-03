import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-display text-xs uppercase tracking-[0.16em] font-semibold text-brand-500",
        className
      )}
    >
      {children}
    </p>
  );
}
