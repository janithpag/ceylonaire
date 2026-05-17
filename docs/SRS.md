# SRS.md — Ceylonaire Software Requirements Specification

**Version:** 2.0 (Development Reference)
**Date:** 2026-05-17

> This is the development-focused SRS. For the full formal version, see the PDF project proposal.

---

## 1. Product Overview

**Ceylonaire** is an AI-powered travel itinerary platform for Sri Lanka. The AI agent **Ceyla** generates personalized day-by-day itineraries using real-time external data (Google Places, Directions, web search) combined with a deep Sri Lankan travel knowledge layer. Users can refine itineraries through chat, export as PDF, share via links, and book accommodations through affiliate links.

**Key constraints:**
- No custom places database — all place data from real-time APIs
- English only for MVP
- Web only (responsive, PWA later) — no native mobile app
- Affiliate revenue only — no direct payments in MVP
- 3-week build timeline

---

## 2. User Types & Access Control

| User Type | Auth | Generations | Refinements | Save Trips | Dashboard |
|---|---|---|---|---|---|
| Anonymous (cookie session) | None | 3 per session | 10 per itinerary | No | No |
| Registered User | Supabase Auth | Unlimited | Unlimited | Yes | Yes |
| Admin | Supabase Auth + admin role | Unlimited | Unlimited | Yes | Yes + admin panel |

**Auth providers:** Email/password, Google OAuth, Apple OAuth (all via Supabase Auth)

---

## 3. Functional Requirements

### 3.1 Landing Page (/)

- SSG (statically generated) for optimal load and SEO
- Hero: emerald gradient, headline "Discover Sri Lanka Like a Local", gold accent, two CTAs
- Two entry paths: "I'm visiting Sri Lanka" (foreign) and "Plan a local trip" (local)
- "How it works" 3-step section
- Featured pre-built itineraries (3 cards)
- Sticky header: logo, nav (Explore, Plan a Trip, My Trips), currency toggle, Sign In
- Footer: About, Privacy, Terms, social links, IntellaNext credit
- **LCP < 2.5s on 3G**

### 3.2 Onboarding (/plan)

**Multi-step form, 6-7 steps depending on user type:**

**Step 1 — User Type:** "I'm visiting Sri Lanka" / "I'm a local traveler"

**Step 2 — Duration:**
- Quick buttons: 3, 5, 7, 10, 14 days
- Range slider: 1-21 days
- Local variant: promote 1/2/3 day options, Weekend/Long Weekend quick selects

**Step 3 — Budget:**
- Foreign: Three tier cards
  - Budget: $30-65/day (hostels, local food, public transport)
  - Mid-range: $85-195/day (boutique hotels, nice restaurants, private transport)
  - Luxury: $280-700+/day (5-star villas, fine dining, private experiences)
- Local: LKR slider 5,000-50,000/day

**Step 4 — Interests:** Multi-select chips
- Beach, Culture & Heritage, Wildlife & Safari, Adventure & Hiking, Food & Culinary, Wellness & Ayurveda, Photography, Nature & Eco, Surfing, Scenic Trains, Nightlife, Shopping
- Local adds: Kid-friendly, Romantic

**Step 5 — Group Type:** Solo / Couple / Family / Friends (with group size number)

**Step 6 — Details:**
- Starting city: Colombo (BIA Airport) / Mattala Airport / Already in Sri Lanka (specify)
- Local: searchable dropdown of Sri Lankan cities
- Must-visit places (optional free text)
- Special requirements (optional: dietary, accessibility, celebrations)

**Step 7 — Summary:** Review all selections, edit links per section, "Generate My Itinerary" CTA

**Form behavior:**
- Progress bar with step X of Y
- localStorage persistence (survives refresh/navigation)
- Client-side Zod validation on each step
- Completable in < 90 seconds
- Minimum 44px touch targets on mobile

### 3.3 AI Itinerary Generation

**Model:** GPT-4o with Structured Outputs (Zod schema enforcement)

**Tools available during generation:**
1. `search_places` — Google Places API proxy (cached 24h in Redis)
2. `get_drive_time` — Google Directions API proxy (cached 24h in Redis)
3. `web_search` — OpenAI built-in web search

**System prompt:** Sri Lanka Knowledge Layer (~3,000 tokens) containing:
- Seasonal calendar, wildlife seasons, drive time matrix
- Budget benchmarks, transport notes, cultural constraints
- Hidden gems, itinerary construction rules

**Generation output must include:**
- Title and 2-3 sentence summary
- Day-by-day breakdown (morning/afternoon/evening)
- Named places with coordinates from Google Places
- Accommodation per night (name, price, tier, booking CTA)
- Specific restaurant recommendations (not "lunch in area")
- Transport between locations (mode, duration, cost)
- Daily cost estimate in user's currency
- Pro tip per day
- Total cost by category
- Packing tips, important notes, advance booking reminders
- At least one hidden gem per itinerary

**Quality constraints (enforced):**
- Max 4-5h driving/day (unless transit day)
- No geographic backtracking
- Activities grouped by proximity
- Rest day for trips 5+ days
- Alternating intensity
- Beach destinations: minimum 2 nights
- Scenic train suggested when passing through hill country

**Performance:** < 30 seconds (7-day), < 45 seconds (14+ days)

**Streaming:** SSE to frontend with progress events

**Validation (post-generation):**
- Zod schema validation
- Day count matches request
- All coordinates within Sri Lanka bounds (5.9-9.9°N, 79.5-81.9°E)
- Retry up to 2 times on failure
- Fallback to Claude Sonnet 4 after 3 GPT-4o failures

### 3.4 Itinerary Display (/trip/[id])

**Layout:**
- Desktop: sticky map left (50%) + scrollable day cards right (50%)
- Mobile: collapsed map preview (expandable) + stacked cards below

**Day cards (collapsible):**
- Day number circle, title, region, activity count, daily cost
- Expanded: transport info, activity timeline, accommodation card, pro tip
- First day expanded, rest collapsed

**Activity timeline:** Time, name, duration badge, cost, tip, vertical connector line

**Accommodation card:** Name, tier badge, rating, cost/night, "Book on Booking.com" CTA

**Trip summary header:** Title, summary, total cost, duration, action buttons

**Action bar:** "Refine with Ceyla", "Share", "Download PDF"

### 3.5 Interactive Map

- Mapbox GL JS via react-map-gl
- Numbered circular markers per day
- Route polyline connecting days
- Popup on marker click (place name, photo, day ref)
- Fly-to animation synced with day card scroll/click
- Initial viewport fits all coordinates

### 3.6 Chat Refinement

**Model:** GPT-4o-mini (15-20x cheaper than GPT-4o)

**UI:**
- Desktop: right-side sliding panel (30% width)
- Mobile: bottom sheet (expandable to full screen)
- User bubbles (emerald, right), Ceyla bubbles (cream, left with avatar)
- Typing indicator, auto-scroll, suggestion chips

**Suggestion chips:** "Add a beach day", "Find cheaper hotels", "Extend by 1 day", "Make it more adventurous", "Add whale watching", "Reduce driving time", "Add a rest day"

**Behavior:**
- Streaming token-by-token via Vercel AI SDK `useChat`
- Returns: natural language explanation + JSON delta of changed days
- Delta merge: replace modified days, preserve unaffected
- Recalculate total cost after merge
- Maintain full chat history within session
- Limits: 10/itinerary (anonymous), unlimited (authenticated)

**Ceyla personality:** Warm, knowledgeable, enthusiastic — local friend who loves Sri Lanka. Occasional cultural references. Never robotic.

### 3.7 User Accounts

- Optional — all core features work without account
- Auth: Supabase Auth (email/password, Google, Apple)
- Sign-in via modal overlay (not separate page)
- Session migration: on signup, migrate anonymous itineraries to account
- Dashboard (/dashboard): grid of saved trips with Open/Delete actions
- Strategic signup prompts: after 3rd generation, when saving, when sharing
- Account deletion supported (removes data within 24h)

### 3.8 Share & Export

**Share:**
- Generate unique URL at /s/[slug]
- Public, viewable without auth
- OG meta tags (title, description, route map image)
- Twitter Card meta tags
- Share modal: copy link, WhatsApp, Facebook, Twitter/X, email, Web Share API
- "Customize This Trip" CTA on shared pages

**PDF Export:**
- Server-side via @react-pdf/renderer
- Contents: branded cover, day-by-day details, cost breakdown, booking QR codes, packing tips, Ceylonaire branding

### 3.9 Dual Currency

- Auto-detect: LKR for Sri Lankan IPs, USD for others
- Manual toggle in header: USD, EUR, GBP, AUD, INR, LKR
- Persists in cookie/localStorage
- All costs update immediately on change (client-side conversion)
- Exchange rates cached in Redis (6h TTL)
- LKR: comma separators, no decimals. Others: symbol + 2 decimals
- "Rates are approximate" disclaimer

### 3.10 Explore & SEO Pages

- /explore: filterable grid of pre-built itineraries (SSG)
- /explore/[slug]: detail page with full itinerary (SSG + ISR)
- Filters: duration, budget tier, interests, audience
- Cards: hero image, title, badges, description, price
- JSON-LD structured data on all itinerary pages
- XML sitemap auto-generated
- 10 pre-built itineraries at launch (see TASKS.md T-042)

### 3.11 Booking Affiliate

- Booking.com deep links with `aid` parameter on all accommodations
- Agoda as secondary option with `cid` parameter
- Fallback: search link when exact hotel match unavailable
- CTAs visually prominent with OTA logos
- All clicks tracked as analytics events
- Disclaimer: "Prices are estimates. Check booking site for current rates."
- Affiliate IDs stored server-side only

---

## 4. Non-Functional Requirements

### Performance
| Metric | Target |
|---|---|
| Landing page LCP | < 2.5s (3G) |
| Generation time | < 30s (7-day) |
| Chat first token | < 2s |
| Map render | < 3s |
| PDF export | < 10s |
| API endpoints (p95) | < 500ms |
| JS bundle | < 200KB gzipped |

### Scalability
| Metric | Target |
|---|---|
| Concurrent generations | 20 |
| Concurrent browsers | 1,000+ |
| Monthly generations | 50,000+ |

### SEO
- All Core Web Vitals green
- Unique title + description per page
- Canonical URLs on all pages
- robots.txt: allow public, block /api/ and /dashboard/
- JSON-LD structured data

### Security
- API keys in env vars only (never client-side except Mapbox + Supabase anon key)
- Google API calls server-side only (proxied)
- Rate limiting on all endpoints (Upstash)
- Supabase RLS on all tables
- Input validation via Zod on all API routes
- HTTPS enforced (Vercel + Cloudflare)
- Session cookies: httpOnly, secure flag

---

## 5. Database Schema

### profiles
```sql
id              UUID PK (references auth.users)
display_name    TEXT
avatar_url      TEXT
preferred_currency TEXT DEFAULT 'USD'
locale          TEXT DEFAULT 'en'
country         TEXT
is_admin        BOOLEAN DEFAULT false
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

### itineraries
```sql
id              UUID PK
user_id         UUID FK → profiles (nullable, for anonymous)
session_id      TEXT (anonymous session tracking)
preferences     JSONB NOT NULL (onboarding form data)
itinerary       JSONB NOT NULL (full itinerary JSON)
title           TEXT NOT NULL
summary         TEXT
duration_days   INT NOT NULL (1-21)
budget_tier     TEXT NOT NULL ('budget'|'mid_range'|'luxury')
interests       TEXT[]
currency        TEXT DEFAULT 'USD'
total_cost      NUMERIC(12,2)
share_slug      TEXT UNIQUE
is_shared       BOOLEAN DEFAULT false
user_type       TEXT NOT NULL ('foreign'|'local')
generation_model TEXT DEFAULT 'gpt-4o'
generation_time_ms INT
refinement_count INT DEFAULT 0
view_count      INT DEFAULT 0
is_deleted      BOOLEAN DEFAULT false
deleted_at      TIMESTAMPTZ
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

### chat_messages
```sql
id              UUID PK
itinerary_id    UUID FK → itineraries
role            TEXT ('user'|'assistant')
content         TEXT NOT NULL
metadata        JSONB
created_at      TIMESTAMPTZ
```

### prebuilt_itineraries
```sql
id              UUID PK
slug            TEXT UNIQUE NOT NULL
title           TEXT NOT NULL
description     TEXT NOT NULL
seo_title       TEXT NOT NULL
seo_description TEXT NOT NULL
duration_days   INT NOT NULL
budget_tier     TEXT NOT NULL
interests       TEXT[]
audience        TEXT DEFAULT 'both' ('foreign'|'local'|'both')
itinerary       JSONB NOT NULL
hero_image_url  TEXT
og_image_url    TEXT
is_published    BOOLEAN DEFAULT false
view_count      INT DEFAULT 0
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

### analytics_events
```sql
id              UUID PK
event_type      TEXT NOT NULL
itinerary_id    UUID FK → itineraries (nullable)
user_id         UUID FK → profiles (nullable)
session_id      TEXT
metadata        JSONB
user_agent      TEXT
country         TEXT
referrer        TEXT
created_at      TIMESTAMPTZ
```

---

## 6. API Endpoints

| Method | Route | Auth | Rate Limit | Response |
|---|---|---|---|---|
| POST | /api/itinerary/generate | Optional | 3/10min anon, 10/10min auth | SSE stream |
| POST | /api/itinerary/refine | Optional | 10/itinerary anon, unlimited auth | SSE stream |
| GET | /api/itinerary/[id] | Owner or shared | 60/min/IP | JSON |
| PATCH | /api/itinerary/[id] | Owner | 30/min | JSON |
| DELETE | /api/itinerary/[id] | Owner | 10/min | JSON |
| POST | /api/itinerary/[id]/share | Owner | 10/min | JSON { slug } |
| POST | /api/export/pdf | Optional | 5/min | PDF file |
| GET | /api/places/search | Server-only | 100/min (cached) | JSON |
| GET | /api/directions | Server-only | 100/min (cached) | JSON |
| GET | /api/currency/rates | Public | 10/min | JSON |
| POST | /api/analytics/event | Public | 100/min | 204 |

### SSE Event Format (Generation)
```
event: status
data: {"phase": "searching", "message": "Finding the best spots..."}

event: complete
data: {"itinerary_id": "uuid", "itinerary": {/* JSON */}, "generation_time_ms": 18500}

event: error
data: {"code": "GENERATION_FAILED", "message": "...", "retry": true}
```

### SSE Event Format (Refinement)
```
event: token
data: {"content": "Great idea! I'll add..."}

event: delta
data: {"changed_days": [4, 5], "updated_days": [{/* Day JSON */}], "updated_total_cost": {...}}

event: complete
data: {"refinement_number": 3}
```

---

## 7. Itinerary JSON Schema (TypeScript/Zod)

```typescript
interface Itinerary {
  id: string;
  title: string;
  summary: string;
  total_days: number;
  start_date?: string;
  end_date?: string;
  total_cost: CostEstimate;
  currency: 'USD' | 'EUR' | 'GBP' | 'AUD' | 'INR' | 'LKR';
  days: ItineraryDay[];
  packing_tips: string[];
  important_notes: string[];
  advance_bookings: AdvanceBooking[];
}

interface ItineraryDay {
  day_number: number;
  date?: string;
  title: string;
  region: string;
  activities: Activity[];
  accommodation: Accommodation;
  transport?: Transport;
  daily_cost: CostEstimate;
  pro_tip: string;
}

interface Activity {
  id: string;
  time: string;                     // "HH:MM"
  type: 'attraction' | 'meal' | 'experience' | 'transport' | 'rest';
  name: string;
  description: string;
  duration_minutes: number;
  cost_estimate: CostEstimate;
  tip?: string;
  coordinates: { lat: number; lng: number };
  google_place_id?: string;
  photo_url?: string;
  rating?: number;                  // 0-5
}

interface Accommodation {
  name: string;
  tier: 'budget' | 'mid_range' | 'luxury';
  cost_per_night: CostEstimate;
  coordinates: { lat: number; lng: number };
  google_place_id?: string;
  photo_url?: string;
  rating?: number;
  booking_url?: string;
  agoda_url?: string;
}

interface Transport {
  from: string;
  to: string;
  mode: 'drive' | 'taxi' | 'tuk_tuk' | 'train' | 'bus' | 'flight' | 'walk';
  duration_minutes: number;
  distance_km?: number;
  cost_estimate: CostEstimate;
  note?: string;
  scenic_route?: boolean;
}

interface CostEstimate {
  amount: number;
  currency: string;
}

interface AdvanceBooking {
  item: string;
  days_ahead: number;
  booking_url?: string;
  note: string;
}
```

**Coordinate bounds validation:** lat 5.9-9.9, lng 79.5-81.9 (Sri Lanka bounding box)

---

## 8. Analytics Events

| Event | Key Metadata | Trigger |
|---|---|---|
| onboarding_started | user_type, referrer | Form begins |
| onboarding_completed | user_type, duration, budget, interests | Form submitted |
| itinerary_generated | itinerary_id, duration, time_ms, model | Generation success |
| generation_failed | error_type, preferences | Generation failure |
| refinement_sent | itinerary_id, message_length, refinement_number | Chat message sent |
| booking_link_clicked | itinerary_id, provider, hotel, destination, tier | Booking CTA click |
| itinerary_shared | itinerary_id, share_method | Share action |
| pdf_exported | itinerary_id | PDF download |
| account_created | auth_method, had_session_itineraries | Signup |
| explore_viewed | filters | /explore visited |
| prebuilt_customized | slug | "Customize" clicked |
| currency_changed | from, to | Currency toggled |
| free_limit_hit | count, session_id | Anonymous cap reached |

---

## 9. External API Configuration

### Google Places API (New)
- **Endpoint:** `https://places.googleapis.com/v1/places:searchText`
- **Auth:** API key in `X-Goog-Api-Key` header
- **Cache:** Redis 24h TTL, key: `places:{md5(query+location+type)}`
- **Cost:** $0.032/request, $200/month free credit

### Google Directions API
- **Endpoint:** `https://maps.googleapis.com/maps/api/directions/json`
- **Auth:** API key in query param
- **Cache:** Redis 24h TTL, key: `directions:{md5(origin+dest+mode)}`
- **Cost:** $0.005/request, included in $200 credit

### Booking.com Affiliate Links
- **Format:** `https://www.booking.com/hotel/lk/{slug}.html?aid={AFFILIATE_ID}&checkin={date}&checkout={date}&group_adults={n}`
- **Fallback:** `https://www.booking.com/searchresults.html?aid={AFFILIATE_ID}&ss={destination}&nflt=price%3D{range}`

### Mapbox
- **Token:** Client-side, domain-restricted to ceylonaire.com
- **Free tier:** 50,000 map loads/month
- **Style:** Custom Ceylonaire theme (fork of Mapbox Outdoors)
