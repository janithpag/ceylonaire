# TASKS.md — Ceylonaire Development Task List

**Total Tasks:** 186
**Status:** Not Started
**Last Updated:** 2026-05-17

> Mark tasks with `[x]` as you complete them. Pick up from the next `[ ]` task when resuming work.

---

## Phase 1: Project Foundation (Day 1)

### T-001: Repository & Project Scaffold
- [x] T-001.1: Create GitHub repository `ceylonaire` with `.gitignore` (Node, Next.js, env)
- [x] T-001.2: Initialize Next.js 15 project with App Router, TypeScript strict mode, npm
- [x] T-001.3: Configure `tsconfig.json` with strict mode, path aliases (`@/` → `src/`)
- [x] T-001.4: Install and configure Tailwind CSS 4 with custom theme (brand colors, fonts)
- [x] T-001.5: Install and configure Biome (`biome.json`) for linting + formatting
- [x] T-001.6: Set up shadcn/ui with required components: button, input, select, dialog, dropdown-menu, slider, tabs, card, badge, separator, tooltip, sheet, popover
- [x] T-001.7: Create the full directory structure as defined in CLAUDE.md
- [x] T-001.8: Copy `CLAUDE.md`, `docs/SRS.md`, `docs/TASKS.md` into repository
- [x] T-001.9: Create `.env.local.example` with all required environment variables (no values)
- [x] T-001.10: Create initial `README.md` with setup instructions

### T-002: Design System & Brand Foundation
- [x] T-002.1: Define CSS custom properties in `globals.css` for brand colors (layla.ai-inspired lite palette): primary (#2A182E), primary-light (#4A2E54), lavender (#CDB3FF), lavender-light (#E8DCFF), surface (#EAE8EA), background (#FFFFFF), dark (#1A1A1A)
- [x] T-002.2: Configure Google Fonts: Playfair Display (headings), DM Sans (body) in `layout.tsx`
- [x] T-002.3: Create `cn()` utility function (from shadcn pattern) at `src/lib/utils.ts`
- [x] T-002.4: Build root `layout.tsx` with: html lang, font variables, metadata defaults, viewport config
- [x] T-002.5: Create favicon and basic OG image placeholder in `public/`

### T-003: Supabase Setup
- [x] T-003.1: Create Supabase project (dev environment)
- [x] T-003.2: Write initial migration `001_initial_schema.sql` with all tables: profiles, itineraries, chat_messages, prebuilt_itineraries, analytics_events (see SRS Section 7.1)
- [x] T-003.3: Write all RLS policies as defined in SRS Section 7.1
- [x] T-003.4: Write the `handle_new_user()` trigger function for auto-profile creation
- [x] T-003.5: Run migration against dev Supabase project and verify schema
- [x] T-003.6: Create `src/lib/supabase/client.ts` — browser Supabase client using `@supabase/ssr`
- [x] T-003.7: Create `src/lib/supabase/server.ts` — server-side Supabase client for API routes
- [x] T-003.8: Create `src/lib/supabase/admin.ts` — service role client for admin operations
- [x] T-003.9: Create `src/lib/supabase/middleware.ts` — Next.js middleware for auth session refresh
- [x] T-003.10: Generate TypeScript types from Supabase schema → `src/lib/types/database.ts`
- [x] T-003.11: Add Supabase middleware to `src/middleware.ts`

### T-004: External Service Setup
- [x] T-004.1: Create Upstash Redis instance, add credentials to `.env.local`
- [x] T-004.2: Create `src/lib/cache/redis.ts` with Upstash client, get/set/del helpers with TTL
- [x] T-004.3: Create Mapbox account, generate access token (domain-restricted), add to `.env.local`
- [x] T-004.4: Set up Google Cloud project, enable Places API (New) + Directions API, create API keys (IP-restricted)
- [x] T-004.5: Add OpenAI API key to `.env.local`
- [x] T-004.6: Add Anthropic API key to `.env.local`
- [x] T-004.7: Sign up for ExchangeRate API, add key to `.env.local`
- [x] T-004.8: Apply to Booking.com Affiliate Partner Programme
- [x] T-004.9: Apply to Agoda Partner Program
- [x] T-004.10: Create PostHog project, add keys to `.env.local`

---

## Phase 2: Landing Page (Day 2)

### T-005: Site Header
- [x] T-005.1: Build `src/components/shared/header.tsx` — logo, nav links (Explore, Plan a Trip), currency toggle, Sign In button
- [x] T-005.2: Header transparent on landing page hero, solid emerald on all other pages
- [x] T-005.3: Mobile hamburger menu with slide-out drawer (using shadcn Sheet)
- [x] T-005.4: Integrate `currency-toggle.tsx` in header (dropdown with USD, EUR, GBP, AUD, INR, LKR)

### T-006: Landing Page Hero
- [x] T-006.1: Build `src/components/landing/hero.tsx` with full-viewport emerald gradient background
- [x] T-006.2: Add animated decorative elements (circles, gradients) for visual depth
- [x] T-006.3: Headline: "Discover Sri Lanka Like a Local" with gold accent
- [x] T-006.4: Subheadline describing Ceyla and the value proposition
- [x] T-006.5: Two CTAs: "Plan My Trip" (gold, primary) → /plan, "See Sample Itinerary" (outline) → /explore/7-day-classic
- [x] T-006.6: Fade-in animation on page load (CSS transitions, no heavy library)
- [x] T-006.7: Fully responsive: stacked layout on mobile, generous spacing on desktop

### T-007: Landing Page Sections
- [x] T-007.1: Build `how-it-works.tsx` — 3-step visual flow: Preferences → Ceyla Plans → You Explore
- [x] T-007.2: Build `featured-itineraries.tsx` — 3 itinerary cards linking to /explore pages
- [x] T-007.3: Build `src/components/shared/footer.tsx` — About, Privacy, Terms, social links, IntellaNext credit
- [x] T-007.4: Assemble landing page at `src/app/page.tsx` as SSG (static export)
- [x] T-007.5: Add metadata: title, description, OG tags, Twitter cards
- [ ] T-007.6: Test responsive layout at 375px (mobile), 768px (tablet), 1280px (desktop)
- [ ] T-007.7: Lighthouse audit: target LCP < 2.5s, CLS < 0.1

---

## Phase 3: Onboarding Form (Day 3)

### T-008: Form Infrastructure
- [ ] T-008.1: Create `src/lib/types/preferences.ts` with Zod schema for all onboarding fields (foreign + local variants)
- [ ] T-008.2: Build `src/components/onboarding/onboarding-form.tsx` — multi-step container with state management (useState for current step, form data)
- [ ] T-008.3: Build `src/components/onboarding/progress-bar.tsx` — step indicator with progress percentage
- [ ] T-008.4: Implement localStorage persistence for form state (save on every change, restore on mount)
- [ ] T-008.5: Build navigation: Back button, Continue button (disabled until valid), Generate button on final step

### T-009: Form Steps — Foreign Visitor Flow
- [ ] T-009.1: Build `step-user-type.tsx` — two large cards: "I'm visiting Sri Lanka" / "I'm a local traveler"
- [ ] T-009.2: Build `step-duration.tsx` — quick-select buttons (3, 5, 7, 10, 14 days) + range slider (1-21)
- [ ] T-009.3: Build `step-budget.tsx` — three tier cards (Budget/Mid-range/Luxury) with $/day ranges and descriptions
- [ ] T-009.4: Build `step-interests.tsx` — multi-select chips with emojis for 12 interest categories
- [ ] T-009.5: Build `step-group.tsx` — 2x2 grid cards (Solo/Couple/Family/Friends) with icons
- [ ] T-009.6: Build `step-details.tsx` — starting city dropdown, must-visit free text, special requirements textarea
- [ ] T-009.7: Build `step-summary.tsx` — review all selections with edit links per section, "Generate My Itinerary" gold CTA

### T-010: Form Steps — Local Traveler Adaptations
- [ ] T-010.1: Adapt `step-duration.tsx` — promote 1/2/3 day options, Weekend/Long Weekend quick selects
- [ ] T-010.2: Adapt `step-budget.tsx` — LKR slider (5,000-50,000/day) instead of USD tier cards
- [ ] T-010.3: Adapt `step-interests.tsx` — add "Kid-friendly" and "Romantic" options
- [ ] T-010.4: Adapt `step-details.tsx` — starting city as searchable dropdown of Sri Lankan cities
- [ ] T-010.5: Validate all form steps with Zod schema, show inline errors

### T-011: Form Submission
- [ ] T-011.1: On form submit, save preferences to state and redirect to generation loading screen
- [ ] T-011.2: Create `/plan` page at `src/app/plan/page.tsx` mounting the onboarding form
- [ ] T-011.3: Test complete flow: form → validation → submission for both foreign and local paths

---

## Phase 4: AI Engine — Core (Day 4-5)

### T-012: System Prompt
- [ ] T-012.1: Write `src/lib/ai/system-prompt.ts` with complete Sri Lanka Knowledge Layer (~3,000 tokens):
  - [ ] T-012.1a: Ceyla agent identity and personality definition
  - [ ] T-012.1b: Seasonal calendar (SW/NE monsoon, inter-monsoon, hill country)
  - [ ] T-012.1c: Wildlife seasons (whales, safaris, elephant gathering, birds — month by month)
  - [ ] T-012.1d: Realistic drive time matrix (20+ routes, Sri Lanka-calibrated)
  - [ ] T-012.1e: Budget benchmarks table (budget/mid/luxury for foreign and local)
  - [ ] T-012.1f: Transport notes (PickMe, tuk-tuk rates, private driver, trains, flights)
  - [ ] T-012.1g: Key constraints (max driving, train booking rules, Sigiriya timing, Poya days, temple dress, visa)
  - [ ] T-012.1h: Hidden gems list (15+ off-beaten-path recommendations)
  - [ ] T-012.1i: Itinerary construction rules (10 rules: no backtracking, grouped proximity, etc.)
  - [ ] T-012.1j: Output format instructions referencing the Zod schema
- [ ] T-012.2: Export system prompt as a template function that accepts user preferences for contextual injection

### T-013: Zod Schemas & Types
- [ ] T-013.1: Write `src/lib/types/itinerary.ts` with all Zod schemas: CostEstimate, Coordinates, Activity, Accommodation, Transport, ItineraryDay, AdvanceBooking, Itinerary (see SRS Section 7.3)
- [ ] T-013.2: Export TypeScript types derived from Zod schemas
- [ ] T-013.3: Add coordinate bounds validation (Sri Lanka: 5.9-9.9°N, 79.5-81.9°E)
- [ ] T-013.4: Create preferences Zod schema in `src/lib/types/preferences.ts`

### T-014: Google API Proxies
- [ ] T-014.1: Build `src/lib/google/places.ts` — function to call Google Places API (New) with query, location, type, max_results
- [ ] T-014.2: Build `src/lib/google/directions.ts` — function to call Google Directions API with origin, destination, mode
- [ ] T-014.3: Build `src/app/api/places/search/route.ts` — GET proxy with Redis caching (24h TTL), rate limiting
- [ ] T-014.4: Build `src/app/api/directions/route.ts` — GET proxy with Redis caching (24h TTL), rate limiting
- [ ] T-014.5: Cache key format: `places:{md5(query+location+type)}` and `directions:{md5(origin+dest+mode)}`
- [ ] T-014.6: Test both proxies with sample queries, verify caching works (second call hits Redis)

### T-015: AI Tool Definitions
- [ ] T-015.1: Write `src/lib/ai/tools.ts` — OpenAI tool definitions for `search_places` and `get_drive_time`
- [ ] T-015.2: Write `src/lib/ai/tool-handlers.ts` — execution functions that call Google API proxies when AI invokes tools
- [ ] T-015.3: Enable OpenAI built-in web search tool in generation config

### T-016: Itinerary Generation Engine
- [ ] T-016.1: Write `src/lib/ai/generate.ts` — main generation function using Vercel AI SDK `generateObject()` with GPT-4o
- [ ] T-016.2: Implement agentic tool-call loop: Claude calls tools → we execute → feed results back → repeat until done
- [ ] T-016.3: Pass Zod ItinerarySchema to `generateObject()` for Structured Output enforcement
- [ ] T-016.4: Format user preferences into the generation prompt message
- [ ] T-016.5: Write `src/lib/ai/validate.ts` — post-generation validation: schema check, day count, coordinate bounds, driving cap, completeness
- [ ] T-016.6: Implement retry logic: up to 2 retries on validation failure
- [ ] T-016.7: Write `src/lib/ai/fallback.ts` — Claude Sonnet 4 fallback if GPT-4o fails 3 times

### T-017: Generation API Route
- [ ] T-017.1: Build `src/app/api/itinerary/generate/route.ts` — POST endpoint
- [ ] T-017.2: Validate incoming preferences with Zod (return 400 on invalid)
- [ ] T-017.3: Check rate limit (3/10min anonymous, 10/10min authenticated) via Upstash
- [ ] T-017.4: Invoke generation engine, stream progress events via SSE
- [ ] T-017.5: On completion, save itinerary to Supabase (itineraries table)
- [ ] T-017.6: Return itinerary_id and full itinerary JSON in final SSE event
- [ ] T-017.7: Track analytics event: `itinerary_generated` with metadata
- [ ] T-017.8: Test with 5+ different preference combinations, verify valid JSON output

---

## Phase 5: Itinerary UI (Day 6)

### T-018: Itinerary Page Structure
- [ ] T-018.1: Build `src/app/trip/[id]/page.tsx` — fetch itinerary from Supabase by ID, render ItineraryView
- [ ] T-018.2: Build `src/components/itinerary/itinerary-view.tsx` — main container with responsive layout (map + cards + chat)
- [ ] T-018.3: Desktop layout: sticky map left (50%) + scrollable cards right (50%)
- [ ] T-018.4: Mobile layout: collapsed map preview top + cards below, expandable map

### T-019: Trip Summary & Action Bar
- [ ] T-019.1: Build `trip-summary.tsx` — emerald header with: title, summary, total cost, duration, travelers
- [ ] T-019.2: Build action bar: "Refine with Ceyla", "Share", "Download PDF" buttons
- [ ] T-019.3: Costs display in user's selected currency (from context/cookie)

### T-020: Day Cards
- [ ] T-020.1: Build `day-card.tsx` — collapsible card with day number circle, title, region, activity count, daily cost
- [ ] T-020.2: Expanded state shows: transport info, activity timeline, accommodation, pro tip
- [ ] T-020.3: First day expanded by default, all others collapsed
- [ ] T-020.4: Smooth expand/collapse animation (CSS transition on max-height)

### T-021: Activity Timeline
- [ ] T-021.1: Build `activity-item.tsx` — time, name, duration badge, cost, tip with vertical timeline connector
- [ ] T-021.2: Different styling for activity types (attraction, meal, experience, transport, rest)
- [ ] T-021.3: Build `transport-badge.tsx` — mode icon, from → to, duration, cost, scenic badge

### T-022: Accommodation & Extras
- [ ] T-022.1: Build `accommodation-card.tsx` — hotel name, tier badge, rating, cost/night, "Book on Booking.com" CTA
- [ ] T-022.2: Build `pro-tip.tsx` — Ceyla's tip callout box with emerald left border
- [ ] T-022.3: Build `advance-bookings.tsx` — "Before You Go" alert box with items needing advance booking
- [ ] T-022.4: Build `packing-tips.tsx` — tag-style packing suggestions
- [ ] T-022.5: Build `cost-breakdown.tsx` — total trip cost by category (accommodation, food, activities, transport)

### T-023: Affiliate Links
- [ ] T-023.1: Build `src/lib/affiliate/booking.ts` — construct Booking.com deep link with aid parameter, hotel slug, dates, guests
- [ ] T-023.2: Build `src/lib/affiliate/agoda.ts` — construct Agoda deep link with cid parameter
- [ ] T-023.3: Integrate affiliate link generation into the post-generation pipeline (enrich itinerary JSON with booking URLs)
- [ ] T-023.4: Track `booking_link_clicked` analytics event on CTA click

---

## Phase 6: Map Integration (Day 7)

### T-024: Mapbox Setup
- [ ] T-024.1: Install `react-map-gl` and `mapbox-gl`, configure Mapbox CSS import
- [ ] T-024.2: Build `src/components/map/itinerary-map.tsx` — Mapbox GL JS map with Ceylonaire style
- [ ] T-024.3: Set initial viewport to fit all itinerary coordinates with padding

### T-025: Route Visualization
- [ ] T-025.1: Build `day-marker.tsx` — numbered circular markers styled with brand colors
- [ ] T-025.2: Render route polyline connecting all day locations (dashed line with arrows)
- [ ] T-025.3: Build `place-popup.tsx` — click popup with place name, photo, day reference
- [ ] T-025.4: Implement fly-to animation when clicking a day card (map pans to that day's location)
- [ ] T-025.5: Implement scroll sync: scrolling to a day card highlights the corresponding marker
- [ ] T-025.6: Test map rendering on mobile (touch gestures, viewport sizing)

---

## Phase 7: Chat Refinement (Day 8-9)

### T-026: Chat UI
- [ ] T-026.1: Build `src/components/chat/chat-panel.tsx` — sliding drawer (desktop: right 30%, mobile: bottom sheet)
- [ ] T-026.2: Build `chat-message.tsx` — user bubble (emerald, right-aligned), Ceyla bubble (cream, left-aligned with avatar)
- [ ] T-026.3: Build `chat-input.tsx` — text input + send button, Enter to submit
- [ ] T-026.4: Build `typing-indicator.tsx` — animated dots while Ceyla is generating
- [ ] T-026.5: Build `suggestion-chips.tsx` — quick modification buttons above input
- [ ] T-026.6: Auto-scroll to bottom on new messages
- [ ] T-026.7: Initial Ceyla greeting message on chat open

### T-027: Refinement AI Engine
- [ ] T-027.1: Write `src/lib/ai/refine.ts` — refinement function using Vercel AI SDK `streamText()` with GPT-4o-mini
- [ ] T-027.2: Construct messages array: system prompt + current itinerary JSON + chat history + user's new message
- [ ] T-027.3: Instruct AI to return: natural language explanation + JSON delta of changed days
- [ ] T-027.4: Parse streaming response: extract text content and delta JSON
- [ ] T-027.5: Build `src/app/api/itinerary/refine/route.ts` — POST endpoint with SSE streaming
- [ ] T-027.6: Save chat messages to Supabase `chat_messages` table
- [ ] T-027.7: Increment `refinement_count` on itinerary record

### T-028: Delta Merge Logic
- [ ] T-028.1: Implement itinerary delta merge: replace modified days, preserve unaffected days
- [ ] T-028.2: Recalculate total_cost after merge
- [ ] T-028.3: Update itinerary record in Supabase with merged version
- [ ] T-028.4: Update the map route after itinerary changes
- [ ] T-028.5: Implement refinement limit: 10 for anonymous, unlimited for authenticated
- [ ] T-028.6: Track `refinement_sent` analytics event

### T-029: Chat Integration with Itinerary View
- [ ] T-029.1: Integrate Vercel AI SDK `useChat` hook in the itinerary view
- [ ] T-029.2: On receiving delta from refinement, update itinerary state and re-render day cards
- [ ] T-029.3: Show "Updated" badge on modified day cards after refinement
- [ ] T-029.4: Test full flow: open chat → send refinement → see itinerary update → map updates

---

## Phase 8: Booking & Monetization (Day 10)

### T-030: Booking Integration
- [ ] T-030.1: Finalize Booking.com affiliate link format with all parameters (aid, hotel, dates, adults)
- [ ] T-030.2: Implement fallback search link when exact hotel match unavailable
- [ ] T-030.3: Add Agoda as secondary booking option on accommodation cards
- [ ] T-030.4: Add disclaimer text: "Prices are estimates. Check booking site for current rates."
- [ ] T-030.5: Style booking CTAs prominently with OTA logos/colors

---

## Phase 9: Share & Export (Day 11)

### T-031: Share Functionality
- [ ] T-031.1: Build `src/app/api/itinerary/[id]/share/route.ts` — generate unique share slug, update is_shared flag
- [ ] T-031.2: Build `src/app/s/[slug]/page.tsx` — public SSR page rendering shared itinerary (read-only, no chat)
- [ ] T-031.3: Add OG meta tags to shared page: og:title, og:description, og:image (auto-generated route map)
- [ ] T-031.4: Add Twitter Card meta tags (large image format)
- [ ] T-031.5: Build `share-modal.tsx` — copy link, WhatsApp, Facebook, Twitter/X, email share buttons
- [ ] T-031.6: Implement Web Share API for native mobile sharing
- [ ] T-031.7: Add "Customize This Trip" CTA on shared pages → /plan with pre-filled similar preferences
- [ ] T-031.8: Increment `view_count` on shared itinerary page load
- [ ] T-031.9: Track `itinerary_shared` analytics event with share method

### T-032: PDF Export
- [ ] T-032.1: Build `src/lib/pdf/itinerary-pdf.tsx` — React-PDF template with: cover page (title, map, dates), day-by-day details, cost breakdown, packing tips, QR codes for booking links, Ceylonaire branding
- [ ] T-032.2: Build `src/app/api/export/pdf/route.ts` — POST endpoint that renders PDF and returns file
- [ ] T-032.3: Add "Download PDF" button to itinerary action bar
- [ ] T-032.4: Track `pdf_exported` analytics event

---

## Phase 10: Authentication (Day 12)

### T-033: Supabase Auth Integration
- [ ] T-033.1: Configure Supabase Auth providers: email/password, Google OAuth, Apple OAuth
- [ ] T-033.2: Build `src/components/auth/auth-modal.tsx` — modal dialog with sign in / sign up tabs
- [ ] T-033.3: Implement Google OAuth sign-in button
- [ ] T-033.4: Implement Apple OAuth sign-in button
- [ ] T-033.5: Implement email + password sign-up/sign-in
- [ ] T-033.6: Build `src/app/auth/callback/route.ts` — OAuth callback handler
- [ ] T-033.7: Build `src/components/auth/auth-button.tsx` — header trigger (shows "Sign In" or user avatar)
- [ ] T-033.8: Build `src/components/auth/user-menu.tsx` — dropdown: My Trips, Settings, Sign Out

### T-034: Session Migration
- [ ] T-034.1: Implement anonymous session tracking via httpOnly cookie
- [ ] T-034.2: On account creation, migrate session itineraries: update `user_id` on all itineraries matching `session_id`
- [ ] T-034.3: Remove free generation cap for authenticated users

### T-035: Dashboard
- [ ] T-035.1: Build `src/app/dashboard/page.tsx` — protected page (redirect to auth if not logged in)
- [ ] T-035.2: Build `src/components/dashboard/trip-list.tsx` — grid of saved itineraries
- [ ] T-035.3: Build `src/components/dashboard/trip-card.tsx` — title, duration, date, "Open" / "Delete" actions
- [ ] T-035.4: Implement soft delete with confirmation dialog

---

## Phase 11: Currency System (Day 13)

### T-036: Currency Infrastructure
- [ ] T-036.1: Build `src/lib/currency/rates.ts` — fetch exchange rates from API, cache in Redis (6h TTL)
- [ ] T-036.2: Build `src/lib/currency/format.ts` — format amount by currency (LKR: comma, no decimals; USD/EUR/GBP: symbol + 2 decimals)
- [ ] T-036.3: Build `src/lib/hooks/use-currency.ts` — React context providing current currency + conversion function
- [ ] T-036.4: Create CurrencyProvider wrapper in root layout
- [ ] T-036.5: Build `src/app/api/currency/rates/route.ts` — GET endpoint returning cached rates

### T-037: Currency Integration
- [ ] T-037.1: Auto-detect user locale on first visit (IP geolocation via Vercel headers), set LKR for Sri Lanka, USD for others
- [ ] T-037.2: Persist currency preference in cookie/localStorage
- [ ] T-037.3: Wire up `currency-toggle.tsx` in header to CurrencyProvider
- [ ] T-037.4: Update all cost displays across: itinerary cards, daily costs, accommodation, activities, trip summary
- [ ] T-037.5: Add "Rates are approximate" disclaimer near cost displays
- [ ] T-037.6: Track `currency_changed` analytics event

---

## Phase 12: Loading & Error States (Day 13-14)

### T-038: Generation Loading Screen
- [ ] T-038.1: Build `src/components/shared/loading-screen.tsx` — full-screen animated loading for generation
- [ ] T-038.2: Animated progress ring with percentage
- [ ] T-038.3: Status messages cycling: "Searching for the perfect spots...", "Checking hotel availability...", "Calculating scenic routes...", "Adding Ceyla's insider tips..."
- [ ] T-038.4: Fun facts carousel about Sri Lanka rotating every 3 seconds
- [ ] T-038.5: Transition to itinerary view on completion

### T-039: Error Handling
- [ ] T-039.1: Build `src/components/shared/error-boundary.tsx` — React error boundary with fallback UI
- [ ] T-039.2: Generation failure UI: "Ceyla is having a moment — please try again" with retry button
- [ ] T-039.3: Chat refinement failure: show error in chat, preserve previous itinerary state
- [ ] T-039.4: API rate limit exceeded: show friendly message with countdown
- [ ] T-039.5: Network error handling on all API calls with retry logic
- [ ] T-039.6: 404 page with suggested itineraries

### T-040: Rate Limiting
- [ ] T-040.1: Configure `@upstash/ratelimit` on generation endpoint: 3 req/10min (anon), 10 req/10min (auth)
- [ ] T-040.2: Configure global rate limit: 60 req/min per IP on all API routes
- [ ] T-040.3: Configure rate limit on Google API proxies: 100 req/min
- [ ] T-040.4: Return 429 with `Retry-After` header on rate limit hit
- [ ] T-040.5: Track `free_limit_hit` analytics event when anonymous user reaches cap

---

## Phase 13: Mobile Responsiveness (Day 14)

### T-041: Responsive Polish
- [ ] T-041.1: Test and fix landing page at 375px, 390px, 414px (common mobile widths)
- [ ] T-041.2: Test and fix onboarding form on mobile — large touch targets (min 44px), full-width inputs
- [ ] T-041.3: Test and fix itinerary view on mobile — map collapse/expand, stacked cards
- [ ] T-041.4: Test and fix chat panel on mobile — bottom sheet behavior, keyboard avoidance
- [ ] T-041.5: Test and fix share modal on mobile — native share API integration
- [ ] T-041.6: Test and fix all modals/dialogs on mobile — full-screen on small devices
- [ ] T-041.7: Verify no horizontal scrolling on any page at any breakpoint

---

## Phase 14: SEO & Pre-built Itineraries (Day 15-16)

### T-042: Pre-built Itinerary Generation
- [ ] T-042.1: Write a script to generate 10 pre-built itineraries using Claude Sonnet 4 API
- [ ] T-042.2: Generate: 7-Day Classic Sri Lanka (Cultural Triangle + South Coast)
- [ ] T-042.3: Generate: 10-Day Complete Sri Lanka
- [ ] T-042.4: Generate: 14-Day Ultimate Sri Lanka Explorer
- [ ] T-042.5: Generate: 5-Day Southern Beach & Wildlife
- [ ] T-042.6: Generate: 3-Day Weekend: Hill Country from Colombo
- [ ] T-042.7: Generate: 3-Day Weekend: South Coast from Colombo
- [ ] T-042.8: Generate: 7-Day Budget Backpacker Sri Lanka
- [ ] T-042.9: Generate: 7-Day Luxury Honeymoon Sri Lanka
- [ ] T-042.10: Generate: 5-Day East Coast (Trincomalee + Arugam Bay)
- [ ] T-042.11: Generate: 7-Day Family-Friendly Sri Lanka
- [ ] T-042.12: Validate all 10 itineraries against Zod schema, fix any issues
- [ ] T-042.13: Write `supabase/seed.sql` to insert all pre-built itineraries

### T-043: Explore Pages
- [ ] T-043.1: Build `src/app/explore/page.tsx` — SSG page with filterable grid
- [ ] T-043.2: Build `src/components/explore/explore-grid.tsx` — responsive card grid
- [ ] T-043.3: Build `src/components/explore/itinerary-card.tsx` — hero image, title, badges, description, price
- [ ] T-043.4: Build `src/components/explore/filter-bar.tsx` — duration, budget, interests, audience filters
- [ ] T-043.5: Build `src/app/explore/[slug]/page.tsx` — SSG + ISR detail page with full itinerary display
- [ ] T-043.6: Add "Customize This Trip" CTA on each explore detail page → /plan with pre-filled preferences
- [ ] T-043.7: Track `explore_viewed` and `prebuilt_customized` analytics events

### T-044: SEO Infrastructure
- [ ] T-044.1: Generate XML sitemap at `src/app/sitemap.ts` including all /explore/[slug] pages
- [ ] T-044.2: Configure `robots.txt` at `src/app/robots.ts` — allow public pages, block /api/ and /dashboard/
- [ ] T-044.3: Add JSON-LD structured data (TripPlan/ItemList schema) to all itinerary pages
- [ ] T-044.4: Ensure unique `<title>` and `<meta name="description">` on every page
- [ ] T-044.5: Set canonical URLs on all pages
- [ ] T-044.6: Generate OG images for pre-built itineraries (route map preview)

---

## Phase 15: Analytics (Day 17)

### T-045: PostHog Integration
- [ ] T-045.1: Install `posthog-js` and create PostHog provider in root layout
- [ ] T-045.2: Build `src/lib/analytics/track.ts` — helper functions for tracking events
- [ ] T-045.3: Build `src/app/api/analytics/event/route.ts` — server-side event tracking endpoint
- [ ] T-045.4: Implement all event tracking from SRS Section 7.2:
  - [ ] T-045.4a: `onboarding_started` — when user begins form
  - [ ] T-045.4b: `onboarding_completed` — when user submits form
  - [ ] T-045.4c: `itinerary_generated` — on successful generation
  - [ ] T-045.4d: `generation_failed` — on generation failure
  - [ ] T-045.4e: `refinement_sent` — when user sends chat message
  - [ ] T-045.4f: `booking_link_clicked` — when user clicks booking CTA
  - [ ] T-045.4g: `itinerary_shared` — when user shares itinerary
  - [ ] T-045.4h: `pdf_exported` — when user downloads PDF
  - [ ] T-045.4i: `account_created` — when user signs up
  - [ ] T-045.4j: `explore_viewed` — when user visits /explore
  - [ ] T-045.4k: `prebuilt_customized` — when user clicks "Customize This Trip"
  - [ ] T-045.4l: `currency_changed` — when user toggles currency
  - [ ] T-045.4m: `free_limit_hit` — when anonymous user hits generation cap
- [ ] T-045.5: Set up PostHog dashboards: generation funnel, booking conversion funnel, user flow

---

## Phase 16: Testing (Day 18)

### T-046: Unit Tests (Vitest)
- [ ] T-046.1: Configure Vitest with TypeScript and path aliases
- [ ] T-046.2: Test itinerary Zod schema: valid inputs pass, invalid inputs fail (10+ test cases)
- [ ] T-046.3: Test currency conversion and formatting for all 6 currencies
- [ ] T-046.4: Test affiliate link construction (Booking.com + Agoda) with various parameters
- [ ] T-046.5: Test preference formatting for AI prompt
- [ ] T-046.6: Test rate limit counting logic
- [ ] T-046.7: Test share slug generation (uniqueness, URL-safety)
- [ ] T-046.8: Test post-generation validation (coordinate bounds, day count, completeness)

### T-047: Integration Tests
- [ ] T-047.1: Test generation API route with mocked OpenAI response → produces valid itinerary
- [ ] T-047.2: Test refinement API route with mocked response → correctly merges delta
- [ ] T-047.3: Test Google Places proxy → first call hits API, second call hits Redis cache
- [ ] T-047.4: Test auth flow: signup → session migration → dashboard access

### T-048: E2E Tests (Playwright)
- [ ] T-048.1: Configure Playwright with Chrome, Firefox, Safari
- [ ] T-048.2: Test full generation flow: Landing → Plan → Fill form → Generate → View itinerary → Verify map
- [ ] T-048.3: Test chat refinement: Open chat → Send message → Verify itinerary updates
- [ ] T-048.4: Test share flow: Generate → Share → Open share link in incognito → Verify viewable
- [ ] T-048.5: Test mobile flow: All above at 375px viewport

---

## Phase 17: Production Deployment (Day 19)

### T-049: Deployment Setup
- [ ] T-049.1: Connect GitHub repo to Vercel project
- [ ] T-049.2: Configure Vercel environment variables (all from `.env.local`)
- [ ] T-049.3: Create Supabase production project, run migrations
- [ ] T-049.4: Seed production database with 10 pre-built itineraries
- [ ] T-049.5: Register domain (ceylonaire.com) on Porkbun/Cloudflare
- [ ] T-049.6: Configure Cloudflare DNS pointing to Vercel
- [ ] T-049.7: Verify SSL certificate is active
- [ ] T-049.8: Configure Vercel production domain (ceylonaire.com)
- [ ] T-049.9: Set up Google Search Console, submit sitemap
- [ ] T-049.10: Verify all environment variables are set in production
- [ ] T-049.11: Deploy to production, verify all pages load correctly

### T-050: Production Verification
- [ ] T-050.1: Test full generation flow on production
- [ ] T-050.2: Test share flow with real URL (ceylonaire.com/s/xxx)
- [ ] T-050.3: Verify OG meta tags render correctly (use ogp.me debugger)
- [ ] T-050.4: Verify Google Places and Directions APIs work with production keys
- [ ] T-050.5: Verify Booking.com affiliate links open correctly
- [ ] T-050.6: Run Lighthouse audit on production: target all green Core Web Vitals
- [ ] T-050.7: Test from a mobile device on real cellular network

---

## Phase 18: Soft Launch (Day 20-21)

### T-051: Launch Preparation
- [ ] T-051.1: Create social media preview: Instagram story announcing Ceylonaire
- [ ] T-051.2: Write launch post for Reddit r/srilanka and r/travel
- [ ] T-051.3: Prepare WhatsApp message for personal network sharing
- [ ] T-051.4: Share in PIM MBA WhatsApp/Telegram groups
- [ ] T-051.5: Share in Sri Lanka tech community (SLASSCOM, tech meetup groups)
- [ ] T-051.6: Monitor PostHog analytics dashboard for first 24 hours
- [ ] T-051.7: Monitor error logs in Vercel for any production issues
- [ ] T-051.8: Collect and document user feedback for v1.1 backlog

### T-052: Post-Launch Fixes
- [ ] T-052.1: Fix any critical bugs discovered during soft launch
- [ ] T-052.2: Adjust AI system prompt based on itinerary quality feedback
- [ ] T-052.3: Optimize any slow-loading pages identified in analytics
- [ ] T-052.4: Update pre-built itineraries if AI quality issues found
- [ ] T-052.5: Document lessons learned and update TASKS.md with v1.1 backlog

---

## Progress Summary

| Phase | Tasks | Completed | Status |
|---|---|---|---|
| 1. Project Foundation | 34 | 0 | Not Started |
| 2. Landing Page | 18 | 0 | Not Started |
| 3. Onboarding Form | 18 | 0 | Not Started |
| 4. AI Engine Core | 30 | 0 | Not Started |
| 5. Itinerary UI | 21 | 0 | Not Started |
| 6. Map Integration | 8 | 0 | Not Started |
| 7. Chat Refinement | 20 | 0 | Not Started |
| 8. Booking | 5 | 0 | Not Started |
| 9. Share & Export | 13 | 0 | Not Started |
| 10. Authentication | 12 | 0 | Not Started |
| 11. Currency System | 11 | 0 | Not Started |
| 12. Loading & Error States | 16 | 0 | Not Started |
| 13. Mobile Responsiveness | 7 | 0 | Not Started |
| 14. SEO & Pre-built | 19 | 0 | Not Started |
| 15. Analytics | 19 | 0 | Not Started |
| 16. Testing | 15 | 0 | Not Started |
| 17. Production Deploy | 18 | 0 | Not Started |
| 18. Soft Launch | 13 | 0 | Not Started |
| **TOTAL** | **277** | **0** | **Not Started** |
