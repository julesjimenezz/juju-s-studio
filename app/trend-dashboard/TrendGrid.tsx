"use client";

import { useState } from "react";

export type Trend = {
  name: string;
  category: "Fashion" | "Beauty" | "Cross-Category";
  momentum: "Emerging" | "Rising" | "Peaking";
  insight: string;
  opportunity: string;
  sources: string;
};

const FILTERS = ["All", "Fashion", "Beauty", "Cross-Category"] as const;

const momentumStyles: Record<Trend["momentum"], string> = {
  Peaking: "bg-[#3B5D4A] text-[#F8F4ED]",
  Rising: "bg-[#C7A6A0]/35 text-[#2B211C]",
  Emerging: "border border-[#9C8F84]/50 text-[#9C8F84]"
};

function TrendCard({ trend }: { trend: Trend }) {
  return (
    <article className="flex h-full flex-col rounded-[1.35rem] border border-[#2B211C]/10 bg-[#F8F4ED]/80 p-6 shadow-[0_18px_55px_rgba(43,33,28,0.055)] transition duration-300 hover:-translate-y-1 hover:border-[#C7A6A0]/55 hover:shadow-[0_26px_70px_rgba(43,33,28,0.09)] md:p-7">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9C8F84]">
          {trend.category}
        </p>
        <span
          className={`whitespace-nowrap rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] ${momentumStyles[trend.momentum]}`}
        >
          {trend.momentum}
        </span>
      </div>

      <h3 className="font-editorial text-[2rem] leading-[1.02] text-[#2B211C]">
        {trend.name}
      </h3>

      <div className="mt-6 grid gap-3">
        <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-4">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
            Customer Insight
          </p>
          <p className="mt-2 text-sm leading-6 text-[#2B211C]/85">
            {trend.insight}
          </p>
        </div>
        <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-4">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
            Business Opportunity
          </p>
          <p className="mt-2 text-sm leading-6 text-[#2B211C]/85">
            {trend.opportunity}
          </p>
        </div>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#2B211C]/45">
        Signals · {trend.sources}
      </p>
    </article>
  );
}

export function TrendGrid({ trends }: { trends: Trend[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible =
    filter === "All" ? trends : trends.filter((t) => t.category === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
              filter === f
                ? "border-[#3B5D4A] bg-[#3B5D4A] text-[#F8F4ED]"
                : "border-[#2B211C]/20 bg-[#F8F4ED]/60 text-[#2B211C]/70 hover:border-[#2B211C]/45"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((trend) => (
          <TrendCard key={trend.name} trend={trend} />
        ))}
      </div>
    </div>
  );
}
