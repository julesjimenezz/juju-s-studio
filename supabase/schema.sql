-- Juju's Studio — Trend Analytics schema
--
-- Run this once in Supabase's SQL Editor (Supabase dashboard -> SQL Editor ->
-- New query -> paste this whole file -> Run) after creating a new Supabase
-- project. Safe to re-run: every statement is guarded with "if not exists".

create extension if not exists "pgcrypto";

-- The canonical list of tracked trends. Seeded with the same 6 real,
-- sourced trends already shown on the live site (see seed.sql).
create table if not exists trends (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('Fashion', 'Beauty', 'Cross-Category')),
  status text not null check (status in ('Emerging', 'Rising', 'Peaking')),
  description text not null,
  -- Optional: the English Wikipedia article title used to pull real,
  -- keyless pageview data for this trend (e.g. "Tailoring", "Perfume").
  -- Null is fine if no good article match exists yet.
  wikipedia_title text,
  created_at timestamptz not null default now()
);

-- Append-only time series: one row = one real measurement of one metric
-- for one trend at one point in time. Never overwritten, only added to —
-- this is what makes "trend over time" charts possible without a
-- future schema change.
create table if not exists trend_signals (
  id uuid primary key default gen_random_uuid(),
  trend_id uuid not null references trends(id) on delete cascade,
  source text not null,        -- e.g. 'wikipedia', 'youtube', 'reddit'
  metric text not null,        -- e.g. 'pageviews', 'video_count'
  value numeric not null,
  captured_at timestamptz not null default now(),
  raw jsonb                    -- the raw source payload, for auditability
);
create index if not exists trend_signals_trend_id_idx on trend_signals(trend_id);
create index if not exists trend_signals_captured_at_idx on trend_signals(captured_at);
-- One point per (trend, source, metric, day) — lets the aggregation job
-- re-run safely and backfill history without creating duplicate rows
-- (the job upserts on these four columns).
create unique index if not exists trend_signals_unique_point
  on trend_signals(trend_id, source, metric, captured_at);

-- Real, linkable citations backing the "why is this trending" story and
-- the "who's talking about this" panel (real press / real videos / real
-- discussion threads — never a fabricated influencer).
create table if not exists trend_sources (
  id uuid primary key default gen_random_uuid(),
  trend_id uuid not null references trends(id) on delete cascade,
  source_type text not null,   -- 'press' | 'youtube_video' | 'reddit_thread' | 'wikipedia'
  title text not null,
  url text not null,
  author_or_channel text,
  published_at timestamptz,
  captured_at timestamptz not null default now()
);
create index if not exists trend_sources_trend_id_idx on trend_sources(trend_id);

-- A simple health log: one row per scheduled aggregation attempt, so
-- "did today's data actually refresh?" is answerable at a glance
-- (in the Supabase table viewer) without guesswork.
create table if not exists aggregation_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  source text not null,
  status text not null check (status in ('ok', 'partial', 'failed')),
  notes text
);
