import { NextResponse } from "next/server";
import { getUser, getRepos, getContributionGraph } from "@/lib/github";

export async function GET() {
  try {
    const [user, repos, contributionGraph] = await Promise.all([
      getUser(),
      getRepos(),
      getContributionGraph(),
    ]);

    return NextResponse.json({ user, repos, contributionGraph });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
