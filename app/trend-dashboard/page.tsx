import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Suspense } from "react";
import { TrendGrid, type Trend } from "./TrendGrid";
import { TrendPulseLive, TrendPulseSkeleton } from "./TrendPulse";

// The trend data refreshes in the background every 6 hours and is served
// from cache in between — always warm. The page renders instantly; the
// Trend Pulse section streams in on its own (see the Suspense below), so
// getting into the studio is never blocked on the data.
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Trend Dashboard | Juju's Studio",
  description:
    "A live read on emerging fashion and beauty trends, translated into customer insight and business opportunity."
};

const trends: Trend[] = [
  {
    name: "Elevated Minimalism",
    category: "Fashion",
    momentum: "Peaking",
    insight:
      "Black tailoring took over Milan's Fall 2026 runways — a return to structured power dressing.",
    opportunity:
      "A monochrome capsule anchored by one investment blazer, styled to prove its range.",
    firstMove: "Build a one-blazer capsule and style it three ways.",
    sources: "Net-a-Porter Fall 2026 · Milan Runway Coverage"
  },
  {
    name: "Scent Stacking",
    category: "Beauty",
    momentum: "Rising",
    insight:
      "Shoppers layer fragrances to build a bespoke scent, like they already do with skincare.",
    opportunity:
      "A modular fragrance system — a base scent plus layering notes — not a single bottle.",
    firstMove: "Launch a base-plus-two layering starter set.",
    sources: "Pinterest Predicts 2026"
  },
  {
    name: "Blurred Lips",
    category: "Beauty",
    momentum: "Peaking",
    insight:
      "Soft, diffused lip color is replacing sharp liner looks — search interest up roughly 300%.",
    opportunity:
      "A diffused-finish lip line sold as the easy, no-mirror alternative to lip liner.",
    firstMove: "Lead with a one-swipe, no-mirror demo.",
    sources: "Who What Wear 2026 · Search Trend Data"
  },
  {
    name: "Playful Tights",
    category: "Fashion",
    momentum: "Emerging",
    insight:
      "Tights became a styling tool for fall 2026 — a cheap way to refresh an existing outfit.",
    opportunity:
      "A tights capsule merchandised as an accessory, not a basics-aisle staple.",
    firstMove: "Merchandise tights as an accessory near checkout.",
    sources: "Net-a-Porter Fall 2026 · Runway Styling"
  },
  {
    name: "Mini & Trial-Size Everything",
    category: "Cross-Category",
    momentum: "Rising",
    insight:
      "Shoppers use minis and trial sizes as a low-risk way to test a product or trend.",
    opportunity:
      "A \"try before you commit\" edit pairing beauty minis with fashion micro-accessories.",
    firstMove: "Curate a cross-category mini bundle.",
    sources: "BeautyMatter 2026 · Retail Mini-Format Data"
  },
  {
    name: "French Hair Accessories",
    category: "Cross-Category",
    momentum: "Emerging",
    insight:
      "Parisian hair pins and combs are surging — searches up over 1,000% — as a fast outfit upgrade.",
    opportunity:
      "An accessible hair-accessory edit that borrows the \"elevated\" feeling without a wardrobe spend.",
    firstMove: "Stock an accessory fixture near checkout.",
    sources: "Who What Wear 2026 · Retailer Search Data"
  }
];

export default function TrendDashboard() {
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
            Platform · Trend Dashboard
          </p>
          <h1 className="font-editorial text-[2.75rem] leading-[1.04] text-[#2B211C] md:text-[3.75rem]">
            Spot the trends before they're everywhere.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#2B211C]/75 md:text-lg">
            A live read on what's moving across TikTok, retail, and culture
            &mdash; translated into customer insight and business opportunity.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            Real 2026 Trend Data
          </span>
        </div>

        <div className="mt-12">
          <Suspense fallback={<TrendPulseSkeleton />}>
            <TrendPulseLive />
          </Suspense>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <TrendGrid trends={trends} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
