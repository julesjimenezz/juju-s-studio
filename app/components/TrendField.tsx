"use client";

import { useState } from "react";

// The whole upcoming-trend pool, drawn as one quiet field of dots.
//
// The point of this chart is honesty at a glance: every dot is one real,
// sourced forecast in app/lib/trendPool.ts, so the density IS the claim.
// Momentum is encoded as ink weight rather than a second colour -- one
// hue, three strengths -- so a hundred marks still read as calm.
//
// The heavy PoolTrend records stay on the server; the page passes down
// only these five fields, which keeps the client bundle small.
export type FieldDot = {
  id: string;
  name: string;
  category: "fashion" | "beauty" | "culture";
  trajectory: "emerging" | "rising" | "peaking-next-year";
  source: string;
};

const ROWS: { key: FieldDot["category"]; label: string }[] = [
  { key: "fashion", label: "Fashion" },
  { key: "beauty", label: "Beauty" },
  { key: "culture", label: "Culture" }
];

const TRAJECTORIES: FieldDot["trajectory"][] = [
  "emerging",
  "rising",
  "peaking-next-year"
];

const TRAJECTORY_LABEL: Record<FieldDot["trajectory"], string> = {
  emerging: "Emerging",
  rising: "Rising",
  "peaking-next-year": "Peaking next year"
};

const DOT_STYLE: Record<FieldDot["trajectory"], string> = {
  emerging: "border border-[#3B5D4A]/55",
  rising: "bg-[#3B5D4A]/45",
  "peaking-next-year": "bg-[#3B5D4A]"
};

export function TrendField({ dots }: { dots: FieldDot[] }) {
  const [active, setActive] = useState<FieldDot | null>(null);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#9C8F84]">
        {TRAJECTORIES.map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${DOT_STYLE[t]}`} />
            {TRAJECTORY_LABEL[t]}
          </span>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-7">
        {ROWS.map((row) => {
          const rowDots = dots.filter((d) => d.category === row.key);
          return (
            <div key={row.key}>
              <div className="mb-3 flex items-center gap-3">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#2B211C]/65">
                  {row.label}
                </p>
                <span className="h-px flex-1 bg-[#2B211C]/12" />
                <p className="text-[0.66rem] font-bold text-[#2B211C]/45">
                  {rowDots.length}
                </p>
              </div>
              <div className="flex flex-wrap gap-[9px]">
                {rowDots.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    aria-label={`${d.name} — ${TRAJECTORY_LABEL[d.trajectory]}, source ${d.source}`}
                    onMouseEnter={() => setActive(d)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(d)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(d)}
                    className={`h-3 w-3 rounded-full transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5D4A]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFE7DA] hover:scale-[1.45] ${DOT_STYLE[d.trajectory]} ${active?.id === d.id ? "scale-[1.45]" : ""}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fixed-height readout: the caption swaps on hover without the panel
          jumping a line taller underneath the cursor. */}
      <div className="mt-7 min-h-[3.25rem] border-t border-[#2B211C]/10 pt-4">
        {active ? (
          <>
            <p className="font-editorial text-lg leading-tight text-[#2B211C] md:text-xl">
              {active.name}
            </p>
            <p className="mt-1 text-xs text-[#2B211C]/55">
              {TRAJECTORY_LABEL[active.trajectory]} &middot; {active.source}
            </p>
          </>
        ) : (
          <p className="text-xs text-[#2B211C]/45">
            Hover any dot to see the trend and where it came from.
          </p>
        )}
      </div>
    </div>
  );
}
