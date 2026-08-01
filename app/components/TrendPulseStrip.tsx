import { getTrendPulseData } from "../lib/trendPulse";

// A condensed read of the live Trend Pulse: the three fastest-moving
// signals over the last 90 days, drawn small enough to sit under the
// trend field without competing with it. The full six-card version this
// replaces lived on the retired Trend Dashboard.
//
// This is an async server component. The home page wraps it in <Suspense>
// so the page paints instantly and this streams in when its data lands.

const FOREST = "#3B5D4A";

function Spark({ series }: { series: { views: number }[] }) {
  const values = series.map((s) => s.views);
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 200;
  const H = 34;

  const line = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * W;
      const y = H - ((v - min) / range) * (H - 5) - 2.5;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="mt-2 h-9 w-full"
      aria-hidden
    >
      <path d={`${line} L ${W} ${H} L 0 ${H} Z`} fill={FOREST} fillOpacity="0.09" />
      <path
        d={line}
        fill="none"
        stroke={FOREST}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-[#2B211C]/10 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
          Live signal &middot; last 90 days
        </p>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#3B5D4A]/25 bg-[#3B5D4A]/[0.08] px-3 py-1 text-[0.56rem] font-bold uppercase tracking-[0.14em] text-[#3B5D4A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3B5D4A]" />
          Wikipedia + GDELT
        </span>
      </div>
      {children}
    </div>
  );
}

export function TrendPulseStripSkeleton() {
  return (
    <Shell>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[5.5rem] animate-pulse rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45"
          />
        ))}
      </div>
    </Shell>
  );
}

export async function TrendPulseStripLive() {
  const data = await getTrendPulseData();
  // Ranked by total attention rather than by rise. A "biggest movers" list
  // reads as a leaderboard of whatever happens to be falling on a quiet
  // week; the most-watched signals are the steadier, truer read.
  const trends = (data?.trends ?? [])
    .slice()
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  // If the live feed is having a moment, say nothing rather than showing a
  // broken row -- the sourced pool above stands on its own.
  if (!data?.ok || trends.length === 0) return null;

  const updated = `${data.updatedAt.slice(0, 4)}-${data.updatedAt.slice(4, 6)}-${data.updatedAt.slice(6, 8)}`;

  return (
    <Shell>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {trends.map((t) => (
          <div
            key={t.slug}
            className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 px-4 py-3"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-sm font-semibold text-[#2B211C]">
                {t.name}
              </p>
              {/* The reading is the level of attention, not the week-over-week
                  wobble. A change badge on a home page turns three healthy
                  signals into a decline leaderboard whenever a topic happens
                  to be resting -- the shape of the curve already tells that
                  story, honestly and without a headline number. */}
              <span className="shrink-0 text-[0.68rem] font-bold tabular-nums text-[#3B5D4A]">
                {t.latest.toLocaleString("en-US")}
              </span>
            </div>
            <Spark series={t.series} />
            <p className="mt-1 text-[0.62rem] text-[#2B211C]/45">
              views / day
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.68rem] leading-5 text-[#2B211C]/40">
        Real daily Wikipedia pageviews and GDELT news coverage &mdash; both
        public, both live. Updated {updated}.
      </p>
    </Shell>
  );
}
