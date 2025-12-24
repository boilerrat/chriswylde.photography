import type { Project } from "@/lib/schema";
import { ProjectCard } from "./project-card";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-impact text-black uppercase">
          NO PROJECTS YET!
        </p>
        <p className="text-sm font-mono mt-2 text-black/60">
          Check back soon for new work...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 relative">
      {/* Background accent elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border-4 border-zine-cyan opacity-20 transform rotate-45 -z-10" />
      <div className="absolute bottom-40 right-20 w-40 h-40 border-4 border-zine-magenta opacity-20 transform -rotate-12 -z-10" />

      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}

      {/* Random decorative elements */}
      <div className="absolute top-1/2 left-1/4 text-6xl text-zine-yellow opacity-10 transform -rotate-45 -z-10 font-impact">
        ★
      </div>
      <div className="absolute bottom-1/4 right-1/3 text-8xl text-zine-lime opacity-10 transform rotate-12 -z-10 font-impact">
        ✦
      </div>
    </div>
  );
}

