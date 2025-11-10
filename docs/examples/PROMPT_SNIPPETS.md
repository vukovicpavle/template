# AI Prompt Snippets

This document contains reusable prompt snippets for common development tasks. Use these as starting points when asking AI assistants to help with code changes.

## Adding a New tRPC Endpoint

```
Add a new tRPC endpoint to fetch [resource] by [criteria].

Requirements:
- Endpoint name: [name]
- Input validation: [describe input schema]
- Authentication: [public/protected]
- Return type: [describe return type]
- Error handling: [describe error cases]

Follow the existing router pattern in packages/api/src/router/.
Use Zod for validation and export from the root router.
```

### Example

```
Add a new tRPC endpoint to fetch posts by author ID.

Requirements:
- Endpoint name: byAuthorId
- Input validation: { authorId: string }
- Authentication: public
- Return type: Array of Post objects
- Error handling: Return empty array if no posts found

Follow the existing router pattern in packages/api/src/router/post.ts.
Use Zod for validation and export from packages/api/src/root.ts.
```

## Refactoring Code

```
Refactor [component/function/module] to [goal].

Current issues:
- [issue 1]
- [issue 2]

Requirements:
- [requirement 1]
- [requirement 2]
- Maintain backward compatibility: [yes/no]
- Update tests: [yes/no]

Follow project conventions:
- Use type imports for types
- Follow import order
- Use satisfies for type safety
- Add JSDoc comments for public APIs
```

### Example

```
Refactor the UserProfile component to use Server Components.

Current issues:
- Uses client-side data fetching
- Unnecessary re-renders
- Not leveraging Next.js 15 features

Requirements:
- Convert to async Server Component
- Fetch user data on server
- Maintain same UI/UX
- Update imports to use type imports
- Add error handling

Follow project conventions and update related files.
```

## Adding a Database Schema

```
Add a new database table for [entity].

Schema requirements:
- Table name: [name]
- Fields:
  - [field1]: [type] [constraints]
  - [field2]: [type] [constraints]
- Relationships:
  - [relationship description]
- Indexes: [if any]

Add to packages/db/src/schema.ts and export types.
Create migration with pnpm db:push.
```

### Example

```
Add a new database table for comments.

Schema requirements:
- Table name: comment
- Fields:
  - id: text (primary key)
  - postId: text (foreign key to post.id)
  - authorId: text (foreign key to user.id)
  - content: text (not null, max 5000 chars)
  - createdAt: timestamp (default now)
  - updatedAt: timestamp (default now)
- Relationships:
  - Belongs to Post (many-to-one)
  - Belongs to User (many-to-one)
- Indexes: postId, authorId

Add to packages/db/src/schema.ts and export Comment and NewComment types.
```

## Writing Tests

```
Write tests for [component/function/module].

Test cases:
- [test case 1]
- [test case 2]
- [test case 3]

Requirements:
- Test file location: [path]
- Coverage: [unit/integration/e2e]
- Mock dependencies: [list what to mock]
- Test framework: [if specified]

Follow project testing conventions.
```

### Example

```
Write unit tests for the formatDate utility function.

Test cases:
- Formats ISO date string correctly
- Handles invalid input gracefully
- Formats different date formats
- Handles timezone correctly

Requirements:
- Test file: src/utils/formatDate.test.ts
- Coverage: Unit tests
- No mocks needed
- Use Vitest (if configured)

Follow project testing conventions and ensure 100% coverage.
```

## Adding a UI Component

```
Add a new UI component: [ComponentName].

Requirements:
- Component type: [button/form/modal/etc.]
- Props: [list props]
- Variants: [if any]
- Styling: Use Tailwind CSS
- Accessibility: [requirements]

Add to packages/ui/src/ using shadcn/ui pattern.
Export from packages/ui/src/index.ts.
```

### Example

```
Add a new UI component: AlertDialog.

Requirements:
- Component type: Modal dialog
- Props: open, onOpenChange, title, description, action buttons
- Variants: destructive, default
- Styling: Use Tailwind CSS, match existing design system
- Accessibility: ARIA labels, keyboard navigation, focus management

Add to packages/ui/src/alert-dialog.tsx using shadcn/ui pattern.
Export AlertDialog, AlertDialogTrigger, etc. from packages/ui/src/index.ts.
Create example usage in apps/nextjs.
```

## Fixing Bugs

```
Fix bug: [brief description].

Issue:
- [detailed description]
- Steps to reproduce: [list steps]
- Expected behavior: [what should happen]
- Actual behavior: [what actually happens]

Requirements:
- Fix the root cause, not just symptoms
- Add error handling if missing
- Add tests to prevent regression
- Update documentation if needed

Follow project conventions and ensure all quality checks pass.
```

### Example

```
Fix bug: User profile page shows loading state indefinitely.

Issue:
- When user is not authenticated, profile page never resolves
- Steps to reproduce:
  1. Log out
  2. Navigate to /profile
  3. Page shows loading spinner forever
- Expected: Redirect to login or show error message
- Actual: Infinite loading state

Requirements:
- Fix the authentication check in the profile page
- Add proper error handling
- Add redirect to login for unauthenticated users
- Test the fix manually

Follow project conventions and ensure pnpm lint and pnpm typecheck pass.
```

## Performance Optimization

```
Optimize [component/function/route] for performance.

Current performance issues:
- [issue 1]
- [issue 2]

Requirements:
- [requirement 1]
- [requirement 2]
- Maintain functionality: [yes]
- Measure improvement: [how]

Use React Server Components, code splitting, or other optimizations as appropriate.
```

### Example

```
Optimize the posts list page for performance.

Current performance issues:
- Slow initial load (3+ seconds)
- Large bundle size
- Unnecessary re-renders

Requirements:
- Reduce initial load time to <1 second
- Implement code splitting for heavy components
- Use Server Components where possible
- Add loading states
- Maintain all existing functionality

Measure bundle size before/after and document improvements.
```

## Security Improvements

```
Improve security for [component/feature/endpoint].

Security concerns:
- [concern 1]
- [concern 2]

Requirements:
- [requirement 1]
- [requirement 2]
- Follow security best practices
- Add input validation
- Update documentation

Never commit secrets or expose sensitive data.
```

### Example

```
Improve security for user profile update endpoint.

Security concerns:
- No input validation
- No authorization check
- Potential SQL injection (though using Drizzle)
- No rate limiting

Requirements:
- Add Zod schema validation
- Verify user can only update their own profile
- Sanitize all inputs
- Add rate limiting (if possible)
- Update API documentation

Follow security best practices and ensure no secrets are logged.
```

## Documentation Updates

```
Update documentation for [feature/component/package].

What to document:
- [item 1]
- [item 2]

Requirements:
- Update [which files]
- Include code examples
- Keep examples current
- Follow documentation style guide

Ensure all code examples are tested and work correctly.
```

### Example

```
Update documentation for the user store package.

What to document:
- New useUser hook
- Persistence behavior
- Cross-platform compatibility
- Migration guide from old API

Requirements:
- Update packages/store/README.md
- Include code examples for Next.js and Expo
- Document breaking changes
- Add migration guide

Ensure all code examples are tested and work in both Next.js and Expo apps.
```

## General Development Task

```
[Task description]

Context:
- [relevant context]

Requirements:
- [requirement 1]
- [requirement 2]

Follow project conventions:
- TypeScript strict mode
- ESLint rules
- Prettier formatting
- Import order
- Naming conventions

Ensure:
- pnpm lint passes
- pnpm format passes
- pnpm typecheck passes
- No breaking changes (or document them)
```

## Tips for Using Prompts

1. **Be Specific**: Include file paths, function names, and exact requirements
2. **Provide Context**: Mention related files or existing patterns to follow
3. **List Requirements**: Break down complex tasks into clear requirements
4. **Specify Constraints**: Mention any limitations or constraints
5. **Request Quality Checks**: Ask to ensure linting, formatting, and type checking pass
6. **Ask for Documentation**: Request updates to relevant documentation

## Common Patterns to Reference

When asking for code changes, you can reference:

- Existing router: `packages/api/src/router/post.ts`
- Existing component: `apps/nextjs/src/components/store-demo.tsx`
- Existing store: `packages/store/src/user-store.ts`
- Existing schema: `packages/db/src/schema.ts`

This helps the AI understand the project's patterns and conventions.
