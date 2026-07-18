"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Code2,
  Database,
  Smartphone,
  Cloud,
  type LucideIcon,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Skill {
  name: string
  category: string
  level: number
  icon?: string
}

interface SkillsProps {
  skills: Skill[]
}

const categoryMeta: Record<string, { icon: LucideIcon; color: string }> = {
  Frontend: { icon: Code2, color: "#4fa3ff" },
  Backend: { icon: Database, color: "#a68bff" },
  Mobile: { icon: Smartphone, color: "#5fe0d0" },
  DevOps: { icon: Cloud, color: "#ff8f4f" },
  Databases: { icon: Database, color: "#5fe0d0" },
  BaaS: { icon: Cloud, color: "#ff8f4f" },
}

export default function Skills({ skills }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const grouped: Record<string, Skill[]> = {}
  for (const skill of skills) {
    const cat = skill.category
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(skill)
  }

  // Merge Mobile & DevOps into one column label
  const merged: { label: string; skills: Skill[]; meta: { icon: LucideIcon; color: string } }[] = []

  if (grouped["Mobile"] || grouped["DevOps"]) {
    const mobileDevOps = [...(grouped["Mobile"] ?? []), ...(grouped["DevOps"] ?? [])]
    merged.push({
      label: "Mobile & DevOps",
      skills: mobileDevOps,
      meta: { icon: Smartphone, color: "#5fe0d0" },
    })
    delete grouped["Mobile"]
    delete grouped["DevOps"]
  }

  for (const [label, list] of Object.entries(grouped)) {
    merged.push({
      label,
      skills: list,
      meta: categoryMeta[label] ?? { icon: Code2, color: "#4fa3ff" },
    })
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          SKILLS
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {merged.map((cat, catIndex) => (
            <div key={`${cat.label}-${catIndex}`} className="glass p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `${cat.meta.color}15` }}
                >
                  <cat.meta.icon size={18} style={{ color: cat.meta.color }} />
                </div>
                <h3 className="font-semibold text-base font-[family-name:var(--font-space)]">
                  {cat.label}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((sk, skillIndex) => (
                  <div key={`${sk.name}-${skillIndex}`}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>{sk.name}</span>
                      <span className="text-muted font-[family-name:var(--font-mono)] text-xs">
                        {sk.level}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${sk.level}%`,
                          background: `linear-gradient(90deg, ${cat.meta.color}, ${cat.meta.color}88)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
