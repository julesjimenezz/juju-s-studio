import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "../../../lib/rateLimit";
import { poolForPrompt, TREND_POOL_IDS } from "../../../lib/trendPool";

export const runtime = "nodejs";

// Vercel kills a function at 10s by default. These generations run
// well past that, so the ceiling has to be raised explicitly or the
// request dies mid-flight and the user sees nothing at all.
export const maxDuration = 60;

// The matching layer of the guided Studio flow. The AI reads the brand
// description (plus any refinement context) and picks the most relevant
// trends FROM THE POOL — the enum below structurally prevents it from
// inventing a trend that isn't in app/lib/trendPool.ts. It can pick and
// it can explain, but it cannot make something up.
const MATCH_TOOL = {
  name: "match_trends",
  description:
    "Select the upcoming trends from the provided pool that are most relevant to this brand, ranked by fit.",
  input_schema: {
    type: "object",
    properties: {
      realm: {
        type: "string",
        description:
          "A short 3-8 word label for the brand's realm as you understood it, e.g. 'Gen Z clean skincare' or 'Nashville womenswear boutique'."
      },
      matches: {
        type: "array",
        minItems: 6,
        maxItems: 10,
        items: {
          type: "object",
          properties: {
            trendId: {
              type: "string",
              enum: TREND_POOL_IDS,
              description: "The id of a trend from the pool."
            },
            whyItFits: {
              type: "string",
              description:
                "1-2 sentences on why this specific trend fits THIS brand. Concrete, not generic."
            },
            fitScore: {
              type: "integer",
              minimum: 0,
              maximum: 100,
              description:
                "How strong the fit is for this brand (0-100). Your expert estimate."
            }
          },
          required: ["trendId", "whyItFits", "fitScore"]
        }
      }
    },
    required: ["realm", "matches"]
  }
};

const MATCH_SYSTEM =
  "You are the trend-matching engine behind Juju's Studio. You are given a pool of real, published upcoming fashion/beauty/culture trend forecasts (each compiled from a named source) and a description of a real brand. Select the trends from the pool most relevant to that brand's realm, audience, and market, and explain each fit concretely. Only use trends from the pool — the schema enforces this. Rank by fit, best first. If refinement context (location, audience, notes) is provided, weight it heavily.";

type SalvagedMatch = { trendId: string; whyItFits: string; fitScore: number };

// The model occasionally derails part-way through emitting the matches
// array -- the field arrives as a string of raw markup instead of a list,
// or realm goes missing entirely. It is intermittent, and it used to reach
// the user as "we couldn't match any trends to that description", which
// blames her brand description for what is really a model hiccup. Keep
// whatever is usable; the caller retries when nothing is.
function salvageMatches(input: unknown): SalvagedMatch[] {
  const raw = (input as { matches?: unknown } | null)?.matches;
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: SalvagedMatch[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as { trendId?: unknown; whyItFits?: unknown; fitScore?: unknown };
    const trendId = typeof row.trendId === "string" ? row.trendId : "";
    if (!trendId || !TREND_POOL_IDS.includes(trendId) || seen.has(trendId)) continue;
    seen.add(trendId);
    const score = Number(row.fitScore);
    out.push({
      trendId,
      whyItFits: typeof row.whyItFits === "string" ? row.whyItFits.trim() : "",
      fitScore: Number.isFinite(score)
        ? Math.min(100, Math.max(0, Math.round(score)))
        : 70
    });
  }
  return out;
}

// If realm is the field that went missing, the heading reads "Trending in
// your" followed by nothing. A trimmed echo of the brand is a better
// fallback than an empty line -- but only if it reads like a realm and not
// like a sentence chopped mid-clause. "We're an independent womenswear
// boutique in Nashville selling..." should come back as "independent
// womenswear boutique", not trail off after "selling".
const REALM_LEAD_IN =
  /^(?:we\s*[''\u2019]?re|we are|i\s*[''\u2019]?m|i am|it\s*[''\u2019]?s|it is|this is|our brand is|the brand is|we run|we own)\s+(?:\b(?:an|a|the)\b\s*)?/i;

// A trailing modifier starts here; everything before it is the realm.
const REALM_TAIL_START =
  /\s+(?:in|for|with|that|who|selling|serving|targeting|based|located|specialising|specializing)\s+/i;

const REALM_DANGLERS = new Set([
  "a", "an", "the", "and", "or", "but", "for", "with", "to", "in", "on", "at",
  "of", "by", "from", "that", "which", "who", "our", "their", "its", "is",
  "are", "we", "selling", "serving", "targeting", "offering", "making", "based"
]);

function fallbackRealm(brand: string): string {
  // One clause is enough; the rest of her description is supporting detail.
  let s = brand.trim().replace(/\s+/g, " ").replace(REALM_LEAD_IN, "");
  s = s.split(/[,;:.!?]/)[0];

  // Drop the trailing modifier, but only when a real noun phrase survives.
  const cut = s.search(REALM_TAIL_START);
  if (cut > 0 && s.slice(0, cut).trim().split(" ").filter(Boolean).length >= 2) {
    s = s.slice(0, cut);
  }

  const words = s.split(" ").filter(Boolean).slice(0, 7);
  while (
    words.length > 2 &&
    REALM_DANGLERS.has(words[words.length - 1].toLowerCase())
  ) {
    words.pop();
  }

  return words
    .join(" ")
    .replace(/^(a|an|the)\s+/i, "")
    .replace(/[\s,;:.\-]+$/, "");
}

export async function POST(req: NextRequest) {
  let body: {
    accessCode?: string;
    brand?: string;
    location?: string;
    audience?: string;
    notes?: string;
    excludeIds?: string[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { accessCode, brand, location, audience, notes } = body;
  const excludeIds = Array.isArray(body.excludeIds) ? body.excludeIds : [];

  const expectedCode = process.env.SITE_ACCESS_CODE;
  if (!expectedCode) {
    return NextResponse.json(
      { error: "This feature isn't configured yet (missing SITE_ACCESS_CODE on the server)." },
      { status: 500 }
    );
  }
  if (!accessCode || accessCode !== expectedCode) {
    return NextResponse.json({ error: "Invalid access code." }, { status: 401 });
  }

  const limit = checkRateLimit(req);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: RATE_LIMIT_MESSAGE(limit.retryAfterMinutes) },
      { status: 429 }
    );
  }

  if (!brand || brand.trim().length < 8) {
    return NextResponse.json(
      { error: "Tell us a bit more about the brand first." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "This feature isn't configured yet (missing ANTHROPIC_API_KEY on the server)." },
      { status: 500 }
    );
  }

  const context = [
    `Brand: ${brand.trim()}`,
    location ? `Location / market: ${location.trim()}` : "",
    audience ? `Audience: ${audience.trim()}` : "",
    notes ? `Additional context from the team: ${notes.trim()}` : "",
    excludeIds.length
      ? `Already shown (do NOT repeat these ids): ${excludeIds.join(", ")}`
      : ""
  ]
    .filter(Boolean)
    .join("\n");

  const requestBody = JSON.stringify({
    model: "claude-sonnet-5",
    max_tokens: 2500,
    system: MATCH_SYSTEM,
    messages: [
      {
        role: "user",
        content: `THE TREND POOL:\n${poolForPrompt(excludeIds)}\n\nTHE BRAND:\n${context}\n\nSelect and rank the best-fitting trends.`
      }
    ],
    tools: [MATCH_TOOL],
    tool_choice: { type: "tool", name: "match_trends" }
  });

  try {
    let matches: SalvagedMatch[] = [];
    let realm = "";
    let providerError: string | null = null;

    // Two attempts. The array-emitting step derails now and then and a
    // second ask comes back clean; retrying here is far cheaper than
    // making her retype a description that was never the problem.
    for (let attempt = 0; attempt < 2 && matches.length === 0; attempt++) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: requestBody
      });

      if (!response.ok) {
        const errText = await response.text();
        providerError = `AI provider error (${response.status}): ${errText.slice(0, 300)}`;
        // A 4xx is our own bad request and will fail identically on retry.
        if (response.status < 500) break;
        continue;
      }

      const data = await response.json();
      const toolUse = (data.content ?? []).find(
        (block: { type: string }) => block.type === "tool_use"
      );
      if (!toolUse) continue;

      matches = salvageMatches(toolUse.input);
      const got =
        typeof toolUse.input?.realm === "string" ? toolUse.input.realm.trim() : "";
      if (got) realm = got;
    }

    if (matches.length === 0) {
      return NextResponse.json(
        {
          error:
            providerError ??
            "The trend matcher hiccuped on that one. Give it one more try - your description is fine."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      result: { realm: realm || fallbackRealm(brand), matches }
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
