"use client";

import { useEffect, useRef, useState } from "react";
import { useGenerationStages } from "../components/useGenerationStages";
import {
  StrategyAnalyticsPanel,
  type StrategyAnalytics
} from "../components/StrategyAnalytics";
import {
  AccessCodeField,
  AccessNote,
  initialAccessCode,
  rememberAccessCode
} from "../components/AccessCodeField";

const GENERATION_STAGES = [
  "Reading your brand description…",
  "Comparing it against the 6 real 2026 trends…",
  "Identifying the strongest match…",
  "Writing your personalized read…"
];

export type Trend = {
  name: string;
  category: "Fashion" | "Beauty" | "Cross-Category";
  momentum: "Emerging" | "Rising" | "Peaking";
  insight: string;
  opportunity: string;
  firstMove: string;
  sources: string;
};

type TrendRead = {
  matchedTrend: string;
  whyThisTrend: string;
  personalizedInsight: string;
  personalizedOpportunity: string;
  nextStep: string;
  analytics?: StrategyAnalytics;
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
        <div className="rounded-[1.1rem] bg-[#3B5D4A]/[0.07] border border-[#3B5D4A]/20 p-4">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#3B5D4A]">
            First Move
          </p>
          <p className="mt-2 text-sm leading-6 text-[#2B211C]/85">
            {trend.firstMove}
          </p>
        </div>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#2B211C]/45">
        Signals · {trend.sources}
      </p>
    </article>
  );
}

function GenerateTrendReadPanel({ trends }: { trends: Trend[] }) {
  const [accessCode, setAccessCode] = useState(initialAccessCode);
  const [brandContext, setBrandContext] = useState("");
  const [generated, setGenerated] = useState<TrendRead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const stageMessage = useGenerationStages(GENERATION_STAGES, loading);

  useEffect(() => {
    if (generated && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [generated]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/trend/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accessCode, brandContext, trends })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong generating your trend read.");
      }
      setGenerated(data.read);
      rememberAccessCode(accessCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setGenerated(null);
    setBrandContext("");
  }

  function handlePrint() {
    window.print();
  }

  const matched = generated
    ? trends.find((t) => t.name === generated.matchedTrend)
    : undefined;

  return (
    <div className="mt-16 overflow-hidden rounded-[2.1rem] border border-[#3B5D4A]/25 bg-white/60 p-6 md:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#3B5D4A] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#F8F4ED]">
          Live AI
        </span>
        <h3 className="font-editorial text-2xl text-[#2B211C] md:text-3xl">
          Get a personalized read for your brand
        </h3>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2B211C]/70">
        Describe your brand and get matched to the real trend above that fits
        best, with a clear why. <AccessNote />
      </p>

      <form onSubmit={handleGenerate} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
          <textarea
            required
            value={brandContext}
            onChange={(e) => setBrandContext(e.target.value)}
            placeholder="e.g. We're a small independent jewelry brand selling mostly online to shoppers in their 20s..."
            rows={3}
            className="rounded-[1rem] border border-[#2B211C]/15 bg-[#F8F4ED] p-4 text-sm leading-6 text-[#2B211C] outline-none focus:border-[#3B5D4A]"
          />
          <AccessCodeField value={accessCode} onChange={setAccessCode} />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3B5D4A] px-7 text-sm font-semibold text-[#F8F4ED] shadow-[0_16px_36px_rgba(59,93,74,0.18)] transition hover:bg-[#324f3f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Matching…" : "Get My Trend Read"}
          </button>
          {error && (
            <p className="text-sm font-medium text-[#9c3b3b]">{error}</p>
          )}
        </div>
        {loading && (
          <p className="flex items-center gap-2 text-sm font-medium text-[#3B5D4A]">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#3B5D4A]" />
            {stageMessage}
          </p>
        )}
      </form>

      {generated && (
        <div ref={resultRef} className="mt-10 scroll-mt-8 border-t border-[#2B211C]/10 pt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.1rem] border border-[#3B5D4A]/30 bg-[#3B5D4A]/10 px-5 py-3">
            <p className="text-sm font-bold text-[#2B211C]">
              &darr; Your personalized read is ready below
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#3B5D4A] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F8F4ED] transition hover:bg-[#324f3f]"
              >
                Download as PDF
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold uppercase tracking-[0.14em] text-[#3B5D4A] underline decoration-[#3B5D4A]/40 underline-offset-4 hover:text-[#243f31]"
              >
                Start Over / Generate Another
              </button>
            </div>
          </div>
          <p className="mb-4 text-xs text-[#2B211C]/50">
            Opens your browser&rsquo;s print dialog &mdash; choose{" "}
            <strong>Save as PDF</strong>.
          </p>

          <div className="print-target overflow-hidden rounded-[2.1rem] border border-[#2B211C]/10 bg-[#F8F4ED] shadow-[0_34px_95px_rgba(43,33,28,0.1)]">
            <div className="border-b border-[#2B211C]/10 p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                <span>Live AI-Matched Trend</span>
                {matched && (
                  <>
                    <span className="h-px w-8 bg-[#2B211C]/15" />
                    <span className="rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.62rem] tracking-[0.14em] text-[#2B211C]">
                      {matched.category}
                    </span>
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] ${momentumStyles[matched.momentum]}`}
                    >
                      {matched.momentum}
                    </span>
                  </>
                )}
              </div>
              <h2 className="font-editorial mt-5 text-[2.5rem] leading-[1.02] text-[#2B211C] md:text-[3.5rem]">
                {generated.matchedTrend}
              </h2>
              <p className="mt-6 max-w-2xl border-l border-[#C7A6A0]/70 pl-4 text-sm font-medium leading-7 text-[#2B211C]/65">
                {generated.whyThisTrend}
              </p>
            </div>

            <div className="grid gap-4 p-6 md:p-10 sm:grid-cols-2">
              <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                  Personalized Insight
                </p>
                <p className="mt-2 text-sm leading-6 text-[#2B211C]/85">
                  {generated.personalizedInsight}
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                  Personalized Opportunity
                </p>
                <p className="mt-2 text-sm leading-6 text-[#2B211C]/85">
                  {generated.personalizedOpportunity}
                </p>
              </div>

              <div className="sm:col-span-2 rounded-[1.35rem] bg-[#3B5D4A] p-5 text-[#F8F4ED]">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#EFE7DA]/70">
                  Next Step
                </p>
                <p className="mt-2 text-sm leading-6 text-[#F8F4ED]/90">
                  {generated.nextStep}
                </p>
              </div>

              {matched && (
                <p className="sm:col-span-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2B211C]/45">
                  Signals · {matched.sources}
                </p>
              )}
            </div>

            {generated.analytics && (
              <div className="px-6 pb-6 md:px-10 md:pb-10">
                <StrategyAnalyticsPanel
                  analytics={generated.analytics}
                  subject="trend match"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
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
            className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
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

      <GenerateTrendReadPanel trends={trends} />
    </div>
  );
}
