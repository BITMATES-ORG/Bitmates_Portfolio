import type { MetadataRoute } from "next"
import { createAdminClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://adelerekehinde.vercel.app"
  const admin = createAdminClient()

  const { data: posts } = await admin
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("published", true)

  const blogPages =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) ?? []

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...blogPages,
  ]
}
