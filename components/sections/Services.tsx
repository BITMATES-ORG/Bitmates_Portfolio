"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Globe,
  Smartphone,
  Database,
  Cpu,
  type LucideIcon,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Service {
  title: string
  icon?: string
  features: string[]
}

interface ServicesProps {
  services: Service[]
}

const iconMap: Record<string, LucideIcon> = {
  Web: Globe,
  Mobile: Smartphone,
  Backend: Database,
  AI: Cpu,
  Development: Cpu,
}

const defaultColors = ["#4fa3ff", "#5fe0d0", "#a68bff", "#ff8f4f"]

export default function Services({ services }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 40,
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
      id="services"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          SERVICES
        </div>

        <div ref={gridRef} className="grid md:grid-cols-4 gap-6">
          {services.map((svc, i) => {
            const Icon =
              (svc.icon ? iconMap[svc.icon] : undefined) ??
              iconMap[svc.title] ??
              Globe
            const color = defaultColors[i % defaultColors.length]

            return (
              <div key={`${svc.title}-${i}`} className="glass p-6 space-y-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>

                <h3 className="font-semibold text-base font-[family-name:var(--font-space)]">
                  {svc.title}
                </h3>

                <ul className="space-y-2">
                  {svc.features.map((f, featureIndex) => (
                    <li
                      key={`${f}-${featureIndex}`}
                      className="text-sm text-muted flex items-start gap-2"
                    >
                      <span style={{ color }}>&mdash;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
