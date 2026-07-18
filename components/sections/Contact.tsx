"use client"

import { useState, type FormEvent } from "react"
import { Mail, MapPin, MessageCircle, Send, Github, Linkedin, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactProps {
  email: string
  whatsapp: string
  location: string
}

interface SocialItem {
  key: string
  icon: typeof Mail
  label: string
  href: string
}

export default function Contact({ email, whatsapp, location }: ContactProps) {
  const [name, setName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const socials: SocialItem[] = [
    { key: "email", icon: Mail, label: "Email", href: `mailto:${email}` },
    ...(whatsapp ? [{ key: "whatsapp", icon: MessageCircle, label: "WhatsApp", href: whatsapp }] : []),
    ...(location ? [{ key: "location", icon: MapPin, label: "Location", href: `https://maps.google.com/?q=${encodeURIComponent(location)}` }] : []),
  ]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name || !contactEmail || !message) return

    setSending(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: contactEmail, message }),
      })

      if (!res.ok) throw new Error("Failed to send message")

      setSent(true)
      setName("")
      setContactEmail("")
      setMessage("")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <p className="text-sm text-muted-foreground">
                Feel free to reach out for collaborations, opportunities, or just a friendly hello.
              </p>
              <div className="space-y-3">
                {socials.map(({ key, icon: Icon, label, href }) => (
                  <a
                    key={key}
                    href={href}
                    target={key !== "email" ? "_blank" : undefined}
                    rel={key !== "email" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <span>{key === "email" ? email : key === "whatsapp" ? "WhatsApp" : location}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Twitter, href: "https://x.com" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">
                  Name
                </label>
                <Input
                  id="contact-name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Your message..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              {sent ? (
                <p className="text-sm text-green-600 dark:text-green-400">Message sent successfully!</p>
              ) : (
                <Button type="submit" variant="primary" className="w-full" disabled={sending}>
                  <Send className="size-4" />
                  {sending ? "Sending..." : "Send Message"}
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
