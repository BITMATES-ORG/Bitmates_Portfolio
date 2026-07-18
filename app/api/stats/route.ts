import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { z } from "zod";

const UpsertSchema = z.array(
  z.object({
    id: z.string().optional(),
    label: z.string().min(1),
    value: z.number().int(),
    icon: z.string().optional(),
    sortOrder: z.number().int().optional(),
  })
);

export async function GET() {
  try {
    const stats = await prisma.stat.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = UpsertSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const stats = await Promise.all(
      parsed.data.map((s) => {
        if (s.id) {
          return prisma.stat.update({
            where: { id: s.id },
            data: { label: s.label, value: s.value, icon: s.icon ?? "", sortOrder: s.sortOrder ?? 0 },
          });
        }
        return prisma.stat.create({
          data: { label: s.label, value: s.value, icon: s.icon ?? "", sortOrder: s.sortOrder ?? 0 },
        });
      })
    );

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
