"use client";

import { useState } from "react";

// TEMPORARY (Fase 1): one trigger per runtime so both sides are verified in Sentry.
export function ErrorTriggers({ token }: { token: string }) {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [serverStatus, setServerStatus] = useState<string | null>(null);

  if (shouldThrow) {
    throw new Error("Sentry debug: intentional client render error from /debug-sentry");
  }

  async function triggerServerError() {
    const res = await fetch(`/api/debug-sentry?token=${encodeURIComponent(token)}`);
    setServerStatus(`El servidor respondió ${res.status}.`);
  }

  return (
    <main className="max-w-[720px] px-6 pt-16 sm:px-12 lg:pl-24">
      <p>Ruta temporal para verificar Sentry.</p>
      <div className="mt-6 flex flex-col items-start gap-3">
        <button
          type="button"
          className="border border-slate px-3 py-1"
          onClick={() => setShouldThrow(true)}
        >
          Disparar error de cliente
        </button>
        <button
          type="button"
          className="border border-slate px-3 py-1"
          onClick={triggerServerError}
        >
          Disparar error de servidor
        </button>
      </div>
      {serverStatus && <p className="mt-4 text-slate">{serverStatus}</p>}
    </main>
  );
}
