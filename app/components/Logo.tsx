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
          {/* Two J's, spine to spine, an exact mirror about x=50
              (right path is the left with x -> 100-x).

              Four things here are load-bearing. Please don't "tidy" them:

              1. Both J's run top-to-bottom with the hook at the BOTTOM. The
                 original right-hand stroke was a J rotated 180deg, which put
                 its hook at the top -- a vertical with a top hook reads as
                 an "r", which is why people were seeing the mark as "J R".

              2. Each J is ONE cubic, not two spliced together. The earlier
                 two-segment version was tangent-continuous but not
                 curvature-continuous, so the curve visibly kinked where the
                 segments met and went flat in the middle of the bowl.

              3. The tail LIFTS at the terminal (ends at y=76.5, above the
                 curve's lowest point). A tail that runs dead flat into the
                 corner reads as an arch or a table leg, not as a J.

              4. Stems sit at 42.5 / 57.5, so the gap between them is 7.5 --
                 exactly one stroke width. Narrower and the two stems fuse
                 into a single dark bar in the 22px nav chip; much wider and
                 the right-hand J starts reading as an "L". */}
          <path d="M 42.5 17 L 42.5 59 C 42.5 73 28.36 80.47 22 76.5" />
          <path d="M 57.5 17 L 57.5 59 C 57.5 73 71.64 80.47 78 76.5" />
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
