import { useMemo } from "react";
import { rasterBrosProjects } from "../../shared/projects-data";
import type { Project } from "@/lib/schema";

export function useProjects() {
  // Add IDs to projects and return directly
  const data = useMemo<Project[]>(() => {
    return rasterBrosProjects.map((project, index) => ({
      id: `project-${index}`,
      ...project,
    })) as Project[];
  }, []);

  return {
    data,
    isLoading: false,
    error: null,
  };
}
