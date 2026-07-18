import { getUser, getRepos } from "@/lib/github"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "repos"

  if (type === "user") {
    const user = await getUser()
    return NextResponse.json(user ?? {})
  }

  const repos = await getRepos()
  return NextResponse.json(repos ?? [])
}
