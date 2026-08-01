// Shared explainer + illustrative-sample scaffolding for the three modules
// (Campaign Lab, Product Opportunity Studio, Customer Insight Board).
// Each page reads top to bottom as: explain -> sample -> input.

export type GuideStep = {
  label: string;
  heading: string;
  body: string;
  points: string[];
};

export function ModuleGuide({
  intro,
  steps
}: {
  intro: string;
  steps: GuideStep[];
}) {
  return (
    <div className="rounded-[2.1rem] border border-[#2B211C]/10 bg-white/55 p-6 md:p-10">
      <div className="max-w-2xl">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#9C8F84]">
          How this works
        </p>
        <p className="mt-3 text-base leading-7 text-[#2B211C]/75">{intro}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className="flex flex-col rounded-[1.35rem] border border-[#2B211C]/10 bg-[#F8F4ED]/70 p-5"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 text-[0.62rem] font-bold text-[#2B211C]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                {step.label}
              </p>
            </div>
            <h3 className="font-editorial mt-4 text-xl leading-snug text-[#2B211C]">
              {step.heading}
            </h3>
            <p className="mt-2.5 text-sm leading-6 text-[#2B211C]/70">
              {step.body}
            </p>
            <ul className="mt-4 flex flex-col gap-2 border-t border-[#2B211C]/10 pt-4">
              {step.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm leading-6 text-[#2B211C]/80"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B5D4A]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export type SampleBlock = { label: string; body?: string; list?: string[] };

export function SampleCard({
  kicker,
  title,
  tagline,
  lede,
  blocks
}: {
  kicker: string;
  title: string;
  tagline: string;
  lede: string;
  blocks: SampleBlock[];
}) {
  return (
    <div className="mt-12">
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="rounded-full border border-[#C7A6A0]/55 bg-[#C7A6A0]/20 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#2B211C]">
          Illustrative sample
        </span>
        <p className="max-w-2xl text-xs leading-5 text-[#2B211C]/55">
          An invented brand and an invented trend, shown at reduced size so you
          can see the shape of the output. Yours is generated below from the
          sourced 2026 trend index.
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.6rem] border border-[#2B211C]/12 bg-[#F8F4ED] shadow-[0_18px_50px_rgba(43,33,28,0.07)]">
        <div className="border-b border-[#2B211C]/10 p-5 md:p-7">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
            {kicker}
          </p>
          <h3 className="font-editorial mt-3 text-2xl leading-tight text-[#2B211C] md:text-[2rem]">
            {title}
          </h3>
          <p className="font-editorial mt-1.5 text-base italic text-[#2B211C]/65 md:text-lg">
            {tagline}
          </p>
          <p className="mt-4 max-w-2xl border-l border-[#C7A6A0]/70 pl-3.5 text-sm leading-6 text-[#2B211C]/70">
            {lede}
          </p>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 md:p-7 lg:grid-cols-3">
          {blocks.map((block) => (
            <div
              key={block.label}
              className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/50 p-4"
            >
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#9C8F84]">
                {block.label}
              </p>
              {block.body && (
                <p className="mt-2 text-sm leading-6 text-[#2B211C]/85">
                  {block.body}
                </p>
              )}
              {block.list && (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {block.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-6 text-[#2B211C]/85"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C7A6A0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
