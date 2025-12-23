import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { ProjectSchema, type Project } from "./schema";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function getAllProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects: Project[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".mdx")) continue;

    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    // Convert Date objects to ISO strings (gray-matter parses dates as Date objects)
    const processedData = {
      ...data,
      dateStart: data.dateStart instanceof Date ? data.dateStart.toISOString() : data.dateStart,
      dateEnd: data.dateEnd instanceof Date ? data.dateEnd.toISOString() : data.dateEnd,
    };

    try {
      const project = ProjectSchema.parse(processedData);
      projects.push(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
        throw new Error(`Invalid frontmatter in ${fileName}: ${fieldErrors}`);
      }
      throw error;
    }
  }

  // Sort: order (ascending, undefined last), then dateStart (descending)
  projects.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime();
  });

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Convert Date objects to ISO strings (gray-matter parses dates as Date objects)
  const processedData = {
    ...data,
    dateStart: data.dateStart instanceof Date ? data.dateStart.toISOString() : data.dateStart,
    dateEnd: data.dateEnd instanceof Date ? data.dateEnd.toISOString() : data.dateEnd,
  };

  try {
    const project = ProjectSchema.parse(processedData);
    return project;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
      throw new Error(`Invalid frontmatter in ${slug}.mdx: ${fieldErrors}`);
    }
    throw error;
  }
}

export async function getProjectContent(slug: string): Promise<string | null> {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  return content;
}

