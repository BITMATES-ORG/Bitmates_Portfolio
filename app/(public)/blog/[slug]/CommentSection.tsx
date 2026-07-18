"use client"

import { useState, useEffect, useCallback } from "react"
import { MessageSquare, Reply, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"

interface Comment {
  id: string
  author: string
  email: string
  content: string
  createdAt: string
  isAdmin: boolean
  parentId: string | null
  replies: Comment[]
}

interface CommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [author, setAuthor] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/blog/${postId}/comments`)
      if (res.ok) {
        const data = await res.json()
        setComments(data)
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/blog/${postId}/comments`)
        if (res.ok) {
          const data = await res.json()
          if (!cancelled) setComments(data)
        }
      } catch {
        if (!cancelled) { /* silently fail */ }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [postId])

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author || !email || !content) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/blog/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author,
          email,
          content,
          parentId: replyTo,
        }),
      })

      if (res.ok) {
        setAuthor("")
        setEmail("")
        setContent("")
        setReplyTo(null)
        fetchComments()
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false)
    }
  }

  const buildTree = (flat: Comment[]): Comment[] => {
    const map = new Map<string, Comment>()
    const roots: Comment[] = []

    flat.forEach((c) => map.set(c.id, { ...c, replies: [] }))
    flat.forEach((c) => {
      const node = map.get(c.id)!
      if (c.parentId && map.has(c.parentId)) {
        map.get(c.parentId)!.replies.push(node)
      } else {
        roots.push(node)
      }
    })

    return roots
  }

  const renderComment = (comment: Comment, depth = 0) => (
    <div
      key={comment.id}
      className={cn(
        "space-y-3",
        depth > 0 && "ml-6 pl-4 border-l border-border"
      )}
    >
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{comment.author}</span>
            {comment.isAdmin && (
              <span className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                Admin
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDate(new Date(comment.createdAt))}
          </span>
        </div>
        <p className="text-sm text-muted-foreground whitespace-pre-line">{comment.content}</p>
        <button
          onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
          className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Reply className="size-3" />
          Reply
        </button>
      </div>

      {comment.replies.map((reply) => renderComment(reply, depth + 1))}
    </div>
  )

  const tree = buildTree(comments)

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <MessageSquare className="size-5" />
        Comments ({comments.length})
      </h3>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading comments...</p>
      ) : tree.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {tree.map((comment) => renderComment(comment))}
        </div>
      )}

      <div className="glass-card rounded-2xl p-6 mt-8">
        <h4 className="font-semibold mb-4">
          {replyTo ? "Reply to comment" : "Leave a Comment"}
        </h4>
        {replyTo && (
          <button
            onClick={() => setReplyTo(null)}
            className="mb-3 text-xs text-primary hover:underline"
          >
            Cancel reply
          </button>
        )}
        <form onSubmit={submitComment} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="comment-author" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input
                id="comment-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="comment-email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="comment-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment-content" className="block text-sm font-medium mb-1">
              Comment
            </label>
            <Textarea
              id="comment-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment..."
              rows={4}
              required
            />
          </div>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </div>
    </div>
  )
}
