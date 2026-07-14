import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  CustomerInsightBoard,
  type CustomerProfile
} from "./CustomerInsightBoard";

export const metadata: Metadata = {
  title: "Customer Insight Board | Juju's Studio",
  description:
    "Understand the customer behind each trend: what they want, why they want it, and how brands can meet them."
};

const profiles: CustomerProfile[] = [
  {
    trend: "Elevated Minimalism",
    trendCategory: "Fashion",
    personaName: "The Quiet Power Player",
    tagline: "They want authority without a single accessory shouting for it.",
    insight:
      "Head-to-toe black tailoring dominated Milan's Fall 2026 runways, signaling a return to structured power dressing after several seasons of maximalism.",
    whatTheyWant:
      "One tailored piece that reads as confident and put-together in almost any setting, without having to think about color coordination.",
    whyItMatters:
      "After several seasons of maximalist dressing, they're looking to simplify decisions without looking like they stopped trying. Monochrome tailoring does both at once.",
    quote: "I want to get dressed in ten seconds and still look like I meant it.",
    barriers: [
      "Worried an all-black look reads as flat or boring in photos.",
      "Needs to see how one piece actually works across different settings before committing to the price point."
    ],
    howToReachThem: [
      {
        channel: "TikTok",
        approach: "Styling content that shows texture and cut detail, proving monochrome doesn't mean boring."
      },
      {
        channel: "Retail",
        approach: "In-store styling on a live model, not just a mannequin, so the movement and fit are visible."
      },
      {
        channel: "Email",
        approach: "A three-outfit lookbook sent as a single, clear styling guide rather than a broad seasonal sale."
      }
    ],
    brandTakeaway:
      "Sell the outfit's range, not just the garment. Prove one considered piece can do a season's worth of work."
  },
  {
    trend: "Scent Stacking",
    trendCategory: "Beauty",
    personaName: "The Scent Curator",
    tagline: "They don't want a signature scent. They want a signature system.",
    insight:
      "Shoppers are layering multiple fragrances to build a personal, bespoke scent instead of committing to one signature perfume, mirroring the mix-and-match approach already common in skincare.",
    whatTheyWant:
      "The ability to mix and adjust their fragrance the way they already do with skincare and makeup, instead of being locked into one bottle.",
    whyItMatters:
      "A single fragrance feels static to them. Layering lets their scent shift with mood, season, or occasion the same way an outfit does.",
    quote: "I don't want to smell like everyone else who bought the same bottle.",
    barriers: [
      "Doesn't know where to start and worries about combining scents that clash.",
      "Concerned about the total cost of building a layering collection versus one bottle."
    ],
    howToReachThem: [
      {
        channel: "TikTok",
        approach: "Simple, repeatable layering formulas (base plus two) rather than open-ended \"mix anything\" messaging."
      },
      {
        channel: "Retail",
        approach: "A guided in-store layering bar with note-family groupings and testers, not just shelf browsing."
      },
      {
        channel: "UGC",
        approach: "Feature real customer combinations with names, making the system feel personal and shareable."
      }
    ],
    brandTakeaway:
      "Make the system easy to start with a clear formula, then let personalization be the ongoing hook that brings them back for more layers."
  },
  {
    trend: "Blurred Lips",
    trendCategory: "Beauty",
    personaName: "The Low-Effort Perfectionist",
    tagline: "They want it to look intentional without doing the work.",
    insight:
      "Soft-focus, diffused lip color is replacing sharp liner looks, with related search interest up roughly 300% as a softer \"your lips but better\" aesthetic returns.",
    whatTheyWant:
      "A lip look that reads polished and put-together without the time or precision a liner-and-lipstick routine demands.",
    whyItMatters:
      "They've hit a wall with routines that require a steady hand and good lighting every morning. This trend removes the skill requirement entirely.",
    quote: "If I need a mirror and ten minutes for my lips, I'm not doing it.",
    barriers: [
      "Skeptical that a \"one swipe\" product can actually look as finished as a lined lip.",
      "Worried the diffused effect will just look smudged rather than intentional."
    ],
    howToReachThem: [
      {
        channel: "TikTok",
        approach: "Real-time, unedited application demos that prove the finish without relying on filters or editing."
      },
      {
        channel: "Retail",
        approach: "A try-it-yourself testing station with a simple one-swipe card, so they can see the result on their own skin."
      },
      {
        channel: "Search",
        approach: "Capture the existing spike in searches with clear, direct product naming that matches how people are already searching."
      }
    ],
    brandTakeaway:
      "Lead with proof of ease, not just the aesthetic. The sell is that this look requires no skill, not just that it looks good."
  },
  {
    trend: "Playful Tights",
    trendCategory: "Fashion",
    personaName: "The Closet Remixer",
    tagline: "They want a new outfit without a new purchase.",
    insight:
      "Tights moved from an afterthought to a styling tool for fall 2026, with pattern and color used as an easy way to refresh an existing outfit rather than buying something new.",
    whatTheyWant:
      "An easy, low-cost way to make existing pieces feel new again without buying a full new outfit.",
    whyItMatters:
      "They're being more careful with spending but still want the dopamine hit of a \"new\" look. A $20 accessory delivers that without the guilt of a bigger purchase.",
    quote: "I don't need a new outfit. I need my old outfit to feel new.",
    barriers: [
      "Doesn't think of tights as a styling decision, just a cold-weather basic.",
      "Unsure how to actually pair patterns without it looking mismatched."
    ],
    howToReachThem: [
      {
        channel: "TikTok",
        approach: "Direct \"same outfit, different tights\" before/after content that makes the impact obvious in seconds."
      },
      {
        channel: "Retail",
        approach: "Styled mannequins showing the same base outfit with different tights side by side."
      },
      {
        channel: "Email",
        approach: "A simple pattern-pairing guide that removes the guesswork around mixing prints."
      }
    ],
    brandTakeaway:
      "Reposition tights from basics to styling tool. Sell the transformation of an existing outfit, not just the product."
  },
  {
    trend: "Mini & Trial-Size Everything",
    trendCategory: "Cross-Category",
    personaName: "The Cautious Tester",
    tagline: "They want proof it's worth it before they go all in.",
    insight:
      "Shoppers across beauty and fashion are gravitating toward mini formats and trial sizes, treating small, low-commitment purchases as a way to test a product or trend before fully buying in.",
    whatTheyWant:
      "A low-risk way to try a new product or trend without committing to full price before knowing if they'll actually like it.",
    whyItMatters:
      "They've been burned by full-size purchases that didn't work out, so a smaller first step feels like the responsible way to shop something new.",
    quote: "I'm not paying full price to find out I hate it.",
    barriers: [
      "Worried minis are a marketing gimmick rather than the actual product experience.",
      "Unsure if a mini purchase actually applies toward anything later, or if it's just a smaller, separate sale."
    ],
    howToReachThem: [
      {
        channel: "TikTok",
        approach: "Honest \"is the mini worth it\" comparison content, not just unboxing hype."
      },
      {
        channel: "Retail",
        approach: "Clear signage on the trial table explaining exactly how the size compares and what it costs per use."
      },
      {
        channel: "Loyalty Program",
        approach: "A visible credit or point system showing the mini purchase directly counts toward a future full-size buy."
      }
    ],
    brandTakeaway:
      "Make the trial-to-full-size path explicit and rewarding. The mini should feel like step one of a relationship, not a standalone sale."
  },
  {
    trend: "French Hair Accessories",
    trendCategory: "Cross-Category",
    personaName: "The Accessible Elevator",
    tagline: "They want the \"put together\" look without a wardrobe budget.",
    insight:
      "Search interest in Parisian-style hair pins and combs is up over 1,000% as polished, editorial hair styling becomes a fast way to elevate an outfit without buying anything new.",
    whatTheyWant:
      "A cheap, fast way to look more polished without buying new clothes or committing to a full aesthetic overhaul.",
    whyItMatters:
      "The broader \"elevated\" aesthetic feels financially out of reach to them, but a hair accessory makes the same feeling accessible at a fraction of the cost.",
    quote: "I can't afford the whole look, but I can afford the pin.",
    barriers: [
      "Worried a single accessory won't actually change how an outfit reads.",
      "Doesn't know how to style the piece and is nervous about getting it wrong."
    ],
    howToReachThem: [
      {
        channel: "TikTok",
        approach: "Before/after styling content proving the impact of one accessory in five seconds, not a full makeover."
      },
      {
        channel: "Retail",
        approach: "An in-store styling card or quick demo showing three ways to wear the same piece."
      },
      {
        channel: "Search",
        approach: "Match the exact rising search terms shoppers are already using, rather than generic \"hair accessory\" copy."
      }
    ],
    brandTakeaway:
      "Position the product as the accessible entry point into a bigger aesthetic shoppers already want: small price, borrowed prestige."
  }
];

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
            Select a trend and Customer Insight Board builds out the shopper
            behind it: what they want, why it matters to them, what's holding
            them back, and how to actually reach them.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            Real 2026 Trend Data · Prototype Concepts
          </span>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <CustomerInsightBoard profiles={profiles} />
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-[#3B5D4A] px-6 py-16 text-center text-[#F8F4ED] shadow-[0_28px_80px_rgba(59,93,74,0.2)] md:px-12 md:py-20">
          <div className="mx-auto mb-7 flex max-w-sm items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#EFE7DA]/65">
            <span className="h-px flex-1 bg-[#F8F4ED]/20" />
            <span>The Full Loop</span>
            <span className="h-px flex-1 bg-[#F8F4ED]/20" />
          </div>
          <h2 className="font-editorial mx-auto max-w-3xl text-4xl leading-[1.04] md:text-5xl">
            Trend, campaign, product, and customer, all in one workspace.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#F8F4ED]/75 md:text-lg">
            That's the full prototype loop: Trend Dashboard spots it, Campaign
            Lab builds the story, Product Opportunity Studio builds the edit,
            and Customer Insight Board makes sure it's built for them.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/product-opportunity-studio"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F8F4ED] px-7 text-sm font-semibold text-[#2B211C] shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition hover:bg-[#EFE7DA]"
            >
              Back to Product Opportunity Studio
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
