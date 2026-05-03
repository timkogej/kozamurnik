"use client";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  pulseGlow?: boolean;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-500 hover:bg-brand-600 text-white border border-brand-500 hover:border-brand-600",
  secondary:
    "bg-transparent hover:bg-fog-50/5 text-fog-50 border border-fog-50/20 hover:border-fog-50/40",
  ghost:
    "bg-transparent hover:bg-ink-700 text-fog-300 hover:text-fog-50 border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5 rounded-xl",
  md: "px-6 py-3 text-sm gap-2 rounded-xl",
  lg: "px-8 py-4 text-base gap-2.5 rounded-xl",
};

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  loading,
  pulseGlow,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-display font-semibold tracking-normal transition-colors duration-200 cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:scale-[0.98]",
    variantClasses[variant],
    sizeClasses[size],
    pulseGlow && "animate-pulse-glow",
    className
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {loading && <Spinner />}
        {children}
      </a>
    );
  }

  const { disabled, ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
