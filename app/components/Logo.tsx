export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]"
        style={{ background: "var(--sage)" }}
      >
        <svg viewBox="0 0 100 100" className="h-[22px] w-[22px]" fill="var(--forest)">
          {/* A lowercase italic j from Latin Modern Roman -- the modern
              descendant of the high-contrast Didone letterforms used by
              fashion magazines. This is the actual glyph outline extracted
              from the typeface (lmroman10-italic) with fontTools, baked in
              as a path so the logo has no font dependency and renders
              identically everywhere. If it ever needs re-extracting:
              height fitted to 72/100 of the viewBox, optically centred.
              The same glyph, larger, lives in public/logo-hero.svg for
              covers and social cards. */}
          <path d="M55.15 73.43 62.95 42.08C63.03 41.83 63.37 40.49 63.37 39.31C63.37 35.37 60.85 31.77 56.16 31.77C47.86 31.77 43.42 44.09 43.42 44.68C43.42 45.52 44.26 45.52 44.68 45.52C45.77 45.52 45.77 45.43 46.27 44.09C48.37 38.81 51.72 33.61 56.08 33.61C58.17 33.61 58.34 35.46 58.34 36.97C58.34 38.31 58.09 39.90 57.75 41.24L49.71 73.51C49.62 74.01 47.02 84.16 40.91 84.16C40.49 84.16 39.06 84.16 37.55 83.32C40.49 82.40 40.57 79.38 40.57 79.38C40.57 78.29 39.82 76.70 37.64 76.70C35.96 76.70 33.53 78.12 33.53 81.05C33.53 84.83 37.80 86.00 40.82 86.00C47.78 86.00 53.56 79.71 55.15 73.43ZM66.47 17.60C66.47 15.84 65.21 14.00 62.70 14.00C60.02 14.00 57.33 16.60 57.33 19.28C57.33 21.12 58.68 22.88 61.11 22.88C63.79 22.88 66.47 20.29 66.47 17.60Z" />
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
