import { NextRequest, NextResponse } from "next/server";
import {
  ANALYTICS_PROPERTY,
  ANALYTICS_SYSTEM_NOTE
} from "../../../lib/analyticsSchema";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "../../../lib/rateLimit";

export const runtime = "nodejs";

type TrendInput = {
  name: string;
  category: string;
  momentum: string;
  insight: string;
  opportunity: string;
  sources: string;
};

export async function POST(req: NextRequest) {
  let body: {
    accessCode?: string;
    brandContext?: string;
    trends?: TrendInput[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { accessCode, brandContext, trends } = body;

  const expectedCode = process.env.SITE_ACCESS_CODE;
  if (!expectedCode) {
    return NextResponse.json(
      {
        error:
          "This feature isn't configured yet (missing SITE_ACCESS_CODE on the server)."
      },
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

  if (!brandContext || brandContext.trim().length < 8) {
    return NextResponse.json(
      {
        error:
          "Tell us a bit more about the brand, product, or category first."
      },
      { status: 400 }
    );
  }

  if (!trends || !Array.isArray(trends) || trends.length === 0) {
    return NextResponse.json(
      { error: "No real trend data was provided to ground this read in." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "This feature isn't configured yet (missing ANTHROPIC_API_KEY on the server)."
      },
      { status: 500 }
    );
  }

  // Force the AI to pick one of the real, already-sourced trends rather than
  // inventing a new one, by baking the exact list of names into an enum.
  const trendNames = trends.map((t) => t.name);

  const TREND_READ_TOOL = {
    name: "generate_personalized_trend_read",
    description:
      "Return a personalized trend read for the brand described by the user, grounded in one of the real, already-sourced trends provided.",
    input_schema: {
      type: "object",
      properties: {
        matchedTrend: {
          type: "string",
          enum: trendNames,
          description:
            "The single best-fit trend for this brand, chosen exactly from the provided real trend list. Do not invent a new trend name."
        },
        whyThisTrend: {
          type: "string",
          description:
            "1-2 sentences on specifically why this trend is the best fit for this brand/product, referencing what the user described."
        },
        personalizedInsight: {
          type: "string",
          description:
            "1-2 sentences translating this trend's customer insight specifically for this brand's likely shopper."
        },
        personalizedOpportunity: {
          type: "string",
          description:
            "1-2 sentences on the specific business opportunity this trend represents for this brand."
        },
        nextStep: {
          type: "string",
          description:
            "One concrete, specific next action this brand could take this season to act on the trend."
        },
        analytics: ANALYTICS_PROPERTY
      },
      required: [
        "matchedTrend",
        "whyThisTrend",
        "personalizedInsight",
        "personalizedOpportunity",
        "nextStep",
        "analytics"
      ]
    }
  };

  const trendSummary = trends
    .map(
      (t) =>
        `- ${t.name} (${t.category}, ${t.momentum}): ${t.insight} Signals: ${t.sources}`
    )
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
        max_tokens: 2000,
        temperature: 1,
        system:
          "You are the trend strategy engine behind Juju's Studio. You are given a fixed list of real, already-sourced 2026 fashion and beauty trends (do not alter, invent, or add to this list) and a description of a real brand. Pick the single trend from the list that's the best fit for that brand, and explain why in a way that's specific to what the user described, never generic filler. Always call the generate_personalized_trend_read tool." +
          ANALYTICS_SYSTEM_NOTE,
        messages: [
          {
            role: "user",
            content: `Real trend list (choose matchedTrend from exactly these names):\n${trendSummary}\n\nBrand/product/category context:\n${brandContext.trim()}`
          }
        ],
        tools: [TREND_READ_TOOL],
        tool_choice: { type: "tool", name: "generate_personalized_trend_read" }
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

    return NextResponse.json({ read: toolUse.input });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
