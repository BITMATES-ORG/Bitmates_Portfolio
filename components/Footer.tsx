"use client"

import { Github, Linkedin, XIcon } from "lucide-react"

const siteLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
]

const workLinks = [
  { label: "Services", href: "#services" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Testimonials", href: "#testimonials" },
]

const socials = [
  { label: "GitHub", href: "https://github.com/Adelere", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/Adelere", icon: Linkedin },
  { label: "X", href: "https://x.com/Adelere", icon: XIcon },
]

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-8 px-6 md:px-12"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(160deg, rgba(255,255,255,0.03), transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1">
          <a href="/" className="text-xl font-bold tracking-tight">
            Adelere<span style={{ color: "#4fa3ff" }}>Kehinde</span>
          </a>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
            Full-stack engineer building fast, polished digital products from database to pixel.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-medium tracking-widest text-muted uppercase mb-4 font-[family-name:var(--font-mono)]">
            Site
          </h4>
          <ul className="space-y-3">
            {siteLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium tracking-widest text-muted uppercase mb-4 font-[family-name:var(--font-mono)]">
            Work
          </h4>
          <ul className="space-y-3">
            {workLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium tracking-widest text-muted uppercase mb-4 font-[family-name:var(--font-mono)]">
            Connect
          </h4>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 transition-all"
                aria-label={s.label}
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto pt-6 text-center text-xs text-muted"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        &copy; {new Date().getFullYear()} AdelereKehinde. All rights reserved.
      </div>
    </footer>
  )
}
