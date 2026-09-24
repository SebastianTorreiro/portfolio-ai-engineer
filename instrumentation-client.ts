// Sentry config for the browser. Loaded by Next.js before the app hydrates.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Sample every trace while traffic is low; lower this once it grows.
  tracesSampleRate: 1.0,
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
