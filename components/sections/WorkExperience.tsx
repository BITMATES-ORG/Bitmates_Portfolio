"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, MapPin, CheckCircle2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface WorkExperience {
  id: string
  company: string
  role: string
  startDate: Date
  endDate?: Date
  current: boolean
  description: string
  techStack: string[]
  companyUrl?: string
  location: string
  narratives: string
  responsibilities: string[]
  achievements: string[]
}

interface WorkExperienceProps {
  experiences: WorkExperience[]
}

export default function WorkExperience({ experiences }: WorkExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = itemsRef.current?.children
    if (!items?.length) return

    const ctx = gsap.context(() => {
      gsap.from(items, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [experiences])

  if (!experiences.length) return null

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div ref={itemsRef} className="relative space-y-8 before:absolute before:left-[18px] before:top-0 before:bottom-0 before:w-0.5 before:bg-border md:before:left-1/2 md:before:-translate-x-px">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className={cn(
                "relative pl-14 md:pl-0 md:w-1/2",
                idx % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
              )}
            >
              <div className="absolute left-[10px] md:left-auto md:right-auto top-1 size-[18px] rounded-full border-2 border-primary bg-background z-10"
                style={idx % 2 === 0 ? {} : { left: undefined, right: undefined }}
              />

              <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm flex items-center gap-1.5"
                      >
                        <Building2 className="size-3.5" />
                        {exp.company}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Building2 className="size-3.5" />
                        {exp.company}
                      </p>
                    )}
                  </div>
                  {exp.current && (
                    <Badge variant="default" className="shrink-0">Current</Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {formatDate(new Date(exp.startDate))} — {exp.current ? "Present" : exp.endDate ? formatDate(new Date(exp.endDate)) : ""}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {exp.location}
                    </span>
                  )}
                </div>

                {exp.description && (
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                )}

                {exp.responsibilities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Responsibilities</h4>
                    <ul className="space-y-1">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Achievements</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
