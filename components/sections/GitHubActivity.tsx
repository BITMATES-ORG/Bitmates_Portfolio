"use client"

import { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GitBranch, Star, BookOpen, Users } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface GitHubUser {
  login: string
  name?: string
  avatar_url?: string
  public_repos?: number
  followers?: number
}

interface Repo {
  name: string
  description?: string
  html_url?: string
  stargazers_count?: number
  forks_count?: number
  language?: string
}

interface GitHubActivityProps {
  user: GitHubUser
  repos: Repo[]
}

export default function GitHubActivity({ user, repos }: GitHubActivityProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const colsRef = useRef<HTMLDivElement>(null)

  const graphBlocks = useMemo(() => {
    return Array.from({ length: 7 * 10 }, (_, i) => {
      const seed = ((i + 1) * 17 + (user.login?.length ?? 0) * 3) % 100
      const intensity = seed / 100
      let bg = "bg-white/5"
      if (intensity > 0.7) bg = "bg-primary/40"
      else if (intensity > 0.4) bg = "bg-primary/20"
      else if (intensity > 0.15) bg = "bg-primary/10"
      return bg
    })
  }, [user.login])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(colsRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="github"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          GITHUB
        </div>

        <div ref={colsRef} className="grid md:grid-cols-2 gap-8">
          {/* Profile card */}
          <div className="glass p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name ?? user.login}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-card text-xl font-bold text-primary">
                    {(user.name ?? user.login).charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div className="text-lg font-semibold font-[family-name:var(--font-space)]">
                  {user.name ?? user.login}
                </div>
                <div className="text-sm text-muted font-[family-name:var(--font-mono)]">
                  @{user.login}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-3 text-center">
                <div className="flex justify-center mb-1">
                  <BookOpen size={14} className="text-primary" />
                </div>
                <div className="text-lg font-bold">{user.public_repos ?? 0}</div>
                <div className="text-[10px] text-muted font-[family-name:var(--font-mono)] uppercase tracking-wider">
                  Repos
                </div>
              </div>
              <div className="glass p-3 text-center">
                <div className="flex justify-center mb-1">
                  <Users size={14} className="text-primary" />
                </div>
                <div className="text-lg font-bold">{user.followers ?? 0}</div>
                <div className="text-[10px] text-muted font-[family-name:var(--font-mono)] uppercase tracking-wider">
                  Followers
                </div>
              </div>
            </div>
          </div>

          {/* Right column: contribution graph + repos */}
          <div className="space-y-6">
            {/* Contribution graph placeholder */}
            <div className="glass p-6">
              <h4 className="text-sm font-semibold mb-3 font-[family-name:var(--font-space)]">
                Contribution Graph
              </h4>
              <div className="grid grid-cols-7 gap-1">
                {graphBlocks.map((bg, i) => (
                  <div
                    key={`graph-${i}`}
                    className={`aspect-square rounded-sm ${bg}`}
                  />
                ))}
              </div>
            </div>

            {/* Recent repos */}
            <div className="space-y-3">
              {repos.slice(0, 3).map((repo) => (
                <div key={repo.name} className="glass p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <GitBranch size={13} className="shrink-0" />
                      {repo.name}
                    </a>
                    <div className="flex items-center gap-3 text-muted">
                      {repo.stargazers_count !== undefined && (
                        <span className="flex items-center gap-1 text-[11px]">
                          <Star size={11} />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count !== undefined && (
                        <span className="flex items-center gap-1 text-[11px]">
                          <GitBranch size={11} />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </div>
                  {repo.description && (
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  {repo.language && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted font-[family-name:var(--font-mono)]">
                      {repo.language}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
