import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { z } from "zod";

const CreateSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  liveLink: z.string().optional(),
  githubLink: z.string().optional(),
  problemSolved: z.string().optional(),
  results: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  images: z.array(z.object({ url: z.string(), sortOrder: z.number().optional() })).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    const projects = await prisma.project.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = CreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { images, ...data } = parsed.data;

    const project = await prisma.project.create({
      data: {
        ...data,
        images: images
          ? { create: images.map((img) => ({ url: img.url, sortOrder: img.sortOrder ?? 0 })) }
          : undefined,
      },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
