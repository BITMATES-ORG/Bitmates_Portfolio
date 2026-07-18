"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { Code2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface AboutProps {
  about: string
  yearsOfExperience: number
}

export default function About({ about, yearsOfExperience }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      gsap.from(decorRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!about) return null

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textRef}>
            <div className="glass-card rounded-2xl p-8">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {about}
              </p>
              <div className="mt-6 flex items-center gap-2 text-primary">
                <span className="text-3xl font-bold">{yearsOfExperience}+</span>
                <span className="text-sm">years of experience</span>
              </div>
            </div>
          </div>

          <div ref={decorRef} className="flex justify-center">
            <div className="relative size-72">
              <div className="absolute inset-0 rounded-full holographic-bg animate-pulse" />
              <div className="absolute inset-4 glass-card rounded-full flex items-center justify-center">
                <Code2 className="size-16 text-primary" />
              </div>
              <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-2 text-sm font-medium">
                {yearsOfExperience}+ Years
              </div>
              <div className="absolute -bottom-2 -left-4 glass-card rounded-xl px-4 py-2 text-sm font-medium">
                Fullstack
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
