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
    "A recruiter-ready prototype for an AI-powered strategy platform for fashion and beauty corporate teams."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body>{children}</body>
    </html>
  );
}
