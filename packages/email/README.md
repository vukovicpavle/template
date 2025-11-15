# @acme/email

Email sending package using [Resend](https://resend.com/) for transactional and system emails.

## Features

- 📧 Simple and type-safe email sending
- 🔒 Secure API key management via environment variables
- ✅ Error handling and logging
- 🎨 HTML and plain text email support

## Installation

This package is already set up as part of the monorepo. To use it in another package:

```json
{
  "dependencies": {
    "@acme/email": "workspace:*"
  }
}
```

## Environment Variables

Add the following to your `.env` file:

```bash
RESEND_API_KEY="re_xxxxxxxxxxxxx"
```

Get your API key from [Resend Dashboard](https://resend.com/api-keys).

## Usage

### Basic Email

```typescript
import { sendEmail } from "@acme/email";

const result = await sendEmail({
  to: "user@example.com",
  from: "noreply@yourdomain.com",
  subject: "Welcome!",
  html: "<h1>Welcome to our platform</h1>",
  text: "Welcome to our platform", // optional
});

if (result.success) {
  console.log("Email sent:", result.id);
} else {
  console.error("Failed:", result.error);
}
```

### Advanced Options

The `sendEmail` function supports additional options:

```typescript
await sendEmail({
  to: ["user1@example.com", "user2@example.com"], // Multiple recipients
  from: "noreply@yourdomain.com",
  subject: "Team Update",
  html: "<p>Update content</p>",
  text: "Update content",
  replyTo: "support@yourdomain.com", // Optional
  cc: "manager@yourdomain.com", // Optional
  bcc: "archive@yourdomain.com", // Optional
});
```

## Important Notes

### Verified Domains

The `from` email address must use a domain that's verified in your Resend account. See [Resend Domains](https://resend.com/docs/dashboard/domains/introduction) for setup instructions.

### Error Handling

Always check the `success` field in the result:

```typescript
const result = await sendEmail({ ... });

if (result.success) {
  // Email was sent successfully
  console.log("Email ID:", result.id);
} else {
  // Handle the error
  console.error("Error:", result.error);
}
```

### Logging

The package logs email operations to the console:

- ✅ Success: `"Email sent successfully: <email_id>"`
- ❌ Errors: `"Resend API error:"` or `"Failed to send email:"`

## Integration Examples

### In tRPC Router

```typescript
// packages/api/src/router/email.ts
import { z } from "zod/v4";

import { sendEmail } from "@acme/email";

import { protectedProcedure } from "../trpc";

export const emailRouter = {
  sendNotification: protectedProcedure
    .input(
      z.object({
        to: z.string().email(),
        subject: z.string(),
        html: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await sendEmail({
        to: input.to,
        from: "noreply@yourdomain.com",
        subject: input.subject,
        html: input.html,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      return { emailId: result.id };
    }),
};
```

### In Better Auth

```typescript
// packages/auth/src/index.ts
import { sendEmail } from "@acme/email";

// Configure Better Auth with email sender
export const auth = betterAuth({
  // ... other config
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        from: "noreply@yourdomain.com",
        subject: "Reset Your Password",
        html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
      });
    },
  },
});
```

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference/introduction)
- [Email Best Practices](https://resend.com/docs/knowledge-base/best-practices)

## License

MIT
