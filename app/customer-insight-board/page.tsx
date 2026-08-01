import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CustomerInsightBoard } from "./CustomerInsightBoard";

export const metadata: Metadata = {
  title: "Customer Insight Board | Juju's Studio",
  description:
    "Understand the shopper behind each trend — what they want, why it works, and clear next steps."
};

export default function CustomerInsightBoardPage() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-[0.18em] text-[#2B211C]/55 hover:text-[#2B211C]"
        >
          ← Back to Juju's Studio
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#9C8F84]">
            Platform · Customer Insight Board
          </p>
          <h1 className="font-editorial text-[2.75rem] leading-[1.04] text-[#2B211C] md:text-[3.75rem]">
            Understand them before you build for them.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#2B211C]/75 md:text-lg">
            Describe your brand. Get the shopper behind the trend.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            Built on 102 sourced 2026 trends
          </span>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <CustomerInsightBoard />
        </div>
      </section>

      <Footer />
    </main>
  );
}
