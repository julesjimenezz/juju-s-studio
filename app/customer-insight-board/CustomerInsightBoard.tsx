"use client";

import { useState } from "react";

export type CustomerProfile = {
  trend: string;
  trendCategory: string;
  personaName: string;
  tagline: string;
  insight: string;
  whatTheyWant: string;
  whyItMatters: string;
  quote: string;
  barriers: string[];
  howToReachThem: { channel: string; approach: string }[];
  brandTakeaway: string;
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

export function CustomerInsightBoard({
  profiles
}: {
  profiles: CustomerProfile[];
}) {
  const [selected, setSelected] = useState(0);
  const profile = profiles[selected];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {profiles.map((p, index) => (
          <button
            key={p.trend}
            type="button"
            onClick={() => setSelected(index)}
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
              selected === index
                ? "border-[#3B5D4A] bg-[#3B5D4A] text-[#F8F4ED]"
                : "border-[#2B211C]/20 bg-[#F8F4ED]/60 text-[#2B211C]/70 hover:border-[#2B211C]/45"
            }`}
          >
            {p.trend}
          </button>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-[2.1rem] border border-[#2B211C]/10 bg-[#F8F4ED] shadow-[0_34px_95px_rgba(43,33,28,0.1)]">
        <div className="border-b border-[#2B211C]/10 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
            <span>Customer Profile</span>
            <span className="h-px w-8 bg-[#2B211C]/15" />
            <span>Built from: {profile.trend}</span>
            <span className="rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.62rem] tracking-[0.14em] text-[#2B211C]">
              {profile.trendCategory}
            </span>
          </div>
          <h2 className="font-editorial mt-5 text-[2.5rem] leading-[1.02] text-[#2B211C] md:text-[3.5rem]">
            {profile.personaName}
          </h2>
          <p className="font-editorial mt-3 text-xl italic text-[#2B211C]/70 md:text-2xl">
            {profile.tagline}
          </p>
          <p className="mt-6 max-w-2xl border-l border-[#C7A6A0]/70 pl-4 text-sm font-medium leading-7 text-[#2B211C]/65">
            {profile.insight}
          </p>
        </div>

        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-4">
            <BriefBlock label="What They Want">
              {profile.whatTheyWant}
            </BriefBlock>
            <BriefBlock label="Why It Matters">
              {profile.whyItMatters}
            </BriefBlock>

            <div className="mt-2 rounded-[1.35rem] bg-[#3B5D4A] p-5 text-[#F8F4ED]">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#EFE7DA]/70">
                How Brands Can Meet Them
              </p>
              <p className="mt-2 text-sm leading-6 text-[#F8F4ED]/90">
                {profile.brandTakeaway}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.1rem] border border-[#C7A6A0]/50 bg-[#C7A6A0]/12 p-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                Customer Voice
              </p>
              <p className="font-editorial mt-3 text-xl leading-[1.35] italic text-[#2B211C] md:text-2xl">
                "{profile.quote}"
              </p>
            </div>

            <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                Barriers to Address
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {profile.barriers.map((barrier, index) => (
                  <div
                    key={barrier}
                    className="flex items-start gap-3 rounded-[1.1rem] border border-[#2B211C]/10 bg-[#F8F4ED] px-4 py-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C7A6A0]/40 bg-[#C7A6A0]/18 text-[0.62rem] font-bold text-[#2B211C]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-[#2B211C]/85">
                      {barrier}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/45 p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                How to Reach Them
              </p>
              <div className="mt-2 divide-y divide-[#2B211C]/10">
                {profile.howToReachThem.map((item) => (
                  <div key={item.channel} className="py-3 first:pt-2 last:pb-0">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#2B211C]">
                      {item.channel}
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-[#2B211C]/85">
                      {item.approach}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
