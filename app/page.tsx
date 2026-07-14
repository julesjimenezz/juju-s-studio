import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Button, SectionHeading, InfoCard } from "./components/ui";

const platformCards = [
  {
    title: "Trend Intelligence",
    text: "Spot emerging fashion and beauty trends and understand why they matter."
  },
  {
    title: "Campaign Strategy",
    text: "Turn cultural moments into campaign names, launch angles, email ideas, and influencer concepts."
  },
  {
    title: "Product Opportunities",
    text: "Translate customer behavior into product edits, bundles, merchandising ideas, and retail moments."
  },
  {
    title: "Customer Insights",
    text: "Connect trends to shopper needs, lifestyle moments, and brand opportunities."
  }
];

const teamCards = [
  {
    title: "Marketing Teams",
    text: "Campaign concepts, launch angles, seasonal moments, and email ideas."
  },
  {
    title: "Social & Influencer Teams",
    text: "TikTok hooks, content pillars, creator concepts, and community-first ideas."
  },
  {
    title: "Buying & Merchandising Teams",
    text: "Trend-backed product edits, assortment ideas, bundles, and customer shopping moments."
  },
  {
    title: "Brand Strategy Teams",
    text: "Customer insights, positioning ideas, cultural relevance, and competitive angles."
  }
];

const moduleCards = [
  {
    title: "Trend Dashboard",
    text: "See emerging fashion and beauty trends with customer insights and business opportunities.",
    href: "/trend-dashboard",
    image: "/module-images/trend-dashboard.jpg"
  },
  {
    title: "Campaign Lab",
    text: "Turn a selected trend into a full campaign concept with social, email, influencer, and launch ideas.",
    href: "/campaign-lab",
    image: "/module-images/campaign-lab.jpg"
  },
  {
    title: "Product Opportunity Studio",
    text: "Explore product edits, bundles, and merchandising recommendations based on trend behavior.",
    href: "/product-opportunity-studio",
    image: "/module-images/product-opportunity-studio.jpg"
  },
  {
    title: "Customer Insight Board",
    text: "Understand the customer behind each trend: what they want, why they want it, and how brands can meet them.",
    href: "/customer-insight-board",
    image: "/module-images/customer-insight-board.jpg"
  },
  {
    title: "Retail Selling Assistant",
    text: "Future module that helps store teams translate corporate campaigns into styling, upselling, and clienteling support.",
    image: "/module-images/retail-selling-assistant.jpg"
  }
];

const workflow = [
  ["Trend", "Elevated Minimalism"],
  [
    "Insight",
    "Head-to-toe black tailoring dominated Milan's Fall 2026 runways, signaling a return to structured power dressing after several seasons of maximalism."
  ],
  ["Campaign Idea", "Back to Power"],
  [
    "Product Opportunity",
    "Structured wool blazer, straight-leg trouser, silk camisole, sculptural leather bag, pointed-toe flat."
  ],
  [
    "Social Direction",
    "\"One blazer, five outfits\" styling challenges, runway-to-real-life edits, and Power Look of the Week features."
  ],
  [
    "Retail Angle",
    "Sell versatility, not newness. Show one considered piece working across office, dinner, and travel."
  ]
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-8 md:py-22 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#9C8F84]">
            Fashion · Beauty · AI Strategy
          </p>
          <h1 className="font-editorial max-w-3xl text-[3rem] leading-[1.04] text-[#2B211C] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5rem]">
            AI-powered strategy for fashion and beauty teams.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#2B211C]/75">
            Juju's Studio helps brands turn emerging trends into campaign
            ideas, product opportunities, social content, and customer insights,
            all in one simple workspace.
          </p>
          <p className="mt-5 max-w-xl border-l border-[#C7A6A0]/70 pl-4 text-sm font-medium leading-7 text-[#2B211C]/65">
            Created by Jules Jimenez, a UC Berkeley graduate exploring the
            future of fashion, beauty, and AI.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button>Explore the Prototype</Button>
            <Button variant="secondary" href="/#workflow">
              View the Strategy
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-8 hidden h-44 w-44 rounded-full bg-[#C7A6A0]/28 blur-3xl md:block" />
          <div className="relative rounded-[2.1rem] border border-[#2B211C]/10 bg-[#EFE7DA] p-3 shadow-[0_34px_95px_rgba(43,33,28,0.15)]">
            <div className="rounded-[1.75rem] border border-[#2B211C]/10 bg-[#F8F4ED] p-5 md:p-7">
              <div className="mb-6 flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                <span>Juju's Studio</span>
                <span className="h-px flex-1 bg-[#2B211C]/12" />
                <span>Strategy Preview</span>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-[#2B211C]/10 pb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#9C8F84]">
                    Trend Signal
                  </p>
                  <h2 className="font-editorial mt-3 text-4xl leading-none md:text-5xl">
                    Elevated Minimalism
                  </h2>
                </div>
                <span className="whitespace-nowrap rounded-full bg-[#C7A6A0]/35 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] md:text-xs md:tracking-[0.18em]">
                  Live Brief
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  ["Customer Mood", "Confident, disciplined, quietly powerful"],
                  ["Campaign Concept", "Back to Power"],
                  [
                    "Product Edit",
                    "Wool blazer · straight-leg trouser · silk camisole · sculptural bag"
                  ],
                  [
                    "Content Direction",
                    "One-blazer styling challenges · runway-to-real-life edits"
                  ]
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.1rem] border border-[#2B211C]/10 bg-white/38 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
                  >
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
                      {label}
                    </p>
                    <p className="mt-2 text-base font-semibold leading-6">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="The Problem"
          title="Fashion and beauty move fast. Strategy should move with it."
          body="Trends now move across TikTok, retail, creators, product launches, and customer behavior at the same time. But brand teams often have to translate those signals into campaigns, product ideas, content plans, and merchandising moments across separate workflows. Juju's Studio is designed to make that process simpler, clearer, and more connected."
        />
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading title="One workspace for turning trends into action." />
        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
          {platformCards.map((card, index) => (
            <InfoCard
              key={card.title}
              eyebrow={`${String(index + 1).padStart(2, "0")}`}
              {...card}
            />
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="border-y border-[#2B211C]/10 bg-[#3B5D4A] px-5 py-20 text-[#F8F4ED] md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-editorial max-w-3xl text-4xl leading-[1.04] md:text-6xl">
            From trend to strategy in one simple flow.
          </h2>
          <div className="mt-10 overflow-hidden rounded-[1.6rem] border border-[#F8F4ED]/14">
            {workflow.map(([label, value], index) => (
              <div
                key={label}
                className="grid gap-3 border-b border-[#F8F4ED]/12 bg-[#F8F4ED]/[0.055] p-5 last:border-b-0 md:grid-cols-[235px_1fr] md:items-center md:px-6 md:py-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C7A6A0]/40 bg-[#C7A6A0]/18 text-xs font-bold text-[#F8F4ED]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#EFE7DA]/72">
                    {label}
                  </p>
                </div>
                <p className="text-base leading-7 text-[#F8F4ED]/84 md:text-[1.05rem]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="teams" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading title="Built for the teams shaping what customers want next." />
        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2">
          {teamCards.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section
        id="prototype"
        className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-20 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Prototype Modules" title="Inside Juju's Studio" />
          <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {moduleCards.map((card) => (
              <InfoCard
                key={card.title}
                badge={
                  card.title === "Retail Selling Assistant"
                    ? "Coming Soon"
                    : undefined
                }
                {...card}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-5xl px-5 py-20 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#2B211C]/10 bg-[#F8F4ED] p-8 shadow-[0_24px_72px_rgba(43,33,28,0.075)] md:p-12">
          <div className="absolute right-8 top-8 h-24 w-24 overflow-hidden rounded-full border border-[#C7A6A0]/45">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder-headshot.jpg"
              alt="Jules Jimenez, founder of Juju's Studio"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#9C8F84]">
              Founder Note
            </p>
            <h2 className="font-editorial text-4xl leading-[1.02] md:text-6xl">
              Why I built this
            </h2>
            <div className="mt-7 h-px w-24 bg-[#C7A6A0]/75" />
            <p className="mt-7 text-base leading-8 text-[#2B211C]/75 md:text-lg">
              As a recent UC Berkeley graduate interested in fashion, beauty,
              brand strategy, and AI, I wanted to create more than a traditional
              portfolio. I built Juju's Studio to show how I think through
              trends, customers, campaigns, product opportunities, and the
              future of work in fashion and beauty. This project reflects the
              kind of value I want to bring to a team: creative thinking,
              strategic problem-solving, strong taste, and the ability to use AI
              to make ideas more actionable.
            </p>
            <div className="mt-9 flex flex-col gap-1 border-t border-[#2B211C]/10 pt-7">
              <p className="font-editorial text-4xl italic leading-none text-[#2B211C]">
                Jules Jimenez
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9C8F84]">
                Creator of Juju's Studio
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-[#3B5D4A] px-6 py-16 text-center text-[#F8F4ED] shadow-[0_28px_80px_rgba(59,93,74,0.2)] md:px-12 md:py-20">
          <div className="mx-auto mb-7 flex max-w-sm items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#EFE7DA]/65">
            <span className="h-px flex-1 bg-[#F8F4ED]/20" />
            <span>Recruiter Ready Concept</span>
            <span className="h-px flex-1 bg-[#F8F4ED]/20" />
          </div>
          <h2 className="font-editorial mx-auto max-w-4xl text-4xl leading-[1.02] md:text-6xl">
            A prototype for the future of fashion and beauty strategy.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#F8F4ED]/75 md:text-lg">
            Juju's Studio is a recruiter-ready concept designed to explore how
            AI can help fashion and beauty teams work faster, think clearer, and
            turn culture into strategy.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#prototype"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F8F4ED] px-7 text-sm font-semibold text-[#2B211C] shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition hover:bg-[#EFE7DA]"
            >
              View the Prototype
            </a>
            <a
              href="#workflow"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#F8F4ED]/30 bg-[#F8F4ED]/5 px-7 text-sm font-semibold text-[#F8F4ED] transition hover:border-[#F8F4ED] hover:bg-[#F8F4ED]/10"
            >
              See the Workflow Example
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
