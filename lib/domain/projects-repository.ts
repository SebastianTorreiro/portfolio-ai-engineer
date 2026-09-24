import type { Project } from "./project";

// Port: the only way the UI reads projects. Adapters (JSON today, a headless CMS later) implement it.
export interface ProjectsRepository {
  // Sorted by `order`, ascending.
  getAll(): Promise<Project[]>;
  getBySlug(slug: string): Promise<Project | null>;
}
