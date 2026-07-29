# Juju's Studio

### Turning trend signals into brand strategy — and what it took to actually ship it

**Jules Jimenez** · UC Berkeley · [juju-s-studio.vercel.app](https://juju-s-studio.vercel.app)

---

## The problem I wanted to solve

Fashion and beauty move faster than the teams working inside them.

A trend surfaces on TikTok, gets picked up by a creator, shows up in a retailer's assortment, and starts changing what customers ask for at the counter — often inside the same few weeks. But the people who have to respond to that signal are sitting in separate workflows. Marketing is building a campaign. Buying is placing an order. Social is writing content. Insights is running a study. Each one is independently translating the same raw signal into their own language, on their own timeline, usually in a deck nobody else reads.

The cost of that isn't just duplicated effort. It's incoherence. The campaign says one thing, the product edit says another, and the customer never sees a brand with a point of view — they see four departments that happened to notice the same trend.

I wanted to build the thing I kept wishing existed: one workspace where a trend goes in and a connected strategy comes out. Campaign, product, customer, retail — all derived from the same signal, all speaking to each other.

## What I built

Juju's Studio is a working AI strategy workspace for fashion and beauty teams. It's live, it's public, and anyone can run it right now.

It has four modules, each one a different lens on the same starting signal:

**Trend Dashboard** reads six real, currently-moving 2026 trends — elevated minimalism, scent stacking, blurred lips, playful tights, mini and trial sizes, French hair accessories — each cited to a real source (Net-a-Porter's Fall 2026 report, Pinterest Predicts, Who What Wear, BeautyMatter). Describe your brand and it tells you which of those signals actually fits you, and what to do about it.

**Campaign Lab** turns a trend into a full campaign brief: name, tagline, three strategic pillars, social content directions, an email concept, an influencer angle, and a launch moment.

**Product Opportunity Studio** turns the same trend into a merchandising plan: hero products, a featured bundle, a merchandising moment, cross-sell logic, and the retail angle.

**Customer Insight Board** turns it into a shopper: who they are, what they want, why it matters, what's stopping them, and where to reach them.

Every generated result also comes back with a **Strategy Analytics** panel — momentum and opportunity scores, a primary channel, a launch window, a weighted channel priority ranking, and an audience segment breakdown. These are the model's strategic estimates, and the panel says so on its face. I made that labeling non-negotiable, because a chart that looks like measured market data when it isn't is worse than no chart at all.

Each result exports to PDF, so a team can walk out with the one thing they came for.

## How I scoped it

The most useful thing I did on this project was decide what not to build.

**I chose export over accounts.** The obvious next feature was saved history — log in, see everything you've generated. That needs a database, authentication, session handling, and a privacy posture. It would have taken over the project. Instead, every result exports to a clean PDF. A team gets the artifact they wanted, and I didn't spend three weeks building infrastructure to solve a problem nobody had complained about yet. If saved history turns out to matter, the export tells me so first.

**I chose real trends over invented ones.** The early version ran on made-up trends with names I liked. It looked fine. But a fashion director reading "Vacation Glow" would have known instantly that it was decoration, and everything downstream of it would have been discounted. So I replaced all six with real, sourced, current signals — and I went further than that in the code. In the Trend Dashboard, the AI is *structurally prevented* from inventing a trend: the schema constrains its answer to the six real ones. It can pick and it can explain, but it cannot make something up. That constraint is the difference between a tool a brand could trust and a tool that generates plausible-sounding nonsense.

**I chose one shared visual language over four.** Every module's AI output renders through the exact same component as its hand-written preset examples. A generated campaign brief and a curated campaign brief are visually identical — the only difference is a label. That was a deliberate constraint on the AI, not just a design preference: because the output has to fit a rendering component that already exists, the model's response is forced into a strict schema. Bad output can't render, so bad output can't ship.

**I chose a real cost ceiling over an unbounded demo.** This runs on a live API that charges me per generation. A public demo with a live model behind it is a bill waiting to happen. I capped it at 18 generations per hour per visitor — enough for someone to open all four modules and try each one two or three times, which is exactly what a curious evaluator does, and low enough that a script can't do real damage.

## The decisions I'd defend in a room

**Making it actually runnable was worth more than making it look finished.** The version of this that would have been easier to build is a beautiful static site with screenshots of a product that doesn't exist. I've seen a lot of those. They ask you to take the creator's word for it. This one hands you the access code on the page and invites you to test whether I'm right. That's a different claim, and it's the only one I actually wanted to make.

**I built the pattern once and proved it before repeating it.** Campaign Lab was first. I got it working end to end — API route, schema, UI panel, loading states, error handling, export — and only then extended the identical shape to the other three modules. That took longer on day one and saved days after. When I later added Strategy Analytics, adding it to all four modules was a small change, because they were all the same shape underneath.

**I directed the build; I didn't hand it over.** I'm not an engineer. I used AI to write the code, and I'm not going to be coy about that — it's the point. What I brought was the product judgment: what the modules are, what a campaign brief needs to contain, which trends are real, what "they/them" instead of "she/her" signals to a customer, why a fake analytics chart is a liability, when to stop building. Every architectural tradeoff on this page was a choice I made and can explain. The ability to scope a product, direct AI to build it, and know the difference between output and quality is the skill I'd bring to a team — and this is the artifact of it.

## What's next

The next real step is **Retail Selling Assistant**, the fifth module, currently marked Coming Soon on purpose. It's for the store associate, not the corporate team: "customer needs an outfit for a Nashville trip, size medium, budget $300" in, and an outfit, accessories, upsells, conversation prompts, and a follow-up text out. It closes the loop from trend signal all the way to the sales floor, which is where most strategy quietly stops being real.

After that, the honest list is short: saved history if teams ask for it, imagery inside the module panels, and a real usage view so I can see which module people actually reach for. I'd rather learn that from use than guess at it now.

---

*Juju's Studio is a working concept built and shipped between July 8 and July 29, 2026 — roughly 5,000 lines across 30 files, deployed on Vercel, running live on the Claude API. Every trend cited is real. Every strategic interpretation built on top of it is mine.*

**Jules Jimenez** · [linkedin.com/in/jules-jimenez](https://linkedin.com/in/jules-jimenez) · julesjimenez04@gmail.com
