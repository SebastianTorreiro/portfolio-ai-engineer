import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetailTabs } from "@/components/project-detail-tabs";
import {
  ArchitectureSection,
  SecuritySection,
  SummarySection,
} from "@/components/project-sections";
import { ProjectVideo } from "@/components/project-video";
import { getProjectsRepository } from "@/lib/adapters";

// Every project page is generated at build time; unknown slugs are a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjectsRepository().getAll();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectsRepository().getBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Sebastián Torreiro`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = await getProjectsRepository().getBySlug(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-[720px] px-6 pt-16 pb-24 sm:px-12 sm:pt-24">
      <Link href="/#casos" className="text-sm text-slate">
        Volver a casos de estudio
      </Link>

      <h1 className="mt-10 font-display text-4xl leading-[1.1] font-normal tracking-[-0.015em] text-balance text-ink sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-6 max-w-[65ch] text-lg">{project.summary}</p>

      <div className="mt-12">
        <ProjectDetailTabs
          summary={<SummarySection project={project} />}
          architecture={<ArchitectureSection project={project} />}
          security={<SecuritySection project={project} />}
          video={<ProjectVideo videos={project.videos} />}
        />
      </div>
    </main>
  );
}
