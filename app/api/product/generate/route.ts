import { NextRequest, NextResponse } from "next/server";
import {
  ANALYTICS_PROPERTY,
  ANALYTICS_SYSTEM_NOTE
} from "../../../lib/analyticsSchema";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "../../../lib/rateLimit";

export const runtime = "nodejs";

// Forces Claude to return a structured object matching the same shape
// used by the preset product opportunities in ProductStudio.tsx.
const PRODUCT_TOOL = {
  name: "generate_product_opportunity",
  description:
    "Return a structured product/merchandising opportunity for the brand or trend described by the user.",
  input_schema: {
    type: "object",
    properties: {
      trend: {
        type: "string",
        description:
          "A short 2-5 word name for the trend or strategic angle this product edit is built around, based on what the user described."
      },
      trendCategory: {
        type: "string",
        enum: ["Fashion", "Beauty", "Cross-Category"]
      },
      editName: {
        type: "string",
        description: "A punchy 2-5 word name for this product edit/collection."
      },
      tagline: {
        type: "string",
        description: "A short, punchy one-line tagline."
      },
      insight: {
        type: "string",
        description:
          "1-2 sentences on the customer or market insight this product edit is grounded in."
      },
      heroProducts: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 5,
        description: "3-5 specific hero product names for this edit."
      },
      bundle: {
        type: "object",
        properties: {
          name: { type: "string" },
          contents: { type: "string" },
          note: { type: "string" }
        },
        required: ["name", "contents", "note"]
      },
      whyThisWorks: {
        type: "string",
        description:
          "1-2 short sentences explaining WHY this product edit is the right move for this brand — the reasoning behind it, in plain language."
      },
      crossSell: {
        type: "string",
        description: "A specific cross-sell or add-on opportunity."
      },
      retailAngle: {
        type: "string",
        description: "1-2 sentences on the retail strategy angle for this edit."
      },
      nextSteps: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" },
        description:
          "Three short, easy, concrete next steps to bring this edit to market. Each short and action-oriented (start with a verb)."
      },
      analytics: ANALYTICS_PROPERTY
    },
    required: [
      "trend",
      "trendCategory",
      "editName",
      "tagline",
      "insight",
      "whyThisWorks",
      "heroProducts",
      "bundle",
      "crossSell",
      "retailAngle",
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
          "You are the merchandising strategy engine behind Juju's Studio, an AI tool that turns fashion and beauty trends into product and merchandising opportunities for brand teams. Given a brand, product, or trend description from a real company, produce one sharp, specific, on-brand product opportunity by calling the generate_product_opportunity tool. Keep the tone editorial and confident, matching a luxury fashion/beauty brand voice. Be concrete and specific to what the user described, never generic filler." +
          ANALYTICS_SYSTEM_NOTE,
        messages: [
          {
            role: "user",
            content: `Build a product/merchandising opportunity for the following brand, product, or trend context:\n\n${brandContext.trim()}`
          }
        ],
        tools: [PRODUCT_TOOL],
        tool_choice: { type: "tool", name: "generate_product_opportunity" }
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

    return NextResponse.json({ opportunity: toolUse.input });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
