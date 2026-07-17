import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost"
});

export const metadata: Metadata = {
  title: "Juju's Studio | AI Strategy for Fashion and Beauty",
  description:
    "An AI-powered strategy platform helping fashion and beauty teams turn real trends into campaigns, products, and customer insight."
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
