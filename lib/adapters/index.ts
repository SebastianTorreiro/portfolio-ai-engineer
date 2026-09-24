import type { ProjectsRepository } from "@/lib/domain/projects-repository";
import { JsonProjectsAdapter } from "./json-projects-adapter";

// Composition root for project data. The rest of the app depends on this function and the
// ProjectsRepository port, never on a concrete adapter. Swapping to a CMS is a change here only.
const projectsRepository: ProjectsRepository = new JsonProjectsAdapter();

export function getProjectsRepository(): ProjectsRepository {
  return projectsRepository;
}
