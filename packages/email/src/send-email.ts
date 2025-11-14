import { Resend } from "resend";

import { env } from "../env";

/**
 * Resend client instance configured with API key from environment variables
 */
export const resend = new Resend(env.RESEND_API_KEY);

/**
 * Options for sending an email
 */
export interface SendEmailOptions {
  /** Email address to send to */
  to: string | string[];
  /** Email subject line */
  subject: string;
  /** Email body in HTML format */
  html: string;
  /** Optional email body in plain text format */
  text?: string;
  /** Sender email address (must be from verified domain) */
  from: string;
  /** Optional reply-to email address */
  replyTo?: string;
  /** Optional CC recipients */
  cc?: string | string[];
  /** Optional BCC recipients */
  bcc?: string | string[];
}

/**
 * Result of sending an email
 */
export interface SendEmailResult {
  /** Whether the email was sent successfully */
  success: boolean;
  /** Email ID from Resend if successful */
  id?: string;
  /** Error message if failed */
  error?: string;
}

/**
 * Sends an email using Resend
 *
 * @param options - Email sending options
 * @returns Result of the email sending operation
 *
 * @example
 * ```typescript
 * const result = await sendEmail({
 *   to: "user@example.com",
 *   subject: "Welcome!",
 *   html: "<h1>Welcome to our platform</h1>",
 *   from: "noreply@yourdomain.com"
 * });
 *
 * if (result.success) {
 *   console.log("Email sent with ID:", result.id);
 * } else {
 *   console.error("Failed to send email:", result.error);
 * }
 * ```
 */
export async function sendEmail(
  options: SendEmailOptions,
): Promise<SendEmailResult> {
  try {
    const { data, error } = await resend.emails.send({
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      from: options.from,
      replyTo: options.replyTo,
      cc: options.cc,
      bcc: options.bcc,
    });

    if (error) {
      console.error("Resend API error:", error);
      return {
        success: false,
        error: error.message || "Failed to send email",
      };
    }

    console.log("Email sent successfully:", data.id);
    return {
      success: true,
      id: data.id,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Failed to send email:", message);
    return {
      success: false,
      error: message,
    };
  }
}
