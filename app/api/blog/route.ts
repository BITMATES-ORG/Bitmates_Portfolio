import { createClient, createAdminClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { mapCamel } from "@/lib/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const supabase = await createClient()
  const { data: authData } = await supabase.auth.getUser()
  const isAdmin = !!authData.user
  const slug = searchParams.get("slug")

  let query = supabase.from("blog_posts").select("*")

  if (!isAdmin) {
    query = query.eq("published", true)
  }

  if (slug) {
    query = query.eq("slug", slug)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(mapCamel(data ?? []))
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const admin = createAdminClient()
  const { data, error } = await admin
    .from("blog_posts")
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(mapCamel(data), { status: 201 })
}
