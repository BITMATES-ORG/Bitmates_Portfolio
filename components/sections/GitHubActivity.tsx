"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Users, GitFork, Star, Eye, Code2, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string
  fork: boolean
  stargazers_count: number
  language: string
  updated_at: string
  topics: string[]
}

interface GitHubActivityProps {
  user: GitHubUser | null
  repos: GitHubRepo[]
}

export default function GitHubActivity({ user, repos }: GitHubActivityProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const children = contentRef.current?.children
    if (!children?.length) return

    const ctx = gsap.context(() => {
      gsap.from(children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!user) return null

  const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative py-24"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">GitHub Activity</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div ref={contentRef} className="space-y-8">
          <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="size-20 rounded-full overflow-hidden shrink-0">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="size-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{user.name || user.login}</h3>
              {user.bio && (
                <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
              )}
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-bold">{user.followers}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                  <Users className="size-3" />
                  Followers
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">{user.following}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                  <Users className="size-3" />
                  Following
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">{user.public_repos}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                  <Code2 className="size-3" />
                  Repos
                </p>
              </div>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Github className="size-4" />
              View Profile
            </a>
          </div>

          {sortedRepos.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Top Repositories</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card rounded-xl p-5 space-y-3 hover:bg-accent/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {repo.name}
                      </h5>
                      <ExternalLink className="size-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="size-2 rounded-full bg-primary" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="size-3" />
                        {repo.stargazers_count}
                      </span>
                      {repo.fork && (
                        <span className="flex items-center gap-1">
                          <GitFork className="size-3" />
                          Fork
                        </span>
                      )}
                    </div>
                    {repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-[10px] px-1.5 py-0">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
