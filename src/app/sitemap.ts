import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

// Every live route. Add new entries here as routes are added.
const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/software", priority: 0.9 },
  { path: "/service", priority: 0.9 },
  { path: "/regulatory", priority: 0.8 },
  { path: "/shahin", priority: 0.8 },
  { path: "/asateel-certified-obu", priority: 0.8 },
  { path: "/securepath", priority: 0.8 },
  { path: "/securepath-premium", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));
}
