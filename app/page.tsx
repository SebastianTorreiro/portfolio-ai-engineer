// TODO: replace EMAIL and LINKEDIN_URL with the real contact details before
// production. GITHUB_URL matches the repo owner.
const EMAIL = "tu-email@ejemplo.com";
const GITHUB_URL = "https://github.com/SebastianTorreiro";
const LINKEDIN_URL = "https://www.linkedin.com/in/tu-perfil";

const contacts = [
  { label: "Email", href: `mailto:${EMAIL}`, text: EMAIL },
  {
    label: "GitHub",
    href: GITHUB_URL,
    text: GITHUB_URL.replace("https://", ""),
  },
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    text: LINKEDIN_URL.replace("https://www.", ""),
  },
];

export default function Home() {
  return (
    <main className="max-w-[720px] px-6 pt-16 pb-24 sm:px-12 sm:pt-24 lg:pl-24">
      <p className="text-sm text-slate">
        Ituzaingó, Buenos Aires, Argentina. Disponible para roles junior en Applied AI Engineering.
      </p>

      <h1 className="mt-10 font-display text-4xl leading-[1.1] font-normal tracking-[-0.015em] text-balance text-ink sm:text-5xl">
        Applied AI Engineer.{" "}
        <span className="text-slate">Auditoría de seguridad en sistemas RAG y LLM.</span>
      </h1>

      <hr className="mt-12 border-0 border-t border-slate" />

      <p className="mt-10 max-w-[65ch] text-lg">
        Trabajo en la capa donde los modelos de lenguaje se conectan con datos y sistemas reales.
        Construyo backends con NestJS y Python, interfaces con Next.js, y reviso pipelines de
        recuperación aumentada buscando fugas de datos, inyección de prompts y permisos mal
        delimitados.
      </p>

      <section aria-labelledby="casos" className="mt-20">
        <h2 id="casos" className="font-display text-2xl text-ink">
          Casos de estudio
        </h2>
        <p className="mt-3 max-w-[65ch] text-slate">
          Próximamente. Cada caso se va a publicar como un informe: alcance, hallazgos y estado de
          cada corrección.
        </p>
      </section>

      <section aria-labelledby="contacto" className="mt-20">
        <h2 id="contacto" className="font-display text-2xl text-ink">
          Contacto
        </h2>
        <dl className="mt-5 border-t border-slate">
          {contacts.map(({ label, href, text }) => (
            <div key={label} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-slate py-3">
              <dt className="text-slate">{label}</dt>
              <dd className="min-w-0 break-words">
                <a href={href}>{text}</a>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
