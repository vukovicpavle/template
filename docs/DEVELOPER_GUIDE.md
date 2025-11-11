# Developer Guide

This guide is for human developers working in this T3 Turbo monorepo. It complements the [AI Context Documentation](./AI_CONTEXT.md) and provides practical guidance for day-to-day development.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Style Guide](#code-style-guide)
4. [Testing Guidelines](#testing-guidelines)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

- Node.js >= 22.19.0
- pnpm >= 10.15.1
- Git

### Initial Setup

1. **Clone and install**:
   ```bash
   git clone <repo-url>
   cd <repo-name>
   pnpm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Setup database**:
   ```bash
   pnpm db:push
   ```

4. **Generate auth schema**:
   ```bash
   pnpm auth:generate
   ```

5. **Start development**:
   ```bash
   pnpm dev
   ```

## Development Workflow

### Daily Workflow

1. **Pull latest changes**:
   ```bash
   git pull origin main
   pnpm install  # If dependencies changed
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make changes**:
   - Write code following [Code Style Guide](#code-style-guide)
   - Test locally
   - Run quality checks

4. **Before committing**:
   ```bash
   pnpm lint:fix
   pnpm format:fix
   pnpm typecheck
   ```
   
   > **Note**: Code formatting is automatically applied via a Git pre-commit hook. If formatting changes are made during commit, the commit will be aborted. Review the formatted changes and commit again.

5. **Commit with conventional format**:
   ```bash
   git commit -m "feat(scope): description"
   ```

6. **Push and create PR**:
   ```bash
   git push origin feat/your-feature-name
   ```

### Hot Reload

- **Next.js**: Automatically reloads on file changes
- **Expo**: Use Expo Go app or development build
- **Packages**: Changes trigger rebuilds in dependent apps

### Debugging

#### Next.js
- Use browser DevTools
- Check terminal for server logs
- Use React DevTools extension

#### Expo
- Use Expo DevTools
- Check Metro bundler logs
- Use React Native Debugger

#### tRPC
- Check server logs for errors
- Use tRPC DevTools (if configured)
- Verify types match between client/server

## Code Style Guide

### TypeScript

#### Prefer Type Imports
```typescript
// ✅ Good
import type { User } from "@acme/db/schema";
import { getUser } from "./utils";

// ❌ Avoid
import { User, getUser } from "./utils";
```

#### Use `satisfies` for Type Safety
```typescript
// ✅ Good
const router = {
  user: userRouter,
  post: postRouter,
} satisfies TRPCRouterRecord;

// ❌ Avoid
const router: TRPCRouterRecord = {
  user: userRouter,
  post: postRouter,
};
```

#### Avoid `any`
```typescript
// ✅ Good
function process(data: unknown) {
  if (typeof data === "string") {
    // handle string
  }
}

// ❌ Avoid
function process(data: any) {
  // ...
}
```

### React

#### Server Components First
Default to Server Components. Only use Client Components when needed:
- Interactivity (onClick, useState, etc.)
- Browser APIs (localStorage, window, etc.)
- Third-party libraries requiring client

```typescript
// ✅ Server Component (default)
export default async function Page() {
  const data = await getData();
  return <div>{data}</div>;
}

// ✅ Client Component (when needed)
"use client";
import { useState } from "react";
export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### Path Aliases
- `~/` for app-level imports
- `@acme/*` for package imports
- Relative paths (`../`, `./`) for local files

### File Naming

- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase (`getUserData.ts`)
- **Config files**: kebab-case (`app.config.ts`)
- **Pages**: Follow framework conventions (Next.js uses file-based routing)

### Import Organization

Prettier automatically sorts imports, but manual organization should follow:

1. Type imports
2. React/Next.js/Expo
3. Third-party
4. `@acme/*` packages
5. Local imports

## Testing Guidelines

### Writing Tests

While this template doesn't include a test framework by default, when adding tests:

1. **Unit Tests**: Test individual functions/utilities
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test full user flows (optional)

### Test Structure

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
└── utils/
    ├── formatDate.ts
    └── formatDate.test.ts
```

### Test Naming

```typescript
describe("formatDate", () => {
  it("should format date correctly", () => {
    // test
  });
});
```

## Commit Guidelines

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code restructuring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Scope

Optional, but recommended:
- Package name: `feat(api): add user endpoint`
- App name: `fix(nextjs): resolve hydration issue`
- Area: `feat(ui): add button component`

### Examples

```bash
feat(api): add user profile endpoint
fix(ui): resolve button hover state
docs: update README with setup instructions
refactor(store): simplify user store logic
chore: update dependencies
```

### Commit Message Best Practices

- Use imperative mood ("add" not "added")
- Keep first line under 72 characters
- Capitalize first letter
- No period at end
- Reference issues: `feat: add feature (#123)`

## Pull Request Process

### PR Checklist

Before submitting a PR:

- [ ] Code follows style guide
- [ ] `pnpm lint` passes
- [ ] `pnpm format` passes
- [ ] `pnpm typecheck` passes
- [ ] No console.logs in production code
- [ ] Environment variables documented in `.env.example`
- [ ] README updated if needed
- [ ] Commit messages follow conventional format

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
```

### Review Process

1. **Self-review**: Review your own PR before requesting review
2. **Request review**: Tag relevant team members
3. **Address feedback**: Make requested changes
4. **CI must pass**: All checks must be green
5. **Squash and merge**: Use squash merge for clean history

## Troubleshooting

### Common Issues

#### "Module not found" errors
```bash
# Clear cache and reinstall
pnpm clean
pnpm install
```

#### Type errors after dependency update
```bash
# Regenerate types
pnpm typecheck
# If issues persist, restart TypeScript server in editor
```

#### Expo build issues
```bash
# Clear Expo cache
cd apps/expo
npx expo start --clear
```

#### Database connection issues
- Check `.env` file has correct `POSTGRES_URL`
- Verify database is running
- Check network connectivity

#### Port already in use
```bash
# Find process using port
lsof -i :3000
# Kill process or use different port
PORT=3001 pnpm dev
```

### Getting Help

1. Check [AI Context Documentation](./AI_CONTEXT.md)
2. Review [T3 Turbo docs](https://github.com/t3-oss/create-t3-turbo)
3. Search existing issues
4. Ask in team chat
5. Create new issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Expected vs actual behavior

## Performance Tips

### Bundle Size

- Use dynamic imports for heavy components
- Lazy load routes when possible
- Monitor bundle size with `pnpm build --analyze`

### Database Queries

- Use Drizzle's query builder efficiently
- Avoid N+1 queries
- Use indexes for frequently queried fields

### React Performance

- Use Server Components when possible
- Memoize expensive computations
- Optimize re-renders with React.memo when needed

## Security Best Practices

### Environment Variables

- Never commit `.env` files
- Use `.env.example` as template
- Validate all env vars with Zod
- Rotate secrets regularly

### Input Validation

- Always validate user input with Zod
- Sanitize data before database operations
- Use parameterized queries (Drizzle handles this)

### Authentication

- Use `protectedProcedure` for authenticated routes
- Verify permissions in procedures
- Never trust client-side auth checks alone

## Additional Resources

- [T3 Turbo Repository](https://github.com/t3-oss/create-t3-turbo)
- [Turborepo Docs](https://turborepo.org/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Expo Docs](https://docs.expo.dev)
- [tRPC Docs](https://trpc.io/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs)
