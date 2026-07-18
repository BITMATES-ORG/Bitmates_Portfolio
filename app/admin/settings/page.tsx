"use client"

import { useState } from "react"
import { Upload, Trash2, Replace, FileText } from "lucide-react"

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [resumeName, setResumeName] = useState("adelere_kehinde_resume.pdf")

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  function handleRemovePhoto() {
    setPhotoPreview(null)
  }

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.")
      return
    }

    setPasswordSuccess("Password updated successfully.")
    setCurrentPassword("")
    setNewPassword("")
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your account settings</p>
      </div>

      <div className="glass rounded-xl p-6 space-y-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">Profile photo</h2>
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/5">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
                AK
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#4fa3ff]/10 px-4 py-2 text-sm font-medium text-[#4fa3ff] transition-colors hover:bg-[#4fa3ff]/20">
              <Upload size={14} />
              {photoPreview ? "Replace" : "Upload"}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
            {photoPreview && (
              <button
                onClick={handleRemovePhoto}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-red-400/10 hover:text-red-400"
              >
                <Trash2 size={14} />
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">Resume / CV</h2>
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-[#4fa3ff]" />
            <span className="text-sm text-foreground">{resumeName}</span>
          </div>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#4fa3ff]/10 px-4 py-2 text-sm font-medium text-[#4fa3ff] transition-colors hover:bg-[#4fa3ff]/20">
            <Replace size={14} />
            Replace
            <input type="file" accept=".pdf" className="hidden" />
          </label>
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">Change password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-muted">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-[#4fa3ff] focus:outline-none focus:ring-1 focus:ring-[#4fa3ff]/30 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-muted">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-[#4fa3ff] focus:outline-none focus:ring-1 focus:ring-[#4fa3ff]/30 transition-colors"
            />
          </div>

          {passwordError && (
            <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{passwordError}</p>
          )}
          {passwordSuccess && (
            <p className="text-sm text-emerald-400 bg-emerald-400/10 rounded-lg px-3 py-2">{passwordSuccess}</p>
          )}

          <button
            type="submit"
            className="rounded-xl bg-[#4fa3ff] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4fa3ff]/90"
          >
            Update password
          </button>
        </form>
      </div>
    </div>
  )
}
