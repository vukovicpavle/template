# AI Agent Context Documentation

This document provides comprehensive context for AI agents working in this T3 Turbo monorepo. It serves as the source of truth for project structure, conventions, and patterns.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Code Style & Conventions](#code-style--conventions)
4. [Security Guidelines](#security-guidelines)
5. [Testing & Quality](#testing--quality)
6. [Common Patterns](#common-patterns)
7. [Forbidden Patterns](#forbidden-patterns)

## Project Overview

This is a **T3 Turbo monorepo** - a full-stack TypeScript monorepo using:

- **Turborepo** for monorepo orchestration
- **pnpm** for package management (workspace protocol)
- **Next.js 15** (App Router) for web application
- **Expo** (React Native) for mobile application
- **tRPC** for end-to-end type-safe APIs
- **Drizzle ORM** for database access
- **Better Auth** for authentication
- **Zustand** for state management
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components

### Key Principles

1. **Type Safety First**: Leverage TypeScript and tRPC for end-to-end type safety
2. **Code Sharing**: Maximize code reuse through shared packages
3. **Separation of Concerns**: Clear boundaries between apps and packages
4. **Developer Experience**: Fast builds, hot reload, excellent tooling

## Architecture

### Monorepo Structure

```
/
├── apps/
│   ├── nextjs/          # Next.js 15 web application
│   └── expo/            # Expo React Native application
├── packages/
│   ├── api/             # tRPC router (server-only, types shared)
│   ├── auth/            # Better Auth configuration
│   ├── db/              # Drizzle schema & database client
│   ├── store/           # Zustand state stores
│   ├── ui/              # shadcn/ui components
│   └── validators/      # Zod validation schemas
└── tooling/
    ├── eslint/          # Shared ESLint configurations
    ├── prettier/        # Shared Prettier configuration
    ├── tailwind/        # Shared Tailwind configurations
    └── typescript/      # Shared TypeScript configurations
```

### Package Dependencies

**Critical Rule**: The `@acme/api` package contains server-side tRPC routers. It should be:
- ✅ **Production dependency** in `apps/nextjs` (where it runs)
- ✅ **Dev dependency** in `apps/expo` (for types only)
- ❌ **Never imported at runtime** in client apps

This ensures backend code never leaks to client bundles.

### Dependency Flow

```
apps/nextjs (server) → @acme/api (production)
apps/expo (client) → @acme/api (dev, types only)
apps/* → @acme/ui, @acme/store, @acme/db (production)
packages/* → tooling/* (dev dependencies)
```

## Code Style & Conventions

### TypeScript

#### Type Imports
Always use type imports when importing types:

```typescript
// ✅ Good
import type { User } from "@acme/db/schema";
import { getUser } from "./utils";

// ❌ Bad
import { User, getUser } from "./utils";
```

#### Type Safety
- Use `satisfies` for type-safe object literals:
  ```typescript
  const router = {
    user: userRouter,
    post: postRouter,
  } satisfies TRPCRouterRecord;
  ```
- Prefer `unknown` over `any` when type is truly unknown
- Use Zod for runtime validation and type inference

#### Zod Usage
Always use `zod/v4`:
```typescript
import { z } from "zod/v4";
```

### Import Order

Prettier automatically enforces this order:

1. Type-only imports (`<TYPES>`)
2. React/Next.js/Expo
3. Third-party packages
4. `@acme/*` packages (types first, then values)
5. Local imports (`~/`, `../`, `./`)

Example:
```typescript
import type { User } from "@acme/db/schema";
import { useState } from "react";
import { z } from "zod/v4";
import { Button } from "@acme/ui";
import { getUser } from "~/utils";
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Files | kebab-case | `user-profile.tsx` |
| React Components | PascalCase | `UserProfile` |
| Variables | camelCase | `userName` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Types/Interfaces | PascalCase | `UserProfile` |
| Functions | camelCase | `getUserProfile` |

### React Patterns

#### Server Components (Default)
```typescript
// ✅ Server Component (default)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

#### Client Components
```typescript
// ✅ Client Component (when needed)
"use client";
import { useState } from "react";
```

#### Path Aliases
- Use `~/` for app-level imports in Next.js/Expo
- Use relative imports (`../`, `./`) for local files
- Use `@acme/*` for package imports

### File Organization

#### Package Structure
Every package should have:
```
package-name/
├── package.json
├── tsconfig.json          # Extends @acme/typescript-config/base
├── eslint.config.js       # Uses shared ESLint config
└── src/
    └── index.ts           # Main entry point
```

#### Next.js App Structure
```
apps/nextjs/src/
├── app/                   # App Router pages
│   ├── layout.tsx
│   └── page.tsx
├── components/            # React components
├── trpc/                  # tRPC client/server setup
└── auth/                  # Auth utilities
```

#### Expo App Structure
```
apps/expo/src/
├── app/                   # Expo Router pages
├── components/            # React Native components
└── utils/                 # Utilities (api, auth, etc.)
```

## Security Guidelines

### Environment Variables

**CRITICAL**: Never use `process.env` directly. Always use validated environment variables:

```typescript
// ✅ Good
import { env } from "~/env";
const apiKey = env.API_KEY;

// ❌ Bad
const apiKey = process.env.API_KEY;
```

### Secrets Management

**NEVER:**
- Commit `.env` files
- Log secrets or API keys
- Hardcode secrets in code
- Expose secrets in error messages
- Include PII in logs

**ALWAYS:**
- Use `.env.example` as template
- Validate env vars with Zod (via t3-env)
- Use environment variables for all secrets
- Sanitize logs before output

### Input Validation

Always validate user input with Zod:

```typescript
import { z } from "zod/v4";

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

// In tRPC procedure
.input(CreateUserSchema)
```

## Testing & Quality

### Linting

ESLint is configured with:
- TypeScript strict rules
- Import order enforcement
- Turbo monorepo rules
- React/Next.js best practices

Run:
```bash
pnpm lint          # Check
pnpm lint:fix      # Auto-fix
```

### Formatting

Prettier is configured with:
- Tailwind CSS plugin (auto-sorts classes)
- Import sorting plugin
- Consistent formatting

Run:
```bash
pnpm format        # Check
pnpm format:fix    # Auto-fix
```

### Type Checking

TypeScript strict mode is enabled:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `checkJs: true`

Run:
```bash
pnpm typecheck
```

### Pre-commit Checklist

Before committing:
- [ ] `pnpm lint` passes
- [ ] `pnpm format` passes
- [ ] `pnpm typecheck` passes
- [ ] No `@ts-ignore` without explanation
- [ ] No console.logs in production code
- [ ] Environment variables validated

## Common Patterns

### Adding a tRPC Endpoint

1. Create router in `packages/api/src/router/`:
   ```typescript
   // packages/api/src/router/user.ts
   import { z } from "zod/v4";
   import { protectedProcedure } from "../trpc";
   
   export const userRouter = {
     profile: protectedProcedure.query(({ ctx }) => {
       return ctx.db.query.User.findFirst({
         where: eq(User.id, ctx.session.userId),
       });
     }),
   } satisfies TRPCRouterRecord;
   ```

2. Export from `packages/api/src/root.ts`:
   ```typescript
   import { userRouter } from "./router/user";
   
   export const appRouter = router({
     user: userRouter,
     // ... other routers
   });
   ```

### Adding a Database Schema

1. Add to `packages/db/src/schema.ts`:
   ```typescript
   export const User = pgTable("user", {
     id: text("id").primaryKey(),
     name: text("name").notNull(),
     email: text("email").notNull().unique(),
   });
   ```

2. Run migration:
   ```bash
   pnpm db:push
   ```

3. Export types:
   ```typescript
   // packages/db/src/index.ts
   export type User = typeof User.$inferSelect;
   export type NewUser = typeof User.$inferInsert;
   ```

### Adding a UI Component

Use shadcn/ui CLI:
```bash
pnpm ui-add
```

This automatically:
- Adds component to `packages/ui/src/`
- Configures Tailwind
- Sets up proper imports

### Adding a New Package

Use Turborepo generator:
```bash
pnpm turbo gen init
```

This automatically:
- Creates package structure
- Sets up `package.json`, `tsconfig.json`
- Configures ESLint, Prettier
- Adds to workspace

### Error Handling

```typescript
// In tRPC procedures
import { TRPCError } from "@trpc/server";

if (!user) {
  throw new TRPCError({
    code: "NOT_FOUND",
    message: "User not found",
  });
}
```

## Forbidden Patterns

### ❌ DO NOT

1. **Use `process.env` directly**
   ```typescript
   // ❌ Bad
   const key = process.env.API_KEY;
   
   // ✅ Good
   import { env } from "~/env";
   const key = env.API_KEY;
   ```

2. **Import `@acme/api` in client apps at runtime**
   ```typescript
   // ❌ Bad (in apps/expo)
   import { appRouter } from "@acme/api";
   
   // ✅ Good (types only)
   import type { RouterOutputs } from "@acme/api";
   ```

3. **Use `any` type**
   ```typescript
   // ❌ Bad
   function process(data: any) {}
   
   // ✅ Good
   function process(data: unknown) {}
   ```

4. **Skip validation**
   ```typescript
   // ❌ Bad
   .input(z.any())
   
   // ✅ Good
   .input(CreateUserSchema)
   ```

5. **Ignore linting errors**
   ```typescript
   // ❌ Bad
   // eslint-disable-next-line
   const x = process.env.KEY;
   
   // ✅ Good
   // Fix the issue or explain why it's necessary
   ```

6. **Create circular dependencies**
   - Keep dependencies unidirectional
   - Use shared packages for common code

7. **Commit secrets**
   - Never commit `.env` files
   - Use `.env.example` as template

### ✅ DO

1. Use type imports for types
2. Use `satisfies` for type safety
3. Validate inputs with Zod
4. Follow import order
5. Write descriptive commit messages
6. Keep dependencies minimal
7. Document complex logic
8. Test your changes

## Quick Reference

### Commands

```bash
# Development
pnpm dev                  # Start all apps
pnpm dev:next             # Start Next.js only

# Quality
pnpm lint                 # Lint all packages
pnpm lint:fix             # Fix linting issues
pnpm format               # Check formatting
pnpm format:fix           # Fix formatting
pnpm typecheck            # Type check all packages

# Database
pnpm db:push              # Push schema to database
pnpm db:studio            # Open Drizzle Studio

# Auth
pnpm auth:generate        # Generate Better Auth schema

# UI
pnpm ui-add               # Add shadcn/ui component

# Package Management
pnpm turbo gen init       # Create new package
```

### File Paths

- App configs: `apps/*/package.json`
- Package configs: `packages/*/package.json`
- Shared ESLint: `tooling/eslint/`
- Shared Prettier: `tooling/prettier/`
- Shared TypeScript: `tooling/typescript/`

## Additional Resources

- [T3 Turbo Documentation](https://github.com/t3-oss/create-t3-turbo)
- [Turborepo Documentation](https://turborepo.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
