import { isValidDebugToken } from "../../debug-sentry/token";

// TEMPORARY (Fase 1): throws on the server so Sentry's onRequestError hook reports it.
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!isValidDebugToken(token)) {
    return new Response("Not Found", { status: 404 });
  }

  throw new Error("Sentry debug: intentional server error from /api/debug-sentry");
}
