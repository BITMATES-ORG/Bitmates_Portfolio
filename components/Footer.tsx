"use client"

import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FooterProps {
  github?: string
  linkedin?: string
  twitter?: string
  email?: string
}

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export default function Footer({ github, linkedin, twitter, email }: FooterProps) {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="text-lg font-bold">AdelereKehinde</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Fullstack Developer
            </p>
            <div className="flex gap-2 mt-4">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="size-4" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-4" />
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="X / Twitter"
                >
                  <Twitter className="size-4" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="glass p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="Email"
                >
                  <Mail className="size-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Get In Touch</h4>
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                {email}
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} AdelereKehinde &mdash; Fullstack Developer
          </p>
        </div>
      </div>
    </footer>
  )
}
