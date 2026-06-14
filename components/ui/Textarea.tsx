import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className, id, rows = 5, ...props },
  ref
) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-graphite-900">
          {label}
          {props.required && <span className="text-brand-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 rounded-xl border text-sm text-graphite-900 transition-all duration-200 resize-y",
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
