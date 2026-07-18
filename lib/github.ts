const GITHUB_USERNAME = "AdelereKehinde"
const CACHE_REVALIDATE = 3600

export async function getUser() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: CACHE_REVALIDATE },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
      { next: { revalidate: CACHE_REVALIDATE } }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
