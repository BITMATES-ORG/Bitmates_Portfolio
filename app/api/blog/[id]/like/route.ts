import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const Schema = z.object({
  sessionId: z.string().min(1),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { sessionId } = parsed.data;

    const existing = await prisma.blogLike.findUnique({
      where: { postId_sessionId: { postId: id, sessionId } },
    });

    if (existing) {
      await prisma.blogLike.delete({ where: { id: existing.id } });
      await prisma.blogPost.update({
        where: { id },
        data: { likeCount: { decrement: 1 } },
      });
    } else {
      await prisma.blogLike.create({
        data: { postId: id, sessionId },
      });
      await prisma.blogPost.update({
        where: { id },
        data: { likeCount: { increment: 1 } },
      });
    }

    const post = await prisma.blogPost.findUnique({
      where: { id },
      select: { likeCount: true },
    });

    return NextResponse.json({ likeCount: post?.likeCount ?? 0 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
