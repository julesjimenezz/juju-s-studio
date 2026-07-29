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
          fill="none"
          stroke="var(--forest)"
          strokeWidth="9"
          strokeLinecap="square"
        >
          {/* Two J's back to back: spines adjacent, hooks curving outward,
              the right one dropped half a step so the mark isn't a perfect
              mirror. Three constraints are load-bearing here:
              1. Both strokes run top-to-bottom with the hook at the BOTTOM.
                 The old right-hand stroke was a J rotated 180deg, which put
                 its hook at the top -- a vertical with a top hook reads as
                 an "r", which is why the mark was being read as "J R".
              2. Stems stay close (44/56). Spread them wider and the
                 right-hooking one starts reading as an "L" instead.
              3. The 10-unit vertical offset breaks the symmetry without
                 pushing either stroke out of the 22px nav chip. */}
          <path d="M 44 12 L 44 54 C 44 72 34 78 22 74" />
          <path d="M 56 22 L 56 64 C 56 82 66 88 78 84" />
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
