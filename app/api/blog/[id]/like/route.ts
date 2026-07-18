import { createClient, createAdminClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const admin = createAdminClient()
  const userId = authData.user.id

  const { data: existing } = await admin
    .from("blog_likes")
    .select("id")
    .eq("blog_post_id", id)
    .eq("user_id", userId)
    .maybeSingle()

  if (existing) {
    await admin.from("blog_likes").delete().eq("id", existing.id)
    return NextResponse.json({ liked: false })
  }

  await admin
    .from("blog_likes")
    .insert({ blog_post_id: id, user_id: userId })

  return NextResponse.json({ liked: true }, { status: 201 })
}
