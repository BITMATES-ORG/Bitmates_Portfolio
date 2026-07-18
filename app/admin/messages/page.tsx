"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/contact")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setMessages(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load messages");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleRead = async (msg: ContactMessage) => {
    try {
      const res = await fetch(`/api/contact/${msg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !msg.read }),
      });
      if (!res.ok) throw new Error("Failed to update message");
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: !m.read } : m))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete message");
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <span className="text-sm text-zinc-400">
          {messages.filter((m) => !m.read).length} unread
        </span>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 py-16">
          <Mail size={40} className="text-zinc-600" />
          <p className="mt-3 text-sm text-zinc-400">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "rounded-xl border bg-zinc-950 transition-colors",
                msg.read ? "border-zinc-800" : "border-zinc-700"
              )}
            >
              <div className="flex items-start gap-4 p-4">
                <button
                  onClick={() => toggleRead(msg)}
                  className={cn(
                    "mt-0.5 shrink-0 rounded-lg p-1.5 transition-colors",
                    msg.read
                      ? "text-zinc-600 hover:text-zinc-400"
                      : "text-blue-400 hover:text-blue-300"
                  )}
                  title={msg.read ? "Mark as unread" : "Mark as read"}
                >
                  {msg.read ? <MailOpen size={16} /> : <Mail size={16} />}
                </button>

                <div
                  className="min-w-0 flex-1 cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === msg.id ? null : msg.id)
                  }
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          msg.read ? "text-zinc-300" : "text-white"
                        )}
                      >
                        {msg.name}
                      </span>
                      <span className="ml-2 text-sm text-zinc-500">{msg.email}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-xs text-zinc-500">
                        {formatDate(new Date(msg.createdAt))}
                      </span>
                      {expandedId === msg.id ? (
                        <ChevronUp size={14} className="text-zinc-500" />
                      ) : (
                        <ChevronDown size={14} className="text-zinc-500" />
                      )}
                    </div>
                  </div>

                  <p
                    className={cn(
                      "mt-1 text-sm leading-relaxed",
                      expandedId === msg.id ? "" : "line-clamp-2",
                      msg.read ? "text-zinc-500" : "text-zinc-300"
                    )}
                  >
                    {msg.message}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="shrink-0 rounded-lg p-1.5 text-zinc-600 transition-colors hover:bg-red-900/30 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
