"use client";

import { useEffect, useState } from "react";
import { FolderKanban, FileText, Star, Mail } from "lucide-react";

interface Stat {
  label: string;
  value: number;
  icon: typeof FolderKanban;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [projectsRes, blogRes, testimonialsRes, messagesRes] = await Promise.all([
          fetch("/api/projects?limit=1"),
          fetch("/api/blog?limit=1"),
          fetch("/api/testimonials?limit=1"),
          fetch("/api/contact?unread=true"),
        ]);

        const projects = projectsRes.headers.get("X-Total-Count") || "0";
        const blog = blogRes.headers.get("X-Total-Count") || "0";
        const testimonials = testimonialsRes.headers.get("X-Total-Count") || "0";
        const unreadMessages = messagesRes.headers.get("X-Total-Count") || "0";

        setStats([
          { label: "Total Projects", value: Number(projects), icon: FolderKanban },
          { label: "Blog Posts", value: Number(blog), icon: FileText },
          { label: "Testimonials", value: Number(testimonials), icon: Star },
          { label: "Unread Messages", value: Number(unreadMessages), icon: Mail },
        ]);
      } catch {
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-white" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <Icon size={28} className="text-zinc-600" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
