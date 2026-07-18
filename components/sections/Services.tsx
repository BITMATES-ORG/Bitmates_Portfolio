"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Globe, Smartphone, Server, Brain, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

interface Service {
  title: string
  description: string
  icon: string
  techTags: string[]
}

interface ServicesProps {
  services: Service[]
}

const defaultServices: Service[] = [
  {
    title: "Web Development",
    description: "Building responsive, performant web applications using modern frameworks like React, Next.js, and more.",
    icon: "Globe",
    techTags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Mobile Development",
    description: "Creating cross-platform mobile applications with native-like performance and great user experiences.",
    icon: "Smartphone",
    techTags: ["React Native", "Expo", "Flutter"],
  },
  {
    title: "Backend Development",
    description: "Designing robust, scalable server-side architectures with RESTful and GraphQL APIs.",
    icon: "Server",
    techTags: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
  },
  {
    title: "AI Development",
    description: "Integrating artificial intelligence and machine learning capabilities into applications.",
    icon: "Brain",
    techTags: ["OpenAI", "LangChain", "TensorFlow", "NLP"],
  },
]

const iconMap: Record<string, typeof Globe> = {
  Globe,
  Smartphone,
  Server,
  Brain,
  Cpu,
}

export default function Services({ services }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const items = services.length > 0 ? services : defaultServices

  useEffect(() => {
    const cards = cardsRef.current?.children
    if (!cards?.length) return

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [items])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service) => {
            const Icon = iconMap[service.icon] || Globe
            return (
              <div
                key={service.title}
                className="glass-card rounded-2xl p-6 space-y-4 flex flex-col"
              >
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.techTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
