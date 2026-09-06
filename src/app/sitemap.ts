import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site";

/*
  Static routes are listed explicitly rather than derived from the
  filesystem, so an unpublished page can never leak back into the index
  by accident. /pavilion is intentionally absent — it is unpublished.
*/
const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/register", priority: 0.9, changeFrequency: "weekly" },
  { path: "/sponsor", priority: 0.9, changeFrequency: "weekly" },
  { path: "/agenda", priority: 0.8, changeFrequency: "weekly" },
  { path: "/awards", priority: 0.8, changeFrequency: "weekly" },
  { path: "/pillars", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pillars/conscious-luxury-living", priority: 0.7, changeFrequency: "monthly" },
  { path: "/why-dubai-2026", priority: 0.7, changeFrequency: "monthly" },
  { path: "/conference/speakers", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/journal", priority: 0.6, changeFrequency: "weekly" },
  { path: "/media/magazine", priority: 0.5, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Published journal posts. Never let a DB hiccup break the sitemap.
  try {
    const posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });
    for (const p of posts) {
      entries.push({
        url: `${SITE_URL}/journal/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  } catch (err) {
    console.error("[sitemap] could not load posts:", err);
  }

  return entries;
}
