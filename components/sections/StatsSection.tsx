"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

const stats = [
  { value: 30, suffix: "+", label: "let tradicije in izkušenj" },
  { value: 96, suffix: "+", label: "zadovoljnih strank z oceno 9.6" },
  { value: 5, suffix: "", label: "zvezdic na Google ocenah" },
  { value: 24, suffix: "/7", label: "avtovleka po Sloveniji in EU" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const duration = 1800;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, started, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

type StatsSectionProps = {
  variant?: "dark" | "light";
};

export function StatsSection({ variant = "dark" }: StatsSectionProps) {
  const isLight = variant === "light";
  return (
    <section
      className={cn(
        "py-20 md:py-28 border-y",
        isLight ? "bg-fog-50 border-fog-200" : "bg-ink-900 border-ink-700"
      )}
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="space-y-12"
        >
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <h2
              className={cn(
                "font-display font-bold text-4xl md:text-5xl tracking-tight mb-4",
                isLight ? "text-ink-900" : "text-fog-50"
              )}
            >
              Zakaj zaupati nam?
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, suffix, label }) => (
              <motion.div key={label} variants={fadeInUp} className="text-center lg:text-left">
                <p className="font-display font-bold text-5xl md:text-6xl text-brand-500 mb-3">
                  <Counter value={value} suffix={suffix} />
                </p>
                <p
                  className={cn(
                    "font-sans text-sm leading-relaxed",
                    isLight ? "text-fog-500" : "text-fog-400"
                  )}
                >
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
