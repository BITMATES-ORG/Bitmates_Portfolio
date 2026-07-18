"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  FolderKanban,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  coverImage: string | null;
  liveLink: string | null;
  githubLink: string | null;
  problemSolved: string;
  results: string;
  dateCreated: string;
  featured: boolean;
  published: boolean;
}

const emptyForm: Omit<Project, "id"> = {
  title: "",
  summary: "",
  description: "",
  techStack: [],
  coverImage: "",
  liveLink: "",
  githubLink: "",
  problemSolved: "",
  results: "",
  dateCreated: new Date().toISOString().split("T")[0],
  featured: false,
  published: true,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setProjects(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load projects");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const refetch = () => {
    setLoading(true);
    setError("");
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load projects"))
      .finally(() => setLoading(false));
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setTechInput("");
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setForm({
      title: project.title,
      summary: project.summary,
      description: project.description,
      techStack: project.techStack,
      coverImage: project.coverImage || "",
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      problemSolved: project.problemSolved,
      results: project.results,
      dateCreated: project.dateCreated
        ? new Date(project.dateCreated).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      featured: project.featured,
      published: project.published,
    });
    setEditingId(project.id);
    setTechInput(project.techStack.join(", "));
    setModalOpen(true);
  };

  const addTech = () => {
    const items = techInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, techStack: [...new Set([...prev.techStack, ...items])] }));
    setTechInput("");
  };

  const removeTech = (item: string) => {
    setForm((prev) => ({ ...prev, techStack: prev.techStack.filter((t) => t !== item) }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const body = {
        ...form,
        coverImage: form.coverImage || null,
        liveLink: form.liveLink || null,
        githubLink: form.githubLink || null,
        dateCreated: new Date(form.dateCreated).toISOString(),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save project");
      }

      setModalOpen(false);
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      refetch();
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
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 py-16">
          <FolderKanban size={40} className="text-zinc-600" />
          <p className="mt-3 text-sm text-zinc-400">No projects yet</p>
          <button
            onClick={openCreate}
            className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Tech Stack</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-zinc-800 last:border-0">
                  <td className="px-4 py-3 text-white">{project.title}</td>
                  <td className="px-4 py-3 text-zinc-400">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-xs font-medium",
                        project.featured
                          ? "bg-green-900/40 text-green-400"
                          : "bg-zinc-800 text-zinc-500"
                      )}
                    >
                      {project.featured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-xs font-medium",
                        project.published
                          ? "bg-green-900/40 text-green-400"
                          : "bg-zinc-800 text-zinc-500"
                      )}
                    >
                      {project.published ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(project)}
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-900/30 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {editingId ? "Edit Project" : "Add Project"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300">Summary</label>
                  <input
                    type="text"
                    value={form.summary}
                    onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300">
                    Tech Stack (comma-separated)
                  </label>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTech();
                        }
                      }}
                      className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                      placeholder="Type and press Enter or comma"
                    />
                    <button
                      type="button"
                      onClick={addTech}
                      className="rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700"
                    >
                      Add
                    </button>
                  </div>
                  {form.techStack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {form.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                        >
                          {tech}
                          <button
                            onClick={() => removeTech(tech)}
                            className="text-zinc-500 hover:text-white"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300">Cover Image URL</label>
                  <input
                    type="url"
                    value={form.coverImage || ""}
                    onChange={(e) => setForm((p) => ({ ...p, coverImage: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300">Live Link</label>
                  <input
                    type="url"
                    value={form.liveLink || ""}
                    onChange={(e) => setForm((p) => ({ ...p, liveLink: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300">GitHub Link</label>
                  <input
                    type="url"
                    value={form.githubLink || ""}
                    onChange={(e) => setForm((p) => ({ ...p, githubLink: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300">Date Created</label>
                  <input
                    type="date"
                    value={form.dateCreated}
                    onChange={(e) => setForm((p) => ({ ...p, dateCreated: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300">Problem Solved</label>
                  <textarea
                    value={form.problemSolved}
                    onChange={(e) => setForm((p) => ({ ...p, problemSolved: e.target.value }))}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300">Results</label>
                  <textarea
                    value={form.results}
                    onChange={(e) => setForm((p) => ({ ...p, results: e.target.value }))}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                      className="rounded border-zinc-700 bg-zinc-900 text-white focus:ring-zinc-600"
                    />
                    Featured
                  </label>

                  <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                      className="rounded border-zinc-700 bg-zinc-900 text-white focus:ring-zinc-600"
                    />
                    Published
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200 disabled:opacity-50"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
