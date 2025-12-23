import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 rounded-lg overflow-hidden"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
        <Image
          src={project.coverImageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-1 group-hover:text-slate-900 transition-colors">
          {project.title}
        </h2>
        <p className="text-sm text-slate-600 line-clamp-2">{project.oneLine}</p>
        {project.location && (
          <p className="text-xs text-slate-500 mt-1">{project.location}</p>
        )}
      </div>
    </Link>
  );
}

