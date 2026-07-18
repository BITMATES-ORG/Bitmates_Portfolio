"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { type LucideIcon } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  label: string
  value: number
  icon?: string
}

interface StatsProps {
  stats: Stat[]
}

const colors = ["#4fa3ff", "#a68bff", "#5fe0d0", "#ff8f4f"]

export default function Stats({ stats }: StatsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    numbersRef.current.forEach((el, i) => {
      if (!el) return
      const target = stats[i]?.value ?? 0

      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        onUpdate: function () {
          const val = Math.round(this.progress() * target)
          if (el) el.textContent = val.toString()
        },
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats])

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-20 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={gridRef} className="grid md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={`${s.label}-${i}`} className="glass p-6 text-center">
              <div
                ref={(el) => { numbersRef.current[i] = el }}
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space)]"
                style={{ color: colors[i % colors.length] }}
              >
                0
              </div>
              <div className="text-sm text-muted mt-2 font-[family-name:var(--font-mono)] uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
