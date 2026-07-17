// Shared types for the Trend Analytics backend. Both the API routes
// (server) and the dashboard components (client) import these exact
// types, so a shape change breaks the build instead of silently drifting
// out of sync — the same discipline already used for Campaign/
// ProductOpportunity/CustomerProfile and their generate routes.

export type TrendCategory = "Fashion" | "Beauty" | "Cross-Category";
export type TrendStatus = "Emerging" | "Rising" | "Peaking";

export type TrendRecord = {
  id: string;
  slug: string;
  name: string;
  category: TrendCategory;
  status: TrendStatus;
  description: string;
  wikipedia_title: string | null;
};

export type TrendSignalPoint = {
  source: string; // e.g. "wikipedia", "youtube", "reddit"
  metric: string; // e.g. "pageviews", "video_count", "discussion_posts"
  value: number;
  captured_at: string; // ISO timestamp
};

export type TrendSourceCitation = {
  source_type: "press" | "youtube_video" | "reddit_thread" | "wikipedia";
  title: string;
  url: string;
  author_or_channel: string | null;
  published_at: string | null;
};

export type TrendHistoryPoint = {
  captured_at: string; // ISO timestamp (one per day)
  value: number;
};

export type TrendSummary = {
  trend: TrendRecord;
  latestSignals: TrendSignalPoint[];
  // Daily pageview history (real Wikimedia data), oldest → newest,
  // for drawing the trend-over-time line.
  history: TrendHistoryPoint[];
};

export type TrendsResponse = {
  trends: TrendSummary[];
};

export type AggregationRunStatus = "ok" | "partial" | "failed";
