"use client";

import { useEffect, useRef, useState } from "react";
import { useGenerationStages } from "../components/useGenerationStages";
import {
  StrategyAnalyticsPanel,
  type StrategyAnalytics
} from "../components/StrategyAnalytics";

const GENERATION_STAGES = [
  "Reading your brand description…",
  "Matching it against 2026 trend signals…",
  "Drafting campaign pillars and content ideas…",
  "Structuring your campaign brief…"
];

export type Campaign = {
  trend: string;
  trendCategory: string;
  campaignName: string;
  tagline: string;
  insight: string;
  pillars: string[];
  social: { channel: string; idea: string }[];
  email: { subject: string; concept: string };
  influencer: { archetype: string; ask: string };
  whyThisWorks: string;
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

function CampaignBrief({
  campaign,
  liveGenerated = false
}: {
  campaign: Campaign;
  liveGenerated?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[2.1rem] border border-[#2B211C]/10 bg-[#F8F4ED] shadow-[0_34px_95px_rgba(43,33,28,0.1)]">
      <div className="border-b border-[#2B211C]/10 p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
          <span>{liveGenerated ? "Live AI-Generated Concept" : "Campaign Concept"}</span>
          <span className="h-px w-8 bg-[#2B211C]/15" />
          <span>Built from: {campaign.trend}</span>
          <span className="rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.62rem] tracking-[0.14em] text-[#2B211C]">
            {campaign.trendCategory}
          </span>
        </div>
        <h2 className="font-editorial mt-5 text-[2.5rem] leading-[1.02] text-[#2B211C] md:text-[3.5rem]">
          {campaign.campaignName}
        </h2>
        <p className="font-editorial mt-3 text-xl italic text-[#2B211C]/70 md:text-2xl">
          {campaign.tagline}
        </p>
        <p className="mt-6 max-w-2xl border-l border-[#C7A6A0]/70 pl-4 text-sm font-medium leading-7 text-[#2B211C]/65">
          {campaign.insight}
        </p>
        <div className="mt-6 max-w-2xl rounded-[1.1rem] border border-[#3B5D4A]/20 bg-[#3B5D4A]/[0.07] p-4">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#3B5D4A]">
            Why This Works
          </p>
          <p className="mt-1.5 text-sm leading-6 text-[#2B211C]/80">
            {campaign.whyThisWorks}
          </p>
        </div>
      </div>

      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
            Campaign Pillars
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {campaign.pillars.map((pillar, index) => (
              <div
                key={pillar}
                className="flex items-center gap-3 rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C7A6A0]/40 bg-[#C7A6A0]/18 text-[0.65rem] font-bold text-[#2B211C]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-semibold text-[#2B211C]">{pillar}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.35rem] bg-[#3B5D4A] p-5 text-[#F8F4ED]">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#EFE7DA]/70">
              Next Steps
            </p>
            <ol className="mt-3 flex flex-col gap-2.5">
              {campaign.nextSteps.map((step, index) => (
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
          <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
              Social Content Ideas
            </p>
            <div className="mt-2 divide-y divide-[#2B211C]/10">
              {campaign.social.map((item) => (
                <div key={item.channel} className="py-3 first:pt-2 last:pb-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#2B211C]">
                    {item.channel}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[#2B211C]/85">
                    {item.idea}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <BriefBlock label="Email Concept">
              <p className="font-semibold text-[#2B211C]">
                &ldquo;{campaign.email.subject}&rdquo;
              </p>
              <p className="mt-2">{campaign.email.concept}</p>
            </BriefBlock>
            <BriefBlock label="Influencer Concept">
              <p className="font-semibold text-[#2B211C]">
                {campaign.influencer.archetype}
              </p>
              <p className="mt-2">{campaign.influencer.ask}</p>
            </BriefBlock>
          </div>
        </div>
      </div>

      {campaign.analytics && (
        <div className="px-6 pb-6 md:px-10 md:pb-10">
          <StrategyAnalyticsPanel analytics={campaign.analytics} />
        </div>
      )}
    </div>
  );
}

function GenerateCampaignPanel() {
  const [accessCode, setAccessCode] = useState(() =>
    typeof window !== "undefined"
      ? window.localStorage.getItem("jj_access_code") ?? ""
      : ""
  );
  const [brandContext, setBrandContext] = useState("");
  const [generated, setGenerated] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const stageMessage = useGenerationStages(GENERATION_STAGES, loading);

  // Whenever a new result comes in, bring it into view automatically so
  // the person doesn't have to hunt for where the output landed.
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
      const res = await fetch("/api/campaign/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accessCode, brandContext })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong generating your campaign.");
      }
      setGenerated(data.campaign);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("jj_access_code", accessCode);
      }
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
          Generate a real campaign for your brand
        </h3>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2B211C]/70">
        Describe your brand or product and get a real campaign concept, generated
        live. Access is limited to approved teams.
      </p>

      <form onSubmit={handleGenerate} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
          <textarea
            required
            value={brandContext}
            onChange={(e) => setBrandContext(e.target.value)}
            placeholder="e.g. We're a mid-size clean beauty skincare brand launching a new SPF line aimed at Gen Z..."
            rows={3}
            className="rounded-[1rem] border border-[#2B211C]/15 bg-[#F8F4ED] p-4 text-sm leading-6 text-[#2B211C] outline-none focus:border-[#3B5D4A]"
          />
          <input
            required
            type="password"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Access code"
            className="rounded-[1rem] border border-[#2B211C]/15 bg-[#F8F4ED] p-4 text-sm text-[#2B211C] outline-none focus:border-[#3B5D4A]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3B5D4A] px-7 text-sm font-semibold text-[#F8F4ED] shadow-[0_16px_36px_rgba(59,93,74,0.18)] transition hover:bg-[#324f3f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating…" : "Generate Campaign"}
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
              &darr; Your campaign is ready below
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
            <CampaignBrief campaign={generated} liveGenerated />
          </div>
        </div>
      )}
    </div>
  );
}

export function CampaignLab({ campaigns }: { campaigns: Campaign[] }) {
  const [selected, setSelected] = useState(0);
  const campaign = campaigns[selected];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {campaigns.map((c, index) => (
          <button
            key={c.trend}
            type="button"
            onClick={() => setSelected(index)}
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
              selected === index
                ? "border-[#3B5D4A] bg-[#3B5D4A] text-[#F8F4ED]"
                : "border-[#2B211C]/20 bg-[#F8F4ED]/60 text-[#2B211C]/70 hover:border-[#2B211C]/45"
            }`}
          >
            {c.trend}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <CampaignBrief campaign={campaign} />
      </div>

      <GenerateCampaignPanel />
    </div>
  );
}
