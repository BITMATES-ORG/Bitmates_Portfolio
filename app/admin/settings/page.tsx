"use client";

import { useEffect, useState } from "react";
import {
  User,
  KeyRound,
  Loader2,
  Save,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Briefcase,
  FileText,
} from "lucide-react";

interface Profile {
  fullName: string;
  title: string;
  tagline: string;
  about: string;
  profilePhoto: string | null;
  resumeUrl: string | null;
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  whatsapp: string;
  location: string;
  yearsOfExperience: number;
}

const emptyProfile: Profile = {
  fullName: "",
  title: "",
  tagline: "",
  about: "",
  profilePhoto: "",
  resumeUrl: "",
  github: "",
  linkedin: "",
  twitter: "",
  email: "",
  whatsapp: "",
  location: "",
  yearsOfExperience: 0,
};

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setProfile({
            fullName: data.fullName || "",
            title: data.title || "",
            tagline: data.tagline || "",
            about: data.about || "",
            profilePhoto: data.profilePhoto || "",
            resumeUrl: data.resumeUrl || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
            twitter: data.twitter || "",
            email: data.email || "",
            whatsapp: data.whatsapp || "",
            location: data.location || "",
            yearsOfExperience: data.yearsOfExperience || 0,
          });
        }
      })
      .catch((err) => {
        if (!cancelled) setProfileError(err instanceof Error ? err.message : "Failed to load profile");
      })
      .finally(() => {
        if (!cancelled) setLoadingProfile(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileError("");
    setProfileSuccess("");

    try {
      const body = {
        ...profile,
        profilePhoto: profile.profilePhoto || null,
        resumeUrl: profile.resumeUrl || null,
        yearsOfExperience: Number(profile.yearsOfExperience),
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save profile");
      }

      setProfileSuccess("Profile updated successfully");
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    setSavingPassword(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to change password");
      }

      setPasswordSuccess("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSavingPassword(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Settings</h1>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="mb-6 flex items-center gap-2">
            <User size={20} className="text-zinc-400" />
            <h2 className="text-lg font-semibold text-white">Profile</h2>
          </div>

          {profileError && (
            <div className="mb-4 rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 text-sm text-red-400">
              {profileError}
            </div>
          )}
          {profileSuccess && (
            <div className="mb-4 rounded-lg border border-green-800 bg-green-900/20 px-4 py-3 text-sm text-green-400">
              {profileSuccess}
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-zinc-300">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300">Title</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-zinc-300">Tagline</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile((p) => ({ ...p, tagline: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-zinc-300">About</label>
                <textarea
                  value={profile.about}
                  onChange={(e) => setProfile((p) => ({ ...p, about: e.target.value }))}
                  rows={5}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Globe size={14} />
                  Profile Photo URL
                </label>
                <input
                  type="url"
                    value={profile.profilePhoto || ""}
                    onChange={(e) => setProfile((p) => ({ ...p, profilePhoto: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                    <FileText size={14} />
                    Resume URL
                  </label>
                  <input
                    type="url"
                    value={profile.resumeUrl || ""}
                    onChange={(e) => setProfile((p) => ({ ...p, resumeUrl: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Github size={14} />
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile((p) => ({ ...p, github: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Linkedin size={14} />
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => setProfile((p) => ({ ...p, linkedin: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Twitter size={14} />
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={profile.twitter}
                  onChange={(e) => setProfile((p) => ({ ...p, twitter: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Mail size={14} />
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <MapPin size={14} />
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Briefcase size={14} />
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={profile.yearsOfExperience}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, yearsOfExperience: parseInt(e.target.value) || 0 }))
                  }
                  min={0}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={profile.whatsapp}
                  onChange={(e) => setProfile((p) => ({ ...p, whatsapp: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingProfile}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
              >
                {savingProfile && <Loader2 size={14} className="animate-spin" />}
                <Save size={16} />
                Save Profile
              </button>
            </div>
          </form>
        </section>

        {/* Password Section */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="mb-6 flex items-center gap-2">
            <KeyRound size={20} className="text-zinc-400" />
            <h2 className="text-lg font-semibold text-white">Change Password</h2>
          </div>

          {passwordError && (
            <div className="mb-4 rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 text-sm text-red-400">
              {passwordError}
            </div>
          )}
          {passwordSuccess && (
            <div className="mb-4 rounded-lg border border-green-800 bg-green-900/20 px-4 py-3 text-sm text-green-400">
              {passwordSuccess}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingPassword}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
              >
                {savingPassword && <Loader2 size={14} className="animate-spin" />}
                <KeyRound size={16} />
                Change Password
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
