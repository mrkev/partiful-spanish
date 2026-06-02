# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint
```

No test suite is configured. There's no `pnpm test` script.

After schema changes:
```bash
pnpm prisma migrate dev   # Run migrations
pnpm prisma generate      # Regenerate client (also runs on postinstall)
```

## Stack

- **Next.js 15** with App Router, React 19, TypeScript
- **Supabase** for auth (via `@supabase/ssr`)
- **Prisma** for database ORM — client generated to `lib/generated/prisma/`
- **shadcn/ui** (Radix UI + Tailwind CSS v4)
- **pnpm** as package manager

## Architecture

### Auth pattern
Two-layer auth: Supabase handles credentials, Prisma stores the app `User` record linked via `supabase_userId`. The `genLogin()` function in [app/actions/auth.ts](app/actions/auth.ts) is the canonical way to get the current user — it returns `{profile: User, auth: SupabaseUser}` or `{profile: null, auth: null}`. Use `expectGenLogin()` when auth is required (throws on failure). Session refresh happens in [middleware.ts](middleware.ts) via Supabase SSR.

### Server actions
Mutations live in `app/actions/` as `"use server"` files. They call Prisma directly. [app/actions/serveronly.ts](app/actions/serveronly.ts) holds the hardcoded `kevinId()` (a dev shortcut — the app currently creates events under a fixed user ID instead of using the logged-in user's ID).

### Data model
`User` → `Event` (one-to-many via `creatorId`) → `RSVP` (join table with `RSVPStatus`: YES/NO/MAYBE).

### Routing
- `/` — landing page (redirects logged-in users to `/inicio`)
- `/inicio` — dashboard (fetches events via `getAuthUserEvents`)
- `/create` — new event form
- `/editar/[id]` — edit event form
- `/e/[id]` — public event page
- `/login`, `/logout` — auth

### Supabase clients
Three flavors in `utils/supabase/`: `client.ts` (browser), `server.ts` (server components/actions), `middleware.ts` (session refresh). Always use the right one for the context.

### UI conventions
- The app UI is in **Spanish**
- shadcn components live in `components/ui/` — don't modify these directly, add wrappers
- `lib/utils/string.ts` has `nonempty()` (empty string → null) and `emptythrows()` (empty string → throws) for form field handling
