export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  fork: boolean;
  stargazers_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

const GITHUB_USERNAME = "AdelereKehinde";
let cache: { data: unknown; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000;

async function fetchWithCache<T>(url: string): Promise<T> {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data as T;
  }
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  cache = { data, timestamp: Date.now() };
  return data as T;
}

export async function getUser(): Promise<GitHubUser> {
  return fetchWithCache<GitHubUser>(`https://api.github.com/users/${GITHUB_USERNAME}`);
}

export async function getRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchWithCache<GitHubRepo[]>(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=50&sort=updated`
  );
  return repos;
}

export async function getContributionGraph() {
  const html = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`, {
    next: { revalidate: 3600 },
  }).then((r) => r.text());
  return html;
}
