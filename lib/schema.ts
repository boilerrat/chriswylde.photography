import { z } from "zod";

export const PrintSizeSchema = z.object({
  name: z.string().min(1, "size name is required"),
  shopifyVariantId: z.string().min(1, "Shopify variant ID is required"),
  price: z.number().positive("price must be positive"),
  dimensions: z.string().optional(),
});

export const PrintProductSchema = z.object({
  shopifyProductId: z.string().min(1, "Shopify product ID is required"),
  imageUrl: z.string().url("imageUrl must be a valid URL"),
  sizes: z.array(PrintSizeSchema).min(1, "at least one size is required"),
});

export const ProjectSchema = z.object({
  slug: z.string().min(1, "slug is required"),
  title: z.string().min(1, "title is required"),
  oneLine: z.string().min(1, "oneLine is required"),
  dateStart: z.string().datetime("dateStart must be a valid ISO date string"),
  dateEnd: z.string().datetime("dateEnd must be a valid ISO date string").optional(),
  location: z.string().optional(),
  coverImageUrl: z.string().url("coverImageUrl must be a valid URL"),
  order: z.number().optional(),
  printProduct: PrintProductSchema.optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type PrintSize = z.infer<typeof PrintSizeSchema>;
export type PrintProduct = z.infer<typeof PrintProductSchema>;

