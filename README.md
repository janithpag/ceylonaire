# Ceylonaire

AI-powered Sri Lanka travel itinerary platform. Plan your perfect Sri Lanka trip with Ceyla, your AI travel companion.

**Domain:** ceylonaire.com  
**Product by:** IntellaNext (Pvt) Ltd

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **UI:** React 19 + Tailwind CSS 4 + shadcn/ui
- **AI:** Vercel AI SDK + OpenAI GPT-4o + Anthropic Claude Sonnet 4
- **Maps:** Mapbox GL JS + react-map-gl
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Cache:** Upstash Redis

## Setup

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/intellanext/ceylonaire.git
cd ceylonaire

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Fill in your API keys in .env.local

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Development

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # Biome lint check
npm run lint:fix   # Auto-fix lint issues
npm run test       # Run unit tests (Vitest)
npm run test:e2e   # Run E2E tests (Playwright)
npm run db:migrate # Run Supabase migrations
npm run db:generate # Generate TypeScript types from Supabase schema
```

## Project Structure

See `CLAUDE.md` for full project structure and development context.

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values. See `CLAUDE.md` for descriptions.

## License

Private — IntellaNext (Pvt) Ltd
