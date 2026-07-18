import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import WorkExperience from "@/components/sections/WorkExperience"
import Services from "@/components/sections/Services"
import Testimonials from "@/components/sections/Testimonials"
import Stats from "@/components/sections/Stats"
import BlogSection from "@/components/sections/BlogSection"
import Contact from "@/components/sections/Contact"
import GitHubActivity from "@/components/sections/GitHubActivity"
import { createAdminClient } from "@/lib/supabase/server"
import { mapCamel } from "@/lib/utils"
import { getUser, getRepos } from "@/lib/github"

export const dynamic = "force-dynamic"

function dedupeByKey<T extends Record<string, any>>(items: T[] | null | undefined, keyFactory: (item: T) => string) {
  const seen = new Set<string>()
  return (items ?? []).filter((item) => {
    const key = keyFactory(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export default async function HomePage() {
  const admin = createAdminClient()

  const [profileRaw, projectsRaw, postsRaw, testimonialsRaw, skillsRaw, experiencesRaw, servicesRaw, statsRaw] =
    await Promise.all([
      admin.from("profiles").select("*").limit(1).maybeSingle().then(r => r.data ?? null),
      admin.from("projects").select("*").eq("published", true).order("date_created", { ascending: false }).then(r => r.data ?? []),
      admin.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false }).limit(6).then(r => r.data ?? []),
      admin.from("testimonials").select("*").eq("published", true).then(r => r.data ?? []),
      admin.from("skills").select("*").order("sort_order").then(r => r.data ?? []),
      admin.from("work_experiences").select("*").order("sort_order").then(r => r.data ?? []),
      admin.from("services").select("*").order("sort_order").then(r => r.data ?? []),
      admin.from("stats").select("*").order("sort_order").then(r => r.data ?? []),
    ])

  const [githubUser, githubRepos] = await Promise.all([
    getUser().catch(() => null),
    getRepos().catch(() => []),
  ])

  const profile = mapCamel<any>(profileRaw) ?? {}
  const projects = dedupeByKey(mapCamel<any[]>(projectsRaw), (p) => p?.id ?? p?.title ?? "")
  const posts = dedupeByKey(mapCamel<any[]>(postsRaw), (p) => p?.id ?? p?.slug ?? p?.title ?? "")
  const testimonials = dedupeByKey(mapCamel<any[]>(testimonialsRaw), (t) => t?.id ?? `${t?.clientName ?? ""}-${t?.company ?? ""}`)
  const skills = dedupeByKey(mapCamel<any[]>(skillsRaw), (s) => s?.id ?? `${s?.name ?? ""}-${s?.category ?? ""}`)
  const experiences = dedupeByKey(mapCamel<any[]>(experiencesRaw), (e) => e?.id ?? `${e?.role ?? ""}-${e?.company ?? ""}`)
  const services = dedupeByKey(mapCamel<any[]>(servicesRaw), (s) => s?.id ?? s?.title ?? "")
  const stats = dedupeByKey(mapCamel<any[]>(statsRaw), (s) => s?.id ?? `${s?.label ?? ""}-${s?.value ?? ""}`)

  const heroProfile = {
    profilePhoto: profile.profilePhoto,
    fullName: profile.fullName || "AdelereKehinde",
    title: profile.title || "Fullstack Developer",
    bio: profile.tagline || "I build scalable web and mobile applications.",
    stats: {
      projects: stats.find((s: any) => s.label?.toLowerCase().includes("project"))?.value ?? 40,
      clients: stats.find((s: any) => s.label?.toLowerCase().includes("client"))?.value ?? 5,
      years: profile.yearsOfExperience || 5,
    },
    repos: githubUser?.public_repos ?? 48,
    stacks: ["Python", "Dart", "Flutter", "Next.js", "NestJS", "Vue.js", "Three.js"],
  }

  const adaptedProjects = projects.map((p: any) => ({
    title: p.title,
    description: p.summary || p.description || "A product built with a strong focus on reliability and user experience.",
    image: p.coverImage,
    tags: [...(p.techStack ?? []), ...(p.problemSolved ? [p.problemSolved.slice(0, 40)] : [])],
    link: p.liveLink,
  }))

  const adaptedPosts = posts.map((p: any) => ({
    title: p.title,
    excerpt: p.excerpt,
    date: p.publishedAt,
    image: p.coverImage,
    slug: p.slug,
    author: { name: p.author || "AdelereKehinde" },
    likes: p.likeCount ?? 0,
    comments: p.commentCount ?? 0,
  }))

  const adaptedExperiences = experiences.map((e: any) => ({
    role: e.role,
    company: e.company,
    dates: e.current
      ? `${new Date(e.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} — Present`
      : `${new Date(e.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} — ${new Date(e.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`,
    description: e.description
      ? `${e.description}\n\n${e.responsibilities?.join(" • ") || ""}`
      : "Worked across product delivery, architecture decisions, and implementation detail.",
    tags: [...(e.techStack ?? []), ...(e.achievements?.slice(0, 2) ?? [])],
  }))

  const adaptedServices = services.map((s: any) => ({
    title: s.title,
    icon: s.icon,
    features: s.techTags?.length
      ? Array.from(new Set(s.techTags.map((t: string) => t))).slice(0, 4)
      : [s.description],
  }))

  return (
    <main>
      <Hero profile={heroProfile} />
      <section id="about"><About about={profile.about || ""} yearsOfExperience={profile.yearsOfExperience || 5} /></section>
      <section id="skills"><Skills skills={skills} /></section>
      <section id="projects"><Projects projects={adaptedProjects} /></section>
      <section id="experience"><WorkExperience experiences={adaptedExperiences} /></section>
      <section id="services"><Services services={adaptedServices} /></section>
      <Testimonials testimonials={testimonials} />
      <Stats stats={stats} />
      <GitHubActivity user={githubUser} repos={githubRepos} />
      <BlogSection posts={adaptedPosts} />
      <Contact email={profile.email || ""} whatsapp={profile.whatsapp || ""} location={profile.location || ""} />
    </main>
  )
}
