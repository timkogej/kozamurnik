"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/cn";

type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  variant?: "dark" | "light";
};

function AccordionRow({ item, isOpen, onToggle, variant = "dark" }: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";
  return (
    <div
      className={cn(
        "border rounded-xl overflow-hidden transition-colors duration-200",
        isLight
          ? isOpen
            ? "border-brand-500/40 bg-white"
            : "border-fog-200 bg-white hover:border-brand-500/20"
          : isOpen
            ? "border-brand-500/40 bg-ink-800"
            : "border-ink-700 bg-ink-800 hover:border-brand-500/20"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "font-display font-semibold text-base md:text-lg leading-snug",
          isLight
            ? isOpen ? "text-ink-900" : "text-ink-700"
            : isOpen ? "text-fog-50" : "text-fog-200"
        )}>
          {item.question}
        </span>
        <span className={cn(
          "shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200",
          isOpen ? "bg-brand-500 text-white" : isLight ? "bg-fog-200 text-fog-500" : "bg-ink-700 text-fog-400"
        )}>
          {isOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={cn(
              "font-sans px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base leading-relaxed",
              isLight ? "text-fog-500" : "text-fog-400"
            )}>
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, className, variant = "dark" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          variant={variant}
        />
      ))}
    </div>
  );
}
