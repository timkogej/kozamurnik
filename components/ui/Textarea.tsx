import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  variant?: "dark" | "light";
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className, id, rows = 5, variant = "dark", ...props },
  ref
) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
  const isLight = variant === "light";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className={cn("text-sm font-medium", isLight ? "text-ink-900" : "text-fog-300")}
        >
          {label}
          {props.required && <span className="text-brand-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 rounded-xl border text-sm transition-colors duration-200 resize-y",
          "focus:outline-none focus:border-brand-500/60",
          isLight
            ? "bg-white border-fog-200 text-ink-900 placeholder-fog-400 placeholder:font-light hover:border-fog-300"
            : "bg-ink-700 border-ink-600 text-fog-50 placeholder-fog-500 placeholder:font-light hover:border-ink-600",
          error
            ? "border-brand-500/80"
            : isLight
              ? "border-fog-200 hover:border-fog-300"
              : "border-ink-600 hover:border-ink-600",
          className
        )}
        {...props}
      />
      {error && (
        <p className={cn("text-xs", isLight ? "text-brand-600" : "text-brand-400")} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
