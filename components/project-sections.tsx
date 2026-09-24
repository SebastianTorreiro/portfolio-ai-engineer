import type { FindingStatus, Project } from "@/lib/domain/project";

// Server-rendered content for each tab of the project detail. Tabs only toggle visibility,
// so all of this ships in the initial HTML.

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-xl text-ink">{children}</h3>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-slate">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function SummarySection({ project }: { project: Project }) {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeading>Problema</SectionHeading>
        <p className="mt-2">{project.problem}</p>
      </section>
      <section>
        <SectionHeading>Rol</SectionHeading>
        <p className="mt-2">{project.role}</p>
      </section>
      <section>
        <SectionHeading>Stack</SectionHeading>
        <ul aria-label="Stack" className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {project.stack.map((tech) => (
            <li key={tech} className="font-mono text-sm text-slate">
              {tech}
            </li>
          ))}
        </ul>
      </section>
      {(project.links.repo || project.links.demo) && (
        <section>
          <SectionHeading>Links</SectionHeading>
          <ul className="mt-2 space-y-1">
            {project.links.repo && (
              <li>
                <a href={project.links.repo}>Repositorio en GitHub</a>
              </li>
            )}
            {project.links.demo && (
              <li>
                <a href={project.links.demo}>Demo</a>
              </li>
            )}
          </ul>
        </section>
      )}
    </div>
  );
}

export function ArchitectureSection({ project }: { project: Project }) {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeading>Arquitectura</SectionHeading>
        <BulletList items={project.architecture} />
      </section>
      <section>
        <SectionHeading>Decisiones de diseño</SectionHeading>
        <BulletList items={project.decisions} />
      </section>
    </div>
  );
}

// The only place in the site where the signal-* colors appear, per the visual brief.
const STATUS_LABEL: Record<FindingStatus, string> = { open: "Abierto", resolved: "Resuelto" };
const STATUS_COLOR: Record<FindingStatus, string> = {
  open: "text-signal-flag",
  resolved: "text-signal-ok",
};

export function SecuritySection({ project }: { project: Project }) {
  if (project.securityFindings.length === 0) {
    return <p className="text-slate">No hay hallazgos de seguridad documentados para este caso.</p>;
  }

  return (
    // No top border: the tab list's rule already sits right above the first finding.
    <ul>
      {project.securityFindings.map((finding) => (
        <li key={finding.title} className="border-b border-slate py-5 first:pt-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <SectionHeading>{finding.title}</SectionHeading>
            <span className={`font-mono text-sm ${STATUS_COLOR[finding.status]}`}>
              {STATUS_LABEL[finding.status]}
            </span>
          </div>
          <p className="mt-2">{finding.description}</p>
        </li>
      ))}
    </ul>
  );
}
