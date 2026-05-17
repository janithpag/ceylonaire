-- ============================================================
-- Ceylonaire Initial Schema Migration
-- 001_initial_schema.sql
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLES
-- ============================================================

-- profiles: extends auth.users
CREATE TABLE public.profiles (
  id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name     TEXT,
  avatar_url       TEXT,
  preferred_currency TEXT NOT NULL DEFAULT 'USD',
  locale           TEXT NOT NULL DEFAULT 'en',
  country          TEXT,
  is_admin         BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- itineraries
CREATE TABLE public.itineraries (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id          TEXT,
  preferences         JSONB NOT NULL,
  itinerary           JSONB NOT NULL,
  title               TEXT NOT NULL,
  summary             TEXT,
  duration_days       INT NOT NULL CHECK (duration_days BETWEEN 1 AND 21),
  budget_tier         TEXT NOT NULL CHECK (budget_tier IN ('budget', 'mid_range', 'luxury')),
  interests           TEXT[],
  currency            TEXT NOT NULL DEFAULT 'USD',
  total_cost          NUMERIC(12, 2),
  share_slug          TEXT UNIQUE,
  is_shared           BOOLEAN NOT NULL DEFAULT false,
  user_type           TEXT NOT NULL CHECK (user_type IN ('foreign', 'local')),
  generation_model    TEXT NOT NULL DEFAULT 'gpt-4o',
  generation_time_ms  INT,
  refinement_count    INT NOT NULL DEFAULT 0,
  view_count          INT NOT NULL DEFAULT 0,
  is_deleted          BOOLEAN NOT NULL DEFAULT false,
  deleted_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- chat_messages
CREATE TABLE public.chat_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id    UUID NOT NULL REFERENCES public.itineraries(id) ON DELETE CASCADE,
  role            TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content         TEXT NOT NULL,
  metadata        JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- prebuilt_itineraries
CREATE TABLE public.prebuilt_itineraries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  seo_title       TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  duration_days   INT NOT NULL,
  budget_tier     TEXT NOT NULL CHECK (budget_tier IN ('budget', 'mid_range', 'luxury')),
  interests       TEXT[],
  audience        TEXT NOT NULL DEFAULT 'both' CHECK (audience IN ('foreign', 'local', 'both')),
  itinerary       JSONB NOT NULL,
  hero_image_url  TEXT,
  og_image_url    TEXT,
  is_published    BOOLEAN NOT NULL DEFAULT false,
  view_count      INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- analytics_events
CREATE TABLE public.analytics_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type      TEXT NOT NULL,
  itinerary_id    UUID REFERENCES public.itineraries(id) ON DELETE SET NULL,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id      TEXT,
  metadata        JSONB,
  user_agent      TEXT,
  country         TEXT,
  referrer        TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_itineraries_user_id ON public.itineraries(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_itineraries_session_id ON public.itineraries(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX idx_itineraries_share_slug ON public.itineraries(share_slug) WHERE share_slug IS NOT NULL;
CREATE INDEX idx_itineraries_is_deleted ON public.itineraries(is_deleted);
CREATE INDEX idx_chat_messages_itinerary_id ON public.chat_messages(itinerary_id);
CREATE INDEX idx_prebuilt_itineraries_slug ON public.prebuilt_itineraries(slug);
CREATE INDEX idx_prebuilt_itineraries_is_published ON public.prebuilt_itineraries(is_published);
CREATE INDEX idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_analytics_events_session_id ON public.analytics_events(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);

-- ============================================================
-- TRIGGER FUNCTION: auto-create profile on signup
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TRIGGER: updated_at auto-update
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_itineraries_updated_at
  BEFORE UPDATE ON public.itineraries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_prebuilt_itineraries_updated_at
  BEFORE UPDATE ON public.prebuilt_itineraries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prebuilt_itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- ---- profiles policies ----

-- Users can read their own profile
CREATE POLICY "profiles: owner read"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "profiles: owner update"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role can do anything (for admin operations)
-- (service role bypasses RLS by default — no policy needed)

-- ---- itineraries policies ----

-- Authenticated users can read their own non-deleted itineraries
CREATE POLICY "itineraries: owner read"
  ON public.itineraries FOR SELECT
  USING (
    (auth.uid() = user_id AND is_deleted = false)
    OR (is_shared = true AND is_deleted = false)
  );

-- Anonymous: allow reading shared itineraries or own session itineraries
-- (handled via session_id on the API layer; service role used for anon writes)

-- Authenticated users can insert their own itineraries
CREATE POLICY "itineraries: owner insert"
  ON public.itineraries FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Authenticated users can update their own itineraries
CREATE POLICY "itineraries: owner update"
  ON public.itineraries FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can soft-delete their own itineraries
CREATE POLICY "itineraries: owner delete"
  ON public.itineraries FOR DELETE
  USING (auth.uid() = user_id);

-- ---- chat_messages policies ----

-- Users can read chat messages for their own itineraries
CREATE POLICY "chat_messages: owner read"
  ON public.chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.itineraries i
      WHERE i.id = itinerary_id
        AND (i.user_id = auth.uid() OR i.is_shared = true)
        AND i.is_deleted = false
    )
  );

-- Users can insert chat messages for their own itineraries
CREATE POLICY "chat_messages: owner insert"
  ON public.chat_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.itineraries i
      WHERE i.id = itinerary_id
        AND i.user_id = auth.uid()
        AND i.is_deleted = false
    )
  );

-- ---- prebuilt_itineraries policies ----

-- Anyone can read published pre-built itineraries
CREATE POLICY "prebuilt_itineraries: public read"
  ON public.prebuilt_itineraries FOR SELECT
  USING (is_published = true);

-- Admins can manage pre-built itineraries (via service role / is_admin flag)
-- (Service role used in admin scripts — bypasses RLS)

-- ---- analytics_events policies ----

-- Service role inserts analytics (API routes use service role)
-- No SELECT policy for users — analytics is internal only
CREATE POLICY "analytics_events: service insert"
  ON public.analytics_events FOR INSERT
  WITH CHECK (true);
