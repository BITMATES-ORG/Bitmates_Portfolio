import { createAdminClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { mapCamel } from "@/lib/utils"

export async function GET() {
  const admin = createAdminClient()
  const { data, error } = await admin.from("stats").select("*").order("sort_order")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(mapCamel(data ?? []))
}
