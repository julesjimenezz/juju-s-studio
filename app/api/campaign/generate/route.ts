import { NextRequest, NextResponse } from "next/server";
import {
  ANALYTICS_PROPERTY,
  ANALYTICS_SYSTEM_NOTE
} from "../../../lib/analyticsSchema";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "../../../lib/rateLimit";

export const runtime = "nodejs";

// Forces Claude to return a structured object matching the same shape
// used by the preset campaigns in CampaignLab.tsx, instead of free text.
const CAMPAIGN_TOOL = {
  name: "generate_campaign_brief",
  description:
    "Return a structured fashion/beauty marketing campaign brief for the brand or trend described by the user.",
  input_schema: {
    type: "object",
    properties: {
      trend: {
        type: "string",
        description:
          "A short 2-5 word name for the trend or strategic angle this campaign is built around, based on what the user described."
      },
      trendCategory: {
        type: "string",
        enum: ["Fashion", "Beauty", "Cross-Category"]
      },
      campaignName: {
        type: "string",
        description: "A punchy 2-4 word campaign name."
      },
      tagline: {
        type: "string",
        description: "A short, punchy one-line tagline."
      },
      insight: {
        type: "string",
        description:
          "1-2 sentences on the customer or market insight this campaign is grounded in."
      },
      pillars: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 3,
        description: "Three short campaign pillar names."
      },
      social: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            channel: { type: "string", enum: ["TikTok", "Reels", "UGC"] },
            idea: { type: "string" }
          },
          required: ["channel", "idea"]
        }
      },
      email: {
        type: "object",
        properties: {
          subject: { type: "string" },
          concept: { type: "string" }
        },
        required: ["subject", "concept"]
      },
      influencer: {
        type: "object",
        properties: {
          archetype: { type: "string" },
          ask: { type: "string" }
        },
        required: ["archetype", "ask"]
      },
      whyThisWorks: {
        type: "string",
        description:
          "1-2 short sentences explaining WHY this campaign is the right move for this brand — the reasoning/insight behind the recommendation, in plain language."
      },
      nextSteps: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" },
        description:
          "Three short, easy, concrete next steps the team can take to act on this campaign. Each one short and action-oriented (start with a verb)."
      },
      analytics: ANALYTICS_PROPERTY
    },
    required: [
      "trend",
      "trendCategory",
      "campaignName",
      "tagline",
      "insight",
      "pillars",
      "social",
      "email",
      "influencer",
      "whyThisWorks",
      "nextSteps",
      "analytics"
    ]
  }
};

export async function POST(req: NextRequest) {
  let body: { accessCode?: string; brandContext?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { accessCode, brandContext } = body;

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
          "Tell us a bit more about the brand, product, or trend angle first."
      },
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
          "You are the strategy engine behind Juju's Studio, an AI tool that turns fashion and beauty trends into campaign concepts for brand teams. Given a brand, product, or trend description from a real company, produce one sharp, specific, on-brand campaign brief by calling the generate_campaign_brief tool. Keep the tone editorial and confident, matching a luxury fashion/beauty brand voice. Be concrete and specific to what the user described, never generic filler." +
          ANALYTICS_SYSTEM_NOTE,
        messages: [
          {
            role: "user",
            content: `Build a campaign brief for the following brand, product, or trend context:\n\n${brandContext.trim()}`
          }
        ],
        tools: [CAMPAIGN_TOOL],
        tool_choice: { type: "tool", name: "generate_campaign_brief" }
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

    return NextResponse.json({ campaign: toolUse.input });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
