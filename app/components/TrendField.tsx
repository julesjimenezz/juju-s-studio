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

// Left to right, each band runs faintest to strongest. Unsorted, a hundred
// mixed dots read as noise; ordered, the same marks become a ramp you can
// read without a key -- how much of this category is already arriving.
const TRAJECTORY_ORDER: Record<FieldDot["trajectory"], number> = {
  emerging: 0,
  rising: 1,
  "peaking-next-year": 2
};

// A fixed column count rather than free wrapping, so all three bands share
// the same column positions and the field lines up as a matrix. 41 is the
// largest band (Beauty), so at full width it fills edge to edge and the
// shorter bands read as honestly shorter instead of raggedly aligned.
const GRID =
  "grid-cols-[repeat(14,minmax(0,1fr))] sm:grid-cols-[repeat(21,minmax(0,1fr))] lg:grid-cols-[repeat(41,minmax(0,1fr))]";

export function TrendField({ dots }: { dots: FieldDot[] }) {
  const [active, setActive] = useState<FieldDot | null>(null);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#9C8F84]">
        {TRAJECTORIES.map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${DOT_STYLE[t]}`} />
            {TRAJECTORY_LABEL[t]}
            <span className="text-[#2B211C]/35">
              {dots.filter((d) => d.trajectory === t).length}
            </span>
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {ROWS.map((row) => {
          const rowDots = dots
            .filter((d) => d.category === row.key)
            .sort(
              (a, b) =>
                TRAJECTORY_ORDER[a.trajectory] - TRAJECTORY_ORDER[b.trajectory]
            );
          return (
            <div key={row.key}>
              <div className="mb-3.5 flex items-baseline gap-3">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#2B211C]/65">
                  {row.label}
                </p>
                <span className="h-px flex-1 translate-y-[-0.2rem] bg-[#2B211C]/12" />
                <p className="text-[0.66rem] font-bold tabular-nums text-[#2B211C]/45">
                  {rowDots.length}
                </p>
              </div>
              <div className={`grid ${GRID} place-items-center gap-y-[10px]`}>
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

      {/* Fixed two-line readout: the caption swaps on hover without the panel
          jumping taller underneath the cursor, and the idle state fills the
          same two lines so the space never reads as a gap. */}
      <div className="mt-8 border-t border-[#2B211C]/10 pt-5">
        <p
          className={`font-editorial text-lg leading-tight md:text-xl ${active ? "text-[#2B211C]" : "text-[#2B211C]/40"}`}
        >
          {active ? active.name : "Hover a dot to read the trend."}
        </p>
        <p className="mt-1.5 text-xs text-[#2B211C]/55">
          {active ? (
            <>
              {TRAJECTORY_LABEL[active.trajectory]} &middot; {active.source}
            </>
          ) : (
            "Every dot is one published forecast, ordered faintest to strongest."
          )}
        </p>
      </div>
    </div>
  );
}
