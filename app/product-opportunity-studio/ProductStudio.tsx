"use client";

import { useState } from "react";

export type ProductOpportunity = {
  trend: string;
  trendCategory: string;
  editName: string;
  tagline: string;
  insight: string;
  heroProducts: string[];
  bundle: { name: string; contents: string; note: string };
  merchandisingMoment: string;
  crossSell: string;
  retailAngle: string;
};

function BriefBlock({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
        {label}
      </p>
      <div className="mt-2 text-sm leading-6 text-[#2B211C]/85">
        {children}
      </div>
    </div>
  );
}

export function ProductStudio({
  opportunities
}: {
  opportunities: ProductOpportunity[];
}) {
  const [selected, setSelected] = useState(0);
  const opportunity = opportunities[selected];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {opportunities.map((o, index) => (
          <button
            key={o.trend}
            type="button"
            onClick={() => setSelected(index)}
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
              selected === index
                ? "border-[#3B5D4A] bg-[#3B5D4A] text-[#F8F4ED]"
                : "border-[#2B211C]/20 bg-[#F8F4ED]/60 text-[#2B211C]/70 hover:border-[#2B211C]/45"
            }`}
          >
            {o.trend}
          </button>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-[2.1rem] border border-[#2B211C]/10 bg-[#F8F4ED] shadow-[0_34px_95px_rgba(43,33,28,0.1)]">
        <div className="border-b border-[#2B211C]/10 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
            <span>Product Edit</span>
            <span className="h-px w-8 bg-[#2B211C]/15" />
            <span>Built from: {opportunity.trend}</span>
            <span className="rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.62rem] tracking-[0.14em] text-[#2B211C]">
              {opportunity.trendCategory}
            </span>
          </div>
          <h2 className="font-editorial mt-5 text-[2.5rem] leading-[1.02] text-[#2B211C] md:text-[3.5rem]">
            {opportunity.editName}
          </h2>
          <p className="font-editorial mt-3 text-xl italic text-[#2B211C]/70 md:text-2xl">
            {opportunity.tagline}
          </p>
          <p className="mt-6 max-w-2xl border-l border-[#C7A6A0]/70 pl-4 text-sm font-medium leading-7 text-[#2B211C]/65">
            {opportunity.insight}
          </p>
        </div>

        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
              Hero Products
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {opportunity.heroProducts.map((product, index) => (
                <div
                  key={product}
                  className="flex items-center gap-3 rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 px-4 py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C7A6A0]/40 bg-[#C7A6A0]/18 text-[0.65rem] font-bold text-[#2B211C]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-semibold text-[#2B211C]">
                    {product}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.35rem] bg-[#3B5D4A] p-5 text-[#F8F4ED]">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#EFE7DA]/70">
                Merchandising Moment
              </p>
              <p className="mt-2 text-sm leading-6 text-[#F8F4ED]/90">
                {opportunity.merchandisingMoment}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.1rem] border border-[#C7A6A0]/50 bg-[#C7A6A0]/12 p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                Featured Bundle
              </p>
              <p className="mt-2 font-editorial text-2xl text-[#2B211C]">
                {opportunity.bundle.name}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#2B211C]/80">
                {opportunity.bundle.contents}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#2B211C]/60">
                {opportunity.bundle.note}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <BriefBlock label="Cross-Sell Opportunity">
                {opportunity.crossSell}
              </BriefBlock>
              <BriefBlock label="Retail Angle">
                {opportunity.retailAngle}
              </BriefBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
