import {
  getTrendPulseData,
  type TrendPulse as TrendPulseItem,
  type TrendPulseResponse
} from "../lib/trendPulse";

const FOREST = "#3B5D4A";

// Async server component: fetches (cached) data and renders. Wrapped in a
// <Suspense> in the page so the rest of the studio shows instantly and this
// section streams in on its own the moment its data is ready.
export async function TrendPulseLive() {
  const data = await getTrendPulseData();
  return <TrendPulse data={data} />;
}

// Instant placeholder shown while the pulse data streams in. Same shell as
// the real panel so the layout doesn't jump.
export function TrendPulseSkeleton() {
  return (
    <div className="rounded-[2.1rem] border border-[#2B211C]/10 bg-[#EFE7DA]/50 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-editorial text-2xl text-[#2B211C] md:text-3xl">
            Trend Pulse
          </h2>
          <p className="mt-1 text-sm text-[#2B211C]/60">
            Real search interest and news coverage over the last 90 days.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#3B5D4A]/30 bg-[#3B5D4A]/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#3B5D4A]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3B5D4A]" />
          Live · Wikipedia + News
        </span>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-[1.35rem] border border-[#3B5D4A]/25 bg-[#3B5D4A]/[0.07] px-5 py-4">
        <span
          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-[#3B5D4A]/25 border-t-[#3B5D4A]"
          aria-hidden
        />
        <div>
          <p className="text-sm font-semibold text-[#2B211C]">
            Pulling real data&hellip;
          </p>
          <p className="text-xs text-[#2B211C]/60">
            Fetching live search interest and news coverage for your trends.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-44 animate-pulse rounded-[1.35rem] border border-[#2B211C]/10 bg-white/40"
          />
        ))}
      </div>
    </div>
  );
}

function Sparkline({ series }: { series: { date: string; views: number }[] }) {
  const values = series.map((s) => s.views);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 300;
  const H = 64;
  const n = values.length;

  const points = values.map((v, i) => {
    const x = n > 1 ? (i / (n - 1)) * W : 0;
    const y = H - ((v - min) / range) * (H - 8) - 4;
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-16 w-full">
      <path d={area} fill={FOREST} fillOpacity="0.1" />
      <path d={line} fill="none" stroke={FOREST} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ChangeBadge({ pct }: { pct: number }) {
  const up = pct >= 0;
  return (
    <span className={`text-xs font-bold ${up ? "text-[#3B5D4A]" : "text-[#9C8F84]"}`}>
      {up ? "▲" : "▼"} {up ? "+" : ""}
      {pct}%
    </span>
  );
}

function StatTile({
  label,
  value,
  sub
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-[1.35rem] border border-[#2B211C]/10 bg-white/55 p-5">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#9C8F84]">
        {label}
      </p>
      <p className="mt-1.5 font-editorial text-2xl leading-tight text-[#2B211C]">
        {value}
      </p>
      {sub ? <p className="mt-1 text-xs text-[#2B211C]/55">{sub}</p> : null}
    </div>
  );
}

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

export function TrendPulse({ data }: { data: TrendPulseResponse }) {
  const trends = data?.trends ?? [];
  const biggestRiser =
    trends.slice().sort((a, b) => b.changePct - a.changePct)[0] ?? null;
  const mostAttention =
    trends.slice().sort((a, b) => b.total - a.total)[0] ?? null;

  return (
    <div className="rounded-[2.1rem] border border-[#2B211C]/10 bg-[#EFE7DA]/50 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-editorial text-2xl text-[#2B211C] md:text-3xl">
            Trend Pulse
          </h2>
          <p className="mt-1 text-sm text-[#2B211C]/60">
            Real search interest and news coverage over the last 90 days.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#3B5D4A]/30 bg-[#3B5D4A]/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#3B5D4A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3B5D4A]" />
          Live · Wikipedia + News
        </span>
      </div>

      {!data?.ok || trends.length === 0 ? (
        <div className="mt-6 rounded-[1.35rem] border border-[#2B211C]/10 bg-white/55 p-5 text-sm text-[#2B211C]/70">
          Live trend data is refreshing &mdash; check back in a moment.
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {biggestRiser && (
              <StatTile
                label="Biggest Riser"
                value={biggestRiser.name}
                sub={`${biggestRiser.changePct >= 0 ? "+" : ""}${biggestRiser.changePct}% over 90 days`}
              />
            )}
            {mostAttention && (
              <StatTile
                label="Most Attention"
                value={mostAttention.name}
                sub={`${fmt(mostAttention.total)} views tracked`}
              />
            )}
            <StatTile
              label="Trends Tracked"
              value={String(trends.length)}
              sub="Live signals, refreshed daily"
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trends.map((t: TrendPulseItem) => (
              <div
                key={t.slug}
                className="rounded-[1.35rem] border border-[#2B211C]/10 bg-white/55 p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#9C8F84]">
                      {t.category}
                    </p>
                    <p className="font-editorial text-lg leading-tight text-[#2B211C]">
                      {t.name}
                    </p>
                  </div>
                  <ChangeBadge pct={t.changePct} />
                </div>
                <div className="mt-3">
                  <p className="mb-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#9C8F84]">
                    Search interest
                  </p>
                  <Sparkline series={t.series} />
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xs text-[#2B211C]/55">
                    {fmt(t.latest)} views / day
                  </span>
                  <span className="text-[0.62rem] uppercase tracking-[0.12em] text-[#2B211C]/40">
                    90-day
                  </span>
                </div>

                {t.media && t.media.series.length > 2 && (
                  <div className="mt-4 border-t border-[#2B211C]/10 pt-3">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#9C8F84]">
                        Media coverage
                      </p>
                      <ChangeBadge pct={t.media.changePct} />
                    </div>
                    <Sparkline series={t.media.series} />
                    <p className="mt-1 text-[0.62rem] uppercase tracking-[0.12em] text-[#2B211C]/40">
                      News buzz · GDELT
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-[#2B211C]/45">
            Sources: real daily Wikipedia pageviews (search interest) and GDELT
            global news coverage (media buzz), both public and free. Updated{" "}
            {data.updatedAt.slice(0, 4)}-{data.updatedAt.slice(4, 6)}-
            {data.updatedAt.slice(6, 8)}.
          </p>
        </>
      )}
    </div>
  );
}
