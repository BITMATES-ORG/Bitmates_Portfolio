"use client"

import {
  Eye,
  MessageSquare,
  Activity,
  Mail,
  ArrowUpRight,
} from "lucide-react"

const kpiCards = [
  { label: "Project views", value: "12,430", change: "+12%", icon: Eye, color: "#4fa3ff" },
  { label: "Blog views", value: "8,210", change: "+8%", icon: Eye, color: "#7a5cff" },
  { label: "New messages", value: "18", change: "+3", icon: MessageSquare, color: "#5fe0d0" },
  { label: "Comments", value: "47", change: "+5%", icon: Activity, color: "#6fb6ff" },
]

const recentActivity = [
  { action: "Published new project", detail: "E-Commerce Platform", time: "2h ago" },
  { action: "Received message", detail: "From john@example.com", time: "4h ago" },
  { action: "Updated blog post", detail: "Building with Next.js 16", time: "6h ago" },
  { action: "New testimonial", detail: "By Sarah K.", time: "1d ago" },
  { action: "Deployed changes", detail: "Production build #42", time: "2d ago" },
]

const inboxMessages = [
  { name: "John Doe", email: "john@example.com", preview: "Hey, I'd love to discuss a project…", time: "2h ago" },
  { name: "Sarah K.", email: "sarah@example.com", preview: "Thanks for the great work on…", time: "4h ago" },
  { name: "Mike R.", email: "mike@example.com", preview: "When are you available for a…", time: "1d ago" },
]

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted">Welcome back — here is what is happening.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="glass rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${card.color}15` }}
                >
                  <Icon size={18} style={{ color: card.color }} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-400">
                  {card.change}
                  <ArrowUpRight size={12} />
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-foreground">{card.value}</p>
              <p className="mt-0.5 text-xs text-muted">{card.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-xl p-6">
          <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">Recent activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#4fa3ff]/10">
                  <Activity size={14} className="text-[#4fa3ff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.action}</p>
                  <p className="text-xs text-muted truncate">{item.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">Inbox preview</h2>
          <div className="space-y-4">
            {inboxMessages.map((msg, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7a5cff]/20 text-xs font-semibold text-[#7a5cff]">
                  {msg.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{msg.name}</p>
                    <span className="text-xs text-muted">{msg.time}</span>
                  </div>
                  <p className="text-xs text-muted truncate">{msg.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
