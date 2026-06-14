import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, id, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-graphite-900">
          {label}
          {props.required && <span className="text-brand-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "w-full px-4 py-3 rounded-xl border text-sm text-graphite-900 transition-all duration-200",
          "bg-white placeholder-graphite-400 hover:border-graphite-300",
          "focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
          error ? "border-brand-500" : "border-paper-300",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-brand-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
