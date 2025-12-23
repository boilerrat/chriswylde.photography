import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = {
  title: "Chris Wylde Photography",
  description: "Photography projects and series",
  openGraph: {
    title: "Chris Wylde Photography",
    description: "Photography projects and series",
    type: "website",
  },
};

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Projects</h1>
      <ProjectGrid projects={projects} />
    </div>
  );
}

