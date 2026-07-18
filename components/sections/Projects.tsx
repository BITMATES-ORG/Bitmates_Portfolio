"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

gsap.registerPlugin(ScrollTrigger)

interface ProjectImage {
  url: string
}

interface Project {
  id: string
  title: string
  summary: string
  description: string
  coverImage?: string
  techStack: string[]
  liveLink?: string
  githubLink?: string
  problemSolved: string
  results: string
  images: ProjectImage[]
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const [galleryIdx, setGalleryIdx] = useState(0)

  useEffect(() => {
    const cards = cardsRef.current?.children
    if (!cards?.length) return

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [projects])

  const openModal = (project: Project) => {
    setSelected(project)
    setGalleryIdx(0)
  }

  if (!projects.length) return null

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative py-24"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => openModal(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                      <span className="text-4xl font-bold text-primary/30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        {selected && (
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selected.title}</DialogTitle>
              <DialogDescription>{selected.summary}</DialogDescription>
            </DialogHeader>

            {selected.images.length > 0 && (
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                <Image
                  src={selected.images[galleryIdx].url}
                  alt={`${selected.title} screenshot`}
                  fill
                  className="object-cover"
                />
                {selected.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setGalleryIdx((prev) => (prev === 0 ? selected.images.length - 1 : prev - 1))
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 glass p-2 rounded-full"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setGalleryIdx((prev) => (prev === selected.images.length - 1 ? 0 : prev + 1))
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 glass p-2 rounded-full"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selected.images.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "size-2 rounded-full transition-colors",
                            i === galleryIdx ? "bg-white" : "bg-white/40"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="space-y-4">
              {selected.description && (
                <div>
                  <h4 className="font-semibold mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{selected.description}</p>
                </div>
              )}
              {selected.problemSolved && (
                <div>
                  <h4 className="font-semibold mb-1">Problem Solved</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{selected.problemSolved}</p>
                </div>
              )}
              {selected.results && (
                <div>
                  <h4 className="font-semibold mb-1">Results</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{selected.results}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {selected.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              {selected.liveLink && (
                <a
                  href={selected.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "primary", size: "sm" })}
                >
                  <ExternalLink className="size-4" />
                  Live Demo
                </a>
              )}
              {selected.githubLink && (
                <a
                  href={selected.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  <Github className="size-4" />
                  Source Code
                </a>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
