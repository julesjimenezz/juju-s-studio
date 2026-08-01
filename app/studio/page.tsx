import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { StudioFlow } from "./StudioFlow";
import { TrendIndex } from "../components/TrendIndex";

// The Trend Index below the header folds in the live Trend Pulse, whose
// upstream data is cached for six hours. Matching that here keeps the
// page static and warm in between refreshes.
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "The Studio | Juju's Studio",
  description:
    "Describe your brand, see the real upcoming trends rising in your realm, pick the ones you believe in, and get one connected strategy — campaign, product, customer, and next steps."
};

export default function StudioPage() {
  return (
    <main className="min-h-screen">
      <Nav />

      <header className="mx-auto max-w-4xl px-5 pb-12 pt-16 text-center md:px-8 md:pt-20">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#9C8F84]">
          The Guided Studio
        </p>
        <h1 className="font-editorial text-[2.6rem] leading-[1.04] text-[#2B211C] md:text-6xl">
          From your brand to a full strategy.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#2B211C]/75">
          Tell us your brand. We search 100+ real, published upcoming-trend
          forecasts &mdash; from Pinterest Predicts to WGSN to TikTok&rsquo;s own
          reports &mdash; find what&rsquo;s rising in your realm, and turn your
          picks into one connected plan.
        </p>
      </header>

      <TrendIndex />

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-14 md:px-8">
        <StudioFlow />
      </section>

      <Footer />
    </main>
  );
}
