// Canonical site URL. Set NEXT_PUBLIC_SITE_URL in the deployment environment
// (e.g. https://yourdomain.com). The localhost fallback is dev-only — metadata,
// canonical URLs, sitemap and robots all derive from this, so a wrong value
// here silently breaks SEO in production.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const siteConfig = {
  name: "Next.js Production App",
  description: "A production-ready Next.js application with modern best practices",
  url: siteUrl,
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
};

export type SiteConfig = typeof siteConfig;
