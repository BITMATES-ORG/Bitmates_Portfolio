import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();

    if (!profile?.resumeUrl) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.redirect(profile.resumeUrl);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
