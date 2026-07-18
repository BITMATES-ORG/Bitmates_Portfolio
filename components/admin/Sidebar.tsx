"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Grid3x3,
  FolderKanban,
  FileEdit,
  Star,
  Mail,
  Settings,
} from "lucide-react"

const navItems = [
  { label: "Overview", href: "/admin/overview", icon: Grid3x3 },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Blog", href: "/admin/blog", icon: FileEdit },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col glass-strong rounded-none border-l-0 border-t-0 border-b-0">
      <div className="flex items-center gap-2 px-6 pt-8 pb-6">
        <Link href="/admin/overview" className="text-xl font-bold tracking-tight">
          Adelere<span className="text-[#4fa3ff]">K</span>
          <span className="ml-1.5 text-sm font-normal text-muted">/ admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#4fa3ff]/10 text-[#4fa3ff] shadow-sm"
                  : "text-muted hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 px-6 py-4">
        <p className="text-xs text-muted">Logged in as admin</p>
      </div>
    </aside>
  )
}
