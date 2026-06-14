import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  /** "muted" renders a soft-grey card for use on pure white sections */
  variant?: "white" | "muted";
  hover?: boolean;
};

export function Card({
  children,
  className,
  padding = true,
  variant = "white",
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl text-graphite-900",
        variant === "white"
          ? "bg-white border border-paper-300 shadow-soft"
          : "bg-paper-100 border border-paper-200",
        hover &&
          "transition-all duration-300 hover:shadow-card-lg hover:-translate-y-1",
        padding && "p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
