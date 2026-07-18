import { marked } from "marked"
import { notFound } from "next/navigation"
import { Calendar, User, Eye, Heart, MessageSquare } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import LikeButton from "./LikeButton"
import CommentSection from "./CommentSection"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  try {
    const res = await fetch(`${BASE}/api/blog/${slug}`, { cache: "no-store" })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const htmlContent = marked.parse(post.content || "")

  return (
    <article className="min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="size-4" />
              {formatDate(new Date(post.publishedAt || post.createdAt))}
            </span>
            <span className="flex items-center gap-1">
              <User className="size-4" />
              {post.author || "AdelereKehinde"}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-4" />
              {post.viewCount || 0} views
            </span>
            <span className="flex items-center gap-1">
              <Heart className="size-4" />
              {post.likeCount || 0} likes
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="size-4" />
              {post.commentCount || 0} comments
            </span>
          </div>
        </div>

        {post.coverImage && (
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="size-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-sm md:prose-base dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="flex items-center gap-4 mb-12">
          <LikeButton postId={post.id} initialCount={post.likeCount || 0} />
        </div>

        <CommentSection postId={post.id} />
      </div>
    </article>
  )
}
