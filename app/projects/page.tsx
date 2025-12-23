import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | Chris Wylde Photography",
  description: "Browse all photography projects and series",
  openGraph: {
    title: "Projects | Chris Wylde Photography",
    description: "Browse all photography projects and series",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-slate-600">No projects yet.</p>
      ) : (
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="block group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 rounded"
              >
                <h2 className="text-2xl font-semibold mb-1 group-hover:text-slate-900 transition-colors">
                  {project.title}
                </h2>
                <p className="text-slate-600">{project.oneLine}</p>
                {project.location && (
                  <p className="text-sm text-slate-500 mt-1">{project.location}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

