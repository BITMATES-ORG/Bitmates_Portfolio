"use client"

import { useState } from "react"
import { Search, Send } from "lucide-react"

type Message = {
  id: string
  name: string
  email: string
  preview: string
  content: string
  time: string
  unread: boolean
}

const initialMessages: Message[] = [
  { id: "1", name: "John Doe", email: "john@example.com", preview: "Hey, I'd love to discuss a project…", content: "Hey, I'd love to discuss a potential project. We're looking for a fullstack developer to join our team. Are you available for freelance work?", time: "2h ago", unread: true },
  { id: "2", name: "Sarah K.", email: "sarah@example.com", preview: "Thanks for the great work on…", content: "Thanks for the great work on the website redesign. Our users love it! I'd like to discuss phase two of the project.", time: "4h ago", unread: true },
  { id: "3", name: "Mike R.", email: "mike@example.com", preview: "When are you available for a…", content: "When are you available for a quick call? We have a new project that aligns perfectly with your skill set.", time: "1d ago", unread: false },
  { id: "4", name: "Lisa T.", email: "lisa@example.com", preview: "I saw your portfolio and…", content: "I saw your portfolio and was really impressed. Would you be interested in collaborating on an open-source project?", time: "2d ago", unread: false },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [selectedId, setSelectedId] = useState<string | null>(messages[0].id)
  const [reply, setReply] = useState("")

  const selected = messages.find((m) => m.id === selectedId)

  function selectMessage(id: string) {
    setSelectedId(id)
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)))
  }

  function handleSendReply() {
    if (!reply.trim()) return
    setReply("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Messages</h1>
        <p className="mt-1 text-sm text-muted">View and respond to inquiries</p>
      </div>

      <div className="glass rounded-xl overflow-hidden flex h-[600px]">
        <div className="w-80 shrink-0 border-r border-white/10 flex flex-col">
          <div className="p-3 border-b border-white/10">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
              <Search size={14} className="text-muted" />
              <input
                placeholder="Search messages…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => selectMessage(msg.id)}
                className={`w-full text-left px-4 py-3.5 border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                  selectedId === msg.id ? "bg-[#4fa3ff]/5" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#4fa3ff]/20 text-xs font-semibold text-[#4fa3ff]">
                    {msg.name.charAt(0)}
                    {msg.unread && (
                      <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#4fa3ff]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm truncate ${msg.unread ? "font-semibold text-foreground" : "text-foreground"}`}>
                        {msg.name}
                      </span>
                      <span className="shrink-0 text-xs text-muted ml-2">{msg.time}</span>
                    </div>
                    <p className="text-xs text-muted truncate mt-0.5">{msg.preview}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selected ? (
            <>
              <div className="p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4fa3ff]/20 text-sm font-semibold text-[#4fa3ff]">
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{selected.name}</p>
                    <p className="text-xs text-muted">{selected.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <p className="text-sm text-foreground leading-relaxed">{selected.content}</p>
              </div>
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Write a reply…"
                    rows={2}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-[#4fa3ff] focus:outline-none focus:ring-1 focus:ring-[#4fa3ff]/30 transition-colors resize-none"
                  />
                  <button
                    onClick={handleSendReply}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4fa3ff] text-white transition-colors hover:bg-[#4fa3ff]/90"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-muted">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
