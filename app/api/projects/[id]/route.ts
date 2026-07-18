import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { z } from "zod";

const UpdateSchema = z.object({
  title: z.string().min(1).optional(),
  summary: z.string().min(1).optional(),
  description: z.string().optional(),
  coverImage: z.string().nullable().optional(),
  techStack: z.array(z.string()).optional(),
  liveLink: z.string().nullable().optional(),
  githubLink: z.string().nullable().optional(),
  problemSolved: z.string().optional(),
  results: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  images: z
    .array(z.object({ url: z.string(), sortOrder: z.number().optional() }))
    .optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await prisma.project.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = UpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { images, ...data } = parsed.data;

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        ...(images
          ? {
              images: {
                deleteMany: {},
                create: images.map((img) => ({
                  url: img.url,
                  sortOrder: img.sortOrder ?? 0,
                })),
              },
            }
          : {}),
      },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
