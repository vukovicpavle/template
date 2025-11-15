# GitHub Copilot Instructions

This document provides context and guidelines for GitHub Copilot when working in this T3 Turbo monorepo.

## Project Overview

This is a **T3 Turbo monorepo** - a full-stack TypeScript monorepo template using:

- **Turborepo** for monorepo orchestration
- **pnpm** (workspace protocol) for package management
- **Next.js 15** (App Router) for web application
- **Expo** (React Native) for mobile application
- **tRPC v11** for end-to-end type-safe APIs
- **Drizzle ORM** with Supabase for database
- **Better Auth** for authentication
- **Zustand** for state management
- **Tailwind CSS** for styling (web and mobile via NativeWind)
- **shadcn/ui** for UI components

## Project Structure

```
/
├── apps/
│   ├── nextjs/          # Next.js 15 web app (React 19, App Router)
│   └── expo/            # Expo mobile app (React Native, Expo Router)
├── packages/
│   ├── api/             # tRPC router (dev dependency in clients)
│   ├── auth/            # Better Auth configuration
│   ├── db/              # Drizzle schema & database client
│   ├── store/           # Zustand state stores
│   ├── ui/              # shadcn/ui components
│   └── validators/      # Zod schemas
├── tooling/
│   ├── eslint/          # Shared ESLint configs
│   ├── prettier/        # Shared Prettier config
│   ├── tailwind/        # Shared Tailwind configs
│   └── typescript/      # Shared tsconfig
└── docs/                # Comprehensive documentation
```

## Key Conventions

### TypeScript

- **Strict mode enabled** - No `any` types (use `unknown` if needed)
- **Type imports**: Use `import type { X } from '...'` for types
- **Type safety**: Use `satisfies` for type-safe object literals
- **Validation**: Import zod as `import { z } from 'zod/v4'`

### Import Order (Enforced by Prettier)

1. Type-only imports
2. React/Next.js/Expo
3. Third-party packages
4. `@acme/*` packages (types first, then values)
5. Local imports (`~/`, `../`, `./`)

### Naming Conventions

- **Files**: kebab-case for files, PascalCase for React components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase
- **Functions**: camelCase with descriptive verbs

### React & Next.js Patterns

- **Server Components by default** - Use `'use client'` only when needed
- **Server-first**: Prefer async Server Components
- **Path alias**: Use `~/` for app-level imports
- **Type-safe APIs**: Always use tRPC for API calls
- **Image optimization**: Use Next.js Image component

### Expo Patterns

- **Expo Router**: File-based routing in `src/app/`
- **NativeWind**: Tailwind CSS for React Native styling
- **Type-safe APIs**: Use tRPC client from `@acme/api`

## Security Requirements

### Environment Variables

- **NEVER use `process.env` directly**
- **Always use validated env**: `import { env } from '~/env'` or `@acme/env`
- **Never commit `.env` files**
- **Never log secrets, API keys, or PII**
- **Use `.env.example` as template**

### Secrets Handling

- No secrets in code
- No secrets in logs
- No PII in logs
- Use environment variables for all sensitive data

## Package Dependencies

### Important Rules

- **`@acme/api`**: Use as **dev dependency** in client apps (types only)
- **`@acme/api`**: Use as **production dependency** only in Next.js server
- **Shared runtime code**: Create a `@acme/shared` package
- **Workspace protocol**: `"@acme/ui": "workspace:*"`

## Common Workflows

### Development

```bash
pnpm dev              # Start all apps in watch mode
pnpm dev:next         # Start only Next.js app
pnpm lint             # Run linting
pnpm lint:fix         # Fix linting issues
pnpm format:fix       # Format code with Prettier
pnpm typecheck        # Type check all packages
pnpm build            # Build all apps and packages
```

### Database

```bash
pnpm db:push          # Push Drizzle schema to database
pnpm db:studio        # Open Drizzle Studio
```

### Authentication

```bash
pnpm auth:generate    # Generate Better Auth schema
```

### Adding Components

```bash
pnpm ui-add           # Add shadcn/ui components
pnpm turbo gen init   # Create a new package
```

## Code Quality Standards

### Pre-commit Hooks

- **Formatting**: Code is auto-formatted with Prettier via Git hook
- **Convention**: If formatting changes are made, commit is aborted for review

### Required Checks

- **Linting**: ESLint must pass
- **Type checking**: TypeScript strict mode must pass
- **No unused variables**: Prefix with `_` to mark as intentionally unused

## Commit Message Format

**MANDATORY**: All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
Scope: api, ui, nextjs, expo, db, auth, etc. (optional)
Description: Imperative mood, no period at end
```

**Examples:**
- ✅ `feat(api): add user profile endpoint`
- ✅ `fix(ui): resolve button hover state`
- ✅ `docs: update README with setup instructions`
- ❌ `Added login button` (missing type)
- ❌ `fix: Fixed the bug.` (past tense, period)

## Common Tasks

### Adding a tRPC Endpoint

1. Create router in `packages/api/src/router/`
2. Export from `packages/api/src/root.ts`
3. Use Zod schemas for validation
4. Use `protectedProcedure` for auth-required routes

Example:
```typescript
import { z } from 'zod/v4';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, input.userId),
      });
    }),
});
```

### Adding a Database Schema

1. Add schema to `packages/db/src/schema.ts`
2. Run `pnpm db:push` to sync with database
3. Export types from `packages/db/src/index.ts`

### Adding a UI Component

1. Run `pnpm ui-add` and select component
2. Component is added to `packages/ui/src/`
3. Import in apps: `import { Button } from '@acme/ui'`

### Creating a New Package

1. Run `pnpm turbo gen init`
2. Follow prompts for package name and dependencies
3. Package is scaffolded with proper configs

## Forbidden Patterns

### ❌ DO NOT

- Use `process.env` directly (use validated env)
- Import `@acme/api` as production dep in client apps
- Commit `.env` files
- Use `any` type
- Skip type checking
- Ignore linting errors
- Create circular dependencies
- Hardcode secrets or API keys
- Use `@ts-ignore` without explanation
- Use outdated zod import (use `zod/v4`)

### ✅ DO

- Use type imports: `import type { X }`
- Use `satisfies` for type safety
- Validate all inputs with Zod
- Follow import order conventions
- Write descriptive commit messages
- Keep dependencies minimal
- Document complex logic
- Test your changes
- Use Server Components by default

## Error Handling

- **Validation**: Use Zod schemas for all input validation
- **Descriptive errors**: Throw errors with clear, actionable messages
- **tRPC errors**: Use appropriate tRPC error codes
- **Never expose sensitive data** in error messages
- **Logging**: Include context but never log secrets or PII

## Documentation

### Code Comments

- Document complex logic and algorithms
- Explain "why" not "what"
- Use JSDoc for public APIs
- Keep comments up-to-date with code

### Package READMEs

- Each non-trivial package should have a README
- Document usage, examples, and architecture
- Keep examples current and runnable

## Additional Resources

- **[docs/README.md](../docs/README.md)** - Documentation index
- **[docs/AI_CONTEXT.md](../docs/AI_CONTEXT.md)** - Detailed AI agent context
- **[docs/DEVELOPER_GUIDE.md](../docs/DEVELOPER_GUIDE.md)** - Developer workflow guide
- **[docs/examples/](../docs/examples/)** - Templates and examples
- **[.cursorrules](../.cursorrules)** - Cursor AI context file

## System Requirements

- **Node.js**: >=22.19.0
- **pnpm**: >=10.15.1
- **Database**: Supabase (or compatible Postgres with edge support)

## Quick Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm lint:fix` | Fix linting issues |
| `pnpm format:fix` | Format code with Prettier |
| `pnpm typecheck` | Type check all packages |
| `pnpm db:push` | Push database schema |
| `pnpm db:studio` | Open database studio |
| `pnpm ui-add` | Add shadcn/ui component |
| `pnpm turbo gen init` | Create new package |

---

For detailed documentation, see the [docs/](../docs/) directory.
