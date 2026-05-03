import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  variant?: "dark" | "light";
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, placeholder, className, id, variant = "dark", ...props },
  ref
) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  const isLight = variant === "light";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className={cn("text-sm font-medium", isLight ? "text-ink-900" : "text-fog-300")}
        >
          {label}
          {props.required && <span className="text-brand-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full px-4 py-3 rounded-xl border text-sm transition-colors duration-200 appearance-none cursor-pointer",
            "focus:outline-none focus:border-brand-500/60",
            isLight
              ? "bg-white border-fog-200 text-ink-900 hover:border-fog-300"
              : "bg-ink-700 border-ink-600 text-fog-50 hover:border-ink-600",
            error
              ? "border-brand-500/80"
              : isLight
                ? "border-fog-200 hover:border-fog-300"
                : "border-ink-600 hover:border-ink-600",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
            isLight ? "text-fog-400" : "text-fog-500"
          )}
          aria-hidden
        />
      </div>
      {error && (
        <p className={cn("text-xs", isLight ? "text-brand-600" : "text-brand-400")} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
