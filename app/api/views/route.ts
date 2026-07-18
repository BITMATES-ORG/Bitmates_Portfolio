import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const Schema = z.object({
  entityType: z.enum(["project", "blog"]),
  entityId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { entityType, entityId } = parsed.data;

    if (entityType === "project") {
      await prisma.project.update({
        where: { id: entityId },
        data: { viewCount: { increment: 1 } },
      });
    } else {
      await prisma.blogPost.update({
        where: { id: entityId },
        data: { viewCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
