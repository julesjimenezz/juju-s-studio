// Shared explainer + illustrative-sample scaffolding for the three modules
// (Campaign Lab, Product Opportunity Studio, Customer Insight Board).
// Each page reads top to bottom as: explain -> sample -> input.

export type GuideStep = {
  label: string;
  heading: string;
};

export function ModuleGuide({ steps }: { steps: GuideStep[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className="rounded-[1.35rem] border border-[#2B211C]/10 bg-white/55 p-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 text-[0.62rem] font-bold text-[#2B211C]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
              {step.label}
            </p>
          </div>
          <p className="mt-3.5 text-sm leading-6 text-[#2B211C]/75">
            {step.heading}
          </p>
        </div>
      ))}
    </div>
  );
}

export type SampleBlock = { label: string; body: string };

export function SampleCard({
  title,
  tagline,
  blocks
}: {
  title: string;
  tagline: string;
  blocks: SampleBlock[];
}) {
  return (
    <div className="mt-8">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="rounded-full border border-[#C7A6A0]/55 bg-[#C7A6A0]/20 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#2B211C]">
          Sample
        </span>
        <p className="text-xs leading-5 text-[#2B211C]/55">
          Invented brand, invented trend. Yours is generated below.
        </p>
      </div>

      <div className="rounded-[1.6rem] border border-[#2B211C]/12 bg-[#F8F4ED] p-5 md:p-7">
        <h3 className="font-editorial text-2xl leading-tight text-[#2B211C] md:text-[1.85rem]">
          {title}
        </h3>
        <p className="font-editorial mt-1.5 text-base italic text-[#2B211C]/65">
          {tagline}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {blocks.map((block) => (
            <div
              key={block.label}
              className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/50 p-4"
            >
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#9C8F84]">
                {block.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#2B211C]/85">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
