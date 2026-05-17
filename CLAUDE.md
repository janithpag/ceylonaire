# CLAUDE.md — Ceylonaire Project Context

## Quick Reference

- **Product:** Ceylonaire — AI-powered Sri Lanka travel itinerary platform
- **AI Agent Name:** Ceyla
- **Domain:** ceylonaire.com
- **Brand:** Standalone product by IntellaNext (Pvt) Ltd
- **Status:** MVP Development

## Project Documents

Load these files for full context before any development work:

- `docs/SRS.md` — Software Requirements Specification (all functional/non-functional requirements, schemas, API specs)
- `docs/TASKS.md` — Development task list with checkboxes (track progress here)

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript (strict) | 5.7+ |
| UI | React 19 + Tailwind CSS 4 + shadcn/ui | Latest |
| AI SDK | Vercel AI SDK (`ai` + `@ai-sdk/openai` + `@ai-sdk/anthropic`) | 4.x |
| AI — Generation | OpenAI GPT-4o (Structured Outputs) | Latest |
| AI — Refinement | OpenAI GPT-4o-mini | Latest |
| AI — Content | Anthropic Claude Sonnet 4 | claude-sonnet-4-20250514 |
| Maps | Mapbox GL JS + react-map-gl | 3.x / 7.x |
| Database | Supabase (PostgreSQL + Auth + Storage) | Latest |
| Cache | Upstash Redis | Latest |
| PDF | @react-pdf/renderer | 4.x |
| Validation | Zod | 3.x |
| Analytics | PostHog | Latest |
| Hosting | Vercel + Cloudflare DNS | Latest |
| Package Manager | pnpm | 9.x |
| Linter/Formatter | Biome | 1.x |
| Testing | Vitest + Playwright | Latest |

## Project Structure

```
ceylonaire/
├── docs/
│   ├── SRS.md                           # Software Requirements Specification
│   ├── TASKS.md                         # Task list with progress tracking
│   └── ARCHITECTURE.md                  # (Optional) Detailed architecture notes
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Landing page (SSG)
│   │   ├── layout.tsx                   # Root layout (fonts, providers, header)
│   │   ├── globals.css                  # Tailwind imports + CSS variables
│   │   ├── plan/
│   │   │   └── page.tsx                 # Onboarding questionnaire
│   │   ├── trip/
│   │   │   └── [id]/
│   │   │       └── page.tsx             # Itinerary view + map + chat
│   │   ├── s/
│   │   │   └── [slug]/
│   │   │       └── page.tsx             # Shared itinerary (public, SSR)
│   │   ├── explore/
│   │   │   ├── page.tsx                 # Explore grid (SSG)
│   │   │   └── [slug]/
│   │   │       └── page.tsx             # Pre-built itinerary detail (SSG + ISR)
│   │   ├── dashboard/
│   │   │   └── page.tsx                 # My Trips (auth required)
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts             # Supabase OAuth callback
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── api/
│   │       ├── itinerary/
│   │       │   ├── generate/route.ts    # POST: AI itinerary generation (streaming SSE)
│   │       │   ├── refine/route.ts      # POST: Chat refinement (streaming SSE)
│   │       │   └── [id]/
│   │       │       ├── route.ts         # GET, PATCH, DELETE itinerary
│   │       │       └── share/route.ts   # POST: Generate share slug
│   │       ├── export/
│   │       │   └── pdf/route.ts         # POST: Generate PDF
│   │       ├── places/
│   │       │   └── search/route.ts      # GET: Google Places proxy (cached)
│   │       ├── directions/
│   │       │   └── route.ts             # GET: Google Directions proxy (cached)
│   │       ├── currency/
│   │       │   └── rates/route.ts       # GET: Exchange rates (cached 6h)
│   │       └── analytics/
│   │           └── event/route.ts       # POST: Track analytics event
│   ├── components/
│   │   ├── landing/
│   │   │   ├── hero.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── featured-itineraries.tsx
│   │   │   └── footer.tsx
│   │   ├── onboarding/
│   │   │   ├── onboarding-form.tsx      # Multi-step form container
│   │   │   ├── step-user-type.tsx
│   │   │   ├── step-duration.tsx
│   │   │   ├── step-budget.tsx
│   │   │   ├── step-interests.tsx
│   │   │   ├── step-group.tsx
│   │   │   ├── step-details.tsx         # Starting city, must-visit, special reqs
│   │   │   ├── step-summary.tsx         # Review before generate
│   │   │   └── progress-bar.tsx
│   │   ├── itinerary/
│   │   │   ├── itinerary-view.tsx       # Main container (day list + map + chat)
│   │   │   ├── trip-summary.tsx         # Header with total cost, days, actions
│   │   │   ├── day-card.tsx             # Collapsible day card
│   │   │   ├── activity-item.tsx        # Single activity in timeline
│   │   │   ├── accommodation-card.tsx   # Hotel with booking CTA
│   │   │   ├── transport-badge.tsx      # Transport info between locations
│   │   │   ├── cost-breakdown.tsx       # Daily/total cost display
│   │   │   ├── pro-tip.tsx              # Ceyla's tip callout
│   │   │   ├── advance-bookings.tsx     # "Before you go" alerts
│   │   │   └── packing-tips.tsx
│   │   ├── chat/
│   │   │   ├── chat-panel.tsx           # Sliding chat drawer
│   │   │   ├── chat-message.tsx         # Single message bubble
│   │   │   ├── chat-input.tsx           # Input with send button
│   │   │   ├── suggestion-chips.tsx     # Quick modification buttons
│   │   │   └── typing-indicator.tsx
│   │   ├── map/
│   │   │   ├── itinerary-map.tsx        # Mapbox map with route
│   │   │   ├── day-marker.tsx           # Numbered day pin
│   │   │   └── place-popup.tsx          # Click popup on marker
│   │   ├── explore/
│   │   │   ├── explore-grid.tsx         # Filterable itinerary grid
│   │   │   ├── itinerary-card.tsx       # Grid card for pre-built itinerary
│   │   │   └── filter-bar.tsx           # Duration/budget/interest filters
│   │   ├── auth/
│   │   │   ├── auth-modal.tsx           # Sign in / Sign up modal
│   │   │   ├── auth-button.tsx          # Header sign-in trigger
│   │   │   └── user-menu.tsx            # Logged-in user dropdown
│   │   ├── dashboard/
│   │   │   ├── trip-list.tsx            # Saved itineraries grid
│   │   │   └── trip-card.tsx            # Single saved trip card
│   │   └── shared/
│   │       ├── header.tsx               # Site header with nav
│   │       ├── footer.tsx               # Site footer
│   │       ├── currency-toggle.tsx      # Currency selector dropdown
│   │       ├── loading-screen.tsx       # Generation loading animation
│   │       ├── share-modal.tsx          # Share link/social modal
│   │       └── error-boundary.tsx
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── system-prompt.ts         # Sri Lanka knowledge layer (~3K tokens)
│   │   │   ├── generate.ts             # Itinerary generation logic (GPT-4o)
│   │   │   ├── refine.ts               # Chat refinement logic (GPT-4o-mini)
│   │   │   ├── tools.ts                # Tool definitions (search_places, get_drive_time)
│   │   │   ├── tool-handlers.ts        # Tool execution (call Google APIs)
│   │   │   ├── validate.ts             # Post-generation Zod validation
│   │   │   └── fallback.ts             # Claude Sonnet 4 fallback logic
│   │   ├── supabase/
│   │   │   ├── client.ts               # Browser Supabase client
│   │   │   ├── server.ts               # Server-side Supabase client
│   │   │   ├── middleware.ts            # Auth middleware for Next.js
│   │   │   └── admin.ts                # Service role client for API routes
│   │   ├── google/
│   │   │   ├── places.ts               # Google Places API client
│   │   │   └── directions.ts           # Google Directions API client
│   │   ├── affiliate/
│   │   │   ├── booking.ts              # Booking.com deep link builder
│   │   │   └── agoda.ts                # Agoda deep link builder
│   │   ├── cache/
│   │   │   └── redis.ts                # Upstash Redis client + helpers
│   │   ├── currency/
│   │   │   ├── rates.ts                # Exchange rate fetching + caching
│   │   │   └── format.ts               # Currency formatting utilities
│   │   ├── analytics/
│   │   │   └── track.ts                # PostHog event tracking helpers
│   │   ├── pdf/
│   │   │   └── itinerary-pdf.tsx       # React-PDF itinerary template
│   │   ├── hooks/
│   │   │   ├── use-currency.ts         # Currency context hook
│   │   │   ├── use-itinerary.ts        # Itinerary state management
│   │   │   └── use-session.ts          # Anonymous session management
│   │   └── types/
│   │       ├── itinerary.ts            # Zod schemas + TypeScript types
│   │       ├── preferences.ts          # Onboarding form types + validation
│   │       └── database.ts             # Supabase generated types
│   └── styles/
│       └── globals.css
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql      # Full database schema
│   ├── seed.sql                        # Pre-built itinerary seed data
│   └── config.toml
├── public/
│   ├── images/                         # Static images
│   ├── og/                             # OG share images
│   └── icons/                          # Favicon + PWA icons
├── tests/
│   ├── unit/
│   │   ├── validate.test.ts
│   │   ├── currency.test.ts
│   │   ├── affiliate.test.ts
│   │   └── system-prompt.test.ts
│   ├── integration/
│   │   ├── generate.test.ts
│   │   ├── refine.test.ts
│   │   └── places-cache.test.ts
│   └── e2e/
│       ├── generation-flow.spec.ts
│       ├── share-flow.spec.ts
│       └── auth-flow.spec.ts
├── CLAUDE.md                           # THIS FILE — project context for Claude
├── next.config.ts
├── tailwind.config.ts
├── biome.json
├── package.json
├── tsconfig.json
├── .env.local.example
└── .gitignore
```

## Key Architecture Decisions

1. **API-first, no places database** — All place data from Google Places API + web search in real-time. No custom DB to build/maintain. The AI knowledge layer (system prompt) is the moat.

2. **Multi-model AI** — GPT-4o for generation (Structured Outputs), GPT-4o-mini for chat refinement (15-20x cheaper), Claude Sonnet 4 for SEO content. Vercel AI SDK makes switching providers one line.

3. **Supabase as backend** — Replaces Neon + Drizzle + Clerk with one platform. PostgreSQL + Auth + Storage + RLS. Simpler stack, faster setup.

4. **Streaming everything** — Generation and refinement both stream via SSE. Vercel AI SDK's `useChat` handles client-side streaming state.

5. **Dual market from day one** — Foreign tourists (USD) + Local Sri Lankans (LKR). Auto-detect locale, manual toggle. Different onboarding flows but same AI engine.

## Development Conventions

### Code Style
- **Biome** for linting and formatting (replaces ESLint + Prettier)
- **Strict TypeScript** — no `any`, no implicit returns, strict null checks
- **Named exports** for components, **default exports** only for pages
- **Zod** for all runtime validation (API inputs, AI outputs, form data)
- **Server Components by default** — `'use client'` only when needed (interactivity, hooks, browser APIs)

### File Naming
- Components: `kebab-case.tsx` (e.g., `day-card.tsx`)
- Utilities: `kebab-case.ts` (e.g., `system-prompt.ts`)
- Types: `kebab-case.ts` in `lib/types/`
- Tests: `*.test.ts` (unit/integration) or `*.spec.ts` (e2e)

### Component Patterns
- Use shadcn/ui primitives for all interactive elements (buttons, inputs, modals, dropdowns)
- Tailwind utility classes directly on elements — no CSS modules, no styled-components
- `cn()` utility (from shadcn) for conditional class merging
- Props interfaces defined in the same file, exported if reused

### API Route Patterns
- All API routes validate input with Zod before processing
- AI routes return SSE streams (not JSON responses)
- Google API proxies check Redis cache before calling external API
- Rate limiting via Upstash `@upstash/ratelimit` on all public endpoints
- Error responses follow `{ error: string, code: string }` format

### Git Conventions
- Branch: `main` (production), `dev` (development), `feat/*`, `fix/*`
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- PRs: squash merge to `main`

## Environment Variables

```env
# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Google APIs (server-side only)
GOOGLE_PLACES_API_KEY=AIza...
GOOGLE_DIRECTIONS_API_KEY=AIza...

# Mapbox (client-side)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.ey...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxx...

# Affiliate
BOOKING_AFFILIATE_ID=...
AGODA_AFFILIATE_ID=...

# Currency
EXCHANGE_RATE_API_KEY=...

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Running the Project

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Production build
pnpm lint             # Biome lint + format check
pnpm test             # Run Vitest unit tests
pnpm test:e2e         # Run Playwright E2E tests
pnpm db:migrate       # Run Supabase migrations
pnpm db:generate      # Generate Supabase TypeScript types
```

## AI Development Notes

When working on this codebase:

1. **Always read `docs/SRS.md`** for functional requirements before implementing any feature. Each requirement has an ID (e.g., FR-IG-001) — reference it in commit messages.

2. **Check `docs/TASKS.md`** for current progress. Mark completed tasks with `[x]`. Pick up from the next unchecked task.

3. **The system prompt (`src/lib/ai/system-prompt.ts`)** is the most important file in the project. It encodes all Sri Lankan travel intelligence. Changes to it affect every generated itinerary. Test extensively after modifications.

4. **Zod schemas in `src/lib/types/itinerary.ts`** are shared between the AI Structured Output definition and the post-generation validator. Keep them in sync.

5. **Streaming is non-negotiable** for generation and refinement. Users must see progress in real-time. Never switch to request-response for AI endpoints.

6. **Cache aggressively** — every Google Places/Directions call should check Redis first. Cache key format: `places:{query}:{location}` or `directions:{origin}:{destination}:{mode}` with 24h TTL.

7. **Test with diverse preferences** — generate itineraries for: solo backpacker 14 days, luxury couple 7 days, local family weekend, friends adventure 5 days. Each should produce meaningfully different results.
