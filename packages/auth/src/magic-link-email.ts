/**
 * Email template and sender for Magic Link authentication
 */

interface SendMagicLinkEmailOptions {
  to: string;
  magicLink: string;
  token: string;
}

/**
 * Generates HTML content for the Magic Link email
 */
function generateMagicLinkEmailHtml(magicLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign in to your account</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Sign in to your account</h1>
        </div>
        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; margin-bottom: 30px;">Click the button below to sign in to your account. This link will expire in 5 minutes.</p>
          <div style="text-align: center; margin: 40px 0;">
            <a href="${magicLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 40px; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">Sign In</a>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="font-size: 12px; color: #999; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 5px;">${magicLink}</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">If you didn't request this email, you can safely ignore it.</p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generates plain text content for the Magic Link email
 */
function generateMagicLinkEmailText(magicLink: string): string {
  return `
Sign in to your account

Click the link below to sign in to your account. This link will expire in 5 minutes.

${magicLink}

If you didn't request this email, you can safely ignore it.
  `.trim();
}

/**
 * Creates a function to send Magic Link emails using the provided email sender
 */
export function createMagicLinkEmailSender(
  sendEmail: (options: {
    to: string;
    subject: string;
    html: string;
    text: string;
    from: string;
  }) => Promise<void> | void,
  fromEmail: string = "noreply@yourdomain.com",
) {
  return async ({ to, magicLink }: SendMagicLinkEmailOptions) => {
    const html = generateMagicLinkEmailHtml(magicLink);
    const text = generateMagicLinkEmailText(magicLink);

    await sendEmail({
      to,
      subject: "Sign in to your account",
      html,
      text,
      from: fromEmail,
    });
  };
}
