import type { BetterAuthOptions } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  emailOTP,
  magicLink,
  oAuthProxy,
  phoneNumber,
  username,
} from "better-auth/plugins";

import { db } from "@acme/db/client";
import { sendEmail } from "@acme/email";

export { sendPhoneOTP } from "./phone";

export function initAuth(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;
  emailFrom?: string;
  sendOTP?: (data: { phoneNumber: string; code: string }) => Promise<void>;
  sendMagicLink?: (data: {
    email: string;
    url: string;
    token: string;
  }) => Promise<void> | void;
  apple?: {
    clientId: string;
    clientSecret: string;
  };
}) {
  const config = {
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    baseURL: options.baseUrl,
    secret: options.secret,
    socialProviders: {
      apple: options.apple
        ? {
            clientId: options.apple.clientId,
            clientSecret: options.apple.clientSecret,
          }
        : undefined,
    },
    plugins: [
      username(),
      oAuthProxy({
        /**
         * Auto-inference blocked by https://github.com/better-auth/better-auth/pull/2891
         */
        currentURL: options.baseUrl,
        productionURL: options.productionUrl,
      }),
      expo(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          const fromEmail = options.emailFrom ?? "noreply@example.com";

          // Generate appropriate email subject and body based on type
          const subjects = {
            "sign-in": "Your Sign-In Code",
            "email-verification": "Verify Your Email",
            "forget-password": "Reset Your Password",
          };

          const messages = {
            "sign-in": `Your one-time password is: <strong>${otp}</strong>. This code will expire in 5 minutes.`,
            "email-verification": `Please use the following code to verify your email: <strong>${otp}</strong>. This code will expire in 5 minutes.`,
            "forget-password": `Your password reset code is: <strong>${otp}</strong>. This code will expire in 5 minutes.`,
          };

          const result = await sendEmail({
            to: email,
            from: fromEmail,
            subject: subjects[type],
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>${subjects[type]}</h2>
                <p>${messages[type]}</p>
                <p style="font-size: 24px; font-weight: bold; color: #333; letter-spacing: 2px; padding: 10px; background: #f5f5f5; text-align: center;">
                  ${otp}
                </p>
                <p style="color: #666; font-size: 14px;">
                  If you didn't request this code, you can safely ignore this email.
                </p>
              </div>
            `,
            text: `${subjects[type]}\n\nYour code: ${otp}\n\n${messages[type]}\n\nIf you didn't request this code, you can safely ignore this email.`,
          });

          if (!result.success) {
            throw new Error(`Failed to send OTP email: ${result.error}`);
          }
        },
        otpLength: 6,
        expiresIn: 300, // 5 minutes
        sendVerificationOnSignUp: false,
        disableSignUp: false,
      }),
      phoneNumber({
        /**
         * Send OTP code to the user's phone number
         * In development, logs to console. In production, should use SMS provider (e.g., Twilio)
         */
        sendOTP:
          options.sendOTP ??
          (({ phoneNumber, code }) => {
            console.log(`[Phone Auth] Sending OTP to ${phoneNumber}: ${code}`);
            // In production, integrate with SMS provider like Twilio
            // Example: await twilioClient.messages.create({ to: phoneNumber, from: TWILIO_PHONE, body: `Your verification code is: ${code}` });
          }),
        /**
         * OTP expires after 5 minutes (300 seconds)
         */
        expiresIn: 300,
        /**
         * 6-digit OTP code
         */
        otpLength: 6,
      }),
      magicLink({
        sendMagicLink:
          options.sendMagicLink ??
          (() => {
            console.warn("Magic Link email sender not configured");
          }),
      }),
    ],
    trustedOrigins: ["expo://"],
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
