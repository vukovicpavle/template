import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { sendEmail } from "../email";
import { publicProcedure } from "../trpc";

/**
 * Email router for sending transactional emails via Resend
 */
export const emailRouter = {
  /**
   * Send a test email
   * This endpoint allows testing the email sending functionality
   */
  sendTest: publicProcedure
    .input(
      z.object({
        to: z.string().email("Invalid email address"),
        subject: z.string().min(1, "Subject is required"),
        html: z.string().optional(),
        text: z.string().optional(),
        from: z.string().email("Invalid from email address").optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await sendEmail({
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
        from: input.from,
      });

      if (!result.success) {
        throw new Error(result.error ?? "Failed to send email");
      }

      return {
        success: true,
        id: result.id,
        message: "Email sent successfully",
      };
    }),

  /**
   * Send a simple text email
   */
  sendText: publicProcedure
    .input(
      z.object({
        to: z.string().email("Invalid email address"),
        subject: z.string().min(1, "Subject is required"),
        text: z.string().min(1, "Text content is required"),
        from: z.string().email("Invalid from email address").optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await sendEmail({
        to: input.to,
        subject: input.subject,
        text: input.text,
        from: input.from,
      });

      if (!result.success) {
        throw new Error(result.error ?? "Failed to send email");
      }

      return {
        success: true,
        id: result.id,
        message: "Email sent successfully",
      };
    }),

  /**
   * Send an HTML email
   */
  sendHtml: publicProcedure
    .input(
      z.object({
        to: z.string().email("Invalid email address"),
        subject: z.string().min(1, "Subject is required"),
        html: z.string().min(1, "HTML content is required"),
        from: z.string().email("Invalid from email address").optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await sendEmail({
        to: input.to,
        subject: input.subject,
        html: input.html,
        from: input.from,
      });

      if (!result.success) {
        throw new Error(result.error ?? "Failed to send email");
      }

      return {
        success: true,
        id: result.id,
        message: "Email sent successfully",
      };
    }),
} satisfies TRPCRouterRecord;
