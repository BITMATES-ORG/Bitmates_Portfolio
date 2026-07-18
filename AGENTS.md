<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands
- `npm run dev` — dev server (Turbopack default, no `--turbopack` flag needed)
- `npm run build` — production build
- `npm run lint` — ESLint flat config (NOT `next lint`; does not run during build)
- `npx tsc --noEmit` — typecheck (no npm script exists)
- No test framework or formatter installed

## Next.js 16 quirks
- `params` and `searchParams` are always `Promise` — must `await` or use `use()`
- `middleware.ts` renamed to `proxy.ts` (export `proxy`, not `middleware`)
- Parallel route slots require explicit `default.js`
- Dev output at `.next/dev/` (separate from production `.next/`)
- Scroll behavior no longer overridden by default; add `data-scroll-behavior="smooth"` to `<html>` to restore
- Use generated `PageProps<'/route'>`/`LayoutProps<'/route'>` type helpers (no import needed)

## Paths & config
- `@/*` maps to project root (`"./*"` in tsconfig), not `src/` or `app/`
- `next.config.ts` is currently empty
- No `.env` files exist

## CSS (Tailwind v4)
- `@import "tailwindcss"` replaces v3 `@tailwind` directives
- Theme via `@theme inline { ... }` blocks, not `tailwind.config.js`
- PostCSS only has `@tailwindcss/postcss` plugin (no autoprefixer needed)
