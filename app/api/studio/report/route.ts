import { NextRequest, NextResponse } from "next/server";
import {
  ANALYTICS_PROPERTY,
  ANALYTICS_SYSTEM_NOTE
} from "../../../lib/analyticsSchema";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "../../../lib/rateLimit";
import { trendById, type PoolTrend } from "../../../lib/trendPool";

export const runtime = "nodejs";

// Vercel's default function ceiling is 10s. This route calls the model
// twice (in parallel) and each call takes ~15-20s, so without this the
// request is killed mid-flight and the user sees nothing at all.
export const maxDuration = 60;

/*
 * WHY THIS ROUTE MAKES TWO CALLS INSTEAD OF ONE
 *
 * The first version asked for the entire strategy in a single generation:
 * ten top-level fields, several of them arrays of objects. It failed
 * reliably. The model would get partway through, start writing a nested
 * array as raw parameter markup instead of structured data, and everything
 * after that point was lost — the route then returned a corrupt object with
 * a 200, and the browser crashed trying to render it.
 *
 * Two things fix it, and both are in here:
 *
 * 1. No arrays of objects. Every list in these schemas is a list of plain
 *    strings. Where the UI needs paired data (a trend and its play, a
 *    channel and its idea) we ask for parallel string arrays and zip them
 *    on the server. For the trend plays this is strictly better than what
 *    it replaced: the trend names now come from the pool rather than from
 *    the model, so they are always the ones the user actually picked.
 *
 * 2. Two smaller generations instead of one large one. Splitting the work
 *    puts each call comfortably inside the size where structured output is
 *    dependable — roughly the size of the four module routes, which have
 *    never had this problem. They run in parallel, so the whole thing is
 *    also faster than the single call it replaced.
 *
 * Both calls are validated before anything is returned, and each retries
 * once on malformed output. A bad generation now costs a retry, not a
 * broken page.
 */

// Each chosen trend gets its own play. These are generated as separate
// scalar properties (play1, play2, ...) rather than as one array, because
// the model reliably derails when asked to emit a multi-item array here:
// it writes the array's ELEMENTS as raw parameter markup instead of as
// structured items, which corrupts the whole object and drops every field
// after it. Individual string properties never do this. The server zips
// them back into the paired shape the client expects.
const playKeys = (trendCount: number): string[] =>
  Array.from({ length: trendCount }, (_, i) => `play${i + 1}`);

function buildCoreTool(trendCount: number, trendNames: string[]) {
  const keys = playKeys(trendCount);
  const playProps: Record<string, { type: string; description: string }> = {};
  keys.forEach((key, i) => {
    playProps[key] = {
      type: "string",
      description: `The play for trend ${i + 1}, "${trendNames[i]}". 1-2 sentences: the specific move this brand should make on this trend. Do not restate the trend name; just give the play.`
    };
  });

  return {
    name: "generate_strategy_core",
    description:
      "Produce the connected brand strategy: positioning, plays, campaign, product, and customer.",
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
        // One scalar property per chosen trend — play1, play2, ... playN.
        // See playKeys() above for why these are not a single array.
        ...playProps,
        campaignName: {
          type: "string",
          description: "A punchy 2-4 word campaign name."
        },
        campaignTagline: { type: "string", description: "A short, punchy one-line tagline." },
        campaignPillars: {
          type: "array",
          minItems: 3,
          maxItems: 3,
          items: { type: "string" },
          description: "Three short campaign pillar names."
        },
        productPlays: {
          type: "array",
          minItems: 3,
          maxItems: 3,
          items: { type: "string" },
          description:
            "Three concrete product/merchandising moves: hero products, bundles, edits, or retail moments."
        },
        customerWho: { type: "string", description: "Who this customer is, one sentence." },
        customerWant: { type: "string", description: "What they want, one sentence." },
        customerBarrier: {
          type: "string",
          description: "What is stopping them, one sentence."
        },
        customerWhere: {
          type: "string",
          description: "Where to reach them, one sentence."
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
        }
      },
      required: [
        "title",
        "positioning",
        ...keys,
        "campaignName",
        "campaignTagline",
        "campaignPillars",
        "productPlays",
        "customerWho",
        "customerWant",
        "customerBarrier",
        "customerWhere",
        "whyThisWorks",
        "nextSteps"
      ]
    }
  };
}

const CHANNELS_TOOL = {
  name: "generate_channel_plan",
  description:
    "Produce the social content directions and the quantified strategic assessment for this strategy.",
  input_schema: {
    type: "object",
    properties: {
      socialChannels: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "string",
          enum: ["TikTok", "Reels", "Pinterest", "UGC", "Email"]
        },
        description: "Three channels, best first."
      },
      socialIdeas: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" },
        description:
          "Three content ideas — one for each channel above, in the SAME ORDER. Each 1-2 sentences and specific to this brand."
      },
      analytics: ANALYTICS_PROPERTY
    },
    required: ["socialChannels", "socialIdeas", "analytics"]
  }
};

const isText = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;
const isTextArray = (v: unknown, len?: number): v is string[] =>
  Array.isArray(v) &&
  v.length > 0 &&
  v.every(isText) &&
  (len === undefined || v.length === len);

function validateCore(input: unknown, trendCount: number): string | null {
  if (!input || typeof input !== "object") return "not an object";
  const r = input as Record<string, unknown>;
  const strings = [
    "title",
    "positioning",
    "campaignName",
    "campaignTagline",
    "customerWho",
    "customerWant",
    "customerBarrier",
    "customerWhere",
    "whyThisWorks"
  ];
  for (const key of strings) {
    if (!isText(r[key])) return key;
  }
  for (const key of playKeys(trendCount)) {
    if (!isText(r[key])) return key;
  }
  if (!isTextArray(r.campaignPillars, 3)) return "campaignPillars";
  if (!isTextArray(r.productPlays, 3)) return "productPlays";
  if (!isTextArray(r.nextSteps, 5)) return "nextSteps";
  return null;
}

function validateChannels(input: unknown): string | null {
  if (!input || typeof input !== "object") return "not an object";
  const r = input as Record<string, unknown>;
  if (!isTextArray(r.socialChannels, 3)) return "socialChannels";
  if (!isTextArray(r.socialIdeas, 3)) return "socialIdeas";
  const a = r.analytics as Record<string, unknown> | undefined;
  if (!a || typeof a !== "object") return "analytics";
  if (typeof a.momentum !== "number" || typeof a.opportunityScore !== "number")
    return "analytics scores";
  if (!isText(a.audienceFit) || !isText(a.primaryChannel) || !isText(a.launchWindow))
    return "analytics labels";
  if (!Array.isArray(a.channelPriority) || a.channelPriority.length === 0)
    return "analytics channelPriority";
  if (!Array.isArray(a.audienceSegments) || a.audienceSegments.length === 0)
    return "analytics audienceSegments";
  return null;
}

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

  const chosenTrends = chosenIds
    .map((id) => trendById(id))
    .filter((t): t is PoolTrend => Boolean(t));

  if (chosenTrends.length === 0) {
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

  const chosen = chosenTrends
    .map(
      (t, i) =>
        `${i + 1}. ${t.name} [${t.category}, ${t.trajectory}]: ${t.description} (Source: ${t.source}) Audience: ${t.audience}. Channels: ${t.channels.join(", ")}.`
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

  const brief = `THE BRAND AND EVERYTHING THEY TOLD US:\n${context}\n\nTHE ${chosenTrends.length} TRENDS THEY CHOSE (in order):\n${chosen}`;

  const BASE_SYSTEM =
    "You are the strategy engine behind Juju's Studio. A real brand has described itself, browsed real published upcoming-trend forecasts, and chosen the ones they believe in. Your job is to weave their chosen trends into ONE connected strategy — campaign, product, customer, social — all derived from the same trends and speaking to each other. Be concrete and specific to this brand; never generic filler. Keep the tone editorial and confident, matching a luxury fashion/beauty brand voice.";

  type Attempt =
    | { ok: true; input: Record<string, unknown> }
    | { ok: false; error: string; hard: boolean };

  async function callModel(
    tool: object,
    toolName: string,
    system: string,
    userContent: string,
    maxTokens: number
  ): Promise<Attempt> {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey as string,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: maxTokens,
        system,
        messages: [{ role: "user", content: userContent }],
        tools: [tool],
        tool_choice: { type: "tool", name: toolName }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        ok: false,
        hard: true,
        error: `AI provider error (${response.status}): ${errText.slice(0, 300)}`
      };
    }

    const data = await response.json();

    if (data.stop_reason === "max_tokens") {
      return { ok: false, hard: false, error: "ran out of room" };
    }

    const toolUse = (data.content ?? []).find(
      (block: { type: string }) => block.type === "tool_use"
    );
    if (!toolUse) {
      return { ok: false, hard: false, error: "no tool_use block" };
    }

    return { ok: true, input: toolUse.input as Record<string, unknown> };
  }

  // Up to two attempts per call. Large structured generations occasionally
  // come back malformed; one clean retry is cheaper for the user than an
  // error asking them to press the button again themselves.
  async function generate(
    tool: object,
    toolName: string,
    userContent: string,
    maxTokens: number,
    validate: (input: unknown) => string | null
  ): Promise<{ ok: true; input: Record<string, unknown> } | { ok: false; error: string }> {
    let problem = "unknown";
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const result = await callModel(tool, toolName, BASE_SYSTEM, userContent, maxTokens);
      if (!result.ok) {
        if (result.hard) return { ok: false, error: result.error };
        problem = result.error;
        continue;
      }
      const invalid = validate(result.input);
      if (invalid) {
        problem = `malformed field: ${invalid}`;
        continue;
      }
      return { ok: true, input: result.input };
    }
    return { ok: false, error: problem };
  }

  try {
    const [core, channels] = await Promise.all([
      generate(
        buildCoreTool(chosenTrends.length, chosenTrends.map((t) => t.name)),
        "generate_strategy_core",
        `${brief}\n\nBuild the connected strategy: positioning, one play per trend, the campaign, the product moves, and the customer.`,
        3000,
        (input) => validateCore(input, chosenTrends.length)
      ),
      generate(
        CHANNELS_TOOL,
        "generate_channel_plan",
        `${brief}\n\nBuild the social content plan and your quantified strategic assessment for this brand.${ANALYTICS_SYSTEM_NOTE}`,
        1600,
        validateChannels
      )
    ]);

    if (!core.ok || !channels.ok) {
      const detail = [core.ok ? null : `core: ${core.error}`, channels.ok ? null : `channels: ${channels.error}`]
        .filter(Boolean)
        .join("; ");
      const providerError = [core.ok ? "" : core.error, channels.ok ? "" : channels.error].find(
        (e) => e && e.startsWith("AI provider error")
      );
      return NextResponse.json(
        {
          error:
            providerError ||
            "Your strategy came back incomplete. Give it one more try — if it keeps happening, try picking a few fewer trends.",
          detail
        },
        { status: 502 }
      );
    }

    const c = core.input;
    const ch = channels.input;
    const plays = playKeys(chosenTrends.length).map((key) => c[key] as string);
    const socialChannels = ch.socialChannels as string[];
    const socialIdeas = ch.socialIdeas as string[];

    const report = {
      title: c.title,
      positioning: c.positioning,
      // Trend names come from the pool, not the model — they are always
      // exactly the trends the user picked.
      trendPlays: chosenTrends.map((t, i) => ({
        trendName: t.name,
        play: plays[i]
      })),
      campaign: {
        name: c.campaignName,
        tagline: c.campaignTagline,
        pillars: c.campaignPillars
      },
      productPlays: c.productPlays,
      customer: {
        who: c.customerWho,
        want: c.customerWant,
        barrier: c.customerBarrier,
        where: c.customerWhere
      },
      social: socialChannels.map((channel, i) => ({
        channel,
        idea: socialIdeas[i]
      })),
      whyThisWorks: c.whyThisWorks,
      nextSteps: c.nextSteps,
      analytics: ch.analytics
    };

    return NextResponse.json({ report });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
