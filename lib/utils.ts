import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

type AnyObj = Record<string, unknown>

function toCamel(key: string): string {
  return key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

function isObj(v: unknown): v is AnyObj {
  return v !== null && typeof v === "object" && !Array.isArray(v)
}

export function mapCamel<T = unknown>(input: unknown): T {
  if (Array.isArray(input)) return input.map(mapCamel) as T
  if (isObj(input)) {
    const out: AnyObj = {}
    for (const [k, v] of Object.entries(input)) {
      out[toCamel(k)] = mapCamel(v)
    }
    return out as T
  }
  return input as T
}
