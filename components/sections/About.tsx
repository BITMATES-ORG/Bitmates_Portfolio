"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, GitBranch, Globe, MapPin } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface AboutProps {
  about: string
  yearsOfExperience: number
}

const facts = (years: number) => [
  { icon: Code2, label: "Years Coding", value: `${years}+` },
  { icon: Globe, label: "Core Stacks", value: "Python, Dart" },
  { icon: GitBranch, label: "Repositories", value: "50+" },
  { icon: MapPin, label: "Based In", value: "Lagos, NG" },
]

export default function About({ about, yearsOfExperience }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const colsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(colsRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const paragraphs = about.split("\n").filter(Boolean)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          ABOUT
        </div>

        <div ref={colsRef} className="grid md:grid-cols-2 gap-12 items-start">
          {/* Portrait */}
          <div className="flex justify-center">
            <div className="glass p-6 w-full max-w-sm">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-card flex items-center justify-center">
                <img
                  src="/images/portfolio.png"
                  alt="Adelere Kehinde"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-muted leading-relaxed text-base">
                {p}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-4 pt-4">
              {facts(yearsOfExperience).map((f) => (
                <div
                  key={f.label}
                  className="glass p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{f.value}</div>
                    <div className="text-[11px] text-muted font-[family-name:var(--font-mono)] uppercase tracking-wider">
                      {f.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
