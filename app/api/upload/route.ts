import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

const ALLOWED_TYPES = ["image/", "application/pdf"];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isValidType = ALLOWED_TYPES.some((t) => file.type.startsWith(t));
    if (!isValidType) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const mockUrl = `https://res.cloudinary.com/demo/image/upload/v1/portfolio/${file.name}`;

    return NextResponse.json({ url: mockUrl });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
