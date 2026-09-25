"use client";

import type { ProjectVideos } from "@/lib/domain/project";
import { ProjectTabs } from "./project-tabs";

const YOUTUBE_ID = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/;

// YouTube links become a privacy-enhanced embed; any other URL is treated as a video file.
function VideoPlayer({ url, title }: { url: string; title: string }) {
  const youtubeId = url.match(YOUTUBE_ID)?.[1];

  if (youtubeId) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        allow="encrypted-media; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full border border-slate"
      />
    );
  }

  return (
    <video controls preload="metadata" className="aspect-video w-full border border-slate">
      <source src={url} />
    </video>
  );
}

function VideoOrPlaceholder({ url, kind }: { url?: string; kind: "técnico" | "comercial" }) {
  if (!url) {
    return <p className="text-slate">El video {kind} se publica próximamente.</p>;
  }
  return <VideoPlayer url={url} title={`Video ${kind}`} />;
}

// Nested ProjectTabs: the same compound component drives the Técnico/Comercial selector.
export function ProjectVideo({ videos }: { videos: ProjectVideos }) {
  return (
    <ProjectTabs defaultValue="tecnico">
      <ProjectTabs.List label="Tipo de video" size="sm">
        <ProjectTabs.Tab value="tecnico">Técnico</ProjectTabs.Tab>
        <ProjectTabs.Tab value="comercial">Comercial</ProjectTabs.Tab>
      </ProjectTabs.List>
      <ProjectTabs.Panels>
        <ProjectTabs.Panel value="tecnico">
          <VideoOrPlaceholder url={videos.technicalUrl} kind="técnico" />
        </ProjectTabs.Panel>
        <ProjectTabs.Panel value="comercial">
          <VideoOrPlaceholder url={videos.businessUrl} kind="comercial" />
        </ProjectTabs.Panel>
      </ProjectTabs.Panels>
    </ProjectTabs>
  );
}
