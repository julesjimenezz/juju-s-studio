import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CampaignLab, type Campaign } from "./CampaignLab";

export const metadata: Metadata = {
  title: "Campaign Lab | Juju's Studio",
  description:
    "Turn a trend into a full campaign concept — pillars, content ideas, why it works, and clear next steps."
};

const campaigns: Campaign[] = [
  {
    trend: "Elevated Minimalism",
    trendCategory: "Fashion",
    campaignName: "Back to Power",
    tagline: "Minimal color, maximum presence.",
    insight:
      "Head-to-toe black tailoring took over Milan's Fall 2026 runways — a return to structured power dressing.",
    whyThisWorks:
      "Shoppers want fewer, better pieces that signal confidence. One hero blazer sells range, not newness.",
    pillars: ["The One-Blazer Capsule", "Tailoring, Not Trends", "Black on Black"],
    social: [
      { channel: "TikTok", idea: "\"One blazer, five outfits\" monochrome styling challenge." },
      { channel: "Reels", idea: "Runway-to-real-life edit: Milan clips styled for everyday." },
      { channel: "UGC", idea: "\"Power Look of the Week\" — customers share their all-black fit." }
    ],
    email: {
      subject: "Power dressing, minus the noise",
      concept: "Lead with the hero blazer as one confident buy, not a whole wardrobe."
    },
    influencer: {
      archetype: "Minimalist-wardrobe stylists",
      ask: "Style the blazer three ways in one video."
    },
    nextSteps: [
      "Pick one hero blazer to anchor the capsule.",
      "Shoot the \"one blazer, five outfits\" video first.",
      "Launch early fall, when workwear searches spike."
    ]
  },
  {
    trend: "Scent Stacking",
    trendCategory: "Beauty",
    campaignName: "Build Your Signature",
    tagline: "One scent was never going to be enough.",
    insight:
      "Shoppers are layering fragrances to build a personal scent, like they already do with skincare.",
    whyThisWorks:
      "Layering turns one purchase into a routine — and a bespoke scent no one else has drives loyalty.",
    pillars: ["The Layering Starter Set", "Scent, Not Signature", "Mix It, Make It Yours"],
    social: [
      { channel: "TikTok", idea: "Base + two accents layering tutorial, before/after on skin." },
      { channel: "Reels", idea: "Satisfying three-mini layering sequence to trending audio." },
      { channel: "UGC", idea: "Customers name and share their signature combo." }
    ],
    email: {
      subject: "Stop settling for one scent",
      concept: "Introduce the starter set with a simple base-plus-two formula."
    },
    influencer: {
      archetype: "Fragrance \"scent wardrobe\" creators",
      ask: "Build a signature combo live using the set."
    },
    nextSteps: [
      "Bundle a base scent with two layering oils.",
      "Post one simple \"base + two\" formula.",
      "Launch in fall, when routines reset."
    ]
  },
  {
    trend: "Blurred Lips",
    trendCategory: "Beauty",
    campaignName: "Soft Focus, Sharp Sales",
    tagline: "Precision is out. Diffusion is in.",
    insight:
      "Soft, diffused lip color is replacing sharp liner looks — search interest up roughly 300%.",
    whyThisWorks:
      "The look needs no skill and no mirror. Ease of use is the whole selling point.",
    pillars: ["The No-Liner Lip", "Blur, Don't Line", "Just-Bitten"],
    social: [
      { channel: "TikTok", idea: "One-swipe demo — no mirror, no liner needed." },
      { channel: "Reels", idea: "Macro close-up of the diffused edge on camera." },
      { channel: "UGC", idea: "Customers duet the demo with their own \"blur test.\"" }
    ],
    email: {
      subject: "The lip trend that forgives a shaky hand",
      concept: "Lead with ease, positioned against fussy liner routines."
    },
    influencer: {
      archetype: "Quick, low-effort makeup creators",
      ask: "A 15-second \"one swipe, no mirror\" video."
    },
    nextSteps: [
      "Lead every asset with the one-swipe demo.",
      "Launch now — ride the current search spike.",
      "Add a no-mirror testing station in-store."
    ]
  },
  {
    trend: "Playful Tights",
    trendCategory: "Fashion",
    campaignName: "Legwear, Reconsidered",
    tagline: "The cheapest outfit refresh you forgot about.",
    insight:
      "Tights became a styling tool for fall 2026 — pattern and color refresh an outfit without buying new.",
    whyThisWorks:
      "It's the cheapest way to feel \"new\" — a $20 accessory, not a wardrobe overhaul.",
    pillars: ["Tights as Accessory", "One Skirt, Five Looks", "Pattern Play"],
    social: [
      { channel: "TikTok", idea: "\"Same outfit, five tights\" styling video." },
      { channel: "Reels", idea: "Quick-swap transition through patterned tights." },
      { channel: "UGC", idea: "Customers post their tights-as-accessory looks." }
    ],
    email: {
      subject: "The $20 outfit refresh you're sleeping on",
      concept: "Reframe tights as an accessory, styled five ways."
    },
    influencer: {
      archetype: "Budget styling / outfit-repeat creators",
      ask: "Restyle three outfits using only tights."
    },
    nextSteps: [
      "Merchandise tights as an accessory, not a basic.",
      "Shoot the \"five tights\" swap video.",
      "Launch early fall, as layering starts."
    ]
  },
  {
    trend: "Mini & Trial-Size Everything",
    trendCategory: "Cross-Category",
    campaignName: "Try It Small First",
    tagline: "Commitment-free is the new full-size.",
    insight:
      "Shoppers use minis and trial sizes as a low-risk way to test a product or trend before buying in.",
    whyThisWorks:
      "A small first step lowers the barrier to trying you — and leads to full-size buys later.",
    pillars: ["The Trial Table", "Mini, Not Miniature", "Try, Then Buy Big"],
    social: [
      { channel: "TikTok", idea: "Mini haul across beauty and accessories in one order." },
      { channel: "Reels", idea: "Mini vs full-size side-by-side — it's a real product." },
      { channel: "UGC", idea: "Customers share a mini they later bought full-size." }
    ],
    email: {
      subject: "Try five things for the price of one",
      concept: "A curated mini bundle framed as low-risk discovery."
    },
    influencer: {
      archetype: "Discovery / first-impressions creators",
      ask: "\"Testing five minis before I commit\" video."
    },
    nextSteps: [
      "Curate a cross-category mini bundle.",
      "Add a redeem-toward-full-size credit.",
      "Launch at a new-season kickoff."
    ]
  },
  {
    trend: "French Hair Accessories",
    trendCategory: "Cross-Category",
    campaignName: "Pin It Up, Polish It Off",
    tagline: "The outfit upgrade that lives in your hair.",
    insight:
      "Parisian hair pins and combs are surging — searches up over 1,000% — as an easy way to elevate an outfit.",
    whyThisWorks:
      "It's borrowed prestige at a low price — the accessible entry to an \"elevated\" aesthetic.",
    pillars: ["The Five-Second Upgrade", "Old Money Hair", "One Pin, Every Outfit"],
    social: [
      { channel: "TikTok", idea: "\"Five-second hair upgrade\" — one pin transforms a plain outfit." },
      { channel: "Reels", idea: "Three ways to wear the same hair pin." },
      { channel: "UGC", idea: "Customers share their hair-pin moment with a branded tag." }
    ],
    email: {
      subject: "The $15 upgrade every outfit needs",
      concept: "Position the pin as the fastest way to elevate any outfit."
    },
    influencer: {
      archetype: "Quiet-luxury / old-money creators",
      ask: "\"How I elevate a basic outfit\" using only hair accessories."
    },
    nextSteps: [
      "Lead with the five-second before/after.",
      "Price it as the accessible entry point.",
      "Launch for back-to-school and early fall."
    ]
  }
];

export default function CampaignLabPage() {
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
            Platform · Campaign Lab
          </p>
          <h1 className="font-editorial text-[2.75rem] leading-[1.04] text-[#2B211C] md:text-[3.75rem]">
            Turn one trend into a full campaign.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#2B211C]/75 md:text-lg">
            Pick a trend and get the concept, why it works, and your next steps.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            Real 2026 Trend Data
          </span>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <CampaignLab campaigns={campaigns} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
