import rawProjects from "@/data/projects.json";
import type { FindingStatus, Project } from "@/lib/domain/project";
import type { ProjectsRepository } from "@/lib/domain/projects-repository";

type RawProject = (typeof rawProjects)[number];

const FINDING_STATUSES: readonly FindingStatus[] = ["open", "resolved"];

// JSON infers `status` as a plain string, so it is narrowed here instead of cast. A typo in
// projects.json fails the build with a clear message rather than rendering a wrong color.
function toFindingStatus(value: string, slug: string): FindingStatus {
  if ((FINDING_STATUSES as readonly string[]).includes(value)) return value as FindingStatus;
  throw new Error(`projects.json: invalid finding status "${value}" in project "${slug}"`);
}

function toProject(raw: RawProject): Project {
  return {
    ...raw,
    securityFindings: raw.securityFindings.map((finding) => ({
      ...finding,
      status: toFindingStatus(finding.status, raw.slug),
    })),
  };
}

export class JsonProjectsAdapter implements ProjectsRepository {
  private readonly projects: Project[];

  constructor(source: RawProject[] = rawProjects) {
    this.projects = source.map(toProject).sort((a, b) => a.order - b.order);
  }

  async getAll(): Promise<Project[]> {
    return this.projects;
  }

  async getBySlug(slug: string): Promise<Project | null> {
    return this.projects.find((project) => project.slug === slug) ?? null;
  }
}
