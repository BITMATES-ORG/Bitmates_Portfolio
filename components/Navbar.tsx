"use client"

import { useEffect, useRef, useState } from "react"
import { Moon, Sun, Download, Menu, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-300",
        scrolled && "glass shadow-xl shadow-black/10",
      )}
      style={{
        background: scrolled
          ? "linear-gradient(160deg, rgba(5,10,20,0.85), rgba(5,10,20,0.70))"
          : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
      }}
    >
      <a href="/" className="text-xl font-bold tracking-tight font-[family-name:var(--font-space)]">
        Adelere<span style={{ color: "#4fa3ff" }}>Kehinde</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-sm text-muted hover:text-foreground transition-colors font-medium"
          >
            {l.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:border-white/25 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <a
          href="/Adelere Cv.pdf"
          download="Adelere-Kehinde-CV.pdf"
          className={cn(
            "hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
            "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/25",
          )}
        >
          <Download size={14} />
          Resume
        </a>

        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: "rgba(5,10,20,0.96)",
            backdropFilter: "blur(24px)",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-medium hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Adelere Cv.pdf"
            download="Adelere-Kehinde-CV.pdf"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary/15 text-primary border border-primary/30 text-lg font-medium"
          >
            <Download size={18} />
            Resume
          </a>
        </div>
      )}
    </nav>
  )
}
