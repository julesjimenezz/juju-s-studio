// A compact, on-brand analytics dashboard rendered from the AI's own
// quantified strategic assessment. Everything here is hand-built SVG/CSS —
// no charting dependency — so it works without any new npm install.
//
// Design notes (per the dataviz method): the brand palette is deliberately
// muted, so multi-color categorical charts read as gray and fail contrast.
// The honest, readable translation is single-hue magnitude marks (forest
// gauges + bars) with a direct label on every value, so nothing relies on
// color alone. These numbers are the AI's ESTIMATES, labeled as such.

export type StrategyAnalytics = {
  momentum: number;
  opportunityScore: number;
  audienceFit: string;
  primaryChannel: string;
  launchWindow: string;
  channelPriority: { channel: string; weight: number }[];
  audienceSegments: { label: string; share: number }[];
};

const FOREST = "#3B5D4A";

function Gauge({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const r = 62;
  const cx = 80;
  const cy = 78;
  // Semicircle from left (180°) to right (0°), drawn over the top.
  const arcLength = Math.PI * r;
  const track = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  return (
    <div className="flex flex-col items-center rounded-[1.35rem] border border-[#2B211C]/10 bg-white/50 p-5">
      <svg viewBox="0 0 160 92" className="w-full max-w-[190px]" role="img" aria-label={`${label}: ${value} out of 100`}>
        <path
          d={track}
          fill="none"
          stroke="#2B211C"
          strokeOpacity="0.1"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d={track}
          fill="none"
          stroke={FOREST}
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={`${pct * arcLength} ${arcLength}`}
        />
        <text
          x="80"
          y="74"
          textAnchor="middle"
          className="font-editorial"
          fontSize="30"
          fill="#2B211C"
        >
          {value}
        </text>
      </svg>
      <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#9C8F84]">
        {label}
      </p>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/50 p-4">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#9C8F84]">
        {label}
      </p>
      <p className="mt-1.5 font-editorial text-xl leading-tight text-[#2B211C]">
        {value}
      </p>
    </div>
  );
}

function BarList({
  title,
  rows
}: {
  title: string;
  rows: { label: string; value: number }[];
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="rounded-[1.35rem] border border-[#2B211C]/10 bg-white/50 p-5">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
        {title}
      </p>
      <div className="mt-4 flex flex-col gap-3.5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-[#2B211C]">
                {row.label}
              </span>
              <span className="text-xs font-bold text-[#3B5D4A]">
                {row.value}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#2B211C]/8">
              <div
                className="h-full rounded-full bg-[#3B5D4A]"
                style={{ width: `${(row.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StrategyAnalyticsPanel({
  analytics
}: {
  analytics: StrategyAnalytics;
}) {
  return (
    <div className="mt-6 rounded-[2.1rem] border border-[#2B211C]/10 bg-[#EFE7DA]/50 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-editorial text-2xl text-[#2B211C]">
          Strategy Analytics
        </h3>
        <span className="rounded-full border border-[#3B5D4A]/30 bg-[#3B5D4A]/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#3B5D4A]">
          AI analysis
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-xs leading-5 text-[#2B211C]/55">
        How Juju&rsquo;s Studio scores this campaign&rsquo;s momentum,
        opportunity, and channel mix.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Gauge label="Trend Momentum" value={analytics.momentum} />
        <Gauge label="Opportunity Score" value={analytics.opportunityScore} />
        <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
          <StatTile label="Primary Channel" value={analytics.primaryChannel} />
          <StatTile label="Launch Window" value={analytics.launchWindow} />
          <StatTile label="Audience Fit" value={analytics.audienceFit} />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <BarList
          title="Channel Priority"
          rows={analytics.channelPriority.map((c) => ({
            label: c.channel,
            value: c.weight
          }))}
        />
        <BarList
          title="Audience Segments (%)"
          rows={analytics.audienceSegments.map((s) => ({
            label: s.label,
            value: s.share
          }))}
        />
      </div>
    </div>
  );
}
