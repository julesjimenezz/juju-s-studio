import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juju-s-studio.vercel.app"),
  title: "Juju's Studio | AI Strategy for Fashion and Beauty",
  description:
    "An AI-powered strategy platform helping fashion and beauty teams turn real trends into campaigns, products, and customer insight.",
  openGraph: {
    title: "Juju's Studio | AI Strategy for Fashion and Beauty",
    description:
      "Turn trends into campaigns, products, and customer insight — all in one workspace. Built by Jules Jimenez.",
    url: "/",
    siteName: "Juju's Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Juju's Studio — AI-powered strategy for fashion and beauty teams"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Juju's Studio | AI Strategy for Fashion and Beauty",
    description:
      "Turn trends into campaigns, products, and customer insight — all in one workspace.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
