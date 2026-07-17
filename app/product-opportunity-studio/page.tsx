import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ProductStudio, type ProductOpportunity } from "./ProductStudio";

export const metadata: Metadata = {
  title: "Product Opportunity Studio | Juju's Studio",
  description:
    "Turn a trend into a product edit — hero products, a bundle, why it works, and clear next steps."
};

const opportunities: ProductOpportunity[] = [
  {
    trend: "Elevated Minimalism",
    trendCategory: "Fashion",
    editName: "The Power Hour Edit",
    tagline: "One tailored piece, endless authority.",
    insight:
      "Black tailoring took over Milan's Fall 2026 runways — a return to structured power dressing.",
    whyThisWorks:
      "One investment blazer sells a whole look. Shoppers buy versatility, not a new wardrobe.",
    heroProducts: [
      "Structured wool blazer",
      "Straight-leg trouser",
      "Silk camisole",
      "Sculptural leather bag"
    ],
    bundle: {
      name: "Monochrome Starter Kit",
      contents: "The hero blazer with the trouser and camisole, as one ready-to-wear look.",
      note: "Priced as one considered outfit, not three impulse buys"
    },
    crossSell: "Garment care: a steamer and lint roller to keep a monochrome wardrobe sharp.",
    retailAngle: "Sell versatility — show one piece working for office, dinner, and travel.",
    nextSteps: [
      "Choose one hero blazer to anchor the edit.",
      "Style it three ways on one mannequin trio.",
      "Feature it near the entrance through fall."
    ]
  },
  {
    trend: "Scent Stacking",
    trendCategory: "Beauty",
    editName: "The Layering Lab Edit",
    tagline: "Three scents, one signature only they know.",
    insight:
      "Shoppers layer fragrances to build a bespoke scent, like they already do with skincare.",
    whyThisWorks:
      "Selling the system, not one bottle, turns a single sale into a repeat routine.",
    heroProducts: [
      "Base eau de parfum",
      "Warm layering oil",
      "Fresh layering oil",
      "Travel stacking trio"
    ],
    bundle: {
      name: "Scent Stacking Starter Set",
      contents: "One base fragrance plus two complementary layering oils, with a stacking guide.",
      note: "Built to teach the technique, not just sell three products"
    },
    crossSell: "Unscented lotion as a layering base — the step that makes scent last.",
    retailAngle: "Let shoppers mix at a tester bar. The discovery is the sell.",
    nextSteps: [
      "Bundle a base with two layering oils.",
      "Set up a note-family tester bar in-store.",
      "Add a one-card stacking guide."
    ]
  },
  {
    trend: "Blurred Lips",
    trendCategory: "Beauty",
    editName: "The Blur Edit",
    tagline: "One swipe. Zero precision required.",
    insight:
      "Soft, diffused lip color is replacing sharp liner looks — search interest up roughly 300%.",
    whyThisWorks:
      "No skill, no mirror needed. Ease of use is what makes it an easy purchase.",
    heroProducts: [
      "Blurring lip tint",
      "Diffusing lip balm",
      "Cream blush color-match"
    ],
    bundle: {
      name: "Soft Focus Duo",
      contents: "The blurring lip tint with a matching cream blush, so the whole look reads diffused.",
      note: "Sold as a finished look, not a single product"
    },
    crossSell: "A lip mask as the prep step that makes the finish look smoother.",
    retailAngle: "Prove the ease in-store with a live, no-mirror application demo.",
    nextSteps: [
      "Pair the tint with a matching blush.",
      "Add a no-mirror testing station.",
      "Launch now to ride the search spike."
    ]
  },
  {
    trend: "Playful Tights",
    trendCategory: "Fashion",
    editName: "The Legwear Edit",
    tagline: "Five pairs, endless outfit math.",
    insight:
      "Tights became a styling tool for fall 2026 — a low-cost way to refresh an existing outfit.",
    whyThisWorks:
      "As an accessory, tights are a high-impact, low-cost impulse buy, not a basics restock.",
    heroProducts: [
      "Patterned tights",
      "Colored opaque tights",
      "Textured knit tights",
      "Sheer statement tights"
    ],
    bundle: {
      name: "Pattern Play Set",
      contents: "Three coordinating patterns styled with one base skirt to show the range.",
      note: "Priced as an accessory add-on"
    },
    crossSell: "Boots and slip dresses nearby — tights work best in a full silhouette.",
    retailAngle: "Sell tights as the cheapest way to refresh a fall wardrobe.",
    nextSteps: [
      "Merchandise tights as an accessory, near checkout.",
      "Style one skirt with three different pairs.",
      "Launch early fall, as layering starts."
    ]
  },
  {
    trend: "Mini & Trial-Size Everything",
    trendCategory: "Cross-Category",
    editName: "The Trial Table Edit",
    tagline: "Five ways to try before you commit.",
    insight:
      "Shoppers treat minis and trial sizes as a low-commitment way to test a product or trend.",
    whyThisWorks:
      "Minis lower the barrier to a first purchase — the entry point, not the endpoint.",
    heroProducts: [
      "Mini skincare set",
      "Micro crossbody bag",
      "Trial-size hair tool",
      "Sample makeup trio"
    ],
    bundle: {
      name: "Start Small Set",
      contents: "A curated mix of minis across beauty and accessories, each redeemable toward full-size.",
      note: "The redemption credit is the real hook"
    },
    crossSell: "A loyalty tie-in where minis count toward full-size rewards.",
    retailAngle: "Lower the barrier to a first buy in a new category, using minis as the door.",
    nextSteps: [
      "Curate a cross-category mini bundle.",
      "Add a redeem-toward-full-size credit.",
      "Set up a monthly trial table near the entrance."
    ]
  },
  {
    trend: "French Hair Accessories",
    trendCategory: "Cross-Category",
    editName: "The Polish Point Edit",
    tagline: "One pin, immediate elevation.",
    insight:
      "Parisian hair pins and combs are surging — searches up over 1,000% — as a fast outfit upgrade.",
    whyThisWorks:
      "The lowest-price entry to an 'elevated' look — borrowed prestige without an apparel spend.",
    heroProducts: [
      "Sculpted hair claw",
      "Pearl or crystal pin set",
      "Structured headband",
      "Silk hair scarf"
    ],
    bundle: {
      name: "Everyday Polish Set",
      contents: "A claw clip, a pin set, and a silk scarf, styled to show three ways to wear the trend.",
      note: "Priced as an accessible entry point"
    },
    crossSell: "A face-framing trim service — the finishing step that makes it look intentional.",
    retailAngle: "Sell the trend at its most accessible price first — the accessory is the trial.",
    nextSteps: [
      "Set an accessory fixture near checkout.",
      "Show one outfit worn three hair-accessory ways.",
      "Launch for back-to-school and early fall."
    ]
  }
];

export default function ProductOpportunityStudioPage() {
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
            Platform · Product Opportunity Studio
          </p>
          <h1 className="font-editorial text-[2.75rem] leading-[1.04] text-[#2B211C] md:text-[3.75rem]">
            Turn a trend into a merchandising plan.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#2B211C]/75 md:text-lg">
            Pick a trend and get the product edit, why it works, and your next steps.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            Real 2026 Trend Data
          </span>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <ProductStudio opportunities={opportunities} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
