import { z } from "zod";

export const ProjectSchema = z.object({
  slug: z.string().min(1, "slug is required"),
  title: z.string().min(1, "title is required"),
  oneLine: z.string().min(1, "oneLine is required"),
  dateStart: z.string().datetime("dateStart must be a valid ISO date string"),
  dateEnd: z.string().datetime("dateEnd must be a valid ISO date string").optional(),
  location: z.string().optional(),
  coverImageUrl: z.string().url("coverImageUrl must be a valid URL"),
  order: z.number().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

