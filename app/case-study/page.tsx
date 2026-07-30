import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "How I Built This | Juju's Studio",
  description:
    "The case study behind Juju's Studio — the problem, the scoping decisions, and what it took to ship a working AI strategy workspace for fashion and beauty."
};

const scopingDecisions = [
  {
    title: "Export over accounts",
    body: "The obvious next feature was saved history — log in, see everything you've generated. That needs a database, authentication, session handling, and a privacy posture. It would have taken over the project. Instead, every result exports to a clean PDF. A team gets the artifact they wanted, and I didn't spend three weeks building infrastructure to solve a problem nobody had complained about yet. If saved history turns out to matter, the export tells me so first."
  },
  {
    title: "Real trends over invented ones",
    body: "The early version ran on made-up trends with names I liked. It looked fine. But a fashion director reading “Vacation Glow” would have known instantly that it was decoration, and everything downstream of it would have been discounted. So I replaced all six with real, sourced, current signals — and went further in the code. In the Trend Dashboard, the AI is structurally prevented from inventing a trend: the schema constrains its answer to the six real ones. It can pick and it can explain, but it cannot make something up."
  },
  {
    title: "One shared visual language over four",
    body: "Every module's AI output renders through the exact same component as its hand-written preset examples. A generated campaign brief and a curated one are visually identical — the only difference is a label. That was a deliberate constraint on the AI, not just a design preference: because the output has to fit a rendering component that already exists, the model's response is forced into a strict schema. Bad output can't render, so bad output can't ship."
  },
  {
    title: "A real cost ceiling over an unbounded demo",
    body: "This runs on a live API that charges per generation. A public demo with a live model behind it is a bill waiting to happen. I capped it at 18 generations per hour per visitor — enough for someone to open all four modules and try each one two or three times, which is exactly what a curious evaluator does, and low enough that a script can't do real damage."
  }
];

const defendedDecisions = [
  {
    title: "Actually runnable beat looking finished.",
    body: "The easier version of this is a beautiful static site with screenshots of a product that doesn't exist. Those ask you to take the creator's word for it. This one hands you the access code on the page and invites you to test whether I'm right. That's a different claim, and it's the only one I wanted to make."
  },
  {
    title: "Build the pattern once, prove it, then repeat.",
    body: "Campaign Lab came first — API route, schema, UI panel, loading states, error handling, export — and only then did the identical shape extend to the other three modules. Slower on day one, faster every day after. When Strategy Analytics came later, adding it to all four modules was a small change, because they were all the same shape underneath."
  },
  {
    title: "I directed the build; I didn't hand it over.",
    body: "I'm not an engineer. I used AI to write the code, and I'm not going to be coy about that — it's the point. What I brought was the product judgment: what the modules are, what a campaign brief needs to contain, which trends are real, why a fake analytics chart is a liability, when to stop building. The ability to scope a product, direct AI to build it, and know the difference between output and quality is the skill I'd bring to a team — and this site is the artifact of it."
  }
];

export default function CaseStudy() {
  return (
    <main className="min-h-screen">
      <Nav />

      <header className="mx-auto max-w-4xl px-5 pb-14 pt-16 md:px-8 md:pt-24">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#9C8F84]">
          Case Study
        </p>
        <h1 className="font-editorial text-[2.6rem] leading-[1.04] text-[#2B211C] md:text-6xl">
          How I built Juju&rsquo;s Studio
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#2B211C]/75">
          Turning trend signals into brand strategy &mdash; and what it took to
          actually ship it.
        </p>
        <p className="mt-5 text-sm font-medium text-[#2B211C]/60">
          Jules Jimenez &middot; UC Berkeley &middot; Shipped July 2026
        </p>
      </header>

      <article className="mx-auto max-w-4xl px-5 pb-24 md:px-8">
        <section className="border-t border-[#2B211C]/10 pt-12">
          <h2 className="font-editorial text-3xl leading-tight md:text-4xl">
            The problem I wanted to solve
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[#2B211C]/78 md:text-lg">
            <p>Fashion and beauty move faster than the teams working inside them.</p>
            <p>
              A trend surfaces on TikTok, gets picked up by a creator, shows up
              in a retailer&rsquo;s assortment, and starts changing what
              customers ask for at the counter &mdash; often inside the same few
              weeks. But the people who have to respond to that signal are
              sitting in separate workflows. Marketing is building a campaign.
              Buying is placing an order. Social is writing content. Insights is
              running a study. Each one is independently translating the same
              raw signal into their own language, on their own timeline, usually
              in a deck nobody else reads.
            </p>
            <p>
              The cost of that isn&rsquo;t just duplicated effort. It&rsquo;s
              incoherence. The campaign says one thing, the product edit says
              another, and the customer never sees a brand with a point of view
              &mdash; they see four departments that happened to notice the same
              trend.
            </p>
            <p>
              I wanted to build the thing I kept wishing existed: one workspace
              where a trend goes in and a connected strategy comes out.
              Campaign, product, customer, retail &mdash; all derived from the
              same signal, all speaking to each other.
            </p>
          </div>
        </section>

        <section className="mt-16 border-t border-[#2B211C]/10 pt-12">
          <h2 className="font-editorial text-3xl leading-tight md:text-4xl">
            What I built
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[#2B211C]/78 md:text-lg">
            <p>
              Juju&rsquo;s Studio is a working AI strategy workspace. It&rsquo;s
              live, it&rsquo;s public, and anyone can run it right now &mdash;
              four modules, each a different lens on the same starting signal.
            </p>
            <p>
              The <Link href="/trend-dashboard" className="font-semibold text-[#3B5D4A] underline decoration-[#3B5D4A]/30 underline-offset-4 hover:decoration-[#3B5D4A]">Trend Dashboard</Link>{" "}
              reads six real, currently-moving 2026 trends, each cited to a real
              source &mdash; Net-a-Porter&rsquo;s Fall 2026 report, Pinterest
              Predicts, Who What Wear, BeautyMatter. Describe your brand and it
              tells you which of those signals actually fits you.{" "}
              <Link href="/campaign-lab" className="font-semibold text-[#3B5D4A] underline decoration-[#3B5D4A]/30 underline-offset-4 hover:decoration-[#3B5D4A]">Campaign Lab</Link>{" "}
              turns a trend into a full campaign brief.{" "}
              <Link href="/product-opportunity-studio" className="font-semibold text-[#3B5D4A] underline decoration-[#3B5D4A]/30 underline-offset-4 hover:decoration-[#3B5D4A]">Product Opportunity Studio</Link>{" "}
              turns the same trend into a merchandising plan.{" "}
              <Link href="/customer-insight-board" className="font-semibold text-[#3B5D4A] underline decoration-[#3B5D4A]/30 underline-offset-4 hover:decoration-[#3B5D4A]">Customer Insight Board</Link>{" "}
              turns it into a shopper.
            </p>
            <p>
              Every generated result comes back with a Strategy Analytics panel
              &mdash; momentum and opportunity scores, a primary channel, a
              launch window, channel priorities, and audience segments. These
              are the model&rsquo;s strategic estimates, and the panel says so
              on its face. I made that labeling non-negotiable, because a chart
              that looks like measured market data when it isn&rsquo;t is worse
              than no chart at all. And each result exports to PDF, so a team
              walks out with the one thing they came for.
            </p>
          </div>
        </section>

        <section className="mt-16 border-t border-[#2B211C]/10 pt-12">
          <h2 className="font-editorial text-3xl leading-tight md:text-4xl">
            How I scoped it
          </h2>
          <p className="mt-6 text-base leading-8 text-[#2B211C]/78 md:text-lg">
            The most useful thing I did on this project was decide what not to
            build.
          </p>
          <div className="mt-8 grid gap-5">
            {scopingDecisions.map((d) => (
              <div
                key={d.title}
                className="rounded-[1.6rem] border border-[#2B211C]/10 bg-[#EFE7DA]/55 p-6 md:p-8"
              >
                <h3 className="font-editorial text-2xl leading-tight text-[#2B211C]">
                  {d.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-[#2B211C]/75">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-[#2B211C]/10 pt-12">
          <h2 className="font-editorial text-3xl leading-tight md:text-4xl">
            The decisions I&rsquo;d defend in a room
          </h2>
          <div className="mt-8 space-y-8">
            {defendedDecisions.map((d) => (
              <div key={d.title} className="border-l-2 border-[#C7A6A0]/70 pl-5 md:pl-7">
                <h3 className="font-editorial text-2xl leading-tight text-[#2B211C]">
                  {d.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-[#2B211C]/75">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-[#2B211C]/10 pt-12">
          <h2 className="font-editorial text-3xl leading-tight md:text-4xl">
            What&rsquo;s next
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[#2B211C]/78 md:text-lg">
            <p>
              The next real step is the Retail Selling Assistant, the fifth
              module, currently marked Coming Soon on purpose. It&rsquo;s for
              the store associate, not the corporate team: &ldquo;customer needs
              an outfit for a Nashville trip, size medium, budget $300&rdquo;
              in, and an outfit, accessories, upsells, conversation prompts, and
              a follow-up text out. It closes the loop from trend signal all the
              way to the sales floor, which is where most strategy quietly stops
              being real.
            </p>
            <p>
              After that, the honest list is short: saved history if teams ask
              for it, imagery inside the module panels, and a real usage view so
              I can see which module people actually reach for. I&rsquo;d rather
              learn that from use than guess at it now.
            </p>
          </div>
        </section>

        <div className="mt-16 rounded-[2rem] bg-[#3B5D4A] p-8 text-[#F8F4ED] md:p-10">
          <p className="text-sm leading-7 text-[#F8F4ED]/80">
            Juju&rsquo;s Studio is a working concept built and shipped in July
            2026 &mdash; roughly 5,000 lines across 30 files, deployed on
            Vercel, running live on the Claude API. Every trend cited is real.
            Every strategic interpretation built on top of it is mine.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/campaign-lab"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F8F4ED] px-7 text-sm font-semibold text-[#2B211C] transition hover:bg-[#EFE7DA]"
            >
              Try it live
            </Link>
            <Link
              href="/#about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#F8F4ED]/30 px-7 text-sm font-semibold text-[#F8F4ED] transition hover:border-[#F8F4ED] hover:bg-[#F8F4ED]/10"
            >
              About the founder
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
