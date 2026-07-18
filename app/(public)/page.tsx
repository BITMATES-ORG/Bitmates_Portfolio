import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import WorkExperience from "@/components/sections/WorkExperience";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import GitHubActivity from "@/components/sections/GitHubActivity";
import BlogSection from "@/components/sections/BlogSection";
import Contact from "@/components/sections/Contact";
import Chatbot from "@/components/Chatbot";
import { prisma } from "@/lib/db";
import { getUser, getRepos } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, rawProjects, rawPosts, rawTestimonials, skills, rawExperiences, services, stats, githubUser, githubRepos] =
    await Promise.all([
      prisma.profile.findFirst().catch(() => null),
      prisma.project.findMany({ where: { published: true }, orderBy: { dateCreated: "desc" }, include: { images: { orderBy: { sortOrder: "asc" } } } }),
      prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: 6 }),
      prisma.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
      prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.workExperience.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.stat.findMany({ orderBy: { sortOrder: "asc" } }),
      getUser().catch(() => null),
      getRepos().catch(() => []),
    ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = rawProjects as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blogPosts = rawPosts as any;
  const testimonials = rawTestimonials;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const experiences = rawExperiences as any;

  const safeProfile = profile ?? {
    fullName: "AdelereKehinde",
    title: "Fullstack Developer",
    tagline: "I build scalable web and mobile applications.",
    about: "",
    profilePhoto: null,
    resumeUrl: null,
    github: "https://github.com/AdelereKehinde",
    linkedin: "https://linkedin.com/in/AdelereKehinde",
    twitter: "https://x.com/AdelereKehinde",
    email: "adelerekehinde01@gmail.com",
    whatsapp: "",
    location: "",
    yearsOfExperience: 0,
  };

  return (
    <>
      <Hero
        profilePhoto={safeProfile.profilePhoto ?? undefined}
        fullName={safeProfile.fullName}
        title={safeProfile.title}
        tagline={safeProfile.tagline}
        resumeUrl={safeProfile.resumeUrl ?? undefined}
        github={safeProfile.github}
        linkedin={safeProfile.linkedin}
        twitter={safeProfile.twitter}
        email={safeProfile.email}
      />
      <About about={safeProfile.about} yearsOfExperience={safeProfile.yearsOfExperience} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <WorkExperience experiences={experiences} />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />
      <Stats stats={stats} />
      <GitHubActivity user={githubUser} repos={githubRepos} />
      <BlogSection posts={blogPosts} />
      <Contact
        email={safeProfile.email}
        whatsapp={safeProfile.whatsapp}
        location={safeProfile.location}
      />
      <Chatbot />
    </>
  );
}
