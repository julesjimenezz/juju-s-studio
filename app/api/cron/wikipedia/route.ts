import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRequest } from "../../../lib/supabase";

export const runtime = "nodejs";

// Wikimedia's Pageviews API is official, keyless, and free. It returns
// REAL daily pageview history for any article, so a single run can backfill
// months of genuine "search interest over time" data — no waiting days for
// a chart to fill in. Wikimedia asks for a descriptive User-Agent with a
// contact; that's a courtesy of a free public API, not a paid dependency.
const WIKI_USER_AGENT =
  "JujusStudio/1.0 (https://juju-s-studio.vercel.app; contact: julesjimenez04@gmail.com) trend-analytics";

// How many days of history to pull per run. The daily job keeps the tail
// fresh; the first run backfills the whole window.
const DAYS_OF_HISTORY = 90;

type TrendRow = {
  id: string;
  slug: string;
  wikipedia_title: string | null;
};

function yyyymmdd(date: Date): string {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

// Wikimedia item timestamps look like "2026040100" (YYYYMMDDHH).
// Convert to an ISO midnight-UTC timestamp so each day is one stable point.
function wikiTsToIso(ts: string): string | null {
  if (typeof ts !== "string" || ts.length < 8) return null;
  const y = ts.slice(0, 4);
  const m = ts.slice(4, 6);
  const d = ts.slice(6, 8);
  return `${y}-${m}-${d}T00:00:00Z`;
}

export async function POST(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");

  if (!expected) {
    return NextResponse.json(
      { error: "This endpoint isn't configured yet (missing CRON_SECRET on the server)." },
      { status: 500 }
    );
  }
  if (authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "This endpoint isn't configured yet (missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on the server)."
      },
      { status: 500 }
    );
  }

  const startedAt = new Date().toISOString();
  const notes: string[] = [];
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  let pointsWritten = 0;

  try {
    const trendsRes = await supabaseRequest(
      "trends?select=id,slug,wikipedia_title"
    );
    if (!trendsRes.ok) {
      throw new Error(`Failed to load trends from Supabase: ${trendsRes.status}`);
    }
    const trends: TrendRow[] = await trendsRes.json();

    const today = new Date();
    const start = new Date(today);
    start.setUTCDate(start.getUTCDate() - DAYS_OF_HISTORY);
    const startStr = yyyymmdd(start);
    const endStr = yyyymmdd(today);

    for (const trend of trends) {
      if (!trend.wikipedia_title) {
        skippedCount++;
        notes.push(`${trend.slug}: no wikipedia_title configured, skipped`);
        continue;
      }

      try {
        const article = encodeURIComponent(
          trend.wikipedia_title.replace(/ /g, "_")
        );
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${article}/daily/${startStr}/${endStr}`;

        const wikiRes = await fetch(url, {
          headers: { "User-Agent": WIKI_USER_AGENT }
        });

        if (!wikiRes.ok) {
          failCount++;
          notes.push(`${trend.slug}: Wikimedia API returned ${wikiRes.status}`);
          continue;
        }

        const data = await wikiRes.json();
        const items = Array.isArray(data.items) ? data.items : [];

        const rows = items
          .map((item: { timestamp?: string; views?: number }) => {
            const iso = item.timestamp ? wikiTsToIso(item.timestamp) : null;
            if (!iso || typeof item.views !== "number") return null;
            return {
              trend_id: trend.id,
              source: "wikipedia",
              metric: "pageviews",
              value: item.views,
              captured_at: iso
            };
          })
          .filter(Boolean);

        if (rows.length === 0) {
          failCount++;
          notes.push(`${trend.slug}: no pageview data returned`);
          continue;
        }

        // Upsert on the unique (trend_id, source, metric, captured_at) index
        // so re-runs update existing days instead of duplicating them.
        const insertRes = await supabaseRequest(
          "trend_signals?on_conflict=trend_id,source,metric,captured_at",
          {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(rows)
          }
        );

        if (!insertRes.ok) {
          const errText = await insertRes.text();
          failCount++;
          notes.push(
            `${trend.slug}: fetched ${rows.length} days but failed to store (${insertRes.status}: ${errText.slice(0, 120)})`
          );
          continue;
        }

        successCount++;
        pointsWritten += rows.length;
      } catch (err) {
        failCount++;
        notes.push(
          `${trend.slug}: ${err instanceof Error ? err.message : "unknown error"}`
        );
      }
    }

    const status: "ok" | "partial" | "failed" =
      failCount === 0 ? "ok" : successCount > 0 ? "partial" : "failed";

    await supabaseRequest("aggregation_runs", {
      method: "POST",
      body: JSON.stringify({
        started_at: startedAt,
        finished_at: new Date().toISOString(),
        source: "wikipedia",
        status,
        notes:
          `points written: ${pointsWritten}. ` + (notes.join("; ") || "all ok")
      })
    });

    return NextResponse.json({
      status,
      successCount,
      failCount,
      skippedCount,
      pointsWritten,
      notes
    });
  } catch (err) {
    await supabaseRequest("aggregation_runs", {
      method: "POST",
      body: JSON.stringify({
        started_at: startedAt,
        finished_at: new Date().toISOString(),
        source: "wikipedia",
        status: "failed",
        notes: err instanceof Error ? err.message : "unknown error"
      })
    }).catch(() => {});

    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
