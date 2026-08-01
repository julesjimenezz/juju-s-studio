import { Suspense } from "react";
import { TREND_POOL } from "../lib/trendPool";
import { TrendField, type FieldDot } from "./TrendField";
import {
  TrendPulseStripLive,
  TrendPulseStripSkeleton
} from "./TrendPulseStrip";

// The trend section that opens the Guided Studio: the entire sourced pool
// as one chart, with the live pulse folded in underneath.
//
// It sits directly above the brand box on /studio, which changes what it
// has to do. On the home page it was a headline moment and carried a big
// display heading. Here the page header has already made the pitch, so
// this reads as evidence for it -- one contained card, heading and counts
// on a single line, so the input below stays close to the top.
//
// Everything is derived from app/lib/trendPool.ts, so adding a trend to
// the pool updates the counts and the chart on its own.
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
    <section id="trends" className="mx-auto max-w-7xl scroll-mt-24 px-5 md:px-8">
      <div className="rounded-[2.1rem] border border-[#2B211C]/10 bg-[#EFE7DA]/50 p-6 md:p-9">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="max-w-lg">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#9C8F84]">
              The Trend Index
            </p>
            <h2 className="font-editorial mt-2.5 text-2xl leading-tight text-[#2B211C] md:text-3xl">
              Everything the Studio can match you to.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#2B211C]/70">
              One dot per upcoming trend, each traced to a published forecast
              &mdash; Pinterest Predicts, WGSN, McKinsey, Who What Wear and
              others. Your matches come from here, so nothing you get back is
              made up.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-x-5 sm:gap-x-10">
            {STATS.map(([value, label]) => (
              <div key={label}>
                <p className="font-editorial text-3xl leading-none tabular-nums text-[#2B211C]">
                  {value}
                </p>
                <p className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#9C8F84]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 border-t border-[#2B211C]/10 pt-8">
          <TrendField dots={DOTS} />
          <Suspense fallback={<TrendPulseStripSkeleton />}>
            <TrendPulseStripLive />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
