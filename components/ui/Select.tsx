import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, placeholder, className, id, ...props },
  ref
) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-graphite-900">
          {label}
          {props.required && <span className="text-brand-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full px-4 py-3 rounded-xl border text-sm text-graphite-900 transition-all duration-200 appearance-none cursor-pointer",
            "bg-white hover:border-graphite-300",
            "focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
            error ? "border-brand-500" : "border-paper-300",
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
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-graphite-400"
          aria-hidden
        />
      </div>
      {error && (
        <p className="text-xs text-brand-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
