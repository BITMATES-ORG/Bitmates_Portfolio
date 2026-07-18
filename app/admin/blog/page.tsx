"use client"

import { Plus, Heart, MessageCircle, Calendar } from "lucide-react"

const posts = [
  { title: "Building with Next.js 16", author: "Adelere K.", published: "2026-07-14", likes: 42, comments: 8, status: "Published" as const },
  { title: "Why I Love TypeScript", author: "Adelere K.", published: "2026-07-08", likes: 38, comments: 12, status: "Published" as const },
  { title: "Supabase Auth Deep Dive", author: "Adelere K.", published: "2026-06-30", likes: 27, comments: 5, status: "Published" as const },
  { title: "CSS Grid Tips", author: "Adelere K.", published: "2026-06-22", likes: 19, comments: 3, status: "Draft" as const },
  { title: "Monorepo Setup Guide", author: "Adelere K.", published: "2026-06-15", likes: 31, comments: 7, status: "Draft" as const },
]

function StatusPill({ status }: { status: "Published" | "Draft" }) {
  const colors = {
    Published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Draft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  }
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  )
}

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">Blog</h1>
          <p className="mt-1 text-sm text-muted">Manage your blog posts</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#4fa3ff] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4fa3ff]/90">
          <Plus size={16} />
          New post
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-3.5 text-left font-medium text-muted">Title</th>
                <th className="px-5 py-3.5 text-left font-medium text-muted">Author</th>
                <th className="px-5 py-3.5 text-left font-medium text-muted">Published</th>
                <th className="px-5 py-3.5 text-left font-medium text-muted">Likes</th>
                <th className="px-5 py-3.5 text-left font-medium text-muted">Comments</th>
                <th className="px-5 py-3.5 text-left font-medium text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.title} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 font-medium text-foreground">{post.title}</td>
                  <td className="px-5 py-4 text-muted">{post.author}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-muted">
                      <Calendar size={14} />
                      {post.published}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-muted">
                      <Heart size={14} />
                      {post.likes}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-muted">
                      <MessageCircle size={14} />
                      {post.comments}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={post.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
