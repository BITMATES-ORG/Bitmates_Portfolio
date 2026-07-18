"use client"

import { Edit3, Trash2, Star } from "lucide-react"

const testimonials = [
  { name: "Sarah K.", role: "CTO, TechCorp", content: "Absolutely incredible work. Delivered ahead of schedule and exceeded expectations.", rating: 5, date: "2026-07-12" },
  { name: "James M.", role: "Founder, StartupX", content: "One of the best developers I've worked with. Deep technical knowledge and great communication.", rating: 5, date: "2026-07-01" },
  { name: "Emily R.", role: "Product Lead, DevCo", content: "The redesign doubled our conversion rate. Highly recommend.", rating: 4, date: "2026-06-20" },
]

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Testimonials</h1>
        <p className="mt-1 text-sm text-muted">Manage client testimonials</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="glass rounded-xl p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7a5cff]/20 text-sm font-semibold text-[#7a5cff]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/10 hover:text-foreground transition-colors">
                  <Edit3 size={14} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-red-400/10 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed">&ldquo;{t.content}&rdquo;</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < t.rating ? "text-amber-400 fill-amber-400" : "text-white/10"}
                  />
                ))}
              </div>
              <span className="text-xs text-muted">{t.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
