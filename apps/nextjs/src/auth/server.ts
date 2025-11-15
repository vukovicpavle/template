import "server-only";

import { headers } from "next/headers";

import { initAuth } from "@acme/auth";

import { env } from "~/env";

const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3000";

export const auth = initAuth({
  baseUrl,
  productionUrl: `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? "turbo.t3.gg"}`,
  secret: env.AUTH_SECRET,
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
