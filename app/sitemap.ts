import { prisma } from "@/lib/db";

export default async function sitemap() {
  const baseUrl = "https://adelerekehinde.dev";

  let blogEntries: { url: string; lastModified: Date; changeFrequency: "monthly"; priority: number }[] = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, publishedAt: true },
    });
    blogEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB not available during build
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...blogEntries,
  ];
}
