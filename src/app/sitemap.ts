import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

// Single-page marketing site. Add more entries here as routes are added.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
