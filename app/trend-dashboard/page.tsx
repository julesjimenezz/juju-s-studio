import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { TrendGrid, type Trend } from "./TrendGrid";

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
      "Head-to-toe black tailoring dominated Milan's Fall 2026 runways, signaling a return to structured power dressing after several seasons of maximalism.",
    opportunity:
      "A monochrome tailoring capsule anchored by one investment blazer, styled three ways to prove its range without adding new pieces.",
    sources: "Net-a-Porter Fall 2026 Trend Report · Milan Runway Coverage"
  },
  {
    name: "Scent Stacking",
    category: "Beauty",
    momentum: "Rising",
    insight:
      "Shoppers are layering multiple fragrances to build a personal, bespoke scent instead of committing to one signature perfume, mirroring the mix-and-match approach already common in skincare.",
    opportunity:
      "A modular fragrance system, a base scent plus 2-3 layering notes, that turns one purchase into a personalized routine instead of a single bottle.",
    sources: "Pinterest Predicts 2026 Trend Report"
  },
  {
    name: "Blurred Lips",
    category: "Beauty",
    momentum: "Peaking",
    insight:
      "Soft-focus, diffused lip color is replacing sharp liner looks, with related search interest up roughly 300% as a softer \"your lips but better\" aesthetic returns.",
    opportunity:
      "A diffused-finish lip line positioned as the easy, no-mirror-needed alternative to precise lip liner routines.",
    sources: "Who What Wear 2026 Beauty Forecast · Search Trend Data"
  },
  {
    name: "Playful Tights",
    category: "Fashion",
    momentum: "Emerging",
    insight:
      "Tights moved from an afterthought to a styling tool for fall 2026, with pattern and color used as an easy way to refresh an existing outfit rather than buying something new.",
    opportunity:
      "A tights capsule merchandised as an accessory, not a basics-aisle staple, positioned as the cheapest way to update an outfit already in the closet.",
    sources: "Net-a-Porter Fall 2026 Trend Report · Runway Styling Coverage"
  },
  {
    name: "Mini & Trial-Size Everything",
    category: "Cross-Category",
    momentum: "Rising",
    insight:
      "Shoppers across beauty and fashion are gravitating toward mini formats and trial sizes, treating small, low-commitment purchases as a way to test a product or trend before fully buying in.",
    opportunity:
      "A cross-category \"try before you commit\" edit pairing beauty minis with fashion micro-accessories, lowering the barrier to trying a new trend.",
    sources: "BeautyMatter 2026 Trend Forecast · Retail Mini-Format Data"
  },
  {
    name: "French Hair Accessories",
    category: "Cross-Category",
    momentum: "Emerging",
    insight:
      "Search interest in Parisian-style hair pins and combs is up over 1,000% as polished, editorial hair styling becomes a fast way to elevate an outfit without buying anything new.",
    opportunity:
      "An accessible hair-accessory edit that lets shoppers borrow the \"elevated\" feeling of the trend without a wardrobe purchase.",
    sources: "Who What Wear 2026 Beauty Forecast · Retailer Search Data"
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
            A live read on what's moving across TikTok, retail, runway, and
            culture right now, translated into customer insight and business
            opportunity for fashion and beauty teams.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            Real 2026 Trend Data · Prototype Concepts
          </span>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <TrendGrid trends={trends} />
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-[#3B5D4A] px-6 py-16 text-center text-[#F8F4ED] shadow-[0_28px_80px_rgba(59,93,74,0.2)] md:px-12 md:py-20">
          <div className="mx-auto mb-7 flex max-w-sm items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#EFE7DA]/65">
            <span className="h-px flex-1 bg-[#F8F4ED]/20" />
            <span>What's Next</span>
            <span className="h-px flex-1 bg-[#F8F4ED]/20" />
          </div>
          <h2 className="font-editorial mx-auto max-w-3xl text-4xl leading-[1.04] md:text-5xl">
            Every trend here is designed to flow into a full campaign.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#F8F4ED]/75 md:text-lg">
            Campaign Lab, Product Opportunity Studio, and Customer Insight
            Board are next up in the prototype, each picking up where the
            Trend Dashboard leaves off.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/#prototype"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F8F4ED] px-7 text-sm font-semibold text-[#2B211C] shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition hover:bg-[#EFE7DA]"
            >
              See All Modules
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#F8F4ED]/30 bg-[#F8F4ED]/5 px-7 text-sm font-semibold text-[#F8F4ED] transition hover:border-[#F8F4ED] hover:bg-[#F8F4ED]/10"
            >
              Back to Overview
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
