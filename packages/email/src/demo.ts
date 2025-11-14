import type { SendEmailResult } from "./send-email";
import { sendEmail } from "./send-email";

/**
 * Demo function to test email sending via Resend
 *
 * This function demonstrates the basic usage of the email service.
 * It sends a test email to the specified recipient.
 *
 * @param to - Email address to send the test email to
 * @param from - Sender email address (must be from a verified domain in Resend)
 * @returns Result of the email sending operation
 *
 * @example
 * ```typescript
 * // Send a test email
 * const result = await sendTestEmail(
 *   "recipient@example.com",
 *   "noreply@yourdomain.com"
 * );
 *
 * if (result.success) {
 *   console.log("Test email sent successfully!");
 * }
 * ```
 */
export async function sendTestEmail(
  to: string,
  from: string,
): Promise<SendEmailResult> {
  return sendEmail({
    to,
    from,
    subject: "Test Email from Resend",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Test Email</h1>
        <p style="color: #666; line-height: 1.6;">
          This is a test email sent using the Resend email service.
          If you're seeing this, the email integration is working correctly!
        </p>
        <p style="color: #666; line-height: 1.6;">
          This email was sent at: <strong>${new Date().toISOString()}</strong>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">
          This is an automated test email. Please do not reply to this message.
        </p>
      </div>
    `,
    text: `Test Email

This is a test email sent using the Resend email service.
If you're seeing this, the email integration is working correctly!

This email was sent at: ${new Date().toISOString()}

---
This is an automated test email. Please do not reply to this message.`,
  });
}

/**
 * Example: Authentication email (e.g., Magic Link)
 *
 * @param to - User's email address
 * @param from - Sender email address
 * @param magicLink - Magic link URL for authentication
 * @returns Result of the email sending operation
 *
 * @example
 * ```typescript
 * const result = await sendMagicLinkEmail(
 *   "user@example.com",
 *   "noreply@yourdomain.com",
 *   "https://yourdomain.com/auth/verify?token=abc123"
 * );
 * ```
 */
export async function sendMagicLinkEmail(
  to: string,
  from: string,
  magicLink: string,
): Promise<SendEmailResult> {
  return sendEmail({
    to,
    from,
    subject: "Sign in to Your Account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Sign in to Your Account</h1>
        <p style="color: #666; line-height: 1.6;">
          Click the button below to sign in to your account. This link will expire in 15 minutes.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${magicLink}" 
             style="background-color: #007bff; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Sign In
          </a>
        </div>
        <p style="color: #666; line-height: 1.6; font-size: 14px;">
          Or copy and paste this link into your browser:<br/>
          <a href="${magicLink}" style="color: #007bff;">${magicLink}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">
          If you didn't request this email, you can safely ignore it.
        </p>
      </div>
    `,
    text: `Sign in to Your Account

Click the link below to sign in to your account. This link will expire in 15 minutes.

${magicLink}

If you didn't request this email, you can safely ignore it.`,
  });
}

/**
 * Example: Notification email
 *
 * @param to - User's email address
 * @param from - Sender email address
 * @param title - Notification title
 * @param message - Notification message
 * @returns Result of the email sending operation
 *
 * @example
 * ```typescript
 * const result = await sendNotificationEmail(
 *   "user@example.com",
 *   "noreply@yourdomain.com",
 *   "New Message Received",
 *   "You have received a new message from John Doe."
 * );
 * ```
 */
export async function sendNotificationEmail(
  to: string,
  from: string,
  title: string,
  message: string,
): Promise<SendEmailResult> {
  return sendEmail({
    to,
    from,
    subject: title,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">${title}</h1>
        <p style="color: #666; line-height: 1.6;">
          ${message}
        </p>
        <p style="color: #666; line-height: 1.6; font-size: 14px; margin-top: 30px;">
          Received at: ${new Date().toLocaleString()}
        </p>
      </div>
    `,
    text: `${title}

${message}

Received at: ${new Date().toLocaleString()}`,
  });
}
