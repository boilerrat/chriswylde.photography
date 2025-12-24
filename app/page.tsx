import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/project-grid";
import { ZineHero } from "@/components/zine-hero";

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
    <>
      <ZineHero />

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Section header with zine styling */}
        <div className="mb-16 relative">
          <h1 className="text-5xl md:text-7xl font-impact text-black uppercase leading-none mb-4 relative inline-block">
            PROJECTS
            <span className="absolute -bottom-2 left-0 right-0 h-4 bg-zine-magenta opacity-40 transform -rotate-1 -z-10" />
          </h1>

          <p className="text-lg font-mono text-black/70 mt-6 max-w-2xl">
            A collection of photography series exploring light, shadow, and the spaces between.
            Each project is a moment captured, a story told through the lens.
          </p>

          {/* Decorative element */}
          <div className="absolute -top-8 -right-4 text-6xl text-zine-cyan opacity-20 transform rotate-12 hidden md:block">
            ★
          </div>
        </div>

        <ProjectGrid projects={projects} />
      </div>
    </>
  );
}

