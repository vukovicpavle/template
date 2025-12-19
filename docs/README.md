# Documentation

This directory contains comprehensive documentation for the T3 Turbo monorepo, including AI agent context and developer guides.

## Documentation Files

### For AI Agents

- **[AI_CONTEXT.md](./AI_CONTEXT.md)** - Comprehensive context for AI coding assistants
  - Project structure and architecture
  - Code style and conventions
  - Security guidelines
  - Common patterns and examples
  - Forbidden patterns to avoid

### For Developers

- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Guide for human developers
  - Getting started
  - Development workflow
  - Code style guide
  - Testing guidelines
  - Commit guidelines
  - Pull request process
  - Troubleshooting
- **[PHONE_AUTHENTICATION.md](./PHONE_AUTHENTICATION.md)** - Phone number authentication guide
  - Configuration and setup
  - Usage examples (Next.js and Expo)
  - Twilio SMS provider setup
  - Security best practices
  - Troubleshooting

### Examples and Templates

- **[examples/PR_TEMPLATE.md](./examples/PR_TEMPLATE.md)** - Pull request template
- **[examples/MODULE_LAYOUT.md](./examples/MODULE_LAYOUT.md)** - Module structure examples
- **[examples/PROMPT_SNIPPETS.md](./examples/PROMPT_SNIPPETS.md)** - Reusable AI prompt snippets

## Quick Links

### Configuration Files

- **`.cursorrules`** - Primary AI agent context (root directory)
- **`.editorconfig`** - Editor configuration

### Key Commands

```bash
# Quality checks
pnpm lint          # Lint code
pnpm format        # Check formatting
pnpm typecheck     # Type check

# Development
pnpm dev           # Start all apps
pnpm db:push       # Push database schema

# Documentation
# See docs/ directory
```

## For New Contributors

1. Read [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for setup and workflow
2. Review [AI_CONTEXT.md](./AI_CONTEXT.md) to understand project conventions
3. Check [examples/MODULE_LAYOUT.md](./examples/MODULE_LAYOUT.md) for code structure examples
4. Use [examples/PR_TEMPLATE.md](./examples/PR_TEMPLATE.md) when creating PRs

## For AI Assistants

1. Read `.cursorrules` in the root directory (primary context)
2. Reference [AI_CONTEXT.md](./AI_CONTEXT.md) for detailed patterns
3. Use [examples/PROMPT_SNIPPETS.md](./examples/PROMPT_SNIPPETS.md) as prompt templates
4. Follow [examples/MODULE_LAYOUT.md](./examples/MODULE_LAYOUT.md) for code structure

## Maintaining Documentation

When updating documentation:

1. Keep examples current and tested
2. Update both AI and developer docs when patterns change
3. Ensure code examples work in both Next.js and Expo apps
4. Run quality checks before committing documentation changes

## Related Resources

- [T3 Turbo Repository](https://github.com/t3-oss/create-t3-turbo)
- [Turborepo Documentation](https://turborepo.org/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
