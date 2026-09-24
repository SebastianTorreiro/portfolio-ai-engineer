import { timingSafeEqual } from "node:crypto";

// TEMPORARY (Fase 1): gate for the Sentry debug routes. Remove with them.
// SENTRY_DEBUG_TOKEN is server-only (no NEXT_PUBLIC_ prefix), so it never reaches the browser
// bundle. When it is unset the routes behave as if they did not exist.
export function isValidDebugToken(token: string | null | undefined): boolean {
  const expected = process.env.SENTRY_DEBUG_TOKEN;
  if (!expected || !token) return false;

  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
