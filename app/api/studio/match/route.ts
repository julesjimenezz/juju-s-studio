import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "../../../lib/rateLimit";
import { poolForPrompt, TREND_POOL_IDS } from "../../../lib/trendPool";

export const runtime = "nodejs";

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

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 2500,
        temperature: 1,
        system:
          "You are the trend-matching engine behind Juju's Studio. You are given a pool of real, published upcoming fashion/beauty/culture trend forecasts (each compiled from a named source) and a description of a real brand. Select the trends from the pool most relevant to that brand's realm, audience, and market, and explain each fit concretely. Only use trends from the pool — the schema enforces this. Rank by fit, best first. If refinement context (location, audience, notes) is provided, weight it heavily.",
        messages: [
          {
            role: "user",
            content: `THE TREND POOL:\n${poolForPrompt(excludeIds)}\n\nTHE BRAND:\n${context}\n\nSelect and rank the best-fitting trends.`
          }
        ],
        tools: [MATCH_TOOL],
        tool_choice: { type: "tool", name: "match_trends" }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `AI provider error (${response.status}): ${errText.slice(0, 300)}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const toolUse = (data.content ?? []).find(
      (block: { type: string }) => block.type === "tool_use"
    );

    if (!toolUse) {
      return NextResponse.json(
        { error: "The AI response didn't come back in the expected format. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result: toolUse.input });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
