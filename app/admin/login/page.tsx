"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LockKeyhole } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    router.push("/admin/overview")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="glow" style={{ width: 400, height: 400, background: "#4fa3ff", top: "20%", left: "30%" }} />
      <div className="glow" style={{ width: 300, height: 300, background: "#7a5cff", bottom: "20%", right: "30%" }} />

      <div className="glass-strong relative w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4fa3ff]/10">
            <LockKeyhole size={26} className="text-[#4fa3ff]" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Admin sign in
          </h1>
          <p className="mt-1 text-sm text-muted">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-[#4fa3ff] focus:outline-none focus:ring-1 focus:ring-[#4fa3ff]/30 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-[#4fa3ff] focus:outline-none focus:ring-1 focus:ring-[#4fa3ff]/30 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#4fa3ff] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4fa3ff]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}
