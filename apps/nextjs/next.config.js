import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./src/env");

/**
 * Internationalization (i18n) Configuration
 *
 * Supported locales: en (English), es (Spanish)
 * Default locale: en
 *
 * Locale routing is handled by middleware (src/middleware.ts) in App Router.
 * The app structure uses [locale] dynamic segments for locale-based routing.
 * Translation files are located in /locales directory.
 *
 * Note: For App Router, i18n routing is handled via middleware and folder structure,
 * not through the i18n config object (which is for Pages Router).
 */

/** @type {import("next").NextConfig} */
const config = {
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@acme/api",
    "@acme/auth",
    "@acme/db",
    "@acme/ui",
    "@acme/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
