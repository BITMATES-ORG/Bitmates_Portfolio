import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "I'm currently in offline mode. Please check back later!",
      });
    }

    const [profile, projects, blogPosts, workExperience, services, testimonials] =
      await Promise.all([
        prisma.profile.findFirst(),
        prisma.project.findMany({
          where: { published: true },
          include: { images: true },
        }),
        prisma.blogPost.findMany({ where: { published: true } }),
        prisma.workExperience.findMany({ orderBy: { startDate: "desc" } }),
        prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.testimonial.findMany({ where: { published: true } }),
      ]);

    const contextData = {
      profile,
      projects: projects.map((p) => ({
        title: p.title,
        summary: p.summary,
        description: p.description,
        techStack: p.techStack,
        liveLink: p.liveLink,
        githubLink: p.githubLink,
      })),
      blogPosts: blogPosts.map((p) => ({
        title: p.title,
        excerpt: p.excerpt,
        slug: p.slug,
      })),
      workExperience: workExperience.map((w) => ({
        company: w.company,
        role: w.role,
        startDate: w.startDate,
        endDate: w.endDate,
        current: w.current,
        description: w.description,
      })),
      services,
      testimonials,
    };

    const systemPrompt = `You are a helpful assistant for AdelereKehinde's portfolio website. Use the following context to answer questions about AdelereKehinde. Be friendly and professional. If you don't know something, say so honestly.

Context: ${JSON.stringify(contextData, null, 2)}`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://adelerekehinde.dev",
        "X-Title": "AdelereKehinde Portfolio",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter error:", res.status, await res.text());
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
