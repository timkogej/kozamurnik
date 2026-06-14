import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: React.ReactNode;
  error?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, className, id, ...props },
  ref
) {
  const checkboxId =
    id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            "mt-0.5 h-4 w-4 rounded text-brand-500 border-graphite-300 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-brand-500/30",
            "cursor-pointer shrink-0",
            className
          )}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className="text-sm leading-relaxed cursor-pointer text-graphite-500"
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="text-xs text-brand-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
