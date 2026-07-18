import { createClient, createAdminClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { mapCamel } from "@/lib/utils"

export async function GET() {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(mapCamel(data ?? {}))
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const admin = createAdminClient()

  const { data: existing } = await admin
    .from("profiles")
    .select("id")
    .limit(1)
    .maybeSingle()

  if (existing) {
    const { data, error } = await admin
      .from("profiles")
      .update(body)
      .eq("id", existing.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(mapCamel(data))
  }

  const { data, error } = await admin
    .from("profiles")
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(mapCamel(data))
}
