import { createAdminClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { table, id } = await request.json()

  if (!table || !id) {
    return NextResponse.json(
      { error: "table and id are required" },
      { status: 400 }
    )
  }

  if (!["projects", "blog_posts"].includes(table)) {
    return NextResponse.json(
      { error: "table must be 'projects' or 'blog_posts'" },
      { status: 400 }
    )
  }

  const admin = createAdminClient()

  const { data: existing } = await admin
    .from(table)
    .select("views")
    .eq("id", id)
    .maybeSingle()

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const currentViews = (existing.views as number) || 0

  const { error } = await admin
    .from(table)
    .update({ views: currentViews + 1 })
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ views: currentViews + 1 })
}
