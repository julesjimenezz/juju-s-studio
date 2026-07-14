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
          <path d="M 38 10 L 38 60 C 38 78 27 84 14 80" />
          <path d="M 62 90 L 62 40 C 62 22 73 16 86 20" />
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
