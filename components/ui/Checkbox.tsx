import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: React.ReactNode;
  error?: string;
  variant?: "dark" | "light";
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, className, id, variant = "dark", ...props },
  ref
) {
  const checkboxId =
    id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const isLight = variant === "light";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            "mt-0.5 h-4 w-4 rounded text-brand-500",
            "focus:outline-none focus:ring-2 focus:ring-brand-500/50",
            "cursor-pointer shrink-0",
            isLight ? "border-fog-300 bg-white" : "border-ink-600 bg-ink-700",
            className
          )}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className={cn(
            "text-sm leading-relaxed cursor-pointer",
            isLight ? "text-fog-600" : "text-fog-400"
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className={cn("text-xs", isLight ? "text-brand-600" : "text-brand-400")} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
