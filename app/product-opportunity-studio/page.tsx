import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ProductStudio, type ProductOpportunity } from "./ProductStudio";

export const metadata: Metadata = {
  title: "Product Opportunity Studio | Juju's Studio",
  description:
    "Explore product edits, bundles, and merchandising recommendations based on trend behavior."
};

const opportunities: ProductOpportunity[] = [
  {
    trend: "Elevated Minimalism",
    trendCategory: "Fashion",
    editName: "The Power Hour Edit",
    tagline: "One tailored piece, endless authority.",
    insight:
      "Head-to-toe black tailoring dominated Milan's Fall 2026 runways, signaling a return to structured power dressing after several seasons of maximalism.",
    heroProducts: [
      "Structured wool blazer",
      "Straight-leg trouser",
      "Silk camisole",
      "Sculptural leather bag",
      "Pointed-toe flat"
    ],
    bundle: {
      name: "Monochrome Starter Kit",
      contents:
        "The hero blazer paired with the trouser and camisole, styled as a ready-to-wear head-to-toe look out of the box.",
      note: "Priced as a single considered outfit, not three separate impulse buys"
    },
    merchandisingMoment:
      "A single-color fixture near the entrance styled three ways on one mannequin trio, refreshed weekly through fall.",
    crossSell:
      "Care essentials that protect a monochrome wardrobe: a lint roller, garment steamer, and shoe polish kit.",
    retailAngle:
      "Sell versatility, not newness. Show the same pieces working for the office, dinner, and travel."
  },
  {
    trend: "Scent Stacking",
    trendCategory: "Beauty",
    editName: "The Layering Lab Edit",
    tagline: "Three scents, one signature only they know.",
    insight:
      "Shoppers are layering multiple fragrances to build a personal, bespoke scent instead of committing to one signature perfume, mirroring the mix-and-match approach already common in skincare.",
    heroProducts: [
      "Base eau de parfum",
      "Layering oil, warm notes",
      "Layering oil, fresh notes",
      "Travel-size stacking trio",
      "Scented hair mist"
    ],
    bundle: {
      name: "Scent Stacking Starter Set",
      contents:
        "One base fragrance plus two layering oils in complementary note families, with a simple stacking guide card.",
      note: "Built to teach the technique, not just sell three products"
    },
    merchandisingMoment:
      "A fragrance bar with testers grouped by note family instead of by product line, encouraging in-store mixing before purchase.",
    crossSell:
      "Unscented lotion positioned as a layering base, the step that makes fragrance last longer.",
    retailAngle:
      "Let shoppers build their own combination in-store. The discovery process is the sell."
  },
  {
    trend: "Blurred Lips",
    trendCategory: "Beauty",
    editName: "The Blur Edit",
    tagline: "One swipe. Zero precision required.",
    insight:
      "Soft-focus, diffused lip color is replacing sharp liner looks, with related search interest up roughly 300% as a softer \"your lips but better\" aesthetic returns.",
    heroProducts: [
      "Blurring lip tint",
      "Diffusing lip balm",
      "Soft-focus lip liner",
      "Cream blush, color match"
    ],
    bundle: {
      name: "Soft Focus Duo",
      contents:
        "The blurring lip tint paired with a matching cream blush so the whole look reads diffused, not just the lips.",
      note: "Sold as a finished look, not a single product"
    },
    merchandisingMoment:
      "A testing station with a no-mirror-needed application card, letting shoppers try the one-swipe promise themselves.",
    crossSell:
      "A lip mask positioned as the prep step that makes the blurred finish look smoother.",
    retailAngle:
      "Prove the ease claim in-store with a live no-mirror application demo, not just packaging copy."
  },
  {
    trend: "Playful Tights",
    trendCategory: "Fashion",
    editName: "The Legwear Edit",
    tagline: "Five pairs, endless outfit math.",
    insight:
      "Tights moved from an afterthought to a styling tool for fall 2026, with pattern and color used as an easy way to refresh an existing outfit rather than buying something new.",
    heroProducts: [
      "Patterned tights",
      "Colored opaque tights",
      "Textured knit tights",
      "Sheer statement tights"
    ],
    bundle: {
      name: "Pattern Play Set",
      contents:
        "Three tights in coordinating but distinct patterns, styled with one base skirt to show the range in a single display.",
      note: "Priced as an accessory add-on, not a core wardrobe purchase"
    },
    merchandisingMoment:
      "A low-cost impulse fixture near checkout, styled on a single skirt-and-boot mannequin to show the outfit-changing effect.",
    crossSell:
      "Boots and slip dresses merchandised alongside, since tights work best as part of a full silhouette.",
    retailAngle:
      "Sell tights as the highest-impact, lowest-cost way to refresh a fall wardrobe, not as a basics restock."
  },
  {
    trend: "Mini & Trial-Size Everything",
    trendCategory: "Cross-Category",
    editName: "The Trial Table Edit",
    tagline: "Five ways to try before you commit.",
    insight:
      "Shoppers across beauty and fashion are gravitating toward mini formats and trial sizes, treating small, low-commitment purchases as a way to test a product or trend before fully buying in.",
    heroProducts: [
      "Mini fragrance or skincare set",
      "Micro crossbody bag",
      "Trial-size hair tool",
      "Sample-size makeup trio"
    ],
    bundle: {
      name: "Start Small Set",
      contents:
        "A curated mix of minis across beauty and accessories, each redeemable toward a full-size purchase within 60 days.",
      note: "The redemption credit is the real hook, not just the discount"
    },
    merchandisingMoment:
      "A dedicated \"trial table\" near the entrance, refreshed monthly with a new curated mix across categories.",
    crossSell:
      "A loyalty-program tie-in where mini purchases count toward full-size rewards, encouraging graduation from trial to full commitment.",
    retailAngle:
      "Lower the barrier to a first purchase in a new category entirely, using minis as the entry point, not the endpoint."
  },
  {
    trend: "French Hair Accessories",
    trendCategory: "Cross-Category",
    editName: "The Polish Point Edit",
    tagline: "One pin, immediate elevation.",
    insight:
      "Search interest in Parisian-style hair pins and combs is up over 1,000% as polished, editorial hair styling becomes a fast way to elevate an outfit without buying anything new.",
    heroProducts: [
      "Sculpted hair claw",
      "Pearl or crystal hairpin set",
      "Structured headband",
      "Silk hair scarf"
    ],
    bundle: {
      name: "Everyday Polish Set",
      contents:
        "A claw clip, a pin set, and a silk scarf, styled together to show three ways to wear the trend depending on the occasion.",
      note: "Priced as an accessible entry point into the trend, well under any apparel purchase"
    },
    merchandisingMoment:
      "A checkout-adjacent accessory fixture with a styling card showing the same base outfit worn three hair-accessory ways.",
    crossSell:
      "A simple face-framing trim or styling service, positioned as the finishing step that makes the accessories look intentional.",
    retailAngle:
      "Sell the trend at its most accessible price point first. The accessory is the trial version of the whole aesthetic."
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
            Select a trend and Product Opportunity Studio builds out the
            product edit behind it: hero products, a featured bundle, where
            it lives in store or online, and a cross-sell to pair with it.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            Real 2026 Trend Data · Prototype Concepts
          </span>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <ProductStudio opportunities={opportunities} />
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
            Every edit here is built around who's actually shopping it.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#F8F4ED]/75 md:text-lg">
            Customer Insight Board is next up in the prototype, unpacking the
            shopper behind each trend: what they want, why they want it, and
            how brands can meet them.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/campaign-lab"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F8F4ED] px-7 text-sm font-semibold text-[#2B211C] shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition hover:bg-[#EFE7DA]"
            >
              Back to Campaign Lab
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
