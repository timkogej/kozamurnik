"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/cn";

const TIRE_SIZE = 36;

/**
 * Decorative section divider: a thin track line on which a small graphite
 * tire rolls across as the divider scrolls through the viewport. Rotation
 * is synced to horizontal travel so the tire genuinely "rolls".
 */
export function RollingTireDivider({ className }: { className?: string }) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setTrackWidth(el.offsetWidth - TIRE_SIZE);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, trackWidth]);
  // rotation = travel / circumference * 360°
  const rotate = useTransform(
    x,
    (latest) => (latest / (Math.PI * TIRE_SIZE)) * 360
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2", className)}
    >
      <div className="relative h-10">
        {/* Track line */}
        <div className="absolute bottom-1 left-0 right-0 h-px bg-paper-300" />
        {!reduced && (
          <motion.div
            style={{ x, rotate }}
            className="absolute bottom-2 left-0 will-change-transform"
          >
            <svg
              width={TIRE_SIZE}
              height={TIRE_SIZE}
              viewBox="0 0 36 36"
              fill="none"
            >
              <circle cx="18" cy="18" r="17" fill="#15171B" />
              <circle cx="18" cy="18" r="10" fill="#EFF1F3" />
              <circle cx="18" cy="18" r="3" fill="#E11D2E" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <rect
                  key={deg}
                  x="16.75"
                  y="1"
                  width="2.5"
                  height="4"
                  rx="1"
                  fill="#3A3F47"
                  transform={`rotate(${deg} 18 18)`}
                />
              ))}
              {[30, 150, 270].map((deg) => (
                <rect
                  key={deg}
                  x="17"
                  y="9"
                  width="2"
                  height="8"
                  rx="1"
                  fill="#C2C7CE"
                  transform={`rotate(${deg} 18 18)`}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  );
}
