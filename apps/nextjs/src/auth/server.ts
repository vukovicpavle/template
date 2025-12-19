import "server-only";

import { headers } from "next/headers";

import { initAuth, sendPhoneOTP } from "@acme/auth";
import { createMagicLinkEmailSender } from "@acme/auth/magic-link-email";
import { sendEmail } from "@acme/email";

import { env } from "~/env";

const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3000";

// Create the Magic Link email sender
const magicLinkEmailSender = createMagicLinkEmailSender(async (options) => {
  await sendEmail(options);
}, env.MAGIC_LINK_FROM_EMAIL ?? "noreply@yourdomain.com");

export const auth = initAuth({
  baseUrl,
  productionUrl: `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? "turbo.t3.gg"}`,
  secret: env.AUTH_SECRET,
  googleClientId: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  emailFrom: env.EMAIL_FROM,
  sendOTP: async ({ phoneNumber, code }) => {
    await sendPhoneOTP(phoneNumber, code, {
      twilioAccountSid: env.TWILIO_ACCOUNT_SID,
      twilioAuthToken: env.TWILIO_AUTH_TOKEN,
      twilioPhoneNumber: env.TWILIO_PHONE_NUMBER,
    });
  },
  sendMagicLink: async (data) => {
    await magicLinkEmailSender({
      to: data.email,
      magicLink: data.url,
      token: data.token,
    });
  },
  apple:
    env.AUTH_APPLE_CLIENT_ID && env.AUTH_APPLE_CLIENT_SECRET
      ? {
          clientId: env.AUTH_APPLE_CLIENT_ID,
          clientSecret: env.AUTH_APPLE_CLIENT_SECRET,
        }
      : undefined,
});

export const getSession = async () =>
  auth.api.getSession({ headers: await headers() });
