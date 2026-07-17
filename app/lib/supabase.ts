// Thin, dependency-free helper for talking to Supabase's auto-generated
// REST API (PostgREST) via plain fetch — deliberately no @supabase/supabase-js
// SDK, matching the site's existing pattern of using raw fetch for the
// Anthropic API. This means no new npm dependency, so nothing new needs
// `pnpm install` to work.
//
// Server-only: uses the Supabase *service role* key, which bypasses row
// security and must never reach the browser. Only ever import this from
// files under app/api/**/route.ts.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Calls Supabase's REST API for a given table/path, e.g.
 * supabaseRequest("trends?select=*") or
 * supabaseRequest("trend_signals", { method: "POST", body: JSON.stringify({...}) }).
 */
export async function supabaseRequest(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Supabase is not configured (missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)."
    );
  }

  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json");
  headers.set("apikey", SUPABASE_SERVICE_ROLE_KEY);
  headers.set("Authorization", `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`);
  if (!headers.has("Prefer")) {
    headers.set("Prefer", "return=representation");
  }

  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers
  });
}
