<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Ceylonaire — Agent Context

## Project Overview

**Ceylonaire** is an AI-powered Sri Lanka travel itinerary platform. The AI agent is named **Ceyla**. The product is being built by IntellaNext (Pvt) Ltd and targets both foreign tourists and local Sri Lankan travelers.

- **Domain:** ceylonaire.com
- **Status:** MVP in active development (Phase 1 partially complete)
- **Package manager:** npm (NOT pnpm — it is not installed)

## Essential Reading

Before implementing any feature, read:
- `docs/SRS.md` — Full requirements, all schemas, API specs, and FR/NFR IDs
- `docs/TASKS.md` — Task list with checkboxes; mark `[x]` when done

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict — no `any`) |
| UI | React 19 + Tailwind CSS 4 + shadcn/ui |
| AI SDK | Vercel AI SDK (`ai` + `@ai-sdk/openai` + `@ai-sdk/anthropic`) |
| AI — Generation | OpenAI GPT-4o (Structured Outputs) |
| AI — Refinement | OpenAI GPT-4o-mini |
| AI — Content | Anthropic Claude Sonnet 4 (`claude-sonnet-4-20250514`) |
| Maps | Mapbox GL JS + react-map-gl |
| Database | Supabase (PostgreSQL + Auth + Storage) |
| Cache | Upstash Redis |
| PDF | @react-pdf/renderer |
| Validation | Zod |
| Analytics | PostHog |
| Linter/Formatter | Biome (NOT ESLint/Prettier) |
| Testing | Vitest + Playwright |

## Current State (as of 2026-05-17)

### Completed
- **T-001** (Repository & Scaffold): Full directory structure, Next.js 15, TypeScript strict, Tailwind CSS 4, Biome, shadcn/ui components, `.env.local.example`
- **T-002** (Design System): CSS custom properties, Google Fonts (Playfair Display + DM Sans), `cn()` utility, root `layout.tsx`, favicon/OG placeholder
- **T-003** (Supabase): Full DB schema + RLS migration, Supabase TS clients (client/server/admin/middleware), TypeScript types generated, middleware wired in `src/middleware.ts`

### Next Up
- **T-004**: External service setup (Upstash Redis, Mapbox, Google APIs, AI API keys, PostHog)
- **T-005 to T-007**: Landing page (header, hero, sections)

## Key Conventions

### Code Style
- **Biome** for linting and formatting — run `npm run lint` to check
- **Strict TypeScript** — no `any`, no implicit returns
- **Named exports** for components; **default exports** only for Next.js pages
- **Zod** for all runtime validation (API inputs, AI outputs, form data)
- **Server Components by default** — add `'use client'` only when needed

### File Naming
- Components: `kebab-case.tsx`
- Utilities/lib: `kebab-case.ts`
- Tests: `*.test.ts` (unit/integration), `*.spec.ts` (e2e)

### Component Patterns
- Use shadcn/ui primitives for all interactive elements — shadcn components are in `src/components/ui/`
- Tailwind utility classes directly on elements (no CSS modules)
- `cn()` from `src/lib/utils.ts` for conditional class merging
- Props interfaces in the same file, exported if reused

### API Routes
- All inputs validated with Zod before processing; return `{ error: string, code: string }` on errors
- AI generation/refinement routes must use SSE streaming — never switch to JSON response
- Google API proxy routes must check Upstash Redis before calling external API
  - Cache key format: `places:{md5(query+location+type)}`, `directions:{md5(origin+dest+mode)}`, TTL 24h
- Rate limit all public endpoints via `@upstash/ratelimit`

## Critical Architecture Rules

1. **Streaming is non-negotiable** for AI generation and refinement — users must see progress in real-time
2. **Cache aggressively** — every Google Places/Directions API call checks Redis first
3. **No places database** — all place data comes from Google Places API + web search at runtime
4. **Multi-model AI** — GPT-4o for generation (Structured Outputs), GPT-4o-mini for chat (cost efficiency), Claude Sonnet 4 for SEO content
5. **Dual market** — foreign visitors (USD) and local Sri Lankans (LKR); different onboarding flows, same AI engine
6. **Zod schemas in `src/lib/types/itinerary.ts`** are shared between AI Structured Output definition and the post-generation validator — keep them in sync

## Brand Colors (CSS custom properties)

```css
--primary: #2A182E
--primary-light: #4A2E54
--lavender: #CDB3FF
--lavender-light: #E8DCFF
--surface: #EAE8EA
--background: #FFFFFF
--dark: #1A1A1A
```

## Running the Project

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Biome lint + format check
npm test             # Run Vitest unit tests
npm run test:e2e     # Run Playwright E2E tests
```

## Supabase

- Dev project is linked (see `supabase/.temp/linked-project.json`)
- Migration: `supabase/migrations/001_initial_schema.sql`
- Types: `src/lib/types/database.ts` (auto-generated)
- Client files: `src/lib/supabase/` (client.ts, server.ts, admin.ts, middleware.ts)

## Environment Variables

All required variables are in `.env.local.example`. Copy to `.env.local` and fill in values. Key variables:

```
OPENAI_API_KEY, ANTHROPIC_API_KEY
GOOGLE_PLACES_API_KEY, GOOGLE_DIRECTIONS_API_KEY
NEXT_PUBLIC_MAPBOX_TOKEN
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
BOOKING_AFFILIATE_ID, AGODA_AFFILIATE_ID
EXCHANGE_RATE_API_KEY
NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST
```
