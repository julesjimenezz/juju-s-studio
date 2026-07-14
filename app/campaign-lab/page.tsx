import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CampaignLab, type Campaign } from "./CampaignLab";

export const metadata: Metadata = {
  title: "Campaign Lab | Juju's Studio",
  description:
    "Turn a selected trend into a full campaign concept with social, email, influencer, and launch ideas."
};

const campaigns: Campaign[] = [
  {
    trend: "Elevated Minimalism",
    trendCategory: "Fashion",
    campaignName: "Back to Power",
    tagline: "Minimal color, maximum presence.",
    insight:
      "Head-to-toe black tailoring dominated Milan's Fall 2026 runways, signaling a return to structured power dressing after several seasons of maximalism.",
    pillars: ["The One-Blazer Capsule", "Tailoring, Not Trends", "Black on Black on Black"],
    social: [
      {
        channel: "TikTok",
        idea: "\"One blazer, five outfits\" styling challenge shot entirely in monochrome to show range without new pieces."
      },
      {
        channel: "Reels",
        idea: "A slow-motion runway-to-real-life edit pairing Milan runway clips with the same silhouette styled for everyday wear."
      },
      {
        channel: "UGC",
        idea: "Customers submit their own all-black outfit for a \"Power Look of the Week\" feature."
      }
    ],
    email: {
      subject: "Power dressing, minus the noise",
      concept:
        "A capsule showcase leading with the hero blazer, framed as a single confident purchase instead of a full new wardrobe."
    },
    influencer: {
      archetype: "Tailoring-focused stylists and minimalist-wardrobe creators",
      ask: "A capsule breakdown video showing the blazer styled three distinct ways over a week."
    },
    launchMoment:
      "Early fall, when workwear searches spike and the transition from summer color back to structured dressing begins."
  },
  {
    trend: "Scent Stacking",
    trendCategory: "Beauty",
    campaignName: "Build Your Signature",
    tagline: "One scent was never going to be enough.",
    insight:
      "Shoppers are layering multiple fragrances to build a personal, bespoke scent instead of committing to one signature perfume, mirroring the mix-and-match approach already common in skincare.",
    pillars: ["The Layering Starter Set", "Scent, Not Signature", "Mix It, Make It Yours"],
    social: [
      {
        channel: "TikTok",
        idea: "\"Scent stacking\" tutorials showing a base fragrance layered with two accent scents, before-and-after on skin."
      },
      {
        channel: "Reels",
        idea: "A satisfying product-lineup shot of three minis being layered in sequence, set to trending audio."
      },
      {
        channel: "UGC",
        idea: "Customers share their personal stacking combo and name it, for a \"Scent of the Week\" community feature."
      }
    ],
    email: {
      subject: "Stop settling for one scent",
      concept:
        "Introduce the layering starter set with a simple base-plus-two formula shoppers can follow immediately."
    },
    influencer: {
      archetype: "Fragrance-focused creators who already post layering and \"scent wardrobe\" content",
      ask: "A layering tutorial video building a signature combo live, using the starter set."
    },
    launchMoment:
      "Fall, when shoppers reset routines after summer and fragrance searches typically climb."
  },
  {
    trend: "Blurred Lips",
    trendCategory: "Beauty",
    campaignName: "Soft Focus, Sharp Sales",
    tagline: "Precision is out. Diffusion is in.",
    insight:
      "Soft-focus, diffused lip color is replacing sharp liner looks, with related search interest up roughly 300% as a softer \"your lips but better\" aesthetic returns.",
    pillars: ["The No-Liner Lip", "Blur, Don't Line", "Just-Bitten, Not Just-Applied"],
    social: [
      {
        channel: "TikTok",
        idea: "A one-swipe application demo proving the blurred finish requires zero mirror or liner skills."
      },
      {
        channel: "Reels",
        idea: "A macro close-up of the diffused edge effect, filmed to actually show texture on camera."
      },
      {
        channel: "UGC",
        idea: "Customers duet the application demo with their own \"blur test\" using the product."
      }
    ],
    email: {
      subject: "The lip trend that forgives a shaky hand",
      concept:
        "Lead with ease of application as the hook, positioned against the precision required by liner-based looks."
    },
    influencer: {
      archetype: "Everyday-makeup creators known for quick, low-effort routines",
      ask: "A 15-second \"one swipe, no mirror\" application video."
    },
    launchMoment:
      "Tied to the search spike already happening, launch fast rather than waiting for a seasonal moment."
  },
  {
    trend: "Playful Tights",
    trendCategory: "Fashion",
    campaignName: "Legwear, Reconsidered",
    tagline: "The cheapest outfit refresh you already forgot about.",
    insight:
      "Tights moved from an afterthought to a styling tool for fall 2026, with pattern and color used as an easy way to refresh an existing outfit rather than buying something new.",
    pillars: ["Tights as Accessory", "One Skirt, Five Looks", "Pattern Play"],
    social: [
      {
        channel: "TikTok",
        idea: "\"Same outfit, five tights\" styling video showing how much one accessory can change a look."
      },
      {
        channel: "Reels",
        idea: "A quick-swap transition video cycling through patterned tights under the same base outfit."
      },
      {
        channel: "UGC",
        idea: "Customers post their own tights-as-accessory styling for a repost."
      }
    ],
    email: {
      subject: "The $20 outfit refresh you're sleeping on",
      concept:
        "Reframe tights as an accessory purchase, styled five ways with pieces the shopper likely already owns."
    },
    influencer: {
      archetype: "Budget-conscious styling creators known for \"re-wearing\" and outfit-repeating content",
      ask: "A \"restyle my closet\" video using only tights to update three existing outfits."
    },
    launchMoment:
      "Early fall, as layering season begins and existing wardrobes need a low-cost refresh."
  },
  {
    trend: "Mini & Trial-Size Everything",
    trendCategory: "Cross-Category",
    campaignName: "Try It Small First",
    tagline: "Commitment-free is the new full-size.",
    insight:
      "Shoppers across beauty and fashion are gravitating toward mini formats and trial sizes, treating small, low-commitment purchases as a way to test a product or trend before fully buying in.",
    pillars: ["The Trial Table", "Mini, Not Miniature", "Try, Then Buy Big"],
    social: [
      {
        channel: "TikTok",
        idea: "A \"mini haul\" video unboxing a set of trial sizes across beauty and accessories in one order."
      },
      {
        channel: "Reels",
        idea: "A satisfying side-by-side comparison of mini versus full-size, showing the mini is a real product, not a sample."
      },
      {
        channel: "UGC",
        idea: "Customers post their favorite mini find that they later bought full-size, tagged \"started small.\""
      }
    ],
    email: {
      subject: "Try five things for the price of one",
      concept:
        "A curated mini bundle across categories, framed as low-risk discovery rather than a downsell."
    },
    influencer: {
      archetype: "Discovery and \"first impressions\" creators who already do try-on and unboxing content",
      ask: "A \"testing five minis before I commit\" video across both beauty and accessories."
    },
    launchMoment:
      "New quarter or new season kickoff, when shoppers are naturally more open to trying something new."
  },
  {
    trend: "French Hair Accessories",
    trendCategory: "Cross-Category",
    campaignName: "Pin It Up, Polish It Off",
    tagline: "The outfit upgrade that lives in your hair.",
    insight:
      "Search interest in Parisian-style hair pins and combs is up over 1,000% as polished, editorial hair styling becomes a fast way to elevate an outfit without buying anything new.",
    pillars: ["The Five-Second Upgrade", "Old Money Hair", "One Pin, Every Outfit"],
    social: [
      {
        channel: "TikTok",
        idea: "A \"five second hair upgrade\" video showing one pin transforming a plain outfit into a polished look."
      },
      {
        channel: "Reels",
        idea: "Close-up styling content showing three different ways to wear the same hair pin."
      },
      {
        channel: "UGC",
        idea: "Customers post their own hair-pin styling moment for a feature, tagged with a branded hashtag."
      }
    ],
    email: {
      subject: "The $15 upgrade every outfit needs",
      concept:
        "Position the hair pin as the fastest, cheapest way to elevate any existing outfit, styled three ways in the email itself."
    },
    influencer: {
      archetype: "Old-money and quiet-luxury aesthetic creators already covered in this style territory",
      ask: "A \"how I elevate a basic outfit\" video using only hair accessories."
    },
    launchMoment:
      "Back-to-school and early fall, when polished, put-together looks naturally trend upward."
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
            Select a trend from the Trend Dashboard and Campaign Lab builds
            out the full concept: pillars, social content ideas, an email
            concept, an influencer angle, and the moment to launch it.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            Real 2026 Trend Data · Prototype Concepts
          </span>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <CampaignLab campaigns={campaigns} />
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
            Every campaign here is designed to flow into real product decisions.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#F8F4ED]/75 md:text-lg">
            Product Opportunity Studio and Customer Insight Board are next up
            in the prototype, translating these campaigns into merchandising
            and shopper strategy.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/trend-dashboard"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F8F4ED] px-7 text-sm font-semibold text-[#2B211C] shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition hover:bg-[#EFE7DA]"
            >
              Back to Trend Dashboard
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
