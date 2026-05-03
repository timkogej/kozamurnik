import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  variant?: "dark" | "light";
};

export function Card({ children, className, padding = true, variant = "dark" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-card",
        variant === "light"
          ? "bg-white border border-fog-200 hover:border-brand-500/40 hover:shadow-card-lg"
          : "bg-ink-800 border border-ink-700",
        padding && "p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
