"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Heart, MessageCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Post {
  title: string
  excerpt: string
  date?: string
  image?: string
  slug?: string
  author?: { name: string; avatar?: string }
  likes?: number
  comments?: number
}

interface BlogSectionProps {
  posts: Post[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          BLOG
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.title}
              className="glass overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Cover image */}
              <div className="aspect-video bg-card overflow-hidden">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted/20 text-4xl font-bold font-[family-name:var(--font-mono)]">
                    B
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3">
                {post.date && (
                  <div className="text-[11px] text-muted font-[family-name:var(--font-mono)] uppercase tracking-wider">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}

                <h3 className="font-semibold font-[family-name:var(--font-space)] leading-snug hover:text-primary transition-colors">
                  {post.slug ? (
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  ) : (
                    post.title
                  )}
                </h3>

                <p className="text-sm text-muted leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    {post.author && (
                      <>
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-card ring-1 ring-white/10 shrink-0">
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] font-bold text-primary">
                              {post.author.name?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-muted">{post.author.name}</span>
                      </>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-muted">
                    {post.likes !== undefined && (
                      <span className="flex items-center gap-1 text-[11px]">
                        <Heart size={11} />
                        {post.likes}
                      </span>
                    )}
                    {post.comments !== undefined && (
                      <span className="flex items-center gap-1 text-[11px]">
                        <MessageCircle size={11} />
                        {post.comments}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
