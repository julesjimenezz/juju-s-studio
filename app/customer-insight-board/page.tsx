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
    "Understand the shopper behind each trend — what they want, why it works, and clear next steps."
};

const profiles: CustomerProfile[] = [
  {
    trend: "Elevated Minimalism",
    trendCategory: "Fashion",
    personaName: "The Quiet Power Player",
    tagline: "They want authority without shouting for it.",
    insight:
      "Black tailoring took over Milan's Fall 2026 runways — a return to structured power dressing.",
    whyThisWorks:
      "After seasons of maximalism, they want to simplify decisions without looking like they stopped trying.",
    whatTheyWant:
      "One tailored piece that reads confident in almost any setting, no color coordination needed.",
    quote: "I want to get dressed in ten seconds and still look like I meant it.",
    barriers: [
      "Worried all-black reads flat or boring in photos.",
      "Wants to see one piece work across settings before paying the price."
    ],
    howToReachThem: [
      { channel: "TikTok", approach: "Styling content showing texture and cut — monochrome isn't boring." },
      { channel: "Retail", approach: "Style it on a live model, not just a mannequin." },
      { channel: "Email", approach: "A three-outfit lookbook as one clear styling guide." }
    ],
    nextSteps: [
      "Lead with texture and cut, not just \"black.\"",
      "Show one piece styled three ways.",
      "Send a short three-outfit lookbook."
    ]
  },
  {
    trend: "Scent Stacking",
    trendCategory: "Beauty",
    personaName: "The Scent Curator",
    tagline: "They don't want a signature scent. They want a signature system.",
    insight:
      "Shoppers layer fragrances to build a bespoke scent, like they already do with skincare.",
    whyThisWorks:
      "A single scent feels static. Layering lets it shift with mood and season, so they keep coming back.",
    whatTheyWant:
      "To mix and adjust their fragrance the way they do with skincare, not be locked into one bottle.",
    quote: "I don't want to smell like everyone else who bought the same bottle.",
    barriers: [
      "Doesn't know where to start, worried scents will clash.",
      "Concerned about the cost of building a collection vs. one bottle."
    ],
    howToReachThem: [
      { channel: "TikTok", approach: "Simple \"base plus two\" formulas, not open-ended \"mix anything.\"" },
      { channel: "Retail", approach: "A guided layering bar grouped by note family, with testers." },
      { channel: "UGC", approach: "Feature real customer combos, named — personal and shareable." }
    ],
    nextSteps: [
      "Give them one simple \"base + two\" formula.",
      "Set up a tester bar to mix in-store.",
      "Feature named customer combos."
    ]
  },
  {
    trend: "Blurred Lips",
    trendCategory: "Beauty",
    personaName: "The Low-Effort Perfectionist",
    tagline: "They want it to look intentional without doing the work.",
    insight:
      "Soft, diffused lip color is replacing sharp liner looks — search interest up roughly 300%.",
    whyThisWorks:
      "They've hit a wall with routines that need a steady hand and good light. This removes the skill.",
    whatTheyWant:
      "A polished lip look without the time or precision a liner-and-lipstick routine demands.",
    quote: "If I need a mirror and ten minutes for my lips, I'm not doing it.",
    barriers: [
      "Skeptical a \"one swipe\" product looks as finished as a lined lip.",
      "Worried the diffused effect just looks smudged."
    ],
    howToReachThem: [
      { channel: "TikTok", approach: "Real-time, unedited application — no filters." },
      { channel: "Retail", approach: "A try-it-yourself station with a one-swipe card." },
      { channel: "Search", approach: "Direct product naming that matches how people search." }
    ],
    nextSteps: [
      "Prove the finish with unedited demos.",
      "Add a no-mirror testing station.",
      "Name the product how people search it."
    ]
  },
  {
    trend: "Playful Tights",
    trendCategory: "Fashion",
    personaName: "The Closet Remixer",
    tagline: "They want a new outfit without a new purchase.",
    insight:
      "Tights became a styling tool for fall 2026 — a low-cost way to refresh an existing outfit.",
    whyThisWorks:
      "They're careful with spending but still want the \"new\" feeling. A $20 accessory delivers it guilt-free.",
    whatTheyWant:
      "An easy, low-cost way to make existing pieces feel new without buying a whole outfit.",
    quote: "I don't need a new outfit. I need my old outfit to feel new.",
    barriers: [
      "Thinks of tights as a cold-weather basic, not a styling choice.",
      "Unsure how to pair patterns without it looking off."
    ],
    howToReachThem: [
      { channel: "TikTok", approach: "\"Same outfit, different tights\" before/after in seconds." },
      { channel: "Retail", approach: "Mannequins with the same base outfit, different tights." },
      { channel: "Email", approach: "A simple pattern-pairing guide that removes the guesswork." }
    ],
    nextSteps: [
      "Show one outfit refreshed with different tights.",
      "Display the same base look styled side by side.",
      "Send a quick pattern-pairing guide."
    ]
  },
  {
    trend: "Mini & Trial-Size Everything",
    trendCategory: "Cross-Category",
    personaName: "The Cautious Tester",
    tagline: "They want proof it's worth it before going all in.",
    insight:
      "Shoppers treat minis and trial sizes as a low-risk way to test a product or trend.",
    whyThisWorks:
      "They've been burned by full-size buys that didn't work out. A smaller first step feels responsible.",
    whatTheyWant:
      "A low-risk way to try something new without paying full price before they know they like it.",
    quote: "I'm not paying full price to find out I hate it.",
    barriers: [
      "Worried minis are a gimmick, not the real product.",
      "Unsure if a mini counts toward anything later."
    ],
    howToReachThem: [
      { channel: "TikTok", approach: "Honest \"is the mini worth it\" comparisons, not just hype." },
      { channel: "Retail", approach: "Clear signage on cost-per-use and how sizes compare." },
      { channel: "Loyalty", approach: "Show the mini purchase counting toward a full-size reward." }
    ],
    nextSteps: [
      "Post honest mini-vs-full comparisons.",
      "Label cost-per-use on the trial table.",
      "Credit minis toward full-size buys."
    ]
  },
  {
    trend: "French Hair Accessories",
    trendCategory: "Cross-Category",
    personaName: "The Accessible Elevator",
    tagline: "They want the \"put together\" look without a wardrobe budget.",
    insight:
      "Parisian hair pins and combs are surging — searches up over 1,000% — as a fast outfit upgrade.",
    whyThisWorks:
      "The full \"elevated\" aesthetic feels out of reach — a hair accessory makes the same feeling affordable.",
    whatTheyWant:
      "A cheap, fast way to look more polished without buying new clothes.",
    quote: "I can't afford the whole look, but I can afford the pin.",
    barriers: [
      "Worried one accessory won't actually change how an outfit reads.",
      "Doesn't know how to style it and is nervous about getting it wrong."
    ],
    howToReachThem: [
      { channel: "TikTok", approach: "Before/after proving one accessory's impact in five seconds." },
      { channel: "Retail", approach: "A styling card showing three ways to wear the same piece." },
      { channel: "Search", approach: "Match the exact rising search terms shoppers use." }
    ],
    nextSteps: [
      "Lead with a five-second before/after.",
      "Show three ways to wear one piece.",
      "Match the rising search terms in copy."
    ]
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
            Pick a trend and get the shopper, why it works, and your next steps.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            Real 2026 Trend Data
          </span>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <CustomerInsightBoard profiles={profiles} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
