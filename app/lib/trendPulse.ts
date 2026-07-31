// Shared server-side data for the live Trend Pulse strip.
//
// Fetches real, free, public signals for each tracked trend:
//   • Wikipedia pageviews  → search interest
//   • GDELT news coverage  → media buzz
//
// Both fetches use Next.js caching (`revalidate`), so the data is fetched
// at most every few hours and otherwise served instantly from cache. The
// home page calls this on the server and bakes the result into the HTML
// — so the strip shows up warm, and refreshes itself in the background.
// No database, no keys, no setup.

const WIKI_USER_AGENT =
  "JujusStudio/1.0 (https://juju-s-studio.vercel.app; contact: julesjimenez04@gmail.com) trend-index";

const DAYS = 90;
const REVALIDATE = 21600; // 6 hours

const TRENDS: {
  slug: string;
  name: string;
  category: "Fashion" | "Beauty" | "Cross-Category";
  momentum: "Emerging" | "Rising" | "Peaking";
  wikipediaTitle: string | null;
  mediaQuery: string;
}[] = [
  { slug: "elevated-minimalism", name: "Elevated Minimalism", category: "Fashion", momentum: "Peaking", wikipediaTitle: "Tailor", mediaQuery: "quiet luxury" },
  { slug: "scent-stacking", name: "Scent Stacking", category: "Beauty", momentum: "Rising", wikipediaTitle: "Perfume", mediaQuery: "perfume" },
  { slug: "blurred-lips", name: "Blurred Lips", category: "Beauty", momentum: "Peaking", wikipediaTitle: "Lip gloss", mediaQuery: "lipstick" },
  { slug: "playful-tights", name: "Playful Tights", category: "Fashion", momentum: "Emerging", wikipediaTitle: "Tights", mediaQuery: "tights" },
  { slug: "mini-trial-size-everything", name: "Mini & Trial-Size Everything", category: "Cross-Category", momentum: "Rising", wikipediaTitle: "Product sample", mediaQuery: "travel size" },
  { slug: "french-hair-accessories", name: "French Hair Accessories", category: "Cross-Category", momentum: "Emerging", wikipediaTitle: "Hair clip", mediaQuery: "hair accessories" }
];

export type TrendPulsePoint = { date: string; views: number };
export type MediaSeries = {
  series: TrendPulsePoint[];
  changePct: number;
} | null;
export type TrendPulse = {
  slug: string;
  name: string;
  category: string;
  momentum: string;
  series: TrendPulsePoint[];
  latest: number;
  total: number;
  changePct: number;
  source: string;
  media: MediaSeries;
};
export type TrendPulseResponse = {
  trends: TrendPulse[];
  updatedAt: string;
  ok: boolean;
};

function yyyymmdd(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}
function isoDay(ts: string): string {
  return `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}`;
}
function mean(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

// Bound how long we'll wait on a source. If it's slow, we return a fallback
// (the request keeps running in the background and warms the cache for next
// time) so a sluggish source never delays the dashboard.
function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))
  ]);
}

async function fetchMedia(query: string): Promise<MediaSeries> {
  try {
    const q = encodeURIComponent(`"${query}"`);
    const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${q}&mode=timelinevol&format=json&timespan=3m`;
    const res = await fetch(url, {
      headers: { "User-Agent": WIKI_USER_AGENT },
      next: { revalidate: REVALIDATE }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const line = Array.isArray(data.timeline) ? data.timeline[0] : null;
    const pts: { date?: string; value?: number }[] =
      line && Array.isArray(line.data) ? line.data : [];
    const series: TrendPulsePoint[] = pts
      .filter((p) => p.date && typeof p.value === "number")
      .map((p) => {
        const d = p.date as string;
        return { date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`, views: p.value as number };
      });
    if (series.length < 3) return null;
    const values = series.map((s) => s.views);
    const chunk = Math.max(1, Math.floor(values.length / 3));
    const first = mean(values.slice(0, chunk));
    const last = mean(values.slice(-chunk));
    const changePct = first > 0 ? Math.round(((last - first) / first) * 100) : 0;
    return { series, changePct };
  } catch {
    return null;
  }
}

async function fetchTrend(
  t: (typeof TRENDS)[number],
  start: string,
  end: string
): Promise<TrendPulse | null> {
  if (!t.wikipediaTitle) return null;
  try {
    const article = encodeURIComponent(t.wikipediaTitle.replace(/ /g, "_"));
    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${article}/daily/${start}/${end}`;
    const [res, media] = await Promise.all([
      fetch(url, {
        headers: { "User-Agent": WIKI_USER_AGENT },
        next: { revalidate: REVALIDATE }
      }),
      // News is the slower source — cap it at 7s so it can't stall the page.
      withTimeout(fetchMedia(t.mediaQuery), 7000, null)
    ]);
    if (!res.ok) return null;
    const data = await res.json();
    const items: { timestamp?: string; views?: number }[] = Array.isArray(
      data.items
    )
      ? data.items
      : [];
    const series: TrendPulsePoint[] = items
      .filter((i) => i.timestamp && typeof i.views === "number")
      .map((i) => ({ date: isoDay(i.timestamp as string), views: i.views as number }));
    if (series.length === 0) return null;

    const values = series.map((s) => s.views);
    const latest = values[values.length - 1];
    const total = values.reduce((a, b) => a + b, 0);
    const first30 = mean(values.slice(0, 30));
    const last30 = mean(values.slice(-30));
    const changePct = first30 > 0 ? ((last30 - first30) / first30) * 100 : 0;

    return {
      slug: t.slug,
      name: t.name,
      category: t.category,
      momentum: t.momentum,
      series,
      latest,
      total,
      changePct: Math.round(changePct),
      source: `Wikipedia pageviews · ${t.wikipediaTitle}`,
      media
    };
  } catch {
    return null;
  }
}

export async function getTrendPulseData(): Promise<TrendPulseResponse> {
  const today = new Date();
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - DAYS);
  const startStr = yyyymmdd(start);
  const endStr = yyyymmdd(today);

  const results = await Promise.all(
    // Each trend is capped at 9s total so one slow source can't hold up the set.
    TRENDS.map((t) => withTimeout(fetchTrend(t, startStr, endStr), 9000, null))
  );
  const trends = results.filter((r): r is TrendPulse => r !== null);

  return {
    trends,
    updatedAt: endStr,
    ok: trends.length > 0
  };
}
