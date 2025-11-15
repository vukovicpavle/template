import type { BetterAuthOptions } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, oAuthProxy } from "better-auth/plugins";

import { db } from "@acme/db/client";
import { sendEmail } from "@acme/email";

export function initAuth(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;
  emailFrom?: string;
}) {
  const config = {
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    baseURL: options.baseUrl,
    secret: options.secret,
    plugins: [
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
    ],
    trustedOrigins: ["expo://"],
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
