# Magic Link Authentication

This document describes the Magic Link authentication feature implemented using Better Auth.

## Overview

Magic Link authentication allows users to sign in via a secure link sent to their email address, eliminating the need for passwords. This feature is implemented using the [Better Auth Magic Link plugin](https://www.better-auth.com/docs/plugins/magic-link).

## Features

- **Passwordless authentication**: Users can sign in by clicking a link sent to their email
- **Secure token handling**: Tokens are automatically generated and validated by Better Auth
- **Automatic expiration**: Magic links expire after 5 minutes for security
- **Beautiful email templates**: Professional HTML email templates with gradient design
- **Seamless integration**: Works alongside existing authentication methods
- **Type-safe**: Full TypeScript support throughout the implementation

## Architecture

### Backend Configuration

The Magic Link plugin is configured in `packages/auth/src/index.ts`:

```typescript
magicLink({
  sendMagicLink: options.sendMagicLink ?? (() => {
    console.warn("Magic Link email sender not configured");
  }),
})
```

### Email Integration

Email sending is handled through Resend API in `packages/auth/src/magic-link-email.ts`:

- **Template**: HTML email with responsive design and gradient styling
- **Plain text fallback**: Included for email clients that don't support HTML
- **Customizable sender**: Configure via `MAGIC_LINK_FROM_EMAIL` environment variable

### Database Schema

The Magic Link plugin uses the `verification` table in the database schema:

```typescript
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
```

## Setup

### 1. Environment Variables

Add the following to your `.env` file:

```bash
# Required: Resend API key for sending emails
RESEND_API_KEY="re_..."

# Optional: Sender email address (defaults to "noreply@yourdomain.com")
MAGIC_LINK_FROM_EMAIL="auth@yourdomain.com"
```

### 2. Database Migration

The database schema is automatically generated. To update your database:

```bash
pnpm auth:generate
pnpm db:push
```

### 3. Configure Email Sender

In your Next.js app (`apps/nextjs/src/auth/server.ts`), the magic link email sender is configured:

```typescript
const magicLinkEmailSender = createMagicLinkEmailSender(
  async (options) => {
    await sendEmail(options);
  },
  env.MAGIC_LINK_FROM_EMAIL ?? "noreply@yourdomain.com",
);
```

## Usage

### Client-Side

Use the auth client to send a magic link:

```typescript
import { authClient } from "~/auth/client";

// Send magic link
await authClient.signIn.magicLink({
  email: "user@example.com",
  callbackURL: "/", // Where to redirect after signing in
});
```

### Demo Component

A complete demo component is available in `apps/nextjs/src/components/magic-link-demo.tsx`:

- Email input field with validation
- Loading states
- Success confirmation
- Error handling with toast notifications

## Security

### Token Security

- **Cryptographically secure**: Tokens are generated using Better Auth's secure random generation
- **Short-lived**: Tokens expire after 5 minutes to minimize the attack window
- **Single-use**: Tokens are invalidated after use to prevent replay attacks
- **Stored securely**: Tokens are hashed in the database

### Email Validation

- Client-side validation ensures proper email format
- Server-side validation handled by Better Auth
- No user enumeration: Always shows success message even if email doesn't exist

### Environment Security

- Email API keys stored in environment variables
- Validated using Zod schemas in `@t3-oss/env-nextjs`
- No sensitive data in client-side code

## Customization

### Email Template

To customize the email template, edit `packages/auth/src/magic-link-email.ts`:

```typescript
function generateMagicLinkEmailHtml(magicLink: string): string {
  // Customize HTML template here
  return `...`;
}
```

### Link Expiration

Magic links expire after 5 minutes by default. This is configured in Better Auth's internal settings and follows security best practices.

### UI Components

The demo component in `apps/nextjs/src/components/magic-link-demo.tsx` can be customized:

- Styling with Tailwind CSS classes
- Icons from `react-icons`
- Toast notifications from `@acme/ui/toast`

## Testing

To test the Magic Link flow:

1. Start the development server:
   ```bash
   pnpm dev:next
   ```

2. Navigate to the home page
3. Enter your email address in the Magic Link Demo component
4. Click "Send Magic Link"
5. Check your email for the magic link
6. Click the link to sign in

## Troubleshooting

### Emails Not Sending

1. Verify `RESEND_API_KEY` is set correctly
2. Check that the sender email domain is verified in Resend
3. Review server logs for error messages

### Links Not Working

1. Ensure the base URL is configured correctly in `auth/server.ts`
2. Check that the database migration has been applied
3. Verify the link hasn't expired (5-minute window)

### TypeScript Errors

Run typecheck to identify issues:

```bash
pnpm typecheck
```

## API Reference

### `authClient.signIn.magicLink(options)`

Send a magic link to the specified email address.

**Parameters:**
- `email` (string): The email address to send the magic link to
- `callbackURL` (string, optional): URL to redirect to after successful sign-in

**Returns:** Promise<void>

**Throws:** Error if email sending fails

### `createMagicLinkEmailSender(sendEmail, fromEmail)`

Factory function to create a magic link email sender.

**Parameters:**
- `sendEmail` (function): Function to send emails
- `fromEmail` (string, default: "noreply@yourdomain.com"): Sender email address

**Returns:** Function that sends magic link emails

## Best Practices

1. **Use a verified domain**: Ensure your sender email domain is verified with Resend
2. **Customize the template**: Update the email template to match your brand
3. **Test thoroughly**: Test the flow in development before deploying
4. **Monitor emails**: Set up email delivery monitoring in Resend
5. **Handle errors gracefully**: Always show user-friendly error messages
6. **Rate limiting**: Consider implementing rate limiting to prevent abuse

## Future Enhancements

Potential improvements for the Magic Link feature:

- [ ] Configurable link expiration time
- [ ] Email throttling/rate limiting
- [ ] Internationalization of email templates
- [ ] Analytics tracking for magic link usage
- [ ] Remember device functionality
- [ ] Email verification before sending magic links

## References

- [Better Auth Documentation](https://www.better-auth.com)
- [Better Auth Magic Link Plugin](https://www.better-auth.com/docs/plugins/magic-link)
- [Resend API Documentation](https://resend.com/docs)
