import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRequest } from "../../../lib/supabase";
import type {
  TrendRecord,
  TrendSignalPoint,
  TrendSummary,
  TrendsResponse
} from "../../../types/analytics";

export const runtime = "nodejs";

// Read-only, public-safe: no secrets required, no AI calls, so this is
// intentionally NOT gated behind SITE_ACCESS_CODE the way the AI
// generation routes are — there's no cost risk in serving already-stored
// real data back out.

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Trend analytics isn't configured yet (missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on the server)."
      },
      { status: 500 }
    );
  }

  try {
    const trendsRes = await supabaseRequest("trends?select=*&order=name.asc");
    if (!trendsRes.ok) {
      throw new Error(`Failed to load trends: ${trendsRes.status}`);
    }
    const trends: TrendRecord[] = await trendsRes.json();

    const signalsRes = await supabaseRequest(
      "trend_signals?select=trend_id,source,metric,value,captured_at&order=captured_at.desc"
    );
    if (!signalsRes.ok) {
      throw new Error(`Failed to load trend signals: ${signalsRes.status}`);
    }
    const signals: (TrendSignalPoint & { trend_id: string })[] =
      await signalsRes.json();

    // Signals arrive newest-first, so the first one seen per
    // (trend, source, metric) combination is the latest value.
    const latestByKey = new Map<string, TrendSignalPoint & { trend_id: string }>();
    for (const signal of signals) {
      const key = `${signal.trend_id}:${signal.source}:${signal.metric}`;
      if (!latestByKey.has(key)) {
        latestByKey.set(key, signal);
      }
    }

    // Daily pageview history per trend (oldest → newest) for trend lines.
    const historyByTrend = new Map<string, { captured_at: string; value: number }[]>();
    for (const signal of signals) {
      if (signal.source !== "wikipedia" || signal.metric !== "pageviews") continue;
      const list = historyByTrend.get(signal.trend_id) ?? [];
      list.push({ captured_at: signal.captured_at, value: signal.value });
      historyByTrend.set(signal.trend_id, list);
    }

    const result: TrendSummary[] = trends.map((trend) => ({
      trend,
      latestSignals: Array.from(latestByKey.values())
        .filter((s) => s.trend_id === trend.id)
        .map(({ source, metric, value, captured_at }) => ({
          source,
          metric,
          value,
          captured_at
        })),
      history: (historyByTrend.get(trend.id) ?? []).sort((a, b) =>
        a.captured_at < b.captured_at ? -1 : 1
      )
    }));

    const response: TrendsResponse = { trends: result };
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
