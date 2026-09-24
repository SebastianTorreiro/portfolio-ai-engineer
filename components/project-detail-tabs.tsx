"use client";

import type { ReactNode } from "react";
import { ProjectTabs } from "./project-tabs";

// Server Components cannot dot into a client module (ProjectTabs.List), so the composition lives
// here. The page passes each panel's content already rendered on the server.
export function ProjectDetailTabs({
  summary,
  architecture,
  security,
  video,
}: {
  summary: ReactNode;
  architecture: ReactNode;
  security: ReactNode;
  video: ReactNode;
}) {
  return (
    <ProjectTabs defaultValue="resumen">
      <ProjectTabs.List label="Secciones del caso">
        <ProjectTabs.Tab value="resumen">Resumen</ProjectTabs.Tab>
        <ProjectTabs.Tab value="arquitectura">Arquitectura</ProjectTabs.Tab>
        <ProjectTabs.Tab value="seguridad">Seguridad</ProjectTabs.Tab>
        <ProjectTabs.Tab value="video">Video</ProjectTabs.Tab>
      </ProjectTabs.List>
      <ProjectTabs.Panels>
        <ProjectTabs.Panel value="resumen">{summary}</ProjectTabs.Panel>
        <ProjectTabs.Panel value="arquitectura">{architecture}</ProjectTabs.Panel>
        <ProjectTabs.Panel value="seguridad">{security}</ProjectTabs.Panel>
        <ProjectTabs.Panel value="video">{video}</ProjectTabs.Panel>
      </ProjectTabs.Panels>
    </ProjectTabs>
  );
}
