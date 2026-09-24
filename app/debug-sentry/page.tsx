import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ErrorTriggers } from "./error-triggers";
import { isValidDebugToken } from "./token";

// TEMPORARY (Fase 1): verifies that client and server errors reach Sentry. Remove before closing the phase.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DebugSentryPage({ searchParams }: PageProps<"/debug-sentry">) {
  const { token } = await searchParams;
  const value = typeof token === "string" ? token : undefined;

  if (!isValidDebugToken(value)) notFound();

  return <ErrorTriggers token={value!} />;
}
