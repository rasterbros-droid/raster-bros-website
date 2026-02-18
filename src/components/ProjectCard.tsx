import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
  disableAnimation?: boolean;
}

export function ProjectCard({ project, index, className = "", disableAnimation = false }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.slug}`}>
      <motion.div
        className={`group relative w-full cursor-pointer ${className}`}
        initial={disableAnimation ? {} : { opacity: 0, y: 50 }}
        whileInView={disableAnimation ? {} : { opacity: 1, y: 0 }}
        viewport={disableAnimation ? undefined : { once: true, margin: "-10%" }}
        transition={disableAnimation ? {} : { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className=" overflow-hidden bg-white/5 rounded-sm mb-6 relative">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-[600px] object-cover transition-transform duration-700 ease-studio
                         group-hover:scale-105"
          />
        </div>

        <div className="flex justify-between items-start border-t border-white/10 pt-4">
          <div>
            <h3 className="text-2xl font-display font-medium mb-1 group-hover:text-white/70 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-white/50 uppercase tracking-wider">{project.category}</p>
          </div>
          {/* <span className="text-sm text-white/30 font-mono">{project.year}</span> */}
        </div>
      </motion.div>
    </Link>
  );
}
