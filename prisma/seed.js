/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const existingAdmin = await prisma.admin.findFirst();
  if (existingAdmin) {
    console.log("Admin already exists, skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 12);

  const admin = await prisma.admin.create({
    data: {
      email: "napg.adekunle@gmail.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  await prisma.admin.create({
    data: {
      email: "adelerekehinde01@gmail.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  await prisma.profile.create({
    data: {
      fullName: "AdelereKehinde",
      title: "Fullstack Developer",
      tagline: "I build scalable web and mobile applications.",
      about:
        "I am a passionate fullstack developer with experience building modern web and mobile applications. I specialize in React, Next.js, Node.js, and TypeScript, and I love creating performant, user-friendly digital experiences.",
      github: "https://github.com/AdelereKehinde",
      linkedin: "https://linkedin.com/in/AdelereKehinde",
      twitter: "https://x.com/AdelereKehinde",
      email: "adelerekehinde01@gmail.com",
      yearsOfExperience: 5,
    },
  });

  const skills = [
    { name: "React", category: "Frontend", level: 95, icon: "", sortOrder: 0 },
    { name: "Next.js", category: "Frontend", level: 90, icon: "", sortOrder: 1 },
    { name: "TypeScript", category: "Frontend", level: 85, icon: "", sortOrder: 2 },
    { name: "Tailwind CSS", category: "Frontend", level: 90, icon: "", sortOrder: 3 },
    { name: "Node.js", category: "Backend", level: 88, icon: "", sortOrder: 4 },
    { name: "Express", category: "Backend", level: 85, icon: "", sortOrder: 5 },
    { name: "PostgreSQL", category: "Databases", level: 80, icon: "", sortOrder: 6 },
    { name: "MongoDB", category: "Databases", level: 75, icon: "", sortOrder: 7 },
    { name: "Prisma", category: "Backend", level: 82, icon: "", sortOrder: 8 },
    { name: "Firebase", category: "BaaS", level: 78, icon: "", sortOrder: 9 },
    { name: "Supabase", category: "BaaS", level: 75, icon: "", sortOrder: 10 },
    { name: "React Native", category: "Mobile", level: 70, icon: "", sortOrder: 11 },
    { name: "Docker", category: "DevOps", level: 65, icon: "", sortOrder: 12 },
    { name: "Git", category: "DevOps", level: 90, icon: "", sortOrder: 13 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  const experiences = [
    {
      company: "Tech Corp",
      role: "Senior Fullstack Developer",
      startDate: new Date("2022-01-01"),
      current: true,
      description: "Leading development of scalable web applications.",
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL"],
      companyUrl: "https://techcorp.com",
      responsibilities: [
        "Architect and implement full-stack features",
        "Lead code reviews and mentor junior developers",
        "Optimize application performance",
      ],
      achievements: [
        "Reduced page load time by 40%",
        "Led migration from REST to GraphQL",
      ],
      sortOrder: 0,
    },
    {
      company: "StartupXYZ",
      role: "Fullstack Developer",
      startDate: new Date("2020-03-01"),
      endDate: new Date("2021-12-31"),
      current: false,
      description: "Built and maintained core product features.",
      techStack: ["React", "TypeScript", "MongoDB", "Express"],
      responsibilities: [
        "Developed user-facing features",
        "Built RESTful APIs",
        "Implemented CI/CD pipelines",
      ],
      achievements: [
        "Shipped MVP in 3 months",
        "Grew user base to 10k",
      ],
      sortOrder: 1,
    },
  ];

  for (const exp of experiences) {
    await prisma.workExperience.create({ data: exp });
  }

  const services = [
    {
      title: "Web Development",
      description: "Building responsive, performant web applications using modern frameworks and best practices.",
      icon: "Globe",
      techTags: ["React", "Next.js", "TypeScript", "Tailwind"],
      sortOrder: 0,
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile applications with native-like performance using React Native.",
      icon: "Smartphone",
      techTags: ["React Native", "Expo", "TypeScript"],
      sortOrder: 1,
    },
    {
      title: "Backend Development",
      description: "Scalable server-side solutions with robust APIs, databases, and cloud infrastructure.",
      icon: "Server",
      techTags: ["Node.js", "PostgreSQL", "Prisma", "Docker"],
      sortOrder: 2,
    },
    {
      title: "AI Development",
      description: "Integrating AI capabilities into applications for smarter user experiences.",
      icon: "Brain",
      techTags: ["OpenAI", "LangChain", "RAG", "ML"],
      sortOrder: 3,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  const stats = [
    { label: "Projects Completed", value: 20, icon: "FolderKanban", sortOrder: 0 },
    { label: "Happy Clients", value: 15, icon: "Users", sortOrder: 1 },
    { label: "Technologies", value: 25, icon: "Code2", sortOrder: 2 },
    { label: "Years Coding", value: 5, icon: "Calendar", sortOrder: 3 },
  ];

  for (const stat of stats) {
    await prisma.stat.create({ data: stat });
  }

  const project = await prisma.project.create({
    data: {
      title: "E-Commerce Platform",
      summary: "A full-featured e-commerce platform with real-time inventory management.",
      description: "Built a complete e-commerce solution with product management, cart, checkout, and payment integration.",
      coverImage: null,
      techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      liveLink: "https://example.com",
      githubLink: "https://github.com/AdelereKehinde/ecommerce",
      problemSolved: "Small businesses needed an affordable, scalable e-commerce solution.",
      results: "Successfully deployed for 5+ businesses with 99.9% uptime.",
      featured: true,
      published: true,
    },
  });

  const testimonial = await prisma.testimonial.create({
    data: {
      clientName: "John Doe",
      company: "Tech Corp",
      review: "Exceptional developer who delivered beyond expectations. Highly recommend!",
      rating: 5,
      published: true,
    },
  });

  const blog = await prisma.blogPost.create({
    data: {
      title: "Getting Started with Next.js 16",
      slug: "getting-started-with-nextjs-16",
      content: "# Getting Started with Next.js 16\n\nNext.js 16 brings exciting new features...\n\n## Key Features\n\n- App Router improvements\n- Better performance\n- Enhanced developer experience",
      excerpt: "A comprehensive guide to the latest features in Next.js 16.",
      published: true,
      publishedAt: new Date(),
      author: "AdelereKehinde",
    },
  });

  await prisma.contactMessage.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Hi! I'm interested in hiring you for a project. Let's connect!",
      read: false,
    },
  });

  console.log("Seed completed successfully!");
  console.log(`Admin email: ${admin.email}`);
  console.log("Default password: Admin@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
