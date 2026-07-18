"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  clientName: string
  company: string
  review: string
  rating: number
  avatar?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
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

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          TESTIMONIALS
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div key={`${t.clientName}-${index}`} className="glass p-6 space-y-4 relative">
              <Quote size={24} className="text-primary/20 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={`star-${index}-${i}`}
                    className={`text-sm ${i < t.rating ? "text-yellow-400" : "text-white/10"}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm text-muted leading-relaxed">
                &ldquo;{t.review}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-card ring-1 ring-white/10 shrink-0">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.clientName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-primary">
                      {t.clientName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.clientName}</div>
                  <div className="text-xs text-muted">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
