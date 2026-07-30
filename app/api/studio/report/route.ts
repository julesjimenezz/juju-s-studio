import { NextRequest, NextResponse } from "next/server";
import {
  ANALYTICS_PROPERTY,
  ANALYTICS_SYSTEM_NOTE
} from "../../../lib/analyticsSchema";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "../../../lib/rateLimit";
import { trendById, type PoolTrend } from "../../../lib/trendPool";

export const runtime = "nodejs";

// The final step of the guided Studio flow: the brand, the trends the
// user chose, and everything they told us along the way go in — one
// complete, connected strategy comes out. This is the "full outcome"
// the whole funnel builds toward.
const REPORT_TOOL = {
  name: "generate_strategy_report",
  description:
    "Produce one complete, connected brand strategy built on the chosen trends.",
  input_schema: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "A punchy 2-5 word name for this strategy."
      },
      positioning: {
        type: "string",
        description:
          "2-3 sentences: the single point of view that connects the chosen trends for this brand. The thesis of the whole strategy."
      },
      trendPlays: {
        type: "array",
        minItems: 1,
        maxItems: 6,
        description: "One play per chosen trend.",
        items: {
          type: "object",
          properties: {
            trendName: { type: "string" },
            play: {
              type: "string",
              description:
                "1-2 sentences: the specific move this brand should make on this trend."
            }
          },
          required: ["trendName", "play"]
        }
      },
      campaign: {
        type: "object",
        properties: {
          name: { type: "string", description: "A punchy 2-4 word campaign name." },
          tagline: { type: "string" },
          pillars: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            items: { type: "string" }
          }
        },
        required: ["name", "tagline", "pillars"]
      },
      productPlays: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" },
        description:
          "Three concrete product/merchandising moves: hero products, bundles, edits, or retail moments."
      },
      customer: {
        type: "object",
        properties: {
          who: { type: "string", description: "Who this customer is, one sentence." },
          want: { type: "string", description: "What they want, one sentence." },
          barrier: { type: "string", description: "What's stopping them, one sentence." },
          where: { type: "string", description: "Where to reach them, one sentence." }
        },
        required: ["who", "want", "barrier", "where"]
      },
      social: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            channel: { type: "string", enum: ["TikTok", "Reels", "Pinterest", "UGC", "Email"] },
            idea: { type: "string" }
          },
          required: ["channel", "idea"]
        }
      },
      whyThisWorks: {
        type: "string",
        description:
          "2-3 sentences: why this connected strategy is the right move for this specific brand."
      },
      nextSteps: {
        type: "array",
        minItems: 5,
        maxItems: 5,
        items: { type: "string" },
        description:
          "Five short, concrete, ordered next steps. Each starts with a verb."
      },
      analytics: ANALYTICS_PROPERTY
    },
    required: [
      "title",
      "positioning",
      "trendPlays",
      "campaign",
      "productPlays",
      "customer",
      "social",
      "whyThisWorks",
      "nextSteps",
      "analytics"
    ]
  }
};

export async function POST(req: NextRequest) {
  let body: {
    accessCode?: string;
    brand?: string;
    location?: string;
    audience?: string;
    notes?: string;
    finalNote?: string;
    chosenIds?: string[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { accessCode, brand, location, audience, notes, finalNote } = body;
  const chosenIds = Array.isArray(body.chosenIds) ? body.chosenIds : [];

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
  if (chosenIds.length === 0) {
    return NextResponse.json(
      { error: "Pick at least one trend before generating the strategy." },
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

  const chosen = chosenIds
    .map((id) => trendById(id))
    .filter((t): t is PoolTrend => Boolean(t))
    .map(
      (t) =>
        `- ${t.name} [${t.category}, ${t.trajectory}]: ${t.description} (Source: ${t.source}) Audience: ${t.audience}. Channels: ${t.channels.join(", ")}.`
    )
    .join("\n");

  const context = [
    `Brand: ${brand.trim()}`,
    location ? `Location / market: ${location.trim()}` : "",
    audience ? `Audience: ${audience.trim()}` : "",
    notes ? `Additional context: ${notes.trim()}` : "",
    finalNote ? `Final direction from the team: ${finalNote.trim()}` : ""
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
        max_tokens: 3000,
        temperature: 1,
        system:
          "You are the strategy engine behind Juju's Studio. A real brand has described itself, browsed real published upcoming-trend forecasts, and chosen the ones they believe in. Your job is to weave their chosen trends into ONE connected strategy — campaign, product, customer, social — all derived from the same trends and speaking to each other. Be concrete and specific to this brand; never generic filler. Keep the tone editorial and confident, matching a luxury fashion/beauty brand voice." +
          ANALYTICS_SYSTEM_NOTE,
        messages: [
          {
            role: "user",
            content: `THE BRAND AND EVERYTHING THEY TOLD US:\n${context}\n\nTHE TRENDS THEY CHOSE:\n${chosen}\n\nBuild the full connected strategy.`
          }
        ],
        tools: [REPORT_TOOL],
        tool_choice: { type: "tool", name: "generate_strategy_report" }
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

    return NextResponse.json({ report: toolUse.input });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
