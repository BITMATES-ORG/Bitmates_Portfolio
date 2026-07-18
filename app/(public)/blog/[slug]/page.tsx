import { notFound } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/server"
import { mapCamel, formatDate } from "@/lib/utils"
import { Heart, MessageCircle, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const admin = createAdminClient()
  const { data } = await admin.from("blog_posts").select("title, excerpt, cover_image").eq("slug", slug).maybeSingle()
  return {
    title: data?.title ?? "Post",
    description: data?.excerpt ?? "",
    openGraph: { images: data?.cover_image ? [{ url: data.cover_image }] : [] },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const admin = createAdminClient()

  const { data: postRaw } = await admin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  if (!postRaw) notFound()

  const post = mapCamel<any>(postRaw)

  const { data: commentsRaw } = await admin
    .from("comments")
    .select("*")
    .eq("post_id", postRaw.id)
    .order("created_at", { ascending: true })

  const comments = mapCamel<any[]>(commentsRaw ?? [])

  return (
    <article className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="size-4" /> Back to blog
        </Link>

        <div className="flex items-center gap-3 text-xs text-muted mb-4 font-mono">
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          <span>·</span>
          <span>{Math.ceil((post.content?.length || 0) / 1000)} min read</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space)] leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-10">
          <div className="size-10 rounded-full bg-gradient-to-br from-[#4fa3ff] to-[#7a5cff]" />
          <div>
            <div className="text-sm font-medium">{post.author || "AdelereKehinde"}</div>
            <div className="text-xs text-muted">Author</div>
          </div>
        </div>

        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-10">
            <img src={post.coverImage} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
          </div>
        )}

        <div className="flex items-center gap-4 mb-10">
          <button className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Heart className="size-4" /> {post.likeCount ?? 0} likes
          </button>
          <button className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors">
            <MessageCircle className="size-4" /> {post.commentCount ?? 0} comments
          </button>
        </div>

        <div className="prose prose-invert max-w-none mb-16">
          {post.content?.split("\n").map((line: string, i: number) => {
            if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(2)}</h1>
            if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold mt-6 mb-3">{line.slice(3)}</h2>
            if (line.startsWith("- ")) return <li key={i} className="text-muted ml-4">{line.slice(2)}</li>
            if (line.trim()) return <p key={i} className="text-muted leading-relaxed mb-4">{line}</p>
            return <br key={i} />
          })}
        </div>

        <div className="border-t border-white/10 pt-8">
          <h3 className="text-lg font-semibold mb-6">Comments</h3>
          {comments.length === 0 ? (
            <p className="text-muted text-sm">No comments yet. Be the first to reply!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment: any) => (
                <div key={comment.id} className="glass rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-8 rounded-full bg-gradient-to-br from-[#5fe0d0] to-[#4fa3ff]" />
                    <div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        {comment.author}
                        {comment.isAdmin && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4fa3ff]/20 text-[#7ecbff]">Admin</span>
                        )}
                      </div>
                      <div className="text-xs text-muted">{formatDate(comment.createdAt)}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
