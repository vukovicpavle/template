import type { BetterAuthOptions } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oAuthProxy, phoneNumber } from "better-auth/plugins";

import { db } from "@acme/db/client";

export { sendPhoneOTP } from "./phone";

export function initAuth(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;
  sendOTP?: (data: { phoneNumber: string; code: string }) => Promise<void>;
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
    ],
    trustedOrigins: ["expo://"],
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
