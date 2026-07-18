"use client"

import { useState, useRef, type FormEvent } from "react"
import { Mail, MapPin, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react"

interface ContactProps {
  email: string
  whatsapp: string
  location: string
}

export default function Contact({ email, whatsapp, location }: ContactProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const form = new FormData(formRef.current ?? undefined)
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    }

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error")
      setMessage("Please fill in your name, email, and message.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Unable to send message")

      setStatus("success")
      setMessage("Thanks for reaching out. I will get back to you soon.")
      formRef.current?.reset()
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Unable to send message")
    }
  }

  const chips = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: MessageSquare, label: "WhatsApp", value: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, "")}` },
    { icon: MapPin, label: "Location", value: location },
  ]

  return (
    <section
      id="contact"
      className="relative py-28 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          CONTACT
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="glass p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/40 transition-colors resize-none"
              />
            </div>

            {message ? (
              <div className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-sm ${status === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-rose-500/30 bg-rose-500/10 text-rose-300"}`}>
                {status === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{message}</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-full bg-primary text-white text-sm font-medium hover:brightness-110 transition-all shadow-lg shadow-primary/25 disabled:opacity-70"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Sidebar */}
          <div className="space-y-4">
            {chips.map((chip) => (
              <div key={chip.label} className="glass p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <chip.icon size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted font-[family-name:var(--font-mono)] uppercase tracking-wider">
                    {chip.label}
                  </div>
                  {chip.href ? (
                    <a
                      href={chip.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {chip.value}
                    </a>
                  ) : (
                    <div className="text-sm font-medium">{chip.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
