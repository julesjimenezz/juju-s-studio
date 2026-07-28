// A small guard on the four AI generate routes.
//
// Why this exists: the access code is now printed on the page so a recruiter
// can actually try the product instead of bouncing off a locked field. That
// trade is deliberate, but it means the code is no longer a real barrier —
// so the cost ceiling has to come from somewhere else.
//
// This is a sliding-window counter held in module scope. On Vercel each warm
// serverless instance keeps its own copy, so it is not a globally exact limit;
// it reliably stops one visitor (or one script) from hammering the endpoint,
// which is the realistic abuse case for a portfolio site. The true hard
// backstop is a spend limit set in the Anthropic Console — this layer just
// means you should never get near it.
//
// If this ever needs to be exact, the upgrade is Vercel KV with the same
// interface; nothing calling this would have to change.

const WINDOW_MS = 60 * 60 * 1000; // one hour
const MAX_PER_WINDOW = 6;

const hits = new Map<string, number[]>();

// Keep the map from growing without bound on a long-lived instance.
function prune(now: number) {
  if (hits.size < 500) return;
  for (const [key, times] of hits) {
    const live = times.filter((t) => now - t < WINDOW_MS);
    if (live.length === 0) hits.delete(key);
    else hits.set(key, live);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterMinutes: number;
};

export function checkRateLimit(request: Request): RateLimitResult {
  const now = Date.now();
  prune(now);

  // Vercel sets x-forwarded-for; fall back to a shared bucket locally so the
  // limiter still behaves sensibly in development.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    const oldest = Math.min(...recent);
    const retryAfterMinutes = Math.max(
      1,
      Math.ceil((WINDOW_MS - (now - oldest)) / 60000)
    );
    hits.set(ip, recent);
    return { allowed: false, remaining: 0, retryAfterMinutes };
  }

  recent.push(now);
  hits.set(ip, recent);
  return {
    allowed: true,
    remaining: MAX_PER_WINDOW - recent.length,
    retryAfterMinutes: 0
  };
}

export const RATE_LIMIT_MESSAGE = (minutes: number) =>
  `You've generated a few results already — the demo allows ${MAX_PER_WINDOW} per hour. Try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`;
