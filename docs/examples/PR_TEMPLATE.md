# Pull Request Template

Use this template when creating a new PR. Copy and fill out the relevant sections.

## Description

<!-- Provide a clear and concise description of what this PR does -->

## Type of Change

<!-- Mark the relevant option with an 'x' -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🎨 Style/formatting changes (no functional changes)
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] ✅ Test updates

## Related Issues

<!-- Link to related Linear issues or GitHub issues -->

Closes #<!-- issue number -->

## Changes Made

<!-- List the main changes in this PR -->

- 
- 
- 

## Testing

<!-- Describe how you tested this change -->

### Test Plan

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Tested on Next.js app
- [ ] Tested on Expo app (if applicable)

### Test Steps

1. 
2. 
3. 

### Screenshots/Videos

<!-- If applicable, add screenshots or videos demonstrating the changes -->

## Checklist

<!-- Mark completed items with an 'x' -->

### Code Quality
- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented, particularly in complex areas
- [ ] No console.logs or debug code left in
- [ ] No `@ts-ignore` or `@ts-expect-error` without explanation

### Quality Checks
- [ ] `pnpm lint` passes
- [ ] `pnpm format` passes
- [ ] `pnpm typecheck` passes
- [ ] All CI checks pass

### Documentation
- [ ] README updated (if needed)
- [ ] Code comments added for complex logic
- [ ] API documentation updated (if applicable)
- [ ] CHANGELOG updated (if applicable)

### Security
- [ ] No secrets or API keys committed
- [ ] Environment variables documented in `.env.example`
- [ ] Input validation added (if applicable)
- [ ] Security considerations addressed

### Dependencies
- [ ] New dependencies are necessary and minimal
- [ ] Dependencies are up to date
- [ ] No breaking changes in dependencies (or documented)

## Deployment Notes

<!-- Any special deployment considerations or migration steps -->

## Additional Context

<!-- Add any other context, screenshots, or information about the PR -->
