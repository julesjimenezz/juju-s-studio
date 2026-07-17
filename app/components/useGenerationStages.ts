"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through a sequence of honest, plain-language status messages while
 * `active` is true (e.g. while an AI generation request is in flight).
 *
 * These describe the real kind of work happening (reading input, matching
 * against real trend data, structuring output) — never a claim that the
 * tool is live-browsing/scraping a platform, since it isn't. Keeping this
 * honest matters: this site's whole credibility rests on not overstating
 * what's real.
 */
export function useGenerationStages(
  stages: string[],
  active: boolean,
  intervalMs = 2600
): string {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    setIndex(0);
    const id = setInterval(() => {
      setIndex((i) => (i + 1 < stages.length ? i + 1 : i));
    }, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, intervalMs]);

  return stages[Math.min(index, stages.length - 1)] ?? stages[0];
}
