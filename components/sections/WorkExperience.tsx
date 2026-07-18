"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Experience {
  role: string
  company: string
  dates: string
  description: string
  tags: string[]
}

interface WorkExperienceProps {
  experiences: Experience[]
}

export default function WorkExperience({ experiences }: WorkExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        scaleY: 0,
        duration: 1,
        ease: "power3.inOut",
        transformOrigin: "top center",
      })

      gsap.from(itemsRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          EXPERIENCE
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            ref={lineRef}
            className="absolute left-0 md:left-6 top-2 bottom-2 w-px"
            style={{
              background: "linear-gradient(to bottom, #4fa3ff, #a68bff, transparent)",
            }}
          />

          <div ref={itemsRef} className="space-y-10">
            {experiences.map((exp, i) => (
              <div key={`${exp.role}-${i}`} className="relative pl-8 md:pl-16">
                {/* Dot */}
                <div
                  className="absolute left-[-4px] md:left-[22px] top-1.5 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: "#4fa3ff",
                    background: "#050a14",
                  }}
                />

                <div className="glass p-6 space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold font-[family-name:var(--font-space)]">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-muted">{exp.company}</span>
                  </div>

                  <div className="text-xs text-primary/70 font-[family-name:var(--font-mono)]">
                    {exp.dates}
                  </div>

                  <p className="text-sm text-muted leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((t, tagIndex) => (
                      <span
                        key={`${t}-${tagIndex}`}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted font-[family-name:var(--font-mono)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
