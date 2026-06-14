"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

const stats = [
  { value: 30, suffix: "+", label: "let tradicije in izkušenj" },
  { value: 96, suffix: "+", label: "Google ocen" },
  { value: 4.7, suffix: "", label: "Google ocena", display: "4,7" },
  { value: 24, suffix: "/7", label: "avtovleka po Sloveniji in EU" },
];

function Counter({ value, suffix, display }: { value: number; suffix: string; display?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced || display) return;
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
  }, [value, started, reduced, display]);

  return (
    <span ref={ref} className="tabular-nums">
      {display ?? (reduced ? value : count)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="bg-paper-100 py-24 md:py-28 border-y border-paper-300">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="space-y-12"
        >
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <Eyebrow className="mb-3">V številkah</Eyebrow>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[1.08] text-graphite-900">
              Zakaj zaupati nam?
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, suffix, label, display }) => (
              <motion.div key={label} variants={fadeInUp} className="text-center lg:text-left">
                {/* The rare bold — a single stat number is allowed to pop */}
                <p className="font-display font-bold text-5xl md:text-6xl text-graphite-900 mb-3">
                  <Counter value={value} suffix={suffix} display={display} />
                </p>
                <p className="font-sans text-sm leading-[1.6] text-graphite-500">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
