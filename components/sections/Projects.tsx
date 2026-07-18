"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  description: string
  image?: string
  tags: string[]
  link?: string
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50,
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
      id="projects"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          PROJECTS
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {projects.map((p, index) => (
            <article
              key={`${p.title}-${index}`}
              className={cn(
                "group glass overflow-hidden transition-all duration-300",
                p.link && "cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
              )}
            >
              {/* Cover area */}
              <div className="aspect-video bg-card relative overflow-hidden">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Folder size={40} className="text-muted/30" />
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-semibold font-[family-name:var(--font-space)] group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-3">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {Array.from(new Set(p.tags.filter(Boolean))).slice(0, 5).map((t, tagIndex) => (
                    <span
                      key={`${t}-${tagIndex}`}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted font-[family-name:var(--font-mono)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary mt-2 hover:underline"
                  >
                    View more
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
