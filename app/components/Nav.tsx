"use client";

import Link from "next/link";
import { Logo } from "./Logo";

function scrollToTopIfHome(e: React.MouseEvent) {
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-[#2B211C]/10 bg-[#F8F4ED]/90 backdrop-blur-xl">
      <input type="checkbox" id="nav-toggle" className="peer hidden" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" onClick={scrollToTopIfHome} aria-label="Juju's Studio — back to top">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-[0.83rem] font-semibold uppercase tracking-[0.12em] text-[#2B211C]/62 lg:flex">
          <Link href="/#platform" className="hover:text-[#2B211C]">
            Platform
          </Link>
          <Link href="/#workflow" className="hover:text-[#2B211C]">
            How It Works
          </Link>
          <Link href="/#teams" className="hover:text-[#2B211C]">
            For Teams
          </Link>
          <Link href="/#about" className="hover:text-[#2B211C]">
            About
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/#prototype"
            className="rounded-full border border-[#2B211C]/20 bg-[#F8F4ED]/70 px-5 py-2.5 text-sm font-semibold shadow-[0_10px_24px_rgba(43,33,28,0.06)] transition hover:border-[#2B211C] hover:bg-[#EFE7DA]/55"
          >
            Get Started
          </Link>
          <label
            htmlFor="nav-toggle"
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#2B211C]/20 bg-[#F8F4ED]/70 transition hover:border-[#2B211C] lg:hidden"
          >
            <span className="flex flex-col gap-[4px]">
              <span className="block h-[1.5px] w-5 bg-[#2B211C]" />
              <span className="block h-[1.5px] w-5 bg-[#2B211C]" />
              <span className="block h-[1.5px] w-5 bg-[#2B211C]" />
            </span>
          </label>
        </div>
      </div>
      <div className="max-h-0 overflow-hidden border-t border-transparent transition-[max-height] duration-300 ease-out peer-checked:max-h-96 peer-checked:border-[#2B211C]/10 lg:hidden">
        <div className="flex flex-col gap-1 px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#2B211C]/70">
          <Link href="/#platform" className="rounded-lg px-2 py-3 hover:bg-[#EFE7DA]/60 hover:text-[#2B211C]">
            Platform
          </Link>
          <Link href="/#workflow" className="rounded-lg px-2 py-3 hover:bg-[#EFE7DA]/60 hover:text-[#2B211C]">
            How It Works
          </Link>
          <Link href="/#teams" className="rounded-lg px-2 py-3 hover:bg-[#EFE7DA]/60 hover:text-[#2B211C]">
            For Teams
          </Link>
          <Link href="/#about" className="rounded-lg px-2 py-3 hover:bg-[#EFE7DA]/60 hover:text-[#2B211C]">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
