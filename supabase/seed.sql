-- Juju's Studio — seed the trends table with the same 6 real, sourced
-- trends already shown on the live site (see app/trend-dashboard/page.tsx).
--
-- Run this once in Supabase's SQL Editor, after schema.sql. Safe to re-run:
-- "on conflict (slug) do nothing" skips rows that already exist.
--
-- wikipedia_title values were checked against real, existing English
-- Wikipedia articles as of 2026-07-15 (a close conceptual match, not
-- always the exact trend name — e.g. "Tailor" stands in for
-- "Elevated Minimalism"). One trend (mini-trial-size) has no confident
-- article match and is left null; the aggregation job skips trends
-- with a null wikipedia_title rather than guessing.

insert into trends (slug, name, category, status, description, wikipedia_title)
values
  (
    'elevated-minimalism',
    'Elevated Minimalism',
    'Fashion',
    'Peaking',
    'Head-to-toe black tailoring dominated Milan''s Fall 2026 runways, signaling a return to structured power dressing after several seasons of maximalism.',
    'Tailor'
  ),
  (
    'scent-stacking',
    'Scent Stacking',
    'Beauty',
    'Rising',
    'Shoppers are layering multiple fragrances to build a personal, bespoke scent instead of committing to one signature perfume.',
    'Perfume'
  ),
  (
    'blurred-lips',
    'Blurred Lips',
    'Beauty',
    'Peaking',
    'Soft-focus, diffused lip color is replacing sharp liner looks, with related search interest up roughly 300%.',
    'Lip gloss'
  ),
  (
    'playful-tights',
    'Playful Tights',
    'Fashion',
    'Emerging',
    'Tights moved from an afterthought to a styling tool for fall 2026, with pattern and color used as an easy way to refresh an existing outfit.',
    'Tights'
  ),
  (
    'mini-trial-size-everything',
    'Mini & Trial-Size Everything',
    'Cross-Category',
    'Rising',
    'Shoppers across beauty and fashion are gravitating toward mini formats and trial sizes as a low-commitment way to test a product or trend.',
    null
  ),
  (
    'french-hair-accessories',
    'French Hair Accessories',
    'Cross-Category',
    'Emerging',
    'Search interest in Parisian-style hair pins and combs is up over 1,000% as polished, editorial hair styling becomes a fast way to elevate an outfit.',
    'Hair clip'
  )
on conflict (slug) do nothing;
