import type { Project } from "@/lib/domain/project";

// Rows separated by 1px slate rules instead of cards, per the visual brief.
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="mt-6 border-t border-slate">
      {projects.map((project) => (
        <li key={project.slug} className="border-b border-slate py-6">
          <h3 className="font-display text-xl text-ink">{project.title}</h3>
          <p className="mt-2 max-w-[65ch]">{project.summary}</p>
          <ul aria-label="Stack" className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            {project.stack.map((tech) => (
              <li key={tech} className="font-mono text-sm text-slate">
                {tech}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
