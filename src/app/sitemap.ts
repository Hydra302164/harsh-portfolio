import type { MetadataRoute } from "next";
import { site } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/projects/jal-tarang`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/projects/lap-replay`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
