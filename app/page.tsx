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
    text: "Turn trends into campaign names, launch angles, and influencer concepts."
  },
  {
    title: "Product Opportunities",
    text: "Translate customer behavior into product edits, bundles, and retail moments."
  },
  {
    title: "Customer Insights",
    text: "Connect trends to shopper needs and brand opportunities."
  }
];

const teamCards = [
  {
    title: "Marketing Teams",
    text: "Campaign concepts, launch angles, and seasonal moments."
  },
  {
    title: "Social & Influencer Teams",
    text: "TikTok hooks, content pillars, and creator concepts."
  },
  {
    title: "Buying & Merchandising Teams",
    text: "Trend-backed product edits, assortment ideas, and bundles."
  },
  {
    title: "Brand Strategy Teams",
    text: "Customer insights, positioning, and cultural relevance."
  }
];

const moduleCards = [
  {
    title: "The Guided Studio",
    text: "Start with your brand, see the real upcoming trends rising in your realm, pick your favorites, and get one connected strategy.",
    href: "/studio"
  },
  {
    title: "Campaign Lab",
    text: "Turn a trend into a full campaign concept.",
    href: "/campaign-lab",
    image: "/module-images/campaign-lab.jpg"
  },
  {
    title: "Product Opportunity Studio",
    text: "Turn a trend into product edits, bundles, and merchandising ideas.",
    href: "/product-opportunity-studio",
    image: "/module-images/product-opportunity-studio.jpg"
  },
  {
    title: "Customer Insight Board",
    text: "Understand the shopper behind each trend.",
    href: "/customer-insight-board",
    image: "/module-images/customer-insight-board.jpg"
  },
  {
    title: "Retail Selling Assistant",
    text: "Helps store teams bring campaigns to the sales floor.",
    image: "/module-images/retail-selling-assistant.jpg"
  }
];

const workflow = [
  ["Brand", "Marlow Studio \u2014 womenswear, workwear-leaning, mid-price."],
  ["Trend", "Soft Structure"],
  [
    "Insight",
    "Tailoring is being rebuilt for comfort \u2014 structure that gives, not structure that holds you in."
  ],
  ["Campaign Idea", "Hold the Shape"],
  [
    "Product Opportunity",
    "Unlined stretch-wool blazer, wide-leg trouser with a soft waistband, knit shell that reads as tailoring."
  ],
  [
    "Social Direction",
    "One blazer worn desk to dinner, filmed in a single take. No outfit change."
  ],
  [
    "Retail Angle",
    "Merchandise it beside knitwear, not beside suiting."
  ]
];
export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#9C8F84]">
            Fashion · Beauty · AI Strategy
          </p>
          <h1 className="font-editorial max-w-5xl text-[3rem] leading-[1.04] text-[#2B211C] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5rem]">
            AI-powered strategy for fashion and beauty teams.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#2B211C]/75">
            Turn trends into campaigns, products, and customer insight &mdash;
            all in one workspace.
          </p>
          <p className="mt-5 max-w-xl border-l border-[#C7A6A0]/70 pl-4 text-sm font-medium leading-7 text-[#2B211C]/65">
            Created by Jules Jimenez, a UC Berkeley graduate exploring the
            future of fashion, beauty, and AI.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/studio">Start With Your Brand</Button>
            <Button variant="secondary" href="/#workflow">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-[#2B211C]/10 bg-[#EFE7DA]/65 px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="The Problem"
          title="Fashion and beauty move fast. Strategy should keep up."
          body="Trends move across TikTok, retail, creators, and culture all at once. Brand teams juggle separate tools to turn those signals into campaigns, products, and content. Juju's Studio brings it into one place."
        />
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading title="One workspace for turning trends into action." />
        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
          {platformCards.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="border-y border-[#2B211C]/10 bg-[#3B5D4A] px-5 py-20 text-[#F8F4ED] md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-editorial max-w-3xl text-4xl leading-[1.04] md:text-6xl">
            From trend to strategy, step by step.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#F8F4ED]/75">
            One brand, one trend, followed all the way through.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="rounded-full border border-[#C7A6A0]/50 bg-[#C7A6A0]/20 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#F8F4ED]">
              Sample
            </span>
            <p className="text-xs leading-5 text-[#F8F4ED]/60">
              Invented brand, invented trend. Yours is generated in the Studio.
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-[#F8F4ED]/14">
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
        <SectionHeading title="Built for the teams shaping what's next." />
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
          <SectionHeading eyebrow="The Studio" title="Inside Juju's Studio" />
          <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {moduleCards.map((card) => (
              <InfoCard
                key={card.title}
                badge={
                  card.title === "Retail Selling Assistant"
                    ? "Coming Soon"
                    : card.title === "The Guided Studio"
                      ? "New"
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
              I'm Jules Jimenez, a UC Berkeley graduate who believes fashion and
              beauty teams deserve better tools. I built Juju's Studio to turn
              the way great strategists think &mdash; through trends, customers,
              and campaigns &mdash; into something any team can actually use.
            </p>
            <div className="mt-9 flex flex-col gap-1 border-t border-[#2B211C]/10 pt-7">
              <p className="font-editorial text-4xl italic leading-none text-[#2B211C]">
                Jules Jimenez
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9C8F84]">
                Founder, Juju's Studio
              </p>
            </div>
            <a
              href="/case-study"
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#3B5D4A] underline decoration-[#3B5D4A]/30 underline-offset-4 transition hover:decoration-[#3B5D4A]"
            >
              Read the full case study &rarr;
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-[#3B5D4A] px-6 py-16 text-center text-[#F8F4ED] shadow-[0_28px_80px_rgba(59,93,74,0.2)] md:px-12 md:py-20">
          <div className="mx-auto mb-7 flex max-w-sm items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#EFE7DA]/65">
            <span className="h-px flex-1 bg-[#F8F4ED]/20" />
            <span>For Fashion &amp; Beauty Teams</span>
            <span className="h-px flex-1 bg-[#F8F4ED]/20" />
          </div>
          <h2 className="font-editorial mx-auto max-w-4xl text-4xl leading-[1.02] md:text-6xl">
            The future of fashion and beauty strategy.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#F8F4ED]/75 md:text-lg">
            Juju's Studio helps teams turn culture into strategy &mdash; grounded
            in real trends, powered by AI.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#prototype"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F8F4ED] px-7 text-sm font-semibold text-[#2B211C] shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition hover:bg-[#EFE7DA]"
            >
              Explore the Modules
            </a>
            <a
              href="#workflow"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#F8F4ED]/30 bg-[#F8F4ED]/5 px-7 text-sm font-semibold text-[#F8F4ED] transition hover:border-[#F8F4ED] hover:bg-[#F8F4ED]/10"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
