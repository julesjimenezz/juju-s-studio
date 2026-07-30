export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]"
        style={{ background: "var(--sage)" }}
      >
        <svg
          viewBox="0 0 100 100"
          className="h-[22px] w-[22px]"
          fill="var(--forest)"
        >
          {/* A single high-contrast fashion-serif lowercase j: filled
              tapered stem (thick at the waist, thinning toward both ends,
              tail sweeping left) with a comma-shaped teardrop dot.

              This is the SMALL sibling of a two-tier mark. The hero
              version -- same letter with a continuous hairline flourish
              that loops off the tail, crosses behind the stem, and lands
              on the dot -- lives in public/logo-hero.svg for use at large
              sizes (covers, social, case-study headers). Hairlines die in
              a 22px chip, so the nav and favicon use this heavier,
              flourish-free drawing: same stem geometry, ~20% thicker at
              the waist, blunt 1.5-unit tail end so nothing whiskers out
              at small sizes. The group transform pre-scales and centres
              it optically in the chip (a left-sweeping tail carries its
              mass off-centre). Keep the two drawings' geometry in sync if
              either is ever redrawn. */}
          <g transform="translate(-3.2 -5.3) scale(1.16)">
            <path d="M 57.8 26 L 57.87 28.33 L 58.06 30.67 L 59.12 38.6 L 59.42 41.87 L 59.5 43.97 L 59.57 55.74 L 59.4 57.42 L 58.95 59.36 L 56.4 66.79 L 55.99 67.82 L 55.39 69.04 L 54.54 70.41 L 53.6 71.65 L 52.41 72.97 L 50.98 74.31 L 49.5 75.52 L 47.41 77.02 L 46.01 77.87 L 44.73 78.45 L 43.38 78.91 L 42.24 79.2 L 40.29 79.53 L 38.28 79.76 L 36.48 79.85 L 34.93 79.81 L 33.66 79.64 L 33.94 78.16 L 34.85 78.27 L 35.88 78.23 L 36.96 78.06 L 38.2 77.74 L 39.7 77.22 L 41.49 76.48 L 44.2 75.04 L 45.93 73.88 L 47.13 72.68 L 47.69 71.92 L 48.18 71.11 L 48.68 70.07 L 49.1 68.97 L 50.58 63.96 L 50.81 62.59 L 50.81 60.86 L 50.45 57.42 L 50.38 56.03 L 50.53 42.8 L 50.85 38.83 L 51.97 30.43 L 52.15 28.1 L 52.2 26 Z" />
            <path d="M 50.9 26.2 Q 53.65 23.74 56.07 22.15 A 4 4 0 1 0 49.67 19.75 Q 50.45 22.54 50.9 26.2 Z" />
          </g>
        </svg>
      </span>
      <span
        className="text-[1.4rem] tracking-[0.06em]"
        style={{ fontFamily: "var(--font-jost)", color: "var(--forest)" }}
      >
        juju&rsquo;s studio
      </span>
    </span>
  );
}
