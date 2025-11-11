import type { CreateEmailOptions } from "resend";
import { Resend } from "resend";

/**
 * Email sending service using Resend
 *
 * This service provides utilities for sending transactional emails.
 * The Resend API key should be configured via the RESEND_API_KEY environment variable.
 */

/**
 * Initialize Resend client
 * Throws an error if RESEND_API_KEY is not configured
 */
function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY environment variable is not set. Please configure it in your .env file.",
    );
  }

  return new Resend(apiKey);
}

/**
 * Options for sending an email
 */
export interface SendEmailOptions {
  /** Recipient email address */
  to: string | string[];
  /** Email subject */
  subject: string;
  /** Email body (HTML) */
  html?: string;
  /** Email body (plain text) */
  text?: string;
  /** Sender email address (must be verified in Resend) */
  from?: string;
  /** Reply-to email address */
  replyTo?: string | string[];
  /** CC recipients */
  cc?: string | string[];
  /** BCC recipients */
  bcc?: string | string[];
}

/**
 * Result of sending an email
 */
export interface SendEmailResult {
  /** Whether the email was sent successfully */
  success: boolean;
  /** Message ID from Resend (if successful) */
  id?: string;
  /** Error message (if failed) */
  error?: string;
}

/**
 * Send an email using Resend
 *
 * @param options - Email sending options
 * @returns Promise resolving to the send result
 *
 * @example
 * ```ts
 * const result = await sendEmail({
 *   to: "user@example.com",
 *   subject: "Welcome!",
 *   html: "<h1>Welcome to our service</h1>",
 *   from: "noreply@example.com"
 * });
 *
 * if (result.success) {
 *   console.log("Email sent:", result.id);
 * } else {
 *   console.error("Failed to send email:", result.error);
 * }
 * ```
 */
export async function sendEmail(
  options: SendEmailOptions,
): Promise<SendEmailResult> {
  try {
    const resend = getResendClient();

    // Default from address (should be configured per your Resend domain)
    const from = options.from ?? "onboarding@resend.dev";

    // Resend requires at least html or text
    if (!options.html && !options.text) {
      return {
        success: false,
        error: "Either html or text content must be provided",
      };
    }

    // Build email payload - TypeScript requires at least html or text (checked above)
    const emailPayload = {
      from,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      ...(options.html && { html: options.html }),
      ...(options.text && { text: options.text }),
      ...(options.replyTo && {
        replyTo: Array.isArray(options.replyTo)
          ? options.replyTo
          : [options.replyTo],
      }),
      ...(options.cc && {
        cc: Array.isArray(options.cc) ? options.cc : [options.cc],
      }),
      ...(options.bcc && {
        bcc: Array.isArray(options.bcc) ? options.bcc : [options.bcc],
      }),
    } as CreateEmailOptions;

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("[Email] Failed to send email:", error);
      return {
        success: false,
        error: error.message ?? "Unknown error occurred",
      };
    }

    if (!data?.id) {
      console.error("[Email] No message ID returned from Resend");
      return {
        success: false,
        error: "No message ID returned from Resend",
      };
    }

    console.log("[Email] Email sent successfully:", {
      id: data.id,
      to: options.to,
      subject: options.subject,
    });

    return {
      success: true,
      id: data.id,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error(
      "[Email] Exception while sending email:",
      errorMessage,
      error,
    );
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Send a simple text email
 * Convenience function for sending plain text emails
 *
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param text - Plain text email body
 * @param from - Optional sender email address
 * @returns Promise resolving to the send result
 */
export async function sendTextEmail(
  to: string,
  subject: string,
  text: string,
  from?: string,
): Promise<SendEmailResult> {
  return sendEmail({
    to,
    subject,
    text,
    from,
  });
}

/**
 * Send an HTML email
 * Convenience function for sending HTML emails
 *
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - HTML email body
 * @param from - Optional sender email address
 * @returns Promise resolving to the send result
 */
export async function sendHtmlEmail(
  to: string,
  subject: string,
  html: string,
  from?: string,
): Promise<SendEmailResult> {
  return sendEmail({
    to,
    subject,
    html,
    from,
  });
}
