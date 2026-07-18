const ALLOWED_EMAILS = [
  "napg.adekunle@gmail.com",
  "adelerekehinde01@gmail.com",
]

export function isAllowedEmail(email: string | undefined): boolean {
  if (!email) return false
  return ALLOWED_EMAILS.includes(email.toLowerCase())
}

export function getCurrentUserEmail(
  user: { email?: string | null } | null | undefined
): string | null {
  return user?.email ?? null
}
