"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { gsap } from "gsap"
import { Github, Linkedin, Twitter, Mail, Download, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

const ThreeScene = dynamic(() => import("@/components/sections/ThreeScene"), { ssr: false })

interface HeroProps {
  profilePhoto?: string
  fullName: string
  title: string
  tagline: string
  resumeUrl?: string
  github: string
  linkedin: string
  twitter: string
  email: string
}

const socialLinks = [
  { key: "github", icon: Github, label: "GitHub" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "twitter", icon: Twitter, label: "X / Twitter" },
  { key: "email", icon: Mail, label: "Email" },
]

export default function Hero({
  profilePhoto,
  fullName,
  title,
  tagline,
  resumeUrl,
  github,
  linkedin,
  twitter,
  email,
}: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  const socials: Record<string, string> = { github, linkedin, twitter, email }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children ?? [], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })
      if (photoRef.current) {
        gsap.from(photoRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const scrollToProjects = () => {
    const el = document.getElementById("projects")
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 holographic-bg" />
      <ThreeScene />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
        <div ref={contentRef} className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-muted-foreground">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Available for work
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {fullName}
            </h1>

            <p className="text-xl md:text-2xl font-medium text-primary">
              {title}
            </p>

            <p className="text-base text-muted-foreground max-w-lg mx-auto lg:mx-0">
              {tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <a
                href={`mailto:${email}`}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Hire Me
              </a>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToProjects}
              >
                <ArrowDown className="size-4" />
                View Projects
              </Button>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "ghost", size: "lg" })}
                >
                  <Download className="size-4" />
                  Download Resume
                </a>
              )}
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start pt-2">
              {socialLinks.map(({ key, icon: Icon, label }) => {
                const url = socials[key]
                if (!url) return null
                const isEmail = key === "email"
                return (
                  <a
                    key={key}
                    href={isEmail ? `mailto:${url}` : url}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    className="glass p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label={label}
                  >
                    <Icon className="size-5" />
                  </a>
                )
              })}
            </div>
          </div>

          <div ref={photoRef} className="flex-shrink-0">
            <div className="relative size-64 md:size-80 rounded-full overflow-hidden glass-card">
              {profilePhoto ? (
                <Image
                  src={profilePhoto}
                  alt={fullName}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="size-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <span className="text-5xl font-bold text-primary/40">
                    {fullName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
