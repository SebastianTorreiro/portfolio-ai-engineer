"use client";

import { useState } from "react";

// TEMPORARY: verifies that errors reach Sentry. Remove before merging.
export default function DebugSentryPage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Sentry debug: intentional render error from /debug-sentry");
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "var(--font-plex-mono)" }}>
      <p>Ruta temporal para verificar Sentry.</p>
      <button type="button" onClick={() => setShouldThrow(true)}>
        Disparar error
      </button>
    </main>
  );
}
