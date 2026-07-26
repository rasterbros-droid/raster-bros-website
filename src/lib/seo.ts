import type { Project } from "@/lib/schema";
import { resolveYoutubeEmbedUrl } from "@/lib/youtube";

export const SITE_URL = "https://www.rasterbros.com";
export const SITE_NAME = "RasterBros";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/android-chrome-512x512.png"),
    sameAs: [
      "https://www.instagram.com/rasterbros",
      "https://www.youtube.com/@RasterBros",
      "https://www.linkedin.com/company/rasterbros/",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function projectBreadcrumbJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/#work") },
      {
        "@type": "ListItem",
        position: 3,
        name: project.songTitle,
        item: absoluteUrl(`/project/${project.slug}`),
      },
    ],
  };
}

export function projectJsonLd(project: Project) {
  const embedUrl = resolveYoutubeEmbedUrl(project.embeddedVideoSong);

  const base = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.songTitle,
    description: project.description,
    image: project.imageUrl,
    datePublished: project.year,
    genre: project.category,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  if (!embedUrl) return base;

  return {
    ...base,
    "@type": "VideoObject",
    thumbnailUrl: project.imageUrl,
    uploadDate: `${project.year}-01-01T00:00:00+05:30`,
    embedUrl,
  };
}
