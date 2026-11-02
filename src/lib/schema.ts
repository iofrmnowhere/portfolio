import { z } from "zod";

const linksSchema = z.object({
  demo: z.string().url().optional(),
  video: z.string().url().optional(),
  repo: z.string().url(),
});

const coverSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  summary: z.string().max(180),
  year: z.number().int(),
  order: z.number().int(),
  stack: z.array(z.string()).min(1),
  cover: coverSchema.optional(),
  links: linksSchema,
  role: z.array(z.string()).min(1).max(4).optional(),
  facts: z.array(z.string()).optional(),
});

export type ProjectMeta = z.infer<typeof projectSchema>;
