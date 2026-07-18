"use client"

import { Plus, Eye, Calendar } from "lucide-react"

const projects = [
  {
    name: "E-Commerce Platform",
    stack: "Next.js, Stripe, PostgreSQL",
    views: 3420,
    status: "Published" as const,
    updated: "2026-07-15",
  },
  {
    name: "Analytics Dashboard",
    stack: "React, D3, Supabase",
    views: 2150,
    status: "Published" as const,
    updated: "2026-07-10",
  },
  {
    name: "Mobile Fitness App",
    stack: "React Native, Expo",
    views: 980,
    status: "Draft" as const,
    updated: "2026-07-05",
  },
  {
    name: "Portfolio v4",
    stack: "Next.js, Tailwind, Three.js",
    views: 5400,
    status: "Published" as const,
    updated: "2026-06-28",
  },
  {
    name: "CLI Tool",
    stack: "Node.js, Commander",
    views: 340,
    status: "Draft" as const,
    updated: "2026-06-20",
  },
]

function StatusPill({ status }: { status: "Published" | "Draft" }) {
  const colors = {
    Published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Draft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  }
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  )
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted">Manage your portfolio projects</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#4fa3ff] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4fa3ff]/90">
          <Plus size={16} />
          Add project
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-3.5 text-left font-medium text-muted">Project</th>
                <th className="px-5 py-3.5 text-left font-medium text-muted">Stack</th>
                <th className="px-5 py-3.5 text-left font-medium text-muted">Views</th>
                <th className="px-5 py-3.5 text-left font-medium text-muted">Status</th>
                <th className="px-5 py-3.5 text-left font-medium text-muted">Updated</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.name} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 font-medium text-foreground">{project.name}</td>
                  <td className="px-5 py-4 text-muted">{project.stack}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-muted">
                      <Eye size={14} />
                      {project.views.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={project.status} />
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-muted">
                      <Calendar size={14} />
                      {project.updated}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
