import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-sans text-xs uppercase tracking-[0.14em] font-semibold text-brand-500",
        className
      )}
    >
      {children}
    </p>
  );
}
