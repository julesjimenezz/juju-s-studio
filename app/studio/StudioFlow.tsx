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
import { trendById, type PoolTrend } from "../lib/trendPool";

const MATCH_STAGES = [
  "Reading your brand description…",
  "Scanning 100+ published trend forecasts…",
  "Finding the signals moving in your realm…",
  "Ranking them by fit…"
];

const MORE_STAGES = [
  "Re-reading your brand with the new context…",
  "Searching the rest of the trend pool…",
  "Ranking the new matches…"
];

const REPORT_STAGES = [
  "Reading everything you told us…",
  "Connecting your chosen trends into one point of view…",
  "Drafting campaign, product, and customer plays…",
  "Structuring your full strategy…"
];

type Match = { trendId: string; whyItFits: string; fitScore: number };

type Report = {
  title: string;
  positioning: string;
  trendPlays: { trendName: string; play: string }[];
  campaign: { name: string; tagline: string; pillars: string[] };
  productPlays: string[];
  customer: { who: string; want: string; barrier: string; where: string };
  social: { channel: string; idea: string }[];
  whyThisWorks: string;
  nextSteps: string[];
  analytics?: StrategyAnalytics;
};

const textOf = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const textListOf = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(textOf).filter(Boolean) : [];

// Two things can go wrong between the API and the screen: the response
// isn't JSON at all (a gateway timeout returns HTML), or it's JSON but a
// field is missing. Both used to surface as a raw crash. readJson handles
// the first; normalizeReport handles the second by rebuilding the report
// into a shape ReportView can always render, and returning null -- which
// becomes a plain retry message -- if anything essential is absent.
async function readJson(res: Response): Promise<Record<string, unknown>> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function normalizeReport(raw: unknown): Report | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const obj = (v: unknown): Record<string, unknown> =>
    v && typeof v === "object" ? (v as Record<string, unknown>) : {};

  const campaign = obj(r.campaign);
  const customer = obj(r.customer);

  const trendPlays = (Array.isArray(r.trendPlays) ? r.trendPlays : [])
    .map((tp) => ({ trendName: textOf(obj(tp).trendName), play: textOf(obj(tp).play) }))
    .filter((tp) => tp.trendName && tp.play);

  const social = (Array.isArray(r.social) ? r.social : [])
    .map((s) => ({ channel: textOf(obj(s).channel), idea: textOf(obj(s).idea) }))
    .filter((s) => s.channel && s.idea);

  const report: Report = {
    title: textOf(r.title),
    positioning: textOf(r.positioning),
    trendPlays,
    campaign: {
      name: textOf(campaign.name),
      tagline: textOf(campaign.tagline),
      pillars: textListOf(campaign.pillars)
    },
    productPlays: textListOf(r.productPlays),
    customer: {
      who: textOf(customer.who),
      want: textOf(customer.want),
      barrier: textOf(customer.barrier),
      where: textOf(customer.where)
    },
    social,
    whyThisWorks: textOf(r.whyThisWorks),
    nextSteps: textListOf(r.nextSteps),
    analytics:
      r.analytics && typeof r.analytics === "object"
        ? (r.analytics as StrategyAnalytics)
        : undefined
  };

  const complete =
    report.title &&
    report.positioning &&
    report.whyThisWorks &&
    report.trendPlays.length > 0 &&
    report.campaign.name &&
    report.campaign.pillars.length > 0 &&
    report.productPlays.length > 0 &&
    report.customer.who &&
    report.social.length > 0 &&
    report.nextSteps.length > 0;

  return complete ? report : null;
}

// A request that hangs should fail with a message rather than spinning
// forever. Report generation makes two model calls and normally lands
// around 25s, so the ceiling here is generous but finite.
async function postJson(
  url: string,
  payload: unknown,
  timeoutMs: number
): Promise<{ res: Response; data: Record<string, unknown> }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    return { res, data: await readJson(res) };
  } finally {
    clearTimeout(timer);
  }
}

function StepMarker({ n, label, active }: { n: string; label: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${active ? "" : "opacity-40"}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C7A6A0]/50 bg-[#C7A6A0]/18 text-xs font-bold text-[#2B211C]">
        {n}
      </span>
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#2B211C]/70">
        {label}
      </p>
    </div>
  );
}

function LoadingLine({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-2 text-sm font-medium text-[#3B5D4A]">
      <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#3B5D4A]" />
      {message}
    </p>
  );
}

function TrendCard({
  trend,
  match,
  selected,
  onToggle
}: {
  trend: PoolTrend;
  match: Match;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`flex h-full flex-col rounded-[1.6rem] border p-6 text-left transition ${
        selected
          ? "border-[#3B5D4A] bg-[#3B5D4A]/[0.07] shadow-[0_18px_44px_rgba(59,93,74,0.14)]"
          : "border-[#2B211C]/10 bg-white/55 hover:border-[#3B5D4A]/50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            {trend.category}
          </span>
          <span className="rounded-full border border-[#3B5D4A]/25 bg-[#3B5D4A]/8 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#3B5D4A]">
            {trend.trajectory === "peaking-next-year" ? "peaks next year" : trend.trajectory}
          </span>
        </div>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.75rem] font-bold ${
            selected
              ? "border-[#3B5D4A] bg-[#3B5D4A] text-[#F8F4ED]"
              : "border-[#2B211C]/25 text-transparent"
          }`}
          aria-hidden
        >
          ✓
        </span>
      </div>
      <h3 className="font-editorial mt-4 text-2xl leading-tight text-[#2B211C]">
        {trend.name}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#2B211C]/75">{trend.description}</p>
      <div className="mt-4 rounded-[1rem] border border-[#3B5D4A]/20 bg-[#3B5D4A]/[0.06] p-3">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#3B5D4A]">
          Why it fits you
        </p>
        <p className="mt-1 text-sm leading-6 text-[#2B211C]/80">{match.whyItFits}</p>
      </div>
      <div className="mt-4 flex-1" />
      <div className="mt-2">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#9C8F84]">
            Brand fit
          </span>
          <span className="text-[0.7rem] font-bold text-[#3B5D4A]">{match.fitScore}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#2B211C]/8">
          <div
            className="h-full rounded-full bg-[#3B5D4A]"
            style={{ width: `${Math.max(0, Math.min(100, match.fitScore))}%` }}
          />
        </div>
      </div>
      <p className="mt-3 text-[0.62rem] text-[#2B211C]/45">
        Source: {trend.source}
      </p>
    </button>
  );
}

function ReportView({ report }: { report: Report }) {
  return (
    <div className="overflow-hidden rounded-[2.1rem] border border-[#2B211C]/10 bg-[#F8F4ED] shadow-[0_34px_95px_rgba(43,33,28,0.1)]">
      <div className="border-b border-[#2B211C]/10 p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
          <span>Live AI-Generated Strategy</span>
          <span className="h-px w-8 bg-[#2B211C]/15" />
          <span>Built on {report.trendPlays.length} chosen trend{report.trendPlays.length === 1 ? "" : "s"}</span>
        </div>
        <h2 className="font-editorial mt-5 text-[2.5rem] leading-[1.02] text-[#2B211C] md:text-[3.5rem]">
          {report.title}
        </h2>
        <p className="mt-6 max-w-3xl border-l border-[#C7A6A0]/70 pl-4 text-base font-medium leading-7 text-[#2B211C]/70">
          {report.positioning}
        </p>
        <div className="mt-6 max-w-3xl rounded-[1.1rem] border border-[#3B5D4A]/20 bg-[#3B5D4A]/[0.07] p-4">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#3B5D4A]">
            Why This Works
          </p>
          <p className="mt-1.5 text-sm leading-6 text-[#2B211C]/80">{report.whyThisWorks}</p>
        </div>
      </div>

      <div className="grid gap-8 p-6 md:p-10">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
            Your Trends, Your Plays
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {report.trendPlays.map((tp) => (
              <div
                key={tp.trendName}
                className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5"
              >
                <p className="text-sm font-semibold text-[#2B211C]">{tp.trendName}</p>
                <p className="mt-1.5 text-sm leading-6 text-[#2B211C]/80">{tp.play}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="rounded-[1.35rem] border border-[#2B211C]/10 bg-white/45 p-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                The Campaign
              </p>
              <h3 className="font-editorial mt-3 text-3xl leading-none text-[#2B211C]">
                {report.campaign.name}
              </h3>
              <p className="font-editorial mt-2 text-lg italic text-[#2B211C]/70">
                {report.campaign.tagline}
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {report.campaign.pillars.map((pillar, index) => (
                  <div key={pillar} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C7A6A0]/40 bg-[#C7A6A0]/18 text-[0.6rem] font-bold text-[#2B211C]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold text-[#2B211C]">{pillar}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.35rem] bg-[#3B5D4A] p-6 text-[#F8F4ED]">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#EFE7DA]/70">
                Next Steps
              </p>
              <ol className="mt-3 flex flex-col gap-2.5">
                {report.nextSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F8F4ED]/15 text-[0.6rem] font-bold text-[#F8F4ED]">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-6 text-[#F8F4ED]/90">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                Product Plays
              </p>
              <ul className="mt-2 divide-y divide-[#2B211C]/10">
                {report.productPlays.map((play) => (
                  <li key={play} className="py-2.5 text-sm leading-6 text-[#2B211C]/85">
                    {play}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                Your Customer
              </p>
              <div className="mt-2 grid gap-2 text-sm leading-6 text-[#2B211C]/85 sm:grid-cols-2">
                <p><strong className="text-[#2B211C]">Who:</strong> {report.customer.who}</p>
                <p><strong className="text-[#2B211C]">Wants:</strong> {report.customer.want}</p>
                <p><strong className="text-[#2B211C]">Barrier:</strong> {report.customer.barrier}</p>
                <p><strong className="text-[#2B211C]">Where:</strong> {report.customer.where}</p>
              </div>
            </div>

            <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                Social Content Ideas
              </p>
              <div className="mt-2 divide-y divide-[#2B211C]/10">
                {report.social.map((item) => (
                  <div key={item.channel + item.idea} className="py-3 first:pt-2 last:pb-0">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#2B211C]">
                      {item.channel}
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-[#2B211C]/85">{item.idea}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {report.analytics && (
        <div className="px-6 pb-6 md:px-10 md:pb-10">
          <StrategyAnalyticsPanel analytics={report.analytics} subject="strategy" />
        </div>
      )}
    </div>
  );
}

// The stylesheet sets html { scroll-behavior: smooth }, which means
// scrollIntoView animates even with behavior: "auto". That animation loses
// the race whenever the page collapses underneath it -- which is exactly
// what happens when the trends grid unmounts on the final step -- and the
// user gets dumped in the footer wondering where their strategy went.
// "instant" explicitly overrides the CSS.
// The nav is sticky and 73px tall, so anything landed closer than that
// to the top sits underneath it -- which on the report meant the
// "Download as PDF" and "Start Over" buttons were hidden behind the
// header the moment the strategy arrived.
function jumpTo(el: HTMLElement | null, offset = 90) {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
}

// Landing a scroll right after a large DOM collapse is a race: the first
// frame still measures the pre-collapse layout, so the jump overshoots.
// Wait two frames, then correct once more after the reflow has settled.
function jumpToWhenSettled(get: () => HTMLElement | null, offset = 90) {
  const frame = requestAnimationFrame(() =>
    requestAnimationFrame(() => jumpTo(get(), offset))
  );
  const timer = setTimeout(() => jumpTo(get(), offset), 350);
  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
  };
}

export function StudioFlow() {
  const [accessCode, setAccessCode] = useState(initialAccessCode);
  const [brand, setBrand] = useState("");
  const [realm, setRealm] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [audience, setAudience] = useState("");
  const [notes, setNotes] = useState("");
  const [finalNote, setFinalNote] = useState("");
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [report, setReport] = useState<Report | null>(null);

  const [matching, setMatching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trendsRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const matchStage = useGenerationStages(MATCH_STAGES, matching);
  const moreStage = useGenerationStages(MORE_STAGES, loadingMore);
  const reportStage = useGenerationStages(REPORT_STAGES, reporting);

  useEffect(() => {
    if (matches.length > 0 && !report && trendsRef.current) {
      trendsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realm]);

  useEffect(() => {
    if (showFinalStep && finalRef.current) {
      finalRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showFinalStep]);

  // When the report arrives the whole trends grid unmounts, so the page
  // gets dramatically shorter in the same commit. A smooth scroll started
  // here races that collapse and lands the user in the footer -- looking
  // for all the world like nothing happened. Scroll on the next frame,
  // after layout has settled, and correct once more shortly after in case
  // fonts or images shift things again.
  useEffect(() => {
    if (!report) return;
    return jumpToWhenSettled(() => reportRef.current);
  }, [report]);

  async function callMatch(refine: boolean) {
    const setBusy = refine ? setLoadingMore : setMatching;
    setBusy(true);
    setError(null);
    try {
      const { res, data } = await postJson(
        "/api/studio/match",
        {
          accessCode,
          brand,
          location: location || undefined,
          audience: audience || undefined,
          notes: notes || undefined,
          excludeIds: refine ? matches.map((m) => m.trendId) : []
        },
        60000
      );
      if (!res.ok) {
        throw new Error(
          textOf(data.error) || "Something went wrong finding your trends."
        );
      }
      const result = (data.result ?? {}) as { realm?: string; matches?: Match[] };
      const valid = (Array.isArray(result.matches) ? result.matches : []).filter(
        (m) => m && trendById(m.trendId)
      );
      if (valid.length === 0) {
        throw new Error(
          refine
            ? "No new trends came back that time. Try adding a little more context."
            : "We couldn't match any trends to that description. Try adding a bit more detail about the brand."
        );
      }
      setRealm(textOf(result.realm) || realm);
      setMatches((prev) => (refine ? [...prev, ...valid] : valid));
      if (!refine) setSelectedIds([]);
      rememberAccessCode(accessCode);
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      setError(
        aborted
          ? "That took longer than expected. Give it one more try."
          : err instanceof Error
            ? err.message
            : "Something went wrong."
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleReport() {
    setReporting(true);
    setError(null);
    try {
      const { res, data } = await postJson(
        "/api/studio/report",
        {
          accessCode,
          brand,
          location: location || undefined,
          audience: audience || undefined,
          notes: notes || undefined,
          finalNote: finalNote || undefined,
          chosenIds: selectedIds
        },
        90000
      );
      if (!res.ok) {
        throw new Error(
          textOf(data.error) || "Something went wrong building your strategy."
        );
      }
      const normalized = normalizeReport(data.report);
      if (!normalized) {
        throw new Error(
          "Your strategy came back incomplete. Give it one more try - if it keeps happening, try picking a few fewer trends."
        );
      }
      setReport(normalized);
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      setError(
        aborted
          ? "That took longer than expected. Give it one more try."
          : err instanceof Error
            ? err.message
            : "Something went wrong."
      );
    } finally {
      setReporting(false);
    }
  }

  function toggleTrend(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleStartOver() {
    setRealm(null);
    setMatches([]);
    setSelectedIds([]);
    setLocation("");
    setAudience("");
    setNotes("");
    setFinalNote("");
    setShowFinalStep(false);
    setReport(null);
    setError(null);
    // Clearing the report collapses the page to almost nothing. Without
    // this the user is left stranded in the footer wondering what happened.
    jumpToWhenSettled(() => topRef.current);
  }

  function handlePrint() {
    window.print();
  }

  const hasTrends = matches.length > 0;

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Step markers */}
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <StepMarker n="01" label="Your Brand" active />
        <StepMarker n="02" label="Your Trends" active={hasTrends} />
        <StepMarker n="03" label="Refine" active={hasTrends} />
        <StepMarker n="04" label="Full Strategy" active={Boolean(report)} />
      </div>

      {/* Step 1: the search bar */}
      <div className="mt-10 overflow-hidden rounded-[2.1rem] border border-[#3B5D4A]/25 bg-white/60 p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#3B5D4A] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#F8F4ED]">
            Live AI
          </span>
          <h2 className="font-editorial text-2xl text-[#2B211C] md:text-3xl">
            What&rsquo;s your brand?
          </h2>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2B211C]/70">
          Describe your brand and we&rsquo;ll search 100+ real, published trend
          forecasts for the ones rising in your realm. <AccessNote />
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            callMatch(false);
          }}
          className="mt-6 grid gap-4"
        >
          <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
            <textarea
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. We're a small-batch fragrance brand for Gen Z women, mostly selling on TikTok Shop..."
              rows={3}
              className="rounded-[1rem] border border-[#2B211C]/15 bg-[#F8F4ED] p-4 text-sm leading-6 text-[#2B211C] outline-none focus:border-[#3B5D4A]"
            />
            <AccessCodeField value={accessCode} onChange={setAccessCode} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={matching}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3B5D4A] px-7 text-sm font-semibold text-[#F8F4ED] shadow-[0_16px_36px_rgba(59,93,74,0.18)] transition hover:bg-[#324f3f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {matching ? "Searching…" : "Find My Trends"}
            </button>
            {error && <p className="text-sm font-medium text-[#9c3b3b]">{error}</p>}
          </div>
          {matching && <LoadingLine message={matchStage} />}
        </form>
      </div>

      {/* Step 2 + 3: trends grid + refine */}
      {hasTrends && !report && (
        <div ref={trendsRef} className="mt-12 scroll-mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                Trending in your realm
              </p>
              <h2 className="font-editorial mt-2 text-3xl text-[#2B211C] md:text-4xl">
                {realm}
              </h2>
            </div>
            <p className="rounded-full border border-[#3B5D4A]/30 bg-[#3B5D4A]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#3B5D4A]">
              {selectedIds.length} picked
            </p>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2B211C]/70">
            Every trend below is a real published forecast, matched to your brand.
            Tap the ones you believe in &mdash; then refine, or go straight to your
            strategy.
          </p>

          <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((m) => {
              const trend = trendById(m.trendId);
              if (!trend) return null;
              return (
                <TrendCard
                  key={m.trendId}
                  trend={trend}
                  match={m}
                  selected={selectedIds.includes(m.trendId)}
                  onToggle={() => toggleTrend(m.trendId)}
                />
              );
            })}
          </div>

          {/* Refine */}
          <div className="mt-10 rounded-[1.8rem] border border-[#2B211C]/10 bg-[#EFE7DA]/60 p-6 md:p-8">
            <h3 className="font-editorial text-2xl text-[#2B211C]">
              Sharpen the search
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#2B211C]/70">
              Add your location, audience, or anything else about the brand &mdash;
              we&rsquo;ll pull more trends that fit. Your picks stay picked.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location / market — e.g. Nashville, or online-only US"
                aria-label="Location or market"
                className="rounded-[1rem] border border-[#2B211C]/15 bg-[#F8F4ED] p-4 text-sm text-[#2B211C] outline-none focus:border-[#3B5D4A]"
              />
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Audience — e.g. college students, moms 35-50"
                aria-label="Audience"
                className="rounded-[1rem] border border-[#2B211C]/15 bg-[#F8F4ED] p-4 text-sm text-[#2B211C] outline-none focus:border-[#3B5D4A]"
              />
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything else — price point, vibe, what's working, what isn't..."
              aria-label="More about the brand"
              rows={2}
              className="mt-4 w-full rounded-[1rem] border border-[#2B211C]/15 bg-[#F8F4ED] p-4 text-sm leading-6 text-[#2B211C] outline-none focus:border-[#3B5D4A]"
            />
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                disabled={loadingMore}
                onClick={() => callMatch(true)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#3B5D4A] px-6 text-sm font-semibold text-[#3B5D4A] transition hover:bg-[#3B5D4A]/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingMore ? "Searching…" : "Find More Trends"}
              </button>
              <button
                type="button"
                disabled={selectedIds.length === 0}
                onClick={() => setShowFinalStep(true)}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3B5D4A] px-7 text-sm font-semibold text-[#F8F4ED] shadow-[0_16px_36px_rgba(59,93,74,0.18)] transition hover:bg-[#324f3f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue with {selectedIds.length || "your"} trend{selectedIds.length === 1 ? "" : "s"} &rarr;
              </button>
            </div>
            {loadingMore && <div className="mt-4"><LoadingLine message={moreStage} /></div>}
            {error && !matching && !reporting && (
              <p className="mt-3 text-sm font-medium text-[#9c3b3b]">{error}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 4: final note + generate */}
      {showFinalStep && !report && (
        <div
          ref={finalRef}
          className="mt-12 scroll-mt-8 overflow-hidden rounded-[2.1rem] border border-[#3B5D4A]/25 bg-white/60 p-6 md:p-10"
        >
          <h2 className="font-editorial text-2xl text-[#2B211C] md:text-3xl">
            One last thing &mdash; anything to add?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2B211C]/70">
            A launch date, a product you want featured, a direction you love or
            hate. Or skip it and go straight to your strategy.
          </p>
          <textarea
            value={finalNote}
            onChange={(e) => setFinalNote(e.target.value)}
            placeholder="Optional — e.g. We're launching in March and want the campaign built around our new lip oil..."
            rows={3}
            className="mt-5 w-full rounded-[1rem] border border-[#2B211C]/15 bg-[#F8F4ED] p-4 text-sm leading-6 text-[#2B211C] outline-none focus:border-[#3B5D4A]"
          />
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              disabled={reporting}
              onClick={handleReport}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3B5D4A] px-7 text-sm font-semibold text-[#F8F4ED] shadow-[0_16px_36px_rgba(59,93,74,0.18)] transition hover:bg-[#324f3f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {reporting ? "Building…" : "Generate My Full Strategy"}
            </button>
          </div>
          {!reporting && error && (
            <p className="mt-4 rounded-[0.9rem] border border-[#9c3b3b]/25 bg-[#9c3b3b]/[0.06] px-4 py-3 text-sm font-medium leading-6 text-[#9c3b3b]">
              {error}
            </p>
          )}
          {reporting && <div className="mt-4"><LoadingLine message={reportStage} /></div>}
        </div>
      )}

      {/* The full strategy */}
      {report && (
        <div ref={reportRef} className="mt-12 scroll-mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.1rem] border border-[#3B5D4A]/30 bg-[#3B5D4A]/10 px-5 py-3">
            <p className="text-sm font-bold text-[#2B211C]">
              &darr; Your full strategy is ready below
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
                onClick={handleStartOver}
                className="text-xs font-bold uppercase tracking-[0.14em] text-[#3B5D4A] underline decoration-[#3B5D4A]/40 underline-offset-4 hover:text-[#243f31]"
              >
                Start Over
              </button>
            </div>
          </div>
          <p className="mb-4 text-xs text-[#2B211C]/50">
            Opens your browser&rsquo;s print dialog &mdash; choose{" "}
            <strong>Save as PDF</strong>.
          </p>
          <div className="print-target">
            <ReportView report={report} />
          </div>
        </div>
      )}
    </div>
  );
}
