"use client";

// The access-code field, shared by all four Generate panels.
//
// Why this changed: a recruiter opening the site cold used to hit an empty
// password box with no way past it. The most persuasive thing about Juju's
// Studio — that it runs real AI, not screenshots — was locked behind a door
// only Jules could open. That's backwards for the audience the site exists
// for.
//
// So: when NEXT_PUBLIC_SITE_ACCESS_CODE is set, the field arrives pre-filled
// and reads as an invitation rather than a barrier. When it is NOT set, this
// behaves exactly as before (empty password field), so nothing breaks if the
// variable is ever removed. Cost is controlled by the per-IP rate limiter in
// app/lib/rateLimit.ts, not by the code being secret.

export const DEMO_ACCESS_CODE =
  process.env.NEXT_PUBLIC_SITE_ACCESS_CODE ?? "";

const STORAGE_KEY = "jj_access_code";

// Used as the useState initializer in every panel: a code the visitor already
// entered wins, otherwise the demo code, otherwise empty.
//
// The server and a fresh client both fall back to the same build-time-inlined
// demo code, so the pre-filled field doesn't cause a hydration mismatch.
export function initialAccessCode(): string {
  if (typeof window === "undefined") return DEMO_ACCESS_CODE;
  return window.localStorage.getItem(STORAGE_KEY) || DEMO_ACCESS_CODE;
}

export function rememberAccessCode(code: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, code);
  }
}

export function AccessCodeField({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      required
      type={DEMO_ACCESS_CODE ? "text" : "password"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Access code"
      aria-label="Access code"
      autoComplete="off"
      className="rounded-[1rem] border border-[#2B211C]/15 bg-[#F8F4ED] p-4 text-sm text-[#2B211C] outline-none focus:border-[#3B5D4A]"
    />
  );
}

// The line of copy that sits under each panel's heading. Swaps the old
// "Access is limited to approved teams" gatekeeping line for an open door
// whenever a demo code is configured.
export function AccessNote() {
  if (!DEMO_ACCESS_CODE) {
    return (
      <span className="text-[#2B211C]/70">
        Access is limited to approved teams.
      </span>
    );
  }
  return (
    <span className="text-[#3B5D4A]">
      The access code is filled in for you &mdash; just describe a brand and
      generate.
    </span>
  );
}
