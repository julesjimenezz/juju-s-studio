import type { MetadataRoute } from "next";

const base = "https://juju-s-studio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/studio",
    "/trend-dashboard",
    "/campaign-lab",
    "/product-opportunity-studio",
    "/customer-insight-board",
    "/case-study"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8
  }));
}
