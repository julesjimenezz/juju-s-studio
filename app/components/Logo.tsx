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
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Two fishhook J's, spine to spine, an exact mirror about x=50
              (right path is the left with x -> 100-x).

              Four things here are load-bearing. Please don't "tidy" them:

              1. Both J's run top-to-bottom with the hook at the BOTTOM. The
                 original right-hand stroke was a J rotated 180deg, which put
                 its hook at the top -- a vertical with a top hook reads as
                 an "r", which is why people were seeing the mark as "J R".

              2. The tail climbs 17 units back up from the bowl bottom
                 (y=80.5 -> y=63.5), tilting slightly back toward the stem.
                 A tail that runs flat into the corner reads as an arch or a
                 table leg, not a J -- the deep upward hook is what makes it
                 unmistakably a letter.

              3. The two cubics meet at the bowl bottom with matched
                 horizontal tangents. The tail is a tightening spiral (a
                 circular hook this deep would throw the terminal outside
                 the chip).

              4. Stems sit at 42.5 / 57.5, so the gap between them is 7.5 --
                 exactly one stroke width. Narrower and the two stems fuse
                 into a single dark bar in the 22px nav chip; much wider and
                 the right-hand J starts reading as an "L". */}
          <path d="M 42.5 16 L 42.5 63 C 42.5 72.66 37.35 80.5 31 80.5 C 25.4 80.5 25.69 72.79 27 63.5" />
          <path d="M 57.5 16 L 57.5 63 C 57.5 72.66 62.65 80.5 69 80.5 C 74.6 80.5 74.31 72.79 73 63.5" />
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
