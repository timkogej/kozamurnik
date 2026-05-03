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

## Key notes
- Tailwind v4 uses CSS `@theme {}` blocks in globals.css (no tailwind.config.ts)
- lucide-react v1.x removed Facebook/Instagram icons — using Share2/AtSign as replacements
- Zod v4: `errorMap` → `error`; no `.default()` on enums used with react-hook-form
- Framer Motion v12: spreading motion animate values causes type errors — use CSS classes for CSS-based animations (animate-float, animate-float-delayed)
- All content lives in data/ files (single source of truth)
- Seasonal banner text: lib/config.ts → seasonalBanner.text

## Routes (23 static + 1 dynamic API)
/ /o-nas /storitve /storitve/menjava-pnevmatik /storitve/vulkanizerstvo /storitve/centriranje-koles /storitve/mini-servis /storitve/shranjevanje-pnevmatik /pnevmatike /pnevmatike/letne /pnevmatike/zimske /pnevmatike/celoletne /pnevmatike/tovorne /pnevmatike/motoristicne /pnevmatike/konfigurator-platisc /avtovleka /kontakt /api/contact

## Images
All placeholder — see /public/images/IMAGES.md for full checklist Tim needs to replace.

## Env vars
RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM (see .env.local.example)
