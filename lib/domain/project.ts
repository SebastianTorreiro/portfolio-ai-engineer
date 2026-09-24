// Domain model for a portfolio case study. Pure types: no framework or data-source imports.

export type FindingStatus = "open" | "resolved";

export type SecurityFinding = {
  title: string;
  description: string;
  // Drives the signal-flag (open) / signal-ok (resolved) colors in the case detail (Fase 3).
  status: FindingStatus;
};

export type ProjectLinks = {
  repo?: string;
  demo?: string;
};

export type ProjectVideos = {
  technicalUrl?: string;
  businessUrl?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  architecture: string[];
  decisions: string[];
  // Security is one section of a case, not its headline; empty when there is nothing to report.
  securityFindings: SecurityFinding[];
  links: ProjectLinks;
  videos: ProjectVideos;
  featured: boolean;
  order: number;
};
