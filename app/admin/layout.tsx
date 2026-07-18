import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Sidebar from "@/components/admin/Sidebar"
import { LogOut } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-end gap-4 border-b border-white/10 bg-background/80 backdrop-blur-xl px-8">
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm text-muted transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
