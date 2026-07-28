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
  "Matching it against 2026 trend signals…",
  "Building out the shopper persona…",
  "Structuring your customer profile…"
];

export type CustomerProfile = {
  trend: string;
  trendCategory: string;
  personaName: string;
  tagline: string;
  insight: string;
  whyThisWorks: string;
  whatTheyWant: string;
  quote: string;
  barriers: string[];
  howToReachThem: { channel: string; approach: string }[];
  nextSteps: string[];
  analytics?: StrategyAnalytics;
};

function BriefBlock({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
        {label}
      </p>
      <div className="mt-2 text-sm leading-6 text-[#2B211C]/85">
        {children}
      </div>
    </div>
  );
}

function CustomerBrief({
  profile,
  liveGenerated = false
}: {
  profile: CustomerProfile;
  liveGenerated?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[2.1rem] border border-[#2B211C]/10 bg-[#F8F4ED] shadow-[0_34px_95px_rgba(43,33,28,0.1)]">
      <div className="border-b border-[#2B211C]/10 p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
          <span>{liveGenerated ? "Live AI-Generated Profile" : "Customer Profile"}</span>
          <span className="h-px w-8 bg-[#2B211C]/15" />
          <span>Built from: {profile.trend}</span>
          <span className="rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.62rem] tracking-[0.14em] text-[#2B211C]">
            {profile.trendCategory}
          </span>
        </div>
        <h2 className="font-editorial mt-5 text-[2.5rem] leading-[1.02] text-[#2B211C] md:text-[3.5rem]">
          {profile.personaName}
        </h2>
        <p className="font-editorial mt-3 text-xl italic text-[#2B211C]/70 md:text-2xl">
          {profile.tagline}
        </p>
        <p className="mt-6 max-w-2xl border-l border-[#C7A6A0]/70 pl-4 text-sm font-medium leading-7 text-[#2B211C]/65">
          {profile.insight}
        </p>
        <div className="mt-6 max-w-2xl rounded-[1.1rem] border border-[#3B5D4A]/20 bg-[#3B5D4A]/[0.07] p-4">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#3B5D4A]">
            Why This Works
          </p>
          <p className="mt-1.5 text-sm leading-6 text-[#2B211C]/80">
            {profile.whyThisWorks}
          </p>
        </div>
      </div>

      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-4">
          <BriefBlock label="What They Want">
            {profile.whatTheyWant}
          </BriefBlock>

          <div className="mt-2 rounded-[1.35rem] bg-[#3B5D4A] p-5 text-[#F8F4ED]">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#EFE7DA]/70">
              Next Steps
            </p>
            <ol className="mt-3 flex flex-col gap-2.5">
              {profile.nextSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F8F4ED]/15 text-[0.6rem] font-bold text-[#F8F4ED]">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-[#F8F4ED]/90">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.1rem] border border-[#C7A6A0]/50 bg-[#C7A6A0]/12 p-6">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
              Customer Voice
            </p>
            <p className="font-editorial mt-3 text-xl leading-[1.35] italic text-[#2B211C] md:text-2xl">
              &ldquo;{profile.quote}&rdquo;
            </p>
          </div>

          <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
              Barriers to Address
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {profile.barriers.map((barrier, index) => (
                <div
                  key={barrier}
                  className="flex items-start gap-3 rounded-[1.1rem] border border-[#2B211C]/10 bg-[#F8F4ED] px-4 py-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C7A6A0]/40 bg-[#C7A6A0]/18 text-[0.62rem] font-bold text-[#2B211C]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-6 text-[#2B211C]/85">
                    {barrier}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
              How to Reach Them
            </p>
            <div className="mt-2 divide-y divide-[#2B211C]/10">
              {profile.howToReachThem.map((item) => (
                <div key={item.channel} className="py-3 first:pt-2 last:pb-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#2B211C]">
                    {item.channel}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[#2B211C]/85">
                    {item.approach}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {profile.analytics && (
        <div className="px-6 pb-6 md:px-10 md:pb-10">
          <StrategyAnalyticsPanel
            analytics={profile.analytics}
            subject="shopper"
          />
        </div>
      )}
    </div>
  );
}

function GenerateCustomerPanel() {
  const [accessCode, setAccessCode] = useState(initialAccessCode);
  const [brandContext, setBrandContext] = useState("");
  const [generated, setGenerated] = useState<CustomerProfile | null>(null);
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
      const res = await fetch("/api/customer/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accessCode, brandContext })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong generating your customer profile.");
      }
      setGenerated(data.profile);
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

  return (
    <div className="mt-16 overflow-hidden rounded-[2.1rem] border border-[#3B5D4A]/25 bg-white/60 p-6 md:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#3B5D4A] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#F8F4ED]">
          Live AI
        </span>
        <h3 className="font-editorial text-2xl text-[#2B211C] md:text-3xl">
          Generate a real customer profile for your brand
        </h3>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2B211C]/70">
        Describe your brand or product and get a real shopper persona &mdash;
        what they want, their barriers, and how to reach them, generated live.{" "}
        <AccessNote />
      </p>

      <form onSubmit={handleGenerate} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
          <textarea
            required
            value={brandContext}
            onChange={(e) => setBrandContext(e.target.value)}
            placeholder="e.g. We're a small footwear brand trying to understand who buys our limited sneaker drops..."
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
            {loading ? "Generating…" : "Generate Customer Profile"}
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
              &darr; Your customer profile is ready below
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#3B5D4A] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F8F4ED] transition hover:bg-[#324f3f]"
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
          <div className="print-target">
            <CustomerBrief profile={generated} liveGenerated />
          </div>
        </div>
      )}
    </div>
  );
}

export function CustomerInsightBoard({
  profiles
}: {
  profiles: CustomerProfile[];
}) {
  const [selected, setSelected] = useState(0);
  const profile = profiles[selected];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {profiles.map((p, index) => (
          <button
            key={p.trend}
            type="button"
            onClick={() => setSelected(index)}
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
              selected === index
                ? "border-[#3B5D4A] bg-[#3B5D4A] text-[#F8F4ED]"
                : "border-[#2B211C]/20 bg-[#F8F4ED]/60 text-[#2B211C]/70 hover:border-[#2B211C]/45"
            }`}
          >
            {p.trend}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <CustomerBrief profile={profile} />
      </div>

      <GenerateCustomerPanel />
    </div>
  );
}
