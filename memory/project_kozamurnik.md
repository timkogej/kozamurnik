---
name: Kozamurnik website project
description: Full Next.js website built for KOZAMURNIK Center mobilnosti d.o.o. — tech stack, structure, and key decisions
type: project
---

Full production website for KOZAMURNIK Center mobilnosti d.o.o., a Slovenian tire service and towing company.

**Why:** Tim Kogej requested a complete build from the ground up to spec.

**How to apply:** When Tim asks to modify, extend, or debug this site, reference this context.

## Tech stack
- Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4
- Framer Motion v12, lucide-react v1.x, react-hook-form + Zod v4, Resend
- Node 20, target deploy: Vercel

## Design system (June 2026 redesign — LIGHT theme)
- Full light theme: `paper` (white/grey surfaces) + `graphite` (text) + `brand` red tokens in globals.css `@theme`; footer is the only dark (graphite-900) section
- Fonts: Bricolage Grotesque (display) + **Hanken Grotesk** (body) via next/font/google — note: the Google font is "Hanken Grotesk", NOT "Grotesque"
- Weight discipline: H1/H2 semibold (600), H3 medium (500), bold (700–800) only for stat numbers
- Motion: hooks/useReducedMotionSafe + components/motion/ (Reveal, ScrollRotateTire, RollingTireDivider, TireSvg); hero tire = continuous CSS spin + scroll-linked rotation; SVG placeholder until /images/hero/tire.png exists
- Reviews: continuous CSS marquee (ReviewsMarquee, two rows opposite directions, pause on hover, static grid under reduced motion)
- Seasonal message: Apple-style toast (components/ui/SeasonalToast), config in lib/config.ts → seasonalToast (title/text/ctaLabel/delaySeconds); old top banner removed
- Mini servis + najem kombijev are phone-first (PhoneCta band, no JedroPlus booking CTA); all other services keep booking CTA

## Key notes
- Tailwind v4 uses CSS `@theme {}` blocks in globals.css (no tailwind.config.ts)
- lucide-react v1.x removed Facebook/Instagram icons — using Share2/AtSign as replacements
- Zod v4: `errorMap` → `error`; no `.default()` on enums used with react-hook-form
- Framer Motion v12: spreading motion animate values causes type errors — use CSS classes for CSS-based animations (animate-float, animate-float-delayed)
- All content lives in data/ files (single source of truth); vans in data/vans.ts (placeholder specs Tim edits)

## Routes (24 static + 1 dynamic API)
/ /o-nas /storitve /storitve/menjava-pnevmatik /storitve/vulkanizerstvo /storitve/centriranje-koles /storitve/mini-servis /storitve/shranjevanje-pnevmatik /storitve/najem-kombijev /pnevmatike /pnevmatike/letne /pnevmatike/zimske /pnevmatike/celoletne /pnevmatike/tovorne /pnevmatike/motoristicne /pnevmatike/konfigurator-platisc /avtovleka /kontakt /api/contact

## Images
Several real photos exist (services/, about/, towing/, brands/ — huge ~30MB files, candidates for compression). Missing: hero/tire.png (transparent rotating tire) and najem/van-1..3.jpg (render designed fallback via ImageWithFallback). See /public/images/IMAGES.md for scene briefs.

## Env vars
RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM (see .env.local.example)
