import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {/* config options here */};

export default withSentryConfig(nextConfig, {
  org: "portfolio-ai-engineer",
  project: "portfolio-ai-engineer",
  // Read from the environment so the token never lands in the repo.
  // Without it (e.g. in CI) source map upload is skipped and the build still passes.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  // Proxy browser events through the app so ad-blockers don't drop them.
  tunnelRoute: "/monitoring",
});
