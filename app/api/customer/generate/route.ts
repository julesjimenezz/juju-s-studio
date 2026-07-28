import { NextRequest, NextResponse } from "next/server";
import {
  ANALYTICS_PROPERTY,
  ANALYTICS_SYSTEM_NOTE
} from "../../../lib/analyticsSchema";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "../../../lib/rateLimit";

export const runtime = "nodejs";

// Forces Claude to return a structured object matching the same shape
// used by the preset customer profiles in CustomerInsightBoard.tsx.
const CUSTOMER_TOOL = {
  name: "generate_customer_profile",
  description:
    "Return a structured customer/shopper profile for the brand or trend described by the user.",
  input_schema: {
    type: "object",
    properties: {
      trend: {
        type: "string",
        description:
          "A short 2-5 word name for the trend or strategic angle this persona is built around, based on what the user described."
      },
      trendCategory: {
        type: "string",
        enum: ["Fashion", "Beauty", "Cross-Category"]
      },
      personaName: {
        type: "string",
        description: "A short, memorable 2-4 word persona name (e.g. 'The Quiet Power Player')."
      },
      tagline: {
        type: "string",
        description: "A short one-line tagline in the persona's implied voice/perspective, gender-neutral (they/them), starting with 'They want' or similar."
      },
      insight: {
        type: "string",
        description: "1-2 sentences on the customer or market insight this persona is grounded in."
      },
      whyThisWorks: {
        type: "string",
        description:
          "1-2 short sentences explaining WHY this shopper is worth building for right now — the strategic reasoning, in plain language."
      },
      whatTheyWant: {
        type: "string",
        description: "1-2 sentences on what this persona specifically wants."
      },
      quote: {
        type: "string",
        description: "A short first-person quote in this persona's voice (1 sentence)."
      },
      barriers: {
        type: "array",
        items: { type: "string" },
        minItems: 2,
        maxItems: 3,
        description: "2-3 specific barriers or objections holding this persona back."
      },
      howToReachThem: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            channel: { type: "string" },
            approach: { type: "string" }
          },
          required: ["channel", "approach"]
        },
        description: "3 channel + approach pairs for reaching this persona."
      },
      nextSteps: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" },
        description:
          "Three short, easy, concrete next steps a brand can take to reach and win this shopper. Each short and action-oriented (start with a verb)."
      },
      analytics: ANALYTICS_PROPERTY
    },
    required: [
      "trend",
      "trendCategory",
      "personaName",
      "tagline",
      "insight",
      "whyThisWorks",
      "whatTheyWant",
      "quote",
      "barriers",
      "howToReachThem",
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
        max_tokens: 2500,
        temperature: 1,
        system:
          "You are the customer strategy engine behind Juju's Studio, an AI tool that turns fashion and beauty trends into shopper personas for brand teams. Given a brand, product, or trend description from a real company, produce one sharp, specific customer profile by calling the generate_customer_profile tool. Always use gender-neutral they/them language for the persona, never she/her or he/him. Keep the tone editorial and confident, matching a luxury fashion/beauty brand voice. Be concrete and specific to what the user described, never generic filler." +
          ANALYTICS_SYSTEM_NOTE,
        messages: [
          {
            role: "user",
            content: `Build a customer profile for the following brand, product, or trend context:\n\n${brandContext.trim()}`
          }
        ],
        tools: [CUSTOMER_TOOL],
        tool_choice: { type: "tool", name: "generate_customer_profile" }
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

    return NextResponse.json({ profile: toolUse.input });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
