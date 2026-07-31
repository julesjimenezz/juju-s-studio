import { Suspense } from "react";
import { TREND_POOL } from "../lib/trendPool";
import { TrendField, type FieldDot } from "./TrendField";
import {
  TrendPulseStripLive,
  TrendPulseStripSkeleton
} from "./TrendPulseStrip";

// The home-page trend section: the entire sourced pool as one chart,
// with the live pulse folded in underneath. This replaces the separate
// Trend Dashboard page -- the data was the interesting part, the page
// around it was a detour.
//
// Everything below is derived from app/lib/trendPool.ts, so adding a
// trend to the pool updates the counts and the chart on its own.
const DOTS: FieldDot[] = TREND_POOL.map((t) => ({
  id: t.id,
  name: t.name,
  category: t.category,
  trajectory: t.trajectory,
  source: t.source
}));

const SOURCE_COUNT = new Set(TREND_POOL.map((t) => t.source)).size;

const STATS: [string, string][] = [
  [String(DOTS.length), "Upcoming trends"],
  [String(SOURCE_COUNT), "Named sources"],
  ["0", "Invented by AI"]
];

export function TrendIndex() {
  return (
    <section
      id="trends"
      className="border-t border-[#2B211C]/10 px-5 py-20 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#9C8F84]">
            The Trend Index
          </p>
          <h2 className="font-editorial text-4xl leading-[1.04] text-[#2B211C] md:text-5xl">
            Every trend the Studio knows, on one screen.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#2B211C]/75 md:text-lg">
            One dot per upcoming trend, each one traced to a published
            forecast &mdash; Pinterest Predicts, WGSN, McKinsey, Who What Wear
            and others. The Studio can only match you to what&rsquo;s here, so
            nothing it hands back is made up.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
          {STATS.map(([value, label]) => (
            <div key={label}>
              <p className="font-editorial text-3xl leading-none text-[#2B211C] md:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#9C8F84]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-11 rounded-[2.1rem] border border-[#2B211C]/10 bg-[#EFE7DA]/50 p-6 md:p-9">
          <TrendField dots={DOTS} />
          <Suspense fallback={<TrendPulseStripSkeleton />}>
            <TrendPulseStripLive />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
