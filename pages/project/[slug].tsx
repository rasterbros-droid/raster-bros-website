import type { GetStaticPaths, GetStaticProps } from "next";
import ProjectDetail from "@/pages/ProjectDetail";
import { rasterBrosProjects } from "../../shared/projects-data";
import type { Project } from "@/lib/schema";

type ProjectPageProps = {
  project: Project;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: rasterBrosProjects.map((project) => ({
      params: { slug: project.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const project = rasterBrosProjects.find((p) => p.slug === slug);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project: { id: `project-${slug}`, ...project },
    },
  };
};

export default function ProjectPage({ project }: ProjectPageProps) {
  return <ProjectDetail project={project} />;
}
