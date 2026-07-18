"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Profile {
  profilePhoto?: string
  fullName: string
  title: string
  bio: string
  stats?: { projects: number; clients: number; years: number }
  repos?: number
  stacks?: string[]
}

interface HeroProps {
  profile: Profile
}

export default function Hero({ profile }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
      gsap.from(rightRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        delay: 0.3,
        ease: "power3.out",
      })
      gsap.to(cueRef.current, {
        y: 10,
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const s = profile.stats ?? { projects: 0, clients: 0, years: 0 }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Holographic backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="glow"
          style={{
            width: "50vw",
            height: "50vw",
            top: "-10%",
            right: "-10%",
            background: "radial-gradient(circle, rgba(79,163,255,0.25), transparent 70%)",
          }}
        />
        <div
          className="glow"
          style={{
            width: "40vw",
            height: "40vw",
            bottom: "-5%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(166,139,255,0.2), transparent 70%)",
          }}
        />
        <div
          className="glow"
          style={{
            width: "30vw",
            height: "30vw",
            top: "40%",
            left: "50%",
            background: "radial-gradient(circle, rgba(95,224,208,0.12), transparent 70%)",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div ref={leftRef} className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-[family-name:var(--font-mono)] text-green-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            Available for freelance work
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-[family-name:var(--font-space)]">
            I build scalable web &amp; mobile{" "}
            <span className="text-accent">applications</span>
          </h1>

          <p className="text-muted text-base md:text-lg leading-relaxed max-w-lg">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-medium hover:brightness-110 transition-all shadow-lg shadow-primary/25"
            >
              Hire me
              <ArrowRight size={16} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm font-medium hover:border-white/30 transition-all"
            >
              View projects
            </a>
            <a
              href="/Adelere Cv.pdf"
              download="Adelere-Kehinde-CV.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-sm font-medium hover:border-white/25 transition-all"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4">
            {[
              { icon: Github, href: "https://github.com/AdelereKehinde", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/AdelereKehinde", label: "LinkedIn" },
              { icon: XIcon, href: "https://x.com/AdelereKehinde", label: "X" },
              { icon: Mail, href: "mailto:adelerekehinde@gmail.com", label: "Email" },
            ].map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 transition-all"
                aria-label={soc.label}
              >
                <soc.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Right */}
        <div ref={rightRef} className="flex justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-[2rem] opacity-70 pointer-events-none"
              style={{
                background: "linear-gradient(120deg, rgba(79,163,255,0.22), rgba(166,139,255,0.2), rgba(95,224,208,0.22))",
                filter: "blur(24px)",
                transform: "rotate(-8deg) scale(1.04)",
                animation: "floatGlow 6s ease-in-out infinite",
              }}
            />
            <div
              className="absolute -top-10 -left-10 w-64 h-64 rounded-full opacity-60 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(79,163,255,0.35), transparent 70%)",
                filter: "blur(40px)",
                animation: "spin 10s linear infinite",
              }}
            />
            <div className="absolute -bottom-6 -right-6 w-56 h-56 rounded-full opacity-40 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(95,224,208,0.3), transparent 70%)", filter: "blur(38px)", animation: "spin 14s linear infinite reverse" }} />

            <div className="glass-strong p-8 md:p-10 text-center relative z-10 min-w-[300px] shadow-2xl shadow-primary/10">
              <div className="relative mx-auto mb-4 h-28 w-28 rounded-[1.5rem] border border-white/15 bg-white/5 p-1 shadow-[0_0_60px_rgba(79,163,255,0.2)]">
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt={profile.fullName}
                    className="h-full w-full rounded-[1.2rem] object-cover"
                  />
                ) : (
                  <img
                    src="/images/portfolio.png"
                    alt={profile.fullName}
                    className="h-full w-full rounded-[1.2rem] object-cover"
                  />
                )}
              </div>

              <h3 className="text-xl font-bold font-[family-name:var(--font-space)]">
                {profile.fullName}
              </h3>
              <p className="text-sm text-muted mt-1">{profile.title}</p>

              <div className="flex justify-center gap-6 mt-6 border-t border-white/10 pt-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{s.projects}+</div>
                  <div className="text-[11px] text-muted font-[family-name:var(--font-mono)] uppercase tracking-wider">
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{s.clients}+</div>
                  <div className="text-[11px] text-muted font-[family-name:var(--font-mono)] uppercase tracking-wider">
                    Clients
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{s.years}+</div>
                  <div className="text-[11px] text-muted font-[family-name:var(--font-mono)] uppercase tracking-wider">
                    Years
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {profile.repos !== undefined && (
                  <span className="text-[11px] px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-[family-name:var(--font-mono)]">
                    {profile.repos} repos
                  </span>
                )}
                {profile.stacks?.map((stack, index) => (
                  <span
                    key={`${stack}-${index}`}
                    className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted font-[family-name:var(--font-mono)]"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] text-muted font-[family-name:var(--font-mono)] tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown size={14} className="text-muted" />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes floatGlow {
          0%, 100% { transform: rotate(-8deg) scale(1.04); }
          50% { transform: rotate(-4deg) scale(1.08); }
        }
      `}</style>
    </section>
  )
}

function XIcon(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size ?? 16}
      height={props.size ?? 16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={props.className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
