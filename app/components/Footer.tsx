import Link from "next/link";

const navigateLinks = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "The Guided Studio" },
  { href: "/trend-dashboard", label: "Trend Dashboard" },
  { href: "/campaign-lab", label: "Campaign Lab" },
  { href: "/product-opportunity-studio", label: "Product Opportunity Studio" },
  { href: "/customer-insight-board", label: "Customer Insight Board" }
];

const exploreLinks = [
  { href: "/#platform", label: "Platform" },
  { href: "/#workflow", label: "How It Works" },
  { href: "/#teams", label: "For Teams" },
  { href: "/#about", label: "About" },
  { href: "/case-study", label: "How I Built This" }
];

export function Footer() {
  return (
    <footer className="border-t border-[#2B211C]/10 bg-[#EFE7DA]">
      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-8 md:pt-20">
        <Link
          href="/"
          className="block text-[3.4rem] leading-none tracking-[-0.01em] text-[#3B5D4A] sm:text-[5rem] md:text-[7rem]"
          style={{ fontFamily: "var(--font-jost)", fontWeight: 600 }}
        >
          juju&rsquo;s studio
        </Link>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-[#2B211C]/10 px-5 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <p className="text-base leading-7 text-[#2B211C]/65">
              An AI strategy studio for fashion and beauty &mdash; turning
              culture into campaigns, products, and customer insight.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navigateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#2B211C]/70 transition hover:text-[#2B211C]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#2B211C]/70 transition hover:text-[#2B211C]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#9C8F84]">
              Connect
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/jules-jimenez"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[#2B211C]/70 transition hover:text-[#2B211C]"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:julesjimenez04@gmail.com"
                  className="text-sm text-[#2B211C]/70 transition hover:text-[#2B211C]"
                >
                  julesjimenez04@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#2B211C]/10 pt-7 text-xs text-[#2B211C]/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Juju&rsquo;s Studio. Built by Jules Jimenez.</p>
          <p className="uppercase tracking-[0.18em]">AI Strategy Studio</p>
        </div>
      </div>
    </footer>
  );
}
