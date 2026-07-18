"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { Globe, Smartphone, Server, Brain, Code2, Users, Star, Award, Zap, Briefcase, GitBranch, Clock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  label: string
  value: number
  icon: string
}

interface StatsProps {
  stats: Stat[]
}

const iconMap: Record<string, typeof Globe> = {
  Globe, Smartphone, Server, Brain, Code2, Users, Star, Award, Zap, Briefcase, GitBranch, Clock,
}

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      onUpdate: () => setCount(Math.floor(obj.val)),
    })
  }, [value, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function Stats({ stats }: StatsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.children
    if (!cards?.length) return

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [stats])

  if (!stats.length) return null

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Zap
            return (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 text-center space-y-2"
              >
                <div className="flex justify-center">
                  <Icon className="size-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
